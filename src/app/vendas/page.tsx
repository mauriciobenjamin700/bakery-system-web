'use client';

import Header from '../../components/cabecalho/Header';
import style from './page.module.css';
import { useState } from 'react';
import Image from 'next/image';

interface ItemVenda {
    id: number;
    nome: string;
    quantidade: number;
    subtotal: number;
}

let nextId = 1;
const NUM_LINHAS_FIXAS = 6;

export default function Vendas() {
    const [vendas, setVendas] = useState<ItemVenda[]>([]);
    const [novoItemNome, setNovoItemNome] = useState('');
    const [novaQuantidade, setNovaQuantidade] = useState<number | undefined>(0);
    const [novoItemPreco, setNovoItemPreco] = useState<number | undefined>(0);

    const adicionarItem = () => {
        if (novoItemNome.trim() && novaQuantidade !== undefined) {
            const novoItem: ItemVenda = {
                id: nextId++,
                nome: novoItemNome,
                quantidade: novaQuantidade,

                subtotal: novaQuantidade * 1,
            };
            setVendas([...vendas, novoItem]);
            setNovoItemNome('');
            setNovaQuantidade(0);
            setNovoItemPreco(0);
        } else {
            alert('Por favor, preencha o nome e a quantidade do produto.');
        }
    };

    const removerItem = (id: number) => {
        setVendas(vendas.filter(venda => venda.id !== id));
    };

    const calcularTotal = () => {
        return vendas.reduce((total, venda) => total + venda.subtotal, 0).toFixed(2);
    };

    const linhasParaRenderizar = Array(NUM_LINHAS_FIXAS).fill(null);

    return (
        <div>
            <Header />
            <div className={style.vendasPage}>
                <main className={style.conteiner}>
                    <h1 className={style.pageTitle}>Venda</h1>
                    <div className={style.vendaContainer}>
                        <div className={style.listaItens}>
                            <table className={style.tabelaVendas}>
                                <thead >
                                    <tr>
                                        <th>Nome</th>
                                        <th>Quantidade</th>
                                        <th>Preço</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendas.map(venda => (
                                        <tr key={venda.id}>
                                            <td>{venda.nome}</td>
                                            <td>{venda.quantidade}</td>
                                            <td> R$ 100</td>
                                            <td>{venda.subtotal.toFixed(2)}</td>
                                            <td>
                                                <button className={style.removerItem} onClick={() => removerItem(venda.id)}>
                                                    <img
                                                        width="20"
                                                        height="20"
                                                        src="https://img.icons8.com/forma-bold-sharp/24/full-trash.png"
                                                        alt="full-trash"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {vendas.length < NUM_LINHAS_FIXAS && Array(NUM_LINHAS_FIXAS - vendas.length).fill(null).map((_, index) => (
                                        <tr key={`empty-${vendas.length + index}`}>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className={style.totalFixed}>
                                <span className={style.totalLabel}>Total</span>
                                <span className={style.totalValue}>R$ {calcularTotal()}</span>
                            </div>

                        </div>

                        <div className={style.adicionarItem}>
                            <div className={style.inputGroup}>
                                <label htmlFor="nomeProduto"> Nome: </label>
                                <input
                                    type="text"
                                    id="nomeProduto"
                                    className={style.input}
                                    value={novoItemNome}
                                    onChange={(e) => setNovoItemNome(e.target.value)}
                                    placeholder="Nome do produto"
                                />
                            </div>
                            <div className={style.inputGroup}>
                                <label htmlFor="quantidade"> Quantidade: </label>
                                <input
                                    type="number"
                                    id="quantidade"
                                    className={style.select}
                                    value={novaQuantidade}
                                    onChange={(e) => setNovaQuantidade(Number(e.target.value))}
                                    placeholder="Quantidade"
                                />
                            </div>

                            <button className={style.confirmarAdicionar} onClick={adicionarItem}>Confirmar</button>

                            <div className={style.acoesVenda}>
                                <button className={style.cancelarVenda}>Cancelar</button>
                                <button className={style.confirmarVenda}>Confirmar</button>
                            </div>
                        </div>


                    </div>
                </main>
            </div>
        </div>
    );
}