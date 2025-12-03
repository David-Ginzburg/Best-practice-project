import axios from "axios";

/**
 * HTTP client instance configured with base settings
 */
export const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
httpClient.interceptors.request.use(
	(config) => {
		// Add auth token or other headers here if needed
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor
httpClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Handle errors globally here if needed
		return Promise.reject(error);
	}
);

