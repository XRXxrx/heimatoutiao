import myaxios from '@/utils/request'

export const postList = (category) => {
    return myaxios({
        method: 'get',
        url: `/post?category=${category}&pageSize=100`
    })
}

//获取文章详情列表数据
export const postDetail = (id) => {
    return myaxios({
        method: 'get',
        url: `/post/${id}`
    })
}