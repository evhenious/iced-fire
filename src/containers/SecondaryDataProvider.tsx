import * as React from "react";
import DataLoader, { DispatchableProps } from "../util/DataLoader";
import { WithUrl } from "../components/Interfaces";

interface Props extends DispatchableProps {
  segment: string;
  requiredUrls: string[];
}

export default class SecondaryDataProvider extends DataLoader<Props> {
  fetchSingleEntity = (url: string) => {
    this.doAskForDataSingle(this.props.segment, url);
  };

  prepareRequiredData = (requiredUrls: string[], secondaryEntities: WithUrl[]) => {
    let requiredEntities: WithUrl[] = [];

    if (requiredUrls.length > 0) {
      requiredUrls.forEach(url => {
        const urlPart = url.split(".com/api")[1];

        const entity = secondaryEntities.find(entity => entity.url.includes(urlPart));
        entity ? requiredEntities.push(entity) : url.length > 0 && this.fetchSingleEntity(url);
      });
    }

    return requiredEntities;
  };

  render() {
    const { children, requiredUrls, segment } = this.props;

    const childs = React.Children.toArray(children);
    if (childs.length === 0) {
      console.warn("no childs found");
      return null;
    }

    if (childs.length > 1) {
      console.warn("only single child expected");
      return null;
    }

    const data = this.prepareRequiredData(requiredUrls, (this.props as any)[segment]);
    const props = { [segment]: data };

    return React.Children.map(children, (child: any) => {
      return React.cloneElement(child, { ...props });
    });
  }
}
