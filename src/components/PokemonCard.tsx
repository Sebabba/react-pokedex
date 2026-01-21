import { forwardRef } from "react";
import { useSinglePokemon } from "../hooks/useSinglePokemon";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Image } from "react-bootstrap";

type CardProps = {
  pokemonId: string | undefined;
  rowDisplay: boolean;
};

const PokemonCard = forwardRef<HTMLDivElement, CardProps>(
  ({ pokemonId, rowDisplay }, ref) => {
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

    if(!rowDisplay) {
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
    } else {
        return(
            <Col ref={ref} xs={12}>
                <div className="rowDisplay-card d-flex flex-column flex-sm-row my-2">
                    <Image 
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        className="charcoal-5 rowDisplay-img"
                        fluid
                    />

                    <div className="ms-sm-3 mt-3 mt-sm-0 d-flex flex-column flex-grow-1">
                        <div>
                            <p className="pokemonId caption">#{pokemon.id.toString().padStart(4, "0")}</p>
                            <h3 className="pokemonName text-capitalize">{pokemon.name}</h3>

                            <div className="pokemonTypes">
                                {pokemon.types.map((type) => (
                                    <span key={type.type.name} className={`text-capitalize badge-custom ${type.type.name}`}>
                                        {type.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <Link to={`/pokemon/${pokemon.id}`} className="mt-auto align-self-end more-info-link pokemonId" style={{textDecoration: "none"}}>
                            More details →
                        </Link>
                    </div>
                </div>
            </Col>
        )
    }
    
  }
);

export default PokemonCard;
