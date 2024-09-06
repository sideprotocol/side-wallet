import Icon from './Icon';

export default function Index({ style, url }: { style?: React.CSSProperties; url: string | undefined }) {
  if (!url) {
    return <img style={style} src="https://insider.side.one/static/token/logo/unknown.svg" alt={`${url}-logo`} />;
  }
  return url?.includes('side-') ? <Icon type={url} style={style} /> : <img style={style} src={url} />;
}
