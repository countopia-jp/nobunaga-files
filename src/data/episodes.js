// ───────────────────────────────────────────────────────────────
//  ノブナガ・ファイル｜エピソード一元管理
// ───────────────────────────────────────────────────────────────
//  ここに1件追記するだけで、年表トップと詳細ページが自動で増える。
//
//  1エピソード = { slug, title, year, dateLabel, lead, points[], tags[] }
//    points[] = 検証項目の配列。1つの逸話でも信憑性は項目ごとに分かれる
//    （例：本能寺は「実行犯=確実／名台詞=創作」）ので、必ず配列で持つ。
//
//    point = {
//      claim   : 通説（ドラマ等で語られる主張）
//      rating  : 信憑性度 1〜5（rubric.js 参照。5=一次史料 … 1=創作）
//      verdict : 一言の見立て（断定はしない。「後世の脚色」等）
//      sources : [{ label, kind, note }] kind = 一次/編纂/後代/軍記/創作
//    }
//
//  ※ rating と verdict は暫定。公開前に史料を当て直して確定させること。
// ───────────────────────────────────────────────────────────────

export const episodes = [
  {
    slug: 'kanegasaki',
    title: '金ヶ崎の退き口 —— 秀吉の殿と、お市の小豆袋',
    year: 1570,
    dateLabel: '元亀元年（1570）四月',
    lead:
      '浅井長政の裏切りで挟撃の危機に陥った信長が、越前・朝倉攻めの途上から急ぎ撤退した一戦。しんがりを木下秀吉が一手に引き受け、お市が両端を縛った小豆袋で挟撃を報せた——と語られる。',
    points: [
      {
        claim: '浅井長政の離反により、信長は挟撃を避けて撤退した',
        rating: 4,
        verdict: '骨格はほぼ確か',
        sources: [
          { label: '信長公記', kind: '編纂', note: '太田牛一。撤退の経緯を記す側近の記録' },
        ],
      },
      {
        claim: '秀吉がただ一人しんがりを務め、武功を挙げた',
        rating: 2,
        verdict: '英雄譚として誇張の疑い',
        sources: [
          { label: '太閤記（甫庵）', kind: '軍記', note: '秀吉顕彰の色が濃い後世の読み物' },
          { label: '信長公記', kind: '編纂', note: '殿には池田勝正・明智光秀らの名も挙がる' },
        ],
      },
      {
        claim: 'お市が両端を縛った小豆袋を送り、挟撃の危機を報せた',
        rating: 1,
        verdict: '同時代史料になく、後世の創作',
        sources: [
          { label: '後世の逸話・講談', kind: '創作', note: '当時の記録に該当なし' },
        ],
      },
    ],
    tags: ['撤退戦', '逸話'],
  },

  {
    slug: 'nagashino-sandan',
    title: '長篠の戦い「三段撃ち」—— 鉄砲三千挺は交互に撃たれたか',
    year: 1575,
    dateLabel: '天正三年（1575）五月',
    lead:
      '武田勝頼の軍を織田・徳川連合が破った合戦。三千挺の鉄砲を三列に並べ、入れ替わりで連射して武田騎馬軍団を殲滅した——という「三段撃ち」が広く知られる。',
    points: [
      {
        claim: '長篠で武田軍に勝利し、鉄砲を大量に用いた',
        rating: 5,
        verdict: '勝敗・鉄砲の多用は確か',
        sources: [
          { label: '信長公記', kind: '編纂', note: '合戦の経過と鉄砲の使用を記す' },
          { label: '同時代の書状類', kind: '一次', note: '戦勝を伝える当時の文書' },
        ],
      },
      {
        claim: '三千挺を三段に構え、交互に連射する「三段撃ち」を行った',
        rating: 2,
        verdict: '一次に近い記録に該当なし',
        sources: [
          { label: '信長公記', kind: '編纂', note: '「三段撃ち」の明確な記述はない' },
          { label: '甫庵信長記', kind: '軍記', note: '三段撃ちの記述はこの系統が初出とされる' },
        ],
      },
      {
        claim: '無敵の武田「騎馬軍団」を鉄砲で壊滅させた',
        rating: 3,
        verdict: '騎馬突撃像そのものに議論',
        sources: [
          { label: '近年の研究', kind: '後代', note: '当時は下馬戦闘が主で「騎馬軍団」像は再検討中' },
        ],
      },
    ],
    tags: ['合戦', '鉄砲'],
  },

  {
    slug: 'honnoji',
    title: '本能寺の変 —— 事実は堅く、動機は諸説、名台詞は創作',
    year: 1582,
    dateLabel: '天正十年（1582）六月二日',
    lead:
      '重臣・明智光秀の謀反により、信長が京・本能寺で最期を遂げた事件。起きたこと自体は動かないが、「なぜ」を巡っては俗説が積み重なり、名場面の多くは後世の産物でもある。',
    points: [
      {
        claim: '明智光秀が信長を討った（実行犯）',
        rating: 5,
        verdict: '同時代史料で確実',
        sources: [
          { label: '公家の日記', kind: '一次', note: '事件直後の京の記録が一致する' },
          { label: 'フロイス書簡', kind: '一次', note: '宣教師による同時代の報告' },
        ],
      },
      {
        claim: '光秀が「敵は本能寺にあり」と号令した',
        rating: 1,
        verdict: '後世の創作（史料に根拠なし）',
        sources: [
          { label: '日本外史（頼山陽）', kind: '後代', note: '江戸後期の史論。名台詞の出所とされる' },
        ],
      },
      {
        claim: '動機は信長への怨恨（折檻・遺恨）だった',
        rating: 2,
        verdict: '後世の軍記・逸話が主な典拠',
        sources: [
          { label: '後世の軍記・逸話', kind: '軍記', note: '同時代の裏付けを欠く' },
        ],
      },
      {
        claim: '信長は最期に「是非に及ばず」と言った',
        rating: 4,
        verdict: '側近の記録にあり比較的有力',
        sources: [
          { label: '信長公記', kind: '編纂', note: '太田牛一が最期の様子として記す' },
        ],
      },
    ],
    tags: ['事件', '名台詞'],
  },

  // ── 人物像ファイル（year: null ＝ 特定の年に紐づかない。時系列とは別枠で表示）──
  {
    slug: 'hototogisu',
    title: '「鳴かぬなら殺してしまえホトトギス」—— 信長は詠んだのか',
    year: null,
    dateLabel: '江戸後期の作（成立年代を特定できず）',
    lead:
      '信長の苛烈さを表すとされる有名な句。秀吉・家康と詠み分けた三句のひとつとして知られるが、信長本人の作でも、同時代に伝わったものでもない。',
    points: [
      {
        claim: '信長自身がこの句を詠んだ',
        rating: 1,
        verdict: '本人の作ではなく、後世の創作',
        sources: [
          { label: '甲子夜話（松浦静山）', kind: '後代', note: '江戸後期の随筆。三英傑を詠み分ける句として載るが、本人の作ではない' },
        ],
      },
      {
        claim: '「殺す／鳴かせる／待つ」の三句は当時から語られていた',
        rating: 1,
        verdict: 'いずれも後世に作られた人物対比',
        sources: [
          { label: '後世の文芸・随筆', kind: '創作', note: '三英傑を戯画的に対比する文芸上の趣向' },
        ],
      },
    ],
    tags: ['人物像', '創作句'],
  },
];

// 年に紐づくエピソードを古い順に。トップの年表はこれを使う。
export function episodesByYear() {
  return episodes.filter((e) => e.year != null).sort((a, b) => a.year - b.year);
}

// 特定の年に紐づかない「人物像」エピソード。年表の下に別枠で並べる。
export function timelessEpisodes() {
  return episodes.filter((e) => e.year == null);
}

export function getEpisode(slug) {
  return episodes.find((e) => e.slug === slug);
}

// エピソード内の信憑性度の幅（最小〜最大）。年表カードの一覧表示用。
export function ratingRange(ep) {
  const rs = ep.points.map((p) => p.rating);
  return { min: Math.min(...rs), max: Math.max(...rs) };
}
