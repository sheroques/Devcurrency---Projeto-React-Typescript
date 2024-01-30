import styles from './notfound.module.css'
import { Link } from 'react-router-dom'
export function NotFound(){
    return(
        <div className={styles.container}>
            <h1>Error 404 a pagina nao existe</h1>
            <Link to= "/">
            Acessar cripto moedas
            </Link>
        </div>
    )
}