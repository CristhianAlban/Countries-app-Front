import {GET_DATA_API, GET_COUNTRIES, ON_PAGE_CHANGED, FILTER_CONTINENT, CALC_PAGES, ORDER, GET_SEARCH_COUNTRY, GET_COUNTRY_DETAIL, FILTER_ACTIVITY} from '../actions/index.js'
import { pageLimit } from '../../components/Pagination/Pagination.jsx';
const initialState = {
   
    dbCoountries:[],
    filterByContinent:[],
    allCountries: [],
    countryDetail: [],
    currentCountries: [],
    currentPage: 1, 
    totalPages: null,
    dataBaseStatus:""
  };
 

 function rootReducer(state = initialState, action) {
    if(action.type===GET_DATA_API){
      return{
        ...state,
        dataBaseStatus: action.payload
      }
    }  
    if (action.type===CALC_PAGES){
      return{
        ...state,
        totalPages: (Math.floor(state.allCountries.length /pageLimit))+1        
      }
      
    }
    if (action.type === GET_COUNTRIES) {
        return {
          ...state,
          dbCoountries: action.payload,
          allCountries: action.payload,
          filterByContinent: action.payload         
        };
     }
    if (action.type === ON_PAGE_CHANGED){
      const { allCountries } = state;      
      const { currentPage, pageLimit } = action.payload;      
      const pageRender = currentPage===1 ? 9 :pageLimit;
      const offset = currentPage===1 ? (currentPage - 1) * pageRender: ((currentPage - 1) * pageRender)-1;
      const currentCountries = allCountries.slice(offset, offset + pageRender);      
      return {
        ...state,
        currentCountries: currentCountries,
        currentPage: currentPage,         
      }
    }
    if (action.type === FILTER_CONTINENT){
      if(action.payload==="All"){
        return{
          ...state,
        allCountries: state.dbCoountries,
        filterByContinent: state.dbCoountries

        }
      }else return{
        ...state,
        allCountries: state.dbCoountries.filter(e => e.continent === action.payload),
        filterByContinent: state.dbCoountries.filter(e => e.continent === action.payload)
      }
    }
    if(action.type===FILTER_ACTIVITY){
      return{
        ...state,
        allCountries: state.filterByContinent.filter(e => {
          let arr=e.activities.map(e=>e.name)
          return arr.includes(action.payload)
        }),
      }
    }
    if(action.type===ORDER){
      const customSort= (arr,atribute)=>{
        return arr.sort((a, b) =>{
          if (a[atribute] > b[atribute]) {
            return 1;
          }
          if (a[atribute] < b[atribute]) {
            return -1;
          }
          return 0;
        })        
      }
      const arrOrderByName=customSort(state.allCountries.map(e=>e),'name')
      const arrOrderByPopulation=customSort(state.allCountries.map(e=>{
        return { ...e, population: Number(e.population)}
      }),'population')

      if(action.payload==='ASC'){
        return{
          ...state,
          allCountries: arrOrderByName
        }
      }else if(action.payload==='DESC'){
        return{
          ...state,
          allCountries: arrOrderByName.reverse()
        }
      }else if(action.payload==='Menor poblacion'){
        return{
          ...state,
          allCountries: arrOrderByPopulation
        }
      }else if(action.payload==='Mayor poblacion'){
        return{
          ...state,
          allCountries: arrOrderByPopulation.reverse()
        }
      }else return{
        ...state
      }
    }
    
    if(action.type===GET_SEARCH_COUNTRY){
      return {
        ...state,
        allCountries: action.payload
      }
    }
    if(action.type===GET_COUNTRY_DETAIL){
      return{
        ...state,
        countryDetail: action.payload
      }
    }
    
  
    return state;
  }
  
  export default rootReducer;