import React from 'react';
import { Carousel,Badge,Menu, Icon } from 'antd';
import withAxios from '../hoc/withAxios';
import imgURL from '../img/222.jpg';
import imgURL1 from '../img/333.jpg';
import imgURL2 from '../img/444.jpg';
import imgURL3 from '../img/555.jpg';
import imgURL4 from '../img/111.png';
import '../css/home.css';
import {connect} from 'react-redux';
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            num: 0,
            navs: [
                {
                    name: '精品装场',
                    shuju: "zhuangchang"
                },
                {
                    name: '精品单品',
                    shuju: "danpin"
                }
            ],
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
                },
            ],
            current: 'Home',
            goodlist: []
        }
        this.setCurrentIndex = this.setCurrentIndex.bind(this);
    }
    async componentWillMount() {
        // console.log(this)
        // 使用axios
        // let { data } = await this.props.axios.post('http://localhost:5200/api/home', {
        //     shuju: "zhuangchang"
        // });
        let { data } = await this.props.axios.get('http://localhost:5200/api/list')
        this.setState({
            goodlist: data
        });
    }
    componentDidMount() {
        var home = document.querySelector('#root');
        console.log(window)

        home.addEventListener("scroll", function () {
            console.log(666)
        })
    }
    // 这里是选项卡的事件
    setCurrentIndex(i, event) {
         this.setState({
            num: parseInt(event.currentTarget.getAttribute('index'))
        })
        // let res = this.state.navs[i].shuju;
        // console.log(i)
        // console.log(res)
        // this.props.axios.post('http://localhost:5200/api/home', {
        //     shuju: res
        // }).then(res => {
        //     var regs = res.data;
        //     this.setState({
        //         goodlist: regs
        //     })
        // }) console.log(event)
      

    }
    gotogoods(id) {
        let { history } = this.props;
        history.push({
            pathname: '/goods/' + id,
            search: '?id=' + id,
            state: {
                id
            }
        })
        // console.log(this.props)
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
    // 

    render() {
        let {cartlen} = this.props
        return (
            <div className='Home' style={{ overflow: 'auto' }}>
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
                            </Menu.Item>
                        )
                    }
                </Menu>
                {/* 头部广告 */}
                <div className='topimg' style={{ height: '3rem', width: '100%' }}>
                    <img className='Guanggaoimg' alt='' src='//jp.juancdn.com/jpwebapp/images/go_load_new.png'
                        style={{
                            width: '100%',
                            height: '3rem',
                        }} />
                </div>
                {/* 头部 */}
                <header style={{
                    width: '100%',
                    height: '2.5rem',
                    padding: '0 0.5973333333333334rem',
                    paddingRight: ' 0',
                    borderBottom: '1px solid #f2f2f2',
                    backgroundColor: '#fff',
                }}>
                    <div style={{
                        display: 'flex',
                        width: '100 %',
                        height: '100 %',
                    }}>

                        <span href='' style={{
                            position: 'relative',
                            width: '90%',
                            height: '1.5rem',
                            backgroundColor: '#f2f2f2',
                            alignItems: 'center',
                            fontSize: '0.512rem',
                            top: '0.5rem',
                            borderRadius: '10px',
                            display: 'flex'
                        }}>
                            <span style={{
                                width: '2rem',
                                height: '0.64rem',
                                margin: '0 0.21333333333333335rem',
                                paddingLeft: '1rem'
                            }}>
                                <img src='https://s1.juancdn.com/bao/170926/8/2/59ca3863a9fcf823cd42cfcb_84x60.png' alt=''
                                    style={{
                                        height: '100%',

                                    }} />
                            </span>
                            <span style={{ color: 'rgb(153, 153, 153)' }}>搜索</span>
                        </span>
                        <span style={{
                            width: '10%',
                            height: '1.8773333333333333rem',
                            position: 'relative',
                            top: '0.3rem',
                        }}>
                            <img src='https://goods3.juancdn.com/bao/170421/4/9/58f9f3bca43d1f15ff678b8c_132x132.png' alt=''
                                style={{
                                    height: '100%',

                                }} />
                        </span>
                    </div>

                </header>
                {/* 轮播图 */}
                <Carousel autoplay>
                    <div style={{
                        width: '100%',
                        height: '8rem',
                    }}><img src={imgURL} alt='' style={{
                        width: '100%',
                        height: '8rem',
                    }} /></div>
                    <div><img src={imgURL1} alt='' style={{
                        width: '100%',
                        height: '8rem',
                    }} /></div>
                    <div><img src={imgURL2} alt='' style={{
                        width: '100%',
                        height: '8rem',
                    }} /></div>
                    <div><img src={imgURL3} alt='' style={{
                        width: '100%',
                        height: '8rem',
                    }} /></div>
                    <div><img src={imgURL4} alt='' style={{
                        width: '100%',
                        height: '8rem',
                    }} /></div>
                </Carousel>
                {/* 轮播图下面的ul */}
                <div style={{ width: '100%', height: '4rem' }}>
                    <ul style={{ width: '100%', height: '4rem' }}>
                        <li style={{ width: '25%', flex: '1', height: '100%', float: 'left' }}>
                            <img src={require('../img/1111.png')} alt=''
                                style={{ width: '100%', height: '100%' }} /></li>
                        <li style={{ width: '25%', flex: '1', height: '100%', float: 'left' }}>
                            <img src={require('../img/2222.png')} alt=''
                                style={{ width: '100%', height: '100%' }} /></li>
                        <li style={{ width: '25%', flex: '1', height: '100%', float: 'left' }}>
                            <img src={require('../img/3333.png')} alt=''
                                style={{ width: '100%', height: '100%' }} /></li>
                        <li style={{ width: '25%', flex: '1', height: '100%', float: 'left' }}>
                            <img src={require('../img/4444.png')} alt=''
                                style={{ width: '100%', height: '100%' }} /></li>
                    </ul>
                </div>
                {/* 秒杀的3张图片 */}
                <div style={{
                    height: '12rem',
                    background: 'red',
                    width: '100%'
                }}>
                    {/* 这个是左边 */}
                    <div className='left' style={{ width: "50%", height: '100%', background: 'pink', float: 'left' }}>
                        <img src={require('../img/big.gif')} alt='' style={{ width: '100%', height: '100%' }} />
                    </div>
                    {/* 这个是右边 */}
                    <div className='right' style={{ width: "50%", height: '100%', background: 'pink', float: 'left' }}>
                        <img src={require('../img/top.png')} alt=''
                            style={{ width: '100%', height: '50%' }} />
                        <img src={require('../img/bottom.png')} alt=''
                            style={{ width: '100%', height: '50%' }} />
                    </div>
                </div>
                <div style={{ width: '100%', height: '1rem', background: '#f2f2f2' }}></div>
                {/* 大型动态图 */}
                <div style={{ width: '100%', height: '5rem' }}>
                    <img src={require('../img/bigimg.gif')} alt='' style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{ width: '100%', height: '1rem', background: '#f2f2f2' }}></div>
                {/* 图片呢 */}
                <div style={{
                    marginTop: '0.426667rem',
                    height: ' 2.0448rem',
                    width: '100%',
                }}>
                    <div style={{
                        margin: '0 -1px 0 0',
                        fontSize: '0',
                        float: 'left',
                    }}>
                        <img src={require('../img/img1.png')} alt='' style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
                {/* 选项卡部分 */}
                <div style={{
                    width: '100%', height: '2rem', backgroundColor: '#fff',
                    marginTop: '0.4266666666666667rem'
                }}>
                    <ul className='ulli' style={{
                        position: 'relative',
                        left: '0',
                        top: '0',
                        width: '100%',
                        height: '1.8773333333333333rem',
                        zIndex: '100',
                        backgroundColor: '#fff',
                    }}>
                        {this.state.navs.map((item, i) => <li key={i} index={i} className={this.state.num === i ? 'active' : ''} onClick={this.setCurrentIndex.bind(this, i)}>{item.name}</li>)}
                    </ul>
                </div>
                {/* 下面的列表 */}
                <div ref='xxx' style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <ul style={{ width: '100%', float: 'left', marginBottom: '3.3rem' }} ref='xx'>
                        {this.state.goodlist.map(item => <li key={item._id} style={{ width: '50%', height: '11rem', borderBottom: '1px solid #ccc', float: 'left', borderRight: '3px solid #fff' }}>
                            {/* 这里是图片的盒子 */}
                            <div onClick={this.gotogoods.bind(this, item.goods_id)} className='liimg' style={{
                                width: '100 %',
                                height: '7.978666666666666rem',
                                position: 'relative',
                            }}>
                                <img src={item.pic_url} alt=''
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }} />
                            </div>
                            {/* 价格 */}
                            <div style={{
                                paddingLeft: '0.3413333333333333rem',
                                paddingRight: '0.3413333333333333rem',
                                color: ' #bbb',
                                fontSize: '0.4693333333333333rem',
                                lineHeight: '0.9386666666666666rem',
                                margintop: '0.256rem',
                                display: 'flex',
                                alignitems: 'center',
                                position: 'relative',
                            }}>
                                <span style={{
                                    fontSize: '0.8rem',
                                    color: '#ff464e',
                                    marginRight: '0.17066666666666666rem'
                                }}>
                                    满199元减100元</span>
                            </div>
                            {/* 商品名字 */}
                            <div style={{
                                position: 'relative',
                                fontSize: '0.512rem',
                                color: '#3b3b3b',
                                paddingLeft: ' 0.3413333333333333rem',
                                paddingRight: '2.6453333333333333rem',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                marginBottom: '0.512rem'
                            }}>
                                "{item.title}"
    <p style={{
                                    color: ' #bbb',
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    right: '0.3413333333333333rem',
                                    fontSize: ' 0.4266666666666667rem',
                                }}>{item.time_left}</p>
                            </div>
                        </li>)}
                    </ul>
                </div>
            </div >)
    }
}
Home = withAxios(Home);
const mapStateToProps = (state)=>{
    return {
        cartlen:state.goodslist.length
    }
}
Home = connect(mapStateToProps)(Home);
export default Home;