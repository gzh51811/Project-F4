import React from 'react';
import { Menu, Icon } from 'antd';
// import { url } from 'inspector';
class Wecar extends React.Component {
    constructor() {
        super();
        this.state = {
            log: "登录",
            reg: "注册",
            isok: false,
            navss: [
                {
                    text: '首页',
                    name: 'Home',
                    path: '/home',
                    icon: 'home'
                },
                {
                    text: '分类',
                    name: 'Classify',
                    path: '/classify',
                    icon: 'appstore'
                },
                {
                    text: '购物',
                    name: 'Car',
                    path: '/car',
                    icon: 'shopping-cart'
                },
                {
                    text: '我的',
                    name: 'Wecar',
                    path: '/wecar',
                    icon: 'user'
                },
            ],
            current: 'Home',
        }
    }
    handleClick = (e) => {
        console.log(this, e)
        this.setState({
            current: e.key
        }, () => {
            //路由跳转：编程式导航
            // 利用withRouter()高阶组件实现history的传递
            this.props.history.push('/' + e.key.toLowerCase());
        });
    }
    log() {
        let { history } = this.props;
        history.push("/login")
    }
    reg() {
        let { history } = this.props;
        history.push("/reg")
    }
    componentWillMount() {
        let _token = localStorage.getItem("token")
        let username = localStorage.getItem("username")
        if (_token) {
            this.setState({
                log: username,
                isok: true
            })
        }
    }
    va5() {
        let { history } = this.props;
        history.push("/home")
    }
    va6() {
        let { history } = this.props;
        history.push("/login")
        localStorage.removeItem("username");
        localStorage.removeItem("token");
    }
    render() {
        return (
            <div className='wecar'>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    {
                        this.state.navss.map(item => <Menu.Item key={item.name}><Icon type={item.icon} />{item.text}</Menu.Item>)
                    }
                </Menu>
                <div className="we_main">
                    <div className="we_header" style={{ backgroundColor: '#fe464e', height: '9rem', paddingTop: '1rem', color: '#ffebec', fontSize: '1.1rem' }}>
                        <div className="we_header_top" style={{ textAlign: 'center', position: 'relative', marginBottom: '3rem' }}>
                            <img onClick={this.va5.bind(this)} src={require('../img/forward.png')} alt='tupian' width='15' height='22' style={{ position: 'absolute', left: '0.5rem' }} />
                            <span>个人中心</span>
                        </div>
                        {
                            this.state.isok ?
                                (<div className="wecar_header_middle" style={{ marginLeft: '50%', transform: 'translateX(-50%)' }}><div onClick={this.log.bind(this)} className="wecar_header_middle_l" style={{ float: 'left', marginRight: '2rem' }}>{this.state.log}</div>
                                    <div className="wecar_header_middle_m" style={{ float: 'left' }}>|</div>
                                    <div onClick={this.va6.bind(this)} className="wecar_header_middle_r" style={{ float: 'left', marginLeft: '2rem' }}>退出</div></div>)
                                :
                                (<div className="wecar_header_middle" style={{ marginLeft: '50%', transform: 'translateX(-50%)' }}><div onClick={this.log.bind(this)} className="wecar_header_middle_l" style={{ float: 'left', marginRight: '2rem' }}>登录</div>
                                    <div className="wecar_header_middle_m" style={{ float: 'left' }}>|</div>
                                    <div onClick={this.reg.bind(this)} className="wecar_header_middle_r" style={{ float: 'left', marginLeft: '2rem' }}>注册</div></div>)
                        }
                    </div>
                    <div className="wecar_order" style={{ padding: '0 0.8rem', borderBottom: '0.625rem solid #f4f4f8' }}>
                        <div className="wecar_order_top" style={{ fontSize: '0.9rem', height: '3rem', lineHeight: '3rem', borderBottom: '0.0625rem solid #f5f5f5' }}>
                            <div className="wecar_order_top_l" style={{ float: 'left', color: '#333333' }}>我的订单</div>
                            <div className="wecar_order_top_r" style={{ float: 'right', color: '#d7d7d7' }}>全部订单</div>
                        </div>
                        <div className="wecar_order_b" style={{ display: 'flex', paddingTop: '1.25rem', paddingBottom: '1rem' }}>
                            <li style={{ float: 'left', listStyle: 'none', flex: '1', textAlign: 'center' }}>
                                <Icon type="wallet" style={{ fontSize: '1.5rem', display: 'block' }} />
                                <span>待付款</span>
                            </li>
                            <li style={{ float: 'left', listStyle: 'none', flex: '1', textAlign: 'center' }}>
                                <Icon type="team" style={{ fontSize: '1.5rem', display: 'block' }} />
                                <span>组团</span>
                            </li>
                            <li style={{ float: 'left', listStyle: 'none', flex: '1', textAlign: 'center' }}>
                                <Icon type="bank" style={{ fontSize: '1.5rem', display: 'block' }} />
                                <span>待收货</span>
                            </li>
                            <li style={{ float: 'left', listStyle: 'none', flex: '1', textAlign: 'center' }}>
                                <Icon type="pay-circle" style={{ fontSize: '1.5rem', display: 'block' }} />
                                <span>退款/售后</span>
                            </li>
                        </div>
                    </div>
                    <div style={{ padding: '0 0.8rem', lineHeight: '2.5rem', borderBottom: '0.625rem solid #f4f4f8' }}>
                        <div style={{ borderBottom: '0.0625rem solid #f5f5f5' }}>我的优惠卷</div>
                        <div style={{ borderBottom: '0.0625rem solid #f5f5f5' }}>我的收藏</div>
                        <div style={{ borderBottom: '0.0625rem solid #f5f5f5' }}>我的拼团</div>
                        <div style={{ borderBottom: '0.0625rem solid #f5f5f5' }}>我的免单卷</div>
                        <div style={{ borderBottom: '0.0625rem solid #f5f5f5' }}>借钱</div>
                    </div>
                    <div style={{ lineHeight: '2.5rem', padding: '0 0.8rem', borderBottom: '0.0625rem solid #f5f5f5' }}>客服中心</div>
                    <div style={{ lineHeight: '2.5rem', padding: '0 0.8rem' }}>关于卷皮</div>
                    <div style={{ height: '3rem' }}></div>
                </div>
            </div>)
    }

}
export default Wecar