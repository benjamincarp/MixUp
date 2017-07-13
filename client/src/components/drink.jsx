import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import Header from './header.jsx';

class Drink extends React.Component {
    onChange(e) {
        this.props.fieldUpdateAction(e.target.name, e.target.value)
    }
    
    onSubmit(e) {
        e.preventDefault();
        this.props.submitAction();
    }
    
    render() {
        const {drink} = this.props;
    
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
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <input type="text" placeholder="Name" name="name" value={drink.name}
                               onChange={this.onChange.bind(this)}/>
                    </div>
                    <div>
                        <textarea placeholder="Instructions" name="instructions" 
                           rows="10" cols="80" value={drink.instructions} onChange={this.onChange.bind(this)}/>
                    </div>
                    <div>
                        <input type="submit" value="Save"/>
                    </div>
                </form>
            </div>
        );
    }
};

Drink.propTypes = {
  drink: PropTypes.object.isRequired  
};

export default Drink;