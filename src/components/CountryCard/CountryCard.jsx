import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css'


const CountryCard = props => {
  const link=`/country/${props.id}`
  return (
    <div className={styles.box}>
      <div className={styles.card}>
        <div >
          <img className={styles.flag} src={props.flag} alt=''></img>
        </div>
        <div className={styles.countryTextBox}>
          <span>{props.name}</span>
          <br/>
          <span>{props.continent}</span>
        </div>
        <form>
            <Link to={link}>
                 <input className={styles.btn} type="button" value="Ver más..."></input>
            </Link>
        </form>

      </div>
    </div>
  )
}


export default CountryCard;