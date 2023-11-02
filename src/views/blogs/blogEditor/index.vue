<template>
<!--TODO-->
<div class="vincer" style="height: 100%">
    <el-button circle class='push' icon='Promotion' type='success' @click='digShow'/>
    <editor v-if='showBasicEditor' v-model='articleForm.content'/>
    <article-dig ref='articleDig' :digData='articleForm'></article-dig>
</div>


</template>

<script setup>
import {getArticle} from '@/api/system/blogs';

const proxy = getCurrentInstance().proxy;
const showBasicEditor = ref();
const editorRef = ref();
const articleDig = ref();
const articleForm = ref();
onBeforeMount(() => {
    reset();
    const createType = proxy.$route.query.createType || 'init';
    console.log('编辑器加载类型:', createType);
    console.log('要编辑的文章id:', proxy.$route.query.id);
    if (createType === 'Mod' && proxy.$route.query.id) {
        getArticle(proxy.$route.query.id).then(response => {
            articleForm.value = response.data;
            articleForm.value.createType = 'Mod';
            console.log(articleForm, 'articleForm');
        });
    } else {
        console.log(6666666);
        reset();
        articleForm.createType = 'init';
    }
    editorRef.showBasicEditor = true;
    showBasicEditor.value = true;
});

function reset() {
    articleForm.value = {
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

function digShow() {
    articleDig.value.handleShow();
}

</script>

<style scoped>
.push {
    position: absolute;
    bottom: 39px;
    right: 80px;
    z-index: 99;
}
.app-main{
    overflow: hidden;
}
</style>
