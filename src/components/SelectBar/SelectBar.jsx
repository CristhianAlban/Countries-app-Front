import React, {useState, useEffect,} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { filterContinent, onPageChanged, order, filterActivity} from '../../redux/actions';
import { pageLimit } from '../Pagination/Pagination';



export  const Selectbar = () => {

    const [state, setState]=useState({
        continent:'',
        activity:'',
        order:''
    });
    const countries= useSelector(store=>store.dbCoountries)
    const ListenState= useSelector(store=>store.allCountries)    
    const continents= [...(new Set(countries.map(e=>e.continent)))]
    const activities= [...(new Set(countries.map(e=>e.activities).flat().map(e=>e.name)))]
   

    const eventHandler = (e)=>{
        setState({...state,[e.target.name]: e.target.value});
    }
    const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(filterContinent(state.continent))
    },[state.continent,dispatch])

    useEffect(()=>{        
        dispatch(order(state.order))
    },[state.order,dispatch])
    useEffect(()=>{
        dispatch(filterActivity(state.activity))
    },[state.activity,dispatch])

    useEffect(()=>{    
         const paginationData = {
             currentPage:1,
             pageLimit: pageLimit,
           };
        dispatch(onPageChanged(paginationData));
    },[ListenState,dispatch])
    
        return (
            <div>
                <form>
                    <select name='continent' defaultValue={1} onChange={eventHandler}>
                        <option disabled value={1}>Seleccione un continente</option>
                        <option value={'All'}>All</option>
                        {
                            continents.map((e,i)=>(
                                <option key={i} value={e}>{e}</option>                                
                            ))
                        }
                    </select>
                    <select name='activity' defaultValue={1} onChange={eventHandler}>
                        <option disabled value={1}>Seleccione una actividad turistica</option>
                        {
                             activities.map((e,i)=>(
                                <option key={i} value={e}>{e}</option>                                
                            ))
                        }
                    </select>
                    <select name='order' defaultValue={1} onChange={eventHandler}>
                        <option disabled value={1}>Seleccione un orden</option>
                        <option value={'ASC'}>A - Z</option>
                        <option value={'DESC'}>Z - A</option>
                        <option value={'Mayor poblacion'}>Mayor poblacion</option>
                        <option value={'Menor poblacion'}>Menor poblacion</option>                        
                    </select>
                </form>
              
            </div>
        )
    }



export default Selectbar