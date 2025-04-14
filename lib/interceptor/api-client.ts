import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  try {
    const storedToken = localStorage.getItem("userLoginStatus");
    const parsed = storedToken ? JSON.parse(storedToken) : null;
    const token = parsed?.state?.user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (error) {
    console.error("[REQUEST ERROR]", error);
    return Promise.reject(error);
  }
});

apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `[RESPONSE] ${response.status} ${response.config.url}`,
      response.data
    );
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn("Unauthorized ");
      }
      console.error(
        `[RESPONSE ERROR] ${error.response.status}`,
        error.response.data
      );
    } else {
      console.error("[NETWORK ERROR]", error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
