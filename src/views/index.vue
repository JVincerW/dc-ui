<template>
    <div class='app-container home'>
        <el-row :gutter='20'>
            <el-col :lg='24' :sm='24'>
                博客管理后端

                <hr/>
            </el-col>
        </el-row>
        <el-row :gutter='20'>
            <el-col :lg='12' :sm='24' style='padding-left: 20px'>
                <h2>博客编辑页面样式调整计划</h2>
                <h3>已经处理完，期望各位大佬各显神通提交pr</h3>
                <h3>前端项目地址：<a href="https://github.com/JVincerW/dc-ui" style="background-color: #0acf83;color: #000">https://github.com/JVincerW/dc-ui</a></h3>


                <p><br></p>

            </el-col>
        </el-row>
        <el-divider/>

    </div>
</template>

<script name='Index' setup>
const version = ref('3.6.3');

function goTarget(url) {
    window.open(url, '__blank');
}
</script>

<style lang='scss' scoped>
.home {
    blockquote {
        padding: 10px 20px;
        margin: 0 0 20px;
        font-size: 17.5px;
        border-left: 5px solid #eee;
    }

    hr {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 0;
        border-top: 1px solid #eee;
    }

    .col-item {
        margin-bottom: 20px;
    }

    ul {
        padding: 0;
        margin: 0;
    }

    font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 13px;
    color: #676a6c;
    overflow-x: hidden;

    ul {
        list-style-type: none;
    }

    h4 {
        margin-top: 0px;
    }

    h2 {
        margin-top: 10px;
        font-size: 26px;
        font-weight: 100;
    }

    p {
        margin-top: 10px;

        b {
            font-weight: 700;
        }
    }

    .update-log {
        ol {
            display: block;
            list-style-type: decimal;
            margin-block-start: 1em;
            margin-block-end: 1em;
            margin-inline-start: 0;
            margin-inline-end: 0;
            padding-inline-start: 40px;
        }
    }
}
</style>

