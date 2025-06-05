// components/ModulosIngredientes/IngredienteDetalhes.tsx
'use client'
import Image from 'next/image';
import styles from './Modal.module.css'

interface Ingrediente {
  id: string
  name: string
  measure: number
  image_path?: string
  mark?: string
  description?: string
  value: number
  validity?: string
  quantity: number
  min_quantity?: number
}

interface Props {
  ingrediente: Ingrediente
  onCloseAction: () => void
}

export default function IngredienteDetalhes({ ingrediente, onCloseAction }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>📦 Detalhes do Ingrediente</h2>
        <Image
          src={ingrediente.image_path || 'https://via.placeholder.com/200'}
          alt={ingrediente.name}
          className={styles.image}
        />
        <p><strong>Nome:</strong> {ingrediente.name}</p>
        <p><strong>Descrição:</strong> {ingrediente.description || '---'}</p>
        <p><strong>Quantidade:</strong> {ingrediente.quantity}g</p>
        <p><strong>Qtd. Mínima:</strong> {ingrediente.min_quantity ?? '---'}g</p>
        <p><strong>Preço:</strong> R$ {ingrediente.value.toFixed(2)}</p>
        <p><strong>Validade:</strong> {ingrediente.validity || '---'}</p>
        <p><strong>Marca:</strong> {ingrediente.mark || '---'}</p>
        <button className={styles.closeButton} onClick={onCloseAction}>Fechar</button>
      </div>
    </div>
  )
}