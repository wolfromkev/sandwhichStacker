import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const logout = () => {
	localStorage.removeItem('idToken');
	localStorage.removeItem('localId');
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const clearAuthErrors = () => {
	return {
		type: actionTypes.CLEAR_ERRORS,
	};
};

export const authSuccess = (idToken, localId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: idToken,
		localId: localId,
	};
};
export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
	};
};

export const auth = (email, password, confirmPassword, signup) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};

		const { valid, errors } = signup
			? validateSignUpData(email, password, confirmPassword)
			: validateLoginData(email, password);

		if (!valid) {
			dispatch(authFail(errors));
			return;
		}

		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpp0Y3Lz67EN6wF8EQX-9uPkOp64PQASY ';
		if (!signup) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpp0Y3Lz67EN6wF8EQX-9uPkOp64PQASY ';
		}
		if (valid) {
			axios
				.post(url, authData)
				.then((response) => {
					localStorage.setItem('idToken', response.data.idToken);
					localStorage.setItem('locaLId', response.data.localId);
					dispatch(authSuccess(response.data.idToken, response.data.localId));
				})

				.catch((err) => {
					dispatch(authFail(err.response.data.error.message));
				});
		}
	};
};

/////////Helper Functions Below ------------------------------------------------------

const isEmpty = (string) => {
	if (string.trim() === '') return true;
	else return false;
};

const isEmail = (email) => {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(regex)) return true;
	else return false;
};

const validateSignUpData = (email, password, confirmPassword) => {
	let errors = {};
	if (isEmpty(email)) {
		errors.email = 'Must not be empty';
	} else if (!isEmail(email)) {
		errors.email = 'Please enter a valid email address';
	}
	if (isEmpty(password)) {
		errors.password = 'Must not be empty';
	} else if (password.length < 6) {
		errors.password = 'Password must be longer than 6 charecters';
	}
	if (password !== confirmPassword) {
		errors.confirmPassword = 'Passwords must be the same.';
	}
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

const validateLoginData = (email, password) => {
	let errors = {};
	if (isEmpty(email)) {
		errors.email = 'Must not be empty';
	} else if (!isEmail(email)) {
		errors.email = 'Please enter a valid email address';
	}
	if (isEmpty(password)) errors.password = 'Must not be empty';
	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};
