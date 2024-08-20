import 'keen-slider/keen-slider.min.css'

import Stripe from "stripe";
import Image from "next/image";
import Link from 'next/link';

import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from "../styles/pages/home";
import Head from 'next/head';


interface HomeProps{
  products: {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
  }[]
}

export default function Home({ products }: HomeProps) {
  const [keenSliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite shop</title>
      </Head>
      
      <HomeContainer ref={keenSliderRef} className="keen-slider">
        {products.map(product => {
          return(
            <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
              <Product className='keen-slider__slide'>
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <strong>
                    {product.name}
                  </strong>
                  <span>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }). format(product.price / 100)}
                  </span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price 
    
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}
