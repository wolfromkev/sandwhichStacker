import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
//Redux
import { connect } from 'react-redux';
import * as actions from './redux/actions/indexActions';
//Components
import Navbar from './ui/navbar';
import LoginSignup from './ui/loginSignup';
import Orders from './ui/Orders';
import Home from './ui/home';

class App extends Component {
	componentDidMount() {
		this.props.onInitIngredients();
	}
	render() {
		let routes = (
			<Fragment>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Home}></Route>
					<Route exact path='/join' component={LoginSignup}></Route>
				</Switch>
			</Fragment>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Fragment>
					<Navbar />
					<Switch>
						<Route exact path='/' component={Home}></Route>
						<Route exact path='/orders' component={Orders}></Route>
						<Route exact path='/join' component={LoginSignup}></Route>
					</Switch>
				</Fragment>
			);
		}

		return <div>{routes}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.idToken !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onInitIngredients: () => dispatch(actions.initIngredients()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
