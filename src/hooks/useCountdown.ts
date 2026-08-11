import { useEffect, useRef, useState } from "react";

/**
 * Cuenta regresiva reiniciable. `resetKey` reinicia el conteo cuando cambia.
 * `active` controla si el conteo avanza (se pausa durante la retroalimentación).
 */
export function useCountdown(
  durationMs: number,
  active: boolean,
  onComplete: () => void,
  resetKey: unknown,
) {
  const [remaining, setRemaining] = useState(durationMs);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const firedRef = useRef(false);

  useEffect(() => {
    setRemaining(durationMs);
    firedRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, durationMs]);

  useEffect(() => {
    if (!active) return undefined;

    const start = Date.now();
    const initial = durationMs;

    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.max(0, initial - elapsed);
      setRemaining(next);
      if (next <= 0 && !firedRef.current) {
        firedRef.current = true;
        clearInterval(id);
        onCompleteRef.current();
      }
    }, 100);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, resetKey, durationMs]);

  return remaining;
}
