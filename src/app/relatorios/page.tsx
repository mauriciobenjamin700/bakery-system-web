'use client';

import Image from 'next/image'; // Importar o componente Image do Next.js
import style from './page.module.css';
import Header from '../../components/cabecalho/Header';
import { useEffect, useRef, useState } from 'react';
import { initChart, initBarChart, initLineChart, populateUl, chartData } from './main';
import 'chart.js/auto';

export default function Relatorios() {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartRef2 = useRef<HTMLCanvasElement>(null);
    const detailsUlRef = useRef<HTMLUListElement>(null);
    const chartRef4 = useRef<HTMLCanvasElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [selectedOption, setSelectedOption] = useState('Mensal'); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    type MenuOption = 'Mensal' | 'Semanal' | 'Anual';
    const handleOptionClick = (option: MenuOption) => {
        setSelectedOption(option);
        setIsMenuOpen(false);
        
    };


    useEffect(() => {
        
        if (chartRef.current) {
            initChart(chartRef.current);
        }
        if (chartRef2.current) {
            initBarChart(chartRef2.current);
        }
        if (chartRef4.current) {
            initLineChart(chartRef4.current);
        }
        if (detailsUlRef.current && chartData) {
            populateUl(detailsUlRef.current, chartData);
        }

    }, []); 

    return (
        <div>
            <Header />
            <div className={style.relatoriospage}>

                <main className={style.conteiner}>
                    <div className={style.title}>
                        <h1 className={style.pageTitleP}> Relatório </h1>
                        <button className={style.buttonFilter} onClick={toggleMenu}>
                            {selectedOption}
                           
                            <Image
                                className={style.iconButtom}
                                src= "https://img.icons8.com/ios-glyphs/30/expand-arrow--v1.png"
                                alt="Seta para expandir/recolher menu" 
                                width={30} 
                                height={30} 
                            />
                        </button>
                        {isMenuOpen && (
                            <div className={style.dropdownMenu}>
                                <ul className={style.menu}>
                                    <li onClick={() => handleOptionClick('Mensal')}><button>Mensal</button></li>
                                    <li onClick={() => handleOptionClick('Semanal')}><button>Semanal</button></li>
                                    <li onClick={() => handleOptionClick('Anual')}><button>Anual</button></li>
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className={style.relatoriosContainer}>

                        <div className={style.teste}>
                            <div className={style.miniCards}> 
                                <div className={style.mini1}><h3>Total no Caixa</h3> </div>
                                <div className={style.mini}> <h3>Entrada no caixa</h3> </div>
                                <div className={style.mini1}> <h3>Retirada do caixa</h3></div>
                                <div className={style.mini}>  <h3>Active users</h3></div>
                            </div>
                            <div > 
                                <div className={style.cardLine}>
                                    <div> <h3 className={style.pageTitle}>Produtos mais Vendidos</h3></div>
                                    <div>
                                        <canvas className={style.lineChart} ref={chartRef4} id='linechart'></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={style.chartsContainer}>

                            <div className={style.bar}> 
                                <div>
                                    <div className={style.card}>
                                        <div> <h3 className={style.pageTitle}>Produtos mais Vendidos</h3></div>
                                        <div className={style.chartConteiner}>
                                            <canvas className={style.barChart} ref={chartRef2} id='Barchart'></canvas>
                                        </div>
                                    </div>

                                </div>

                            </div> 

                            <div className={style.donut}>
                                <div> 
                                    <div className={style.card}> 
                                        <div>
                                            <h3 className={style.pageTitle}>Produtos mais vendidos</h3>
                                        </div>
                                        <div className={style.chartConteiner}>
                                            <canvas className={style.myChart} ref={chartRef} id="myChart"></canvas>
                                        </div>

                                        <div className={style.details}>
                                            <ul ref={detailsUlRef}>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </main>
            </div>
        </div>
    );
}