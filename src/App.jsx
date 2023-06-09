import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Form from './components/Form'
import Result from './components/Result'
import Spinner from './components/Spinner'
import ImgCrypto from './img/imagen-criptos.png'

const Container = styled.div `
  max-width: 900px;
  margin: 0 auto;
  width:90%;
  @media (min-width:992px){
    display:grid;
    grid-template-columns: repeat (2, 1fr);
    column-gap: 2rem;
  }
`

const Heading = styled.h1 `
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight:700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &after::{
    content: '';
    width:100px;
    height:6px;
    background-color: #66A2FE;
    display: block;
    margin:10px auto 0 auto;

  }
`

const Image = styled.img `
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {

  const [ currencies, setCurrencies ] = useState({})
  const [ quote, setQuote ] = useState({})
  const [ loading, setLoading ] = useState(false)
  
  useEffect(() => {
    if(Object.keys(currencies).length > 0){
      const quoteCrypto = async () => {
        setLoading(true)
        const {currency, crypto} = currencies
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${currency}`

        const response = await fetch(url)
        const result = await response.json()

        setQuote(result.DISPLAY[crypto][currency])
        setLoading(false)
      }
      quoteCrypto()
    }
  }, [currencies])
  
  return (
    <Container>
      <Image 
        src = {ImgCrypto}
        alt = "Crypto icons"
      />
      <div>
        <Heading>Crypto quote</Heading>
        <Form
          setCurrencies = {setCurrencies}
        />
        {loading && <Spinner/>}
        {quote.PRICE && <Result quote = {quote} />}
      </div>      
    </Container>
    
  )
}

export default App
