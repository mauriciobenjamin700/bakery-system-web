'use client'
import styles from './Modal.module.css'

type MeasureEnum = 'UN' | 'KG' | 'G' | 'L' | 'ML'

interface PortionRequest {
  ingrediente?: string
  quantidade?: number
}

interface Produto {
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
  imagem?: string
}

interface Props {
  produto: Produto
  onClose: () => void
}

export default function ProdutoDetalhes({ produto, onClose }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Detalhes do Produto</h2>
        {produto.imagem && (
          <img src={produto.imagem} alt={produto.name} className={styles.image} />
        )}
        <p><strong>Nome:</strong> {produto.name}</p>
        <p><strong>Preço de Custo:</strong> R$ {typeof produto.price_cost === 'number' ? produto.price_cost.toFixed(2) : 'N/A'}</p>
        <p><strong>Preço de Venda:</strong> R$ {typeof produto.price_sale === 'number' ? produto.price_sale.toFixed(2) : 'N/A'}</p>
        <p><strong>Medida:</strong> {produto.measure}</p>
        <p><strong>Descrição:</strong> {produto.description}</p>
        <p><strong>Marca:</strong> {produto.mark}</p>
        <p><strong>Quantidade Mínima:</strong> {produto.min_quantity}</p>
        <p><strong>Quantidade:</strong> {produto.quantity}</p>
        <p><strong>Validade:</strong> {produto.validity ? new Date(produto.validity).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Receita:</strong></p>
        {produto.recipe && produto.recipe.length > 0 ? (
          <ul>
            {produto.recipe.map((item, idx) => (
              <li key={idx}>
                {item.ingrediente} - {item.quantidade}
              </li>
            ))}
          </ul>
        ) : (
          <span>Nenhuma receita cadastrada.</span>
        )}
        <button className={styles.closeButton} onClick={onClose}>Fechar</button>
      </div>
    </div>
  )
}