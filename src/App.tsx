import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import './App.css'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons.tsx'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants.ts'
import { useDebounce } from './hooks/useDebounce'
import { useStore } from './hooks/useStore'
import { translate } from './services/translate'
import { SectionType } from './types/languages.d'


function App() {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 250)

  // cada vez que cambie la variable [] hace un efecto o ejecuta

  useEffect(() => {
    //console.log(fromText,'useEffect');
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        // (result===null || result===undefined ) es igual (result==null)
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    const keys = Object.keys(VOICE_FOR_LANGUAGE);  // add
    utterance.lang=keys[0]        // add
    // esta parte no me funciono : VOICE_FOR_LANGUAGE[toLanguage]
    // if (keys.includes(toLanguage)){
    //   utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]   // no funciono 
    // }
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <>
      <Container fluid>
        <h2>Google Translate</h2>
        <Row>
          <Col><h2>From</h2>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage}
              />
              <div>
                <TextArea
                  type={SectionType.From}
                  value={fromText}
                  onChange={setFromText}
                />
              </div>
            </Stack>
          </Col>

          <Col xs='auto'>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE}
              onClick={interchangeLanguages}>
              <ArrowsIcon />
            </Button>
          </Col>

          <Col><h2>To</h2>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage}
              />
              <div style={{ position: 'relative' }}>
                <TextArea
                  loading={loading}
                  type={SectionType.To}
                  value={result}
                  onChange={setResult}
                />
                <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                  <Button
                    variant='Link'
                    onClick={() => { handleClipboard }}>
                    <ClipboardIcon />
                  </Button>
                  <Button
                    variant='Link'
                    onClick={() => { handleSpeak }}>
                    <SpeakerIcon />
                  </Button>
                </div>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default App
