# Prüfbericht

Build vom **10. September 2026**, geprüft gegen `dist/` über einen lokalen
statischen Server.

## Werkzeuge

| | |
|---|---|
| Build | `astro build` — 10 Seiten, ohne Fehler |
| Typen | `astro check` — 0 Fehler, 0 Warnungen, 2 Hinweise |
| Browser | Chromium 147 über Playwright 1.56, lokal, WebGL über SwiftShader |
| Breiten | 360, 390, 768 und 1440 px |

## Automatisch geprüft — 10 Seiten × 4 Breiten

| Prüfung | Ergebnis |
|---|---|
| Horizontaler Überlauf | keiner in 40 Seiten-/Breiten-Kombinationen |
| Genau eine `h1` je Seite | erfüllt |
| Überschriftenebenen ohne Sprung | erfüllt |
| Fehlende oder gebrochene Bilder | keine, nach vollständigem Durchscrollen |
| `tel:`-Ziele | ausnahmslos `tel:+4989537901` |
| `noindex, nofollow` | auf allen 10 Seiten |
| Lesetext ≥ 16 px | erfüllt; darunter liegen nur Versalien-Labels und Kleingedrucktes (≥ 14 px) |
| Touch-Ziele ≥ 44 px | erfüllt für Schaltflächen, Reiter und die mobile Aktionsleiste |
| Konsolenfehler | keine |

## Funktionen — 37 Prüfungen, alle bestanden

**Mobiles Menü** — öffnet und schließt, `aria-expanded` folgt, Fokus springt
hinein und kehrt zurück, Escape schließt, das Panel sitzt exakt unter dem
Header, die Aktionsleiste weicht, Links navigieren.

**Akkordeon** — geschlossen beim Laden, öffnet per Klick und per Tastatur.

**Adresse kopieren** — schreibt `Kapuzinerstraße 11, 80337 München` in die
Zwischenablage und meldet den Erfolg über `role="status"`.

**Sprungmarke** — erster Tabstopp, wird beim Fokus sichtbar.

**„Ein Zahn. Drei Perspektiven."**

- Drei Bedienelemente, vollständig per Tastatur: Pfeiltasten, `Home`, `End`, Umlauf.
- Der Fokus folgt der Auswahl, jeder Wechsel wird über `aria-live` angesagt.
- **Die Panelhöhe bleibt konstant** (gemessen 254 px vor und nach dem Wechsel):
  alle drei Texte liegen in derselben Rasterzelle.
- Der Telefon-Aufruf steht außerhalb des Canvas und ist in jedem Zustand sichtbar.
- Reduzierte Bewegung: Zustände wechseln ohne Übergang, keine Eingangsanimation.
- **Ohne WebGL**: Rückfallhinweis erscheint, Poster bleibt sichtbar, Erklärungen
  und Reiter funktionieren weiter.
- **Modell nicht ladbar** (Abruf blockiert): derselbe Rückfall, Telefon-Aufruf bleibt.
- **Ohne JavaScript**: Überschrift, Telefonlinks, Poster, erste Erklärung und
  das Akkordeon funktionieren.

## Ladeverhalten

Die 3D-Szene wird erst nach `load` angefordert, und nur wenn der Abschnitt in die
Nähe kommt. Schmale Bildschirme, grobe Zeiger, `saveData` und 2G-Verbindungen
bekommen stattdessen die Schaltfläche „3D ansehen".

| | erster Bildaufbau, ohne Scrollen |
|---|---|
| 390 px, Pixeldichte 2 | 166 KB |
| 1440 px, Pixeldichte 1 | 164 KB |

Vor dieser Umstellung lud der Desktop 1488 KB im ersten Bildaufbau, weil
three.js und das Modell sofort angefordert wurden. Das ist behoben.

Komprimiert, gemessen am Build:

| Datei | roh | gzip | brotli |
|---|---|---|---|
| `three.module.js` | 729 KB | 187 KB | 152 KB |
| `GLTFLoader.js` | 46 KB | 14 KB | 12 KB |
| `zahn.glb` | 548 KB | 321 KB | **157 KB** |
| 3D gesamt | 1325 KB | 523 KB | 322 KB |

Erster Bildaufbau komprimiert: rund **101 KB** (HTML 9 KB, Schriften 45 KB,
CSS und Porträt der Rest). Schriften: Manrope und Inter, lokal, auf den
benötigten Zeichensatz reduziert.

## Von Hand am Bildschirm geprüft

Screenshots vor und nach dem Redesign auf 390 und 1440 px verglichen. Dabei
gefunden und behoben:

1. **Kopfzeile über hellem Grund unlesbar** — die transparente Leiste über der
   dunklen Bühne stand tatsächlich über der hellen Seitenfarbe. Sie trägt jetzt
   die Bühnenfarbe und wird beim Scrollen zur hellen Leiste.
2. **Poster blieb hinter der Szene sichtbar** — die Überblendung hing an einem
   Vorfahren-Attributselektor, den Astros Scoped Styles umschreiben. Jetzt über
   Klassen gesteuert.
3. **Modell stieß an die Stagekante** — der Kamerastand für „Erhalten" war zu
   nah; das Modell wird jetzt vollständig gezeigt.
4. **Poster lag unter der Beschriftung** — die Bühne hat einen inneren Rand
   bekommen, aus dem auch die Rendergröße berechnet wird.
5. **Porträt schnitt auf dem Mobiltelefon den Kopf an** — dort gilt jetzt das
   Originalseitenverhältnis, der Zuschnitt bleibt dem Desktop vorbehalten.
6. **Sekundärtext lag bei 15 px** — die gesamte Textskala wurde angehoben;
   Kleingedrucktes trägt eine eigene Klasse.

## Modell

`public/models/zahn.glb` entsteht aus `scripts/build-tooth-model.mjs` und
`scripts/export-glb.mjs`. Beim Bau wurden drei Fehler gefunden und behoben:
nach innen zeigende Normalen (4276 von 4664 Seitenpunkten), eine entartete
Ringreihe im Zentrum der Kaufläche und eine falsch gewickelte Brücke zwischen
den beiden Wurzelspitzen. Nachgemessen: 4318 Seitenpunkte zeigen nach außen,
alle 1089 Punkte der Kaufläche nach oben.

Bekannte Vereinfachung: Die Wurzelspitzen laufen in einer kleinen Fläche
zusammen statt in zwei getrennte Spitzen. Bei der Darstellungsgröße auf der
Seite ist das nicht sichtbar. Die Seite kennzeichnet das Modell als
„Vereinfachte Darstellung".

## Nicht geprüft — ausdrücklich offen

- **Kein Lighthouse-Lauf, keine Feldmessung.** LCP, INP und CLS sind Ziele, keine
  Ergebnisse. Die oben genannten Größen sind Laborwerte aus dem lokalen Build.
  INP lässt sich aus einem Laborlauf ohnehin nicht ableiten.
- **Keine Prüfung mit Screenreader oder auf echten Geräten.** Semantik,
  Fokusführung, Tastaturbedienung, Kontraste und reduzierte Bewegung wurden
  gebaut und automatisiert geprüft. Das ist kein Konformitätsnachweis nach
  WCAG 2.2 AA und wird auch nicht als solcher behauptet.
- **Keine gerenderte Ansicht der vier Referenz-Websites.** Der Netzwerk-Proxy
  dieser Umgebung trennt Chromium-Tunnel zu externen Hosts. Ausgewertet wurde
  ausgeliefertes HTML und CSS.
- **Instagram, Pinterest und Facebook nicht eingesehen.** Instagram antwortete
  mit HTTP 429 und leitete auf die Anmeldeseite weiter. Zugangsbeschränkungen
  wurden nicht umgangen.
- **Nicht in der Praxis angerufen**, keine Nachricht gesendet, keine Testbuchung.
- **Medizinische Texte fachlich ungeprüft**, einschließlich der drei Erklärungen
  in der 3D-Sektion.
