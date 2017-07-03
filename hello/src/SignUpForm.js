import React,{Component} from 'react';

export default class SignUpForm extends Component{
    render(){
        return (
            <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}>
                {/*注册*/}
                <div className="row">
                    <label>邮箱</label>
                    <input type="text" value={this.props.formData.email}
                        onChange={this.props.onChange.bind(this, 'email')} />
                </div>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.props.formData.username}
                        onChange={this.props.onChange.bind(this, 'username')} /> {/*bind不仅绑定this，而且传入第一个参数，即传给函数changeFormData的形参key*/}
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.props.formData.password}
                        onChange={this.props.onChange.bind(this, 'password')} />
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
    }
}