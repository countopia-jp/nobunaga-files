/*
  ページ登録簿
  ================================================
  検証ファイル（/episodes/○○/）以外の全ページの公開可否をここで管理する。

  verified: false のページは
    ・フッターの一覧と、トップの特集カードで「封」を添えた淡い表示になる
    ・ページ自体を開いても中身は出ず、封の画面になる（noindex）
    ・sitemap に載らない

  検証が済んだものから true に変えて開けていく。
  always: true は封の対象外（トップ、編集方針、404）。

  ※ 判定（信憑性度）の総数は 193 件で、うち 139 件がこちら側にある。
    未確認の原文 6 件も /keizai/ /kani/ /mitsuhide/ /shinkou/ に載っている。
    検証ファイルだけを封じても足りない、というのがこの登録簿を作った理由。
*/

export const pages = [
  { group: '通説を検証する', items: [
    { path: '/',            label: '検証ファイル一覧', always: true },
    { path: '/dedokoro/',   label: '出どころのない逸話', verified: false },
    { path: '/meigen/',     label: '名言・名台詞',       verified: false },
    { path: '/hakudami/',   label: '髑髏の杯',           verified: false },
    { path: '/atago/',      label: '愛宕百韻',           verified: false },
    { path: '/shinkou/',    label: '何を信じていたか',   verified: false },
    { path: '/densho/',     label: '信長伝説の分布',     verified: false },
    { path: '/bukoyawa/',   label: '武功夜話',           verified: false },
  ]},
  { group: '本能寺とその後', items: [
    { path: '/kuromaku/',   label: '黒幕説',             verified: false },
    { path: '/yukue/',      label: '遺体の行方',         verified: false },
    { path: '/tochu/',      label: '途中だったこと',     verified: false },
  ]},
  { group: '権威・政策・経済', items: [
    { path: '/kani/',       label: '異名と官位',         verified: false },
    { path: '/chotei/',     label: '朝廷と信長',         verified: false },
    { path: '/ranjatai/',   label: '蘭奢待',             verified: false },
    { path: '/keizai/',     label: '信長の経済',         verified: false },
  ]},
  { group: '人と勢力', items: [
    { path: '/kashin/',     label: '家臣一覧',           verified: false },
    { path: '/tekitai/',    label: '敵対勢力一覧',       verified: false },
    { path: '/keizu/',      label: '家系図',             verified: false },
    { path: '/ieyasu/',     label: '徳川家康との二十年', verified: false },
    { path: '/mitsuhide/',  label: '明智光秀',           verified: false },
    { path: '/yasuke/',     label: '弥助',               verified: false },
    { path: '/nouhime/',    label: '濃姫',               verified: false },
    { path: '/tsuma/',      label: '妻と子',             verified: false },
  ]},
  { group: '土地と時代', items: [
    { path: '/azuchi/',     label: '安土城',             verified: false },
    { path: '/kyoten/',     label: '居城の変遷',         verified: false },
    { path: '/shiseki/',    label: '史跡・資料館',       verified: false },
    { path: '/nenpyo/',     label: '年表',               verified: false },
    { path: '/kassen/',     label: '合戦データベース',   verified: false },
  ]},
  { group: '物からたどる', items: [
    { path: '/token/',      label: '信長の刀',           verified: false },
    { path: '/meibutsu/',   label: '名物茶器',           verified: false },
    { path: '/mono/',       label: '物から検証する',     verified: false },
  ]},
  { group: '暮らしと文化', items: [
    { path: '/kurashi/',    label: '戦国の暮らし',       verified: false },
    { path: '/namban/',     label: '南蛮との交流',       verified: false },
    { path: '/shumi/',      label: '趣味・嗜好',         verified: false },
    { path: '/shoku/',      label: '食事と好物',         verified: false },
  ]},
  { group: '史料を調べる', items: [
    { path: '/monjo/',      label: '文書を読む',         verified: false },
    { path: '/shiryo/',     label: '文献一覧',           verified: false },
    { path: '/yougo/',      label: '用語辞典',           verified: false },
    { path: '/policy/',     label: '編集方針',           always: true },
  ]},
];

const flat = pages.flatMap((g) => g.items);

function normalize(path) {
  if (!path) return '/';
  return path.endsWith('/') ? path : path + '/';
}

export function pageEntry(path) {
  return flat.find((p) => p.path === normalize(path));
}

// 登録簿にない道（/404 など）は封の対象外として扱う。
// NF_OPEN_ALL=1 のときだけ全ページを開く。全記事PDF（校正用）を作るための一時ビルド専用。
// 公開ビルドで立てないこと。
export const OPEN_ALL = typeof process !== 'undefined' && process.env && process.env.NF_OPEN_ALL === '1';

export function pageOpen(path) {
  if (OPEN_ALL) return true;
  const e = pageEntry(path);
  if (!e) return true;
  if (e.always) return true;
  return !!e.verified;
}

export function pageCount() {
  const target = flat.filter((p) => !p.always);
  return { open: target.filter((p) => p.verified).length, all: target.length };
}
