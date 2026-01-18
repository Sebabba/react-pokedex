import { render, screen } from "@testing-library/react";
import Header from "../header";

test("renders header", () => {
    render(<Header />);

    expect(screen.getByText(/pokedex/i)).toBeInTheDocument();
})