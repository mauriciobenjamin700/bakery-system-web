// components/CadastroModal.tsx
'use client'

import { useState } from 'react'
import styles from './Modal.module.css'
import { Ingrediente } from './typesIngrediente'

interface Props {
  onCadastrar: (novo: Omit<Ingrediente, 'id'>) => void
  onClose: () => void
}

export default function CadastroModal({ onCadastrar, onClose }: Props) {
  const [form, setForm] = useState<Omit<Ingrediente, 'id'>>({
    name: '',
    measure: 0,
    value: 0,
    quantity: 0,
    image_path: '',
    mark: '',
    description: '',
    validity: '',
    min_quantity: 0
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'name' || name === 'mark' || name === 'description' || name === 'image_path'
        ? value
        : name === 'validity'
        ? value
        : parseFloat(value)
    }))
  }

  const handleSubmit = () => {
    onCadastrar(form)
    onClose()
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Cadastro de Ingrediente</h2>
        <div className={styles.form}>
          <input name="name" placeholder="Nome" onChange={handleChange} />
          <input name="measure" placeholder="Medida (g/ml)" onChange={handleChange} type="number" />
          <input name="value" placeholder="Valor" onChange={handleChange} type="number" />
          <input name="quantity" placeholder="Quantidade" onChange={handleChange} type="number" />
          <input name="image_path" placeholder="URL da Imagem" onChange={handleChange} />
          <input name="mark" placeholder="Marca" onChange={handleChange} />
          <input name="min_quantity" placeholder="Quantidade Mínima" onChange={handleChange} type="number" />
          <input name="validity" placeholder="Validade (YYYY-MM-DD)" onChange={handleChange} type="date" />
        </div>
        <div className={styles.actions}>
          <button onClick={handleSubmit}>Cadastrar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
