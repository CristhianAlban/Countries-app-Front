import React, {Component} from "react"
import {connect} from 'react-redux'
import CountryCard from "../CountryCard/CountryCard"
import Pagination from "../Pagination/Pagination"
import styles from './DataBox.module.css'

export class DataBox extends Component {

    
    render(){
        const { allCountries, currentCountries, currentPage, totalPages } = this.props;
        const totalCountries = allCountries[0]&&allCountries[0].name ? allCountries.length : 0
    
        if (totalCountries === 0) return (
            <div className={styles.box}>
                <h2>
                    {allCountries[0] && allCountries[0].msg}
                </h2>
            </div>
        );
        return(
            <div className={styles.box}>
                <div className={styles.text}>
                    <h2>
                    <strong>{totalCountries}</strong> Countries
                    </h2>
                    { currentPage && (
                        <span>
                            Page <span>{ currentPage }</span> / <span>{ totalPages }</span>
                        </span>
                    ) }
               </div>
               <div>
                 <Pagination />
               </div>
               <div className={styles.countrysBox}>
               { currentCountries.map((e,i)=>{
                        return(
                            <CountryCard
                            key={i}
                            name={e.name}
                            flag={e.flag}
                            continent={e.continent}
                            id={e.id}
                             />
                        )
                    }) }
               </div>
            </div>
       )
    }
}




export const mapStateToProps = (state)=>{
    return {
        allCountries:state.allCountries,
        currentCountries:state.currentCountries,
        currentPage:state.currentPage,
        totalPages:state.totalPages
    }
}
export const mapDispatchToProps= (dispatch)=>{
    return{
      
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataBox)