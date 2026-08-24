#!/usr/bin/env python3
"""石垣（野面積み風）のSVGを生成する。乱数は固定シードで、毎回同じ絵になる。"""
import random

random.seed(1582)  # 天正十年

W, H = 1200, 420
ROWS = 9

INK = [
    '#98907f', '#a49a87', '#8b8271', '#ada291',
    '#807769', '#9d9382', '#918878', '#b0a593', '#776e61',
]

def jitter(v, amount):
    return v + random.uniform(-amount, amount)

rows = []
y = 0.0
for r in range(ROWS):
    # 下の段ほど石を大きく積む（実際の石垣は根石が大きい）
    t = r / (ROWS - 1)
    h = 30 + 26 * t
    rows.append((y, y + h))
    y += h
scale = H / y
rows = [(a * scale, b * scale) for a, b in rows]

def inset(pts, d):
    """重心に向けて縮める。石と石のあいだに目地（すきま）を通すため。"""
    cx = sum(a for a, _ in pts) / len(pts)
    cy = sum(b for _, b in pts) / len(pts)
    out = []
    for a, b in pts:
        dx, dy = cx - a, cy - b
        n = (dx * dx + dy * dy) ** .5 or 1
        out.append((a + dx / n * d, b + dy / n * d))
    return out

parts = []
for r, (y0, y1) in enumerate(rows):
    x = -50.0
    base_w = 66 + 40 * (r / (ROWS - 1))
    while x < W + 30:
        w = base_w * random.uniform(0.5, 1.7)
        x1 = x + w
        h = y1 - y0
        # 六角に近い自然石。上下の辺も波打たせる
        p = [
            (jitter(x, 7), jitter(y0, 6)),
            (jitter(x + w * 0.35, 8), jitter(y0, 7)),
            (jitter(x + w * 0.72, 8), jitter(y0, 7)),
            (jitter(x1, 7), jitter(y0 + h * 0.3, 6)),
            (jitter(x1, 6), jitter(y1, 6)),
            (jitter(x + w * 0.6, 9), jitter(y1, 7)),
            (jitter(x + w * 0.25, 9), jitter(y1, 7)),
            (jitter(x, 6), jitter(y0 + h * 0.35, 6)),
        ]
        p = inset(p, random.uniform(2.2, 3.8))
        pts = ' '.join(f'{a:.1f},{b:.1f}' for a, b in p)
        fill = random.choice(INK)
        parts.append(f'<polygon points="{pts}" fill="{fill}"/>')
        # 石の下端に落ちる影。積んだ面の凹凸を出す
        low = [q for q in p if q[1] > (y0 + y1) / 2]
        if len(low) >= 2:
            lo = ' '.join(f'{a:.1f},{b:.1f}' for a, b in low)
            parts.append(f'<polyline points="{lo}" fill="none" stroke="#3a352e" stroke-opacity=".28" stroke-width="2.2"/>')
        x = x1 - random.uniform(0, 6)
    parts.append('')

svg = []
svg.append(f'<svg class="ishigaki" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">')
svg.append('<defs>')
svg.append('<linearGradient id="kage" x1="0" y1="0" x2="0" y2="1">')
svg.append('<stop offset="0" stop-color="#23201c" stop-opacity=".18"/>')
svg.append('<stop offset=".45" stop-color="#23201c" stop-opacity=".05"/>')
svg.append('<stop offset="1" stop-color="#23201c" stop-opacity=".34"/>')
svg.append('</linearGradient>')
svg.append('</defs>')
# 目地（石と石のすきま）を暗く見せるための下地
svg.append(f'<rect x="0" y="0" width="{W}" height="{H}" fill="#4c463d"/>')
svg.extend(parts)
# 全体に上下の陰をかけて、面としての奥行きを出す
svg.append(f'<rect x="0" y="0" width="{W}" height="{H}" fill="url(#kage)"/>')
# 天端（石垣のいちばん上の線）
svg.append(f'<rect x="0" y="0" width="{W}" height="3" fill="#4a443c" opacity=".55"/>')
svg.append('</svg>')

out = '\n'.join(svg)
print(out)
