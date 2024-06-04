import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import './App.css'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { AUTO_LANGUAGE } from './constants'
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

  // cada vez que cambie la variable [] hace un efecto
  useEffect(() =>{
    //console.log(fromText,'useEffect');
    if (fromText==='') return
    translate({fromLanguage, toLanguage, text: fromText})
    .then(result=>{
      // (result===null || result===undefined ) es igual (result==null)
      if(result==null) return
      setResult(result)
    })
    .catch(()=>{setResult('Error')})
  }, [fromText, fromLanguage, toLanguage] )

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

              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              />
              <div>
                {fromLanguage}
                {fromText}
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
              <div style={{ position: 'relative' }}></div>
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div>
                {toLanguage}
                {result}
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default App
