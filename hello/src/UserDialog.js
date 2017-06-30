import React, { Component } from 'react';
import './UserDialog.css'
import { signUp, signIn, sendPasswordResetEmail } from './leanCloud'

export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signUp',
            selectedTab: 'signInOrSignUp',
            formData: {
                email: '',
                username: '',
                password: ''
            }
        }
    }
    switch(e) {
        this.setState({
            selected: e.target.value
        })
    }
    signUp(e) {
        e.preventDefault()
        let { email, username, password } = this.state.formData
        let success = (user) => {
            this.props.onSignUp(user)
        }
        let error = (error) => {
            switch (error.code) {
                case 202:
                    alert('用户名已经占用')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signUp(email, username, password, success, error)
    }
    signIn(e) {
        e.preventDefault()
        let { username, password } = this.state.formData
        let success = (user) => {
            this.props.onSignIn(user)
        }
        let error = (error) => {
            switch (error.code) {
                case 210:
                    alert('用户名与密码不匹配')
                    break
                case 211:
                    alert('不存在的用户名，请注册')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signIn(username, password, success, error)
    }
    changeFormData(key, e) {
        let stateCopy = this.JSONCopy(this.state)  //先深拷贝state，然后再改变需要的属性，最后再setState;因为不能直接对state进行操作，否则会发警告，warning  Do not mutate state directly. Use setState(
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }
    JSONCopy(data) {
        return JSON.parse(JSON.stringify(data))
    }  //JSON深拷贝封装
    render() {
        let signUpForm = (
            <form className="signUp" onSubmit={this.signUp.bind(this)}>
                {/*注册*/}
                <div className="row">
                    <label>邮箱</label>
                    <input type="text" value={this.state.formData.email}
                        onChange={this.changeFormData.bind(this, 'email')} />
                </div>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                        onChange={this.changeFormData.bind(this, 'username')} /> {/*bind不仅绑定this，而且传入第一个参数，即传给函数changeFormData的形参key*/}
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                        onChange={this.changeFormData.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
        let signInForm = (
            <form className="signIn" onSubmit={this.signIn.bind(this)}>
                {/*登录*/}
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                        onChange={this.changeFormData.bind(this, 'username')} />
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                        onChange={this.changeFormData.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <button type="submit">登录</button>
                    <a href="#" onClick={this.showForgotPassword.bind(this)}>忘记密码？</a>
                </div>
            </form>
        )
        let signInOrSignUp = (
            <div className="signInOrSignUp">
                <nav>
                    <label>
                        <input type="radio" value="signUp"
                            checked={this.state.selected === 'signUp'}
                            onChange={this.switch.bind(this)} />注册
                    </label>
                    <label>
                        <input type="radio" value="signIn"
                            checked={this.state.selected === 'signIn'}
                            onChange={this.switch.bind(this)} />登录
                    </label>
                </nav>
                <div className="panes">
                    {this.state.selected === 'signUp' ? signUpForm : null}
                    {this.state.selected === 'signIn' ? signInForm : null}
                </div>
            </div>
        )
        let forgotPassword = (
            <div className="forgotPassword">
                <h3>
                    重置密码
                </h3>
                <form className="forgotPassword" onSubmit={this.resetPassword.bind(this)}>
                    <div className="row">
                        <label>邮箱</label>
                        <input type="text" value={this.state.formData.email}
                            onChange={this.changeFormData.bind(this, 'email')} />
                    </div>
                    <div className="row actions">
                        <button type="submit">发送重置邮件</button>
                        <a href="#" onClick={this.returnToSignIn.bind(this)}>返回登录</a>
                    </div>
                </form>
            </div>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ? signInOrSignUp : forgotPassword}
                </div>
            </div>
        )
    }
    showForgotPassword() {
        let stateCopy = this.JSONCopy(this.state)
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }
    returnToSignIn() {
        let stateCopy = this.JSONCopy(this.state)
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }
    resetPassword(e) {
        e.preventDefault();
        sendPasswordResetEmail(this.state.formData.email)
    }
}