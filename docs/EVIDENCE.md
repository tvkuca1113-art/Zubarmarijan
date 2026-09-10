# Evidenzregister

Stand der Prüfung: **9. September 2026**, erneut bestätigt am **10. September 2026**. Maschinenlesbar in
`src/data/practice.ts` (Export `EVIDENCE`); die Seite `/hinweise/` rendert
dasselbe Register für Besucher.

## Nachprüfung 10.09.2026

Vor dem Redesign wurden alle Geschäftsangaben erneut gegen Jameda und ärzte.de
geprüft. Unverändert: Praxisbezeichnung, Anschrift, Postleitzahl, Telefonnummer,
Stadtbezirk, beide Versicherungsarten, weiterhin keine Online-Terminbuchung über
Jameda, weiterhin keine Patientenbewertungen und weiterhin kein Leistungs- oder
Preisverzeichnis auf dem Profil.

## Wie geprüft wurde

| Quelle | Erreichbar | Methode |
|---|---|---|
| `jameda.de/hrvoje-marijan/zahnarzt/muenchen` | ja (HTTP 200) | HTML abgerufen und ausgelesen |
| `aerzte.de/…/dr-med-dent-hrvoje-marijan` | ja (HTTP 200) | HTML abgerufen und ausgelesen |
| `instagram.com/zubaruminhenu/` | **nein** | HTTP 429, Weiterleitung auf `/accounts/login/` |
| `kzbv.de` (drei Patientenseiten) | ja (HTTP 200) | HTML abgerufen, Inhalt in eigenen Worten zusammengefasst |
| `kzvb.de/patient/notdienst-dental-emergency` | ja (HTTP 200) | Nur Erreichbarkeit geprüft, dann verlinkt |

Zugangsbeschränkungen wurden **nicht** umgangen. Die beiden im Briefing
genannten Instagram-Einzelbeiträge konnten deshalb nicht eingesehen werden.

## Bestätigte Angaben

| Angabe | Quellen | Sicherheit | Auf der Website |
|---|---|---|---|
| Dr. Hrvoje Marijan ist Zahnarzt in München | jameda, ärzte.de | hoch | ja |
| Praxisbezeichnung „Praxis Dr. Hrvoje Marijan Zahnarzt" | jameda, ärzte.de | hoch | ja |
| Kapuzinerstraße 11, 80337 München | jameda, ärzte.de | hoch | ja |
| Stadtbezirk Ludwigsvorstadt-Isarvorstadt | jameda | hoch | ja |
| Telefon 089 537901 | jameda, ärzte.de | hoch | ja |
| Gesetzlich **und** privat Versicherte | jameda-FAQ, ärzte.de | mittel | ja, mit Hinweis „Verzeichnisangabe" |
| Keine Online-Terminbuchung über Jameda | jameda | hoch | indirekt (Termine telefonisch) |
| Keine Patientenbewertungen auf Jameda | jameda | hoch | nein — Grund, warum keine Bewertungen erscheinen |
| Vier Behandlungsbereiche | öffentliches Praxisprofil (Briefing) | mittel | ja |
| BKS-Sprachsignal des Kanals | öffentliches Praxisprofil (Briefing) | mittel | ja, ohne Aussage über das Behandlungszimmer |

### Wörtliche Belege

**Jameda**, abgerufen 09.09.2026:

- „Praxis Dr. Hrvoje Marijan Zahnarzt / Kapuzinerstr. 11, Ludwigsvorstadt-Isarvorstadt / 80337 / München"
- „089 537901"
- „Dr. Hrvoje Marijan bietet an diesem Standort über Jameda keine Online-Terminbuchung an"
- „Keine Informationen über Leistungen und Kosten — Auf diesem Profil wurden noch keine Informationen über Leistungen hinzugefügt."
- „Es wurden noch keine Patientenerfahrungen geteilt"
- FAQ: „Folgende Versicherungen werden von Dr. Hrvoje Marijan akzeptiert: Gesetzlich versichert, Privat versichert."

**ärzte.de**, abgerufen 09.09.2026:

- Titel „Dr. med. dent. Hrvoje Marijan in 80337 München Zahnarzt"
- „Praxis Dr. Hrvoje Marijan Zahnarzt / Kapuzinerstr. 11 / 80337 / München"
- „Telefon: 089/537901"
- „Versicherungsart: Alle"
- „Sprachen:" — **kein Wert hinterlegt**
- „Zuletzt aktualisiert am: 03.03.2020" · „Basisprofil" · Autor: ärzte.de MediService GmbH & Co. KG
- „Es wurden bisher keine Empfehlungen abgegeben."

> Der Titel „Dr. med. dent." erscheint nur bei ärzte.de und stammt aus einem
> Verzeichniseintrag von 2020, der nicht von der Praxis gepflegt wird. Die
> Website nennt deshalb durchgängig die schlichtere Form „Dr. Hrvoje Marijan".

## Nicht bestätigt — steht nirgends als Tatsache

Sprechzeiten · E-Mail-Adresse · Facebook-Seite · Preise · Buchungsanbieter ·
WhatsApp · aktuelle Terminverfügbarkeit · Biografie und Ausbildung · Team ·
Ausstattung und Technik · Spezialisierungen · Barrierefreiheit · Parkplätze ·
Bewertungen und Sterne.

Ebenfalls **nicht** dargestellt, weil unbelegt: Implantate, Veneers, Aligner,
Sedierung, Lasertherapie, Eigenlabor, eigener Notdienst.

Die vom Projektinhaber genannte Formulierung „9.5/10" ist keine geprüfte
Patientenbewertung und erscheint an keiner Stelle.

## Historische Inhalte

Die im Briefing erwähnte Juli-Aktion und die frühere Ferienankündigung sind
historisch. Preise, Rabattcodes, Erstattungsaussagen und Schließzeiten daraus
erscheinen nirgends als aktuelles Angebot.

## Ausdrücklich offen

Der Hinweis, der Eingang liege unmittelbar neben **BODY STREET**, stammt aus
einem Praxis-Beitrag. Das vom Projektinhaber gelieferte Eingangsfoto zeigt die
Tür der Kapuzinerstraße 11 tatsächlich direkt neben dem Schaufenster von BODY
STREET, was den Punkt stützt. Belegt ist damit aber nicht, ob die Nachbarschaft
**heute** noch besteht; das Bild ist zudem retuschiert und von der Praxis nicht
freigegeben. Die Aussage bleibt deshalb aus der Anfahrtsbeschreibung heraus. Die Formulierung liegt
fertig in `src/data/assets.ts`; nach Bestätigung durch die Praxis genügt:

```ts
export const BODY_STREET_LANDMARK_CONFIRMED = true;
```

Danach erscheint die Bildunterschrift „Unser Eingang: Kapuzinerstraße 11, direkt
neben BODY STREET." unter dem Eingangsfoto auf `/` und `/kontakt/`. Bis dahin
steht dort eine Unterschrift, die nur beschreibt, was auf dem Bild zu sehen ist.

## Medizinische Hintergründe

In eigenen Worten zusammengefasst nach der Patienteninformation der
Kassenzahnärztlichen Bundesvereinigung. Kein Text ist übernommen.

- <https://www.kzbv.de/patienten/medizinische-infos/vorsorge/>
- <https://www.kzbv.de/patienten/medizinische-infos/zahnersatz/>
- <https://www.kzbv.de/patienten/medizinische-infos/zahnextraktion/>

Notdienst-Hinweis: <https://www.kzvb.de/patient/notdienst-dental-emergency>
