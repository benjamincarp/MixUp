import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import Header from './header.jsx';

const Drink = ({ drink }) => {
    if (drink.notFound) {
        return (
            <div className={styles.drink}>
                <h2>No drink found with ID {drink.id}</h2>
            </div>  
        );
    }
    
    return (
        <div className={styles.drink}>
            <Header/>
            <h2>{drink.name}</h2>
        </div>
    );
};

Drink.propType = {
  drink: PropTypes.object.isRequired  
};

export default Drink;