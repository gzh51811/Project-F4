import React, { Component } from "react";
import { message, Button, Modal } from 'antd';
import "../../node_modules/antd/dist/antd.css"
import withAxios from '../hoc/withAxios'
class Reg extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            again: ''
        }
    }
    //初始化数据
    msg(e) {
        this.setState({
            username: e.target.value.trim()
        })
    }
    msg1(e) {
        this.setState({
            password: e.target.value.trim()
        })
    }
    msg2(e) {
        this.setState({
            again: e.target.value.trim()
        })
    }
    va7() {
        let { history } = this.props;
        history.push("/home")
    }
    //点击注册按钮
    reg() {
        let user = this.state.username;
        let psw = this.state.password;
        let again = this.state.again;
        if (user) {
            if (psw) {
                if (again) {
                    console.log(this)
                    let { axios, history } = this.props
                    axios.post('http://localhost:5200/api/reg', {
                        name: user,
                        psw
                    }).then(res => {
                        console.log(res)
                        if (res.status === 200) {
                            Modal.success({
                                content: "注册成功",
                            });
                            console.log(1)
                            setTimeout(() => {
                                history.push('/login')
                            }, 2000)

                        }
                    })
                } else {
                    message.error('两次密码不一致');
                }
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
                <div className="reg_head" style={{ position: 'relative', lineHeight: '2.125rem', textAlign: 'center' }}>
                    <img onClick={this.va7.bind(this)} src={require('../img/back.png')} alt='back' style={{ position: 'absolute', left: '1rem', top: '0.8rem' }} />
                    <span>注册</span>
                </div>
                <div style={{ textAlign: "right", paddingRight: '20%', paddingTop: '2rem' }}>
                    <label htmlFor="username">用户名:</label>
                    <input onChange={this.msg.bind(this)} id="username" type="text" placeholder="输入用户名" style={{ borderRadius: '0.5rem', border: '0.05rem solid #58bc58', fontSize: '0.8rem' }} />
                    <br />
                    <br />
                    <label htmlFor="psw">密码:</label>
                    <input onChange={this.msg1.bind(this)} id="psw" type="password" placeholder="输入密码" style={{ borderRadius: '0.5rem', border: '0.05rem solid #58bc58', fontSize: '0.8rem' }} />
                    <br />
                    <br />
                    <label htmlFor="again">确认密码：</label>
                    <input onChange={this.msg2.bind(this)} id="again" type="password" placeholder="再次确认密码" style={{ borderRadius: '0.5rem', border: '0.05rem solid #58bc58', fontSize: '0.8rem' }} />
                    <br />
                    <br />
                    <Button onClick={this.reg.bind(this)} type="primary" style={{ marginRight: '20%' }}>注册</Button>
                </div>

            </div>
        )
    }
}
Reg = withAxios(Reg);
export default Reg;