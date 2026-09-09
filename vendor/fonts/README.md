# Unsubsetted source fonts

Full variable originals of Newsreader and Inter, retrieved from Google Fonts on
2026-09-09. Both are licensed under the SIL Open Font License 1.1.

They are **not** served: `public/` holds only the subset versions that ship.
Keep these here so the subset can be regenerated — for example when new copy
introduces a character the current subset does not carry.

```bash
pip install fonttools brotli
python3 scripts/subset-fonts.py
```

The character set and the variable-axis limits are defined at the top of that
script.
