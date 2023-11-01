import { defineStore } from 'pinia';
import { getArticle } from '../../api/system/blogs';

// 创建文章编辑页面的 store
export const useArticleStore = defineStore('article', {
	state: () => ( {
		articleData: null, // 用于存储文章数据
	} ),

	actions: {
		// 获取数据的操作
		async setArticleData(articleId) {
			// 在这里实现获取文章数据的逻辑，可以是异步操作
			// 例如，使用API请求获取数据
			// 这里假设使用一个假的API请求，你需要根据实际情况替换成真实的数据获取逻辑
			getArticle(articleId).then(response => {
				this.articleData = response.data;
			});
		},
		resetArticleData() {
			this.articleData = null;
		},
	},
});
