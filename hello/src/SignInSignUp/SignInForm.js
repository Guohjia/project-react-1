import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
export default function(props) {
    const style = {
       margin: 12,
   };
        return (
            <form className="signIn" onSubmit={props.onSubmit}>
                {/*登录*/}
                <h2>Welcome Back</h2>
                <div className="row">
                    <label>
                        <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </label>
                    <input type="text" value={props.formData.username}
                        onChange={props.onChange.bind(null, 'username')} placeholder={'Username'}/>
                </div>
                <div className="row">
                    <label>
                        <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                        </svg>
                    </label>
                    <input type="password" value={props.formData.password}
                        onChange={props.onChange.bind(null, 'password')} placeholder={'Password'}/>
                </div>
                    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                   <RaisedButton label="Sign In" style={style} type="submit"/> 
                   </MuiThemeProvider>
                    <a href="#" onClick={props.onForgotPassword}>forgot?</a>
            </form>
        )
    }


