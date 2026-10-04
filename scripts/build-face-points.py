"""
Build the particle data for the hero portrait.

Segments the subject from src/assets/about/portrait.jpg (GrabCut, seeded around
the face and torso), crops to head and shoulders, and samples a grid of points
inside the mask. Output: public/face-points.bin, a little-endian Uint16Array of
[x, y, luminance, edge] quads, preceded by [width, height, count]. The face is
sampled at twice the density of the shoulders.

Re-run only when the portrait changes:
  python3 -m venv .venv && .venv/bin/pip install opencv-python-headless numpy
  .venv/bin/python scripts/build-face-points.py
"""
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src/assets/about/portrait.jpg"
OUT = ROOT / "public/face-points.bin"
CROP = (122, 92, 274, 318)  # x0, y0, x1, y1: head and upper chest
STEP = 2  # sampling pitch in source pixels
FACE = ((197, 150), (40, 54))  # centre, radii: sampled at pitch 1

img = cv2.imread(str(SRC))
h, w = img.shape[:2]

mask = np.full((h, w), cv2.GC_BGD, np.uint8)
mask[95:400, 105:300] = cv2.GC_PR_FGD
cv2.ellipse(mask, (197, 152), (30, 40), 0, 0, 360, cv2.GC_FGD, -1)
mask[230:400, 165:235] = cv2.GC_FGD
bgd, fgd = np.zeros((1, 65), np.float64), np.zeros((1, 65), np.float64)
cv2.grabCut(img, mask, None, bgd, fgd, 8, cv2.GC_INIT_WITH_MASK)
fg = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype(np.uint8)
fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8))
n, labels, stats, _ = cv2.connectedComponentsWithStats(fg)
fg = np.where(labels == 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA]), 255, 0).astype(np.uint8)
fg = cv2.erode(fg, np.ones((3, 3), np.uint8))

# Local contrast so features (eyes, mouth, lapels) survive as particle density.
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(8, 8)).apply(gray)

# Edges keep eyes, brows, mouth and lapels legible as particles.
blur = cv2.GaussianBlur(gray, (3, 3), 0)
gx = cv2.Sobel(blur, cv2.CV_32F, 1, 0)
gy = cv2.Sobel(blur, cv2.CV_32F, 0, 1)
edge = cv2.magnitude(gx, gy)
edge = np.clip(edge / np.percentile(edge[fg > 0], 97) * 255, 0, 255).astype(np.uint8)

(cx, cy), (rx, ry) = FACE
x0, y0, x1, y1 = CROP
points = []
for y in range(y0, y1):
    for x in range(x0, x1):
        if not fg[y, x]:
            continue
        in_face = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1
        if in_face or (x % STEP == 0 and y % STEP == 0):
            points.append((x - x0, y - y0, int(gray[y, x]), int(edge[y, x])))

header = [x1 - x0, y1 - y0, len(points)]
data = np.array(header + [v for p in points for v in p], dtype="<u2")
OUT.write_bytes(data.tobytes())
print(f"{len(points)} points, {OUT.stat().st_size / 1024:.1f} KB -> {OUT.relative_to(ROOT)}")
