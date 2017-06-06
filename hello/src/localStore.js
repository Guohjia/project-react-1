export function save(key,value){
    return window.localStorage.setItem(key,JSON.stringify(value))  //将todo以字符串形式保存
}

export function load(key) {
    return JSON.parse(window.localStorage.getItem(key))
}    //用户访问页面的时候将localStorage里面的字符串变为对象，赋值给todolist