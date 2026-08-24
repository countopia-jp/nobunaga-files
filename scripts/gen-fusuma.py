#!/usr/bin/env python3
"""金地の襖をSVGで組む。乱数は固定シードなので毎回同じ絵になる。"""
import random

random.seed(1582)  # 天正十年

W, H = 1200, 420
PANELS = 5
KAMOI = 26          # 鴨居（上の横木）の高さ
SHIKII = 16         # 敷居（下の横木）
FUCHI = 7           # 襖の縁の太さ

body_top = KAMOI
body_bot = H - SHIKII
pw = W / PANELS

out = []
out.append(f'<svg class="fusuma" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">')
out.append('<defs>')
out.append('<linearGradient id="kinji" x1="0" y1="0" x2="0" y2="1">')
out.append('<stop offset="0"   stop-color="#e0c574"/>')
out.append('<stop offset=".38" stop-color="#d2b04c"/>')
out.append('<stop offset="1"   stop-color="#b8942f"/>')
out.append('</linearGradient>')
out.append('<linearGradient id="ki" x1="0" y1="0" x2="0" y2="1">')
out.append('<stop offset="0" stop-color="#3d342a"/>')
out.append('<stop offset="1" stop-color="#241e18"/>')
out.append('</linearGradient>')
out.append('<linearGradient id="oku" x1="0" y1="0" x2="0" y2="1">')
out.append('<stop offset="0" stop-color="#23201c" stop-opacity=".20"/>')
out.append('<stop offset=".3" stop-color="#23201c" stop-opacity=".04"/>')
out.append('<stop offset="1" stop-color="#23201c" stop-opacity=".16"/>')
out.append('</linearGradient>')
out.append('</defs>')

# 奥の暗がり（襖の隙間や框の影の下地）
out.append(f'<rect x="0" y="0" width="{W}" height="{H}" fill="#2b251e"/>')

for i in range(PANELS):
    x0 = i * pw
    # 縁（黒漆の框）
    out.append(f'<rect x="{x0:.1f}" y="{body_top}" width="{pw:.1f}" height="{body_bot-body_top}" fill="#2e2721"/>')
    # 金地の紙面
    ix, iy = x0 + FUCHI, body_top + FUCHI
    iw, ih = pw - FUCHI * 2, (body_bot - body_top) - FUCHI * 2
    out.append(f'<rect x="{ix:.1f}" y="{iy:.1f}" width="{iw:.1f}" height="{ih:.1f}" fill="url(#kinji)"/>')

    # 砂子（金箔の粒）。控えめに散らす
    for _ in range(120):
        sx = random.uniform(ix, ix + iw)
        sy = random.uniform(iy, iy + ih)
        r = random.uniform(.5, 1.7)
        op = random.uniform(.06, .26)
        col = '#fff3cf' if random.random() < .6 else '#8a6a1c'
        out.append(f'<circle cx="{sx:.1f}" cy="{sy:.1f}" r="{r:.2f}" fill="{col}" opacity="{op:.2f}"/>')

    # 箔の継ぎ目（金箔を継いだ縦横の線）
    for k in range(1, 4):
        ly = iy + ih * k / 4
        out.append(f'<line x1="{ix:.1f}" y1="{ly:.1f}" x2="{ix+iw:.1f}" y2="{ly:.1f}" stroke="#8a6a1c" stroke-opacity=".10" stroke-width="1"/>')
    for k in range(1, 3):
        lx = ix + iw * k / 3
        out.append(f'<line x1="{lx:.1f}" y1="{iy:.1f}" x2="{lx:.1f}" y2="{iy+ih:.1f}" stroke="#8a6a1c" stroke-opacity=".10" stroke-width="1"/>')

    # 引手（ひきて）。襖を引くための金具
    hx = x0 + pw * (0.16 if i % 2 == 0 else 0.84)
    hy = body_top + (body_bot - body_top) * 0.54
    out.append(f'<ellipse cx="{hx:.1f}" cy="{hy:.1f}" rx="13" ry="17" fill="#2b241d"/>')
    out.append(f'<ellipse cx="{hx:.1f}" cy="{hy:.1f}" rx="9.5" ry="13.5" fill="none" stroke="#c9a63f" stroke-opacity=".55" stroke-width="1.2"/>')
    out.append(f'<ellipse cx="{hx:.1f}" cy="{hy-3:.1f}" rx="5" ry="6" fill="#1b1610" opacity=".8"/>')

    # 襖と襖の合わせ目の影
    if i > 0:
        out.append(f'<rect x="{x0-2:.1f}" y="{body_top}" width="4" height="{body_bot-body_top}" fill="#17130f" opacity=".55"/>')

# 鴨居・敷居
out.append(f'<rect x="0" y="0" width="{W}" height="{KAMOI}" fill="url(#ki)"/>')
out.append(f'<rect x="0" y="{KAMOI-3}" width="{W}" height="3" fill="#15110d" opacity=".6"/>')
out.append(f'<rect x="0" y="{body_bot}" width="{W}" height="{SHIKII}" fill="url(#ki)"/>')
out.append(f'<rect x="0" y="{body_bot}" width="{W}" height="2" fill="#15110d" opacity=".6"/>')

# 全体の陰
out.append(f'<rect x="0" y="0" width="{W}" height="{H}" fill="url(#oku)"/>')
out.append('</svg>')

print('\n'.join(out))
