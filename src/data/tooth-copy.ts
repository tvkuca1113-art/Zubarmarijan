/**
 * Patient-facing copy for the three states. Educational illustration only: it
 * describes what the model shows in general terms and always points back to an
 * examination, never to a promised outcome.
 */
export interface ToothState {
  id: string;
  label: string;
  /** Announced when the state changes. */
  announce: string;
  heading: string;
  body: string;
  link: { href: string; text: string };
}

export const TOOTH_STATES: ToothState[] = [
  {
    id: 'verstehen',
    label: 'Verstehen',
    announce: 'Verstehen: der vollständige Zahn.',
    heading: 'Jeder Befund beginnt mit Ansehen.',
    body:
      'Form, Oberfläche und Zahnfleischrand sagen viel über einen Zahn. Bei der Untersuchung ' +
      'schauen wir gemeinsam darauf, und Sie erfahren, was zu sehen ist. Was daraus folgt, ' +
      'besprechen wir danach in Ruhe.',
    link: { href: '/behandlungen/', text: 'Zur Untersuchung & Beratung' },
  },
  {
    id: 'vorsorgen',
    label: 'Vorsorgen',
    announce: 'Vorsorgen: Blick auf die Kaufläche.',
    heading: 'Sauber wird es dort, wo Sie nicht hinkommen.',
    body:
      'Beläge sammeln sich in den Fissuren der Kaufläche, am Zahnfleischrand und zwischen den ' +
      'Zähnen. Die professionelle Zahnreinigung entfernt sie gezielt. In welchem Abstand das ' +
      'sinnvoll ist, hängt vom Befund ab.',
    link: { href: '/professionelle-zahnreinigung-muenchen/', text: 'Zur Zahnreinigung' },
  },
  {
    id: 'erhalten',
    label: 'Erhalten',
    announce: 'Erhalten: Krone über dem beschliffenen Zahn.',
    heading: 'Wenn viel fehlt, schützt eine Krone den Rest.',
    body:
      'Ist ein Zahn stark zerstört, wird er beschliffen und mit einer Krone versorgt. Die ' +
      'Darstellung zeigt, wie die Krone auf den Stumpf gesetzt wird. Ob das in Ihrem Fall ' +
      'infrage kommt, ergibt die Untersuchung.',
    link: { href: '/kronen-bruecken-muenchen/', text: 'Zu Kronen & Brücken' },
  },
];
