import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <Link to='/'>
                <h2>MixUp</h2>
            </Link>
            <Link to='/login'>
                Log in
            </Link>
            <Link to='/register'>
                Register
            </Link>
        </div>
    );
};

Header.propType = {
};

export default Header;