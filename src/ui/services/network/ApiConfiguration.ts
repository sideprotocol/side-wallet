export class ApiConfiguration {
  public accessToken?: string;
  public baseURL?: string;

  constructor({ baseURL, accessToken }: { baseURL?: string; accessToken?: string }) {
    this.baseURL = baseURL;
    this.accessToken = accessToken;
  }
}
