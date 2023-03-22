import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCurrency from '../hooks/useSelectCurrency'
import { currencies } from '../data/currency'
const InputSubmit = styled.input `
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition:background-color .3 ease;
    margin-top: 30px;

    &::hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Form = ({setCurrencies}) => {

  const [error, setError] = useState(false)

  const [ cryptos, setCryptos ] = useState([])

  const [ currency, SelectCurrency ] = useSelectCurrency('Choose your currency', currencies)
  const [ crypto, SelectCrypto ] = useSelectCurrency('Choose your Crypto', cryptos)
  
  useEffect(() => {
    const queryAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
      const response =await fetch(url)
      const result = await response.json()

      const arrayCryptos = result.Data.map(crypto => {

        const object = {
          id : crypto.CoinInfo.Name,
          name : crypto.CoinInfo.FullName,
        }
        return object

      })

      setCryptos(arrayCryptos)
    }
    queryAPI();
  },[])

  const handleSubmit = e => {
    e.preventDefault()

    if ([currency, crypto].includes('')){
      setError(true)
    }

    setError(false)
    setCurrencies({
      currency, crypto
    })
    
  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
        onSubmit = {handleSubmit}
      >
          <SelectCurrency/>
          <SelectCrypto/>
          <InputSubmit type="submit" value="Quote" />
      </form>
    </>
    
  )
}

export default Form
