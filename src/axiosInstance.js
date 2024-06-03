import axios from "axios";

const KEY = "7756e849a1704d53b7554357241101";

const axiosInstance = axios.create({
  baseURL: `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=`, // replace with your API base URL
  timeout: 10000, // optional, specifies a timeout for the request
  headers: { "Content-Type": "application/json" }, // optional, default headers
});

export default axiosInstance;
