import axios from "axios";
import {
  ACCESS,
  API_HOST,
  FAILURE,
  UNAUTHORIZED_STATUS_CODE,
} from "../constants";

const ApiService = (apiConfig = { contentType: "application/json" }) => {
  const API_BASE_URL = `${String(API_HOST)}`;

  let headers = {
    "Content-Type": apiConfig.contentType,
  };

  const access = localStorage.getItem(ACCESS);
  if (access) {
    headers = { ...headers, Authorization: `Bearer ${access}` };
  }

  const axiosObj = axios.create({
    baseURL: " http://localhost:8080",
    headers,
  });

  axiosObj.interceptors.request.use((config) => config);

  const apiService = (
    config = { url: "", data: "", method: "get" },
    params
  ) => {
    const settings = { alertMessage: false, loader: true, ...params };

    return new Promise((resolve, reject) => {
      axiosObj(config)
        .then((result) => {
          const { data } = result;

          const responseMessage = data?.message;

          if (data?.status === FAILURE) {
            // _showAlert("error", responseMessage);
          }
          // Show a custome message or show a message received from server
          else if (settings.alertMessage) {
            // _showAlert(
            //   "success",
            //   settings.alertMessage === true
            //     ? responseMessage
            //     : settings.alertMessage
            // );
          }

          resolve(data);
        })
        .catch((err) => {
          let responseText = "";
          if (err?.response) {
            const { data, status } = err.response;
            if (status === UNAUTHORIZED_STATUS_CODE) {
              // logoutUser();
            }
          }

          // _showAlert("error", responseText);
          reject(responseText);
        });
    });
  };

  return { apiService };
};

export default ApiService;
 