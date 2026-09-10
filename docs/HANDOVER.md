# Übergabe — was die Praxis noch liefern muss

Sortiert danach, was einen öffentlichen Launch blockiert und was ihn nur
verbessert.

## A · Blockierend (ohne diese Punkte kein öffentlicher Launch)

| # | Punkt | Warum |
|---|---|---|
| A1 | **Freigabe des Entwurfs** durch Dr. Marijan | Der Auftritt ist unbeauftragt |
| A2 | **Impressum** nach § 5 DDG: Name, Anschrift, Kontakt, Berufsbezeichnung samt verleihendem Staat, zuständige Zahnärztekammer und KZV, berufsrechtliche Regelungen und wo sie einsehbar sind, ggf. USt-IdNr. | Gesetzlich vorgeschrieben, nichts davon wurde erfunden |
| A3 | **Datenschutzerklärung** und benannte Kontaktstelle | Gesetzlich vorgeschrieben |
| A4 | **Fachliche Freigabe aller medizinischen Texte** | Allgemein und quellenbasiert, aber ungeprüft — einschließlich der drei Erklärungen in der interaktiven Zahn-Darstellung und der vereinfachten Anatomie des Modells |
| A5 | **Schriftliche Bildfreigabe** für Porträt und Eingang | Beide Bilder liegen vor, sind aber retuschiert und von der Praxis nicht freigegeben |
| A6 | **Die tatsächliche Domain** | Für Canonical-URLs, Sitemap und Strukturdaten |
| A7 | **Aktuelle Sprechzeiten** | Werden derzeit bewusst nirgends genannt |

## B · Inhaltlich wichtig

| # | Punkt | Wirkung im Code |
|---|---|---|
| B1 | Offizielle E-Mail-Adresse für Anfragen | Ergänzt Telefon auf `/kontakt/` |
| B2 | Besteht eine Online-Terminbuchung? Über welchen Anbieter? | Ersetzt bzw. ergänzt die Telefonaktion |
| B3 | Wird die Praxisnummer für WhatsApp genutzt? | Derzeit ausgeschlossen |
| B4 | Werdegang, Studium, Tätigkeitsschwerpunkte | Füllt den offenen Abschnitt auf `/praxis/` |
| B5 | Team | Eigener Abschnitt, derzeit nicht vorhanden |
| B11 | **Ein echtes Praxis- oder Gesprächsfoto** | Besetzt die vierte Bildrolle, die derzeit typografisch gelöst ist |
| B12 | Echte, freigegebene Patientenstimmen | Nur mit Zustimmung und Zuordnung; sonst bleibt das Modul weg |
| B6 | **Welche Sprachen im Patientengespräch angeboten werden** | Macht aus dem Sprachsignal eine belastbare Aussage auf `/` und `/hr/` |
| B7 | Vollständiges Leistungsverzeichnis | Aktuell nur die vier belegten Bereiche |
| B8 | Barrierefreiheit, Parkmöglichkeiten, nächste Haltestelle | Fehlt bewusst auf `/kontakt/` |
| B9 | **Trifft „direkt neben BODY STREET" weiterhin zu?** | Das Eingangsfoto zeigt die Nachbarschaft, die Aktualität ist offen. `BODY_STREET_LANDMARK_CONFIRMED = true` in `src/data/assets.ts` schaltet die Bildunterschrift frei |
| B10 | Bestätigung, dass gesetzlich und privat Versicherte behandelt werden | Ersetzt den Zusatz „Verzeichnisangabe" durch eine klare Aussage |

## C · Schritte beim Launch

1. `src/data/practice.ts`:
   ```ts
   export const PUBLIC_LAUNCH = true;
   export const SITE_ORIGIN = 'https://<echte-domain>';
   ```
   Damit entfallen `noindex, nofollow` und Canonical-URLs werden ausgegeben.
2. `public/robots.txt` von `Disallow: /` auf eine Freigabe umstellen und die
   Sitemap eintragen.
3. Sitemap ergänzen (`@astrojs/sitemap`), sobald `SITE_ORIGIN` gesetzt ist.
4. `hreflang` zwischen `/` (de) und `/hr/` (hr) setzen.
5. Strukturierte Daten aktivieren — Vorlage unten.
6. Ergebnis mit dem Test für Rich-Suchergebnisse und dem Schema-Validator prüfen.

### Vorlage für die Strukturdaten

Erst einsetzen, wenn **jede** Angabe geprüft ist und **auch auf der Website
sichtbar** steht. Öffnungszeiten, Bewertungen, Koordinaten und Preisspannen
gehören nur hinein, wenn sie tatsächlich bestätigt sind — sonst weglassen.

```jsonc
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Praxis Dr. Hrvoje Marijan Zahnarzt",
  "url": "https://<echte-domain>/",
  "telephone": "+49 89 537901",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kapuzinerstraße 11",
    "postalCode": "80337",
    "addressLocality": "München",
    "addressCountry": "DE"
  },
  "sameAs": ["https://www.instagram.com/zubaruminhenu/"]
  // "openingHoursSpecification": … erst nach Bestätigung
  // "aggregateRating": NICHT aufnehmen — es liegen keine Bewertungen vor
  // "geo": nur mit geprüften Koordinaten
}
```

## D · Was bewusst nicht gebaut wurde

- **Kein Kontaktformular.** Ohne autorisiertes Backend wäre es entweder eine
  Attrappe oder eine ungeregelte Verarbeitung von Gesundheitsdaten.
- **Kein Terminkalender.** Kein bestätigter Buchungsanbieter.
- **Keine eingebettete Karte.** Ein externer Link zu Google Maps statt einer
  Einbettung, die schon beim Laden Daten überträgt.
- **Kein Instagram-Embed, kein Tracking, keine externen Schriften.**
- **Keine Bewertungen, Sterne, Auszeichnungen, Patientenzahlen oder Berufsjahre.**
- **Kein eigener Notdienst.** Verlinkt ist der Notdienst der KZVB.
