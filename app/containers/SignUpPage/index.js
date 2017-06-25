/*
 * SignUpPage
 */

import React from 'react';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

export default class SignUpPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        email: null,
        password: null
      }
    }

    this.submitUser = this.submitUser.bind(this)
    this.handleUserEmailChange = this.handleUserEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this) 

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log('login',user)
      } else {
        // User is signed out.        
        console.log('logout',user)
      }
    });   
  }

  submitUser() {
    const { email, password } = this.state.user
    console.log(email, password)
    const fb = firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })
    ;
    console.log(fb)
  }
  handleUserEmailChange() {
    return (evt) => {
      const user = Object.assign({}, this.state.user);
      user.email = evt.target.value
      this.setState({ user })
    }
  }
  handlePasswordChange() {
    return (evt) => {
      const user = Object.assign({}, this.state.user);
      user.password = evt.target.value
      this.setState({ user })
    }
  }
  render() {
    return (
      <div>
        <h1><FormattedMessage {...messages.header} /></h1>
        <form>
          <div className="row">
            <div className="medium-12 columns">
              <label>Email
              <input type="text" placeholder="email" onChange={this.handleUserEmailChange()} />
              </label>
            </div>
            <div className="medium-12 columns">
              <label>Password
              <input type="password" placeholder="password"  onChange={this.handlePasswordChange()} />
              </label>
            </div>
            <div className="medium-12 columns">
              <button type="button" className="button" onClick={this.submitUser}>Create account</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
