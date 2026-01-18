import { forwardRef } from "react";
import { useSinglePokemon } from "../hooks/useSinglePokemon";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

type CardProps = {
  pokemonId: number;
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
                    console.log(pokemon)
                    switch(type.type.name) {
                        case "fire":
                            return(<span className="badge-custom fire">Fire</span>);
                        case "grass":
                            return(<span className="badge-custom grass">Grass</span>);
                        case "water":
                            return(<span className="badge-custom water">Water</span>);
                        case "poison":
                            return(<span className="badge-custom poison">Poison</span>);
                        case "flying":
                            return(<span className="badge-custom flying">Flying</span>);
                        case "bug":
                            return(<span className="badge-custom bug">Bug</span>);
                        case "electric":
                            return(<span className="badge-custom electric">Electric</span>);
                        case "fairy":
                            return(<span className="badge-custom fairy">Fairy</span>);
                        case "psychic":
                            return(<span className="badge-custom psychic">Psychic</span>);
                        case "fighting":
                            return(<span className="badge-custom fighting">Fighting</span>);
                        case "rock":
                            return(<span className="badge-custom rock">Rock</span>);
                        case "ground":
                            return(<span className="badge-custom ground">Ground</span>);
                        case "steel":
                            return(<span className="badge-custom steel">Steel</span>);
                        case "ice":
                            return(<span className="badge-custom ice">Ice</span>);
                        case "ghost":
                            return(<span className="badge-custom ghost">Ghost</span>);
                        case "dragon":
                            return(<span className="badge-custom dragon">Dragon</span>);
                        default:
                            return(<span className="badge-custom">Normal</span>)
                    }

                })}
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  }
);

export default PokemonCard;
