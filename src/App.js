import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import EventPage from './pages/event/event.component';
import Header from './components/header/header.component';

import { ApolloProvider } from "react-apollo";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";

import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  componentDidMount() {
    // const { setCurrentUser } = this.props;
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/event' component={EventPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} />
        </Switch>
      </div>
    );
  }
}

const client = new AWSAppSyncClient({
  url: 'https://tstdw46zuzdd3lhed7wm6xrvfu.appsync-api.ap-northeast-2.amazonaws.com/graphql',
  region: 'ap-northeast-2',
  auth: {
    type: 'da2-ae2pqs2bxffqjpnelvyhl5y6fy',
    apiKey: 'KEY',
  }
})

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

// export default connect(null, )(App);

export default connect(mapStateToProps, mapDispatchToProps)(WithProvider);
