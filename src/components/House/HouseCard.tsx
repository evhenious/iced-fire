import * as React from "react";
import { House } from "./Model";
import { RouteComponentProps, withRouter } from "react-router";
import { Char } from "../Characters/Model";
import ClickHandler from "../../util/ClickHandler";
import css from "../style/house.module.scss";

export type Props = House & {
  characters?: Char[];
} & RouteComponentProps;

class HouseCard extends React.PureComponent<Props, {}> {
  getLords = (chars: Char[]) => {
    let lordOne: string;

    return chars.length > 0 ? (
      chars.map((char, index) => {
        if(char.url === lordOne) return " (and still current Lord)";

        if (!lordOne) lordOne = char.url;
        
        return (
          <div
            key={`${this.props.name}-lords-${index}`}
            className={`${css.link} ${char.url === this.props.founder ? css.founder : css.current}`}
            onClick={() => {
              ClickHandler.handleClick(this.props, char.url);
            }}>
            {char.name}
          </div>
        );
      })
    ) : (
      <div>Unknown Lords</div>
    );
  };

  render() {
    const { name, currentLord, founder, region, words, characters = [] } = this.props;
    let isReady = true;

    let requiredLords = 0;
    currentLord && requiredLords++;
    founder && requiredLords++;

    if (requiredLords !== characters.length) {
      isReady = false;
    }

    return (
      <div className={css.container}>
        <div className={css.name}>{name}</div>
        <div className={css.lords}>{isReady ? this.getLords(characters) : <div>Loading lords data...</div>}</div>
        <div>Region: {region}</div>
        <div>Words: {words}</div>
      </div>
    );
  }
}

export default withRouter(HouseCard);
