import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="bg-[#091818] min-h-screen flex flex-col">
      <Head>
        <title>Crypto Lottery</title>
        
      </Head>

      <Header/>
    </div>
  )
}

export default Home
