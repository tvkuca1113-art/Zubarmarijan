export interface FaqItem {
  q: string;
  a: string[];
}

/** Homepage FAQ. Every answer stays inside what the sources actually support. */
export const HOME_FAQ: FaqItem[] = [
  {
    q: 'Wie vereinbare ich einen Termin?',
    a: [
      'Telefonisch unter 089 537901. Ein Anruf ist der verlässlichste Weg, weil sich freie Zeiten kurzfristig ändern und am Telefon gleich geklärt werden kann, wie viel Zeit Ihr Anliegen braucht.',
      'Ob darüber hinaus eine Online-Terminbuchung besteht, ist für diesen Entwurf nicht bestätigt. Deshalb führt jede Terminschaltfläche auf dieser Website zum Telefon und nicht zu einem Kalender.',
    ],
  },
  {
    q: 'Wann ist die Praxis erreichbar?',
    a: [
      'Die aktuellen Sprechzeiten liegen für diesen Entwurf nicht bestätigt vor. Wir nennen hier bewusst keine Zeiten, die falsch sein könnten.',
      'Rufen Sie bitte unter 089 537901 an – dort erfahren Sie die aktuellen Zeiten verlässlich.',
    ],
  },
  {
    q: 'Werden gesetzlich Versicherte behandelt?',
    a: [
      'Nach den öffentlichen Praxisverzeichnissen werden sowohl gesetzlich als auch privat Versicherte behandelt.',
      'Diese Angabe stammt aus Verzeichniseinträgen, nicht aus einer Mitteilung der Praxis. Bitte bestätigen Sie Ihren Versicherungsstatus kurz bei Ihrem Anruf.',
    ],
  },
  {
    q: 'Ich habe akute Schmerzen. Was tun?',
    a: [
      'Rufen Sie zuerst in der Praxis an und schildern Sie kurz, worum es geht. So lässt sich am schnellsten einschätzen, was möglich ist.',
      'Außerhalb der Sprechzeiten hilft der zahnärztliche Notdienst der Kassenzahnärztlichen Vereinigung Bayerns weiter. Diese Praxis betreibt keinen eigenen Notdienst.',
    ],
  },
  {
    q: 'Kann ich auf Bosnisch, Kroatisch oder Serbisch sprechen?',
    a: [
      'Der Instagram-Auftritt der Praxis veröffentlicht auch auf Bosnisch/Kroatisch/Serbisch. Daraus folgt allerdings nicht, welche Sprache im Behandlungszimmer angeboten wird.',
      'Fragen Sie das bitte kurz am Telefon. Eine Zusammenfassung der wichtigsten Angaben auf BKS finden Sie auf der Seite „Informacije".',
    ],
  },
  {
    q: 'Was kostet eine Behandlung?',
    a: [
      'Diese Website nennt keine Preise. Was eine Behandlung kostet, hängt vom Befund, vom Umfang und von Ihrem Versicherungsstatus ab.',
      'Bei Zahnersatz wird vorab ein Heil- und Kostenplan erstellt, den Sie bei Ihrer Krankenkasse einreichen. Besprechen Sie die Kosten bitte direkt in der Praxis.',
    ],
  },
];
