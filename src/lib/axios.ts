import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_BASE_URL,
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

const token = Cookies.get("hg-acctok");
API.interceptors.request.use((req) => {
  if (token) {
    req.headers.authorization = token;
  }

  return req;
});

export { API as axios };
