import axios from "axios";
import Swal from "sweetalert2";

export class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL || import.meta.env.VITE_API_BASE_URL;

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Interceptor para inyectar token si existe
    this.client.interceptors.request.use((config) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para manejar errores globales (como 401)
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          Swal.fire({
            icon: "warning",
            title: "Session expired",
            text: "Your session has expired. Please log in again.",
            confirmButtonColor: "#0273b0",
            confirmButtonText: "Accept",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then(() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          });
        }

        return Promise.reject(error);
      }
    );
  }

  // Método GET
  async get(endpoint, headers = {}) {
    try {
      const response = await this.client.get(endpoint, { headers });
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  // Método POST
  async post(endpoint, data, headers = {}) {
    try {
      const response = await this.client.post(endpoint, data, { headers });
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  // Método PUT
  async put(endpoint, data, headers = {}) {
    try {
      const response = await this.client.put(endpoint, data, { headers });
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  // Método DELETE
  async delete(endpoint, headers = {}) {
    try {
      const response = await this.client.delete(endpoint, { headers });
      return response.data;
    } catch (error) {
      throw this.formatError(error);
    }
  }

  // Manejo estándar de errores
  formatError(error) {
    console.log(error);
    if (error.response?.data) {
      return {
        success: false,
        code: error.response.status,
        message: error.response.data.message || "Error in the request",
        errors: error.response.data.errors || error.response.data.data || [],
      };
    }

    return {
      success: false,
      code: 500,
      message: error.message || "Identified error",
    };
  }
}
