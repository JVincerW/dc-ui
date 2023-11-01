import request from '@/utils/request';

// 查询【请填写功能名称】列表
export function listArticle(query) {
    return request({
        url: '/blogs/article/list',
        method: 'get',
        params: query,
    });
}

// 查询【请填写功能名称】详细
export function getArticle(id) {
    return request({
        url: '/blogs/article/' + id,
        method: 'get',
    });
}

// 新增【请填写功能名称】
export function addArticle(data) {
    return request({
        url: '/blogs/article',
        method: 'post',
        data: data,
    });
}

// 修改【请填写功能名称】
export function updateArticle(data) {
    return request({
        url: '/blogs/article',
        method: 'put',
        data: data,
    });
}

// 删除【请填写功能名称】
export function delArticle(id) {
    return request({
        url: '/blogs/article/' + id,
        method: 'delete',
    });
}
