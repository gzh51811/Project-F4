import React, { Component } from "react";
import {
    Layout, Menu, Breadcrumb, Icon
} from 'antd';
import "../../node_modules/antd/dist/antd.css";
import Home from "../content/home"
import Goods from "../content/goods"
import Order from "../content/order"
import User from "../content/user"
import { Route ,withRouter} from 'react-router-dom';
const { SubMenu } = Menu;
const {
    Header, Content, Footer, Sider,
} = Layout;

class Main extends Component {
    constructor() {
        super();
        this.state = {
            navs: [
                {
                    key: 0,
                    text: "首页",
                    path: "/content/home",
                    component: Home
                },
                {
                    key: 1,
                    text: "商品管理/商品",
                    path: "/content/goods",
                    component: Goods
                },
                {
                    key: 5,
                    text: "订单管理/订单",
                    path: "/content/order",
                    component: Order
                },
                {
                    key: 9,
                    text: "用户管理/用户",
                    path: "/content/user",
                    component: User
                }
            ],
            current: "首页",
            currentPath: "/content/home",
            com: Home,

        }
        this.cc = this.cc.bind(this);
    }
    cc(e) {
        this.state.navs.map(item => {
            if (e.key*1 === item.key) {
                this.setState({ current: item.text, com:item.component,currentPath:item.path})
                this.props.history.push(item.path)
            }
            return ""
        })
        
    }
    render() {
        return (
            <Layout>
                <Header className="header">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">卷皮折扣电商后台管理系统</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>{this.state.current}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['0']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                {/* <Menu.Item key="531">首页</Menu.Item> */}
                                <Menu.Item key="0" onClick={this.cc}>
                                    <Icon type="pie-chart" />
                                    <span>首页</span>
                                </Menu.Item>
                                <SubMenu key="sub1" title={<span><Icon type="user" />商品管理</span>}>
                                    <Menu.Item key="1" onClick={this.cc}>商品</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="laptop" />订单管理</span>}>
                                    <Menu.Item key="5" onClick={this.cc}>订单</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="notification" />用户管理</span>}>
                                    <Menu.Item key="9" onClick={this.cc}>用户</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Route path={this.state.currentPath} component={this.state.com}></Route>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
          </Footer>
            </Layout>
        )
    }
}
Main=withRouter(Main)
export default Main;