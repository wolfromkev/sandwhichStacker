import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/indexActions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
	Order: {
		width: '50%',
		border: '1px solid #ff8e53',
		boxShadow: '0 2px 3px #ff8e53',
		padding: '10px',
		margin: '10px auto 2rem',
		boxSizing: 'border-box',
		color: '#ff8e53',
	},

	Span: {
		textTransform: 'capitalize',
		display: 'inline-block',
		margin: '0 8px',
		border: '1px solid #ccc',
	},
	mainDiv: {
		textAlign: 'center',
	},
	ordersDiv: {
		overflowX: 'hidden',
		overflowY: 'auto',
		maxHeight: '100vh',
	},
	title: {
		color: '#fe6b8b',
	},
	orderDate: {
		color: '#fe6b8b',
		padding: '10px',
		margin: '0 8px',
	},
};

class Orders extends Component {
	componentDidMount() {
		this.props.onFetchOrder(this.props.idToken, this.props.localId);
	}

	render() {
		const { classes } = this.props;
		const { orders } = this.props;

		let orderList = orders.map((order, index) => {
			if (index === 0) {
				return (
					<div className={classes.Order}>
						<p>
							<strong className={classes.orderDate}>Most Recent</strong>
						</p>
						<p>
							<strong>{order.orderDate} </strong>
						</p>
						<p>
							{' '}
							<strong>Ingredients: </strong>
							<span>Bacon: {order.ingredients.bacon} </span>
							<span>Cheese: {order.ingredients.cheese} </span>
							<span> Meat: {order.ingredients.meat}</span>
							<span> Lettuce: {order.ingredients.salad}</span>
						</p>
						<p>
							<strong> Price: </strong>$
							{Number.parseFloat(order.price).toFixed(2)}
						</p>
					</div>
				);
			} else {
				return (
					<div className={classes.Order}>
						<p>
							<strong>{order.orderDate} </strong>
						</p>
						<p>
							{' '}
							<strong>Ingredients: </strong>
							<span>Bacon: {order.ingredients.bacon} </span>
							<span>Cheese: {order.ingredients.cheese} </span>
							<span> Meat: {order.ingredients.meat}</span>
							<span> Lettuce: {order.ingredients.salad}</span>
						</p>
						<p>
							<strong> Price: </strong>$
							{Number.parseFloat(order.price).toFixed(2)}
						</p>
					</div>
				);
			}
		});

		return (
			<div className={classes.mainDiv}>
				<h1 className={classes.title}> Orders:</h1>
				<div className={classes.ordersDiv}> {orderList}</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchOrder: (idToken, localId) =>
			dispatch(actions.fetchOrder(idToken, localId)),
	};
};

const mapStateToProps = (state) => {
	return {
		orders: state.order.orders,
		idToken: state.auth.idToken,
		localId: state.auth.localId,
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Orders));
