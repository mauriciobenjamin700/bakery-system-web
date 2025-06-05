'use client';

import Header from '../../components/cabecalho/Header';
import style from './page.module.css';
import { useState } from 'react';
import Image from 'next/image'; // This import was unused, but now it will be used!
import React from 'react'; // This import was unused, so it will be removed if not needed elsewhere

interface ItemVenda {
    id: number;
    nome: string;
    quantidade: number;
    subtotal: number;
}

let nextId = 1;
// const NUM_LINHAS_FIXAS = 6; // This variable was unused, so it will be removed.

export default function Vendas() {
    const [vendas, setVendas] = useState<ItemVenda[]>([]);
    const [novoItemNome, setNovoItemNome] = useState('');
    const [novaQuantidade, setNovaQuantidade] = useState<number | undefined>(0);
    // const [novoItemPreco, setNovoItemPreco] = useState<number | undefined>(0); // This variable was unused, so it will be removed.

    const adicionarItem = () => {
        // Since novoItemPreco was not used, let's ensure '1' is the intended price here.
        // If the price comes from somewhere else, it needs to be managed.
        if (novoItemNome.trim() && novaQuantidade !== undefined && novaQuantidade > 0) { // Added novaQuantidade > 0 check
            const itemPrecoUnitario = 100; // Hardcoding the price as it was in the table. If dynamic, adjust.
            const novoItem: ItemVenda = {
                id: nextId++,
                nome: novoItemNome,
                quantidade: novaQuantidade,
                subtotal: novaQuantidade * itemPrecoUnitario, // Using the fixed price
            };
            setVendas([...vendas, novoItem]);
            setNovoItemNome('');
            setNovaQuantidade(0);
            // setNovoItemPreco(0); // This setter was for an unused state variable, so it will be removed.
        } else {
            alert('Por favor, preencha o nome e uma quantidade válida do produto.'); // Improved alert message
        }
    };

    const removerItem = (id: number) => {
        setVendas(vendas.filter(venda => venda.id !== id));
    };

    const calcularTotal = () => {
        return vendas.reduce((total, venda) => total + venda.subtotal, 0).toFixed(2);
    };

    // const linhasParaRenderizar = Array(NUM_LINHAS_FIXAS).fill(null); // This variable was unused, so it will be removed.

    const calculateEmptyRows = () => {
        const remainingRows = 6 - vendas.length; // Assuming 6 is still the desired fixed number of rows
        return remainingRows > 0 ? Array(remainingRows).fill(null) : [];
    };

    return (
        <div>
            <Header />
            <div className={style.vendasPage}>
                <main className={style.conteiner}>
                    <h1 className={style.pageTitle}>Venda</h1>
                    <div className={style.vendaContainer}>
                        <div className={style.listaItens}>
                            <table className={style.tabelaVendas}>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Quantidade</th>
                                        <th>Preço Unit.</th> {/* Changed to Preço Unit. for clarity */}
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendas.map(venda => (
                                        <tr key={venda.id}>
                                            <td>{venda.nome}</td>
                                            <td>{venda.quantidade}</td>
                                            <td>R$ 100,00</td> {/* Hardcoding price as it was in your HTML */}
                                            <td>{venda.subtotal.toFixed(2)}</td>
                                            <td>
                                                <button className={style.removerItem} onClick={() => removerItem(venda.id)}>
                                                    {/* Replaced <img> with <Image> */}
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        src="https://img.icons8.com/forma-bold-sharp/24/full-trash.png"
                                                        alt="Remover item"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Dynamically render empty rows based on remaining space */}
                                    {calculateEmptyRows().map((_, index) => (
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
                                    value={novaQuantidade === 0 ? '' : novaQuantidade} // Display empty string for 0 to make placeholder visible
                                    onChange={(e) => setNovaQuantidade(Number(e.target.value))}
                                    placeholder="Quantidade"
                                    min="0" // Prevent negative quantities
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