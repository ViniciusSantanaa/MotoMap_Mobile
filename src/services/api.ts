import axios from "axios";

const API_BASE_URL = "http://192.168.15.10:8080"; 

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

// =======================
// Funções para a Entidade MOTOS (CRUD Completo)
// =======================

// C: Create
export const createMoto = (data: Moto) => api.post("/motos", data);
// R: Read (Todos)
export const getMotos = () => api.get<Moto[]>("/motos");
// R: Read (Individual)
export const getMoto = (id: number) => api.get<Moto>(`/motos/${id}`);
// U: Update
export const updateMoto = (id: number, data: Moto) => api.put(`/motos/${id}`, data);
// D: Delete
export const deleteMoto = (id: number) => api.delete(`/motos/${id}`);


// =======================
// Funções para a Entidade LOCALIZAÇÕES (CRUD Completo)
// =======================

// C: Create
export const createLocalizacao = (data: Localizacao) => api.post("/localizacoes", data);
// R: Read (Todos)
export const getLocalizacoes = () => api.get<Localizacao[]>("/localizacoes");
// U: Update
export const updateLocalizacao = (id: number, data: Localizacao) =>
  api.put(`/localizacoes/${id}`, data);
// D: Delete
export const deleteLocalizacao = (id: number) => api.delete(`/localizacoes/${id}`);

export default api;