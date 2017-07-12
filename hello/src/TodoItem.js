import React, { Component } from 'react';
import './TodoItem.css'
export default class TodoItem extends Component {
    render() {
        return (
            <div className="TodoItem">
                <input type="checkbox" checked={this.props.todo.status === 'completed'}
                    onChange={this.toggle.bind(this)} />
                <input type="text" className="title" value={this.props.todo.title} onChange={this.changeTodo.bind(this)}
                    onBlur={this.props.onBlur}
                     />
                {/*<span>{this.props.todo.title}</span> */}
                {/*失去焦点的时候发送请求，生成新的todo */}
                <span onClick={this.delete.bind(this)}>x</span>
            </div>
        )
    }
    // submit(props, e) {
    //     if (e.key === 'Enter') {
    //         if (e.target.value.trim() !== '') { //输出为空拒绝
    //             props.onBlur()
    //         }
    //     }
    // }
    changeTodo(e) {
        this.props.onChange(e, this.props.todo)
    }
    toggle(e) {
        this.props.onToggle(e, this.props.todo)
    }
    delete(e) {
        this.props.onDelete(e, this.props.todo)
    }
}