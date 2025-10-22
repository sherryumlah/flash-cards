// StudyView.tsx
import { useEffect, useMemo, useState } from "react";
import type { Deck } from "../types";

export default function StudyView({
  deck,
  known,
  onMarkKnown,
  onMarkUnknown,
  onResetDeck,
}: {
  deck: Deck;
  known: Record<string, boolean>;
  onMarkKnown: (id: string) => void;
  onMarkUnknown: (id: string) => void;
  onResetDeck: () => void;
}) {
  const unknownIds = useMemo(
    () => deck.cards.map((c) => c.id).filter((id) => !known[id]),
    [deck, known]
  );

  const [i, setI] = useState(0);
  const [showBack, setShowBack] = useState(false);

  // Reset index if deck or known set changes
  useEffect(() => {
    setI(0);
    setShowBack(false);
  }, [deck.id, unknownIds.length]);

  // Shuffle order once per session (simple deterministic based on deck id)
  const order = useMemo(() => {
    const arr = [...unknownIds];
    let seed = [...deck.id].reduce((a, ch) => a + ch.charCodeAt(0), 0);
    for (let j = arr.length - 1; j > 0; j--) {
      seed = (seed * 9301 + 49297) % 233280;
      const k = Math.floor((seed / 233280) * (j + 1));
      [arr[j], arr[k]] = [arr[k], arr[j]];
    }
    return arr;
  }, [deck.id, unknownIds.join("-")]);

  const currentId = order[i];
  const current = deck.cards.find((c) => c.id === currentId) ?? null;

  if (!order.length) {
    return (
      <div className="text-center space-y-3">
        <div className="text-2xl font-semibold">All done!</div>
        <p className="text-gray-600">You’ve marked every card as Known in this deck.</p>
        <div className="flex gap-2 justify-center">
          <button className="btn" onClick={onResetDeck}>Reset Known</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="pill">Remaining: {order.length}</div>
        <div className="pill">Total: {deck.cards.length}</div>
      </div>

      <div className="rounded-2xl border p-6 bg-white shadow-sm">
        <div className="text-sm uppercase tracking-wide text-gray-500">Front</div>
        <div className="text-xl font-semibold">{current?.front}</div>

        {showBack ? (
          <div className="mt-6 space-y-3">
            <div>
              <div className="text-sm uppercase tracking-wide text-gray-500">Back</div>
              <div className="text-lg">{current?.back}</div>
            </div>

            {/* Show manual mnemonic if present */}
            {!!(current as any)?.mnemonic && (
              <div className="pt-3 border-t">
                <div className="text-sm uppercase tracking-wide text-gray-500">Mnemonic</div>
                <div className="text-base opacity-80">{(current as any).mnemonic}</div>
              </div>
            )}
          </div>
        ) : (
          <button className="btn mt-6" onClick={() => setShowBack(true)}>Show Answer</button>
        )}
      </div>

      <div className="flex gap-2">
        <button
          className="btn"
          onClick={() => {
            if (!current) return;
            onMarkUnknown(current.id);
            setShowBack(false);
            setI((v) => (v + 1) % order.length);
          }}
        >
          Keep (Not Yet)
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            if (!current) return;
            onMarkKnown(current.id);
            setShowBack(false);
            // After removing current from remaining, avoid overflow by clamping index
            setI((v) => (v >= order.length - 1 ? 0 : v));
          }}
        >
          Known ✓
        </button>
      </div>
    </div>
  );
}
