export function normalizeText(text: string | undefined): string | null {
    if(text){
        return text
            .replace(/\f/g, " ")   // rimuove form-feed
            .replace(/\n/g, " ")   // sostituisce newline
            .replace(/\s+/g, " ")  // normalizza spazi
            .trim();
    } else {
        return null;
    }
}