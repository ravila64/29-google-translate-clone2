// this is one reducer 
import { useReducer } from "react"
import { AUTO_LANGUAGE } from "../constants.ts"
import { type Action, type FromLanguage, type Language, type State } from "../types/languages.d"

// 1. create a initialState
const initialState: State = {
  fromLanguage: 'auto', 
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
      return { ...state, 
        fromLanguage: state.toLanguage, 
        toLanguage: state.fromLanguage 
      }
    }
  
    if (type === 'SET_FROM_LANGUAGE') {
      if(state.fromLanguage===action.payload) return state
      const loading = state.fromText !==''
      return { 
        ...state, 
        fromLanguage: action.payload,
        result:'',
        loading
      }
    }
  
    if (type === 'SET_TO_LANGUAGE') {
      if(state.toLanguage===action.payload) return state
      const loading = state.fromText !==''
      return { 
        ...state, 
        fromText: action.payload,
        result:'',
        loading
      }
    }
  
    if (type === 'SET_FROM_TEXT') {
      const loading = action.payload !==''
      return { 
        ...state, 
        loading, 
        FormText: action.payload,
        result:''
      }
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