import { usePokemon } from "../hooks/usePokemon"
import type { JSX } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import PokemonCard from "./pokemonCard";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { FaTh, FaBars } from "react-icons/fa";
import Form from "react-bootstrap/Form";

type SortType = "id-asc" | "id-desc" | "name-asc" | "name-desc";

export default function PokemonContainer():JSX.Element {

    const [name, setName] = useState<string>("");
    const [visileCount, setVisibleCount] = useState<number>(20);
    const [rowDisplay, setRowDisplay] = useState<boolean>(false);
    const [sortType, setSortType] = useState<SortType>("id-asc");

    const { allPokemon, loading, error } = usePokemon();

    const navigate = useNavigate();

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

    const filteredPokemon = useMemo(() => {
        let result = [...allPokemon];

        // FILTER
        if (name.trim()) {
            const search = name.toLowerCase().trim();

            result = result.filter((pokemon, index) => {
                const id = index + 1;

                if (!isNaN(Number(search.replace("#", "")))) {
                    return id === Number(search.replace("#", ""));
                }

                return pokemon.name.includes(search);
            });
        }

        // SORT
        result.sort((a, b) => {
            const idA = Number(a.url.split("/").at(-2));
            const idB = Number(b.url.split("/").at(-2));

            switch (sortType) {
                case "id-asc":
                    return idA - idB;
                case "id-desc":
                    return idB - idA;
                case "name-asc":
                    return a.name.localeCompare(b.name);
                case "name-desc":
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

        return result;
    }, [allPokemon, name, sortType]);

    
    // reset "infinite scrolling" when search
    useEffect(() => {
        setVisibleCount(20);
    }, [name, sortType])

    return (
        <>
            <div className="charcoal-10">
                <Container>
                    <Row className="align-items-end">
                        <Col sm={12} md={4}>
                            <b><p style={{marginTop: 24, marginBottom: 12}}>Name or number</p></b>
                            <input
                            id="filter-input"
                            className="search-input"
                            type="text"
                            placeholder="Pikachu, #0025"
                            onChange={(e) => setName(e.target.value)}
                        />
                        </Col>
                        <Col sm={12} md={3}>
                            <button 
                                className="surpriseButton" 
                                onClick={() => {
                                    const randomId = Math.floor(Math.random() * 151) + 1;
                                    navigate(`/pokemon/${randomId}`);
                                }}
                            >Surprise me</button>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container className="mt-4 mb-2">
                <Row>
                    <Stack gap={2} direction="horizontal">
                        <button 
                            className={`displayType ${!rowDisplay ? "selected" : ""}`}
                            onClick={() => setRowDisplay((prev) => !prev)}
                        >{FaTh({})}</button>
                        <button 
                            className={`displayType ${rowDisplay ? "selected" : ""}`}
                            onClick={() => setRowDisplay((prev) => !prev)}
                        >{FaBars({})}</button>
                        <span className="me-2 d-none d-md-inline ms-auto" style={{fontWeight: 600}}>Sort by</span>
                        <Form.Select aria-label="Def" className="selectOrder" value={sortType} onChange={(e) => setSortType(e.target.value as SortType)}>
                            <option value="id-asc">Lowest number (first)</option>
                            <option value="id-desc">Highest number (first)</option>
                            <option value="name-asc">Name (A → Z)</option>
                            <option value="name-desc">Name (Z → A)</option>
                        </Form.Select>
                    </Stack>
                </Row>
            </Container>

            <Container>
                <Row>
                    {loading && (
                        <Col xs={12} className="text-center my-4">
                            <Spinner animation="border" role="status" />
                        </Col>
                    )}

                    {error && (
                        <Col xs={12} className="text-center my-4">
                            <Alert variant="danger">{error}</Alert>
                        </Col>
                    )}


                    {!loading && !error &&
                    filteredPokemon.slice(0, visileCount).map((pokemon, index) => {
                        const isLast = index === Math.min(visileCount, filteredPokemon.length) - 1;

                        const id = pokemon.url.split("/").at(-2);

                        return (
                            <PokemonCard key={pokemon.name} pokemonId={id} rowDisplay={rowDisplay} ref={isLast ? lastElementRef : undefined} />
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}