import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import DrinksListItem from './drinksListItem.jsx';
import Header from './header.jsx';
import {Link} from 'react-router-dom';

const DrinksList = ({ drinks }) => {
    const list = drinks.map(drink => (
       <DrinksListItem drink={drink} key={drink.id}/>
    ));
    
    return (
        <div className={styles.app}>
            <Header/>
            <Link to={`/drinks/new`}>Add Drink</Link>
            <ul>{list}</ul>
        </div>
    );
};

DrinksList.propTypes = {
  drinks: PropTypes.array.isRequired 
};

export default DrinksList;