import axios from 'axios';
import queryString from 'query-string';
import { VideoTaskInterface, VideoTaskGetQueryInterface } from 'interfaces/video-task';
import { GetQueryInterface } from '../../interfaces';

export const getVideoTasks = async (query?: VideoTaskGetQueryInterface) => {
  const response = await axios.get(`/api/video-tasks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVideoTask = async (videoTask: VideoTaskInterface) => {
  const response = await axios.post('/api/video-tasks', videoTask);
  return response.data;
};

export const updateVideoTaskById = async (id: string, videoTask: VideoTaskInterface) => {
  const response = await axios.put(`/api/video-tasks/${id}`, videoTask);
  return response.data;
};

export const getVideoTaskById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/video-tasks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVideoTaskById = async (id: string) => {
  const response = await axios.delete(`/api/video-tasks/${id}`);
  return response.data;
};
