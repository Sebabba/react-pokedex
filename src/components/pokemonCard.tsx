import { useSinglePokemon } from "../hooks/useSinglePokemon";
import { Pokemon } from "../utils/types";
import Card from 'react-bootstrap/Card';
import { JSX } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"

type CardProps = {
	pokemonId: number;
};

export default function PokemonCard({pokemonId}:CardProps):JSX.Element{

    const { pokemon, loading, error } = useSinglePokemon(pokemonId);

    console.log(pokemon)

    return(
        <>
            {pokemon && (
                <Col key={pokemon.id} xs={12} sm={6} md={4} lg={3} className="pokemonCol">
                    <Card className="pokemonCard">
                        <Card.Img variant="top" src={pokemon.sprites.other["official-artwork"].front_default} className="charcoal-5"/>
                        <Card.Body className="p-0">
                            <p className="pokemonId caption">#0001</p>
                            <h3 className="pokemonName">{pokemon.name}</h3>
                            <div className="pokemonTypes">

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </>
    )
}