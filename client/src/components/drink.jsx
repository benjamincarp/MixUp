import React from 'react';
import styles from '../style/app.css';
import PropTypes from 'prop-types';
import Header from './header.jsx';

class Drink extends React.Component {
    
    componentDidMount() {
        this.props.didMount();
    }

    componentWillUnmount() {
        this.props.willUnmount();
    }

    onChange(e) {
        this.props.fieldUpdateAction(e.target.name, e.target.value);
    }
    
    onIngredientLineChange(index, e) {
        this.props.updateIngredientLine(index, e.target.value);
    }
    
    addIngredientLineClicked(e) {
        e.preventDefault();
        this.props.addIngredientLine();
    }

    removeIngredientLineClicked(index, e) {
        e.preventDefault();
        if (this.props.drink.ingredients.legth < 2) return;
        this.props.removeIngredientLine(index);
    }
    
    onSubmit(e) {
        e.preventDefault();
        this.props.submitAction();
    }
    
    render() {
        const {drink} = this.props;
    
        const ingredientLines = drink.ingredients.map((line, index) => (
            <li key={index}>
                <input type="text" placeholder="Ingredient" name="ingredient[]" value={line} onChange={this.onIngredientLineChange.bind(this, index)}/>
                <a href="#" onClick={this.removeIngredientLineClicked.bind(this, index)}>X</a>
            </li>
        ));
        
        const content = drink.hasLoaded ? (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div>
                    <input type="text" placeholder="Name" name="name" value={drink.name} onChange={this.onChange.bind(this)}/>
                </div>

                <div>
                    <ul>{ingredientLines}</ul>
                    <a href="#" onClick={this.addIngredientLineClicked.bind(this)}>Add Ingredient</a>
                </div>

                <div>
                        <textarea placeholder="Instructions" name="instructions"
                                  rows="10" cols="80" value={drink.instructions} onChange={this.onChange.bind(this)}/>
                </div>
                <div>
                    <input type="submit" value="Save"/>
                </div>
            </form>  
        ) : (<div>loading...</div>);
        
        return (
            <div className={styles.drink}>
                <Header/>
                {content}
            </div>
        );
    }
};

Drink.propTypes = {
  drink: PropTypes.object
};

export default Drink;