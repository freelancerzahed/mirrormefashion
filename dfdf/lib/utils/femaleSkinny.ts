// /lib/utils/femaleSkinny.ts
import * as THREE from "three";
import { calculateTrapezoid } from "./calculateTrapezoid";

interface FemaleSkinnyOptions {
  mesh: THREE.Mesh;
  measurements: {
    headSize?: number;
    neckHeight?: number;
    shoulderWidth?: number;
    shoulderHeight?: number;
    neckShape?: number;
  };
  dict: Record<string, number>;
  debug?: boolean;
}

export function applyFemaleSkinny({
  mesh,
  measurements,
  dict,
  debug = false,
}: FemaleSkinnyOptions) {
  if (!mesh.morphTargetInfluences) return;
  const influences = mesh.morphTargetInfluences;

  const setMorph = (name: string, value: number) => {
    const idx = dict[name];
    if (idx !== undefined) {
      influences[idx] = value;
      if (debug) console.log(`[FemaleSkinny] ${name} → ${value}`);
    } else if (debug) {
      console.warn(`[FemaleSkinny] morph not found: ${name}`);
    }
  };

  // Head size
  setMorph("reconsile_lg_head", (measurements.headSize ?? 0) >= 0.5 ? 1 : 0);

  // Neck height
  let neckLayers = 0;
  switch (measurements.neckHeight) {
    case 0.2: neckLayers = 1.0; break;
    case 0.4: neckLayers = 0.8; break;
    case 0.6: neckLayers = 0.6; break;
    case 0.8: neckLayers = 0.4; break;
    default: neckLayers = 0.0;
  }
  setMorph("neck_layers", neckLayers);

  // Trapezoid (depends on multiple sliders)
  const trapezoid = calculateTrapezoid(
    measurements.shoulderWidth ?? 0,
    measurements.shoulderHeight ?? 0,
    measurements.neckShape ?? 0
  );
  setMorph("trapezoid", trapezoid);
}
