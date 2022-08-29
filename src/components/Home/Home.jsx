import React, {Component} from "react"
import {connect} from 'react-redux'
import Nav from "../Nav/Nav"
import { getCountries, calcPages, onPageChanged } from "../../redux/actions"
import DataBox from "../DataBox/DataBox"
import SelectBar from "../SelectBar/SelectBar"
import SearchBar from "../SearchBar/SearchBar"
import styles from './Home.module.css'

 export class Home extends Component {
   
    
    componentDidMount(){
        this.props.getCountries();
      }
    componentDidUpdate(){
        this.props.calcPages()
    }
    render(){
        
        return(
        <div className={styles.box}>
            <Nav />
            <SearchBar/>
            <SelectBar/>
            <DataBox/>            
        </div>)
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
        getCountries: ()=> dispatch(getCountries()),
        calcPages:()=>dispatch(calcPages()),
        onPageChanged:(data)=>dispatch(onPageChanged(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)