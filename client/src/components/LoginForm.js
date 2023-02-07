import React, { useState } from 'react'
import Togglable from './Togglable.js'
import PropTypes from 'prop-types'

export default function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    handleLogin(username, password)
  }
  const handleUsernameChange = value => {
    setUsername(value)
  }
  const handlePasswordChange = value => {
    setPassword(value)
  }

  return (
    <Togglable buttonLabel='Show Login'>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <input
            type='text'
            value={username}
            name='Username'
            placeholder='Username'
            id='username'
            onChange={({ target }) => handleUsernameChange(target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            value={password}
            name='Password'
            placeholder='Password'
            id='password'
            onChange={({ target }) => handlePasswordChange(target.value)}
          />
        </div>
        <button id='form-login-button'>Login</button>
      </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string
}
