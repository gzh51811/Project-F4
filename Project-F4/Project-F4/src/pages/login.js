import React, { Component } from "react";
import { message, Button, Modal } from 'antd';
import withAxios from '../hoc/withAxios'
import "../../node_modules/antd/dist/antd.css"
class Login extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            pws: ''
        }
    }
    va1(e) {
        this.setState({
            user: e.target.value.trim()
        })
    }
    va2(e) {
        this.setState({
            pws: e.target.value.trim()
        })
    }
    va3() {
        let { history } = this.props;
        history.push("/reg")
    }
    va4() {
        let { history } = this.props;
        history.push("/home")
    }
    //点击登录
    login() {
        let username = this.state.user;
        let password = this.state.pws;
        if (username) {
            if (password) {
                let { axios, history } = this.props;
                axios.post('http://localhost:5200/api/login', {
                    user: username,
                    psw: password
                }).then(res => {
                    if (res.status === 200) {
                        console.log(res.data)
                        localStorage.setItem("username", res.data.username);
                        localStorage.setItem("token", res.data._token);
                        Modal.success({
                            content: "登录成功",
                        });
                        setTimeout(() => {
                            history.push('/wecar')
                        }, 2000)

                    }
                })
            } else {
                message.error('密码不能为空');
            }
        } else {
            message.error('用户名不能为空');
        }
    }
    render() {
        return (
            <div className="reg">
                <div className='topimg' style={{ height: '3rem', width: '100%' }}>
                    <img className='Guanggaoimg' alt='' src='//jp.juancdn.com/jpwebapp/images/go_load_new.png'
                        style={{
                            width: '100%',
                            height: '3rem',
                        }} />
                </div>
                <div className="reg_head" style={{ position: 'relative', lineHeight: '2.125rem', textAlign: 'center' }}>
                    <img onClick={this.va4.bind(this)} src={require('../img/back.png')} alt='back' style={{ position: 'absolute', left: '1rem', top: '0.8rem' }} />
                    <span style={{ fontSize: '1rem ' }}>登录</span>
                </div>
                <div style={{ textAlign: "right", paddingRight: '20%', paddingTop: '3rem' }}>
                    <label htmlFor="username">用户名:</label>
                    <input onChange={this.va1.bind(this)} id="username" type="text" placeholder="输入用户名" style={{ borderRadius: '0.5rem', border: '0.05rem solid #58bc58', fontSize: '0.8rem' }} />
                    <br />
                    <br />
                    <label htmlFor="psw">密码:</label>
                    <input onChange={this.va2.bind(this)} id="psw" type="password" placeholder="输入密码" style={{ borderRadius: '0.5rem', border: '0.05rem solid #58bc58', fontSize: '0.8rem' }} />
                    <br />
                    <br />
                    <Button onClick={this.login.bind(this)} type="primary" style={{ marginRight: '20%' }}>登录</Button>
                    <div>没账号？
                        <span onClick={this.va3.bind(this)} style={{ color: 'blue' }}>注册</span>
                    </div>
                </div>

            </div>
        )
    }
}
Login = withAxios(Login);
export default Login;