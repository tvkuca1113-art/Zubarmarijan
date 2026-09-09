/**
 * Single source of truth for every business fact used on the site.
 *
 * Rule for this file: a value only lands here when a public source supports it.
 * Anything unverified belongs in `openQuestions` and must never be rendered as
 * a statement of fact. See docs/EVIDENCE.md for the full ledger.
 */

export type Confidence = 'high' | 'medium' | 'low';

export interface EvidenceItem {
  /** The claim, phrased exactly as strongly as the sources allow. */
  fact: string;
  sources: string[];
  verified: string;
  confidence: Confidence;
  /** false = must not appear in patient-facing copy yet. */
  approvedForDisplay: boolean;
  note?: string;
}

/** Private demo flag. Flipping this to true is a deliberate launch decision. */
export const PUBLIC_LAUNCH = false;

/** Only set once the practice approves a real domain. Used for canonical/sitemap. */
export const SITE_ORIGIN: string | null = null;

export const PRACTICE = {
  doctor: 'Dr. Hrvoje Marijan',
  /** Directory listings additionally carry the form "Dr. med. dent." - see ledger. */
  practiceName: 'Praxis Dr. Hrvoje Marijan Zahnarzt',
  profession: 'Zahnarzt',
  street: 'Kapuzinerstraße 11',
  postalCode: '80337',
  city: 'München',
  district: 'Ludwigsvorstadt-Isarvorstadt',
  country: 'Deutschland',
  phoneDisplay: '089 537901',
  phoneHref: 'tel:+4989537901',
  phoneInternational: '+49 89 537901',
  instagram: 'https://www.instagram.com/zubaruminhenu/',
  instagramHandle: '@zubaruminhenu',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Kapuzinerstra%C3%9Fe+11%2C+80337+M%C3%BCnchen',
  emergencyUrl: 'https://www.kzvb.de/patient/notdienst-dental-emergency',
} as const;

export const ADDRESS_ONE_LINE = `${PRACTICE.street}, ${PRACTICE.postalCode} ${PRACTICE.city}`;

/** Verified facts, ordered roughly by how prominently they are used. */
export const EVIDENCE: EvidenceItem[] = [
  {
    fact: 'Dr. Hrvoje Marijan ist als Zahnarzt in München gelistet.',
    sources: [
      'https://www.jameda.de/hrvoje-marijan/zahnarzt/muenchen',
      'https://www.aerzte.de/muenchen/bayern/zahnarzt/dr-med-dent-hrvoje-marijan',
    ],
    verified: '2026-09-09',
    confidence: 'high',
    approvedForDisplay: true,
  },
  {
    fact: 'Praxisbezeichnung: „Praxis Dr. Hrvoje Marijan Zahnarzt".',
    sources: [
      'https://www.jameda.de/hrvoje-marijan/zahnarzt/muenchen',
      'https://www.aerzte.de/muenchen/bayern/zahnarzt/dr-med-dent-hrvoje-marijan',
    ],
    verified: '2026-09-09',
    confidence: 'high',
    approvedForDisplay: true,
    note: 'Auf beiden Verzeichnissen wortgleich.',
  },
  {
    fact: 'Anschrift: Kapuzinerstraße 11, 80337 München.',
    sources: [
      'https://www.jameda.de/hrvoje-marijan/zahnarzt/muenchen',
      'https://www.aerzte.de/muenchen/bayern/zahnarzt/dr-med-dent-hrvoje-marijan',
    ],
    verified: '2026-09-09',
    confidence: 'high',
    approvedForDisplay: true,
    note: 'Jameda schreibt „Kapuzinerstr. 11", ärzte.de ebenfalls abgekürzt.',
  },
  {
    fact: 'Stadtbezirk: Ludwigsvorstadt-Isarvorstadt.',
    sources: ['https://www.jameda.de/hrvoje-marijan/zahnarzt/muenchen'],
    verified: '2026-09-09',
    confidence: 'high',
    approvedForDisplay: true,
    note: 'Jameda nennt den Bezirk direkt unter der Adresse.',
  },
  {
    fact: 'Telefonnummer: 089 537901.',
    sources: [
      'https://www.jameda.de/hrvoje-marijan/zahnarzt/muenchen',
      'https://www.aerzte.de/muenchen/bayern/zahnarzt/dr-med-dent-hrvoje-marijan',
    ],
    verified: '2026-09-09',
    confidence: 'high',
    approvedForDisplay: true,
    note: 'Nicht angerufen. Die Nummer wurde ausschließlich aus den Verzeichnissen übernommen.',
  },
  {
    fact: 'Gesetzlich und privat Versicherte werden laut Verzeichnisangabe behandelt.',
    sources: [
      'https://www.jameda.de/hrvoje-marijan/zahnarzt/muenchen',
      'https://www.aerzte.de/muenchen/bayern/zahnarzt/dr-med-dent-hrvoje-marijan',
    ],
    verified: '2026-09-09',
    confidence: 'medium',
    approvedForDisplay: true,
    note:
      'Jameda-FAQ: „Gesetzlich versichert, Privat versichert". ärzte.de: „Versicherungsart: Alle". ' +
      'Verzeichnisangabe, keine Praxisaussage - auf der Website entsprechend zurückhaltend formuliert.',
  },
  {
    fact: 'Über Jameda besteht für diesen Standort keine Online-Terminbuchung.',
    sources: ['https://www.jameda.de/hrvoje-marijan/zahnarzt/muenchen'],
    verified: '2026-09-09',
    confidence: 'high',
    approvedForDisplay: true,
    note:
      'Wörtlich: „Dr. Hrvoje Marijan bietet an diesem Standort über Jameda keine Online-Terminbuchung an." ' +
      'Das schließt andere Buchungssysteme nicht aus - deshalb sagt die Website nur, dass Termine telefonisch vereinbart werden.',
  },
  {
    fact: 'Auf Jameda liegen keine Patientenbewertungen vor.',
    sources: ['https://www.jameda.de/hrvoje-marijan/zahnarzt/muenchen'],
    verified: '2026-09-09',
    confidence: 'high',
    approvedForDisplay: false,
    note: 'Grund, warum die Website keinerlei Bewertungen, Sterne oder Zahlen zeigt.',
  },
  {
    fact: 'Behandlungsschwerpunkte laut öffentlichem Praxisprofil: Untersuchung und Behandlung, Kronen und Brücken, Zahnentfernung, professionelle Zahnreinigung.',
    sources: ['https://www.instagram.com/zubaruminhenu/'],
    verified: '2026-09-09',
    confidence: 'medium',
    approvedForDisplay: true,
    note:
      'Vom Projektinhaber aus dem öffentlichen Praxisprofil übergeben. Instagram war aus dieser Umgebung nur ' +
      'hinter der Anmeldeschranke erreichbar (HTTP 429 -> /accounts/login), daher nicht unabhängig eingesehen.',
  },
  {
    fact: 'Der Instagram-Auftritt der Praxis veröffentlicht auch auf Bosnisch/Kroatisch/Serbisch.',
    sources: ['https://www.instagram.com/zubaruminhenu/'],
    verified: '2026-09-09',
    confidence: 'medium',
    approvedForDisplay: true,
    note:
      'Sprachsignal des Kanals, inklusive Anzeigename „Zubar München". Daraus folgt KEINE Aussage darüber, ' +
      'welche Sprache im Behandlungszimmer gesprochen wird - die Website formuliert das entsprechend.',
  },
];

/** Everything the practice still has to confirm. Rendered on /hinweise/. */
export const OPEN_QUESTIONS: string[] = [
  'Aktuelle Sprechzeiten',
  'Offizielle E-Mail-Adresse für Patientenanfragen',
  'Ob und über welchen Anbieter eine Online-Terminbuchung besteht',
  'Ob die Praxisnummer für Nachrichtendienste wie WhatsApp genutzt wird',
  'Werdegang, Ausbildung und Tätigkeitsschwerpunkte von Dr. Marijan',
  'Team der Praxis',
  'Welche Sprachen im Patientengespräch tatsächlich angeboten werden',
  'Barrierefreiheit des Gebäudes und Parkmöglichkeiten',
  'Ob BODY STREET als Orientierungspunkt am Eingang weiterhin zutrifft',
  'Vollständiges Leistungsverzeichnis über die vier bestätigten Bereiche hinaus',
  'Impressum, Datenschutzerklärung, Kammer- und Berufsangaben',
  'Freigabe der Bildrechte und Lieferung eigener Praxisfotos',
  'Fachliche Freigabe aller medizinischen Texte',
  'Die tatsächliche Domain für einen öffentlichen Launch',
];
