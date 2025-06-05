// src/services/ingredientService.ts
import { IngredientRequestBody, IngredientResponse } from '../interfaces/ingredients';
import { getAuthToken } from './authService'; 

// URL BASE DA API CORRIGIDA PARA A PORTA 8001
const API_BASE_URL = 'http://localhost:8000';

// --- Função para Adicionar Ingrediente ---
export async function addIngredient(
  ingredientData: IngredientRequestBody
): Promise<IngredientResponse> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Usuário não autenticado. Por favor, faça login.');
    }

    // CORREÇÃO: A rota para POST de ingrediente deve incluir '/api/' devido ao root_path no FastAPI
    // A rota correta é /api/ingredients
    const response = await fetch(`${API_BASE_URL}/api/ingredients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(ingredientData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao adicionar ingrediente:', response.status, errorData);
      if (response.status === 401 || response.status === 403) {
        throw new Error('Sessão expirada ou não autorizada. Faça login novamente.');
      }
      throw new Error(
        `Falha ao adicionar ingrediente: ${response.status} - ${JSON.stringify(errorData.detail || errorData)}`
      );
    }

    const data: IngredientResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na requisição da API para adicionar ingrediente:', error);
    throw error;
  }
}

// --- Função para Buscar Todos os Ingredientes ---
export async function getIngredients(): Promise<IngredientResponse[]> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Usuário não autenticado. Por favor, faça login.');
    }

    // A rota para GET é /api/ingredient/ (conforme o user.py e main.py combinados)
    const response = await fetch(`${API_BASE_URL}/api/ingredient/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Requisições GET também exigem token!
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao buscar ingredientes:', response.status, errorData);
      if (response.status === 401 || response.status === 403) {
        throw new Error('Sessão expirada ou não autorizada. Faça login novamente.');
      }
      throw new Error(
        `Falha ao buscar ingredientes: ${response.status} - ${JSON.stringify(errorData.detail || errorData)}`
      );
    }

    const data: IngredientResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na requisição da API para buscar ingredientes:', error);
    throw error;
  }
}

// --- Função para Atualizar Ingrediente ---
export async function updateIngredient(
  ingredientId: string, // O ID do ingrediente a ser atualizado
  ingredientData: IngredientRequestBody // Os dados atualizados
): Promise<IngredientResponse> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Usuário não autenticado. Por favor, faça login.');
    }

   
    const response = await fetch(`${API_BASE_URL}/api/ingredient/${ingredientId}`, { // <<<<<<< ROTA AQUI
      method: 'PUT', // Método HTTP PUT
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Envia o token
      },
      body: JSON.stringify(ingredientData), // Envia os dados atualizados
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao atualizar ingrediente:', response.status, errorData);
      if (response.status === 401 || response.status === 403) {
        throw new Error('Sessão expirada ou não autorizada. Faça login novamente.');
      }
      throw new Error(
        `Falha ao atualizar ingrediente: ${response.status} - ${JSON.stringify(errorData.detail || errorData)}`
      );
    }

    const data: IngredientResponse = await response.json();
    return data; // Retorna o ingrediente atualizado
  } catch (error) {
    console.error('Erro na requisição da API para atualizar ingrediente:', error);
    throw error;
  }
}

// --- NOVA FUNÇÃO: deleteIngredient (para remover ingrediente) ---
export async function deleteIngredient(ingredientId: string): Promise<void> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Usuário não autenticado. Por favor, faça login.');
    }

    // A rota para DELETE é /api/ingredient/{id}
    const response = await fetch(`${API_BASE_URL}/api/ingredient/${ingredientId}`, {
      method: 'DELETE', // Método HTTP DELETE
      headers: {
        'Authorization': `Bearer ${token}`, // Envia o token
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao remover ingrediente:', response.status, errorData);
      if (response.status === 401 || response.status === 403) {
        throw new Error('Sessão expirada ou não autorizada. Faça login novamente.');
      }
      throw new Error(
        `Falha ao remover ingrediente: ${response.status} - ${JSON.stringify(errorData.detail || errorData)}`
      );
    }
    // Se a resposta for OK (ex: 200 OK, 204 No Content), não há corpo a retornar
  } catch (error) {
    console.error('Erro na requisição da API para remover ingrediente:', error);
    throw error;
  }
}
