import React from 'react'
import ReactDOM from 'react-dom'
import I18n from './i18n'
import Router from './Router'
import './index.css'
import reportWebVitals from './reportWebVitals'

async function main() {
  await I18n.init()
  ReactDOM.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>,
    document.getElementById('root')
  )
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals()
}

main()
