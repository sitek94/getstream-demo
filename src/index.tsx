import './index.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { App, AppProviders } from './app/app'

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
)
