import * as React from "react";
import { Char } from "./Model";
import css from "../style/character.module.scss";
import { House } from "../House/Model";
import { withRouter, RouteComponentProps } from "react-router";
import { getTargetPath } from "../../util/ClickHandler";

export type Props = Char & {
  houses?: House[];
} & RouteComponentProps;

class CharacterCard extends React.PureComponent<Props, {}> {
  getAllegiances = (houses: House[]) => {
    return houses.length > 0 ? (
      houses.map((house, index) => (
        <div
          key={`${this.props.name}-houses-${index}`}
          className={css.link}
          onClick={() => {
            const url = getTargetPath(house.url);
            this.props.history.push(url);
          }}>
          {house.name}
        </div>
      ))
    ) : (
      <div>unknown allegiance</div>
    );
  };

  getGengerClass = (gender: string) => {
    let background: string;
    switch (gender.toLowerCase()) {
      case "male":
        background = css.male;
        break;
      case "female":
        background = css.female;
        break;
      default:
        console.log(`holy shit, no gender for ${this.props.name}`)
        background = "";
    }
    return background;
  };

  getTitles = (titles: string[]) => {
    let header = "Known titles: ";
    let titlesFound = true;

    if (titles.length === 0 || (titles.length === 1 && titles[0] === "")) {
      header = "No known titles";
      titlesFound = false;
    }

    return ([
      header,
      <ul key='title-list' className={css.titles}>
        {titlesFound && titles.map((title, index) => <li key={`${this.props.name}-titles-${index}`}>{title}</li>)}
      </ul>
    ]);
  };

  render() {
    const { name, titles, born, died, gender, allegiances, aliases, houses = [] } = this.props;

    let isReady = true;

    if (allegiances.length > 0 && allegiances.length !== houses.length) {
      isReady = false;
    }

    return (
      <div className={`${css.container} ${this.getGengerClass(gender)}`}>
        <div className={css.name}>{name || aliases[0] || "...nameless char..."}</div>
        {isReady ? (
          <div>
            <div className={css.houses}>{this.getAllegiances(houses)}</div>
            {this.getTitles(titles)}
            <div className={css.born}>{born || "no data"}</div>
            <div className={css.died}>{died || "no data, possibly alive"}</div>
          </div>
        ) : (
          <div>Loading data...</div>
        )}
      </div>
    );
  }
}

export default withRouter(CharacterCard);
