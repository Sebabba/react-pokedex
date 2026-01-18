import { usePokemon } from "../hooks/usePokemon"
import type { JSX } from "react";
import { Col, Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import PokemonCard from "./pokemonCard";
import { useEffect, useState, useRef, useCallback } from "react";

export default function PokemonContainer():JSX.Element {

    const [name, setName] = useState<string>("")

    const { allPokemon, loading, error } = usePokemon();
    
    return (
        <>
            <div className="charcoal-10">
                <Container className="filterSection">
                    <div>
                        <b><p>Name or number</p></b>
                        <input
                        id="filter-input"
                        className="search-input"
                        type="text"
                        placeholder="Pikachu"
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <div>
                        <button className="surpriseButton" onClick={() => {}}>Surprise me</button>
                    </div>
                </Container>
            </div>

            <Container>
                <Row>
                    {allPokemon.map((item, index) => {
                        return(
                            <PokemonCard key={index+1} pokemonId={index+1} />
                        )
                    })}
                </Row>
            </Container>
        </>
    )
}