import React, {useState, useEffect,} from 'react'
import {useSelector} from 'react-redux';
import Nav from '../Nav/Nav';
import styles from './CreateActivity.module.css'
import axios from "axios"



function validateInput(input) {
    let errors={}
    let nombre= input.nombre  //.trim();
    let hora = input.duracion.split(" ")
  
  
    if (!nombre) {
      errors.nombre = 'El nombre es requerido';
    } else if (nombre.length<3 || nombre.length>30 || !/^[a-zA-Z\s]*$/.test(nombre)|| nombre.startsWith(" ")) { // *
      errors.nombre = 'el nombre es invalido, debe tener entre 3 y 30 caracteres no numericos';
    }
    if(!input.duracion){
      errors.duracion = 'la duracion es requerida';
    } else if(!input.duracion.includes("hora") || !/^[0-9]+$/.test(hora[0])){ // /^[0-9]+$/
      errors.duracion ="debe iniciar por un numero y tener la palabra \"hora\""
    }
    if(input.dificultad===null){
      errors.dificultad= "debe selecionarse una dificultad"
    }
    if(input.temporada===null){
      errors.temporada= "debe selecionarse una temporada"
    }
    if(!input.countries.length){
      errors.countries= "debes elegir al menos un pais"
    }
    
    return errors;
  };

function validateForm (input, errors){
  let vErrors= false
  let vInput= false
  let result= false
  let{nombre,dificultad,temporada,duracion,countries}=input
  if(nombre && dificultad && temporada && duracion && countries.length) vInput= true;
  if(!errors.nombre && !errors.dificultad && !errors.temporada && !errors.duracion && !errors.countries) vErrors=true  
  if(vErrors && vInput) result= true
  return result
}

export default function CreateActivity () { 

  const [errors, setErrors]= useState({}); 
  const[input, setInput]= useState({
    nombre:"",
    dificultad: "",
    temporada: "",
    duracion:"",
    countries:[]
  })
  const [country, setCountry]= useState({
    country:""
  })
  const[contriesBox, setCountriesBox]= useState([])
  const countries= useSelector(store=>store.dbCoountries)
  const [renderAdd, setRenderAdd]= useState([])

  useEffect(()=>{
    setRenderAdd(input.countries.map(i=>{
      let filtro= countries.filter(e=>e.id===i)
      return filtro[0]
    }))
    
  },[input.countries,])

  const handleInputChange= function (e){
   setInput({...input,[e.target.name]: e.target.value});   
   setErrors(validateInput({...input,[e.target.name]:e.target.value}));
  }
  const handleChangeCountry = (event)=> {
    setCountry({ country: event.target.value });
  }  
  useEffect(()=>{
    const handleSubmitCountry =()=>{
      if(country.country !== ""){
        let countryName=country.country.toLowerCase().split('');
          countryName[0]=countryName[0].toUpperCase();
          countryName=countryName.join('');
        let result = countries.filter(e=>{
            return e.name.includes(countryName)
        });
        setCountriesBox(result);        
    }
    }
    handleSubmitCountry()
  },[country,]);

  const add = (e)=>{
    if(input.countries.includes(e.target.name)){
      window.alert("el pais ya fue añadido")
    }else{
    setInput({...input, countries: [...input.countries,e.target.name]})
    setErrors(validateInput({...input,countries:[e.target.value]}))
    }
  }
  const deleteAdd = (e)=>{
    setRenderAdd(renderAdd.filter(i=> i.id !==e.target.name))
    setInput({...input, countries: input.countries.filter(i=> i !==e.target.name)}) /// [...input.countries,e.target.name]
    setErrors(validateInput({...input,countries: input.countries.filter(i=> i !==e.target.name)}))
  }
  
  
  
  function postActivity (obj){
    axios.post('/activities', obj)       
  }

  const handleSubmit = e => {
    e.preventDefault()
    if(validateForm(input,errors)){
      postActivity(input);
      setInput({
            nombre:"",
            dificultad:"",
            temporada:"",
            duracion:"",
            countries:[]
          });
      setCountry({
        country:""
      })
      setCountriesBox([])
    }else window.alert("formulario incompleto")    
  }
  

  

 return (
  <div className={styles.box}>
    <Nav/>
    
    <form  onSubmit={handleSubmit}>
     <div className={styles.forma}>
       <label>Nombre:</label>
       <input 
         className={errors.nombre && styles.danger}
         type="text" 
         name="nombre" 
         value={input.nombre}
         onChange={handleInputChange}
       />
       {errors.nombre && (
         <p className={styles.danger}>{errors.nombre}</p>
       )}
       <br/>
       <label>Dificultad:</label>
       <select name='dificultad'value={input.dificultad}  onChange={handleInputChange}>
         <option value={""}>selecciona el nivel de dificultad</option>
         <option value={1}>1</option>
         <option value={2}>2</option>
         <option value={3}>3</option>
         <option value={4}>4</option>
         <option value={5}>5</option>
       </select>
       {errors.dificultad && (
         <p className={styles.danger}>{errors.dificultad}</p>
       )} 
       <br/>
       <label>Duración:</label>
       <input 
         className={errors.duracion && styles.danger}
         type="num" 
         name="duracion" 
         value={input.duracion}
         onChange={handleInputChange}
       />
       {errors.duracion && (
         <p className={styles.danger}>{errors.duracion}</p>
       )}
       <br/>
       <label>Temporada:</label>
       <select name='temporada' value={input.temporada} onChange={handleInputChange}>
         <option value={""}>selecciona la temporada</option>
         <option value={'Todas'}>Todas</option>
         <option value={'Verano'}>Verano</option>
         <option value={'Otoño'}>Otoño</option>
         <option value={'Invierno'}>Invierno</option>
         <option value={'Primavera'}>Primavera</option>
       </select>
       {errors.temporada && (
         <p className={styles.danger}>{errors.temporada}</p>
       )} 
       
       <br/>
       <div className={styles.div1}>
       <p>Paises en los cuales se practica</p>
       {errors.countries && (
         <p className={styles.danger}>{errors.countries}</p>
       )} 
       <span className={styles.rend}>
        {
          renderAdd && renderAdd.map(e=>{
            return(
              <div key={e.id} className={styles.result}>
              <p>{e.name}</p>
              <input type="button"  name={e.id} value="X" onClick={deleteAdd}/>
              </div>
            )
          })         

        }
       </span>
      
          <div>
            <label className="label" htmlFor="name">Country: </label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              value={country.country}
              onChange={handleChangeCountry}
            />
            
          </div>        
      
       <br/>
       <div>
          {
            contriesBox && contriesBox.map((e)=>{
              return(
                <div key={e.id} className={styles.result}>
                  <p>{e.name}</p>                  
                  <input type="button" name={e.id} value="add" onClick={add}/>
                </div>
              )
            })
          }
       </div>
       </div>
       <input type="submit" name="submit"/>
     </div>
   </form>
   
  </div>
 )
}


