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

      <ParticlesTwo />

      <div className="absolute top-1/3 flex w-screen flex-col content-center justify-center ">
        <h1 className="p-10 text-center text-4xl font-bold text-gray-100 ">
          Welcome to the NFT DROP CHALLENGE
        </h1>

        <button className="h-14 w-40 self-center rounded-xl bg-slate-200 text-3xl hover:animate-pulse">
          <a href="/nft/PAPAFAM-Rocks">Enter</a>
        </button>
      </div>
    </div>
  )
}

export default Home
