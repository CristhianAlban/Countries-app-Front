import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

export default class Nav extends Component {
    render() {
        return (
            <div className={styles.box}>
              <Link to="/countries">
              <input className={styles.btn} type="button" value="HOME"></input>
              </Link>
              <Link to="/activities/create">
              <input className={styles.btn} type="button" value="CREATE ACTIVITY"></input>
              </Link>
            </div>
        )
    }
}