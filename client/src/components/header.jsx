import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Header = () => {
    
    return (
        <div>
            <div>
                <Link to='/'>
                    <h2>MixUp</h2>
                </Link>
            </div>
            <div>
                <Link to='/login'>
                    Log in
                </Link>
            </div>
            <div>
                <Link to='/register'>
                    Register
                </Link>
            </div>
        </div>
    );
};

Header.propType = {
};

export default Header;
