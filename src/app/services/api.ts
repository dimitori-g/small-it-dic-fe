import axios, { AxiosResponse } from 'axios';
import { Word } from '../types/dictionary';

const api = axios.create({
    baseURL: 'http://192.168.1.2:5400/api/dictionary',
});

api.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
api.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getAllWords = () => api.get('');
export const getWordById = (id: number) => api.get(`/${id}`);
export const createWord = (word: Word) => api.post('', word);
export const updateWord = (word: Word) => api.put('', word);
export const deleteWord = (id: number) => api.delete(`/${id}`);
export const searchWords = (query: string) => api.get(`/search?text=${query}`);