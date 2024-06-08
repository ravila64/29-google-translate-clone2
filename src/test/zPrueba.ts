import { VOICE_FOR_LANGUAGE } from '../constants.ts';
export const prueba=()=>{
    const keys = Object.keys(VOICE_FOR_LANGUAGE)
    const items = keys.length
    for (let index = 0; index < items; index++){
       console.log(keys[index]);
    }
}
prueba()
