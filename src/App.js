import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';  
// Components
import Navbar from '../src/components/layout/Navbar';
import AuthRoute from '../src/utils/AuthRoute';
import UnauthRoute from '../src/utils/UnauthRoute';

//Pages
import index from './pages/index';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import staticUser from './pages/staticUser';
import editProduct from './pages/editProduct';
import newProduct from './pages/newProduct';
import resetPass from './pages/resetPass';
import { Conversation } from '../src/components/conversation';

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
              <UnauthRoute exact path='/products' component={home} />
              <AuthRoute exact path='/login' component={login}/>
              <AuthRoute exact path='/signup' component={signup}/>
              <AuthRoute exact path='/resetPassword' component={resetPass}/>
              <UnauthRoute exact path='/users/:id' component={staticUser}/>
              <UnauthRoute exact path="/users/:id/product/:idProduto" component={staticUser} />
              <UnauthRoute exact path='/user' component={user}/>
              <UnauthRoute exact path='/product' component={newProduct}/>
              <UnauthRoute exact path='/product/:id' component={editProduct}/>
              <UnauthRoute exact path='/messages' component={Conversation}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
