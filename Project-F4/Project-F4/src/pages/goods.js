import React from 'react';
import url from 'url';
import withAxios from '../hoc/withAxios';
import store from '../store';
import { Icon, Drawer, Button,Badge } from 'antd';
import {connect} from 'react-redux';
const ButtonGroup = Button.Group;
class Goods extends React.Component {
    constructor() {
        super();
        this.state = {
            goodsId: 'douleimi',
            visible: false,
            size: 'large',
            // join shoppingCart
            thenum: 1,
            thesize: 'XL',
            thecolor: '鲜红色',
            info:{}
        }
    }
    componentWillMount() {
        let { location } = this.props;
        let { query } = url.parse(location.search, true);
        // console.log(query.id)
        this.props.axios.get('http://localhost:5200/api/list').then(res => {
            // console.log(res)
            res.data.some((item, idx) => {
                if (item.goods_id === query.id) {
                    this.setState({
                        goodsId: res.data[idx]
                    })
                }
            })
        })
    }
    showDrawer = () => {
        this.setState({
            visible: true
        });
    };
    onClose = () => {
        this.setState({
            visible: false
        });
    };
    delNum = () => {
        if (this.state.thenum <= 1) {
            this.setState({
                thenum: 1
            })
        } else {
            this.setState({
                thenum: this.state.thenum - 1
            })
        }
        // console.log(this.state.thenum)
    }
    addNum = () => {
        this.setState({ thenum: this.state.thenum + 1 })
        // console.log(this.state.thenum)
    }
    changeColor(num) {
        // console.log(this.refs[num].props.children)
        this.setState({ thecolor: this.refs[num].props.children })

    }
    changeSize(num) {
        // console.log(this.refs[num].props.children)
        this.setState({ thesize: this.refs[num].props.children })
    }
    joinShoppingCart = () => {
        let { location } = this.props;
        let { query } = url.parse(location.search, true);
        this.setState({
            visible: false
        });
        let data = {
            goods_id: query.id,
            thenum: this.state.thenum,
            thesize: this.state.thesize,
            thecolor: this.state.thecolor,
            title:this.state.goodsId.title,
            pic_url:this.state.goodsId.pic_url,
            oprice:this.state.goodsId.oprice
        }
        store.dispatch({type:'add_to_cart',payload:{...data}})
        // console.log('商品信息：' + data.id, data.thenum, data.thesize, data.thecolor)
        // this.props.axios.get('http://localhost:5200/api/list',
        //     params:{
        //         ...data
        //     }
        // ).then(res => {
            console.log(data)
        // })
    }
    va5() {
        let { history } = this.props;
        history.push("/home")
    }
    gotocart() {
        let { history } = this.props;
        history.push("/cart")
    }
    render() {
        let {cartlen} = this.props
        const size = this.state.size;
        return <div className="Goods">
            <div>
                <img style={{ width: '100%' }} src={this.state.goodsId.pic_url} alt='' />
                <p><em style={{ color: '#f00' }}>￥{this.state.goodsId.oprice}</em></p>
                <p>{this.state.goodsId.title}</p>
                <p style={{ borderTop: '10px solid rgba(0, 0, 0, 0.04)', lineHeight: '40px' }}>.24小时发货 .7天包退 .售后补贴</p>
                <p style={{ borderTop: '10px solid rgba(0, 0, 0, 0.04)', lineHeight: '40px' }}>已选择：<br />颜色：{this.state.thecolor}<span style={{ marginLeft: '20px' }}>尺寸：{this.state.thesize}</span></p>
            </div>
            <div className="footer">
                <ul style={{ position: 'fixed', height: '60px', bottom: '0', zIndex: '998', width: '100%', padding: '0', margin: '0' }}>
                    <li onClick={this.va5.bind(this)} style={{ borderLeft: '1px solid #ccc', textAlign: 'center', width: '20%', display: 'display', float: 'left', listStyle: 'none',height: '60px' }}><Icon style={{marginTop:'10px'}} type='home' /><br />首页</li>
                    
                    <li onClick={this.gotocart.bind(this)} style={{borderLeft: '1px solid #ccc', textAlign: 'center', width: '20%', display: 'display', float: 'left', listStyle: 'none',height: '60px' }}>
                        <Badge  count={cartlen}>
                            <Icon style={{marginTop:'10px'}} type="shopping-cart" />
                                <span className="head-example" />
                                <br />购物车
                        </Badge>
                    </li>
                    
                    <li style={{ borderLeft: '1px solid #ccc', textAlign: 'center', width: '25%', display: 'display', float: 'left', listStyle: 'none', height: '60px', lineHeight: '46px' }}>
                        <Button style={{ width: '100%', height: '100%' }} size={size} onClick={this.showDrawer}>立即购买</Button>
                    </li>
                    <li style={{ background: '#ff464e', color: '#fff', textAlign: 'center', width: '35%', display: 'display', float: 'left', listStyle: 'none', height: '60px', lineHeight: '46px' }}>
                        <Button style={{ width: '100%', height: '100%' }} type="primary" onClick={this.showDrawer}>加入购物车</Button>
                    </li>
                </ul>
                {/* 抽屉 */}
                <Drawer title={this.state.goodsId.title} placement="bottom" closable={true} height={'400px'} onClose={this.onClose} visible={this.state.visible}>
                    <p style={{ marginTop: '10px' }}>颜色</p>
                    <Button ref={0} onClick={this.changeColor.bind(this, 0)} style={{ marginRight: '10px' }} size={size}>鲜红色</Button>
                    <Button ref={1} onClick={this.changeColor.bind(this, 1)} style={{ marginRight: '10px' }} size={size}>浅黄色</Button>
                    <Button ref={2} onClick={this.changeColor.bind(this, 2)} style={{ marginRight: '10px' }} size={size}>蓝黑色</Button>
                    <p style={{ marginTop: '10px' }}>尺码</p>
                    <Button ref={3} onClick={this.changeSize.bind(this, 3)} style={{ marginRight: '10px' }} size={size}>XL</Button>
                    <Button ref={4} onClick={this.changeSize.bind(this, 4)} style={{ marginRight: '10px' }} size={size}>XXL</Button>
                    <Button ref={5} onClick={this.changeSize.bind(this, 5)} style={{ marginRight: '10px' }} size={size}>XXXXL</Button>
                    <div style={{ margin: '10px 0', height: '32px' }}>购买数量
                        <ButtonGroup style={{ float: 'right' }}>
                            <Button onClick={this.delNum} style={{ color: '#f00', fontSize: '20px' }}>-</Button>
                            <Button style={{ color: '#000', fontSize: '20px' }} disabled>{this.state.thenum}</Button>
                            <Button onClick={this.addNum} style={{ color: '#f00', fontSize: '20px' }}>+</Button>
                        </ButtonGroup>
                    </div>
                    <Button onClick={this.joinShoppingCart} style={{ marginTop: '20px', height: '40px' }} type="primary" block>确定</Button>
                </Drawer>
            </div>
        </div>
    }
}
Goods = withAxios(Goods);
const mapStateToProps = (state)=>{
    return {
        cartlen:state.goodslist.length
    }
}
Goods = connect(mapStateToProps)(Goods);
export default Goods;