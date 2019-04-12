import React, { Component } from 'react';
import { Layout, Input } from 'antd';
import withAxios from '../hoc/withAxios';
// import {Switch,Route} from 'react-router-dom';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
const {
  Sider, Content,
} = Layout;
const Search = Input.Search;
class Classify extends Component {
  constructor() {
    super();
    this.state = {
      select: 1,
      active: true,
      fenlei: [],
      fenlei2: []
    }
  }
  async componentWillMount() {
    this.props.axios.get('http://localhost:5200/api/cate').then(res => {
      // console.log(res)
      this.setState({ fenlei: res.data })

    })
    this.props.axios.get('http://localhost:5200/api/cate2').then(res => {
      // console.log(res)
      this.setState({ fenlei2: res.data })
    })
  }
  select(num, idx) {
    //num:tid,idx:refs序号
    this.setState({ select: num })
    //由于idx与this.refs顺序不同,不能根据idx渲染borderLeft属性;refs没有length属性
    //验证导致页面变化
    // console.log(num,idx)
    for (let i = 0; i < 10; i++) {
      this.refs[i].style.borderLeft = 'none';
      this.refs[i].style.background = '#fff';
    }
    this.refs[idx].style.borderLeft = '3px solid #f00';
    this.refs[idx].style.background = 'rgba(0, 0, 0, 0.04)';
  }
  handleClick(name) {
    let { history } = this.props;
    history.push({
      pathname: '/list/' + name,
      search: '?name=' + name,
      state: {
        name
      }
    })
  }
  render() {
    return (
      <Layout>
        <Search style={{ padding: '10px' }} placeholder="input search text" onSearch={value => console.log(value)} enterButton />
        <Layout>
          <Sider width={'20%'} style={{ background: '#fff' }}>
            <div style={{ textAlign: 'center' }}>
              {this.state.fenlei.map((item, idx) => { return <li ref={idx} onClick={this.select.bind(this, Number(item.tid), idx)} style={{ listStyle: 'none', lineHeight: '60px' }} key={idx}>{item.name}</li> })}
            </div>
          </Sider>
          <Content>
            <div style={{ paddingLeft: '10px', textAlign: 'center' }}>
              {this.state.fenlei2.map((item, idx) => {
                if (Number(item.tid) === this.state.select) {
                  return <div onClick={this.handleClick.bind(this, item.name)} style={{ padding: '20px 20px', width: '33%', float: 'left' }} key={idx}>
                    <img style={{ width: '100%', height: '100%', marginBottom: '5px' }} src={require('../assets/img/' + item.img)} alt='' />
                    <li style={{ listStyle: 'none' }} key={idx}>{item.name}</li>
                  </div>
                }
              })
              }
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
Classify = withAxios(Classify);
export default Classify;