import React, {Component} from "react"
import {connect} from 'react-redux'
import { getDataApi} from "../../redux/actions"
import { Link } from "react-router-dom"
import styles from './Landing.module.css'

export class Landing extends Component {
    componentDidMount(){
        this.props.getDataApi();
      }

    render(){
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
}
export const mapStateToProps = (state)=>{
    return {
        dataBaseStatus:state.dataBaseStatus,
    }
}
export const mapDispatchToProps= (dispatch)=>{
    return{
        getDataApi: ()=> dispatch(getDataApi()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing)