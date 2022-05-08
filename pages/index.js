import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/exchanges?per_page=10`
  )
  const data = await res.json()
  return { props: { data } }
}

export default function Home({ data }) {
  const router = useRouter()

  const viewExchange = (idx, event) => {
    const exchange = data[idx]
    router.push({
      pathname: `/exchange/${exchange.id}`,
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Exchanges</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Crypto Exchanges</h1>

        <div className={`${styles.grid} exchanges`}>
          {data.map((exchange, idx) => {
            return (
              <ul
                key={idx}
                className={styles.card}
                onClick={viewExchange.bind(this, idx)}
              >
                <img src={exchange.image}></img>
                <h2>{exchange.name} &rarr;</h2>
                <a
                  href={exchange.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {exchange.url}
                </a>
                <p>Country: {exchange.country}</p>
                <p>Trust score: {exchange.trust_score}</p>
              </ul>
            )
          })}
        </div>
      </main>
    </div>
  )
}
