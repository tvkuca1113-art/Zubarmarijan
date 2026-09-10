# Praxis Dr. Hrvoje Marijan — Website-Entwurf

Ein privater Gestaltungsentwurf für die Zahnarztpraxis **Dr. Hrvoje Marijan**,
Kapuzinerstraße 11, 80337 München (Ludwigsvorstadt-Isarvorstadt).

> **Kein offizieller Auftritt der Praxis.** Der Entwurf ist von der Praxis weder
> beauftragt noch freigegeben. Alle Seiten sind `noindex, nofollow`, die
> `robots.txt` sperrt den gesamten Auftritt, und es werden keine strukturierten
> Daten ausgeliefert. Die Telefonnummer ist echt und stammt aus öffentlichen
> Verzeichnissen — im Rahmen der Erstellung wurde nicht angerufen.

---

## Stack

| | |
|---|---|
| Framework | [Astro 5](https://astro.build) — `output: 'static'` |
| Sprache | TypeScript (strict) |
| Bilder | `sharp` über ein eigenes Skript (`scripts/build-assets.mjs`) |
| 3D | three.js, nachgeladen, mit eigenem Modell und statischem Poster |
| Client-JS | ~9 KB für die Seite; three.js kommt erst bei Bedarf |
| Schriften | Manrope + Inter, lokal gehostet (SIL OFL 1.1) |

**Warum Astro:** Jede Seite wird als vollständiges HTML ausgeliefert. Es gibt
kein Framework im Browser, kein Hydrations-Bundle und keine externe Anfrage —
weder für Schriften noch für Karten, Tracking oder Instagram-Einbettungen. Das
passt zu einer Website, deren Hauptaufgabe darin besteht, eine Telefonnummer und
verlässliche Informationen schnell auszuliefern.

**Gestaltung:** Tiefes Tintenblau `#183449` für die Bühne, warmes Weiß `#F6F4EF`
für die Inhaltsflächen, `#18252D` für Text, `#DCE7ED` als ruhige Fläche und
`#BA6347` als warmer Akzent. Der Akzent erreicht auf warmem Weiß nur 3,9:1 und
trägt deshalb Linien, Marken und große Typo; für Fließtext gibt es die dunklere
Variante `--accent-ink`. Alle Paarungen sind in `src/styles/global.css`
dokumentiert.

## Einrichten

```bash
npm install
npm run dev        # http://localhost:4321
```

## Befehle

| Befehl | Wirkung |
|---|---|
| `npm run dev` | Entwicklungsserver |
| `npm run build` | Statischer Build nach `dist/` |
| `npm run preview` | `dist/` lokal ausliefern |
| `npm run check` | `astro check` (Typen und Templates) |
| `npm run assets` | Responsive Bildvarianten erzeugen (siehe unten) |
| `npm run model` | Zahnmodell neu erzeugen (`public/models/zahn.glb`) |
| `npm run poster` | Statisches Poster der 3D-Szene rendern (braucht Playwright) |

## Bilder einsetzen

Alle fünf Bilder liegen bei und sind eingebunden. Die Master stehen in
`vendor/images/` und werden **nicht** ausgeliefert; im Build landen nur die
Varianten aus `public/images/derived/`.

| Datei | Verwendung | Seitenverhältnis |
|---|---|---|
| `doctor-portrait` | Hero der Startseite | 4:5 |
| `welcome-conversation` | Abschnitt „Gut informiert. Gut aufgehoben." | 3:2 |
| `cleaning-still-life` | Professionelle Zahnreinigung | 4:5 |
| `ceramic-crown` | Zahnersatz (dunkler Abschnitt) | 3:2 |
| `practice-entrance` | Kontakt & Anfahrt | 4:5 |

Ein Bild austauschen: Datei in `vendor/images/` ersetzen (Endung
beliebig), dann:

```bash
npm run assets && npm run build
```

Das Skript schreibt AVIF-, WebP- und JPEG-Varianten nach
`public/images/derived/` und hinterlegt die echten Maße in
`src/data/asset-manifest.json`. `Figure.astro` liest dieses Manifest und liefert
`<picture>` mit `srcset`, `sizes` und expliziten Abmessungen aus.

Weicht das neue Bild im Seitenverhältnis ab, den Wert `ratio` des Platzes in
`src/data/assets.ts` mit anpassen — dann wird nichts beschnitten. Fehlt eine
Datei ganz, rendert `Figure.astro` an derselben Stelle eine gestaltete Fläche im
selben Seitenverhältnis, sodass das Layout unverändert bleibt.

Herkunft und Rechte der Bilder: **[docs/ASSETS.md](docs/ASSETS.md)**.

## Seiten

| Route | Inhalt |
|---|---|
| `/` | Startseite |
| `/behandlungen/` | Übersicht plus „Untersuchung & Beratung" |
| `/professionelle-zahnreinigung-muenchen/` | Professionelle Zahnreinigung |
| `/kronen-bruecken-muenchen/` | Kronen & Brücken |
| `/zahnentfernung-muenchen/` | Zahnentfernung |
| `/praxis/` | Die Praxis |
| `/kontakt/` | Kontakt & Anfahrt |
| `/hr/` | Informationen auf Hrvatski / Bosanski / Srpski |
| `/hinweise/` | Status, Quellen, Bildherkunft, offene Punkte |
| `404` | Fehlerseite mit Telefonaktion |

## Wo Inhalte liegen

Sämtliche Fakten und Texte stehen im Datenlayer, nicht in den Templates:

- `src/data/practice.ts` — Name, Adresse, Telefon, **Evidenzregister**, offene Punkte
- `src/data/treatments.ts` — die vier Behandlungsbereiche samt Seiteninhalt
- `src/data/faq.ts` — Fragen der Startseite
- `src/data/assets.ts` — die fünf Bildplätze, Alt-Texte, Herkunft

Eine geänderte Telefonnummer oder Adresse wird an genau einer Stelle gepflegt und
schlägt auf alle Seiten durch.

## Vom Entwurf zum Launch

In `src/data/practice.ts`:

```ts
export const PUBLIC_LAUNCH = false;          // → true
export const SITE_ORIGIN: string | null = null;  // → 'https://echte-domain.de'
```

Damit entfällt `noindex`, und Canonical-URLs werden ausgegeben. **Vorher**
zwingend erledigen: `public/robots.txt` anpassen, Impressum und
Datenschutzerklärung ergänzen, Bildfreigabe einholen, medizinische Texte
freigeben lassen und die Strukturdaten aus
[docs/HANDOVER.md](docs/HANDOVER.md) mit geprüften Angaben aktivieren.

## Weitere Unterlagen

- **[docs/EVIDENCE.md](docs/EVIDENCE.md)** — Quellenlage jeder Angabe
- **[docs/ASSETS.md](docs/ASSETS.md)** — Bildherkunft und Rechte
- **[docs/VERIFICATION.md](docs/VERIFICATION.md)** — was geprüft wurde, was nicht
- **[docs/HANDOVER.md](docs/HANDOVER.md)** — was die Praxis noch liefern muss


## Die interaktive Darstellung

„Ein Zahn. Drei Perspektiven." steht direkt unter dem Hero. Drei gewöhnliche
HTML-Schaltflächen wechseln Kamera und Sichtbarkeit; jede hat einen kurzen
Erklärtext, einen Link zur passenden Leistung und daneben, außerhalb des Canvas,
die Telefonnummer.

Alles Wesentliche steht im HTML. Ohne JavaScript, ohne WebGL und ohne Modell
bleiben Überschriften, Erklärungen, Links und Telefonnummer vollständig
benutzbar; sichtbar ist dann das Poster.

**Modell.** `public/models/zahn.glb` ist Originalarbeit für dieses Projekt und
wird parametrisch erzeugt, nicht heruntergeladen:

```bash
npm run model     # Geometrie -> glTF 2.0
npm run poster    # Poster aus demselben Modell und derselben Kamera
```

Es enthält drei Netze: `zahn_intakt`, `zahn_praepariert` und `krone`. Der
Zustand „Erhalten" zeigt, wie die Krone auf den beschliffenen Stumpf gesetzt
wird. Die Anatomie ist bewusst vereinfacht und auf der Seite so gekennzeichnet.

**Kamera und Licht** stehen in `src/data/tooth-views.js` und werden von der Szene
und vom Poster-Renderer gemeinsam gelesen, damit der Übergang vom Poster zur
Szene nicht springt. Die Texte liegen in `src/data/tooth-copy.ts`.

**Ladeverhalten.** three.js und das Modell werden erst nach `load` und erst in
der Nähe des Abschnitts angefordert. Schmale Bildschirme, grobe Zeiger,
`saveData` und 2G bekommen stattdessen die Schaltfläche „3D ansehen". Gerendert
wird nur, solange sich etwas bewegt; außerhalb des Sichtbereichs und im
Hintergrund-Tab steht die Schleife still. Verlorener WebGL-Kontext und ein
fehlendes Modell fallen sichtbar auf das Poster zurück.
