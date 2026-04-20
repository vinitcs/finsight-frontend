import api from "./axios";

export const uploadAPI = {
  uploadPDF: (data) =>
    api.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  getUploads: (params) => api.get("/upload/list", { params }),
  deleteUpload: (id) => api.delete(`/upload/${id}`),
};
