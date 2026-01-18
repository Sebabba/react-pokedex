import { forwardRef } from "react";
import { useSinglePokemon } from "../hooks/useSinglePokemon";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

type CardProps = {
  pokemonId: string | undefined;
};

const PokemonCard = forwardRef<HTMLDivElement, CardProps>(
  ({ pokemonId }, ref) => {
    const { pokemon, loading, error } = useSinglePokemon(pokemonId);

    if (!pokemon) return null;

    return (
      <Col
        ref={ref}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className="pokemonCol"
      >
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
                        switch(type.type.name) {
                            case "fire":
                                return(<span key={type.type.name} className="badge-custom fire">Fire</span>);
                            case "grass":
                                return(<span key={type.type.name} className="badge-custom grass">Grass</span>);
                            case "water":
                                return(<span key={type.type.name} className="badge-custom water">Water</span>);
                            case "poison":
                                return(<span key={type.type.name} className="badge-custom poison">Poison</span>);
                            case "flying":
                                return(<span key={type.type.name} className="badge-custom flying">Flying</span>);
                            case "bug":
                                return(<span key={type.type.name} className="badge-custom bug">Bug</span>);
                            case "electric":
                                return(<span key={type.type.name} className="badge-custom electric">Electric</span>);
                            case "fairy":
                                return(<span key={type.type.name} className="badge-custom fairy">Fairy</span>);
                            case "psychic":
                                return(<span key={type.type.name} className="badge-custom psychic">Psychic</span>);
                            case "fighting":
                                return(<span key={type.type.name} className="badge-custom fighting">Fighting</span>);
                            case "rock":
                                return(<span key={type.type.name} className="badge-custom rock">Rock</span>);
                            case "ground":
                                return(<span key={type.type.name} className="badge-custom ground">Ground</span>);
                            case "steel":
                                return(<span key={type.type.name} className="badge-custom steel">Steel</span>);
                            case "ice":
                                return(<span key={type.type.name} className="badge-custom ice">Ice</span>);
                            case "ghost":
                                return(<span key={type.type.name} className="badge-custom ghost">Ghost</span>);
                            case "dragon":
                                return(<span key={type.type.name} className="badge-custom dragon">Dragon</span>);
                            default:
                                return(<span key={type.type.name} className="badge-custom">Normal</span>)
                        }

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
