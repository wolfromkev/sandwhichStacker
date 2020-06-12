import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Lettuce', type: 'salad' },
	{ label: 'Ketchup', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => (
	<div className={classes.BuildControls}>
		<p className={classes.BuildControlsTitle}>
			Current Price: <strong> ${props.price.toFixed(2)}</strong>
		</p>
		{controls.map((ctrl) => (
			<BuildControl
				key={ctrl.label}
				label={ctrl.label}
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]}
			/>
		))}

		<button
			className={classes.OrderButton}
			disabled={props.price < 1.1}
			onClick={props.purchased}
		>
			{' '}
			{props.isAuthenticated ? 'Place your order!' : 'Sign Up To Order!'}{' '}
		</button>
	</div>
);
export default BuildControls;
