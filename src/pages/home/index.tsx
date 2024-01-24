import { FormEvent, useEffect, useState } from 'react'
import styles from './home.module.css'
import { BiSearch } from 'react-icons/bi'
import { Link } from 'react-router-dom'

interface CoinPops{

    name: string;
    delta_24h:string;
    price: string;
    symbol: string;
    volume_24h:string;
    market_cap:string;
    formatedPrice:string;
    formatedMarket:string; 

}

interface DataProps{
    coins: CoinPops[];
}

export function Home(){
    const [coins, setCoins] = useState<CoinPops[]>([])
    const [inputValue, setInputValue] = useState ("")
    useEffect(()=>{
        function getData(){
            fetch('https://sujeitoprogramador.com/api-cripto/?key=d8fefd7283061911')
            .then(response => response.json())
            .then((data: DataProps)=>{
                let coinsData = data.coins.slice(0, 15);

                let price = Intl.NumberFormat("pt-BR",{
                    style: 'currency',
                    currency: 'BRL'
                })

                const formatResult = coinsData.map((item)=>{
                    const formated ={
                        ...item,
                        formatedPrice: price.format(Number(item.price)), 
                        formatedMarket: price.format(Number(item.market_cap)),
                    }
                return formated
                })

                
                setCoins(formatResult);
            })
        }
        getData();
    },[])

    function handleSearch(e: FormEvent){
        e.preventDefault();
        alert("Teste")
    }

    return(
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSearch}>
                <input placeholder='   Digite o nome da moeda necessaria' value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
                <button type='submit'>
                    <BiSearch size={30} color='#FFF'/>
                </button>
            </form>

        <table>
            <thead>
                <tr>
                    <th scope='col'>Moeda</th>
                    <th scope='col'>Valor de Mercado</th>
                    <th scope='col'>Preço</th>
                    <th scope='col'>Volume</th>
                </tr>
            </thead>
            <tbody id='tbody'>
               {coins.map( coin =>(
               <tr key={coin.name} className={styles.tr}>
                <td className={styles.tdLabel} data-label='Moeda'>
                    <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                        <span>{coin.name}</span> | {coin.symbol}
                    </Link>
                </td>
                <td className={styles.tdLabel} data-label='Mercado'>
                    {coin.formatedMarket}
                </td>
                <td className={styles.tdLabel} data-label='Preço'>
                    {coin.formatedPrice}
                </td>
                <td className={ Number(coin?.delta_24h) >= 0 ? styles.tdProfit : styles.tdLoss} data-label='Volume'>
                    <span>{coin.delta_24h}</span>
                </td>
               </tr> 
               ))}
            </tbody>
        </table>
        </main>
    )
}