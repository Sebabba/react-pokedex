import { usePokemon } from "../hooks/usePokemon"
import type { JSX } from "react";
import { Row } from "react-bootstrap";
import Container from 'react-bootstrap/Container'
import PokemonCard from "./pokemonCard";
import { useEffect, useState, useRef, useCallback } from "react";

export default function PokemonContainer():JSX.Element {

    const [page, setPage] = useState<number>(1);
    const [offset, setOffset] = useState<number>(0);

    const { data, loading, error } = usePokemon(offset);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;

            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && offset < 151) { //da modificare
                    setOffset(offset+20);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, offset],
    );
    
    return (
        <Container>
            <Row>
                {data.map((item, index) => {
                    if (index === data.length - 1) {
                        return(
                            <PokemonCard pokemonId={index+1} ref={lastElementRef} />
                        )
                    }
                    return(
                        <PokemonCard pokemonId={index+1} />
                    )
                })}
            </Row>
        </Container>
    )
}