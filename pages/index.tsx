import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import ParticlesTwo from '../components/Particles'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute h-10 w-10">
        <ParticlesTwo />
      </div>

      <h1 className="text-4xl font-bold text-red-500">
        Welcome to the NFT DROP CHALLENGE
      </h1>
    </div>
  )
}

export default Home
