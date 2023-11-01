import axios from 'axios';
import { ElMessage } from 'element-plus';
import { saveAs } from 'file-saver';
import { getToken } from '@/utils/auth';
import errorCode from '@/utils/errorCode';
import { blobValidate } from '@/utils/ruoyi';

const baseURL = import.meta.env.VITE_APP_BASE_API;

export default {
	zip(url, name) {
		var u = baseURL + url;
		axios({
			method: 'get',
			url: u,
			responseType: 'blob',
			headers: { 'Authorization': 'Bearer ' + getToken() },
		}).then((res) => {
			const isBlob = blobValidate(res.data);
			if( isBlob ) {
				const blob = new Blob([ res.data ], { type: 'application/zip' });
				this.saveAs(blob, name);
			} else {
				this.printErrMsg(res.data).then(r => console.log(r));
			}
		});
	},
	saveAs(text, name, opts) {
		saveAs(text, name, opts);
	},
	async printErrMsg(data) {
		const resText = await data.text();
		const rspObj  = JSON.parse(resText);
		const errMsg  = errorCode[rspObj.code] || rspObj.msg || errorCode['default'];
		ElMessage.error(errMsg);
	},
};

