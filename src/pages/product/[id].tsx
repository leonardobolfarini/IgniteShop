import { stripe } from "@/src/lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";
import { CartEntry } from "use-shopping-cart/core";

interface ProductProps {
  product: {
    id: string,
    name: string,
    imageUrl: string,
    price: number,
    description: string,
    productPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isAddingToCart, setAddingToCart] = useState(false)

  const { addItem, cartDetails } = useShoppingCart()

  async function handleAddProduct(){
    try {
      setAddingToCart(true)
      addItem(
        { currency: 'BRL', id: product.id, name: product.name, price: product.price / 100, price_id: product.productPriceId, image: product.imageUrl },
        { count: 1 }
      )
    } catch(error){
      setAddingToCart(false)
      alert('Não foi possível adicionar ao carrinho')
    }
  }
  return (
    <>
      <Head>
        <title>{product.name} | Ignite shop</title>
      </Head>
    
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt=''/>
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price / 100)}
          </span>

          <p>{product.description}</p>

          <button disabled={isAddingToCart} 
            onClick={handleAddProduct}
          >
            Adicionar ao carrinho
          </button>
        </ProductDetails>
      </ProductContainer> 
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async() => {
  return {
    paths: [
      {params: {id: 'prod_QdFtpAh6HdPPjY'} }
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params ? params.id : '';

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price 

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        productPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1
  }
}
