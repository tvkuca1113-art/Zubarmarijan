/**
 * The three states of "Ein Zahn. Drei Perspektiven."
 *
 * Shared by the interactive scene and by scripts/render-tooth-poster.mjs, so the
 * static poster is framed exactly like the first state of the live scene.
 *
 * Camera positions are spherical around the model: azimuth and elevation in
 * radians, distance in model units, plus the height the camera looks at.
 */
export const TOOTH_VIEWS = {
  verstehen: {
    id: 'verstehen',
    label: 'Verstehen',
    camera: { azimuth: 0.62, elevation: 0.15, distance: 2.95, targetY: -0.08 },
    show: ['zahn_intakt'],
  },
  vorsorgen: {
    id: 'vorsorgen',
    label: 'Vorsorgen',
    camera: { azimuth: 0.34, elevation: 0.78, distance: 2.30, targetY: 0.02 },
    show: ['zahn_intakt'],
  },
  erhalten: {
    id: 'erhalten',
    label: 'Erhalten',
    camera: { azimuth: 1.02, elevation: 0.20, distance: 2.62, targetY: -0.02 },
    show: ['zahn_praepariert', 'krone'],
    /** The crown lifts clear of the stump and settles back. */
    crownLift: 0.30,
  },
};

export const TOOTH_VIEW_ORDER = ['verstehen', 'vorsorgen', 'erhalten'];

/** Spherical camera position for a view. */
export function cameraPosition({ azimuth, elevation, distance }) {
  return [
    Math.sin(azimuth) * Math.cos(elevation) * distance,
    Math.sin(elevation) * distance,
    Math.cos(azimuth) * Math.cos(elevation) * distance,
  ];
}

/**
 * Lighting for the scene, shared with the poster renderer so the static image
 * and the live canvas are lit identically. The soft room environment supplies
 * ambient bounce; the two directionals carry the modelling.
 */
export const SCENE_LIGHT = {
  exposure: 0.88,
  environmentIntensity: 0.20,
  key: { color: 0xfff1de, intensity: 3.10, position: [2.4, 2.9, 2.5] },
  rim: { color: 0xc4dcee, intensity: 1.95, position: [-2.0, 1.0, -2.5] },
  fill: { color: 0x8fa9bd, intensity: 0.55, position: [-2.3, -1.5, 1.5] },
};
