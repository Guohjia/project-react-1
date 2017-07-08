import React from 'react';

export default function(props){  
        return (
            <form className="signUp" onSubmit={props.onSubmit}>
                {/*注册*/}
                <div className="row">
                    <label>邮箱</label>
                    <input type="text" value={props.formData.email}
                        onChange={props.onChange.bind(null, 'email')} />
                </div>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={props.formData.username}
                        onChange={props.onChange.bind(null, 'username')} /> {/*bind不仅绑定this，而且传入第一个参数，即传给函数changeFormData的形参key*/}
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={props.formData.password}
                        onChange={props.onChange.bind(null, 'password')} />
                </div>
                <div className="row actions">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
    }

