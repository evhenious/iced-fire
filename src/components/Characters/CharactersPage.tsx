import * as React from "react";
import DataLoader, { DispatchableProps } from "../../util/DataLoader";
import { Char } from "./Model";
import CharacterCard from "./CharacterCard";
import css from "../style/list.module.scss";
import SecondaryDataProvider from "../../containers/SecondaryDataProviderConnected";
import * as config from "../../util/config.json";
import { RouteComponentProps } from "react-router";
import ClickHandler from "../../util/ClickHandler";
import { Params } from "../../util/WebRequest";

interface Props extends DispatchableProps {
  characters: Char[];
  pages: string[];
  init: boolean;
  popup: any;
}

export default class CharactersPage extends DataLoader<Props> {
  private urlSegment: string;
  private entityID: string;
  private entityPath: string;

  private params: Params;

  constructor(props: Props) {
    super(props);

    const dataSplit = ((props as any) as RouteComponentProps).location.pathname.split("/");
    this.urlSegment = dataSplit[1];
    this.entityID = dataSplit[2];

    this.params = {
      page: 1,
      pageSize: config.pageSize
    };

    this.entityPath = "";
    if (this.entityID) this.entityPath = `/${this.urlSegment}/${this.entityID}`;
  }

  componentDidMount() {
    const { characters } = this.props;

    if (this.entityID) {
      const fullPath = `${config.urlBase}${this.entityPath}`;
      const char = characters.find(item => item.url.includes(this.entityPath));
      !char && this.doAskForDataSingle(this.urlSegment, fullPath);
    } else {
      characters.length === 0 && this.doAskForDataPage(this.urlSegment, this.params);
    }
  }

  prepareEntityCards = () => {
    const { pages } = this.props;

    return pages.map((url, index) => {
      return this.prepareCharacterCard(url, index);
    });
  };

  prepareCharacterCard = (urlPart: string, index: number) => {
    const { characters } = this.props;

    const char = characters.find(char => char.url.includes(urlPart));

    return (
      char && (
        <SecondaryDataProvider key={`${this.urlSegment}-${index}`} segment="houses" requiredUrls={char.allegiances}>
          <CharacterCard {...char} />
        </SecondaryDataProvider>
      )
    );
  };

  loadMore = () => {
    this.params.page++;
    this.doAskForDataPage(this.urlSegment, this.params);
  };

  goHome = () => {
    this.entityID = "";
    if (this.props.characters.length === 1) {
      this.params.page = 0;
      this.loadMore();
    }
    ClickHandler.goHomeClick((this.props as any) as RouteComponentProps);
  };

  render() {
    let chars: any = [];

    if (this.entityID) {
      const char = this.props.characters.find((item: any) => item.url.includes(this.entityPath));

      if (!char) {
        return <div>Please wait a little...</div>;
      }
      chars = this.prepareCharacterCard(this.entityPath, 1);
    } else {
      const { init } = this.props;
      if (init && this.params.page === 1) return "please wait. init...";

      chars = this.prepareEntityCards();
    }

    const gridType = chars.length > 1 ? css.list : css.listSingle;
    return (
      <div>
        <div className={gridType}>{chars}</div>
        {!this.entityID ? (
          <div className={css.btn}>
            <input type="button" value="Load Moar" onClick={this.loadMore} />
          </div>
        ) : (
          <div className={css.btn}>
            <input type="button" value="Home" onClick={this.goHome} />
          </div>
        )}
      </div>
    );
  }
}
