import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { ApiConfiguration } from './ApiConfiguration';

export default class ApiClient {
  private client: AxiosInstance;

  protected createAxiosClient(apiConfiguration: ApiConfiguration): AxiosInstance {
    return Axios.create({
      baseURL: apiConfiguration.baseURL,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10 * 1000
    });
  }

  constructor(apiConfiguration: ApiConfiguration) {
    this.client = this.createAxiosClient(apiConfiguration);
    this.client.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  async post<TRequest, TResponse>(path: string, payload: TRequest, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.client.post(path, payload, config);
    return response.data;
  }

  async patch<TRequest, TResponse>(path: string, payload: TRequest, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.client.patch<TResponse>(path, payload, config);
    return response.data;
  }

  async delete<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.client.delete<TResponse>(path, config);
    return response.data;
  }

  async put<TRequest, TResponse>(path: string, payload: TRequest): Promise<TResponse> {
    const response = await this.client.put<TResponse>(path, payload);
    return response.data;
  }

  async get<TResponse>(path: string, config?: AxiosRequestConfig): Promise<TResponse> {
    const response = await this.client.get<TResponse>(path, config);
    return response.data;
  }
}
