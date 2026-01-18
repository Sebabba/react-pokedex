import { usePokemon } from "../hooks/usePokemon"
import type { JSX } from "react";
import { Col, Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import PokemonCard from "./pokemonCard";
import { useEffect, useState, useRef, useCallback } from "react";

export default function PokemonContainer():JSX.Element {

    const [name, setName] = useState<string>("");
    const [visileCount , setVisibleCount] = useState<number>(20);

    const { allPokemon, loading, error } = usePokemon();

    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    setVisibleCount((prev) => 
                        Math.min(prev + 20, allPokemon.length)
                    );
                }
            });

            if(node) observer.current.observe(node);
        },
        [loading, allPokemon.length]
    );
    
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
                    {allPokemon.slice(0, visileCount).map((_, index) => {
                        const isLast = index === visileCount - 1;

                        return (
                            <PokemonCard key={index + 1} pokemonId={index + 1} ref={isLast ? lastElementRef : undefined} />
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}