import React, { Component, Fragment } from 'react';
import * as actions from '../redux/actions/indexActions';
import { connect } from 'react-redux';
import MyButton from '../utility/MyButton';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { FaBreadSlice } from 'react-icons/fa';
import { FiLogOut, FiLogIn, FiShoppingCart } from 'react-icons/fi';
import HomeIcon from '@material-ui/icons/Home';

const styles = {
	root: {
		flexGrow: 1,
	},

	title: {
		flexGrow: 1,
	},
	AppBar: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		border: 0,
		borderRadius: 3,
	},
	button: {
		color: 'white',
	},
};

class Navbar extends Component {
	render() {
		const { classes } = this.props;

		let navbarItems = this.props.isAuthenticated ? (
			<Fragment>
				<MyButton
					toolTip='Sandwhich Stacker'
					url='/'
					toolClassName={classes.button}
				>
					<HomeIcon> </HomeIcon>
				</MyButton>
				<MyButton
					toolTip='Past Orders'
					url='/orders'
					toolClassName={classes.button}
				>
					<FiShoppingCart> </FiShoppingCart>
				</MyButton>
				<MyButton
					toolTip='Logout'
					onClick={this.props.onLogout}
					toolClassName={classes.button}
					url='/join'
				>
					<FiLogOut> </FiLogOut>
				</MyButton>
			</Fragment>
		) : (
			<Fragment>
				<MyButton
					toolTip='Sandwhich Stacker'
					url='/'
					toolClassName={classes.button}
				>
					<HomeIcon> </HomeIcon>
				</MyButton>
				<MyButton toolTip='Sign up' url='/join' toolClassName={classes.button}>
					<FiLogIn> </FiLogIn>
				</MyButton>
			</Fragment>
		);

		return (
			<div className={classes.root}>
				<AppBar position='static' className={classes.AppBar}>
					<Toolbar>
						<Typography variant='h6' className={classes.title}>
							Sandwhich <FaBreadSlice /> Stacker
						</Typography>
						{navbarItems}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onLogout: () => dispatch(actions.logout()),
	};
};
const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.idToken !== null,
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(Navbar));
