'use client'

import styles from "./styles.module.css";
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className={styles['home-page']}>
      <div className={styles.container}>
        <div className={styles['top-banner']}>
          <div className={styles['banner-image']} />
        </div>

        <div className={styles['home-content']}>
          <h2>
            ADMINISTRADOR
            <hr className={styles.linha} />
          </h2>

          <div className={styles['grid-options']}>
            <div className={styles.card} onClick={() => router.push('#')}>
              <span className={styles.icon}></span>
              <strong>VENDAS</strong>
              <span className={styles.arrow}>{'>'}</span>
            </div>

            <div className={styles.card} onClick={() => router.push('#')}>
              <span className={styles.icon}></span>
              <strong>PRODUTOS</strong>
              <span className={styles.arrow}>{'>'}</span>
            </div>

            <div className={styles.card} onClick={() => router.push('#')}>
              <span className={styles.icon}></span>
              <strong>INGREDIENTES</strong>
              <span className={styles.arrow}>{'>'}</span>
            </div>

            <div className={styles.card} onClick={() => router.push('#')}>
              <span className={styles.icon}></span>
              <strong>RELATÓRIO</strong>
              <span className={styles.arrow}>{'>'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
