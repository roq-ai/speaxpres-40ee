import axios from 'axios';
import queryString from 'query-string';
import { UserDataInterface, UserDataGetQueryInterface } from 'interfaces/user-data';
import { GetQueryInterface } from '../../interfaces';

export const getUserData = async (query?: UserDataGetQueryInterface) => {
  const response = await axios.get(`/api/user-data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUserData = async (userData: UserDataInterface) => {
  const response = await axios.post('/api/user-data', userData);
  return response.data;
};

export const updateUserDataById = async (id: string, userData: UserDataInterface) => {
  const response = await axios.put(`/api/user-data/${id}`, userData);
  return response.data;
};

export const getUserDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserDataById = async (id: string) => {
  const response = await axios.delete(`/api/user-data/${id}`);
  return response.data;
};
