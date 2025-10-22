import { useState } from "react";
import type { Deck } from "../types";


export default function BulkAdd({ deck, onAdd }: { deck: Deck; onAdd: (cards: { front: string; back: string }[]) => void }) {
  const [text, setText] = useState("");
  const [delimiter, setDelimiter] = useState("|");
  const parse = () => {
  const lines = text
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);
  const cards = lines.map((line) => {
  const [front, back] = line.split(delimiter);
  return { front: (front ?? "").trim(), back: (back ?? "").trim() };
  });
  onAdd(cards.filter((c) => c.front && c.back));
  setText("");
};

return (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      <span className="pill">Deck: {deck.name}</span>
      <label className="ml-auto text-sm text-gray-600 flex items-center gap-2">
        Delimiter
        <input className="w-16" value={delimiter} onChange={(e) => setDelimiter(e.target.value)} />
      </label>
    </div>
    <textarea
      className="w-full h-40 rounded-xl border p-3"
      placeholder={`Paste lines like:\nFront ${"|"} Back`}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <div className="flex gap-2">
      <button className="btn-primary" onClick={parse} disabled={!text.trim()}>
        Add Cards
      </button>
      <p className="text-sm text-gray-600">Tip: one card per line — "Front {delimiter} Back".</p>
    </div>
  </div>
  );
}