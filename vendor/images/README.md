# Bild-Master

Die gelieferten Originaldateien in voller Auflösung. Sie werden **nicht**
ausgeliefert: `public/images/derived/` enthält die Varianten, die im Build
landen.

Aus diesen Dateien erzeugt `npm run assets` AVIF, WebP und JPEG in mehreren
Breiten und schreibt die echten Maße nach `src/data/asset-manifest.json`.

Ein Bild ersetzen: Datei hier austauschen, dann `npm run assets && npm run build`.
Weicht das Seitenverhältnis ab, den Wert `ratio` des Platzes in
`src/data/assets.ts` mit anpassen, damit nichts beschnitten wird.

Herkunft und Rechte: siehe `docs/ASSETS.md`. Porträt und Eingang sind
retuschierte Vorlagen ohne Freigabe der Praxis, die drei übrigen sind
KI-Illustrationen.
