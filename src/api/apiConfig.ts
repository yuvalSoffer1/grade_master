import axios from "axios";

export const dotnetApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}`,
  withCredentials: true,
});
// Request Interceptor
dotnetApi.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  (error) => {
    console.error("Request Error", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
dotnetApi.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Response Error", error);
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Response Data:", error.response.data);
      console.error("Response Status:", error.response.status);
      console.error("Response Headers:", error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Request Data:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error Message:", error.message);
    }
    return Promise.reject(error);
  }
);
