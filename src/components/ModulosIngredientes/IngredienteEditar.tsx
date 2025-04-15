'use client'

import { useState, useEffect, useRef } from 'react'
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
  onSave: (ingredienteEditado: Ingrediente) => void
  onClose: () => void
}

export default function IngredienteEditar({ ingrediente, onSave, onClose }: Props) {
  const [editado, setEditado] = useState<Ingrediente>({ ...ingrediente })
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setEditado((prev) => ({
      ...prev,
      [name]:
        name === 'value' || name === 'quantity' || name === 'min_quantity'
          ? parseFloat(value)
          : value,
    }))
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>✏️ Editar Ingrediente</h2>

        <input
          ref={inputRef}
          name="name"
          value={editado.name}
          onChange={handleChange}
          placeholder="Nome"
        />
        <input
          name="value"
          type="number"
          value={editado.value}
          onChange={handleChange}
          placeholder="Preço"
        />
        <input
          name="quantity"
          type="number"
          value={editado.quantity}
          onChange={handleChange}
          placeholder="Quantidade"
        />
        <input
          name="min_quantity"
          type="number"
          value={editado.min_quantity ?? ''}
          onChange={handleChange}
          placeholder="Quantidade Mínima"
        />
        <input
          name="image_path"
          value={editado.image_path ?? ''}
          onChange={handleChange}
          placeholder="Link da imagem"
        />
        <input
          name="validity"
          type="date"
          value={editado.validity ?? ''}
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={editado.description ?? ''}
          onChange={handleChange}
          placeholder="Descrição"
          style={{ resize: 'none', borderRadius: 8, padding: '0.6rem' }}
        />

        <div className={styles.actions}>
          <button className={styles.apply} onClick={() => onSave(editado)}>
            💾 Salvar
          </button>
          <button className={styles.close} onClick={onClose}>
            ❌ Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
