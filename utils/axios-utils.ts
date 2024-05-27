import axios from "axios";

// creating axios client with base URL
export const axiosInterceptor = axios.create({
	baseURL: "https://api.escuelajs.co/api/v1",
});

// handling errors by consoling them when error occurs in responses
axiosInterceptor.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response) {
			console.log(error);
		}
		return Promise.reject(error);
	}
);

// adding http authorization header to all requests sent using our client, if auth token available
axiosInterceptor.interceptors.request.use((config) => {
	const currentUser = localStorage.getItem("currentUser");

	if (currentUser) {
		const authToken = JSON.parse(currentUser).access_token;

		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}
	}

	return config;
});
