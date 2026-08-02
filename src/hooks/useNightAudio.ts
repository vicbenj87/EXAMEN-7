import { useCallback, useRef, useState } from "react";

/**
 * Motor de audio 100% sintetizado (Web Audio API).
 * No depende de archivos externos: genera una atmósfera nocturna relajante
 * (pad suave + "viento"/grillos + campanitas aleatorias) y efectos de
 * sonido para clics, respuestas correctas/incorrectas y fin de examen.
 */
export function useNightAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const ambientNodesRef = useRef<{ stop: () => void } | null>(null);
  const chimeIntervalRef = useRef<number | null>(null);
  const [ambientOn, setAmbientOn] = useState(false);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new Ctx();
      masterGainRef.current = ctxRef.current.createGain();
      masterGainRef.current.gain.value = 0.5;
      masterGainRef.current.connect(ctxRef.current.destination);
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  // ---------- Efectos de sonido cortos ----------
  const playTone = useCallback(
    (freqs: number[], duration: number, type: OscillatorType = "sine", volume = 0.15, delayStep = 0.09) => {
      const ctx = getCtx();
      const master = masterGainRef.current!;
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        const start = ctx.currentTime + i * delayStep;
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(volume, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
        osc.connect(gain).connect(master);
        osc.start(start);
        osc.stop(start + duration + 0.05);
      });
    },
    [getCtx]
  );

  const playClick = useCallback(() => playTone([520], 0.12, "triangle", 0.08), [playTone]);
  const playSelect = useCallback(() => playTone([440, 660], 0.25, "sine", 0.1), [playTone]);
  const playCorrect = useCallback(
    () => playTone([523.25, 659.25, 783.99, 1046.5], 0.5, "sine", 0.12),
    [playTone]
  );
  const playWrong = useCallback(() => playTone([311.13, 233.08], 0.5, "sine", 0.12, 0.12), [playTone]);
  const playComplete = useCallback(
    () => playTone([392, 523.25, 659.25, 783.99, 1046.5], 0.9, "triangle", 0.13, 0.14),
    [playTone]
  );

  // ---------- Ambiente nocturno continuo ----------
  const startAmbient = useCallback(() => {
    if (ambientNodesRef.current) return;
    const ctx = getCtx();
    const master = masterGainRef.current!;

    const ambientBus = ctx.createGain();
    ambientBus.gain.value = 0.0001;
    ambientBus.connect(master);
    ambientBus.gain.linearRampToValueAtTime(1, ctx.currentTime + 3);

    // --- Pad de fondo (drone suave, acorde nocturno) ---
    const padFreqs = [130.81, 164.81, 196.0, 261.63]; // C3 E3 G3 C4
    const padOscillators: OscillatorNode[] = [];
    const padGain = ctx.createGain();
    padGain.gain.value = 0.05;
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = "lowpass";
    padFilter.frequency.value = 800;

    padFreqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      osc.detune.value = idx % 2 === 0 ? -4 : 4;
      osc.connect(padGain);
      osc.start();
      padOscillators.push(osc);
    });

    // LFO que hace "respirar" el pad
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.025;
    lfo.connect(lfoGain).connect(padGain.gain);
    lfo.start();

    padGain.connect(padFilter).connect(ambientBus);

    // --- Textura tipo "viento nocturno" (ruido filtrado) ---
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 500;
    noiseFilter.Q.value = 0.6;

    const noiseLfo = ctx.createOscillator();
    noiseLfo.frequency.value = 0.05;
    const noiseLfoGain = ctx.createGain();
    noiseLfoGain.gain.value = 250;
    noiseLfo.connect(noiseLfoGain).connect(noiseFilter.frequency);
    noiseLfo.start();

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.02;

    noiseSource.connect(noiseFilter).connect(noiseGain).connect(ambientBus);
    noiseSource.start();

    // --- Campanitas aleatorias tipo "wind chimes" (escala pentatónica) ---
    const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 987.77, 1046.5];
    const chimeInterval = window.setInterval(() => {
      if (Math.random() > 0.45) {
        const freq = scale[Math.floor(Math.random() * scale.length)];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        const t = ctx.currentTime;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.05, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
        osc.connect(gain).connect(ambientBus);
        osc.start(t);
        osc.stop(t + 2.3);
      }
    }, 2600);
    chimeIntervalRef.current = chimeInterval;

    ambientNodesRef.current = {
      stop: () => {
        const t = ctx.currentTime;
        ambientBus.gain.cancelScheduledValues(t);
        ambientBus.gain.setValueAtTime(ambientBus.gain.value, t);
        ambientBus.gain.linearRampToValueAtTime(0.0001, t + 1.2);
        window.setTimeout(() => {
          padOscillators.forEach((o) => o.stop());
          lfo.stop();
          noiseLfo.stop();
          noiseSource.stop();
          if (chimeIntervalRef.current) {
            window.clearInterval(chimeIntervalRef.current);
            chimeIntervalRef.current = null;
          }
        }, 1300);
      },
    };

    setAmbientOn(true);
  }, [getCtx]);

  const stopAmbient = useCallback(() => {
    ambientNodesRef.current?.stop();
    ambientNodesRef.current = null;
    setAmbientOn(false);
  }, []);

  const toggleAmbient = useCallback(() => {
    if (ambientOn) stopAmbient();
    else startAmbient();
  }, [ambientOn, startAmbient, stopAmbient]);

  return {
    ambientOn,
    toggleAmbient,
    playClick,
    playSelect,
    playCorrect,
    playWrong,
    playComplete,
  };
}
