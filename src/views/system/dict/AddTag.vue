<script setup>
import useDictStore from '@/store/modules/dict';
import { addData, updateData } from '@/api/system/dict/data';

const form = reactive({
	dictCode: undefined,
	dictLabel: undefined,
	dictValue: undefined,
	cssClass: undefined,
	listClass: 'default',
	dictSort: 0,
	status: '0',
	remark: undefined,
});

/** 提交按钮 */
function submitForm() {
	proxy.$refs['dataRef'].validate(valid => {
		if( valid ) {
			if( form.value.dictCode !== undefined ) {
				updateData(form.value).then(() => {
					useDictStore().removeDict(queryParams.value.dictType);
					proxy.$modal.msgSuccess('修改成功');
					open.value = false;
					getList();
				});
			} else {
				addData(form.value).then(() => {
					useDictStore().removeDict(queryParams.value.dictType);
					proxy.$modal.msgSuccess('新增成功');
					open.value = false;
					getList();
				});
			}
		}
	});
}
</script>

<template>
	<!-- 添加或修改参数配置对话框 -->
	<el-dialog v-model='open' :title='title' append-to-body width='500px'>
		<el-form ref='dataRef' :model='form' :rules='rules' label-width='80px'>
			<el-form-item label='字典类型'>
				<el-input v-model='form.dictType' :disabled='true' />
			</el-form-item>
			<el-form-item label='数据标签' prop='dictLabel'>
				<el-input v-model='form.dictLabel' placeholder='请输入数据标签' />
			</el-form-item>
			<el-form-item label='数据键值' prop='dictValue'>
				<el-input v-model='form.dictValue' placeholder='请输入数据键值' />
			</el-form-item>
			<el-form-item label='样式属性' prop='cssClass'>
				<el-input v-model='form.cssClass' placeholder='请输入样式属性' />
			</el-form-item>
			<el-form-item label='显示排序' prop='dictSort'>
				<el-input-number v-model='form.dictSort' :min='0' controls-position='right' />
			</el-form-item>
			<el-form-item label='回显样式' prop='listClass'>
				<el-select v-model='form.listClass'>
					<el-option
							v-for='item in listClassOptions'
							:key='item.value'
							:label="item.label + '(' + item.value + ')'"
							:value='item.value'
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label='状态' prop='status'>
				<el-radio-group v-model='form.status'>
					<el-radio
							v-for='dict in sys_normal_disable'
							:key='dict.value'
							:label='dict.value'
					>{{dict.label}}
					</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label='备注' prop='remark'>
				<el-input v-model='form.remark' placeholder='请输入内容' type='textarea'></el-input>
			</el-form-item>
		</el-form>
		<template #footer>
			<div class='dialog-footer'>
				<el-button type='primary' @click='submitForm'>确 定</el-button>
				<el-button @click='cancel'>取 消</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<style lang='scss' scoped>

</style>
