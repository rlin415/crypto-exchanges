import Head from 'next/head'
import styles from '../styles/Home.module.css'

export async function getServerSideProps() {
  const res = await fetch(`https://api.coingecko.com/api/v3/exchanges?per_page=10`)
  const data = await res.json()
  return { props: { data } }
}

const viewExchange = (e) => {

};

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Exchanges</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Crypto Exchanges
        </h1>

        <div className={styles.grid}>
          {
            data.map((exchange, idx) => {
              return (
                <ul key={idx} className={styles.card} onClick={viewExchange}>
                  <img src={exchange.image}></img>
                  <h2>{exchange.name} &rarr;</h2>
                  <a href={exchange.url} target="_blank">{exchange.url}</a>
                  <p>Country: {exchange.country}</p>
                  <p>Trust score: {exchange.trust_score}</p>
                </ul>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}
