import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router'
import {createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import {connect} from 'react-redux'

import store from './store.js'

const history = syncHistoryWithStore(browserHistory, store)

import styles from './_Index.css'

import {Header, Footer, NotificationBar} from './components/basePage'
import {Clans, Me, Players, Authorize} from './components/pageContent'

import {sendNotification} from './actions/notificationsActions.js'

@connect((store) => {
  return{
    player: store.reducers.player
  }
})
class App extends React.Component {
  constructor(){
    super();
    this.render = this.render.bind(this);
    this.testNotification = this.testNotification.bind(this)
  }

  testNotification(){
    this.props.dispatch(sendNotification("Testing Notification", "notification", 3))
  }

  render () {
    if(!this.props.children){
      var insert = (
        <div>
          <p className="header">Welcome to the Destiny Clan Extender</p>
          <p>This is a pet project to create an easier way to interact and play with your Destiny clan.</p>
          <p>If you cannot see everything on the sceen, make sure that your screen is in a 16:9 format.</p>
          <p>I'm not very good at css and don't know how to fix problems with different screen sizes.</p>
          <button onClick={this.testNotification}>Test Notification</button>
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
        <NotificationBar />
      </div>
    )
  }
}

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
            <Route path="Clans(/:clanName)" component={Clans} />
            <Route path="Players(/:playerName)(/:playerId)" component={Players}/>
            <Route path="Me" component={Me}/>
            <Route path="Authorize" component={Authorize} />
      </Route>
    </Router>
  </Provider>
) , document.getElementById('app'));
