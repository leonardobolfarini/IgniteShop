import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import logoImg from '../assets/Logo.svg'
import Image from 'next/image'
import { CartButton, Container, Header } from "../styles/pages/app";
import { Handbag } from "@phosphor-icons/react/dist/ssr";
import * as Dialog from '@radix-ui/react-dialog';
import { CartModal } from "../components/cartmodal";
import { CartProvider } from "use-shopping-cart";

globalStyles()
const stripeKey = process.env.STRIPE_PUBLIC_KEY

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      currency="BRL"
      stripe={'pk_test_51Plz7XKDLlS65FF0vWEg7NZxWEfk5c8qlH40bd1dTg1soXLXIRdfbw72suiTxsmy1nwbG81K4tcNBL8Bn4EkcSgg000BJY6Dtg'}
      successUrl={`http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`}
      cancelUrl={`http://localhost:3000/`}
      shouldPersist
    >
      <Container>
        <Dialog.Root>
          <Header>
            <Image src={logoImg} alt="" />
              <Dialog.Trigger asChild>
                <CartButton>
                  <Handbag height={24} width={24} weight="bold" color="#8d8d89" />
                </CartButton>
              </Dialog.Trigger>
          </Header>
          <CartModal />
        </Dialog.Root>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
