import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ParticlesTwo from '../components/Particles'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typing'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <>
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParticlesTwo />
      <div className="absolute mx-auto flex min-h-screen max-w-7xl flex-col  py-20 px-10 2xl:px-0">
        <h1 className="mb-10 text-4xl font-extralight">
          The{' '}
          <span className="font-extrabold underline decoration-pink-600/50">
            PAPAFAM
          </span>{' '}
          NFT MARKET Place
        </h1>
        <main className="rounded-xl bg-yellow-200/50 p-10 shadow-xl shadow-rose-400/20">
          <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {
              //For multiple collections change flex to grid
            }
            {collections.map((collection) => (
              <Link href={`/nft/${collection.slug.current}`}>
                <div className="flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105">
                  <img
                    className=" h-96 w-60 rounded-2xl object-cover"
                    src={urlFor(collection.mainImage).url()}
                    alt=""
                  />
                  <div className="p-5">
                    <h2>{collection.title}</h2>
                    <p className="mt-2 text-sm text-gray-200">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
     asset
  },
  previewImage {
    asset
  },
  slug {
  current
  },
  creator -> {
    _id,
      name,
      address,
      slug {
        current
      },
  },
  }`

  const collections = await sanityClient.fetch(query)
  console.log(collections)

  return {
    props: {
      collections,
    },
  }
}
