import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import DrinksListItem from './drinksListItem.jsx';
import Header from './header.jsx';

const DrinksList = ({ drinks }) => {
    const list = drinks.map(drink => (
       <DrinksListItem drink={drink} key={drink.id}/>
    ));
    
    return (
        <div className={styles.app}>
            <Header/>
            <ul>{list}</ul>
        </div>
    );
};

DrinksList.propTypes = {
  drinks: PropTypes.array.isRequired 
};

export default DrinksList;