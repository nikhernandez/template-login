/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import styled from '@emotion/styled'
import VisuallyHidden from '@reach/visually-hidden'
//import { Dialog } from '@reach/dialog'
import Dialog from '@material-ui/core/Dialog'
import {
  CircleButton,
  Button,
  Spinner,
  FormGroup,
  Centered
} from './components/lib'
import * as Functions from './funtions'

function LoginForm({ onSubmit, buttonText }) {
  function handleSubmit(event) {
    event.preventDefault()
    const { username, password } = event.target.elements
    Functions.Testchange(username.value, password.value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px'
        }
      }}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </FormGroup>
      <div>
        <Button type="submit">{buttonText}</Button>
      </div>
      <br />
    </form>
  )
}

function Modal({ button, children }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {React.cloneElement(button, { onClick: () => setIsOpen(true) })}
      <Dialog open={isOpen} maxWidth="xs" fullWidth={true}>
        <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CircleButton onClick={() => setIsOpen(false)}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </div>
        {children}
      </Dialog>
    </>
  )
}

const ModalTitle = styled.h3({
  textAlign: 'center',
  fontSize: '2em'
})

function UnauthenticatedApp() {
  const login = 'login'
  const register = 'register'

  return (
    <Centered>
      <h1>Login</h1>
      <div css={{ display: 'flex' }}>
        <Modal button={<Button css={{ marginRight: 6 }}>test Login</Button>}>
          <ModalTitle>Login</ModalTitle>
          <LoginForm onSubmit={login} buttonText="Login" />
        </Modal>
        <Modal button={<Button variant="secondary">test registrar</Button>}>
          <ModalTitle>Register</ModalTitle>
          <LoginForm onSubmit={register} buttonText="Register" />
        </Modal>
      </div>
    </Centered>
  )
}

export default UnauthenticatedApp
