import { render, screen } from "@testing-library/react";
import PokemonDetailsPage from "../../pages/PokemonDetailsPage";

jest.mock("../../hooks/useSinglePokemon", () => ({
  useSinglePokemon: jest.fn(),
}));

jest.mock("../../hooks/useSinglePokemonSpecies", () => ({
  useSinglePokemonSpecies: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useParams: () => ({ id: "25" }),
}));

import { useSinglePokemon } from "../../hooks/usePokemon";
import { useSinglePokemonSpecies } from "../../hooks/usePokemonSpecies";

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

    (useSinglePokemonSpecies as jest.Mock).mockReturnValue({
      PokemonSpecies: {
        flavor_text_entries: [
          {
            flavor_text:
              "A strange seed was\nplanted on its back at birth.\fThe plant sprouts and grows with this POKéMON.",
            language: { name: "en" },
          },
        ],
        genera: [
          {
            genus: "Mouse Pokémon",
            language: { name: "en" },
          },
        ],
      },
      loadingSpecie: false,
      errorSpecie: null,
    });

    render(<PokemonDetailsPage />);

    expect(
      screen.getByRole("heading", { level: 1 })
    ).toHaveTextContent(/pikachu/i);

    expect(screen.getByText("#0025")).toBeInTheDocument();

    expect(
      screen.getByText(
        /A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON./i
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Mouse Pokémon")).toBeInTheDocument();

    expect(screen.getByText(/electric/i)).toBeInTheDocument();
    expect(screen.getByText(/fairy/i)).toBeInTheDocument();
  });


  test("renders fallback message when no pokemon", () => {
    (useSinglePokemon as jest.Mock).mockReturnValue({
      pokemon: null,
      loading: false,
      error: null,
    });

    (useSinglePokemonSpecies as jest.Mock).mockReturnValue({
      PokemonSpecies: null,
      loadingSpecie: false,
      errorSpecie: null,
    });
    render(<PokemonDetailsPage />);

    expect(screen.getByText(/No Pokemon Selected/i)).toBeInTheDocument();
  });
});
