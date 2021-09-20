import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Learn React - Express/NodeJS communication
        </p>
        <a
          className="App-link"
          href="https://expressjs.com/ru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn ExpressJS
        </a>
      </header>
      <AppRoutes />
    </div>
  );
}

export default App;
