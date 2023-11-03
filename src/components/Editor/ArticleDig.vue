<script setup>
import { ref } from 'vue';
import { addArticle, updateArticle } from '@/api/system/blogs';

const { proxy } = getCurrentInstance();
// const addVisible = ref(false);
const { digData} = defineProps({ digData: Object});

// 新标签
const dialogTableVisible=ref(false)
// const newTagValue = ref(null);
const waitLoading=ref(false)
const handleShow = () => {

	dialogTableVisible.value = true;
    console.log(digData, 'digData显示');
};
console.log('传递进来的数据1:', digData);
function tagTrans(tag) {
	console.log('标签被点击：', tag);
}
function addConfirm() {
	console.log('添加新标签事件');
	console.log(newTagValue.value, '新添加的标签');
	if( digData.value.tags ) {
		digData.value.tags.push({ 'code': newTagValue.value, flag: true, label: newTagValue.value });
	} else {
		digData.value.tags = [ { 'code': newTagValue.value, flag: true, label: newTagValue.value } ];
	}
	newTagValue.value = null;
	addVisible.value = false;
}

function showInput() {
	console.log('显示添加标签的输入框');
	addVisible.value = true;
}

function handleSubmit() {
  waitLoading.value=true
	console.log(proxy.digData, '确认按钮被点击，获取到的值');
	const articleObj = proxy.digData;
	console.log(articleObj, '最终的文章对象');

	if( articleObj.createType === 'Mod' ) {
		updateArticle(articleObj).then(response => {
			if( response.code === 200 ) {
				proxy.$modal.msgSuccess('文章修改成功！');
			}
		});
	} else if( !articleObj.createType || articleObj.createType === 'init' ) {
		addArticle(articleObj).then(response => {
			if( response.code === 200 ) {
				proxy.$modal.msgSuccess('创建文件成功！');
			} else {
				console.log(response);
				proxy.$modal.msgError(response);
			}
		});
	}
  waitLoading.value=false
	dialogTableVisible.value = false;
}
console.log('传递进来的数据:', digData);
defineExpose({ handleShow });
</script>

<template>
	<el-dialog v-model="dialogTableVisible" center>
		<el-form label-width='80px'>
			<el-form-item label='文章标题'>
				<el-input v-model='digData.title' placeholder='请输入文章标题' />
			</el-form-item>
			<el-form-item label='阅读类型'>
                <el-radio-group v-model="digData.readType">
                    <el-radio :label="0">无需验证</el-radio>
                    <el-radio :label="1">密码验证</el-radio>
                    <el-radio :label="2">仅自己</el-radio>
                </el-radio-group>

            </el-form-item>
			<el-form-item label='允许评论'>
				<el-switch
						v-model='digData.allowComment'
						active-text='是'
						inactive-text='否'
				/>
			</el-form-item>
      <el-form-item label='开启赞赏'>
        <el-switch
            v-model='digData.appreciation'
            active-text='是'
            inactive-text='否'
        />
      </el-form-item>
			<el-form-item label='封面图片'>
				<image-upload
						ref='upi'
						v-model='digData.imageUrl'
						:fileSize='20'
						:fileType="['png', 'jpg', 'jpeg']"
						:isShowTip='true'
						:limit='1'
				/>
			</el-form-item>
			<el-form-item label='发布状态'>
				<el-radio-group v-model='digData.status'>
					<el-radio :label=0>草稿</el-radio>
					<el-radio :label=1>已发布</el-radio>
          <el-radio :label=2>下架</el-radio>
          <el-radio :label=9>删除</el-radio>
				</el-radio-group>
			</el-form-item>
<!--			<el-form-item form.tags label='文章标签'>-->
<!--				<el-tag-->
<!--						v-for='tag in digData.tags'-->
<!--						:key='tag.code'-->
<!--						:type="tag.flag ? 'success':'info'"-->
<!--						class='mx-1'-->
<!--						effect='dark'-->
<!--						style='cursor: pointer; margin-left: 10px;'-->
<!--						@click='tagTrans(tag)'-->
<!--				>-->
<!--					{{tag.label}}-->
<!--				</el-tag>-->
<!--				<el-input-->
<!--						v-if='addVisible'-->
<!--						v-model='newTagValue'-->
<!--						clearable-->
<!--						size='small'-->
<!--						style='margin-left: 10px;width: 80px;'-->
<!--						@blur='addConfirm'-->
<!--						@keyup.enter.native='$event.target.blur()'-->
<!--				/>-->
<!--				<el-button v-else :icon='Plus' class='button-new-tag' size='small' style='width: 80px;' @click='showInput'>-->
<!--				</el-button>-->
<!--			</el-form-item>-->
			<el-form-item>
				<el-button  clearable maxlength='5' :loading="waitLoading" type='primary' @click='handleSubmit'>{{digData.createType === 'Mod' ? '确认修改' : '确认创建'}}</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>

<style lang='scss'>

.button-new-tag {
	margin-left: 10px;
	padding-top: 0;
	padding-bottom: 0;
}

</style>
