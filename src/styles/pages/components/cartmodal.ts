import { styled } from "@stitches/react";
import { DialogClose, DialogContent, DialogTitle } from "@radix-ui/react-dialog";

export const CartContent = styled(DialogContent, {
  width: '45rem',
  height: '100vh',
  position: 'fixed',


  left: '82%',
  top: '50%',

  transform: 'translate(-50%, -50%)',

  background: '$gray800',
  padding: '1.5rem 1.5rem 3rem 3rem',
})

export const CartTitle = styled(DialogTitle, {
  color: '$gray100',
  fontSize: '$lg',
  fontWeight: 'bold',
  marginTop: '1.5rem'
})

export const CloseButton = styled(DialogClose, {
  marginLeft: '92%',
  marginTop: '7px',

  background: 'transparent',
  border: 0,
  cursor: 'pointer',
})

export const ProductCard = styled('div', {
  display: 'grid',
  gridTemplateColumns: '100px 1fr',
  columnGap: '1.25rem',
  alignItems: 'stretch',
  marginTop: '2rem'
})

export const ImageContainer = styled('div', {
  maxHeight: '93px',
  maxWidth: '100px',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  img: {
    objectFit: 'cover'
  }
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  h1: {
    fontSize: '$md',
    fontWeight: 'normal',
    lineHeight: 1.6,
    color: '$gray300'
  },

  span: {
    fontSize: '$md',
    lineHeight: 1.6,
    fontWeight: 'bold',
    color: '$gray100',
  },

  button: {
    background: 'transparent',
    border: 0,
    marginRight: 'auto',
    marginTop: 6,

    color: '$green500',
    fontWeight: 'bold',
    lineHeight: 1.6,
    fontSize: '1rem',

    cursor: 'pointer',
  }
})

export const CheckoutInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '1rem',
  padding: '1rem',

  h1: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1rem',
    fontWeight: 'normal',
    color: '$gray100',

    span: {
      fontSize: '$md',
      color: '$gray300',
    }
  },

  h2: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 7,
    fontSize: '$md',
    color: '$gray100',

    span: {
      color: '$gray100',
      fontSize: '$xl',
    }
  },

  button: {
    marginTop: '3rem',
    height: 69,
    background: '$green500',
    color: '$white',
    fontWeight: 'bold',
    fontSize: '$md',
    borderRadius: 8,
    border: 0,
    cursor: 'pointer',

    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300'
    }
  }
})