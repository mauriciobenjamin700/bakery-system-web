// types/typesIngredientes.ts
export interface Ingrediente {
  id: string
  name: string
  image_path?: string
  description?: string
  value: number
  validity?: string
  quantity: number
  min_quantity?: number
  mark?: string
  measure: number  // Medida, por exemplo, em g/ml
}
