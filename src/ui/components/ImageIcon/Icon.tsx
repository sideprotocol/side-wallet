export default function Icon({ style, type }: { style?: React.CSSProperties; type: string }) {
  return (
    <svg className="icon" style={style}>
      <use xlinkHref={`#${type}`} />
    </svg>
  );
}
