import { axiosClient } from "./axiosClient";
import type { Region } from "../models/Region";

export const regionApi = {
  getAll: () =>
    axiosClient
      .get("/Regions")
      .then(function (response) {
        // handle success
        //console.log(response.data);
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        return response.data;
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      })
      .finally(function () {
        // always executed
      }),

  getById: (id: number) => axiosClient.get<Region>(`/Regions/${id}`),

  create: (data: Region) => axiosClient.post("/Regions", data),

  update: (id: number, data: Region) => axiosClient.put(`/Regions/${id}`, data),

  delete: (id: number) => axiosClient.delete(`/Regions/${id}`),
};
