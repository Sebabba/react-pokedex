import {JSX} from 'react';
import { Pokemon, PokemonSpeciesDetails } from '../utils/types';
import { pickEnglishEntry } from '../utils/pickEnglishEntry';
import { normalizeText } from '../utils/normalizeText';
import Container from 'react-bootstrap/Container';
import {Row, Col, Stack, Image} from 'react-bootstrap';

type PageProps = {
    pokemon: Pokemon;
    pokemonSpecies : PokemonSpeciesDetails;
}

export default function PokemonDetailsView({pokemon, pokemonSpecies}:PageProps):JSX.Element {
    const {englishText, englishGenus} = pickEnglishEntry(pokemonSpecies)

    const imageUrl = pokemon.sprites.other?.["official-artwork"]?.front_default
        ?? pokemon.sprites.front_default
        ?? undefined

    return(
        <Container>
            <Row className="pt-3">
                <Stack gap={0}>
                    <p className="pokemonId caption">#{pokemon.id.toString().padStart(4, "0")}</p>
                    <h1 className="text-capitalize">{pokemon.name}</h1>
                </Stack>
            </Row>
            <hr className="charcoal-100" style={{border: "1px solid"}} />
            <Row>
                <Col xs={12} md={5}>
                    <Image 
                        src={imageUrl}
                        className="charcoal-5 pokemonDetailsImage"
                        fluid
                    />
                </Col>
                <Col xs={12} md={7}>
                    <Stack gap={1}>
                        <div>
                            <h3>Description</h3>
                            <p><i>"{normalizeText(englishText)}"</i></p>
                        </div>
                        <div>
                            <h3>Genus</h3>
                            <p>{englishGenus}</p>
                        </div>
                        <div>
                            <h3>Types</h3>
                            <div className="pokemonTypes">
                                {pokemon.types.map((type) => {
                                    return(<span key={type.type.name} className={`text-capitalize badge-custom ${type.type.name}`}>{type.type.name}</span>);
                                })}
                            </div>
                        </div>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}