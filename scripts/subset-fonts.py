#!/usr/bin/env python3
"""
Subset the self-hosted variable fonts to the characters this site needs.

Keeps German (ä ö ü ß) and the Croatian/Bosnian/Serbian diacritics (č ć đ š ž),
plus the punctuation the typography actually uses.

It also trims the variable axes: the weight axis is clamped to the 400-600 range
the stylesheet declares, and Newsreader's optical-size axis is pinned. Together
with the character subset that takes the two fonts on a German page from about
176 KB to about 55 KB. Pinning opsz costs automatic optical sizing; the pinned
value is chosen for the mid-size range where most of the serif type sits. Variable axes are preserved,
so the CSS weight ranges keep working.

    python3 scripts/subset-fonts.py
"""
import pathlib
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

CHARS = (
    # Basic Latin, printable
    "".join(chr(c) for c in range(0x20, 0x7F))
    # German
    + "ÄÖÜäöüßẞ"
    # Croatian / Bosnian / Serbian (Latin)
    + "ČčĆćĐđŠšŽž"
    # Wider European coverage for names
    + "ÀÁÂÃÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕØÙÚÛÝ"
    + "àáâãåæçèéêëìíîïñòóôõøùúûýÿ"
    + "ĀāĂăĄąĆĈĊČĎďĒēĖėĘęĚěĞğĪīĮįŁłŃńŇňŌōŐőŒœŔŕŘřŚśŞşŢţŤťŪūŮůŰűŸŹźŻżŽ"
    # Typographic punctuation used in the copy
    + "–—…„“”‘’‚‹›«»·•×°′″†‡§¶©®™€£¥←→↑↓№"
    + "  ‑​"
)

FEATURES = ["kern", "liga", "calt", "ccmp", "locl", "onum", "tnum", "frac", "mark", "mkmk"]

# Axis limits per family. A tuple narrows the axis, a number pins it.
AXIS_LIMITS = {
    "newsreader": {"wght": (400, 600), "opsz": 30},
    "inter": {"wght": (400, 600)},
}

root = pathlib.Path("public/fonts")
originals = sorted(pathlib.Path("vendor/fonts").glob("*.woff2"))
if not originals:
    raise SystemExit("No originals in vendor/fonts/ - nothing to subset.")

total_before = total_after = 0
for src in originals:
    dst = root / src.name
    before = src.stat().st_size

    family = src.stem.split("-")[0]
    limits = AXIS_LIMITS.get(family)
    work = str(src)
    if limits:
        var = TTFont(work)
        instancer.instantiateVariableFont(var, limits, inplace=True, updateFontNames=False)
        var.flavor = None
        work = f"/tmp/_subset-{src.stem}.ttf"
        var.save(work)
        var.close()

    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = FEATURES
    options.desubroutinize = False
    options.hinting = True
    options.legacy_kern = False
    options.name_IDs = ["*"]
    options.name_legacy = True
    options.notdef_outline = True
    options.recalc_bounds = True
    options.drop_tables += ["DSIG"]
    font = subset.load_font(work, options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=CHARS)
    subsetter.subset(font)
    subset.save_font(font, str(dst), options)
    font.close()
    after = dst.stat().st_size
    total_before += before
    total_after += after
    print(f"{src.name:34s} {before/1024:7.1f} KB -> {after/1024:6.1f} KB  ({100*after/before:4.1f}%)")

print(f"\ntotal {total_before/1024:.1f} KB -> {total_after/1024:.1f} KB "
      f"({100*total_after/total_before:.1f}%)")
