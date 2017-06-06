import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Header = ({hideLoginLink}) => {
    const loginLink = hideLoginLink ? false : (<div><Link to='/login'>Log In</Link></div>);
    const registerLink = hideLoginLink ? false : (<div><Link to='/register'>Register</Link></div>);
    
    return (
        <div>
            <div>
                <Link to='/'>
                    <h2>MixUp</h2>
                </Link>
            </div>
            {loginLink}
            {registerLink}
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
