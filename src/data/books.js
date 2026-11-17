// 蔵書データ（すべて架空）。すべて貸出可能として扱う。
// cover：表紙の配色・図柄・表紙に載せる書名の改行位置
export const BOOKS = [
  {
    id: "b1",
    title: "潮見坂の郵便局",
    author: "浜野 澄子",
    summary: "港町の小さな郵便局に残された宛名のない手紙。新人局員が差出人を探して町を歩く連作短編集。",
    loanPeriod: "2週間",
    cover: { bg: "#2f4f6a", fg: "#f3eee2", accent: "#c9a86a", motif: "waves", lines: ["潮見坂の", "郵便局"] },
  },
  {
    id: "b2",
    title: "冬の温室",
    author: "千草 遼",
    summary: "閉園が決まった植物園で、最後の冬を過ごす三人の職員の物語。",
    loanPeriod: "3週間",
    cover: { bg: "#dfe6dc", fg: "#24402f", accent: "#7fa38a", motif: "arch", lines: ["冬の", "温室"] },
  },
  {
    id: "b3",
    title: "鯨の骨が眠る町",
    author: "宮森 七海",
    summary: "浜に打ち上げられた鯨の骨格標本づくりを手伝う高校生の、迷いの多いひと夏。",
    loanPeriod: "1週間",
    cover: { bg: "#e9e4d8", fg: "#2b3a44", accent: "#8aa1ad", motif: "ribs", lines: ["鯨の骨が", "眠る町"] },
  },
  {
    id: "b4",
    title: "午前五時のパン屋",
    author: "森下 小春",
    summary: "商店街で二十年パンを焼いてきた著者が、仕込みの時間に考えたことを綴るエッセイ集。",
    loanPeriod: "2週間",
    cover: { bg: "#f0e2c8", fg: "#5a3a1c", accent: "#d08b3e", motif: "sun", lines: ["午前五時の", "パン屋"] },
  },
  {
    id: "b5",
    title: "雲を数える人びと",
    author: "篠原 航",
    summary: "山頂の観測所や空港の気象台を訪ね、天気予報を支える観測の仕事を紹介する。",
    loanPeriod: "2週間",
    cover: { bg: "#cfdde6", fg: "#1f3a4d", accent: "#ffffff", motif: "clouds", lines: ["雲を数える", "人びと"] },
  },
  {
    id: "b6",
    title: "はじめての表計算",
    author: "奥村 健太",
    summary: "家計簿と売上表の二つの例題で、入力の基本から関数、グラフ作成までを順に学べる。",
    loanPeriod: "10日間",
    cover: { bg: "#f6f6f2", fg: "#1e4d3a", accent: "#9cc3ad", motif: "grid", lines: ["はじめての", "表計算"] },
  },
];

export const BRANCHES = ["中央図書館", "東分館"];
