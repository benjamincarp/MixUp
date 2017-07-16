import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Header = ({hideLoginLink, isLoggedIn, user}) => {
    const loginLink = (hideLoginLink || isLoggedIn) ? false : (<div><Link to='/login'>Log In</Link></div>);
    const registerLink = (hideLoginLink || isLoggedIn) ? false : (<div><Link to='/register'>Register</Link></div>);
    const logoutLink = (hideLoginLink || !isLoggedIn) ? false : (<div><a href="#" >Log Out</a></div>);
    const userName = (hideLoginLink || !user) ? false : (<div>Welcome, {user.first_name}</div>);

    return (
        <div>
            <div>
                <Link to='/'>
                    <h2>MixUp</h2>
                </Link>
            </div>
            {loginLink}
            {registerLink}
            {userName}
            {logoutLink}
        </div>
    );
};

Header.defaultProps = {
    hideLoginLink: false
};

Header.propTypes = {
    hideLoginLink: PropTypes.bool.isRequired
};

export default Header;
