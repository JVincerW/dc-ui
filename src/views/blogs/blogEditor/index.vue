<template>
    <!--TODO-->
    <div class="editor_content">
        <el-button circle class='push' icon='Promotion' type='success' @click='digShow'/>
        <editor v-if='showEditor' v-model='articleDetail.content'/>
        <article-dig ref="articleDigDom" :digData="articleDetail" />
    </div>
</template>

<script setup>
import {getArticle} from '@/api/system/blogs';
import ArticleDig from "@/components/Editor/ArticleDig.vue";
const articleDigDom = ref(null);
const proxy = getCurrentInstance().proxy;
const showEditor = ref();

const articleDetail = ref();
onBeforeMount(() => {
    reset();
    const createType = proxy.$route.query.createType || 'init';
    console.log('编辑器加载类型:', createType);
    console.log('要编辑的文章id:', proxy.$route.query.id);
    if (createType === 'Mod' && proxy.$route.query.id) {
        getArticle(proxy.$route.query.id).then(response => {
            articleDetail.value = response.data;
            articleDetail.value.createType = 'Mod';
            console.log(articleDetail.value, 'articleForm');
        });
    } else {
        console.log("获取到类型为init，初始化数据");
        reset();
        articleForm.createType = 'init';
    }
    showEditor.value = true;
});

function reset() {
    articleDetail.value = {
        "allowComment": null,
        "appreciation": null,
        "contentType": null,
        "content": null,
        "createBy": null,
        "excerpt": null,
        "imageUrl": null,
        "remark": null,
        "readType": null,
        "status": null,
        "title": null,
    }
}

function digShow(){
    // console.log("ddddddddddfdf")
    if (articleDigDom.value) {
        articleDigDom.value.handleShow(); // 调用子组件的 showDialog 方法
    }

}
</script>

<style scoped>
.push {
    position: absolute;
    bottom: 39px;
    right: 80px;
    z-index: 99;
}

.editor_content {
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column
}

</style>
