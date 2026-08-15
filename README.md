# ノブナガ・ファイル（The Nobunaga Files）

織田信長の通説を時系列で検証する静的サイト。Astro + Cloudflare Pages（Countopiaと同じ構成）。

## 動かす

```bash
cd ~/Projects/nobunaga-files
npm install          # 初回のみ
npm run dev          # http://localhost:4321 で確認
npm run build        # dist/ に本番ビルド
```

## エピソードの増やし方（ここが運用の中心）

`src/data/episodes.js` の配列に1件足すだけ。トップの年表も詳細ページも自動で増える。

```js
{
  slug: 'okehazama',                 // URL（/episodes/okehazama/）。半角英数
  title: '桶狭間 —— 奇襲か、正面攻撃か',
  year: 1560,                        // 時系列の並び順はこの数字で決まる
  dateLabel: '永禄三年（1560）五月',
  lead: '通説の要約（トップのカードにも出る）',
  points: [                          // 検証項目。1件でも複数でもOK
    {
      claim: '信長は迂回して奇襲した',
      rating: 2,                     // 信憑性度 1〜5（src/data/rubric.js 参照）
      verdict: '近年は正面攻撃説が有力',
      sources: [
        { label: '信長公記', kind: '編纂', note: '補足メモ' },
        // kind は 一次 / 編纂 / 後代 / 軍記 / 創作 のいずれか
      ],
    },
  ],
  tags: ['合戦'],
}
```

### 信憑性度のものさし（`src/data/rubric.js`）
- 5 確実：同時代の一次史料で裏付け
- 4 有力：一次に近い良質な編纂物（『信長公記』など）
- 3 諸説：後代の編纂物で一致、一次では未確認
- 2 疑わし：軍記物が主な典拠（後世の脚色）
- 1 創作：講談・近代の創作・ドラマ発、史料に根拠なし

※ 収録済みの3件（金ヶ崎・長篠三段撃ち・本能寺）の rating と verdict は**暫定**。
公開前に史料を当て直して確定させること。

## デプロイ
Cloudflare Pages に接続 → ビルドコマンド `npm run build`、出力 `dist`。
`astro.config.mjs` の `site` は `https://nobunaga-files.com` 済み。

## メモ
- コメント機能は入口では無し（後付けできるよう詳細ページ末尾に余白あり）。
- 「どう見る?」的な問いかけは置かず、通説→出典→信憑性度を淡々と提示する方針。
