/**
 * The five image slots of the concept.
 *
 * Each slot names the source file the practice (or the project owner) drops into
 * `vendor/images/` (masters, never served). `npm run assets` then generates AVIF/WebP/JPEG
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
  /** Base filename (without extension) expected in vendor/images/. */
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
    widths: [420, 640, 900, 1122],
    sizes: '(max-width: 60rem) 92vw, 26rem',
    provenance: 'retouched-practice-post',
    provenanceNote:
      'KI-retuschierter Ausschnitt aus einem öffentlichen Praxis-Post, mit rekonstruierten Bildbereichen. Demo-Asset, Freigabe der Praxis steht aus.',
    plate: 'portrait',
    plateLabel: 'Porträt',
    priority: true,
  },
  /**
   * Retired from the site in the 2026-09 redesign: an anonymous smiling face is
   * not evidence about this practice. The file stays for reference only.
   */
  welcome: {
    key: 'welcome',
    file: 'welcome-conversation',
    ratio: [3, 2],
    alt: 'Lächelnde Frau mit dunklen Haaren in dunkelgrauem Strickpullover vor einer hellen Wand.',
    widths: [560, 900, 1200, 1536],
    sizes: '(max-width: 60rem) 94vw, 52vw',
    provenance: 'ai-illustration',
    provenanceNote:
      'KI-generierte Illustration. Zeigt keine Patientin der Praxis und kein Behandlungsergebnis.',
    plate: 'light',
    plateLabel: 'Gespräch',
  },
  stillLife: {
    key: 'stillLife',
    file: 'cleaning-still-life',
    ratio: [4, 5],
    alt: 'Zahnärztlicher Mundspiegel und elfenbeinfarbene Zahnbürste auf einem gefalteten weißen Handtuch, auf blaugrauem Untergrund.',
    widths: [420, 640, 900, 1122],
    sizes: '(max-width: 56rem) 88vw, 22rem',
    provenance: 'ai-illustration',
    provenanceNote:
      'KI-generiertes Stillleben. Illustration, kein Beleg für die tatsächliche Ausstattung der Praxis.',
    plate: 'instrument',
    plateLabel: 'Prophylaxe',
  },
  /**
   * Retired from the site in the 2026-09 redesign: the interactive tooth section
   * explains crowns instead. The file stays for reference only.
   */
  crown: {
    key: 'crown',
    file: 'ceramic-crown',
    ratio: [3, 2],
    alt: 'Keramische Krone für einen Backenzahn auf einem runden Steinsockel vor dunklem Hintergrund.',
    widths: [520, 800, 1100, 1536],
    sizes: '(max-width: 60rem) 90vw, 44vw',
    provenance: 'ai-illustration',
    provenanceNote:
      'KI-generierte Illustration eines keramischen Zahnersatzes. Kein dokumentierter Patientenfall und keine in der Praxis gefertigte Arbeit.',
    plate: 'dark',
    plateLabel: 'Zahnersatz',
  },
  entrance: {
    key: 'entrance',
    file: 'practice-entrance',
    ratio: [4, 5],
    alt: 'Dunkle zweiflügelige Eingangstür des Hauses Kapuzinerstraße 11, daneben das blaue Hausnummernschild und das Schaufenster des Nachbarbetriebs.',
    widths: [420, 640, 900, 1122],
    sizes: '(max-width: 60rem) 94vw, 26rem',
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
