import React, { Component } from 'react';
import './TodoItem.css'
export default class TodoItem extends Component {
    render() {
        return (
            <div className="TodoItem">
                <div><h3>{this.props.onDate.day}</h3></div>
                <div className="checkbox">
                    <input type="checkbox" checked={this.props.todo.status === 'completed'}
                        onChange={this.toggle.bind(this)} />
                </div>
                <input type="text" className="title" value={this.props.todo.title} onChange={this.changeTodo.bind(this)}
                    onBlur={this.props.onBlur}
                     />
                {/*<span>{this.props.todo.title}</span> */}
                {/*失去焦点的时候发送请求，生成新的todo */}
                <span onClick={this.delete.bind(this)}>
                    <svg d="1499943082297" className="iconDelete"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"   width="2em" height="2em"><defs><style type="text/css"></style></defs>
                    <path d="M512.943488 62.201667c-247.52549 0-448.185602 200.661136-448.185602 448.185602S265.419022 958.573895 512.943488 958.573895 961.130114 757.912759 961.130114 510.387269 760.468978 62.201667 512.943488 62.201667zM711.769836 652.288117c15.717983 15.717983 15.717983 41.204447 0 56.927547-15.721053 15.717983-41.206494 15.717983-56.927547 0L512.524956 566.896284 370.207623 709.215664c-15.721053 15.717983-41.206494 15.717983-56.924477 0-15.7231-15.7231-15.7231-41.209564 0-56.927547l142.314263-142.317333L313.282123 367.651404c-15.7231-15.717983-15.7231-41.204447 0-56.927547 15.717983-15.717983 41.204447-15.717983 56.924477 0l142.317333 142.320403 142.317333-142.320403c15.721053-15.717983 41.206494-15.717983 56.927547 0 15.717983 15.7231 15.717983 41.209564 0 56.927547L569.452503 509.970784 711.769836 652.288117z " fill="#fff"></path></svg>
                </span>
            </div>
        )
    }
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