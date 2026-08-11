import { useMemo, useState } from "react";
import type { MapDragQuestion as MDQ } from "@/types/exam";
import { shuffleArray } from "@/utils/shuffle";

interface Props {
  question: MDQ;
  locked: boolean;
  onSubmit: (placements: Record<string, string>) => void;
}

export default function MapDragQuestion({ question, locked, onSubmit }: Props) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const chipsShuffled = useMemo(() => shuffleArray(question.chips), [question.chips]);

  const placedChipIds = new Set(Object.values(placements));
  const pool = chipsShuffled.filter((c) => !placedChipIds.has(c.id));
  const allPlaced = Object.keys(placements).length === question.zones.length;

  const labelOf = (chipId: string) => question.chips.find((c) => c.id === chipId)?.label ?? "";

  const placeChip = (zoneId: string, chipId: string) => {
    setPlacements((prev) => {
      const next = { ...prev };
      // quita el chip de cualquier otra zona donde estuviera
      for (const zid of Object.keys(next)) {
        if (next[zid] === chipId) delete next[zid];
      }
      next[zoneId] = chipId;
      return next;
    });
    setSelectedChip(null);
  };

  const clearZone = (zoneId: string) => {
    setPlacements((prev) => {
      const next = { ...prev };
      delete next[zoneId];
      return next;
    });
  };

  const handleZoneClick = (zoneId: string) => {
    if (locked) return;
    if (selectedChip) {
      placeChip(zoneId, selectedChip);
    } else if (placements[zoneId]) {
      clearZone(zoneId);
    }
  };

  return (
    <div className="space-y-5">
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-indigo-300/30 bg-cover bg-center shadow-inner"
        style={{ backgroundImage: "url(/images/map-bg.jpg)" }}
      >
        <div className="absolute inset-0 bg-indigo-950/10" />
        {question.zones.map((zone, i) => {
          const chipId = placements[zone.id];
          return (
            <button
              key={zone.id}
              type="button"
              disabled={locked}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData("text/plain");
                if (id) placeChip(zone.id, id);
              }}
              onClick={() => handleZoneClick(zone.id)}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-full border-2 border-dashed px-2 py-1 text-center transition disabled:cursor-not-allowed ${
                chipId
                  ? "border-emerald-300 bg-emerald-500/20"
                  : "border-indigo-200/70 bg-indigo-900/40 hover:bg-indigo-800/60"
              }`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-indigo-900">
                {i + 1}
              </span>
              <span className="max-w-[6.5rem] text-[11px] font-semibold leading-tight text-white drop-shadow">
                {chipId ? labelOf(chipId) : "…"}
              </span>
            </button>
          );
        })}
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-200/70">
          Regiones disponibles (toca o arrastra)
        </p>
        <div className="flex flex-wrap gap-2">
          {pool.length === 0 && (
            <span className="text-sm italic text-indigo-300/60">Todas las regiones han sido ubicadas.</span>
          )}
          {pool.map((chip) => (
            <button
              key={chip.id}
              type="button"
              draggable={!locked}
              disabled={locked}
              onDragStart={(e) => e.dataTransfer.setData("text/plain", chip.id)}
              onClick={() => setSelectedChip((cur) => (cur === chip.id ? null : chip.id))}
              className={`cursor-grab rounded-full border px-4 py-2 text-sm font-semibold transition active:cursor-grabbing disabled:cursor-not-allowed ${
                selectedChip === chip.id
                  ? "border-fuchsia-300 bg-fuchsia-500/30 text-white"
                  : "border-indigo-300/40 bg-indigo-900/50 text-indigo-100 hover:bg-indigo-800/60"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        disabled={locked || !allPlaced}
        onClick={() => onSubmit(placements)}
        className="rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Comprobar mapa
      </button>
    </div>
  );
}
