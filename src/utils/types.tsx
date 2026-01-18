export type PokemonSpecie = {
    name: string;
    url: string;
}

export type Pokemon = undefined | {
    abilities: [];
    cries: {
        latest: string;
        legacy: string;
    };
    forms: [];
    game_indices: [];
    height: number;
    held_items: [];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: [];
    name: string;
    order: number;
    past_abilities: [];
    past_types: [];
    species: PokemonSpecie;
    sprites: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
        other: {
            dream_world: {};
            home: {};
            "official-artwork": {
                front_default: string;
                front_shiny: string;
            }
        };
        versions: {}
    };
    stats: [];
    types: Type[];
    weight: number;
}

export type Type = {
    slot: number;
    type: {
        name: string;
        url: string;
    }
}