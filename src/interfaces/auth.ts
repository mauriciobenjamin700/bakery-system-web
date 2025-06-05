// src/interfaces/auth.ts

export interface LoginRequest {
  email: string; // <<<<<<< MUDAR DE 'username' PARA 'email'
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_id?: string; // Se o backend retornar o ID do usuário no token
  role?: string;     // Se o backend retornar o role do usuário no token
}

export interface UserCreateRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface UserResponse {
  name: string;
  phone: string;
  email: string;
  id: string;
  role: string;
  created_at: string;
  updated_at: string;
}