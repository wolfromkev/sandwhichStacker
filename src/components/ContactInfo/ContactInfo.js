import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/indexActions';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
	errorMsg: {
		color: '#FE6B8B',
		fontSize: '1rem',
		marginTop: '1rem',
	},
	progress: {
		position: 'absolute',
	},
	formContainer: {
		zIndex: 100,
		paddingTop: '15rem',
		opacity: '1',
	},
	Title: {
		color: '#FE6B8B',
	},
	textField: {
		color: '#FE6B8B',
	},
	formStuff: {
		'& .MuiFormLabel-root': {
			color: '#FF8E53',
		},
		'& .MuiInput-underline::after': {
			borderBottom: '2px solid #FF8E53',
		},
		'& .MuiInput-underline::before': {
			borderBottom: '1px solid rgba(200, 200, 200, 0.42)',
		},
		'& .MuiInput-underline:hover': {
			borderBottom: '1px solid rgba(200, 200, 200, 0.42)',
			transition: 'none',
		},
		'& .MuiInputBase-root': {
			color: '#FF8E53',
		},
		'& .MuiFormHelperText-root': {
			color: '#FE6B8B',
		},
		'& .MuiInput-underline.Mui-error::after': {
			borderBottomColor: '#FE6B8B',
		},
	},

	buttonContainer: {
		height: '100%',
		marginTop: '1rem',
	},

	cancelButton: {
		backgroundColor: '#fe6b8b',
		color: 'white',
		font: 'inherit',
		padding: '5px',
		margin: '0 5px',
		width: '80px',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		borderRadius: '3px',
		boxShadow: '0 2px 2px 2px rgba(255, 105, 135, 0.3)',

		'&:hover': {
			backgroundColor: '#ff4d73',
			color: 'white',
			transform: 'translateY(-2px)',
		},
	},

	continueButton: {
		right: '2rem',
		backgroundColor: '#ff8e53',
		color: 'white',
		font: 'inherit',
		padding: '5px',
		margin: '0 5px',
		width: '80px',
		border: 'none',
		cursor: 'pointer',
		outline: 'none',
		borderRadius: '3px',
		boxShadow: '0 2px 2px 2px rgba(255, 105, 135, 0.3)',
		'&:hover': {
			backgroundColor: '#ff782f',
			color: 'white',
			transform: 'translateY(-2px)',
		},
		'&:disabled': {
			backgroundColor: '#c7c6c6',
			border: '1px solid #ccc',
			color: '#888888',
			boxShadow: 'none',
			transform: 'none',
		},
	},

	loading: {
		color: '#ff8e53',
	},
};

class ContactInfo extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				invalidMessage: 'Please enter your name.',
				touched: false,
			},

			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				invalidMessage: 'Please enter a streed address.',
				touched: false,
			},
			zipcode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip code',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				invalidMessage: 'Please enter a 5 digit zip code.',
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				invalidMessage: 'Please enter a country.',
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email',
				},
				value: '',
				validation: {
					required: true,
					emailCheck: true,
				},
				valid: false,
				invalidMessage: 'Please enter a valid email address.',
				touched: false,
			},
		},
		formIsValid: false,
		orderSuccess: true,
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.purchased === true) {
			this.props.history.push('./orders');
		}
	}

	isEmail = (email) => {
		const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (email.match(regex)) return true;
		else return false;
	};

	checkValiditiy(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.minLength && isValid;
		}
		if (rules.emailCheck) {
			isValid = this.isEmail(value);
		}
		return isValid;
	}

	inputChanged = (event, inputIdentifier) => {
		const updatedOrderForm = { ...this.state.orderForm };
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValiditiy(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	orderHandler = (event) => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}

		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0');
		let yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;

		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
			localId: this.props.localId,
			orderDate: today,
		};

		this.props.onOrderBurger(order, this.props.idToken);
	};

	render() {
		const { classes, loading } = this.props;
		const formElements = [];
		for (let key in this.state.orderForm) {
			formElements.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let formTextfield = formElements.map((form) => {
			return (
				<TextField
					id={form.id}
					name={form.id}
					type={form.config.elementConfig.type}
					label={form.config.elementConfig.placeholder}
					className={classes.textField}
					helperText={
						!form.config.valid && form.config.touched
							? form.config.invalidMessage
							: null
					}
					error={!form.config.valid && form.config.touched}
					value={this.state.email}
					onChange={(event) => this.inputChanged(event, form.id)}
					fullWidth
				/>
			);
		});

		let form = (
			<div>
				<h4> Complete the contact data below to place your order!</h4>

				<form noValidate className={classes.formStuff}>
					{formTextfield}{' '}
					<div className={classes.buttonContainer}>
						<button
							className={classes.cancelButton}
							onClick={this.props.modalClose}
						>
							{' '}
							Cancel
						</button>
						<button
							className={classes.continueButton}
							onClick={this.orderHandler}
							disabled={!this.state.formIsValid}
						>
							{' '}
							Purchase
						</button>
					</div>
				</form>
			</div>
		);

		if (loading) {
			form = <CircularProgress className={classes.loading}></CircularProgress>;
		}

		return <Fragment>{form}</Fragment>;
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.order.loading,
		idToken: state.auth.idToken,
		localId: state.auth.localId,
		purchased: state.order.purchased,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, idToken) =>
			dispatch(actions.purchaseBurger(orderData, idToken)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(ContactInfo));
