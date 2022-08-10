import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import {sanityClient, urlFor} from '../sanity'
import Image from 'next/image'
import { Collection } from '../typing'
import Link from 'next/link'

interface Props {
  collection: Collection[]
}

const Home: NextPage = ({collection}: Props ) => {

  return (
    <div className="max-w-7xl mx-auto min-h-screen flex flex-col py-20 px-10 2xl:x-0">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>
          The{' '} <span className='font-extrabold underline decoration-pink-600/50'>PAPAFAM</span>{' '} NFT Market Place
      </h1>
    
      <main className='bg-slate-100 p-10 shadow-xl shadow-rose-400/20 mt-5'>
        <div className='grid spacex-3 md:grid-col-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {collection.map((collection) => (
            <Link href={`/nft/${collection.slug.current}`}>
            <div className='flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-105'>
              <img className="h-96 w-60 rounded-2xl object-cover" src={urlFor(collection.mainImage).url()} alt="" />
              <div className="p-5">
                <h2 className='text-3xl'>{collection.title}</h2>
                <p className='text-sm mt-2 text-gray-400'>{collection.description}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </main>

      
    </div>
  )
}

export default Home

export const getServerSideProps:GetServerSideProps = async () => {
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
        creator-> {
          _id,
          name,
          address,
          slug {
          current
        },
      },
    }`


    const collection = await sanityClient.fetch(query)
    console.log(collection)

    return {
      props: {
        collection
      }
    }
}
