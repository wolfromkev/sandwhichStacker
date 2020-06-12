import React, { Component, Fragment } from 'react';
import classes from './CheckoutModal.module.css';
import Backdrop from './Backdrop/Backdrop';
import { connect } from 'react-redux';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import * as actions from '../../redux/actions/indexActions';

class Modal extends Component {
	state = {
		checkout: false,
	};

	checkoutState = () => {
		this.setState({ checkout: true });
	};

	modalClose = () => {
		this.setState({ checkout: false });
		this.props.modalClosed();
	};

	render() {
		const { ingredients, price } = this.props;

		let ingredientList = [];

		for (let ingredientName in this.props.ingredients) {
			ingredientList.push({
				name: ingredientName,
				amount: ingredients[ingredientName],
			});
		}

		const ingredientOutput = ingredientList.map((ig) => {
			return (
				<span className={classes.Span} key={ig.name}>
					{ig.name} - {ig.amount}{' '}
				</span>
			);
		});

		let modal = !this.state.checkout ? (
			<Fragment>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed} />
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0',
					}}
				>
					<div className={classes.orderInfo}>
						<h4>Your Sandwhich Ingredients:</h4>
						{ingredientOutput}
						<hr className={classes.horizontalLine} />
						<strong> Total: ${price.toFixed(2)}</strong>
					</div>

					<div className={classes.buttonContainer}>
						<button className={classes.cancelButton} onClick={this.modalClose}>
							{' '}
							Cancel
						</button>
						<button
							className={classes.continueButton}
							onClick={this.checkoutState}
						>
							{' '}
							Checkout
						</button>
					</div>
				</div>
			</Fragment>
		) : (
			<Fragment>
				<Backdrop show={this.props.show} clicked={this.modalClose} />
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0',
					}}
				>
					<ContactInfo
						ings={this.props.ingredients}
						price={this.props.price}
						modalClose={this.modalClose}
						history={this.props.history}
					></ContactInfo>
				</div>
			</Fragment>
		);

		return modal;
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, idToken) =>
			dispatch(actions.purchaseBurger(orderData, idToken)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
