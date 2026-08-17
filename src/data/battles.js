/* ───────────────────────────────────────────────
   合戦データベース
   ---------------------------------------------
   信長が関わった主な戦を、年代順に一覧する。

   result : RESULT のキー
   maki   : 『信長公記』のどの巻に載るか（首巻／巻一〜巻十五）
   self   : true = 信長自身が出陣した戦
   forces : 兵力。ただし出典を示せるものだけを載せる（後述）
   myth   : 広く語られているが史料の裏づけが弱い点
   ─────────────────────────────────────────────── */

export const RESULT = {
  '勝利': { rank: 5 },
  '和睦・調略': { rank: 3 },
  '撤退': { rank: 2 },
  '敗北': { rank: 1 },
  '中断': { rank: 2 },
};

export const battles = [
  // ── 尾張・美濃期（首巻） ──
  { year: 1552, wa: '天文21年', name: '赤塚の戦い', place: '尾張・赤塚', enemy: '山口教継', result: '和睦・調略', maki: '首巻', self: true,
    desc: '家督を継いだ直後、今川方に転じた鳴海の山口氏と戦った。決着はつかず引き分けに終わる。' },
  { year: 1552, wa: '天文21年', name: '萱津の戦い', place: '尾張・萱津', enemy: '織田信友（坂井大膳）', result: '勝利', maki: '首巻', self: true,
    desc: '清洲織田氏との合戦。勝利して尾張下四郡での立場を固めた。' },
  { year: 1554, wa: '天文23年', name: '村木砦の戦い', place: '尾張・村木', enemy: '今川方', result: '勝利', maki: '首巻', self: true,
    desc: '今川方が築いた砦を攻略。信長が鉄砲を用いた早い時期の例として知られる。' },
  { year: 1556, wa: '弘治2年', name: '稲生の戦い', place: '尾張・稲生', enemy: '織田信勝・柴田勝家・林秀貞', result: '勝利', maki: '首巻', self: true,
    desc: '弟・信勝を擁する家中の反対勢力との内戦。勝家と秀貞は、のちに信長の重臣となる。' },
  { year: 1558, wa: '永禄元年', name: '浮野の戦い', place: '尾張・浮野', enemy: '織田信賢', result: '勝利', maki: '首巻', self: true,
    desc: '岩倉織田氏を破り、尾張統一に大きく近づいた。' },
  { year: 1560, wa: '永禄3年', name: '桶狭間の戦い', place: '尾張・桶狭間', enemy: '今川義元', result: '勝利', maki: '首巻', self: true,
    desc: '尾張へ進出した今川義元を討ち取った。信長の名が天下に知られる契機となる。',
    forces: [{ side: '今川方', num: '四万五千', source: '信長公記' }],
    myth: '豪雨に乗じて山を迂回し背後を突いた、という筋立ては後世の軍記による。',
    episodes: ['okehazama'] },
  { year: 1561, wa: '永禄4年', name: '森部の戦い', place: '美濃・森部', enemy: '斎藤龍興', result: '勝利', maki: '首巻', self: true,
    desc: '美濃攻めの初期の戦い。斎藤義龍の死の直後に攻め込んだ。' },
  { year: 1567, wa: '永禄10年', name: '稲葉山城の戦い', place: '美濃・稲葉山', enemy: '斎藤龍興', result: '勝利', maki: '首巻', self: true,
    desc: '美濃の本拠を落とし、井ノ口を岐阜と改めた。以後、天下布武の印を用い始める。',
    episodes: ['tenka-fubu'] },

  // ── 上洛以後（本記） ──
  { year: 1568, wa: '永禄11年', name: '観音寺城の戦い', place: '南近江', enemy: '六角義賢・義治', result: '勝利', maki: '巻一', self: true,
    desc: '上洛路を塞ぐ六角氏を破り、義昭を奉じて入京する道を開いた。' },
  { year: 1569, wa: '永禄12年', name: '大河内城の戦い', place: '南伊勢', enemy: '北畠具教', result: '和睦・調略', maki: '巻二', self: true,
    desc: '力攻めでは落とせず、次男・信雄を養子に入れる条件で和睦した。伊勢は事実上、織田の勢力下に入る。' },
  { year: 1570, wa: '元亀元年', name: '金ヶ崎の退き口', place: '越前・金ヶ崎', enemy: '朝倉義景／浅井長政', result: '撤退', maki: '巻三', self: true,
    desc: '越前攻めの最中に浅井が離反し、挟撃を避けて撤退した。信長の生涯で最も危険な退却とされる。',
    myth: '秀吉が単独で殿を務めた話、お市の小豆袋の逸話は、いずれも後世の書物による。',
    episodes: ['kanegasaki'] },
  { year: 1570, wa: '元亀元年', name: '姉川の戦い', place: '北近江・姉川', enemy: '浅井長政・朝倉義景', result: '勝利', maki: '巻三', self: true,
    desc: '徳川家康との連合軍で浅井・朝倉軍と戦った。ただし浅井氏の滅亡までは、なお三年を要する。',
    myth: '「姉川の戦い」という呼称は後世のもので、当時は野村合戦などと呼ばれた。' },
  { year: 1570, wa: '元亀元年', name: '野田・福島の戦い', place: '摂津', enemy: '三好三人衆・石山本願寺', result: '撤退', maki: '巻三', self: true,
    desc: '三好勢を攻めている最中に本願寺が挙兵し、十年におよぶ石山合戦が始まった。' },
  { year: 1570, wa: '元亀元年', name: '志賀の陣', place: '近江・坂本', enemy: '浅井・朝倉／延暦寺', result: '和睦・調略', maki: '巻三', self: true,
    desc: '浅井・朝倉軍を比叡山が保護し、長期の対陣となった。朝廷の仲介で和睦する。この経緯が翌年の焼き討ちにつながる。' },
  { year: 1571, wa: '元亀2年', name: '第一次長島侵攻', place: '伊勢・長島', enemy: '長島一向一揆', result: '敗北', maki: '巻四', self: true,
    desc: '攻めきれずに撤退し、退却戦で氏家卜全を失った。' },
  { year: 1571, wa: '元亀2年', name: '比叡山焼き討ち', place: '近江・坂本／比叡山', enemy: '延暦寺', result: '勝利', maki: '巻四', self: true,
    desc: '山内を焼き払い、僧俗を問わず討った。信長の苛烈さを示す事例として最も引かれる。',
    myth: '全山焼失・数千人という記述の規模は、発掘で確認される痕跡と食い違うとされる。',
    episodes: ['hieizan'] },
  { year: 1572, wa: '元亀3年', name: '三方ヶ原の戦い', place: '遠江', enemy: '武田信玄', result: '敗北', maki: '巻五', self: false,
    desc: '西上する武田軍に徳川家康が大敗した。信長は援軍を送っていたが、自身は出陣していない。' },
  { year: 1573, wa: '天正元年', name: '槇島城の戦い', place: '山城・槇島', enemy: '足利義昭', result: '勝利', maki: '巻六', self: true,
    desc: '挙兵した義昭を降し、京から追放した。室町幕府はここで実質的に終わる。' },
  { year: 1573, wa: '天正元年', name: '一乗谷・刀根坂の戦い', place: '越前', enemy: '朝倉義景', result: '勝利', maki: '巻六', self: true,
    desc: '撤退する朝倉軍を追撃して壊滅させ、一乗谷を焼いた。義景は自害する。' },
  { year: 1573, wa: '天正元年', name: '小谷城の戦い', place: '北近江・小谷', enemy: '浅井長政', result: '勝利', maki: '巻六', self: true,
    desc: '朝倉の滅亡から間を置かず小谷城を落とし、浅井氏が滅んだ。お市と三姉妹は城を出た。' },
  { year: 1574, wa: '天正2年', name: '第三次長島侵攻', place: '伊勢・長島', enemy: '長島一向一揆', result: '勝利', maki: '巻七', self: true,
    desc: '包囲と兵糧攻めののち、投降者を含めて殲滅した。三度目でようやく決着がついた。' },
  { year: 1575, wa: '天正3年', name: '長篠の戦い', place: '三河・設楽原', enemy: '武田勝頼', result: '勝利', maki: '巻八', self: true,
    desc: '徳川と連合し、武田軍を野戦で破った。武田氏の勢いはここで折れる。',
    forces: [{ side: '織田方の鉄砲', num: '千挺', source: '信長公記 巻八' }],
    myth: '三千挺を三段に分けて交互に撃った、という描写は『信長公記』にはない。',
    episodes: ['nagashino-sandan'] },
  { year: 1575, wa: '天正3年', name: '越前一向一揆掃討', place: '越前', enemy: '越前一向一揆', result: '勝利', maki: '巻八', self: true,
    desc: '長篠の直後に大軍を投じて制圧した。以後、越前は柴田勝家が治める。' },
  { year: 1576, wa: '天正4年', name: '天王寺の戦い', place: '摂津', enemy: '石山本願寺', result: '勝利', maki: '巻九', self: true,
    desc: '包囲されていた砦を救うため、信長自身がわずかな手勢で駆けつけた。この戦で信長は負傷している。' },
  { year: 1576, wa: '天正4年', name: '第一次木津川口の戦い', place: '摂津・木津川口', enemy: '毛利水軍', result: '敗北', maki: '巻九', self: false,
    desc: '本願寺への補給を断とうとしたが、毛利の水軍に敗れて海上封鎖に失敗した。' },
  { year: 1577, wa: '天正5年', name: '紀州攻め（雑賀攻め）', place: '紀伊', enemy: '雑賀衆', result: '和睦・調略', maki: '巻十', self: true,
    desc: '本願寺方の鉄砲集団を攻め、一部を降した。ただし反織田の勢力は残った。' },
  { year: 1577, wa: '天正5年', name: '手取川の戦い', place: '加賀', enemy: '上杉謙信', result: '敗北', maki: '巻十', self: false,
    desc: '柴田勝家らの北陸方面軍が上杉軍と衝突した。',
    myth: '織田軍の大敗として語られるが、『信長公記』はこの戦いを詳しく記しておらず、規模や経緯には議論がある。' },
  { year: 1577, wa: '天正5年', name: '信貴山城の戦い', place: '大和', enemy: '松永久秀', result: '勝利', maki: '巻十', self: false,
    desc: '再び叛いた松永久秀を織田信忠が攻め、久秀は自害した。',
    myth: '名器・平蜘蛛の茶釜とともに爆死したという話は後世の脚色。' },
  { year: 1578, wa: '天正6年', name: '第二次木津川口の戦い', place: '摂津・木津川口', enemy: '毛利水軍', result: '勝利', maki: '巻十一', self: false,
    desc: '九鬼嘉隆の大型船で毛利水軍を破り、制海権を得た。以後、本願寺は兵糧攻めに追い込まれる。',
    myth: '「鉄甲船」という呼び名と、船体を鉄板で覆ったという理解は、後世の解釈による部分が大きい。' },
  { year: 1578, wa: '天正6年', name: '三木合戦', place: '播磨・三木城', enemy: '別所長治', result: '勝利', maki: '巻十一〜十三', self: false,
    desc: '羽柴秀吉が二年近く包囲し、兵糧攻めで落とした。城兵の助命と引き換えに別所長治は自害する。',
    myth: '「三木の干し殺し」という呼称は後世のもの。' },
  { year: 1579, wa: '天正7年', name: '八上城の戦い', place: '丹波', enemy: '波多野秀治', result: '勝利', maki: '巻十二', self: false,
    desc: '明智光秀が三年以上を費やして丹波を平定した。光秀の評価を決定づけた戦役である。',
    myth: '光秀が母を人質に出し、開城後に磔にされたという逸話は、後世の記述による。' },
  { year: 1580, wa: '天正8年', name: '石山合戦の終結', place: '摂津・大坂', enemy: '石山本願寺', result: '和睦・調略', maki: '巻十三', self: false,
    desc: '朝廷の仲介で和議が成り、顕如が大坂を退去した。十年におよぶ、信長にとって最長の戦役が終わる。' },
  { year: 1581, wa: '天正9年', name: '天正伊賀の乱', place: '伊賀', enemy: '伊賀惣国一揆', result: '勝利', maki: '巻十四', self: false,
    desc: '織田信雄が大軍で伊賀へ攻め入り、平定した。' },
  { year: 1581, wa: '天正9年', name: '鳥取城の戦い', place: '因幡', enemy: '吉川経家', result: '勝利', maki: '巻十四', self: false,
    desc: '羽柴秀吉が周辺の米を買い占めたうえで包囲し、兵糧攻めで落とした。' },
  { year: 1582, wa: '天正10年', name: '甲州征伐', place: '甲斐・信濃', enemy: '武田勝頼', result: '勝利', maki: '巻十五', self: true,
    desc: '織田信忠を総大将とする軍が武田領へ侵攻し、武田氏が滅んだ。信長も後から甲斐へ入っている。' },
  { year: 1582, wa: '天正10年', name: '備中高松城の戦い', place: '備中', enemy: '毛利方・清水宗治', result: '中断', maki: '巻十五', self: false,
    desc: '羽柴秀吉が水攻めで包囲した。信長自身の出陣が決まっていたが、その直前に本能寺の変が起きる。',
    episodes: ['honnoji'] },
];

export function battleStats() {
  const by = {};
  for (const b of battles) by[b.result] = (by[b.result] ?? 0) + 1;
  return {
    total: battles.length,
    self: battles.filter((b) => b.self).length,
    withForces: battles.filter((b) => b.forces).length,
    myths: battles.filter((b) => b.myth).length,
    by,
  };
}
