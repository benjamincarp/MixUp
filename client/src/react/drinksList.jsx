import React from 'react';
import styles from '../style/app.css';
import DrinksListItem from './drinksListItem.jsx'

const drinks = [
    {
        id: 1,
        name: "Manhattan"
    },
    {
        id: 2,
        name: "Margarita"
    },
    {
        id: 3,
        name: "Down Easter"
    }
];

const App = () => {
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

export default App;