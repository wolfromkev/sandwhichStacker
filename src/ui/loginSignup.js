import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import * as actions from '../redux/actions/authActions';
//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//REDUX
import { connect } from 'react-redux';

const style = {
	button: {
		margin: '10px auto 10px auto',
		position: 'relative',
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	},
	errorMsg: {
		color: '#FF8E53',
		fontSize: '1.5rem',
		marginTop: '1rem',
	},
	progress: {
		position: 'absolute',
	},
	buttonSL: {
		color: '#FE6B8B',
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
	form: {
		'& .MuiFormLabel-root': {
			color: 'rgba(200, 200, 200)',
		},
		'& .MuiInput-underline::after': {
			borderBottom: '2px solid rgba(200, 200, 200)',
		},
		'& .MuiInputBase-root': {
			color: 'rgba(200, 200, 200)',
		},
	},
	loading: {
		color: '#FE6B8B',
	},
	LSDiv: {
		textAlign: 'center',
	},
};

class LoginSignup extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			handle: '',
			errors: {},
			signup: true,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ errors: nextProps.error });
		}

		if (nextProps.idToken) {
			this.props.history.push('/');
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	loginSignupHandler = (event) => {
		event.preventDefault();
		this.setState({
			email: '',
			password: '',
			confirmPassword: '',
			handle: '',
			errors: {},
			signup: !this.state.signup,
		});
		this.props.clearAuthErrors();
	};

	handleAuth = (event) => {
		event.preventDefault();
		this.props.onAuth(
			this.state.email,
			this.state.password,
			this.state.confirmPassword,
			this.state.signup
		);
	};

	render() {
		const { errors } = this.state;
		const { classes, loading, error } = this.props;
		let errorMessage;

		if (error === 'EMAIL_NOT_FOUND') {
			errorMessage = 'Email not found.';
		} else if (error === 'INVALID_PASSWORD') {
			errorMessage = 'Incorrect password';
		} else if (error === 'EMAIL_EXISTS') {
			errorMessage = 'This email is already in use.';
		}

		let loginSignup = loading ? (
			<CircularProgress
				className={classes.loading}
				size='50'
			></CircularProgress>
		) : this.state.signup === false ? (
			<Grid container className={classes.formContainer}>
				<Grid item sm />
				<Grid item sm>
					<Typography variant='h2' className={classes.Title}>
						Log in!
					</Typography>
					<form noValidate onSubmit={this.handleAuth} className={classes.form}>
						<TextField
							id='email'
							name='email'
							type='email'
							label='Email'
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						/>

						<TextField
							id='password'
							name='password'
							type='password'
							label='Password'
							className={classes.textField}
							helperText={errors.password}
							error={errors.password ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						/>
						{errors.general && (
							<Typography variant='body2' className={classes.errorMsg}>
								{errors.general}
							</Typography>
						)}
						{errors.error && (
							<Typography variant='body2' className={classes.errorMsg}>
								{errors.error}
							</Typography>
						)}
						{error && (
							<Typography variant='body1' className={classes.errorMsg}>
								{errorMessage}
							</Typography>
						)}

						<Button
							type='submit'
							color='primary'
							className={classes.button}
							variant='contained'
							disabled={loading}
						>
							Login
							{loading && (
								<CircularProgress
									className={classes.progress}
									size={30}
									color='secondary'
								/>
							)}
						</Button>
						<br></br>
						<Button
							color='primary'
							className={classes.buttonSL}
							onClick={this.loginSignupHandler}
						>
							Sign up
						</Button>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		) : (
			<Grid container className={classes.formContainer}>
				<Grid item sm />
				<Grid item sm>
					<Typography variant='h2' className={classes.Title}>
						Sign up!
					</Typography>

					<form noValidate onSubmit={this.handleAuth} className={classes.form}>
						<TextField
							id='email'
							name='email'
							type='email'
							label='Email'
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
							value={this.state.email}
							onChange={this.handleChange}
							fullWidth
						></TextField>
						<TextField
							id='password'
							name='password'
							type='password'
							label='Password'
							className={classes.textField}
							helperText={errors.password}
							error={errors.password ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
						></TextField>
						<TextField
							id='confirmPassword'
							name='confirmPassword'
							type='password'
							label='Confirm Password'
							className={classes.textField}
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
							value={this.state.confirmPpassword}
							onChange={this.handleChange}
							fullWidth
						></TextField>

						{error && (
							<Typography variant='body1' className={classes.errorMsg}>
								{errorMessage}
							</Typography>
						)}

						<Button
							type='submit'
							color='primary'
							className={classes.button}
							variant='contained'
							disabled={loading}
						>
							Sign Up
							{loading && (
								<CircularProgress
									className={classes.progress}
									size={30}
									color='secondary'
								/>
							)}
						</Button>
						<br></br>
						<Button
							className={classes.buttonSL}
							onClick={this.loginSignupHandler}
						>
							Log in
						</Button>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);

		return <div className={classes.LSDiv}>{loginSignup}</div>;
	}
}

const mapStateToProps = (state) => ({
	error: state.auth.error,
	loading: state.auth.loading,
	idToken: state.auth.idToken,
});

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, password, confirmPassword, isSignUp) =>
			dispatch(actions.auth(email, password, confirmPassword, isSignUp)),
		clearAuthErrors: () => dispatch(actions.clearAuthErrors()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(style)(LoginSignup));
