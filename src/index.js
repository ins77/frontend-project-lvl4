import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import './i18n';
import renderApp from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

renderApp(window.gon);
