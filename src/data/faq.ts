export interface FaqItem {
  q: string;
  a: string[];
}

/** Six practical questions. Each answer stays inside what can be said reliably. */
export const HOME_FAQ: FaqItem[] = [
  {
    q: 'Wie vereinbare ich einen Termin?',
    a: [
      'Telefonisch unter 089 537901. Nennen Sie kurz Ihr Anliegen – Kontrolle, Beschwerden, Zahnreinigung oder Beratung zu Zahnersatz. Danach richtet sich, wie viel Zeit eingeplant wird.',
    ],
  },
  {
    q: 'Ich bin neu in der Praxis. Was sollte ich mitbringen?',
    a: [
      'Ihre Versichertenkarte und eine Liste der Medikamente, die Sie einnehmen. Hilfreich sind außerdem Hinweise auf Allergien oder Vorerkrankungen.',
      'Wenn Sie zuvor woanders in Behandlung waren, bringen Sie vorhandene Unterlagen gerne mit.',
    ],
  },
  {
    q: 'Was kostet eine Behandlung?',
    a: [
      'Was eine Behandlung kostet, hängt vom Befund und von der gewählten Versorgung ab. Eine belastbare Zahl gibt es deshalb erst nach der Untersuchung.',
      'Bei Zahnersatz wird vorab ein Heil- und Kostenplan erstellt, den Sie bei Ihrer Krankenkasse einreichen.',
    ],
  },
  {
    q: 'Werden gesetzlich Versicherte behandelt?',
    a: [
      'Nach den öffentlichen Praxisverzeichnissen werden gesetzlich und privat Versicherte behandelt. Bestätigen Sie Ihren Versicherungsstatus bitte kurz bei Ihrem Anruf.',
    ],
  },
  {
    q: 'Kann ich auf Bosnisch, Kroatisch oder Serbisch sprechen?',
    a: [
      'Die wichtigsten Angaben zur Praxis finden Sie auf einer eigenen Seite auf Bosnisch, Kroatisch und Serbisch.',
      'Ob auch das Gespräch in der Praxis auf BKS möglich ist, fragen Sie bitte kurz am Telefon.',
    ],
  },
  {
    q: 'Wie finde ich die Praxis?',
    a: [
      'Kapuzinerstraße 11 in der Ludwigsvorstadt-Isarvorstadt, südlich der Innenstadt. Der Eingang trägt das blaue Hausnummernschild.',
      'Für die Route öffnet der Link auf der Kontaktseite Google Maps in einem neuen Tab.',
    ],
  },
];
