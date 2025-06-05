// src/interfaces/ingredient.ts

// Esta interface representa o que você *envia* para o backend na requisição POST
export interface IngredientRequestBody {
  name: string;
  measure: string; // Nota: No seu frontend atual, 'measure' é 'number', mas o backend espera 'string' ('kg', 'unidade'). Ajuste seu formulário/lógica.
  mark?: string;
  description?: string;
  value: number;
  min_quantity?: number;
  quantity: number;
  validity: string; // Backend espera string no formato "YYYY-MM-DD"
  image_path?: string; 
}

// Esta interface representa a *resposta* completa que você recebe do backend
export interface IngredientResponse {
  id: string; // Gerado pelo backend
  name: string;
  measure: string;
  mark?: string;
  description?: string;
  value: number;
  min_quantity?: number;
  quantity: number;
  image_path?: string; // O backend pode gerar isso
  validity: string;
  created_at: string; // Data e hora de criação
  updated_at: string; // Data e hora da última atualização
  batches: Array<{ // Se o backend retornar lotes
    ingredient_id: string;
    validity: string;
    quantity: number;
    id: string;
    created_at: string;
    updated_at: string;
  }>;
}
