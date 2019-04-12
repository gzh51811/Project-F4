import React, { Component } from 'react';
import Home from './pages/home';
import Car from './pages/cart';
import Wecar from './pages/wecar';
import Classify from './pages/classify';
import Good from './pages/good';
import Login from './pages/login';
import Reg from './pages/reg';
// import List from './pages/list';
// 路由
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
// import { Menu, Icon } from 'antd';
import './css/app.css'
class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  render() {
    return (
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/classify" component={Classify} />
        <Route path="/cart" component={Car} />
        <Route path="/wecar" component={Wecar} />
        <Route path="/goods" component={Good} />
        <Route path="/reg" component={Reg} />
        <Route path="/login" component={Login} />
        {/* <Route path="/list" component={List} /> */}
        <Redirect from="/" to="/home" />
      </Switch>
    )
  }
}
App = withRouter(App);
export default App;