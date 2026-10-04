---
target: homepage and case study pages
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:/home/user/portfolio/src/pages/index.astro"
target_fingerprint: "sha256:8e625481e57058a7e57e803929456bd1f7477f84cc0d304fb9ede59451be8e56"
target_path: /home/user/portfolio/src/pages/index.astro
timestamp: 2026-10-02T17-55-34Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review sub-agent · B: detector + browser sub-agent)

Design Health: 23/32 (H7, H10 n/a). H1 2 (no active nav/TOC state), H2 3 (Practice label vs heading), H3 3, H4 3 (VoiceTrace duplicated), H5 3, H6 3 (no mobile TOC), H8 3 (Vauldex dead zone, Practice/Coursework noise), H9 3 (clipboard fallback copy).

Design specificity: authored voice (Gabo sculpture, drawn Fig. diagrams, mono discipline, copy) on an interchangeable skeleton (standard section order, identical SectionHeading rhythm, identical 7-heading case template). Sculpture language never recurs below the fold.
Detector: CLI 0 findings. Browser: .link-draw 1.0:1 contrast = false positive (background-image underline); real: accent #b8432a on paper-deep 4.3:1 (Tenancy.astro:44); em-dash overuse advisory; cream-palette = brief-mandated.

Priority issues:
- [P1] Case-study outcomes empty (TODO placeholders) + identical template across studies -> clarify
- [P1] Practice (26 tools) + Coursework = generic skills/résumé stack mid-page -> distill
- [P2] Metronomic structure below hero; sculpture motif never returns -> bolder/overdrive
- [P2] No location feedback: header nav + sticky TOC never set aria-current; no mobile TOC; Practice label mismatch -> polish
- [P3] Vauldex wide-layout dead zone, duplicated VoiceTrace, uncaptioned orange cover, tenancy note contrast 4.3:1 -> layout

Persona red flags: recruiter (no CV link, no quantified outcomes, intro certificates read junior); design engineer (uniform case template, static TOC, dangling "/" separators in Practice, pipeline tool list misaligned); mobile (9.1k px scroll, no TOC on case pages, small archive tap targets); agency lead (only one live link; archive buried).

Minor: hero dead band; 200px portrait; faint copy button border; no "n of 3" on case pages; 15 em-dashes.

Questions: why does the sculpture stop at the fold? Would anyone miss Practice/Coursework? What's the one voice number, and why isn't it the biggest type?
