import React from 'react';
import styles from '../style/app.css';
import {Link} from 'react-router-dom';

const App = ({drink}) => (
<li >
    <Link to={`/${drink.id}`}>{drink.name}</Link>
</li>
);

export default App;