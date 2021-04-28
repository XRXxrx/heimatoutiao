import myaxios from '@/utils/request'

export const postList = (params) => {
    return myaxios({
        method: 'get',
        url: `/post`,
        params
    })
}

//获取文章详情列表数据
export const postDetail = (id) => {
    return myaxios({
        method: 'get',
        url: `/post/${id}`
    })
}