import * as React from "react";
import WebRequest, { Params } from "./WebRequest";

export interface DispatchableProps {
  doFetchDataPage?(segment: string, params: Params): void;
  doReceiveDataPage?(data: any): void;
  doReceiveEntityData(data: any, segment: string): void;
}

export default abstract class DataLoader<P extends DispatchableProps> extends React.PureComponent<P> {
  protected fetchingUrls = new Set<string>();

  protected doAskForDataPage(segment: string, params: Params) {
    const { doFetchDataPage, doReceiveDataPage } = this.props;

    if(!doFetchDataPage || !doReceiveDataPage) {
      console.log('doFetch and/or doReceive data page methods are not provided');
      return;
    }

    doFetchDataPage(segment, params);

    this.fetchData(segment, "", params).then((data: any) => {
      doReceiveDataPage(data);
    });
  }

  protected doAskForDataSingle(segment: string, entityURL: string) {
    const { doReceiveEntityData } = this.props;

    if (this.fetchingUrls.has(entityURL)) return;

    this.fetchingUrls.add(entityURL);
    const id = entityURL.split(segment)[1];

    this.fetchData(segment, id, ({} as any)).then((data: any) => {
      doReceiveEntityData(data, segment);
    }).catch(() => {
      console.log('no such entity found');
    }).finally(() => {
      this.fetchingUrls.delete(entityURL);
    })
  }

  private fetchData(segment: string, urlPart: string, params: Params) {
    return WebRequest.makeRequest(segment, urlPart, params)
      .then((resp: Response) => resp.json())

      .catch((err: Error) => {
        console.error(`Invalid fetch from ${segment}${urlPart} - ${err.message}`);
      });
  }
}
