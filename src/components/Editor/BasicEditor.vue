<template>
	<div ref='cref' class='bg-red'>
		<Toolbar :editor='editorRef' class='tb' />
		<div class='scroll-container'>
			<div v-if='editorSetting.hasTitile' class='inputDeep'>
				<el-input v-model='editorData.title' placeholder='请输入标题'></el-input>
			</div>
			<Editor v-model='editorData.content' :defaultConfig='editorConfig' style='background-color: #fff' @onCreated='handleCreated' />
		</div>
	</div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css';
import { ref, shallowRef } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { getToken } from '@/utils/auth';

const uploadFile = ref(import.meta.env.VITE_APP_BASE_API + '/file/uploadEditor'); // 上传的图片服务器地址

const editorRef = shallowRef();
const { editorData, editorSetting } = defineProps({ editorData: Object, editorSetting: Object });

console.log(editorData, 'BasicEditor获取到的值');
const editorConfig = { placeholder: '请输入内容...', scroll: false, mode: 'simple', readOnly: !editorSetting.enableEditor, MENU_CONF: {} };

// 插入图片
editorConfig.MENU_CONF['uploadImage'] = {
	fieldName: 'file',
	server: uploadFile.value,
	// 单个文件的最大体积限制，默认为 50M
	maxFileSize: 20 * 1024 * 1024, // 100M
	metaWithUrl: true,
	withCredentials: true,
	headers: { Authorization: 'Bearer ' + getToken() },
};
editorConfig.MENU_CONF['uploadVideo'] = {
	fieldName: 'file',
	server: uploadFile.value,
	metaWithUrl: true,
	// 单个文件的最大体积限制，默认为 50M
	maxFileSize: 100 * 1024 * 1024, // 100M
	withCredentials: true,
	headers: { Authorization: 'Bearer ' + getToken() },
};

// 使用 ref 引用元素
const cref = ref(null);

const handleCreated = (editor) => {
	console.log('子组件内部打印：子组件被创建');
	editorRef.value = editor;
	// console.log(editor.getConfig());
	console.log(editor.getMenuConfig('uploadImage'));
	console.log(uploadFile.value, '图片上传地址');
};

defineExpose({ editorData });

</script>

<style scoped>
.bg-red {
	display: flex;
	flex-direction: column;
	padding: 10px;
	height: calc(100vh - 84px);
	background-color: #eee;
	box-sizing: border-box;
}

.tb {
	top: 0;
	width: 100%;
	border-bottom: 1px solid #ccc;
	box-sizing: border-box;
	z-index: 999;
}

.scroll-container {
	border-top: 1px solid #ccc;
	box-sizing: border-box;
	background-color: #fff;
	overflow-y: scroll;
	display: flex; /* 使用flex布局 */
	flex-direction: column; /* 垂直方向布局 */
	flex: 1;
}

/* 使用 :deep() 来覆盖 Element Plus 的默认样式 */
.inputDeep :deep(.el-input__inner) {
	border: 0;
	font-size: 2em;
	height: 2.5em;
	text-align: center;
	
}

/* 去掉输入框的边框，聚焦时也没有边框 */
.inputDeep :deep(.el-input__wrapper) {
	border-bottom: 1px solid #ccc;
	box-sizing: border-box;
	box-shadow: none;
	border-radius: unset;
}
</style>
