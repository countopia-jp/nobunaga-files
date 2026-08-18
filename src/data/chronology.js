/* ───────────────────────────────────────────────
   年表データ｜『信長公記』の巻立てに沿った編年
   ---------------------------------------------
   太田牛一『信長公記』は、上洛以前を記した「首巻」と、
   永禄11年（1568）の上洛から天正10年（1582）の本能寺まで
   「一年＝一巻」で編まれた本記十五巻から成る。
   この年表はその巻立てをそのまま骨格にしている。

   各 event のフィールド
     month : 表示する月（首巻は年をそのまま入れる）
     text  : 出来事
     koki  : true  = 『信長公記』に記載のある事項
             false = 他史料による補い（画面では「補足」と表示）
     slug  : 対応する検証ファイルがある場合の episodes.js の slug
     note  : 補足のとき、その典拠や注記（任意）
   ─────────────────────────────────────────────── */

export const chronology = [
  {
    maki: '首巻',
    wa: '天文〜永禄10年',
    year: '〜1567',
    lead:
      '上洛以前。信長の父・信秀の代から、尾張統一と美濃攻略までを記す。本記十五巻とは別に編まれた巻で、年月日の記述は本記ほど細かくない。',
    events: [
      { month: '天文3年', text: '織田信長、生まれる。父は尾張の織田信秀。', koki: false, note: '生年は諸記録による' },
      { month: '天文15年', text: '元服して織田三郎信長を名のる。', koki: true },
      { month: '天文21年ごろ', text: '父・信秀が死去し、家督を継ぐ。', koki: true },
      { month: '天文23年', text: '清洲城を攻略する。', koki: true },
      { month: '永禄元年', text: '弟・織田信勝（信行）を謀殺する。', koki: true },
      { month: '永禄2年', text: '岩倉城を攻略する。', koki: true },
      { month: '永禄3年5月', text: '桶狭間の戦い。今川義元を討ち取る。', koki: true, slug: 'okehazama' },
      { month: '永禄7年', text: '犬山城を攻略し、尾張をほぼ統一する。', koki: true },
      { month: '永禄10年', text: '稲葉山城を攻略。井ノ口を岐阜と改める。', koki: true },
      { month: '永禄10年ごろ', text: '「天下布武」の印を用い始める。', koki: false, slug: 'tenka-fubu', note: '印判の使用は同時代文書から確認される' },
    ],
  },
  {
    maki: '巻一',
    wa: '永禄11年',
    year: 1568,
    events: [
      { month: '二月', text: '北伊勢を平定する。', koki: false, note: '『勢州軍記』による' },
      { month: '七月', text: '足利義昭を美濃に迎える。', koki: true },
      { month: '九月', text: '近江の六角氏を破り、義昭を奉じて入京する。', koki: true },
      { month: '十月', text: '三好三人衆らを破り畿内を平定。義昭が征夷大将軍となる。', koki: true },
    ],
  },
  {
    maki: '巻二',
    wa: '永禄12年',
    year: 1569,
    events: [
      { month: '二月', text: '義昭のため二条御所の造営を始める（四月に完成）。', koki: true },
      { month: '十月', text: '南伊勢へ攻め込む（大河内城の戦い）。', koki: true },
    ],
  },
  {
    maki: '巻三',
    wa: '元亀元年',
    year: 1570,
    events: [
      { month: '四月', text: '越前の朝倉義景を攻めるが、浅井長政の離反により撤退する（金ヶ崎）。', koki: true, slug: 'kanegasaki' },
      { month: '六月', text: '姉川の戦い。浅井・朝倉軍と戦う。', koki: true },
      { month: '九月', text: '石山本願寺が敵対する（野田・福島の戦い）。', koki: true },
      { month: '九月', text: '志賀の陣。浅井・朝倉軍を比叡山延暦寺が保護する。', koki: true },
    ],
  },
  {
    maki: '巻四',
    wa: '元亀2年',
    year: 1571,
    events: [
      { month: '五月', text: '長島を攻めるが撤退する。', koki: true },
      { month: '九月', text: '坂本および比叡山を焼き討ちする。', koki: true, slug: 'hieizan' },
    ],
  },
  {
    maki: '巻五',
    wa: '元亀3年',
    year: 1572,
    events: [
      { month: '七月', text: '浅井の小谷城を攻めるが撤退する。', koki: true },
      { month: '十月', text: '武田信玄が甲府を発つ（西上作戦）。', koki: true },
      { month: '十二月', text: '三方ヶ原の戦いで徳川家康が敗れる。', koki: true },
    ],
  },
  {
    maki: '巻六',
    wa: '天正元年',
    year: 1573,
    events: [
      { month: '四月', text: '武田信玄が病死する。', koki: false },
      { month: '七月', text: '足利義昭を追放する（槙島城の戦い）。', koki: true },
      { month: '八月', text: '朝倉・浅井が滅ぶ（一乗谷城・小谷城）。', koki: true },
      { month: '十一月', text: '佐久間信盛が三好義継を滅ぼす（若江城の戦い）。', koki: true , page: '/monjo/', pageLabel: '折檻状を読む'},
    ],
  },
  {
    maki: '巻七',
    wa: '天正2年',
    year: 1574,
    events: [
      { month: '正月', text: '浅井父子と朝倉義景の首を薄濃にし、宴で披露する。', koki: true, page: '/hakudami/', pageLabel: '髑髏の杯を読む' },
      { month: '三月', text: '正倉院を開封させ、名香・蘭奢待を截り取る。', koki: true, page: '/ranjatai/', pageLabel: '蘭奢待を読む' },
      { month: '四月', text: '越前が一向一揆の支配下に入る。', koki: true },
      { month: '九月', text: '長島一向一揆を殲滅する。', koki: true },
    ],
  },
  {
    maki: '巻八',
    wa: '天正3年',
    year: 1575,
    events: [
      { month: '五月', text: '長篠の戦い。武田勝頼の軍を破る。', koki: true, slug: 'nagashino-sandan' },
      { month: '八月', text: '越前一向一揆を殲滅する。', koki: true },
      { month: '九月', text: '柴田勝家が越前を治める。', koki: true },
      { month: '十一月', text: '権大納言・右近衛大将となる。', koki: true },
    ],
  },
  {
    maki: '巻九',
    wa: '天正4年',
    year: 1576,
    events: [
      { month: '正月', text: '安土城の築城を始める。', koki: true , page: '/azuchi/', pageLabel: '安土城を読む'},
      { month: '五月', text: '本願寺と天王寺で戦う。', koki: true },
      { month: '七月', text: '第一次木津川口の戦い。毛利方の水軍に敗れる。', koki: true },
    ],
  },
  {
    maki: '巻十',
    wa: '天正5年',
    year: 1577,
    events: [
      { month: '三月', text: '紀州へ攻め込む（雑賀攻め）。', koki: true },
      { month: '十月', text: '織田信忠が松永久秀を滅ぼす（信貴山城の戦い）。', koki: true },
      { month: '十月', text: '羽柴秀吉が播磨から中国攻めを始める。', koki: true },
      { month: '十一月', text: '従二位・右大臣となる。', koki: false },
    ],
  },
  {
    maki: '巻十一',
    wa: '天正6年',
    year: 1578,
    events: [
      { month: '二月', text: '播磨の別所長治が離反する。', koki: true },
      { month: '三月', text: '上杉謙信が急死する。', koki: false },
      { month: '十月', text: '斎藤利治が飛騨を経て越中へ攻め込む（月岡野の戦い）。', koki: true },
      { month: '十一月', text: '第二次木津川口の戦い。鉄甲船で毛利水軍を破り、以後は本願寺を兵糧攻めにする。', koki: true },
      { month: '十一月', text: '摂津の荒木村重が離反する。', koki: true },
    ],
  },
  {
    maki: '巻十二',
    wa: '天正7年',
    year: 1579,
    events: [
      { month: '五月', text: '安土城の天主が完成する。', koki: true , page: '/azuchi/', pageLabel: '安土城を読む'},
      { month: '八月', text: '明智光秀が丹波を平定する（十月には丹後も）。', koki: true },
      { month: '——', text: '備前の宇喜多直家が毛利から離れ、織田方につく。', koki: true },
      { month: '十二月', text: '荒木一族を処刑する。', koki: true , page: '/episodes/zangyaku/', pageLabel: '残虐性の検証へ'},
    ],
  },
  {
    maki: '巻十三',
    wa: '天正8年',
    year: 1580,
    events: [
      { month: '正月', text: '羽柴秀吉が三木城を落とし、播磨を平定する。', koki: true },
      { month: '三月', text: '小田原の北条氏政と同盟する。', koki: true },
      { month: '五月', text: '羽柴秀長が但馬を平定する。', koki: true },
      { month: '八月', text: '本願寺が大坂を退去し、石山合戦が終わる。', koki: true },
      { month: '十一月', text: '柴田勝家が加賀を平定する。', koki: true },
    ],
  },
  {
    maki: '巻十四',
    wa: '天正9年',
    year: 1581,
    events: [
      { month: '二月', text: '京都で御馬揃えを行う。', koki: true },
      { month: '九月', text: '織田信雄が伊賀を平定する（天正伊賀の乱）。', koki: true },
      { month: '十月', text: '羽柴秀吉が鳥取城を兵糧攻めにする。', koki: true },
    ],
  },
  {
    maki: '巻十五',
    wa: '天正10年',
    year: 1582,
    events: [
      { month: '三月', text: '織田信忠らの甲州征伐により、武田氏が滅ぶ。', koki: true },
      { month: '五月', text: '羽柴秀吉が備中高松城を水攻めにする。', koki: true },
      { month: '六月', text: '柴田勝家が越中・魚津城を攻略する。', koki: false },
      { month: '六月二日', text: '本能寺の変。明智光秀の襲撃を受け、信長は自害する。', koki: true, slug: 'honnoji' },
    ],
  },
];

export function chronologyStats() {
  const all = chronology.flatMap((m) => m.events);
  return {
    volumes: chronology.length,
    events: all.length,
    koki: all.filter((e) => e.koki).length,
    linked: all.filter((e) => e.slug).length,
  };
}
