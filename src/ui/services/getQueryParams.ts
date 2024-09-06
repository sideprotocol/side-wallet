import qs from 'qs';

export function getQueryParams(data: { [key: string | number]: string | number }) {
  // const params = new URLSearchParams();
  // Object.keys(data).forEach((key) => {
  //   params.append(key, String(data[key]));
  // });
  //   params.toString();
  return qs.stringify(data, { arrayFormat: 'repeat' });
}
