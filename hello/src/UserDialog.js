import React,{Component} from 'react';
import './UserDialog.css'
import {signUp,signIn} from './leanCloud'

export default class UserDialog extends Component {
    constructor(props){
        super(props)
        this.state={
            selected:'signIn',
            formData:{
                username:'',
                password:''
            }
        }
    }
    switch(e) {
        this.setState({
            selected:e.target.value
        })
    }
    signUp(e){
        e.preventDefault()
        let {username,password}=this.state.formData
        let success=(user)=>{
            this.props.onSignUp(user)
        }
        let error=(error)=>{
            alert(error)
        }
        signUp(username,password,success,error)
    }
    signIn(e){
        e.preventDefault()
        let {username,password}=this.state.formData
        let success=(user)=>{
            this.props.onSignIn(user)
        }
        let error=(error)=>{
            alert(error)
        }
        signIn(username,password,success,error)
    }
    changeFormData(key,e){
        let stateCopy=JSON.parse(JSON.stringify(this.state))  //先深拷贝state，然后再改变需要的属性，最后再setState;因为不能直接对state进行操作，否则会发警告，warning  Do not mutate state directly. Use setState(
        stateCopy.formData[key]=e.target.value
        this.setState(stateCopy)
    }
    render(){
        let signUpForm=(
            <form className="signUp" onSubmit={this.signUp.bind(this)}>  
                            {/*注册*/}
                            <div className="row">
                                <label>用户名</label>
                                <input type="text" value={this.state.formData.username}
                                onChange={this.changeFormData.bind(this,'username')}/> {/*bind不仅绑定this，而且传入第一个参数，即传给函数changeFormData的形参key*/}
                            </div>
                            <div className="row">
                                <label>密码</label>
                                <input type="password" value={this.state.formData.password}
                                onChange={this.changeFormData.bind(this,'password')}/>
                            </div>
                            <div className="row actions">
                                <button type="submit">注册</button>
                            </div>
                        </form>
        )
        let signInForm=(
            <form className="signIn" onSubmit={this.signIn.bind(this)}>
                            {/*登录*/}
                            <div className="row">
                                 <label>用户名</label>
                                <input type="text" value={this.state.formData.username}
                                onChange={this.changeFormData.bind(this,'username')}/>
                            </div>
                            <div className="row">
                                <label>密码</label>
                                <input type="password" value={this.state.formData.password}
                                onChange={this.changeFormData.bind(this,'password')}/>
                            </div>
                            <div className="row actions">
                                <button type="submit">登录</button>
                            </div>
                        </form>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav onChange={this.switch.bind(this)}>  {/*事件代理，给父元素绑定事件*/}
                        <label><input type="radio" value="signIn" checked={this.state.selected==='signIn'} onChange={this.switch.bind(this)}/>登录</label>{/*checked可以让单选按钮有一个预选值   */}
                        <label><input type="radio" value="signUp" checked={this.state.selected==='signUp'} onChange={this.switch.bind(this)}/>注册</label>
                    </nav>
                    <div className="panes">
                        {this.state.selected==='signUp' ?signUpForm:null}
                        {this.state.selected==='signIn' ?signInForm:null}
                    </div>
                </div>
            </div>
        )
    }
}