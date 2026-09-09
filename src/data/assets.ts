/**
 * The five image slots of the concept.
 *
 * Each slot names the source file the practice (or the project owner) drops into
 * `public/images/source/`. `npm run assets` then generates responsive AVIF/WebP/JPEG
 * derivatives and writes `src/data/asset-manifest.json`.
 *
 * Until a source file exists, the <Figure> component renders a designed plate at
 * exactly the same aspect ratio, so the layout is identical with and without the
 * photograph and nothing shifts when the real image arrives.
 */

export type Provenance =
  | 'ai-illustration'
  | 'retouched-practice-post'
  | 'pending';

export interface ImageSlot {
  key: string;
  /** Base filename (without extension) expected in public/images/source/. */
  file: string;
  /** Intrinsic aspect ratio the layout reserves. */
  ratio: [number, number];
  /** German alt text. Descriptive, not keyword-stuffed. */
  alt: string;
  /** Widths generated for srcset. */
  widths: number[];
  /** `sizes` attribute for responsive delivery. */
  sizes: string;
  provenance: Provenance;
  provenanceNote: string;
  /** Visible caption, where the composition calls for one. */
  caption?: string;
  /** Plate styling used while no source file is present. */
  plate: 'portrait' | 'light' | 'instrument' | 'dark' | 'door';
  /** Short label shown on the plate. */
  plateLabel: string;
  /** true = above the fold, loaded eagerly with high priority. */
  priority?: boolean;
}

export const IMAGE_SLOTS: Record<string, ImageSlot> = {
  portrait: {
    key: 'portrait',
    file: 'doctor-portrait',
    ratio: [4, 5],
    alt: 'Dr. Hrvoje Marijan in grauer Praxiskleidung, neben einem weißen Schrank vor Holzfenstern.',
    widths: [420, 640, 860, 1100],
    sizes: '(max-width: 900px) 92vw, 40vw',
    provenance: 'retouched-practice-post',
    provenanceNote:
      'KI-retuschierter Ausschnitt aus einem öffentlichen Praxis-Post, mit rekonstruierten Bildbereichen. Demo-Asset, Freigabe der Praxis steht aus.',
    plate: 'portrait',
    plateLabel: 'Porträt',
    priority: true,
  },
  welcome: {
    key: 'welcome',
    file: 'welcome-conversation',
    ratio: [3, 2],
    alt: 'Lächelnde Frau mit braunen Haaren in grauem Strickpullover vor hellem Hintergrund.',
    widths: [560, 900, 1200, 1600],
    sizes: '(max-width: 900px) 94vw, 52vw',
    provenance: 'ai-illustration',
    provenanceNote:
      'KI-generierte Illustration. Zeigt keine Patientin der Praxis und kein Behandlungsergebnis.',
    plate: 'light',
    plateLabel: 'Gespräch',
  },
  stillLife: {
    key: 'stillLife',
    file: 'cleaning-still-life',
    ratio: [1, 1],
    alt: 'Zahnärztlicher Mundspiegel und elfenbeinfarbene Zahnbürste auf einem gefalteten weißen Handtuch.',
    widths: [420, 640, 900],
    sizes: '(max-width: 900px) 88vw, 34vw',
    provenance: 'ai-illustration',
    provenanceNote:
      'KI-generiertes Stillleben. Illustration, kein Beleg für die tatsächliche Ausstattung der Praxis.',
    plate: 'instrument',
    plateLabel: 'Prophylaxe',
  },
  crown: {
    key: 'crown',
    file: 'ceramic-crown',
    ratio: [4, 3],
    alt: 'Keramische Krone für einen Backenzahn auf einem dunklen Sockel.',
    widths: [520, 800, 1100],
    sizes: '(max-width: 900px) 90vw, 44vw',
    provenance: 'ai-illustration',
    provenanceNote:
      'KI-generierte Illustration eines keramischen Zahnersatzes. Kein dokumentierter Patientenfall und keine in der Praxis gefertigte Arbeit.',
    plate: 'dark',
    plateLabel: 'Zahnersatz',
  },
  entrance: {
    key: 'entrance',
    file: 'practice-entrance',
    ratio: [3, 2],
    alt: 'Dunkle Eingangstür des Hauses Kapuzinerstraße 11 mit blauem Hausnummernschild.',
    widths: [560, 900, 1200],
    sizes: '(max-width: 900px) 94vw, 46vw',
    provenance: 'retouched-practice-post',
    provenanceNote:
      'KI-retuschiertes Bild aus einem öffentlichen Praxis-Post, mit rekonstruierten Bildbereichen. Demo-Asset, Freigabe der Praxis steht aus.',
    plate: 'door',
    plateLabel: 'Eingang',
  },
};

/**
 * The BODY STREET landmark comes from a practice post and could not be
 * independently confirmed for 2026. It therefore stays out of the patient-facing
 * arrival information until the practice confirms it. Flip to true after that
 * confirmation and the caption appears under the entrance photograph.
 */
export const BODY_STREET_LANDMARK_CONFIRMED = false;
export const BODY_STREET_CAPTION =
  'Unser Eingang: Kapuzinerstraße 11, direkt neben BODY STREET.';
