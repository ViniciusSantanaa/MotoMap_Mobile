import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; 

const api = axios.create({
  baseURL: API_BASE_URL, 
});

interface Moto {
  id?: number;
  modelo: string;
  placa: string;
  identificador?: string;
  ativa?: boolean;
}

interface Localizacao {
  id?: number;
  latitude: number;
  longitude: number;
  zona: string;
  motoId: number;
  dataHora: string;
}

export const createMoto = (data: Moto) => api.post("/motos", data);

export const getMotos = () => api.get<Moto[]>("/motos");

export const getMoto = (id: number) => api.get<Moto>(`/motos/${id}`);

export const updateMoto = (id: number, data: Moto) => api.put(`/motos/${id}`, data);

export const deleteMoto = (id: number) => api.delete(`/motos/${id}`);


export const createLocalizacao = (data: Localizacao) => api.post("/localizacoes", data);

export const getLocalizacoes = () => api.get<Localizacao[]>("/localizacoes");

export const updateLocalizacao = (id: number, data: Localizacao) =>
  api.put(`/localizacoes/${id}`, data);

export const deleteLocalizacao = (id: number) => api.delete(`/localizacoes/${id}`);

export default api;