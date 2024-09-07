import * as Dialog from '@radix-ui/react-dialog'
import { CartContent, CartTitle, CheckoutInfos, CloseButton, ImageContainer, ProductCard, ProductDetails } from "../styles/pages/components/cartmodal";
import { X } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useShoppingCart } from 'use-shopping-cart';
import { CartEntry } from 'use-shopping-cart/core';
import axios from 'axios';

export function CartModal(){
  const { cartDetails, removeItem, cartCount, totalPrice } = useShoppingCart()
  if (!cartDetails) {
    return <h1>Sem produtos.</h1>
  }

  const formattedData = Object.entries(cartDetails).map(([key, value]: [string, CartEntry]) => {
    return{
      productID: key,
      ...value,
    }
  })

  const isCartWithoutItens = () => {
    if (cartCount === undefined || cartCount <= 0) {
      return true
    }else{
      return false
    }
  }
  async function handleRedirectCheckout(){
    try{
      const response = await axios.post('/api/checkout', {
        items: formattedData
      })

      const checkoutUrl = response.data.checkoutUrl
      window.location.href = checkoutUrl
    } catch (error){
      console.log(error)
    }
  }

  return(
    <Dialog.Portal>
      <CartContent>
        <CloseButton>
          <X height={24} width={24} weight="bold" color="#8d8d89" />
        </CloseButton>
        <CartTitle>
          Sacola de compras
        </CartTitle>
        {formattedData.map((product) => {
          return(
            <ProductCard key={product.productID}>
              <ImageContainer>
                <Image src={product.image ? product.image : ''} width={94} height={94} alt=''/>
              </ImageContainer>
              <ProductDetails>
                <h1>{product.name}</h1>
                <span>
                  {(product.price).toLocaleString('BRL',
                    {
                      style: 'currency',
                      currency: 'BRL'
                    }
                  )}
                </span>
                <button onClick={() => removeItem(product.id)}>Remover</button>
              </ProductDetails>
            </ProductCard>
          )
        })}
        <CheckoutInfos>
          <h1>Quantidade <span>{cartCount} item(s)</span></h1>
          <h2>Valor total <span>
            {(totalPrice)?.toLocaleString('BRL',
              {
                style: 'currency',
                currency: 'BRL'
              }
            )}
          </span></h2>
          <button 
            type='submit'
            onClick={handleRedirectCheckout}
            disabled={isCartWithoutItens()}
          >
              Finalizar compra
          </button>
        </CheckoutInfos>
      </CartContent>
    </Dialog.Portal>
  )
}