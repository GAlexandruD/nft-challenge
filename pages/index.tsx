import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ParticlesTwo from '../components/Particles'
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typing'

import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  const [localCollections, setLocalCollections] = useState(collections)

  const filteringResults = [
    { name: '1 Card' },
    { name: '2 Cards' },
    { name: '3 Cards' },
    { name: 'All Cards' },
  ]
  const [selected, setSelected] = useState(filteringResults[3])

  const calculatingShowingCollections = (props: string) => {
    const toSlice = (props: string) => {
      if (props === '1 Card') {
        return localCollections.slice(0, 1)
      } else if (props === '2 Cards') {
        return localCollections.slice(0, 2)
      } else if (props === '3 Cards') {
        return localCollections.slice(0, 3)
      } else {
        return localCollections
      }
    }
    return toSlice(props)
  }

  const [filtered, setFiltered] = useState(localCollections)

  const [showingCollections, setShowingCollections] = useState(localCollections)

  useEffect(() => {
    const numberToShow = calculatingShowingCollections(selected.name)
    setShowingCollections(numberToShow)
  }, [selected])

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
              showingCollections.length === 1
                ? null
                : showingCollections.length === 2
                ? 'grid space-x-3 md:grid-cols-2'
                : showingCollections.length === 3
                ? 'grid space-x-3 md:grid-cols-2 lg:grid-cols-3'
                : 'grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
            }`}
          >
            {showingCollections.map((collection, idx) => (
              <Link key={idx} href={`/nft/${collection.slug.current}`}>
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
        <h1 className="self-center pt-4 text-yellow-200">Showing</h1>
        <div id="listbox" className="mb-32 w-32 self-center">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className=" relative w-full cursor-default rounded-lg bg-teal-800/90 py-2 pl-3 pr-10 text-left text-yellow-200 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="h-5 w-5 text-yellow-200"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-teal-800 py-1 text-base text-yellow-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteringResults.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-teal-900'
                            : 'bg-teal-700 text-yellow-200'
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
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

  return {
    props: {
      collections,
    },
  }
}
