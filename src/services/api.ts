import axios from "axios";

const API_BASE_URL = "http://179.100.84.81:8080/api"; 

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
  latitude?: number;  
  longitude?: number; 
  zona: string;
  motoId?: number;    
  dataHora?: string;  
}


export const createMoto = (data: Moto) => api.post("/motos", data);
export const getMotos = () => api.get<Moto[]>("/motos");
export const getMoto = (id: number) => api.get<Moto>(`/motos/${id}`);
export const updateMoto = (id: number, data: Moto) => api.put(`/motos/${id}`, data);
export const deleteMoto = (id: number) => api.delete(`/motos/${id}`);

export const getLocalizacoes = () => api.get<Localizacao[]>("/localizacoes");
export const deleteLocalizacao = (id: number) => api.delete(`/localizacoes/${id}`);

export const createLocalizacao = (data: { zona: string, motoId: number }) => {
    const localizacaoDTO = {
        zona: data.zona,
        moto: { id: data.motoId } 
    };
    return api.post("/localizacoes", localizacaoDTO);
};

export default api;