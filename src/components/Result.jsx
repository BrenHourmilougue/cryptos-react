import styled from "@emotion/styled"

const ResultContainer = styled.div `
    color: #FFF;
    font-family: 'Lato',sans-serif;
    font-size:24px;
    display:flex;
    align-items:center;
    gap:1rem;
    margi-top:30px;
    span{
        font-weight:700;
    }
`
const Img = styled.img`
    display:block;
    width:120px;
    
`

const Text = styled.p `
    font-size:18px;
    span{
        font-weight:700;
    }
`

const Price = styled.p `
    
`

const Result = ({quote}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = quote

  return (
    <ResultContainer>
        <Img src={`https://cryptocompare.com/${IMAGEURL}`} />
        <div>
            <Price>Price: <span>{PRICE}</span></Price>
            <Text>Day's highest: <span>{HIGHDAY}</span></Text>
            <Text>Day's lowest: <span>{LOWDAY}</span></Text>
            <Text>Day's change percentage: <span>{CHANGEPCT24HOUR}</span></Text>
            <Text>Last update: <span>{LASTUPDATE}</span></Text>
        </div>
    </ResultContainer>
  )
}

export default Result
