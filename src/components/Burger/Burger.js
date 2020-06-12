import React, { Component } from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { connect } from 'react-redux';

class Burger extends Component {
	render() {
		const { ings } = this.props;
		let transformedIngredients;

		if (ings) {
			transformedIngredients = Object.keys(ings)
				.map((igKey) => {
					return [...Array(ings[igKey])].map((_, i) => {
						return <BurgerIngredient key={igKey + i} type={igKey} />;
					});
				})
				.reduce((arr, el) => {
					return arr.concat(el);
				}, []);
		}

		return (
			<div className={classes.Burger}>
				<BurgerIngredient type='bread-top' />
				{transformedIngredients}
				<BurgerIngredient type='bread-bottom' />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
	};
};

export default connect(mapStateToProps)(Burger);
