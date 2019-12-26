import request from "@/utils/request.js";
const baseUrl = "/api";
const apiConfig = {
  login: `/api/login`,
  // login: `${baseUrl}/login`,
  logout: `${baseUrl}/logout`
};
export default {
  login: query => request.get(apiConfig.login, query),
  logout: query => request(apiConfig.logout, query)
};
