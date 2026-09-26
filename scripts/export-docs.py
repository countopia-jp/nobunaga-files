#!/usr/bin/env python3
"""引き継ぎ資料の生成。

  python3 scripts/export-docs.py md  <input.md> <output.pdf>   # Markdown → PDF
  python3 scripts/export-docs.py site <dist_dir>  <output.pdf>  # ビルド済み dist → 全記事 校正用 PDF

reportlab + IPAゴシック（無ければ手近な .ttf）。見出し・段落・箇条書き・表（行として）だけの素朴な描画。
"""
import re, sys, glob, os, html
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import ParagraphStyle

import glob as _g
_cands = ['/usr/share/fonts/opentype/ipafont-gothic/ipagp.ttf', '/usr/share/fonts/truetype/fonts-japanese-gothic.ttf'] + _g.glob('/usr/share/fonts/**/*.ttf', recursive=True)
FONT = next(f for f in _cands if os.path.exists(f))
pdfmetrics.registerFont(TTFont('NotoJP', FONT))

def st(size, lead=None, bold=False, left=0, space=4):
    return ParagraphStyle('s%d%d%d' % (size, left, int(bold)), fontName='NotoJP', fontSize=size,
                          leading=lead or size * 1.55, leftIndent=left, spaceAfter=space)

H1, H2, H3, BODY, SMALL, QUOTE = st(15, space=8), st(12.5, space=6), st(11, space=5), st(9.5), st(8.5), st(9.5, left=12)

def esc(t):
    return html.escape(t, quote=False)

def md_to_flow(md):
    flow = []
    for raw in md.split('\n'):
        line = raw.rstrip()
        if not line.strip():
            flow.append(Spacer(1, 3)); continue
        if line.startswith('### '): flow.append(Paragraph(esc(line[4:]), H3))
        elif line.startswith('## '): flow.append(Paragraph(esc(line[3:]), H2))
        elif line.startswith('# '): flow.append(Paragraph(esc(line[2:]), H1))
        elif re.match(r'^\s*[-*] ', line):
            indent = (len(line) - len(line.lstrip())) // 2
            flow.append(Paragraph('・' + esc(re.sub(r'^\s*[-*] ', '', line)), st(9.5, left=10 + indent * 10)))
        elif line.startswith('|'):
            if re.match(r'^\|[\s:-]+\|', line): continue
            cells = [c.strip() for c in line.strip('|').split('|')]
            flow.append(Paragraph(esc('　｜　'.join(cells)), SMALL))
        else:
            t = esc(line)
            t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)
            flow.append(Paragraph(t, BODY))
    return flow

def build(flow, out, title):
    doc = SimpleDocTemplate(out, pagesize=A4, leftMargin=18*mm, rightMargin=18*mm, topMargin=16*mm, bottomMargin=16*mm, title=title)
    doc.build(flow)

def site_to_flow(dist):
    from bs4 import BeautifulSoup
    flow = []
    pages = sorted(glob.glob(os.path.join(dist, '**', 'index.html'), recursive=True))
    total = 0
    body_flows = []
    for p in pages:
        rel = '/' + os.path.relpath(os.path.dirname(p), dist).replace('\\', '/').strip('.')
        rel = rel if rel != '/.' else '/'
        soup = BeautifulSoup(open(p, encoding='utf-8').read(), 'html.parser')
        main = soup.find('main') or soup.body
        for tag in main.find_all(['nav', 'header', 'footer', 'script', 'style', 'svg']):
            tag.decompose()
        items = [Paragraph(esc(rel), H1)]
        for el in main.find_all(['h1', 'h2', 'h3', 'h4', 'p', 'li', 'blockquote', 'cite', 'dt', 'dd']):
            if el.find_parent('blockquote') and el.name != 'blockquote':
                continue
            txt = ' '.join(el.get_text(' ', strip=True).split())
            if not txt: continue
            total += len(txt)
            cls = ' '.join(el.get('class', []))
            if el.name in ('h1',): items.append(Paragraph(esc(txt), H2))
            elif el.name in ('h2',): items.append(Paragraph(esc(txt), H3))
            elif el.name in ('h3', 'h4', 'dt'): items.append(Paragraph('<b>' + esc(txt) + '</b>', BODY))
            elif el.name == 'blockquote':
                q = el.find('cite')
                qtxt = ' '.join(el.get_text(' ', strip=True).split())
                if q:
                    ctxt = ' '.join(q.get_text(' ', strip=True).split())
                    qtxt = qtxt.replace(ctxt, '').strip()
                    items.append(Paragraph('【原文】' + esc(qtxt), QUOTE))
                    items.append(Paragraph('【書誌】' + esc(ctxt), st(8.5, left=12)))
                else:
                    items.append(Paragraph('【原文】' + esc(qtxt), QUOTE))
            elif 'caution' in cls: items.append(Paragraph('【注意】' + esc(txt), BODY))
            elif 'note' in cls or 'after' in cls: items.append(Paragraph('【補足】' + esc(txt), BODY))
            elif 'lead' in cls: items.append(Paragraph('【リード】' + esc(txt), BODY))
            elif el.name == 'li': items.append(Paragraph('・' + esc(txt), st(9.5, left=10)))
            else: items.append(Paragraph(esc(txt), BODY))
        body_flows.append(items)
    cover = [Paragraph('ノブナガ・ファイル　全記事 校正用', H1),
             Paragraph('%d ページ／約 %s 字' % (len(pages), format(total, ',')), BODY),
             Paragraph('ビルド済みHTMLから本文のみを抽出したもの。ヘッダ・フッタ・ナビゲーション・画像は含みません。公開状態にかかわらず、全ページを出力しています。', BODY),
             Paragraph('【原文】史料の原文（当サイトの文章ではありません）／【書誌】所蔵先・文書番号など／【注意】史料を読むときの留保／【補足】付随する説明／【リード】冒頭の要約', BODY),
             PageBreak()]
    flow.extend(cover)
    for items in body_flows:
        flow.extend(items); flow.append(PageBreak())
    return flow

if __name__ == '__main__':
    mode, src, out = sys.argv[1:4]
    if mode == 'md':
        build(md_to_flow(open(src, encoding='utf-8').read()), out, os.path.basename(src))
    else:
        build(site_to_flow(src), out, 'ノブナガ・ファイル 全記事')
    print('wrote', out)
