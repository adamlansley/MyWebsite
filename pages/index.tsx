import type { NextPage } from 'next'
import Head from 'next/head'
import Card from 'components/layout/Card'
import styles from 'styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Adam Lansley - Front End Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Card title="Cock" subtitle="Tastes nice">
        This is garbo cock This is garbo cock
        </Card>
        <Card subtitle="Do we like balls?">
          This is garbo ballssssss
        </Card>
      </main>
    </div>
  )
}

export default Home
