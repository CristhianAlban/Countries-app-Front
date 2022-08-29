export const GET_COUNTRIES ="GET_COUNTRIES"
export const ON_PAGE_CHANGED ="ON_PAGE_CHANGED"
export const FILTER_CONTINENT="FILTER_CONTINENT"
export const CALC_PAGES="CALC_PAGES"
export const ORDER="ORDER"
export const GET_SEARCH_COUNTRY="GET_SEARCH_COUNTRY"
export const GET_COUNTRY_DETAIL="GET_COUNTRY_DETAIL"
export const FILTER_ACTIVITY="FILTER_ACTIVITY"
const axios = require('axios');



export function getCountries() {
    return async function(dispatch) {
      return axios("/countries")
        .then(response => {
          dispatch({ type: GET_COUNTRIES, payload: response.data });
        });
    };
}
export  function onPageChanged(data) {
  return {type: ON_PAGE_CHANGED, payload: data }
}
export function filterContinent(data) {
    return {type:FILTER_CONTINENT, payload: data}
}
export function filterActivity(data) {
  return {type:FILTER_ACTIVITY, payload:data}
}
export function calcPages(){
  return {type:CALC_PAGES}
}
export function order(data){
  return {type:ORDER, payload:data}  
}
export function getSearchCountry(name){
  return async function(dispatch) {
    return axios(`/countries?name=${name}`)
      .then(response => {
        dispatch({ type:GET_SEARCH_COUNTRY, payload:response.data});
      });
  };
}
export function getCountryDetail(id){
  return async function(dispatch) {
    return axios(`/countries/${id}`)
      .then(response => {
        dispatch({ type:GET_COUNTRY_DETAIL, payload:response.data});
      });
  };

}


