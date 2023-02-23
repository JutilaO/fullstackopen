import ReactDOM from 'react-dom/client'
import App from './App'
import { createStore } from 'redux'
import counterReducer from './reducer'
const root = ReactDOM.createRoot(document.getElementById('root'))

const store = createStore(counterReducer)
const renderApp = () => {
  root.render(<App store={store}/>)
}

renderApp()
store.subscribe(renderApp)
