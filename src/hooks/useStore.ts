// this is one reducer 
import { useReducer } from "react"
import { type State, type Action } from "../types/languages.d"
import { type FromLanguage, type Language } from "../types/languages.d"
import { AUTO_LANGUAGE } from "../constants.ts"

// 1. create a initialState
const initialState: State = {
  fromLanguage: 'es',   // quite 'auto'
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}
  
  //2. create reducer
  function reducer(state: State, action: Action) {
    const { type } = action
    if (type === 'INTERCHANGE_LANGUAGES') {
      // logica del estado dentro del reducer
      // lo evitamos en los componentes
      if(state.fromLanguage===AUTO_LANGUAGE) return state

      return { ...state, fromLanguage: state.toLanguage, toLanguage: state.fromLanguage }
    }
  
    if (type === 'SET_FROM_LANGUAGE') {
      return { ...state, fromLanguage: action.payload }
    }
  
    if (type === 'SET_TO_LANGUAGE') {
      return { ...state, fromText: action.payload }
    }
  
    if (type === 'SET_FROM_TEXT') {
      return { ...state, loading: false, result: action.payload }
    }
  
    if (type === 'SET_RESULT') {
      return { ...state, loading: false, result: action.payload }
    }
  
    return state
  }

  // 3  usar el estado useReducer. hook
  export function useStore(){
  const [{
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading 
    }, dispatch] = useReducer(reducer, initialState)
    
    //console.log({fromLanguage}) // utilizo console-ninja para ver cambios en variables

    const interchangeLanguages =()=>{
        dispatch({type:'INTERCHANGE_LANGUAGES'})
    }
    const setFromLanguage=(payload:FromLanguage)=>{
        dispatch({type:'SET_FROM_LANGUAGE', payload})
    }
    const setToLanguage=(payload:Language)=>{
        dispatch({type:'SET_TO_LANGUAGE', payload})
    }
    const setFromText=(payload:string)=>{
        dispatch({type:'SET_FROM_TEXT', payload})
    }
    const setResult=(payload:string)=>{
        dispatch({type:'SET_RESULT', payload})
    }

   return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
   }
 }