// 本の表紙：文字と簡単な図形で描くオリジナルの装丁（外部画像は使わない）
const W = 120;
const H = 168;

function Motif({ type, fg, accent }) {
  switch (type) {
    case "waves":
      return (
        <g fill="none" stroke={accent} strokeWidth="1.6">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M0 ${108 + i * 11} q15 -7 30 0 t30 0 t30 0 t30 0`} opacity={1 - i * 0.15} />
          ))}
        </g>
      );
    case "arch":
      return (
        <g fill="none" stroke={accent} strokeWidth="1.8">
          <path d="M20 156 V104 Q20 70 60 70 Q100 70 100 104 V156" />
          <path d="M40 156 V78 M60 156 V70 M80 156 V78 M20 118 H100 M20 138 H100" strokeWidth="1.2" />
          <path d="M8 156 H112" stroke={fg} strokeWidth="1" />
        </g>
      );
    case "ribs":
      return (
        <g fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round">
          <path d="M12 128 Q60 118 108 130" />
          {[22, 34, 46, 58, 70, 82, 94].map((x, i) => {
            const h = 30 - Math.abs(i - 3) * 5;
            return <path key={x} d={`M${x} ${126 - i * 0.4} q5 -${h * 0.6} 2 -${h}`} />;
          })}
          <path d="M0 150 H120" stroke={fg} strokeWidth="0.8" opacity="0.5" />
        </g>
      );
    case "sun":
      return (
        <g>
          <circle cx="60" cy="132" r="28" fill={accent} />
          <rect x="0" y="132" width={W} height={H - 132} fill={fg} opacity="0.12" />
          <line x1="0" y1="132" x2={W} y2="132" stroke={fg} strokeWidth="1" />
        </g>
      );
    case "clouds":
      return (
        <g fill={accent}>
          <circle cx="34" cy="120" r="12" />
          <circle cx="50" cy="114" r="15" />
          <circle cx="66" cy="122" r="11" />
          <rect x="22" y="120" width="56" height="12" rx="6" />
          <g opacity="0.6">
            <circle cx="82" cy="146" r="9" />
            <circle cx="94" cy="141" r="11" />
            <rect x="74" y="144" width="34" height="9" rx="4.5" />
          </g>
        </g>
      );
    case "grid":
      return (
        <g stroke={accent} strokeWidth="1.2" fill="none">
          <rect x="14" y="96" width="92" height="60" />
          {[34, 60, 84].map((x) => (
            <line key={x} x1={x} y1="96" x2={x} y2="156" />
          ))}
          {[108, 120, 132, 144].map((y) => (
            <line key={y} x1="14" y1={y} x2="106" y2={y} />
          ))}
          <rect x="60" y="132" width="24" height="12" fill={accent} />
          <rect x="14" y="96" width="92" height="12" fill={fg} opacity="0.12" stroke="none" />
        </g>
      );
    default:
      return null;
  }
}

export default function Cover({ book }) {
  const { bg, fg, accent, motif, lines } = book.cover;
  const longest = Math.max(...lines.map((l) => l.length));
  const fontSize = longest >= 5 ? 15.5 : 17;
  const lineGap = fontSize * 1.32;
  const top = 34;
  return (
    <svg className="cover" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      <rect width={W} height={H} fill={bg} />
      <rect width="5" height={H} fill={fg} opacity="0.12" />
      <Motif type={motif} fg={fg} accent={accent} />
      <g className="cover__type" fill={fg}>
        {lines.map((line, i) => (
          <text key={i} x="14" y={top + i * lineGap} fontSize={fontSize} fontWeight="600" letterSpacing="0.5">
            {line}
          </text>
        ))}
        <text x="14" y={top + lineGap * (lines.length - 1) + 20} fontSize="7.5" opacity="0.85" letterSpacing="0.8">
          {book.author}
        </text>
      </g>
    </svg>
  );
}
