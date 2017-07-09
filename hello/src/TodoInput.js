import React from 'react';
import './TodoInput.css'
export default function (props) {
    return <input type="text" value={props.content}
        className="TodoInput"
        placeholder="输入新的待办事项，按回车添加"
        onChange={changeTitle.bind(null, props)}
        onKeyPress={submit.bind(null, props)} />

}
function submit(props, e) {
    if (e.key === 'Enter') {
        if (e.target.value.trim() !== '') { //输出为空拒绝
            props.onSubmit(e)
        }
    }
}

function changeTitle(props, e) {
    props.onChange(e)
}