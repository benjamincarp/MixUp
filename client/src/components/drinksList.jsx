import React from 'react';
import styles from '../style/app.css';
import DrinksListItem from './drinksListItem.jsx'

const DrinksList = ({ drinks }) => {
    const list = drinks.map(drink => (
       <DrinksListItem drink={drink}/>
    ));
    
    return (
        <div className={styles.app}>
            <h2>Welcome!!!</h2>
            <ul>{list}</ul>
        </div>
    );
}

export default DrinksList;