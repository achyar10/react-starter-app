import 'react-app-polyfill/stable'
import 'core-js'
import ReactDOM from 'react-dom'
import App from './app/App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { AppStore } from './stores'

ReactDOM.render(
  <Provider store={AppStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
