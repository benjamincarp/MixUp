import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import Header from './header.jsx';

class Drink extends React.Component {
    
    componentDidMount () {
        this.props.didMount();
    }

    componentWillUnmount () {
        this.props.willUnmount();
    }

    onChange(e) {
        this.props.fieldUpdateAction(e.target.name, e.target.value)
    }
    
    onSubmit(e) {
        e.preventDefault();
        this.props.submitAction();
    }
    
    render() {
        const {drink} = this.props;
        
        if (!drink) {
            return (
                <div className={styles.drink}>
                    <Header/>
                    <div>loading...</div>
                </div>
            );
        }
    
        if (drink.notFound) {
            return (
                <div className={styles.drink}>
                    <Header/>
                    <h2>No drink found with ID {drink.id}</h2>
                </div>
            );
        }
    
        const ingredientLines = drink.ingredients.map((line, index) => (
            <li key={index}>{line}</li>
        ));
        return (
            <div className={styles.drink}>
                <Header/>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div>
                        <input type="text" placeholder="Name" name="name" value={drink.name} onChange={this.onChange.bind(this)}/>
                    </div>
                    
                    <div>
                        <ul>{ingredientLines}</ul>
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
  drink: PropTypes.object
};

export default Drink;