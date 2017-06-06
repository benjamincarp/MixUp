import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import Header from './header.jsx';
import {Link} from 'react-router-dom';

class Login extends React.Component{
    onChange(e) {
        this.props.fieldUpdateAction(e.target.name, e.target.value)    
    }
    
    onSubmit(e) {
        e.preventDefault();
        this.props.submitAction();
    }
    
    render() {
        return (
            <div>
                <Header/>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <input type="text" placeholder="Username" name="username" onChange={this.onChange.bind(this)} />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" name="password" onChange={this.onChange.bind(this)} />
                    </div>
                    <div>
                        <input type="submit" value="Log In"/>
                    </div>

                    <div>
                        Not a member yet? <Link to="/register"> Sign Up </Link>
                    </div>
                </form>
            </div>
        );
    };
}

Login.propType = {
    
};

export default Login;