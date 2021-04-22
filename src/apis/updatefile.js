import myaxios from '@/utils/request'

export const updatefile = (data) => {
    return myaxios({
        method: 'post',
        url: '/upload',
        data
    })
}