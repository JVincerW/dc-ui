<template>
	<div class='app-container'>
		<el-dialog v-model='viewShow' title='预览博客'>
			<h1 style='text-align: center;font-weight: bold'>
				{{blogForm.title}}
			</h1>
			<div v-html='blogForm.content'></div>
		</el-dialog>
		<el-form :inline='true' :model='queryParams' label-width='68px'>
			<el-form-item label='标题' prop='title'>
				<el-input
						v-model='queryParams.title'
						clearable
						placeholder='请输入标题'
						@keyup.enter='handleQuery'
				/>
			</el-form-item>
			<el-form-item label='用户ID' prop='userId'>
				<el-input
						v-model='queryParams.userId'
						clearable
						placeholder='请输入用户ID'
						@keyup.enter='handleQuery'
				/>
			</el-form-item>
			<el-form-item>
				<el-button icon='Search' type='primary' @click='handleQuery'>搜索</el-button>
				<el-button icon='Refresh' @click='resetQuery'>重置</el-button>
			</el-form-item>
		</el-form>

		<el-row :gutter='10' class='mb8'>
			<el-col :span='1.5'>
				<el-button
						icon='Plus'
						plain
						type='primary'
						vPermi="['system:article:add']"
						@click='handleAdd'
				>新增
				</el-button>
			</el-col>
			<el-col :span='1.5'>
				<el-button
						:disabled='single'
						icon='Edit'
						plain
						type='success'
						vPermi="['system:article:edit']"
						@click='handleUpdate'
				>修改
				</el-button>
			</el-col>
			<el-col :span='1.5'>
				<el-button
						:disabled='multiple'
						icon='Delete'
						plain
						type='danger'
						vPermi="['system:article:remove']"
						@click='handleDelete'
				>删除
				</el-button>
			</el-col>
			<el-col :span='1.5'>
				<el-button
						icon='Download'
						plain
						type='warning'
						vPermi="['system:article:export']"
						@click='handleExport'
				>导出
				</el-button>
			</el-col>
			<right-toolbar @queryTable='getList'></right-toolbar>
		</el-row>

		<el-table v-loading='loading' :data='articleList' @selection-change='handleSelectionChange'>
			<el-table-column align='center' type='selection' width='55' />
			<el-table-column align='center' label='文档id' prop='id' />
			<el-table-column align='center' label='标题' prop='title' />
			<el-table-column align='center' label='用户ID' prop='userId' />
			<el-table-column align='center' label='点赞数' prop='pollCount' />
			<el-table-column align='center' label='封面图' prop='coverImage' width='100'>
				<template #default='scope'>
					<image-preview :height='50' :src='scope.row.coverImage' :width='50' />
				</template>
			</el-table-column>
			<el-table-column align='center' label='评论数' prop='commentCount' />
			<el-table-column align='center' label='阅读类型' prop='readType' />
			<el-table-column align='center' label='编辑类型' prop='editorType' />
			<el-table-column align='center' label='是否置顶' prop='top' />
			<el-table-column align='center' label='状态' prop='status' />
			<el-table-column align='center' label='是否推荐' prop='recommended' />
			<el-table-column align='center' label='是否开启评论' prop='comment' />
			<el-table-column align='center' label='更新时间' prop='updateAt' width='180' />
			<el-table-column align='center' class-name='small-padding fixed-width' label='操作'>
				<template #default='scope'>
					<el-button icon='View' link type='primary' vPermi="['system:article:remove']" @click='viewBlog(scope.row)'></el-button>
					<el-button icon='Edit' link type='primary' vPermi="['system:article:edit']" @click='handleEditor(scope.row)'></el-button>
					<el-button icon='Operation' link type='primary' vPermi="['system:article:edit']" @click='handleUpdate(scope.row)'></el-button>
					<el-button icon='Delete' link type='primary' vPermi="['system:article:remove']" @click='handleDelete(scope.row)'></el-button>
				</template>
			</el-table-column>
		</el-table>
		<pagination
				v-show='total > 0'
				v-model:limit='queryParams.pageSize'
				v-model:page='queryParams.pageNum'
				:total='total'
				@pagination='getList'
		/>
		<artic-dig ref='articleDig' :digData='digData' :getList='getList'></artic-dig>

	</div>
</template>

<script setup>

import { delArticle, listArticle,getArticle } from '@/api/system/blogs';
import ArticDig from '../../../components/Editor/ArticleDig.vue';


const { proxy } = getCurrentInstance();
const articleList = ref([]);

const loading = ref(true);

const ids = ref([]);

const single = ref(true);
const multiple = ref(true);
const viewShow = ref(false);
const total = ref(0);
const articleDig = ref();
const digData = ref();
const initParams = {
	pageNum: 1,
	pageSize: 50,
	title: null,
	userId: null,
	status: null,
};
const queryParams = ref(initParams);

const blogForm = ref();

/** 查询博客文章列表 */
function getList() {
	console.log('获取文章列表');
	loading.value = true;
	listArticle(queryParams.value)
	.then((response) => {
		articleList.value = response.rows;
		total.value = response.total;
		loading.value = false;
	})
	.catch((error) => {
		console.error('Error fetching article list:', error);
		loading.value = false;
	});
}

/** 搜索按钮操作 */
function handleQuery() {
	queryParams.value.pageNum = 1;
	getList();
}

/** 重置按钮操作 */
function resetQuery() {
	queryParams.value = initParams;
	handleQuery();
}

// 多选框选中数据
// single 变量的值会根据选中的文章数量来改变。如果选中的文章数量不等于1，那么 single 的值将为 true，否则为 false。这个变量通常用于控制只能编辑单个文章的情况。
// 如果没有选中任何文章（selection 数组为空），那么 multiple 的值将为 true，否则为 false。这个变量通常用于控制批量删除等需要选中多个文章的操作。
function handleSelectionChange(selection) {
	ids.value = selection.map((item) => item.id);
	single.value = selection.length !== 1;
	multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
	proxy.$router.push({ path: 'blogEditor', query: { createType: 'init' } });
}

/** 修改按钮操作 */
function viewBlog(row) {
	const _id = row.id || ids.value;
	loading.value = true;
	getArticle(_id)
	.then((response) => {
		blogForm.value = response.data;
		loading.value = false;
		viewShow.value = true;
		console.log(blogForm.value, 'blogForm');
		console.log(viewShow.value, 'viewShow');
		console.log(blogForm.value.content, 'blogForm.content');
	})
	.catch((error) => {
		proxy.$modal.msgSuccess('获取博客数据失败:', error);
		loading.value = false;
	});
}

/** 编辑按钮操作 */
function handleEditor(row) {
	const _id = row.id || ids.value;
	proxy.$router.push({ path: 'blogEditor', query: { createType: 'Mod', id: _id } });
}

function handleUpdate(row) {
	loading.value = true;
	const _id = row.id || ids.value;
	getArticle(_id)
	.then((response) => {
		const { readType, comment, coverImage, status, keywords, recommended, top, original, password, tags, title } = response.data;
		digData.value = { id: _id, readType, comment, coverImage, status, keywords, recommended, top, original, password, tags, title, createType: 'Mod' };
		articleDig.value.handleShow();
		loading.value = false;
	})
	.catch((error) => {
		proxy.$modal.msgSuccess('Error fetching article data:', error);
		loading.value = false;
	});
}

/** 删除按钮操作 */
function handleDelete(row) {
	loading.value = true;
	const _ids = row.id || ids.value;
	proxy.$modal
	.confirm('是否确认删除博客文章编号为"' + _ids + '"的数据项？')
	.then(function() {
		return delArticle(_ids);
	})
	.then(() => {
		getList();
		proxy.$modal.msgSuccess('删除成功');
		loading.value = false;
	})
	.catch((error) => {
		console.error('Error deleting article:', error);
		loading.value = false;
	});
}

/** 导出按钮操作 */
function handleExport() {
	proxy.download('system/article/export', {
		...queryParams.value,
	}, `article_${ new Date().getTime() }.xlsx`);
}

getList();
</script>
