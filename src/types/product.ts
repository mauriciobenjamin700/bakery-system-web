import { Measure, UserRole } from "@/constants/enums";

declare global {
  type ProductRequest = {
    name: string;
    price_cost: number;
    price_sale: number;
    measure: Measure;
    description: string;
    mark?: string;
    min_quantity?: number;
  };
  type Recipe = {
    id: string;
    ingredient_id: string;
    ingredient_name: string;
    ingredient_measure: Measure;
    ingredient_quantity: number;
  };
  type ProductBatchResponse = {
    product_id: string;
    validity: string;
    quantity: number;
    id: string;
    created_at: string;
    updated_at: string;
  }
  type ProductResponse = {
    name: string;
    price_cost: number;
    price_sale: number;
    measure: Measure;
    description: string;
    mark?: string;
    min_quantity?: number;
    id: string;
    image_path: string;
    quantity: number;
    recipe?: Recipe[] | null;
    batches?: ProductBatchResponse[] | null;
    created_at: string;
    updated_at: string;
  };
}

export {};