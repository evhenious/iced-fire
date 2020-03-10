import * as React from "react";
import SecondaryDataProvider from "../../containers/SecondaryDataProviderConnected";
import HouseCard from "./HouseCard";
import { House } from "./Model";
import * as config from "../../util/config.json";
import DataLoader, { DispatchableProps } from "../../util/DataLoader";
import css from "../style/list.module.scss";
import { RouteComponentProps } from "react-router";
import { Button } from "../NavButton";

interface Props extends DispatchableProps {
  houses: House[];
}

export default class HousePage extends DataLoader<Props> {
  private readonly urlSegment = "houses";
  private entityID: string = "";

  componentDidMount() {
    const path = `/${this.urlSegment}/${this.entityID}`;
    const fullPath = `${config.urlBase}${path}`;
    !this.props.houses.find(house => house.url.includes(`/${this.urlSegment}/${this.entityID}`)) && this.doAskForDataSingle(this.urlSegment, fullPath);
  }

  goHome = () => {
    ClickHandler.goHomeClick((this.props as any) as RouteComponentProps);
  };

  render() {
    this.entityID = (this.props as any).match.params.houseID;

    const path = `${this.urlSegment}/${this.entityID}`;
    const house = this.props.houses.find(house => house.url.includes(path));

    if (!house) {
      return <div>Please wait a little...</div>;
    }

    return (
      <div>
        <div className={css.listSingle}>
          <SecondaryDataProvider segment="characters" requiredUrls={[house.founder, house.currentLord]}>
            <HouseCard {...house} />
          </SecondaryDataProvider>
        </div>
        <Button title='Home' onClick={this.goHome} />
      </div>
    );
  }
}
