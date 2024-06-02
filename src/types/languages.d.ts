// this file is called types.d.ts, in directory types
import {type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES } from '../constants'

// keyof = de este objeto quedate con las keys, example en,es,de,auto
// typeof = tomando todo el contrato de ese objeto

export type Language= keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = keyof typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

// tipos types.d=definition
export interface State {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type Action = 
  | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage}
  | { type: 'INTERCHANGE_LANGUAGES'}
  | { type: 'SET_TO_LANGUAGE', payload: Language}
  | { type: 'SET_FROM_TEXT', payload: string}
  | { type: 'SET_RESULT', payload: string}

  export enum SectionType{
    From='from',
    To='to'
  }
