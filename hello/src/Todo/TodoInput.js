import React, { Component } from 'react';
import '../css/TodoInput.css'

class TodoInput extends Component {
    constructor(props) {
        super(props)
        this.submit=this.submit.bind(this)
        this.changeTitle=this.changeTitle.bind(this)
        this.keySubmit=this.keySubmit.bind(this)
    }
    render(){
        return <div className="inputWrapper">
                <input type="text" value={this.props.content}
                className="TodoInput"
                placeholder="输入新的待办事项"
                onChange={this.changeTitle}
                onKeyPress={this.keySubmit}
                onBlur={window.outerWidth<1025?this.submit:null}
                />
                {/* {window.outerWidth<1025?
                <svg fill="" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" onClick={this.submit}>
                  <path d="M0 0h24v24H0z" fill="none"/>
                  <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                </svg>:null} */}
            </div>
    }
    keySubmit(e){
        if (e.key === 'Enter') {
            this.submit(e)
        }else{
            return 
        }
    }
    submit(e) {
            if (e.target.value.trim() !== '') { //输出为空拒绝
                this.props.onSubmit(e)
        }
    }

    changeTitle(e) {
        this.props.onChange(e)
    }
}

export default TodoInput