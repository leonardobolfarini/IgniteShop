import { styled } from "@stitches/react";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$lg',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',
    marginTop: '5rem',

    '&:hover': {
      color: '$green300'
    }
  }
})  

export const ImagesContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  position: 'relative',
})

export const ImageContainer = styled('div', {
  maxWidth: 150,
  maxHeight: 150,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '50%',
  padding: '1.5rem',
  marginTop: '4rem',
  position: 'relative',
  marginLeft: '-40px',
  transition: 'transform 0.3s ease-in-out',

  display: 'flex', 
  alignItems: 'center',
  justifyContent: 'center',

  border: '3px solid black',

  img: {
    objectFit: 'cover',
  }
})