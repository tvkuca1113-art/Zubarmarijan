/**
 * Treatment content.
 *
 * The four categories are the ones the public practice profile supports. Nothing
 * beyond them is offered, described or hinted at anywhere on the site.
 *
 * Medical background is written in our own words from the patient information of
 * the Kassenzahnärztliche Bundesvereinigung (KZBV). It is general information,
 * never a description of this practice's own protocol, and never a promise.
 */

export interface TreatmentSection {
  heading: string;
  paragraphs: string[];
}

export interface Treatment {
  slug: string;
  /** Short label for navigation and the selector. */
  nav: string;
  /** Full display title. */
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** One sentence used on the overview and in the selector. */
  teaser: string;
  /** Two or three words, used as a section eyebrow. */
  kicker: string;
  intro: string[];
  sections: TreatmentSection[];
  /** Questions a patient may want to raise in the appointment. */
  discuss: string[];
  /** Points only the practice itself can answer. */
  clarify: string[];
  sources: { label: string; url: string }[];
  /** Which image slot, if any, illustrates this treatment. */
  imageSlot?: string;
}

export const TREATMENTS: Treatment[] = [
  {
    slug: 'behandlungen',
    nav: 'Untersuchung & Beratung',
    title: 'Untersuchung & Beratung',
    h1: 'Untersuchung & Beratung',
    metaTitle: 'Untersuchung & Beratung – Zahnarzt München Isarvorstadt',
    metaDescription:
      'Was bei einer zahnärztlichen Untersuchung allgemein besprochen wird und welche Fragen Sie im Gespräch klären können. Praxis Dr. Hrvoje Marijan, Kapuzinerstraße 11, München.',
    teaser:
      'Der Ausgangspunkt für alles Weitere: sehen, wie es um Zähne und Zahnfleisch steht, und in Ruhe besprechen, was daraus folgt.',
    kicker: 'Der erste Schritt',
    intro: [
      'Eine Untersuchung klärt zuerst eine einfache Frage: Wie ist der aktuelle Zustand von Zähnen, Zahnfleisch und Kiefer? Alles Weitere ergibt sich daraus – nicht umgekehrt.',
      'Für viele Menschen ist der Weg zum Zahnarzt mit Unbehagen verbunden. Es hilft, den Termin als Gespräch zu verstehen: Sie schildern, was Ihnen auffällt, und bekommen eine Einschätzung, bevor über Behandlungsschritte gesprochen wird.',
    ],
    sections: [
      {
        heading: 'Worum es bei einer Kontrolle geht',
        paragraphs: [
          'Zahnmedizinische Vorsorge zielt darauf, Karies und Erkrankungen des Zahnhalteapparats früh zu erkennen – zu einem Zeitpunkt, an dem der Aufwand klein und der Zahn gut zu erhalten ist. Beschwerden treten häufig erst spät auf. Genau deshalb ist die regelmäßige Kontrolle auch dann sinnvoll, wenn nichts wehtut.',
          'Die Bundeszahnärzteschaft ordnet Vorsorge breiter ein als reine Kontrolle: Dazu zählen unter anderem die Anwendung von Fluoriden, die Versiegelung tiefer Fissuren bei Kindern und Jugendlichen sowie die professionelle Zahnreinigung. Welche dieser Bausteine für Sie sinnvoll sind, hängt vom Befund ab.',
        ],
      },
      {
        heading: 'Warum sich der Befund nicht vorwegnehmen lässt',
        paragraphs: [
          'Zwei Menschen mit derselben Beschwerde können unterschiedliche Befunde haben. Vorgeschichte, Zahnfleischsituation, vorhandene Füllungen oder Kronen, Medikamente und Gewohnheiten wirken alle mit hinein.',
          'Deshalb lässt sich vorab nicht sagen, welche Behandlung in Ihrem Fall angezeigt ist, wie lange sie dauert oder was sie kostet. Das ergibt sich erst aus der Untersuchung.',
        ],
      },
      {
        heading: 'Was Sie zum Termin mitbringen können',
        paragraphs: [
          'Hilfreich sind Angaben zu Vorbehandlungen, zu Medikamenten, die Sie einnehmen, und zu bekannten Allergien oder Vorerkrankungen. Wenn Sie zuvor bei einer anderen Praxis in Behandlung waren, können vorhandene Unterlagen die Einschätzung erleichtern.',
          'Notieren Sie sich ruhig vorab, was Sie ansprechen möchten. Im Termin selbst gerät das erfahrungsgemäß schnell in den Hintergrund.',
        ],
      },
    ],
    discuss: [
      'Was genau wurde festgestellt – und was davon ist dringend?',
      'Welche Möglichkeiten gibt es, und was spricht jeweils dafür oder dagegen?',
      'Was passiert, wenn zunächst abgewartet wird?',
      'Welche Kosten übernimmt die Krankenkasse, welcher Anteil bleibt bei mir?',
      'Wie sieht die Nachsorge aus, und wann ist der nächste Termin sinnvoll?',
    ],
    clarify: [
      'Die nächste freie Terminmöglichkeit',
      'Wie viel Zeit für einen Ersttermin eingeplant werden sollte',
      'Welche Unterlagen Sie zum ersten Termin mitbringen sollen',
    ],
    sources: [
      { label: 'KZBV – Vorsorge', url: 'https://www.kzbv.de/patienten/medizinische-infos/vorsorge/' },
    ],
  },
  {
    slug: 'professionelle-zahnreinigung-muenchen',
    nav: 'Professionelle Zahnreinigung',
    title: 'Professionelle Zahnreinigung',
    h1: 'Professionelle Zahnreinigung',
    metaTitle: 'Professionelle Zahnreinigung München – Praxis Dr. Hrvoje Marijan',
    metaDescription:
      'Professionelle Zahnreinigung in München-Isarvorstadt: wozu sie medizinisch dient, was sie nicht leisten kann und wie Sie Ihren Termin telefonisch vereinbaren.',
    teaser:
      'Nicht in erster Linie Kosmetik: Die PZR entfernt Beläge dort, wo Bürste und Zahnseide systematisch nicht hinkommen.',
    kicker: 'Vorbeugen',
    intro: [
      'Die professionelle Zahnreinigung, kurz PZR, wird oft für eine kosmetische Leistung gehalten – die Zähne fühlen sich danach glatt an und sehen sauberer aus. Das ist ein angenehmer Nebeneffekt, aber nicht der eigentliche Zweck.',
      'Der Hauptnutzen ist medizinisch. Es geht um die gezielte Entfernung von Belägen an Stellen, die der häuslichen Mundhygiene dauerhaft entgehen: Zahnzwischenräume, Zahnfleischränder, Nischen um Kronen, Brücken oder eng stehende Zähne.',
    ],
    sections: [
      {
        heading: 'Warum Beläge überhaupt das Problem sind',
        paragraphs: [
          'Bakterielle Beläge sind der gemeinsame Ausgangspunkt der beiden häufigsten Erkrankungen im Mund: Karies und Entzündungen des Zahnhalteapparats. Werden Beläge regelmäßig gestört und entfernt, entziehen Sie beiden Prozessen die Grundlage.',
          'Die KZBV verweist auf groß angelegte Langzeituntersuchungen: Mit einem Prophylaxeprogramm, in dem die PZR die zentrale Leistung ist, ließen sich Karies und Parodontitis bei den meisten Menschen weitgehend vermeiden. Das ist ein Befund aus Studien – keine Zusicherung für den Einzelfall.',
        ],
      },
      {
        heading: 'Was die PZR nicht ist',
        paragraphs: [
          'Sie ist kein Bleaching und kein Ersatz für das tägliche Zähneputzen. Sie ergänzt die häusliche Mundhygiene und ersetzt sie nicht.',
          'Sie ist auch keine Behandlung einer bereits bestehenden Erkrankung. Wenn bei der Untersuchung Karies oder eine Erkrankung des Zahnhalteapparats festgestellt wird, ist das ein eigener Behandlungsweg, der gesondert besprochen wird.',
        ],
      },
      {
        heading: 'Wie oft ist sinnvoll?',
        paragraphs: [
          'Darauf gibt es keine allgemeingültige Antwort. Der sinnvolle Abstand hängt vom individuellen Risiko ab: Zahnfleischsituation, vorhandener Zahnersatz, Rauchen, bestimmte Allgemeinerkrankungen und die häusliche Mundhygiene spielen hinein.',
          'Bei manchen Menschen ist ein längerer Abstand ausreichend, bei anderen ein kürzerer angezeigt. Diese Einschätzung gehört in das Gespräch nach der Untersuchung.',
        ],
      },
      {
        heading: 'Kostenübernahme',
        paragraphs: [
          'Die PZR ist für gesetzlich Versicherte in der Regel keine Kassenleistung. Manche Krankenkassen beteiligen sich anteilig, die Regelungen unterscheiden sich jedoch deutlich voneinander und ändern sich.',
          'Fragen Sie den aktuellen Umfang bitte bei Ihrer Krankenkasse nach und besprechen Sie Ablauf und Kosten direkt in der Praxis.',
        ],
      },
    ],
    discuss: [
      'Wie ist der aktuelle Zustand meines Zahnfleischs?',
      'In welchem Abstand ist eine Reinigung in meinem Fall sinnvoll?',
      'Welche Stellen sollte ich zu Hause anders pflegen?',
      'Brauche ich für meine Zahnzwischenräume andere Hilfsmittel?',
      'Beteiligt sich meine Krankenkasse – und was muss ich dafür einreichen?',
    ],
    clarify: [
      'Wann ein Termin zur professionellen Zahnreinigung möglich ist',
      'Wie viel Zeit dafür eingeplant wird',
      'Der konkrete Ablauf und die Kosten in dieser Praxis',
    ],
    sources: [
      { label: 'KZBV – Vorsorge', url: 'https://www.kzbv.de/patienten/medizinische-infos/vorsorge/' },
    ],
    imageSlot: 'stillLife',
  },
  {
    slug: 'kronen-bruecken-muenchen',
    nav: 'Kronen & Brücken',
    title: 'Kronen & Brücken',
    h1: 'Kronen & Brücken',
    metaTitle: 'Kronen und Brücken München – Praxis Dr. Hrvoje Marijan',
    metaDescription:
      'Kronen und Brücken in München-Isarvorstadt: wann fester Zahnersatz infrage kommt, welche Voraussetzungen die Nachbarzähne erfüllen müssen und was im Gespräch zu klären ist.',
    teaser:
      'Fester Zahnersatz ist eine Entscheidung über das ganze Gebiss – nicht nur über die eine Lücke.',
    kicker: 'Zahnersatz',
    intro: [
      'Kronen und Brücken gehören zum festsitzenden Zahnersatz. Eine Krone kommt vor allem dann infrage, wenn ein Zahn großflächig zerstört ist, der nicht sichtbare Teil des natürlichen Zahns aber erhalten bleiben kann. Für die Krone wird dieser Zahn zunächst präpariert.',
      'Eine Brücke ersetzt einen fehlenden Zahn und stützt sich dabei auf die Nachbarzähne. Sie ist die verbreitetste Lösung für festsitzenden Zahnersatz und bietet sich besonders an, wenn die angrenzenden Zähne ohnehin bereits Füllungen tragen oder überkront sind.',
    ],
    sections: [
      {
        heading: 'Warum eine Lücke selten nur eine Lücke bleibt',
        paragraphs: [
          'Fehlende Zähne wirken sich unmittelbar auf das Aussehen der Mundpartie aus. Bereits ein einzelner fehlender Frontzahn im Oberkiefer kann zudem das Sprechen deutlich erschweren. Im Seitenzahnbereich leidet vor allem das Kauen.',
          'Auf Dauer kommt eine mechanische Kette hinzu: Nachbarzähne können in die Lücke kippen, gegenüberliegende Zähne sich in sie hinein bewegen. Die veränderte Bisslage kann Beschwerden in den Kiefergelenken auslösen und die verbliebenen Zähne fehlbelasten – was seinerseits zu Lockerung und Verlust führen kann. Deshalb ist der Lückenschluss in der Regel angeraten.',
        ],
      },
      {
        heading: 'Wann Zurückhaltung angezeigt ist',
        paragraphs: [
          'Zahnersatz ist nicht in jedem Fall uneingeschränkt zu empfehlen. Für eine Brücke müssen die begrenzenden Zähne als Pfeiler geeignet sein, und sie müssen im Rahmen der Kronenpräparation beschliffen werden. Gesunde Zahnsubstanz geht dabei verloren.',
          'Liegt an diesen Zähnen etwa eine Parodontitis vor, wäre von einer Brücke abzuraten und eine andere Lösung zu wählen. In Ausnahmefällen kann im Seitenzahnbereich auch eine Nichtversorgung angezeigt sein – dann nämlich, wenn die Zahnreihe noch ausreichend abgestützt ist. In diesem Fall gehören umfassende Aufklärung und regelmäßige Kontrollen dazu.',
        ],
      },
      {
        heading: 'Funktion und Aussehen gehören zusammen',
        paragraphs: [
          'Ein guter Zahnersatz muss beides leisten: Er soll tragen, was er tragen muss, und er soll unauffällig sein. Welche Material- und Versorgungsform dafür in Ihrem Fall geeignet ist, ergibt sich aus dem Befund, der Position im Gebiss und der Belastung an dieser Stelle.',
          'Welche Varianten die Praxis anbietet, welche davon für Sie infrage kommen und wie sich Kassenanteil und Eigenanteil verteilen, klären Sie bitte direkt im Beratungsgespräch.',
        ],
      },
    ],
    discuss: [
      'Ist der betroffene Zahn noch zu erhalten?',
      'Sind die Nachbarzähne als Pfeiler geeignet?',
      'Wie viel gesunde Zahnsubstanz muss abgetragen werden?',
      'Was bedeutet die Versorgung für die Pflege zu Hause?',
      'Wie ist der Heil- und Kostenplan aufgebaut, und was trägt die Kasse?',
    ],
    clarify: [
      'Welche Versorgungsformen in dieser Praxis angeboten werden',
      'Wie viele Termine bis zur fertigen Versorgung nötig sind',
      'Kosten, Heil- und Kostenplan sowie der Ablauf mit Ihrer Krankenkasse',
    ],
    sources: [
      { label: 'KZBV – Zahnersatz', url: 'https://www.kzbv.de/patienten/medizinische-infos/zahnersatz/' },
    ],

  },
  {
    slug: 'zahnentfernung-muenchen',
    nav: 'Zahnentfernung',
    title: 'Zahnentfernung',
    h1: 'Zahnentfernung',
    metaTitle: 'Zahnentfernung München – Praxis Dr. Hrvoje Marijan',
    metaDescription:
      'Zahnentfernung in München-Isarvorstadt: wann ein Zahn nicht mehr zu erhalten ist, wie die Einschätzung zustande kommt und welche Fragen vorher geklärt gehören.',
    teaser:
      'Zuerst wird geprüft, ob der Zahn zu erhalten ist. Die Entfernung steht am Ende dieser Prüfung, nicht an ihrem Anfang.',
    kicker: 'Wenn es nicht anders geht',
    intro: [
      'Zahnärztinnen und Zahnärzte sind heute mehr denn je darauf ausgerichtet, Zähne möglichst lange zu erhalten. Die Entfernung eines Zahnes ist deshalb kein Standardweg, sondern das Ergebnis einer Abwägung, wenn ein Zahn nicht mehr zu retten ist.',
      'Häufige Gründe sind unbehandelte Karies, die die Zahnhartsubstanz weitgehend zerstört hat, und fortgeschrittene Erkrankungen des Zahnhalteapparats.',
    ],
    sections: [
      {
        heading: 'Wie die Einschätzung zustande kommt',
        paragraphs: [
          'Ob ein Zahn erhalten werden kann, hängt davon ab, wie viel tragfähige Substanz übrig ist, wie stabil der Zahn im Knochen verankert ist und ob eine Entzündung beherrschbar erscheint. Diese Beurteilung setzt eine Untersuchung voraus.',
          'Wenn Sie unsicher sind, ist das ein guter Grund für einen Termin – gerade dann, wenn Ihnen schon einmal gesagt wurde, ein Zahn sei nicht zu halten, und Sie das in Ruhe besprechen möchten.',
        ],
      },
      {
        heading: 'Wie eine Entfernung allgemein abläuft',
        paragraphs: [
          'Für die möglichst schonende Herauslösung eines Zahnes aus seinem Zahnfach stehen verschiedene Instrumente zur Verfügung; das gebräuchlichste ist die Zange. Ist die Zahnkrone so weit zerstört, dass sie damit nicht mehr zu fassen ist, kann die Entfernung mit einem Hebel versucht werden.',
          'Ist auch das nicht möglich, bleibt ein operatives Vorgehen. Welcher Weg in Ihrem Fall infrage kommt, ergibt sich aus dem Befund und wird vorher mit Ihnen besprochen.',
        ],
      },
      {
        heading: 'Danach: die Lücke mitdenken',
        paragraphs: [
          'Eine Entfernung ist selten ein abgeschlossener Vorgang. Sinnvoll ist es, früh mitzubesprechen, was mit der entstehenden Lücke geschehen soll – auch dann, wenn die Entscheidung darüber erst später fällt.',
          'Hintergründe dazu finden Sie auf der Seite zu Kronen und Brücken. Was in Ihrer Situation infrage kommt, gehört in das persönliche Gespräch.',
        ],
      },
      {
        heading: 'Akute Schmerzen',
        paragraphs: [
          'Bei akuten Beschwerden ist der direkte Anruf in der Praxis der schnellste Weg. Bitte schildern Sie am Telefon kurz, worum es geht.',
          'Außerhalb der Sprechzeiten führt der zahnärztliche Notdienst der Kassenzahnärztlichen Vereinigung Bayerns weiter.',
        ],
      },
    ],
    discuss: [
      'Gibt es eine Möglichkeit, den Zahn doch zu erhalten?',
      'Was spricht dafür, jetzt zu handeln, und was für Abwarten?',
      'Wie wird für Schmerzfreiheit während des Eingriffs gesorgt?',
      'Worauf muss ich in den Tagen danach achten?',
      'Was ist mit der Lücke – und bis wann sollte das entschieden sein?',
    ],
    clarify: [
      'Ob bei akuten Beschwerden kurzfristig etwas frei ist',
      'Welche Vorbereitung nötig ist, etwa bei blutverdünnenden Medikamenten',
      'Die Nachsorge und wer im Anschluss ansprechbar ist',
    ],
    sources: [
      { label: 'KZBV – Zahnextraktion', url: 'https://www.kzbv.de/patienten/medizinische-infos/zahnextraktion/' },
    ],
  },
];

export const TREATMENT_BY_SLUG = Object.fromEntries(
  TREATMENTS.map((t) => [t.slug, t]),
) as Record<string, Treatment>;

/** The three treatments that have a dedicated page of their own. */
export const TREATMENT_PAGES = TREATMENTS.filter((t) => t.slug !== 'behandlungen');
