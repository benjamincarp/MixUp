import React from 'react';
import styles from '../style/app.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const DrinksListItem = ({drink}) => (
<li>
    <Link to={`/drinks/${drink.id}`}>{drink.name}</Link>
</li>
);

DrinksListItem.propTypes = {
    drink: PropTypes.object.isRequired
};

export default DrinksListItem;