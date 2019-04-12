import React, { Component } from 'react';

import Content from "./pages/content"
import Login from "./pages/login"
// 引入store

// 引入react-redux
// import { Provider } from 'react-redux';

import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path="/content" component={Content}></Route>
          <Route path="/content/home" component={Login}></Route>
          <Redirect to="/content/home" from="/" ></Redirect>
        </Switch>
      </HashRouter> 
    )
  } 

}
export default App;