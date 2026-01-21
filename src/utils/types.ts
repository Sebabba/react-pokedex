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

export type PokemonSpecieDetails = {
    base_happines: number;
    capture_rate: number;
    color: {
        name: string;
        url: string;
    };
    egg_groups: [];
    evolution_chain: {
        url: string;
    };
    evolves_from_species: string | null;
    flavor_text_entries: Flavor_text_entry[];
    form_descriptions: [];
    forms_switchable: boolean;
    gender_rate: number;
    genera: Genus[];
    generation: {
        name: string;
        url: string;
    };
    growth_rate: {
        name: string;
        url: string;
    };
    habitat: {
        name: string;
        url: string;
    };
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: [];
    order: number;
    pal_park_encountes: [];
    pokedex_numbers: [];
    shape: {
        name: string;
        url: string;
    };
    varieties: [];
}

export type Flavor_text_entry = {
    flavor_text: string;
    language: {
        name: string;
        url: string;
    };
    version: {
        name: string;
        url: string;
    };
}

export type Genus = {
    genus: string;
    language: {
        name: string;
        url: string;
    }
}