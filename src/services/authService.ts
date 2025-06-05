// src/services/authService.ts

import { LoginRequest, LoginResponse, UserCreateRequest, UserResponse } from '../interfaces/auth';

const API_BASE_URL = 'http://localhost:8000';

// --- Função de Login ---
// A rota correta é /api/user/login
const LOGIN_ENDPOINT = '/api/user/login'; 

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials), // credentials agora tem 'email' e 'password'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Falha no login:', response.status, errorData);
      if (response.status === 401 || response.status === 403) {
        throw new Error('Credenciais inválidas.');
      }
      throw new Error(errorData.detail || 'Erro desconhecido ao fazer login.');
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    throw error;
  }
}

// --- Função de Cadastro de Usuário ---
// A rota correta é /api/user/
const USER_CREATE_ENDPOINT = '/api/user/'; // <<<<<<< AJUSTADO!

export async function createUser(userData: UserCreateRequest): Promise<UserResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}${USER_CREATE_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Falha ao criar usuário:', response.status, errorData);
      throw new Error(errorData.detail || 'Erro desconhecido ao criar usuário.');
    }

    const data: UserResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na requisição para criar usuário:', error);
    throw error;
  }
}

export function storeAuthToken(token: string) {
  localStorage.setItem('authToken', token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

export function removeAuthToken() {
  localStorage.removeItem('authToken');
}