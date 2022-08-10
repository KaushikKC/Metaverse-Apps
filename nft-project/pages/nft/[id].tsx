import React, { useEffect, useState } from 'react'
import { useAddress, useDisconnect, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import Link from 'next/link';
import {BigNumber} from 'ethers'

interface Props {
    collection: Collection
  }
  

function NFTDropPage({ collection }: Props)  {

  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const NFTDrop = useNFTDrop(collection.address);

    // Auth
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();
    
    useEffect(() => {
      if (!NFTDrop) return;

      const fetchNFtDropData = async() => {
        const claimed = await NFTDrop?.getAllClaimed();
        const total = await NFTDrop.totalSupply();

        setClaimedSupply(claimed.length);
        setTotalSupply(total)
      }
    },[NFTDrop])


  return (
    <div className='flex flex-col h-screen lg:grid lg:grid-cols-10'>
        {/* left  */}
        <div className='lg:col-span-4 bg-gradient-to-br from-cyan-800 to-rose-500'>
            <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
                <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
                  <img className='w-44 rounded-xl object-cover lg:h-96 lg:w-72' src={urlFor(collection.previewImage).url()} alt="" />
                </div>
                
                <div className="p-5 text-center space-y-2">
                    <h1 className='text-white text-4xl font-bold'>
                        {collection.nftCollectionName}
                    </h1>
                    <h2 className='text-xl text-gray-300'>
                        {collection.description}
                    </h2>
                </div>
            </div>
        </div>

        {/* Right  */}
        <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <Link href={'/'}>
                <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>
                    The{' '} <span className='font-extrabold underline decoration-pink-600/50'>PAPAFAM</span>{' '} NFT Market Place
                </h1>
                </Link>
                <button onClick={() => (address ? disconnect() : connectWithMetamask())} className="rounded-full bg-rose-400 px-4 py-2 text-xs font-bold text-white lg:px-5 lg:py-3 lg:text-base">
                    {address ? 'Sign Out' : 'Sign In'}
                </button>
            </div>
            <hr className="my-2 border" />
            {address && (
                <p className='text-center text-sm text-rose-400'>You're Logged in with wallet {address.substring(0,5)}...{address.substring(address.length - 5)}</p>
            )}
            {/* Container */}
            <div className='mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0 lg:justify-center'>
                <img className='w-80 object-cover pb-10 lg:h-40' src={urlFor(collection.mainImage).url()} alt="" />
                <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>
                    The PAPAFAM Ape Codding Club | NFT Drop
                </h1>

                <p className="pt-2 text-xl text-green-500">{claimedSupply} / {totalSupply?.toString()} NFT's claimed</p>
            </div>

            <button className='h-16 w-full text-white rounded-full bg-red-600 mt-10 font-bold'>
                Mint NFt (0.01 ETH)
            </button>
        </div>
    </div>
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
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
        creator-> {
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