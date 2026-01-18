import './App.css';
import PokemonContainer from './components/pokemonContainer';
import PokemonDetails from './components/pokemonDetails';
import Container from 'react-bootstrap/Container';
import Header from './components/header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Container className="App">
        <Router>
          <Routes>
            <Route path='/' element={<PokemonContainer />} />
            <Route path='/pokemon/:id' element={<PokemonDetails />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
