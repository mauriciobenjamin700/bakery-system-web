'use client'
import { useState } from 'react'
import styles from './Modal.module.css'

interface PortionRequest {
  // Defina os campos necessários para a receita, se houver
  ingrediente?: string
  quantidade?: number
}

type MeasureEnum = 'UN' | 'KG' | 'G' | 'L' | 'ML' // Exemplo, ajuste conforme seu enum real

// Definição completa da interface Produto para o tipo Omit<Produto, 'id'>
// Isso é necessário porque o CadastroModal agora precisa receber todas as propriedades
// que a página de produtos está a passar para um novo Produto, exceto o 'id'.
interface ProdutoCompletoParaCadastro {
  name: string;
  price_cost: number;
  price_sale: number;
  measure: MeasureEnum;
  description: string;
  mark: string;
  min_quantity: number;
  recipe: PortionRequest[] | null;
  quantity: number;
  validity: string | null;
  imagem: string; 
}


interface Props {
  // CORREÇÃO: onCadastrarAction agora espera o tipo completo de produto (exceto o id)
  onCadastrarAction: (produto: ProdutoCompletoParaCadastro) => void;
  
  onCloseAction: () => void; 
}

export default function CadastroModal({ onCadastrarAction, onCloseAction }: Props) {
  const [name, setName] = useState('')
  const [priceCost, setPriceCost] = useState('')
  const [priceSale, setPriceSale] = useState('')
  const [measure, setMeasure] = useState<MeasureEnum>('UN')
  const [description, setDescription] = useState('')
  const [mark, setMark] = useState('')
  const [minQuantity, setMinQuantity] = useState('')
  const [quantity, setQuantity] = useState('')
  const [validity, setValidity] = useState('')
  // O estado 'recipe' não possui input no formulário, mantido para corresponder à interface
  const [recipe] = useState<PortionRequest[] | null>(null) 
  const [imagem, setImagem] = useState(''); 


  const handleCadastrar = () => {
    // CORREÇÃO: Certificar-se de que todos os campos da interface ProdutoCompletoParaCadastro são enviados
    onCadastrarAction({
      name,
      price_cost: Number(priceCost),
      price_sale: Number(priceSale),
      measure,
      description,
      mark,
      min_quantity: Number(minQuantity),
      recipe, // Valor de 'recipe' (atualmente null)
      quantity: Number(quantity),
      validity: validity || null,
      imagem 
    })
    onCloseAction() 
  }

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
        <input placeholder="Quantidade" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <input placeholder="Validade" type="date" value={validity} onChange={e => setValidity(e.target.value)} />
        <input placeholder="Link da imagem (URL)" value={imagem} onChange={e => setImagem(e.target.value)} />
        
        <div className={styles.actions}>
          <button className={styles.cadastrarButton} onClick={handleCadastrar}>
            Cadastrar
          </button>
          <button className={styles.closeButton} onClick={onCloseAction}>Cancelar</button>
        </div>
      </div>
    </div>
  )
}
