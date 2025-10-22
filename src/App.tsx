import { useMemo, useRef, useState } from "react";
import BulkAdd from "./components/BulkAdd";
import CardList from "./components/CardList";
import StudyView from "./components/StudyView";
import { exportJson, importJson, useAppState } from "./lib/storage";
import { importCsv, exportCsv } from "./lib/storage";
import type { Card, Deck } from "./types";

export default function App() {
  const { state, setState, activeDeck, known } = useAppState();
  const [tab, setTab] = useState<"study" | "manage">("study");

  // separate refs so both inputs reset properly
  const jsonFileRef = useRef<HTMLInputElement>(null);
  const csvFileRef = useRef<HTMLInputElement>(null);

  const decks = state.decks;
  const deck = activeDeck;

  const knownCount = useMemo(
    () => (deck ? Object.keys(state.knownByDeck[deck.id] || {}).length : 0),
    [state.knownByDeck, deck?.id]
  );

  function setActiveDeck(id: string) {
    setState({ ...state, activeDeckId: id });
  }

  function addDeck() {
    const name = prompt("Deck name?")?.trim();
    if (!name) return;
    const newDeck: Deck = { id: crypto.randomUUID(), name, cards: [] };
    setState({ ...state, decks: [...decks, newDeck], activeDeckId: newDeck.id });
  }

  function removeCard(id: string) {
    if (!deck) return;
    const updated = {
      ...state,
      decks: decks.map((d) =>
        d.id === deck.id ? { ...d, cards: d.cards.filter((c) => c.id !== id) } : d
      ),
      knownByDeck: {
        ...state.knownByDeck,
        [deck.id]: Object.fromEntries(
          Object.entries(state.knownByDeck[deck.id] || {}).filter(([k]) => k !== id)
        ),
      },
    };
    setState(updated);
  }

  // allow optional mnemonic when adding
  function addCards(cards: { front: string; back: string; mnemonic?: string }[]) {
    if (!deck || cards.length === 0) return;
    const withIds: Card[] = cards.map((c) => ({
      id: crypto.randomUUID(),
      front: c.front,
      back: c.back,
      ...(c.mnemonic ? { mnemonic: c.mnemonic } : {}),
    }));
    setState({
      ...state,
      decks: decks.map((d) =>
        d.id === deck.id ? { ...d, cards: [...d.cards, ...withIds] } : d
      ),
    });
  }

  function markKnown(id: string) {
    if (!deck) return;
    const deckKnown = state.knownByDeck[deck.id] || {};
    setState({
      ...state,
      knownByDeck: { ...state.knownByDeck, [deck.id]: { ...deckKnown, [id]: true } },
    });
  }

  function markUnknown(id: string) {
    if (!deck) return;
    const deckKnown = { ...(state.knownByDeck[deck.id] || {}) };
    delete deckKnown[id];
    setState({
      ...state,
      knownByDeck: { ...state.knownByDeck, [deck.id]: deckKnown },
    });
  }

  function resetKnown() {
    if (!deck) return;
    const copy = { ...(state.knownByDeck[deck.id] || {}) };
    for (const id of deck.cards.map((c) => c.id)) delete copy[id];
    setState({ ...state, knownByDeck: { ...state.knownByDeck, [deck.id]: copy } });
  }

  // ----- Exporters -----
  function onExport() {
    const data = exportJson(state);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: "flash-cards.json",
    });
    a.click();
    URL.revokeObjectURL(url);
  }

  function onExportCsv() {
    const data = exportCsv(state);
    const blob = new Blob([data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: "flash-cards.csv",
    });
    a.click();
    URL.revokeObjectURL(url);
  }

  // ----- Importers -----
  async function onImport(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const next = importJson(text);
      setState(next);
      alert("Imported JSON!");
    } catch {
      alert("Invalid JSON");
    } finally {
      if (jsonFileRef.current) jsonFileRef.current.value = "";
    }
  }

  async function onImportCsv(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const next = importCsv(text);
      setState(next);
      alert("Imported CSV!");
    } catch (e: any) {
      alert(`Invalid CSV: ${e?.message ?? e}`);
    } finally {
      if (csvFileRef.current) csvFileRef.current.value = "";
    }
  }

  return (
    <div className="min-h-dvh bg-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
          <h1 className="text-lg font-semibold">Flash Cards</h1>

          <nav className="ml-6 flex gap-2">
            <button
              className={`btn ${tab === "study" ? "ring-2 ring-indigo-200" : ""}`}
              onClick={() => setTab("study")}
            >
              Study
            </button>
            <button
              className={`btn ${tab === "manage" ? "ring-2 ring-indigo-200" : ""}`}
              onClick={() => setTab("manage")}
            >
              Manage
            </button>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <select
              className="rounded-lg border"
              value={activeDeck?.id ?? ""}
              onChange={(e) => setActiveDeck(e.target.value)}
            >
              {decks.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            <button className="btn" onClick={addDeck}>New Deck</button>

            {/* <button className="btn" onClick={onExport}>Export JSON</button>
            <button className="btn" onClick={onExportCsv}>Export CSV</button>

            <label className="btn cursor-pointer">
              Import JSON
              <input
                ref={jsonFileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => onImport(e.target.files)}
              />
            </label>

            <label className="btn cursor-pointer">
              Import CSV
              <input
                ref={csvFileRef}
                type="file"
                accept="text/csv,.csv"
                className="hidden"
                onChange={(e) => onImportCsv(e.target.files)}
              />
            </label> */}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6">
        {deck ? (
          <>
            {tab === "study" && (
              <section className="space-y-4">
                <h2 className="text-base font-semibold">Study</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="pill">Deck: {deck.name}</span>
                  <span className="pill">Known: {knownCount}</span>
                  <span className="pill">Total: {deck.cards.length}</span>
                </div>
                <StudyView
                  deck={deck}
                  known={known}
                  onMarkKnown={markKnown}
                  onMarkUnknown={markUnknown}
                  onResetDeck={resetKnown}
                />
              </section>
            )}

            {tab === "manage" && (
              <section className="space-y-4">
                <h2 className="text-base font-semibold">Manage Cards</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="pill">Deck: {deck.name}</span>
                  <span className="pill">Known: {knownCount}</span>
                  <span className="pill">Total: {deck.cards.length}</span>
                </div>
                <BulkAdd deck={deck} onAdd={addCards} />
                <CardList deck={deck} onRemove={removeCard} />
              </section>
            )}
          </>
        ) : (
          <p>No deck selected.</p>
        )}
      </main>
    </div>
  );
}
