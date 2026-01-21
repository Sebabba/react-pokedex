import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PokemonListPage from "../pages/PokemonListPage";
import PokemonDetailsPage from "../pages/PokemonDetailsPage";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PokemonListPage />} />
                <Route path='/pokemon/:id' element={<PokemonDetailsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}