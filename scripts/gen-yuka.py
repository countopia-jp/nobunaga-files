#!/usr/bin/env python3
"""板の間をSVGで描く。手前に向かって板幅が広がる遠近をつける。"""
import random

random.seed(1582)

W, H = 1200, 300
VP_X, VP_Y = W / 2, -520          # 消失点（画面のはるか上）
PLANKS = 13                        # 板の枚数

INK = ['#6d573a', '#634e33', '#75603f', '#5b4730', '#6a5437', '#7a6444']

out = []
out.append(f'<svg class="yuka" viewBox="0 0 {W} {H}" preserveAspectRatio="none" aria-hidden="true" focusable="false">')
out.append('<defs>')
out.append('<linearGradient id="tsuya" x1="0" y1="0" x2="0" y2="1">')
out.append('<stop offset="0"   stop-color="#1b1610" stop-opacity=".55"/>')
out.append('<stop offset=".35" stop-color="#1b1610" stop-opacity=".18"/>')
out.append('<stop offset="1"   stop-color="#1b1610" stop-opacity=".05"/>')
out.append('</linearGradient>')
out.append('</defs>')
out.append(f'<rect x="0" y="0" width="{W}" height="{H}" fill="#5c482f"/>')

# 板の境目を消失点に向けて引く。奥（y=0）では詰まり、手前（y=H）で広がる
def x_at(t, y):
    """奥行き t（0=奥,1=手前）の板境が、高さ y の位置で来る x"""
    x_far = W / 2 + (t - 0.5) * W * 0.34     # 奥での間隔（狭い）
    x_near = W / 2 + (t - 0.5) * W * 1.6     # 手前での間隔（広い）
    k = y / H
    return x_far + (x_near - x_far) * k

for i in range(PLANKS):
    t0 = i / PLANKS
    t1 = (i + 1) / PLANKS
    pts = [
        (x_at(t0, 0), 0), (x_at(t1, 0), 0),
        (x_at(t1, H), H), (x_at(t0, H), H),
    ]
    p = ' '.join(f'{a:.1f},{b:.1f}' for a, b in pts)
    out.append(f'<polygon points="{p}" fill="{random.choice(INK)}"/>')
    out.append(f'<line x1="{x_at(t0,0):.1f}" y1="0" x2="{x_at(t0,H):.1f}" y2="{H}" '
               f'stroke="#2f2517" stroke-opacity=".5" stroke-width="1.4"/>')

# 板の継ぎ目（横方向）。手前ほど間隔を広く
y = 0.0
step = 26.0
while y < H:
    out.append(f'<line x1="0" y1="{y:.1f}" x2="{W}" y2="{y:.1f}" '
               f'stroke="#2f2517" stroke-opacity=".22" stroke-width="1"/>')
    step *= 1.42
    y += step

# 奥ほど暗く沈ませる
out.append(f'<rect x="0" y="0" width="{W}" height="{H}" fill="url(#tsuya)"/>')
out.append('</svg>')

print('\n'.join(out))
