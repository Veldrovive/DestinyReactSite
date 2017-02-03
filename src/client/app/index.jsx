import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router'
import {createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import store from './store.js'

const history = syncHistoryWithStore(browserHistory, store)

import styles from './stylesheets/_Index.css'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Players from './components/Players.jsx'
import Clans from './components/Clans.jsx'

class App extends React.Component {
  constructor(){
    super();
    this.render = this.render.bind(this);
  }

  render () {
    if(!this.props.children){
      var insert = (
        <div>
          <p className="header">Welcome to the Destiny Clan Extender</p>
          <p>This is a pet project to create an easier way to interact and play with your Destiny clan.</p>
        </div>
      )
    }else{
      var insert = (
        <div>
          {this.props.children}
        </div>
      )
    }
    return(
      <div className={styles.pageDiv}>
        <Header/>
        <div className={styles.subPage}>
          <div className={styles.spacer}></div>
          <div className={styles.pageContent}>
            {insert}
          </div>
          <div className={styles.spacer}></div>
        </div>
        <Footer/>
      </div>
    )
  }
}

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
            <Route path="/Clans" component={Clans}>

            </Route>
            <Route path="/Players" component={Players}/>
            <Route path="/Me" component={Players}/>
      </Route>
    </Router>
  </Provider>
) , document.getElementById('app'));
