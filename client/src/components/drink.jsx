import React from 'react';
import styles from '../style/app.css';

const App = ({match}) => (
<div className={styles.drink}>
<h2>{match.params.drinkId}</h2>
</div>
);

export default App;