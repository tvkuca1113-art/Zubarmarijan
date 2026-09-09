# Bilder: Herkunft, Rechte, Einsatz

## Aktueller Stand

**Keine der fünf Bilddateien liegt dem Projekt bei.** Sie waren in der
Arbeitsumgebung dieser Sitzung nicht auffindbar — weder im Repository noch in
einem Upload- oder Anhangsverzeichnis (durchsucht: Projektverzeichnis, `/home`,
`/mnt/attach`, `/mnt/user-data`, `/tmp`, sowie eine dateisystemweite Suche nach
kürzlich geänderten Bilddateien).

Statt einen Menschen zu erfinden oder ein fremdes Foto einzusetzen, rendert der
Entwurf an jedem Bildplatz eine gestaltete Fläche im exakt gleichen
Seitenverhältnis. Sobald die Originale vorliegen, werden sie über
`npm run assets` eingesetzt — das Layout ändert sich dadurch nicht.

## Die fünf Bildplätze

| Platz | Dateiname (ohne Endung) | Verhältnis | Herkunft |
|---|---|---|---|
| Porträt | `doctor-portrait` | 4:5 | KI-retuschiertes Bild aus einem öffentlichen Praxis-Post, mit rekonstruierten Bildbereichen |
| Gespräch | `welcome-conversation` | 3:2 | KI-generierte Illustration |
| Prophylaxe | `cleaning-still-life` | 1:1 | KI-generierte Illustration |
| Zahnersatz | `ceramic-crown` | 4:3 | KI-generierte Illustration |
| Eingang | `practice-entrance` | 3:2 | KI-retuschiertes Bild aus einem öffentlichen Praxis-Post, mit rekonstruierten Bildbereichen |

Ablage: `public/images/source/`. Danach `npm run assets && npm run build`.

## Quellen der retuschierten Bilder

Die Vorlagen für Porträt und Eingang gehen auf zwei öffentliche Beiträge des
Praxis-Kanals zurück:

- Jubiläums-Beitrag: <https://www.instagram.com/zubaruminhenu/p/DagWBBAo-02/>
- Eingangs-Beitrag: <https://www.instagram.com/zubaruminhenu/p/DYoGoy1IvB4/>

Beide Beiträge waren aus dieser Arbeitsumgebung **nicht einsehbar** (Instagram
antwortete mit HTTP 429 und leitete auf die Anmeldeseite weiter). Die Angaben
zu ihrem Inhalt stammen aus dem Briefing, nicht aus eigener Anschauung.

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
