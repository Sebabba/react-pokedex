import { render, screen } from "@testing-library/react";
import PokemonCard from "../PokemonCard";

jest.mock("react-router-dom", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock("../../hooks/useSinglePokemon", () => ({
  useSinglePokemon: () => ({
    loading: false,
    error: null,
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
        {
          type: { name: "electric" },
        },
      ],
    },
  }),
}));


test("renders pokemon card with correct id", () => {
  render(<PokemonCard pokemonId="25" rowDisplay={false}/>);
  expect(screen.getByText("#0025")).toBeInTheDocument();
  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
});
