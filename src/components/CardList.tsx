import type { Card, Deck } from "../types";


export default function CardList({ deck, onRemove }: { deck: Deck; onRemove: (id: string) => void }) {
  if (!deck.cards.length) return <p className="text-sm text-gray-600">No cards yet.</p>;
  return (
    <ul className="divide-y rounded-xl border">
      {deck.cards.map((c) => (
        <li key={c.id} className="p-3 flex items-start gap-3">
        <div className="flex-1">
        <div className="font-medium">{c.front}</div>
        <div className="text-sm text-gray-600">{c.back}</div>
        </div>
        <button className="btn" onClick={() => onRemove(c.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}