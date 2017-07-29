import React, { Component } from 'react';
import './css/UserDialog.css'
import ForgotPasswordForm from './SignInSignUp/ForgotPasswordForm'
import SignInOrSignUp from './SignInSignUp/SignInOrSignUp'
import { signUp, signIn, sendPasswordResetEmail } from './leanCloud'

export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'signInOrSignUp',
            formData: {
                email: '',
                username: '',
                password: ''
            }
        }
    }
    
    signUp(e) {
        e.preventDefault()
        if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.)([a-zA-Z0-9_-])+$/.test(this.state.formData.email)){
            alert('邮箱格式有误') 
            return
        }
        if(!(/^([a-z0-9_]{6,16}$)/.test(this.state.formData.username))
          ||/(^[A-Z]*$)|(^[a-z]*$)|(^[0-9]*$)|(^_*$)/.test(this.state.formData.username)){
            alert('用户名必须为6~16为的小写字母、数字、下滑线，且至少包含两种及以上')
            return
        }
        if(!(/.{6}/.test(this.state.formData.password))){
            alert('密码长度必须大于6位')
            return
        }
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
        console.log(1) //登录中 显示load插件
        e.preventDefault()
        let { username, password } = this.state.formData
        let success = (user) => {
            console.log(2) //登录成功
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
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ? 
                    <SignInOrSignUp formData={this.state.formData}
                    onSignIn={this.signIn.bind(this)}
                    onSignUp={this.signUp.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onForgotPassword={this.showForgotPassword.bind(this)}/>: 
                    <ForgotPasswordForm formData={this.state.formData}
                    onResetpassword={this.resetPassword.bind(this)}
                    onChange={this.changeFormData.bind(this)}
                    onReturnToSignIn={this.returnToSignIn.bind(this)}/>}
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