// 封装浏览器本地存储&读取数据方法
export const SET_TOKEN = (token:string) => {
    localStorage.setItem('TOKEN',token)
}
export const GET_TOKEN =()=>{
    return localStorage.getItem('TOKEN') 
}


