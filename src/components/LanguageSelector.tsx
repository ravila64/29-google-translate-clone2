import Form from 'react-bootstrap/Form';
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants';
//import { type FC } from 'react';
import { type Language, type FromLanguage, SectionType } from '../types/languages.d';

// ejemplo de tipar las props
// interface Props {
//   onChange: (languaje: Language) => void
// }
// El type es de typeScript
type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

// EXAMPLE 2
// const numbers: Array<number> = [1,2,3]

export const LanguageSelector = ({ onChange, type, value }: Props) => {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar Idioma</option>}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  );
}

