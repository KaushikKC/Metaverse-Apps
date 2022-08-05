import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import {sanityClient, urlFor} from '../sanity'
import Image from 'next/image'
import { Collection } from '../typing'

interface Props {
  collection: Collection[]
}

const Home: NextPage = ({collection}: Props ) => {

  return (
    <div className="">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello This is NFT projects</h1>

      
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
