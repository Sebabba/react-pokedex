import './App.css';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import Router from './routes/Router';

function App() {
  return (
      <Container className="App">
        <Header />
        <Router />
      </Container>
  );
}

export default App;
