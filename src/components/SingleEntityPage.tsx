import * as React from "react";
import DataLoader, { DispatchableProps } from "../util/DataLoader";
import { Char } from "./Characters/Model";
import CharacterCard from "./Characters/CharacterCard";
import css from "./style/list.module.scss";
import SecondaryDataProvider from "../containers/SecondaryDataProviderConnected";
import { urlBase } from "../util/config.json";
import { RouteComponentProps } from "react-router";
import { Button } from "./NavButton";
import HouseCard from "./House/HouseCard";
import { House } from "./House/Model";
import { WithUrl } from "./Interfaces";
import Loader from "./Loader";

interface Props extends DispatchableProps, RouteComponentProps {
  secondary: string;
}

export default class SingleEntityPage extends DataLoader<Props> {
  private urlSegment: string;
  private entityPath: string;

  constructor(props: Props) {
    super(props);

    const dataSplit = props.location.pathname.split("/");
    this.urlSegment = dataSplit[1];
    const entityID = (this.props as any).match.params.id;

    this.entityPath = `/${this.urlSegment}/${entityID}`;
  }

  componentDidMount() {
    const fullPath = `${urlBase}${this.entityPath}`;

    const entities: WithUrl[] = (this.props as any)[this.urlSegment];
    const entity = entities.find(item => item.url.includes(this.entityPath));

    !entity && this.doAskForDataSingle(this.urlSegment, fullPath);
  }

  goHome = () => {

  };

  render() {
    const entities: WithUrl[] = (this.props as any)[this.urlSegment];
    let entity;
    try {
      entity = entities.find(item => item.url.includes(this.entityPath));
    } catch(err) {
      this.props.history.replace('/error');
    }

    if (!entity) return <Loader />;

    let Card;
    let requiredUrls;
    if(this.urlSegment === 'characters') {
      Card = CharacterCard;
      requiredUrls = (entity as Char).allegiances;
    } else {
      Card = HouseCard;
      requiredUrls = [(entity as House).founder, (entity as House).currentLord];
    }

    const title = '<-- Home';
    return (
      <div>
        <div className={css.listSingle}>
          <SecondaryDataProvider segment={this.props.secondary} requiredUrls={requiredUrls}>
            <Card {...(entity as any)} />
          </SecondaryDataProvider>
        </div>
        <Button title={title} onClick={this.goHome} />
      </div>
    );
  }
}
