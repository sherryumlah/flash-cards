// types.ts
export type Card = {
  id: string;
  front: string;
  back: string;
  mnemonic?: string; // optional mnemonic to help remember
};

export type Deck = { 
  id: string; 
  name: string; 
  cards: Card[] 
};

export type AppState = {
  decks: Deck[];
  activeDeckId: string | null;
  // Per deck: ids marked known
  knownByDeck: Record<string, Record<string, boolean>>; // deckId -> { cardId: true }
};