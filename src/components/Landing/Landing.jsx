import React from "react"
import { Link } from "react-router-dom"
import styles from './Landing.module.css'

export default function Landing () {
    return (
        <div className={styles.box}>
            <h1 className={styles.title}>Bienvenidos a Henry countries</h1>         
            <form>
            <Link to="/countries">
                 <input className={styles.btn} type="button" value="CONTINUAR"></input>
            </Link>
            </form>
        </div>
    )
    }