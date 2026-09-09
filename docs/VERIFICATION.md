# Prüfbericht

Alle Angaben beziehen sich auf den Build vom **9. September 2026**, geprüft
gegen `dist/`, ausgeliefert über einen lokalen statischen Server.

## Werkzeuge

| | |
|---|---|
| Build | `astro build` — 10 Seiten, ohne Fehler |
| Typen | `astro check` — 0 Fehler, 0 Warnungen, 1 Hinweis (`document.execCommand` als Fallback im Kopier-Button, bewusst) |
| Browser | Chromium 147 über Playwright 1.56, lokal |
| Breiten | 390 px (Mobil), 768 px (Tablet), 1440 px (Desktop) |

## Automatisch geprüft — 10 Seiten × 3 Breiten

| Prüfung | Ergebnis |
|---|---|
| Horizontaler Überlauf | keiner auf 30 Seiten-/Breiten-Kombinationen |
| Genau eine `h1` je Seite | erfüllt |
| Fehlende oder gebrochene Bilder | keine |
| `tel:`-Ziele | alle 10 Seiten, ausnahmslos `tel:+4989537901` |
| `noindex, nofollow` | auf allen 10 Seiten gesetzt |
| Konsolenfehler | keine — mit einer Ausnahme, siehe unten |

> Die einzige Konsolenmeldung stammt von der 404-Seite, die korrekterweise mit
> HTTP 404 antwortet. Das ist das erwartete Verhalten, kein Fehler.

## Funktionen — 34 Prüfungen, alle bestanden

**Mobiles Menü** — Schaltfläche ab < 62 rem sichtbar · Panel initial geschlossen ·
öffnet per Klick · `aria-expanded` folgt dem Zustand · Fokus springt in das Panel ·
Telefonleiste weicht dem geöffneten Menü · **Escape schließt** · Fokus kehrt zur
Schaltfläche zurück · Links navigieren.

**Akkordeon** — geschlossen beim Laden · öffnet per Klick · Inhalt sichtbar ·
öffnet per Tastatur (Enter).

**Themenauswahl** — vier Reiter · erster vorausgewählt · Pfeil rechts wechselt ·
Panel wird sichtbar, das andere **wirklich** ausgeblendet · `End` springt ans
Ende · Pfeil rechts läuft um.

**Adresse kopieren** — schreibt exakt `Kapuzinerstraße 11, 80337 München` in die
Zwischenablage · meldet Erfolg über `role="status"`.

**Sprungmarke** — erster Tabstopp, wird beim Fokus sichtbar.

**Reduzierte Bewegung** — keine Transformation im Hero · die Pause-Schaltfläche
wird ausgeblendet, weil es nichts zu pausieren gibt.

**Zeiger-Parallaxe** — reagiert auf Mausbewegung (max. ±5° / ±3,4°) ·
Pause-Schaltfläche sichtbar bei feinem Zeiger · setzt `aria-pressed` · pausiert
setzt die Neigung auf 0.

**Ohne JavaScript** — Überschrift vorhanden · Telefonlink vorhanden · Akkordeon
öffnet über das native `<details>`-Verhalten.

## Schriften

Glyphenprüfung auf `/hr/` bei geladenen Schriften: **keine fehlenden Zeichen**
für `ÄÖÜäöüß ČčĆćĐđŠšŽž – — „ " · … 0123456789 €` in beiden Familien. Alle drei
verwendeten Schnitte (400/500/600) verfügbar.

| | vorher | nachher |
|---|---|---|
| Newsreader latin | 128,9 KB | **30,4 KB** |
| Inter latin | 47,1 KB | **24,5 KB** |
| Kritischer Pfad einer deutschen Seite | 176 KB | **≈ 55 KB** |
| Alle vier Dateien | 343,7 KB | 72,1 KB |

Erreicht durch Zeichen-Subsetting plus Beschneiden der Variationsachsen
(`wght` auf 400–600, Newsreaders `opsz` auf 30 fixiert). Die Originale liegen
unter `vendor/fonts/` und werden nicht ausgeliefert.

## Auslieferungsgrößen

| | roh | gzip |
|---|---|---|
| Startseite (HTML inkl. eingebettetem CSS) | 52,3 KB | 11,8 KB |
| `/kontakt/` | 21,4 KB | 6,4 KB |
| `/hr/` | 16,2 KB | 4,5 KB |
| Client-JavaScript, gesamt | 4,3 KB | — |
| `dist/` gesamt | 444 KB | — |

JavaScript wird als fünf kleine Inline-Blöcke ausgeliefert; es gibt kein
Framework-Bundle und keine externe Anfrage.

## Von Hand am Bildschirm geprüft

Screenshots auf 390, 768 und 1440 px gesichtet und daraufhin korrigiert:

1. **Hero zu groß auf dem Desktop** — Terminaktion und Kontaktangaben lagen
   unterhalb der ersten Bildschirmhöhe. Überschriftgröße, Abstände und
   Spaltenverhältnis angepasst; jetzt stehen Überschrift, beide Schaltflächen,
   Adresse und Telefonnummer bei 1440 × 900 vollständig im ersten Viewport.
2. **Bildplatz dominierte die Komposition** — Porträt auf `min(100%, 26rem)`
   begrenzt, Artikelbilder nach ihrem eigenen Seitenverhältnis gedeckelt.
3. **Behandlungsindex überlappte** — Titelspalte verbreitert, Schriftgrad
   reduziert; „Zahnentfernung" lief zuvor in den Beschreibungstext.
4. **Innenseiten waren zentriert statt am Raster ausgerichtet** — die
   Breitenbegrenzung lag auf demselben Element wie der zentrierende Container
   und gewann durch die höhere Spezifität von Astros Scoped Styles.
5. **Bildflächen wurden beschnitten** — die SVG-Grafik nutzte eine quadratische
   `viewBox` bei nicht-quadratischen Flächen. Jede Fläche zeichnet jetzt in
   ihrem eigenen Seitenverhältnis.
6. **Mobiles Menü war unbrauchbar** — der Header trägt `backdrop-filter` und
   wurde damit zum umgebenden Block für das `position: fixed`-Panel, das dadurch
   auf Höhe 0 zusammenfiel. Panel aus dem `<header>` herausgezogen.
7. **`hidden` wirkte nicht** — Klassen mit eigener `display`-Angabe stachen die
   Browserregel für `[hidden]` aus, sodass abgewählte Panels sichtbar blieben.
   Globale Regel ergänzt.
8. **Menü lag unter dem Header** — die feste Position ignorierte die
   Entwurfsleiste über dem Header. Der Versatz wird jetzt beim Öffnen gemessen.

## Nicht geprüft — ausdrücklich offen

- **Kein Lighthouse-Lauf.** Es werden keine Punktzahlen behauptet. Die
  Kennwerte in Abschnitt 15 des Briefings (LCP < 2,5 s, INP < 200 ms,
  CLS < 0,1) sind Ziele, keine gemessenen Ergebnisse. Belastbare Werte
  brauchen echtes Hosting und echte Endgeräte.
- **Keine Prüfung mit Screenreader oder auf echten Geräten.** Semantik,
  Fokusführung, Tastaturbedienung und Kontraste wurden bewusst gebaut und
  automatisiert geprüft; das ersetzt keinen manuellen Test mit NVDA, VoiceOver
  oder TalkBack. Es wird keine Barrierefreiheits-Zertifizierung behauptet.
- **Keine gerenderte Ansicht der vier Referenz-Websites.** Der Netzwerk-Proxy
  dieser Umgebung trennt die Chromium-Tunnel zu externen Hosts; Screenshots
  waren nicht möglich. Ausgewertet wurde stattdessen ausgeliefertes HTML und
  CSS (Schriftpaarungen, Farbwerte, Überschriftenhierarchie, `tel:`-Muster).
  Von Southcliff Dental Group kam beim zweiten Abruf kein Dokument zurück.
- **Instagram nicht eingesehen.** HTTP 429 mit Weiterleitung auf die
  Anmeldeseite. Zugangsbeschränkungen wurden nicht umgangen.
- **Nicht in der Praxis angerufen**, keine Nachricht gesendet, keine
  Testbuchung ausgelöst. Die Telefonnummer stammt ausschließlich aus
  öffentlichen Verzeichnissen.
- **Keine echten Fotos im Build.** Alle fünf Bildplätze zeigen gestaltete
  Flächen, weil die Bilddateien in dieser Arbeitsumgebung nicht vorlagen
  (siehe `docs/ASSETS.md`).
- **Ältere Browser** wurden nicht getestet. `::details-content` und
  `interpolate-size` stehen hinter `@supports`; ohne Unterstützung öffnet das
  Akkordeon ohne Animation.
