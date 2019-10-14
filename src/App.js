import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';  
// Components
import Navbar from '../src/components/layout/Navbar';
import AuthRoute from '../src/components/layout/AuthRoute';

//Pages
import index from './pages/index';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import staticUser from './pages/staticUser';
import product from './pages/product';
import editProduct from './pages/editProduct';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token){
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function  App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar/>
          <div className='container'>
            <Switch>
              <AuthRoute exact path='/' component={index} />
              <Route exact path='/products' component={home} />
              <AuthRoute exact path='/login' component={login}/>
              <AuthRoute exact path='/signup' component={signup}/>
              <Route exact path='/users/:id' component={staticUser}/>
              <Route exact path='/user' component={user}/>
              <Route exact path='/product' component={product}/>
              <Route exact path='/product/:id' component={editProduct}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
