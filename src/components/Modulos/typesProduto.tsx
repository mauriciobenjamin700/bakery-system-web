// types/Produto.ts
export interface Produto {
    id: string
    name: string
    image_path?: string
    description?: string
    value: number
    validity?: string
    quantity: number
    min_quantity?: number
  }
  