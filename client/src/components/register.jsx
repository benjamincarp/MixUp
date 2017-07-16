import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import Header from '../containers/header.jsx';
import {Link, Redirect} from 'react-router-dom';

class Register extends React.Component{
    onChange(e) {
        this.props.fieldUpdateAction(e.target.name, e.target.value)
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.submitAction();
    }

    render() {
        const {isLoggedIn} = this.props;

        if (isLoggedIn) return (<Redirect to="/" />);

        return (
            <div>
                <Header hideRegisterLink={true} />

                <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <input type="text" placeholder="Username" name="username" onChange={this.onChange.bind(this)} />
                    </div>
                    <div>
                        <input type="password" placeholder="Password"  name="password" onChange={this.onChange.bind(this)} />
                    </div>
                    <div>
                        <input type="password" placeholder="Confirm Password" name="verify password" onChange={this.onChange.bind(this)} />
                    </div>
                    <div>
                        <input type="text" placeholder="First Name" name="first_name" onChange={this.onChange.bind(this)} />
                    </div>
                    <div>
                        <input type="text" placeholder="Last Name" name="last_name" onChange={this.onChange.bind(this)} />
                    </div>
                    <div>
                        <input type="submit" value="Register" />
                    </div>
                </form>
                <div>
                    Already a member? <Link to="/login"> Log In </Link>
                </div>
            </div>
        );
    };
}

Register.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    submitAction: PropTypes.func.isRequired,
    fieldUpdateAction: PropTypes.func.isRequired
};

export default Register;