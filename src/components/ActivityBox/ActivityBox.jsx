import React, {Component} from "react"
import {connect} from 'react-redux'
import CreateActivity from "../CreateActivity/CreateActivity"
import { getCountries } from '../../redux/actions';


export class ActivityBox extends Component {
    componentDidMount(){
        this.props.getCountries();
      }

    
    render(){
       
        return(
            <div>
                <CreateActivity/>
            </div>
       )
    }
}




export const mapStateToProps = (state)=>{
    return {
    }
}
export const mapDispatchToProps= (dispatch)=>{
    return{
        getCountries:()=>dispatch(getCountries())
      
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ActivityBox)