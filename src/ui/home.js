import React, { Component, Fragment } from 'react';
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls';
import Modal from './modals/CheckoutModal';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/indexActions';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
	Title: {
		color: '#FF8E53',
		marginTop: '2rem',
	},
	stuffholder: {
		textAlign: 'center',
	},
};
class SandwhichStacker extends Component {
	state = {
		purchasing: false,
	};

	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			this.props.history.push('/join');
		}
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.setState({ purchasing: false });
	};

	render() {
		const { classes, isAuthenticated, ings } = this.props;
		const disabledInfo = {
			...ings,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}

		let welcomeMessage = !isAuthenticated ? (
			<Typography variant='h2' className={classes.Title}>
				Welcome!
			</Typography>
		) : null;

		return (
			<Fragment>
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}
					history={this.props.history}
				></Modal>
				<span className={classes.stuffholder}>
					{welcomeMessage}
					<Burger />
					<BuildControls
						isAuthenticated={this.props.isAuthenticated}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemove}
						disabled={disabledInfo}
						ings={ings}
						price={this.props.price}
						purchased={this.purchaseHandler}
					/>
				</span>
			</Fragment>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemove: (ingName) =>
			dispatch(actions.removeIngredient(ingName)),
	};
};

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		purchased: state.order.purchased,
		isAuthenticated: state.auth.idToken,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(SandwhichStacker));
