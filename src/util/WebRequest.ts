import fetch from "cross-fetch";
import * as config from "./config.json";

export interface Params {
  page: number;
  pageSize: number;
}

const requestHeaders = {
  ContentType: "application/json",
  Accept: "application/json; text/javascript"
};

export default class WebRequest {

  public static makeRequest(urlSegment: string, pathParams: string, queryParam: Params) {
    const query = WebRequest.getParams(queryParam);
    const url = `${config.urlBase}/${urlSegment}${pathParams}${query}`;

    return fetch(url, {
      method: "GET",
      headers: requestHeaders
    });
  }

  private static getParams(params: Params) {
    let queryParam = "";

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = (params as any)[key];
        if (queryParam.length > 0) queryParam += "&";
        queryParam += `${key}=${value}`;
      }
    }

    if (queryParam.length > 0) queryParam = `?${queryParam}`;

    return queryParam;
  }
}
