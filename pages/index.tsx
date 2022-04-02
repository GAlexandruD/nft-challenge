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
  console.log(collections.length)
  // collections.length >1 ? 'className includes grid' : className includes flex
  return (
    <div className="">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ParticlesTwo />

      <div className=" absolute left-0 right-0 mx-auto flex min-h-screen max-w-7xl flex-col  py-20 px-10 2xl:px-0">
        <h1 className="mb-10 text-4xl font-extralight text-yellow-200">
          The{' '}
          <span className="font-extrabold underline decoration-pink-600/50">
            PAPAFAM
          </span>{' '}
          NFT MARKET Place
        </h1>
        <main className="rounded-xl bg-yellow-200/50 p-10 shadow-xl shadow-yellow-300/20">
          <div
            className={`${
              collections.length > 1
                ? 'grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
                : null
            }`}
          >
            {
              //For multiple collections change flex to grid
            }
            {collections.map((collection) => (
              <Link href={`/nft/${collection.slug.current}`}>
                <div className="m-2 flex cursor-pointer flex-col items-center rounded-xl bg-gradient-to-b from-teal-800/40 to-teal-800/90 shadow-2xl transition-all duration-200 hover:scale-105">
                  <div className="mt-4 rounded-xl p-2">
                    <img
                      className="h-96 w-60 rounded-xl object-cover shadow-xl"
                      src={urlFor(collection.mainImage).url()}
                      alt="Card image"
                    />
                  </div>
                  <div className="p-5 text-yellow-200">
                    <h2>{collection.title}</h2>
                    <hr className="" />
                    <p className="mt-2 text-sm text-yellow-100">
                      {collection.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
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
