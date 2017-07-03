import React, { Component } from 'react';
import './UserDialog.css'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import { signUp, signIn, sendPasswordResetEmail } from './leanCloud'

export default class UserDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'signIn',
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
        let signInOrSignUp = (
            <div className="signInOrSignUp">
                <nav>
                    <label>
                        <input type="radio" value="signIn"
                            checked={this.state.selected === 'signIn'}
                            onChange={this.switch.bind(this)} />登录
                    </label>
                    <label>
                        <input type="radio" value="signUp"
                            checked={this.state.selected === 'signUp'}
                            onChange={this.switch.bind(this)} />注册
                    </label>
                </nav>
                <div className="panes">
                    {this.state.selected === 'signUp' ? <SignUpForm formData={this.state.formData} 
                        onSubmit={this.signUp.bind(this)}
                        onChange={this.changeFormData.bind(this)}/>:null}
                    {this.state.selected === 'signIn' ? <SignInForm formData={this.state.formData}
                        onSubmit={this.signUp.bind(this)}
                        onChange={this.changeFormData.bind(this)}
                        onForgotPassword={this.showForgotPassword.bind(this)}/>: null}
                </div>
            </div>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ? 
                    signInOrSignUp : 
                    <ForgotPasswordForm formData={this.state.formData}
                    onResetpassword={this.resetPassword.bind(this)}
                    onChangeFormData={this.changeFormData.bind(this)}
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