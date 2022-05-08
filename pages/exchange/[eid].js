import Head from 'next/head'
import styles from '../../styles/Exchange.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/exchanges?per_page=10`
  )
  const data = await res.json()
  return { props: { data } }
}

export default function Exchange({ data }) {
  const router = useRouter()
  const { eid } = router.query
  const exchange = data.filter((exchange) => exchange.id === eid)[0]

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Exchanges</title>
      </Head>

      <main className={styles.main}>
        <img src={exchange.image}></img>
        <h1 className={styles.title}>{exchange.name}</h1>

        <div className={styles.grid}>
          <div>
            <p>{exchange.description}</p>
            <p>Country: {exchange.country}</p>
            <p>Trust score: {exchange.trust_score}</p>
            <p>Year established: {exchange.year_established}</p>
          </div>
        </div>

        <Link href="/">
          <button className={styles.back}>&larr; Back</button>
        </Link>
      </main>
    </div>
  )
}
