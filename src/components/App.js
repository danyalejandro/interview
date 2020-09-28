import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Container } from '@material-ui/core'
import './App.scss'

const App = () => {
    return(
        <>
            <CssBaseline />
            <Container className="app" maxWidth="sm">
                <h1>Hello world</h1>
            </Container>
        </>
    )
}

export default App