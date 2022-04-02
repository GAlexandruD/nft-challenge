import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'

import AiOutlineHome from '@react-icons/all-files/ai/AiOutlineHome'
import GoHome from '@react-icons/all-files/go/GoHome'
import { GetServerSideProps } from 'next'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typing'
import Link from 'next/link'
import { useEffect, useState, Fragment } from 'react'
import { BigNumber } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { BiDownArrow } from 'react-icons/bi'

interface Props {
  collection: Collection
}

// const clamedNFT = {
//   owner: '0xdC7E280BC08d2144583C3756c93B892949127233',
//   metadata: {
//     name: '#3',
//     description: 'A PAPAFAM Ape',
//     image:
//       'https://gateway.ipfscdn.io/ipfs/QmecgHz9dM171cR4JxSaw2B3uzWtQvLYjhBzNZJ3N1EX2c/3.png',
//     id: {
//       type: 'BigNumber',
//       hex: '0x03',
//     },
//     uri: 'ipfs://QmR3zsDrnxUYThSoPZXCQViqquLLhcN18VFDwuS4pnJJHS/3',
//     properties: {
//       Shirt: 'white suit',
//       Fur: 'cream',
//       Hat: 'halo',
//       Eyes: 'blue visor',
//     },
//   },
// }

function NFTDropPage({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const nftDrop = useNFTDrop(collection.address)
  const [loading, setLoading] = useState<boolean>(true)
  const [priceInEth, setPriceInEth] = useState<string>()
  const [nftToMint, setNftToMint] = useState<number>(1)

  //Auth
  const connectWithMetamask = useMetamask()
  const address = useAddress()
  const disconnect = useDisconnect()
  // ---

  useEffect(() => {
    console.log({ nftToMint })
  }, [nftToMint])

  useEffect(() => {
    if (!nftDrop) return
    const fetchPrice = async () => {
      const claimConditions = await nftDrop.claimConditions.getAll()
      setPriceInEth(claimConditions[0].currencyMetadata.displayValue)
    }
    fetchPrice()
  }, [nftDrop])

  useEffect(() => {
    if (!nftDrop) return

    const fetcNFTDropData = async () => {
      setLoading(true)
      const claimed = await nftDrop.getAllClaimed()
      const total = await nftDrop.totalSupply()

      setClaimedSupply(claimed.length)
      setTotalSupply(total)
      setLoading(false)
    }
    fetcNFTDropData()
  }, [nftDrop])

  const mintNft = () => {
    if (!nftDrop || !address) return

    const quantity = 1 //How many unique NFTs you want to claim
    ///Can make this dynamic
    ///////////////////////////////////////////////

    setLoading(true)

    const notification = toast.loading('Minting...', {
      style: {
        background: 'white',
        color: 'green',
        fontWeight: 'bolder',
        fontSize: '17px', //1.5rem
        padding: '20px', //1rem
      },
    })
    nftDrop
      .claimTo(address, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt //the transaction receipt
        const claimedTokenId = tx[0].id //the id of the claimed NFT
        //
        //
        //
        ///////////////////////////////
        ///////////////////////////
        ///////////////////////
        /////////////////////
        //////////////
        ///////////
        /////////
        const clamedNFT = await tx[0].data() // (optional) get the metadata of the claimed NFT

        ////POP-up with metadata of the claimed NFT
        ///////////////////////////////////////////////
        ///////////////////////////////////////////
        /////////////////////////////////////
        ///////////////////////////////

        toast.success('Hooray! You just minted a NFT!', {
          duration: 8000,
          style: {
            background: 'white',
            color: 'green',
            fontWeight: 'bolder',
            fontSize: '17px', //1.5rem
            padding: '20px', //1rem
          },
        })
        console.log({ receipt })
        console.log({ claimedTokenId })
        console.log({ clamedNFT })

        const mintedDetails = Object.keys(clamedNFT.metadata.properties?) //array of keys
        const showingDetails = mintedDetails.map((item, idx) => {
          return (
            <p>
              <span className="font-bold">{`${item}: `}</span>
              {`${clamedNFT.metadata.properties?[item]}`}
            </p>
          )
        })
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
          >
            <div className="w-0 flex-1 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-20 w-20 rounded-full"
                    src={clamedNFT.metadata.image}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    You've got: {clamedNFT.metadata.name}
                    <hr />
                    {clamedNFT.metadata.description}
                  </p>
                  <div className="mt-1 text-sm text-gray-500">
                    {showingDetails}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex w-full flex-col items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <p>{clamedNFT.metadata.name}</p>
                <p>Minted!</p>
              </button>
            </div>
          </div>
        ))
      })
      .catch((err) => {
        console.log(err)
        toast.error('Whoooops.... Something went wrong!', {
          style: {
            background: 'red',
            color: 'white',
            fontWeight: 'bolder',
            fontSize: '17px', //1.5rem
            padding: '20px', //1rem}
          },
        })
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss(notification)
      })
  }

  const increaseNFT = () => {
    setNftToMint(nftToMint + 1)
  }

  const decreaseNFT = () => {
    nftToMint === 1
      ? toast.error("You can't mint less than 1 NFT", {
          duration: 1000,
          style: {
            background: 'white',
            color: 'green',
            fontWeight: 'bolder',
            fontSize: '17px', //1.5rem
            padding: '20px', //1rem
          },
        })
      : setNftToMint(nftToMint - 1)
  }

  return (
    <div className="z-10 flex h-screen flex-col lg:grid lg:grid-cols-10">
      <Toaster position="bottom-center" />
      {/* Left side */}

      <div className="bg-gradient-to-br from-cyan-900 to-green-700 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
          <div className="relative rounded-xl bg-gradient-to-br from-yellow-400 to-cyan-600 p-2">
            <img
              className="w-44 rounded-xl object-cover hover:animate-rotate-y lg:h-96 lg:w-72"
              src={urlFor(collection.previewImage).url()}
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-yellow-200">
              {collection.nftCollectionName}
            </h1>

            <h2 className="text-xl text-yellow-200">
              {collection.description}
            </h2>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link href={'/'}>
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
              The{' '}
              <span className="font-extrabold underline decoration-pink-600/50">
                PAPAFAM
              </span>{' '}
              NFT MARKET Place
            </h1>
          </Link>
          <button
            title="Sign In/Out"
            onClick={() => (address ? disconnect() : connectWithMetamask())}
            className="rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? 'Sign Out' : 'Sign In'}
          </button>
        </header>

        <hr />
        {address && (
          <p className="self-end">
            You're logged in with wallet address: {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}

        {/* Content */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src={urlFor(collection.mainImage).url()}
            alt=""
          />
          <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">
            {collection.title}
          </h1>

          {loading ? (
            <p className="animate-pulse pt-2 text-xl text-green-500">
              Loading Supply Count...
            </p>
          ) : (
            <p className="pt-2 text-xl text-green-500">
              {claimedSupply} / {totalSupply?.toString()} NFT's claimed
            </p>
          )}
          {loading && (
            <img
              className="h-80 w-80 object-contain"
              src="/static/loading.gif"
              alt="loading..."
            />
          )}
        </div>

        {/* Mint Button */}
        <div className="flex flex-row">
          <button
            onClick={mintNft}
            disabled={
              loading || claimedSupply === totalSupply?.toNumber() || !address
            }
            title="Mint NFT"
            className="mt-10 h-16 w-full rounded-full bg-green-700 font-bold text-yellow-200 disabled:bg-gray-400"
          >
            {loading ? (
              <>Loading...</>
            ) : claimedSupply === totalSupply?.toNumber() ? (
              <>Sold Out</>
            ) : !address ? (
              <>Sign in to Mint</>
            ) : (
              <span className="font-bold">
                Mint {nftToMint} NFT ({priceInEth} ETH)
              </span>
            )}
          </button>
          <div
            id="selectNFTs"
            className="mt-10 ml-10 flex h-16 w-32 items-center justify-center rounded-full bg-green-700 text-2xl text-white"
          >
            <div className="flex flex-col text-yellow-200">
              <button onClick={increaseNFT}>
                <BiDownArrow className="rotate-180" />
              </button>
              <button onClick={decreaseNFT}>
                <BiDownArrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
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

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })

  if (!collection) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection,
    },
  }
}
