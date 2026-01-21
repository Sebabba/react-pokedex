import { PokemonSpecieDetails } from "./types";

export function pickEnglishEntry(pokemonSpecie:PokemonSpecieDetails){
    const englishTexts = pokemonSpecie.flavor_text_entries.filter(ft => ft.language.name === "en");
    const firstEnglishText = englishTexts.length > 0 ? englishTexts[0].flavor_text : "No English text found";

    const englishGenera = pokemonSpecie.genera.filter(ge => ge.language.name === "en");
    const firstEnglishGenus = englishGenera.length > 0 ? englishGenera[0].genus : "No English genus found";

    return {englishText: firstEnglishText, englishGenus: firstEnglishGenus}
}