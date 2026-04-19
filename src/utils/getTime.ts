//该方法获取一个结果：当前是早上|上午|下午|晚上
export const getTime = () => {
    let msg = '';
    //通过内置构造函数Date
    const hours = new Date().getHours()
    if (hours <= 9 && hours >= 6) {
        msg = '早上好'
    } else if (hours <= 12 && hours > 9) {
        msg = '上午好'
    } else if (hours <= 18 && hours > 12) {
        msg = '下午好'
    } else {
        msg = '晚上好'
    }
    return msg
}