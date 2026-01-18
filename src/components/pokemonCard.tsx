import { forwardRef } from "react";
import { useSinglePokemon } from "../hooks/useSinglePokemon";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

type CardProps = {
  pokemonId: string | undefined;
};

const PokemonCard = forwardRef<HTMLDivElement, CardProps>(
  ({ pokemonId }, ref) => {
    const { pokemon, loading, error } = useSinglePokemon(pokemonId);

    if(loading) {
        return (
            <Col xs={12} sm={6} md={4} lg={3} className="pokemonCol text-center">
                <Spinner animation="border" role="status" />
            </Col>
        )
    }

    if (error) {
        return (
            <Col xs={12} sm={6} md={4} lg={3} className="pokemonCol text-center">
                <p className="text-danger">Error: {error}</p>
            </Col>
        );
    }

    if (!pokemon) {
        return (
            <Col xs={12} sm={6} md={4} lg={3} className="pokemonCol text-center">
                <p>Pokemon not found</p>
            </Col>
        );
    }


    return (
      <Col ref={ref} xs={12} sm={6} md={4} lg={3} className="pokemonCol">
        <Link to={`/pokemon/${pokemon.id}`} style={{textDecoration: "none"}}>
            <Card className="pokemonCard">
            <Card.Img
                variant="top"
                src={pokemon.sprites.other["official-artwork"].front_default}
                className="charcoal-5"
            />
            <Card.Body className="p-0">
                <p className="pokemonId caption">#{pokemon.id.toString().padStart(4, "0")}</p>
                <h3 className="pokemonName text-capitalize">{pokemon.name}</h3>
                <div className="pokemonTypes">
                    {pokemon.types.map((type) => {
                        return(<span key={type.type.name} className={`text-capitalize badge-custom ${type.type.name}`}>{type.type.name}</span>);
                    })}
                </div>
            </Card.Body>
            </Card>
        </Link>
      </Col>
    );
  }
);

export default PokemonCard;
