import { GetServerSideProps } from "next";
import { ImageContainer, ImagesContainer, SuccessContainer } from "../styles/pages/success";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";

interface SuccessProps {
  customerName: string,
  products: Stripe.Product[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const imagesUrls = products.map((product) => product.images[0] || "");
  const names = products.map((product) => product.name);
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite shop</title>

        <meta name="robots" content="noindex"/>
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada!</h1>

        <ImagesContainer>
          {imagesUrls.length > 0 ? (
            imagesUrls.map((imageUrl, index) => (
              <ImageContainer key={index}>
                <Image src={imageUrl} width={120} height={110} alt={`Imagem de ${names[index]}`} />
              </ImageContainer>
            ))
          ) : (
            <h1>Nada</h1>
          )}
        </ImagesContainer>

        <p>Uhuul <strong>{customerName}</strong>, sua compra de {names.length} camiseta(s) já está a caminho da sua casa.</p>

        <a href="/">Voltar ao catálogo</a>
      </SuccessContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })
  
  const customerName = session.customer_details?.name
  const products = session.line_items?.data.map((item) => item.price?.product);

  return {
    props: {
      customerName,
      products: products || [],
    }
  }
}
