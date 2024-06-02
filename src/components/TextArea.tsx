import { Form } from "react-bootstrap"
import { SectionType } from "../types/languages.d"

type Props =
{
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}

const commonStyles = { border: 0, height: '200px' }   // resize: 'none'

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return 'Input text'
    if (loading === true) return 'Loading...'
    return 'Translate'
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
    const styles = type === SectionType.From
        ? commonStyles
        : { ...commonStyles, backgroundColor: '#f5f5f5' }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }

    return (
        <Form.Control
            autoFocus={type === SectionType.From}
            as='textarea'
            disabled={type === SectionType.To}
            placeholder={getPlaceholder({ type, loading })}
            style={styles}
            value={value}
            onChange={handleChange}
        />
    )
}