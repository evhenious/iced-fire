import * as React from "react";
import DataLoader, { DispatchableProps } from "../util/DataLoader";

interface Props extends DispatchableProps {
  segment: string;
  requiredUrls: string[];
}

interface WithUrl {
  url: string;
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
    const child = React.Children.toArray(this.props.children);
    if (child.length === 0) {
      console.warn("no childs found");
      return null;
    }

    if (child.length > 1) {
      console.warn("only single child expected");
      return null;
    }

    const data = this.prepareRequiredData(this.props.requiredUrls, (this.props as any)[this.props.segment]);
    const props = { [this.props.segment]: data };

    return React.Children.map(this.props.children, (child: any) => {
      return React.cloneElement(child, { ...props });
    });
  }
}
