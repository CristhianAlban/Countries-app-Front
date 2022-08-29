import React from "react"
import Nav from "../Nav/Nav"
import { connect } from "react-redux"
import { Component } from "react"
import { getCountryDetail } from "../../redux/actions"
import styles from './CountryDetail.module.css'

export class CountryDetail extends Component{
    componentDidMount(){
        const id=this.props.match.params.id
        this.props.getCountryDetail(id)
    }

    render(){
        const country = this.props.countryDetail[0]
        const activities = country && country.activities
        
        return(
        <div className={styles.box}>
            <Nav/>
            <div className={styles.country}>
                <h1>{country && country.name}</h1>
                <div className={styles.div1}>
                <div className={styles.left}>
                  <img src={country && country.flag} alt=''></img>
                
                
                <p>Continente: {country && country.continent}
                <br/>Código de país: {country && country.id} 
                <br/>Capital: {country && country.capital}
                <br/>Subregión: {country && country.subregion}
                <br/>Área: {country && country.area} Km<sup>2</sup>
                <br/>Población: {country && country.population}
                </p>
                </div>
                <div className={styles.acts}>
                    <h2>Actividades turisticas</h2>
                    <div>
                        {
                            activities && activities.map(e=>{
                                return(
                                    <div className={styles.act} key={e.id}>
                                        <h3>{e.name}</h3>
                                        <p>Dificultad: {e.Difficulty}
                                        <br/>Duración : {e.Duration}
                                        <br/>Temporada : {e.Season}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                </div>
            </div>

        </div>
        )
    }

}
export const mapStateToProps = (state)=>{
    return {
        countryDetail:state.countryDetail
        
    }
}
export const mapDispatchToProps= (dispatch)=>{
    return{
        getCountryDetail: id => dispatch(getCountryDetail(id))
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail)



