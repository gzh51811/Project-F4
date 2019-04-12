import React,{Component} from 'react';
import store from '../store';
import withAxios from '../hoc/withAxios';
import {connect} from 'react-redux';
import { List,Icon,Button,Row, Col,Menu,Badge} from 'antd';
const ButtonGroup = Button.Group;
class Cart extends Component{
    constructor(){
        super();
        this.state = {
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
                    name: 'Cart',
                    path: '/cart',
                    icon: 'shopping-cart'
                },
                {
                    text: '我的',
                    name: 'Wecar',
                    path: '/wecar',
                    icon: 'user'
                }
            ],
            ...store.getState()
        }
    }
// >Action用于定义如何改变state，是用户改变 State 的唯一方式，
//     * 格式：`{type:'UPDATE_CART',payload}`
//     * type: 一个简单的字符串常量，例如ADD, UPDATE, DELETE等。
//     * payload: 用于更新状态的数据。
// * 使用方式：
// ```js
//     store.dispatch({type:'UPDATE_CART',{num:100});
// ```
    decline(goods){
        goods.thenum<=1?console.log(1):store.dispatch({type:'DECLINE_QTY',payload:{...goods}})
    }
    increase(goods){
        store.dispatch({type:'INCREASE_QTY',payload:{...goods}})
    }
    delcart(goods){
        store.dispatch({type:'del_to_cart',payload:{...goods}})
    }
    componentDidMount(){
        // 监听store的修改 -> 重新渲染组件
        store.subscribe(()=>{
            // console.log('jt:',store.getState())
            this.setState({
                ...store.getState()
            })
            // console.log(store.getState().goodslist);
        })
    }
    handleClick = (e) => {
        // console.log(this, e)
        this.setState({
            current: e.key
        }, () => {
            //路由跳转：编程式导航
            // 利用withRouter()高阶组件实现history的传递
            this.props.history.push('/' + e.key.toLowerCase());
        });
    }
    render(){
        let {goodslist} = this.state;
        let {cartlen} = this.props
        // console.log(goodslist)
        return <div className="home">
                    <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    >
                    {
                        this.state.navss.map(item => <Menu.Item key={item.name}>
                            {
                            item.name==='Cart'
                            ?
                            <Badge count={cartlen}>
                                <span className="head-example" />
                                <Icon type={item.icon} />
                                {item.text}
                            </Badge>
                            :
                            <>
                                <Icon type={item.icon} />{item.text}
                            </>
                        }
                        </Menu.Item>)
                    }
                    </Menu>
                    <List
                        itemLayout="horizontal">
                        {
                            goodslist.map(goods => {
                                return <Row key={goods.goods_id}>
                                <Col span={22}>
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<img src={goods.pic_url} style={{ width: '120px', height: '120px',marginLeft:'20px' }} alt="" />}
                                            title={goods.title}
                                            description={<div>
                                                <p style={{color:'red'}} className="price">￥<span>{goods.oprice}</span></p>
                                                <ButtonGroup>
                                                    <Button onClick={this.decline.bind(this,goods)}>
                                                    <Icon type="minus" />
                                                    </Button>
                                                    <Button>{goods.thenum}</Button>
                                                    <Button onClick={this.increase.bind(this,goods)}>
                                                    <Icon type="plus" />
                                                    </Button>
                                                </ButtonGroup><br/>
                                                总价：<p style={{color:'red'}} className="price">￥<span>{goods.oprice*goods.thenum}</span></p>
                                            </div>}
                                        />
                                    </List.Item>
                                </Col>
                                <Col span={2}>
                                     <Icon onClick={this.delcart.bind(this,goods)} type='close' />           
                                </Col>
                              </Row>
                            })
                        }
                    </List>
                        总价：<p style={{color:'red'}}>￥<span style={{fontSize:'30px'}}>{goodslist.reduce((prev,item,idx)=>{return prev + item.oprice*item.thenum},0)}</span></p>
                </div>
    }
}
Cart = withAxios(Cart);
const mapStateToProps = (state)=>{
    return {
        cartlen:state.goodslist.length
    }
}
Cart = connect(mapStateToProps)(Cart);
export default Cart;