import React,{Component} from 'react';
import './UserDialog.css'
export default class UserDialog extends Component {
    constructor(props){
        super(props)
        this.state={
            selected:'signup'
        }
    }
    switch(e) {
        this.setState({
            selected:e.target.value
        })
    }
    render(){
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav onChange={this.switch.bind(this)}>  {/*事件代理，给父元素绑定事件*/}
                        <input type="radio" value="signIn" checked={this.selected==='signIn'}/>登录
                        <input type="radio" value="signUp" checked={this.selected==='signUp'}/>注册
                    </nav>
                    <div className="panes">
                        <form action="" className="signUp">  
                            {/*注册*/}
                            <div className="row">
                                <label>用户名</label>
                                <input type="text"/>
                            </div>
                            <div className="row">
                                <label>密码</label>
                                <input type="password"/>
                            </div>
                            <div className="row">
                                <button type="submit">登录</button>
                            </div>
                        </form>
                        <form action="" className="signIn">
                            {/*登录*/}
                            <div className="row">
                                 <label>用户名</label>
                                <input type="text"/>
                            </div>
                            <div className="row">
                                <label>密码</label>
                                <input type="password"/>
                            </div>
                            <div className="row">
                                <button type="submit">注册</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}