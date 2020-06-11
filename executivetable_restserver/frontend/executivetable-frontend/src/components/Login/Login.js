import React, { Component } from 'react';
import Nav from '../Nav';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import { Button, Navbar, NavDropdown, Form, FormControl} from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import Landing from '../landing/landing.jsx';
import Navigation from '../Navigation'
import './Login.css';
class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        displayed_form: '',
        logged_in: localStorage.getItem('token') ? true : false,
        username: ''
      };
      //this.handle_signup = this.handle_signup.bind(this)
      this.handle_login = this.handle_login.bind(this)
    }
    async componentDidUpdate(prevProps,prevState) {
      if (this.state.logged_in) {
        if (this.state.username !== prevState.username) {
          //this.fetchData(this.state.username);
        const response = await fetch('http://127.0.0.1:8000/executivetable_restserver/user', {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
          }
        })
        const res = await response.json()
          //.then(res => res.json())
          //.then(res => {
          this.setState({ username: res.username});
          //});
          //debugger
        }
      }
  
    }
  
    handle_login = (e, data) => {
      //this.state.username = "Logging in"
      e.preventDefault();
      fetch('http://127.0.0.1:8000/executivetable_restserver/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          localStorage.setItem('token', res.token);
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: res.username
          });
        });
    };
    /*
    handle_signup = (e, data) => {
      //this.state.username = "Logging in"
      e.preventDefault();
      fetch('http://127.0.0.1:8000/executivetable_restserver/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          localStorage.setItem('token', res.token);
          this.setState({
            logged_in: true,
            displayed_form: '',
            username: res.username
          });
        });
    };
    */
    
    handle_logout = () => {
      localStorage.removeItem('token');
      this.setState({ logged_in: false, username: '' });
    };
  
    display_form = form => {
      this.setState({
        displayed_form: form
      });
    };

    render() {
        console.log(this.state.username)
        let form;
        form = <LoginForm handle_login={this.handle_login} />;
        
      
          return (
            <div className="Login">
              {/* <Nav
                logged_in={this.state.logged_in}
                display_form={this.display_form}
                handle_logout={this.handle_logout}
              /> */}
              {form}
              <h3>
                {this.state.logged_in
                  ? `Hello, ${this.state.username}`
                  : 'Please Log In'}
              </h3>
            </div>
            
          );
        }
} 
export default Login;