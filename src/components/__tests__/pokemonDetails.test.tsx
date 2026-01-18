// src/components/__tests__/PokemonDetails.test.tsx

import { render, screen } from "@testing-library/react";
import PokemonDetails from "../pokemonDetails";

jest.mock("../../hooks/useSinglePokemon", () => ({
  useSinglePokemon: jest.fn(),
}));

jest.mock("../../hooks/useSinglePokemonSpecie", () => ({
  useSinglePokemonSpecie: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "25" }),
}));

import { useSinglePokemon } from "../../hooks/useSinglePokemon";
import { useSinglePokemonSpecie } from "../../hooks/useSinglePokemonSpecie";

describe("PokemonDetails Page", () => {

  test("renders Pokemon details correctly", () => {

    (useSinglePokemon as jest.Mock).mockReturnValue({
      pokemon: {
        id: 25,
        name: "pikachu",
        sprites: {
          other: {
            "official-artwork": {
              front_default: "pikachu.png",
            },
          },
        },
        types: [
          { type: { name: "electric" } },
          { type: { name: "fairy" } },
        ],
      },
      loading: false,
      error: null,
    });

    (useSinglePokemonSpecie as jest.Mock).mockReturnValue({
      pokemonSpecie: {
        flavor_text_entries: [
          { flavor_text: "A strange seed was\nplanted on its back at birth.\fThe plant sprouts and grows with this POKéMON." },
        ],
        genera: Array(7).fill({ genus: "Placeholder" }).concat([{ genus: "Mouse Pokémon" }]), // genera[7]
      },
      loadingSpecie: false,
      errorSpecie: null,
    });

    render(<PokemonDetails />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/pikachu/i);
    expect(screen.getByText("#0025")).toBeInTheDocument();
    expect(screen.getByText(/A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON./i)).toBeInTheDocument();
    expect(screen.getByText("Mouse Pokémon")).toBeInTheDocument();

    expect(screen.getByText("Electric")).toBeInTheDocument();
    expect(screen.getByText("Fairy")).toBeInTheDocument();
  });

  test("renders fallback message when no pokemon", () => {
    (useSinglePokemon as jest.Mock).mockReturnValue({
      pokemon: null,
      loading: false,
      error: null,
    });

    (useSinglePokemonSpecie as jest.Mock).mockReturnValue({
      pokemonSpecie: null,
      loadingSpecie: false,
      errorSpecie: null,
    });
    render(<PokemonDetails />);

    expect(screen.getByText(/No Pokemon Selected/i)).toBeInTheDocument();
  });
});
