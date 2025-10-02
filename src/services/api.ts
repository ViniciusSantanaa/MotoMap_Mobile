import axios from "axios";

const API_BASE_URL = "http://192.168.15.10:8080"; 

const api = axios.create({
  baseURL: API_BASE_URL, 
});

export const getMotos = () => api.get("/motos");
export const getMoto = (id: number) => api.get(`/motos/${id}`);
export const createMoto = (data: any) => api.post("/motos", data);
export const updateMoto = (id: number, data: any) => api.put(`/motos/${id}`, data);
export const deleteMoto = (id: number) => api.delete(`/motos/${id}`);

export const getLocalizacoes = () => api.get("/localizacoes");
export const createLocalizacao = (data: any) => api.post("/localizacoes", data);
export const updateLocalizacao = (id: number, data: any) =>
  api.put(`/localizacoes/${id}`, data);
export const deleteLocalizacao = (id: number) => api.delete(`/localizacoes/${id}`);

export default api;
