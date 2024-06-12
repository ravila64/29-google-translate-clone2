import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import App from './App'

// execute $npm run test, in the terminal

test('My App works as expected', async()=>{
    
    const user = userEvent.setup()
    const app = render(< App />)
    const textareaFrom = app.getByPlaceholderText('Introducir texto')
    await user.type(textareaFrom, 'Hola mundo')
    const result = await app.findByDisplayValue(/Hello world/i, {}, {timeout:5000})
    expect(result).toBeTruthy()   

})

 