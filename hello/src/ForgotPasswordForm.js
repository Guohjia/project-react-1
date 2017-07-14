import React,{Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

export default class ForgotPasswordForm extends  Component{
    render(){
        return (
            <div className="forgotPassword">
                <h3>
                    Reset Email
                </h3>
                <form className="forgotPassword" onSubmit={this.props.onResetpassword}>
                    <div className="row">
                        <label>
                            <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                        </label>
                        <input type="text" value={this.props.formData.email}
                            onChange={this.props.onChange.bind(null, 'email')} 
                           placeholder={'Email'}/>
                    </div>
                    <div className="row actions">
                        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                            <RaisedButton label="Send Email To Reset"  type="submit"/> 
                        </MuiThemeProvider>
                        {/*<button type="submit">发送重置邮件</button>*/}
                        <a href="#" onClick={this.props.onReturnToSignIn}>Back to Sign In</a>
                    </div>
                </form>
            </div>
        )
    }
}