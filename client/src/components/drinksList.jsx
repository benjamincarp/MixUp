import React from 'react';
import styles from '../style/app.css';
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

export default DrinksList;