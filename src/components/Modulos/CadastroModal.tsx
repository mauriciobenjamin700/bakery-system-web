'use client'
import { useState } from 'react'
import styles from './Modal.module.css'

interface PortionRequest {
  // Defina os campos necessários para a receita, se houver
  ingrediente?: string
  quantidade?: number
}

type MeasureEnum = 'UN' | 'KG' | 'G' | 'L' | 'ML' // Exemplo, ajuste conforme seu enum real

interface Props {
  onCadastrar: (produto: {
    name: string
    price_cost: number
    price_sale: number
    measure: MeasureEnum
    description: string
    mark: string
    min_quantity: number
    recipe: PortionRequest[] | null
    quantity: number
    validity: string | null
  }) => void
  // CORREÇÃO: Propriedade renomeada para onCloseAction
  onCloseAction: () => void
}

export default function CadastroModal({ onCadastrar, onClose }: Props) {
  const [name, setName] = useState('')
  const [priceCost, setPriceCost] = useState('')
  const [priceSale, setPriceSale] = useState('')
  const [measure, setMeasure] = useState<MeasureEnum>('UN')
  const [description, setDescription] = useState('')
  const [mark, setMark] = useState('')
  const [minQuantity, setMinQuantity] = useState('')
  const [quantity, setQuantity] = useState('')
  const [validity, setValidity] = useState('')
  const [recipe, setRecipe] = useState<PortionRequest[] | null>(null)

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Cadastro de Produto</h2>
        <input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Preço de Custo" type="number" value={priceCost} onChange={e => setPriceCost(e.target.value)} />
        <input placeholder="Preço de Venda" type="number" value={priceSale} onChange={e => setPriceSale(e.target.value)} />
        <select value={measure} onChange={e => setMeasure(e.target.value as MeasureEnum)}>
          <option value="UN">Unidade</option>
          <option value="KG">Quilo</option>
          <option value="G">Grama</option>
          <option value="L">Litro</option>
          <option value="ML">Mililitro</option>
        </select>
        <input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
        <input placeholder="Marca" value={mark} onChange={e => setMark(e.target.value)} />
        <input placeholder="Quantidade Mínima" type="number" value={minQuantity} onChange={e => setMinQuantity(e.target.value)} />
        {/* Campo para receita pode ser customizado conforme necessidade */}
        <input placeholder="Quantidade" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <input placeholder="Validade" type="date" value={validity} onChange={e => setValidity(e.target.value)} />
        <div className={styles.actions}>
          <button className={styles.cadastrarButton} onClick={() => {
            onCadastrar({
              name,
              price_cost: Number(priceCost),
              price_sale: Number(priceSale),
              measure,
              description,
              mark,
              min_quantity: Number(minQuantity),
              recipe,
              quantity: Number(quantity),
              validity: validity || null
            })
            // CORREÇÃO: Chamando onCloseAction
            onCloseAction()
          }}>Cadastrar</button>
          <button className={styles.closeButton} onClick={onCloseAction}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}