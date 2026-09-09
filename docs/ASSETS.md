# Bilder: Herkunft, Rechte, Einsatz

## Aktueller Stand

**Alle fünf Bilder liegen vor und sind eingebunden.** Sie wurden vom
Projektinhaber geliefert und liegen als PNG unter `vendor/images/`.
Aus jedem erzeugt `npm run assets` AVIF-, WebP- und JPEG-Varianten.

Fehlt eine Datei, rendert `Figure.astro` an derselben Stelle eine gestaltete
Fläche im exakt gleichen Seitenverhältnis. Dieser Rückfallweg bleibt bestehen,
damit sich das Layout beim Austauschen eines Bildes nicht verschiebt.

### Seitenverhältnisse nach Lieferung korrigiert

Drei Bilder kamen in anderen Proportionen als ursprünglich angenommen. Statt sie
zu beschneiden, wurden die Bildplätze an die gelieferten Dateien angepasst — es
wird also nichts weggeschnitten:

| Platz | angenommen | tatsächlich |
|---|---|---|
| Prophylaxe | 1:1 | **4:5** |
| Zahnersatz | 4:3 | **3:2** |
| Eingang | 3:2 | **4:5** |

## Die fünf Bildplätze

| Platz | Dateiname | Maße | Herkunft |
|---|---|---|---|
| Porträt | `doctor-portrait.png` | 1122×1402 (4:5) | KI-retuschiertes Bild aus einem öffentlichen Praxis-Post, mit rekonstruierten Bildbereichen |
| Gespräch | `welcome-conversation.png` | 1536×1024 (3:2) | KI-generierte Illustration |
| Prophylaxe | `cleaning-still-life.png` | 1122×1402 (4:5) | KI-generierte Illustration |
| Zahnersatz | `ceramic-crown.png` | 1536×1024 (3:2) | KI-generierte Illustration |
| Eingang | `practice-entrance.png` | 1122×1402 (4:5) | KI-retuschiertes Bild aus einem öffentlichen Praxis-Post, mit rekonstruierten Bildbereichen |

Ersetzen: Datei in `vendor/images/` austauschen, dann
`npm run assets && npm run build`. Weicht das Seitenverhältnis ab, den Wert
`ratio` des Platzes in `src/data/assets.ts` mit anpassen.

### Wo jedes Bild erscheint

Jedes Foto steht **genau einmal** prominent:

- **Porträt** — Hero der Startseite, rechte Spalte, auf 26 rem begrenzt.
- **Gespräch** — Abschnitt „Gut informiert. Gut aufgehoben.", nutzt den freien
  Bildraum links neben der Person als Übergang zum Text.
- **Prophylaxe** — Abschnitt zur professionellen Zahnreinigung auf der
  Startseite und im Artikel der Behandlungsseite.
- **Zahnersatz** — dunkler Abschnitt der Startseite und Artikel zu Kronen und
  Brücken. Der dunkle Bildhintergrund geht in das dunkle Band über.
- **Eingang** — „Kontakt & Anfahrt" auf der Startseite und auf `/kontakt/`.

## Quellen der retuschierten Bilder

Die Vorlagen für Porträt und Eingang gehen auf zwei öffentliche Beiträge des
Praxis-Kanals zurück:

- Jubiläums-Beitrag: <https://www.instagram.com/zubaruminhenu/p/DagWBBAo-02/>
- Eingangs-Beitrag: <https://www.instagram.com/zubaruminhenu/p/DYoGoy1IvB4/>

Beide Beiträge waren aus dieser Arbeitsumgebung **nicht einsehbar** (Instagram
antwortete mit HTTP 429 und leitete auf die Anmeldeseite weiter). Die
retuschierten Fassungen kamen stattdessen direkt vom Projektinhaber.

Das gelieferte Eingangsbild zeigt die Tür der Kapuzinerstraße 11 unmittelbar
neben dem Schaufenster von BODY STREET. Das stützt den Orientierungspunkt aus
dem Praxis-Beitrag. Ob die Nachbarschaft **aktuell** noch so besteht, ist damit
nicht belegt — deshalb bleibt `BODY_STREET_LANDMARK_CONFIRMED` auf `false` und
die Bildunterschrift beschreibt nur, was zu sehen ist.

## Regeln, die für diesen Entwurf gelten

- Es handelt sich um Social-Media-Kompositionen, **nicht** um separat geprüfte
  Originalfotos. Das Porträt wird nirgends als geprüftes Berufsporträt bezeichnet.
- Die Identität der abgebildeten Person ist durch den Kontext des Praxis-Beitrags
  nahegelegt, aber **nicht unabhängig bestätigt**.
- Eine Erlaubnis zur Nutzung außerhalb der Plattform liegt **nicht** vor.
- Das Porträt erscheint **genau einmal** prominent (Hero der Startseite) und wird
  weiter unten nicht als zweites großes Bild wiederholt.
- Kein Gesicht wurde generativ entfernt oder rekonstruiert.
- Es werden keine Fotos anderer Praxen verwendet.
- Es werden keine ablaufenden Social-CDN-Adressen verlinkt; alle Dateien liegen lokal.
- Historische Preise oder Aktionen aus den Vorlagen erscheinen nirgends als
  aktuelles Angebot.

## Regeln für die Illustrationen

Die drei KI-generierten Bilder sind **illustrativ**. Der Entwurf behauptet an
keiner Stelle, dass sie

- eine Patientin oder einen Patienten der Praxis zeigen,
- ein Behandlungsergebnis dokumentieren,
- die tatsächliche Ausstattung oder Instrumente der Praxis abbilden,
- oder eine in dieser Praxis gefertigte Arbeit darstellen.

Der Krone wird kein Implantat-Etikett gegeben, und aus ihr wird keine nicht
belegte Leistung abgeleitet.

## Für die freigegebene Fassung anzufordern

1. Sauberes Porträt von Dr. Marijan
2. Praxisinnenräume
3. Empfang
4. Eingang (aktuell, mit erkennbarer Hausnummer)
5. Ein eigenständiges Detailfoto
6. **Schriftliche Erlaubnis**, die gelieferten Bilder zu verwenden

Bis dahin gelten die retuschierten Vorlagen als Demo-Material unter Vorbehalt
der Prüfung durch die Praxis.

## Technische Auslieferung

`scripts/build-assets.mjs` erzeugt je Bild eine Breitenleiter
(420/640/900/1200/1600 px, nie über die Originalbreite hinaus) in **AVIF**,
**WebP** und **JPEG**.

`src/components/Figure.astro` liefert daraus `<picture>` mit `srcset` und
`sizes`, setzt `width`/`height` aus den echten Maßen (kein Layout-Sprung) und
lädt nur das Hero-Porträt mit `loading="eager"` und `fetchpriority="high"`.
Alle übrigen Bilder sind `loading="lazy"`.

Alt-Texte stehen in `src/data/assets.ts`. Sie beschreiben, was zu sehen ist, und
enthalten bewusst keine gehäuften Ortsangaben.
