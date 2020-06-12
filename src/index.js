import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

//Redux reducers
import burgerReducer from './redux/reducers/burgerBuilderReducer';
import orderReducer from './redux/reducers/orderReducer';
import authReducer from './redux/reducers/authReducer';

const rootReducer = combineReducers({
	burgerBuilder: burgerReducer,
	order: orderReducer,
	auth: authReducer,
});

const persistConfig = {
	key: 'root',
	storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
	persistedReducer,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);
let persistor = persistStore(store);

const app = (
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
