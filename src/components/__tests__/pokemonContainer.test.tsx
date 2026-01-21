import { render, screen } from "@testing-library/react";
import PokemonContainer from "../PokemonContainer";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("renders search input", () => {
    render(
        <MemoryRouter>
            <PokemonContainer />
        </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/pikachu/i);
    expect(input).toBeInTheDocument();
});

test("updates input value when typing", async () => {
    render(
        <MemoryRouter>
            <PokemonContainer />
        </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/pikachu/i);
    await userEvent.type(input, "bulbasaur");

    expect(input).toHaveValue("bulbasaur");
})