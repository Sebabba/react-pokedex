import './App.css';
import PokemonContainer from './components/pokemonContainer';
import Container from 'react-bootstrap/Container';
import Header from './components/header';

function App() {
  return (
    <>
      <Header />
      <Container className="App">
        <PokemonContainer />
      </Container>
    </>
  );
}

export default App;
