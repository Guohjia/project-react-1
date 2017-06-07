import React,{Component} from 'react';

export default class UserDialog extends Component {
    render(){
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav>
                        <input type="radio"/>注册
                        <input type="radio"/>登录
                    </nav>
                    <div className="panes">
                        <form action="" className="signUp">  
                            {/*注册*/}
                            <div className="row">
                                <label>
                                    用户名
                                    <input type="text"/>
                                </label>
                            </div>
                            <div className="row">
                                <label>密码</label>
                                <input type="password"/>
                            </div>
                            <div className="row">
                                <button type="submit">注册</button>
                            </div>
                        </form>
                        <form action="" className="signIn">
                            {/*登录*/}
                            <div className="row">
                                <label>
                                    用户名
                                    <input type="text"/>
                                </label>
                            </div>
                            <div className="row">
                                <label>密码</label>
                                <input type="password"/>
                            </div>
                            <div className="row">
                                <button type="submit">登录</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}