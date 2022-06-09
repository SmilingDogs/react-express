import logo from './logo.svg';
import './App.css';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Client (React) - Server (ExpressJS) communication</p>
        <a
          className="App-link"
          href="https://expressjs.com/ru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          REST API application
        </a>
      </header>
      <AppRoutes />
    </div>
  );
}

export default App;
