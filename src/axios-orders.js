import axios from 'axios';

const Instance = axios.create({
	baseURL: 'https://sandwhichstacker.firebaseio.com/',
});

export default Instance;
