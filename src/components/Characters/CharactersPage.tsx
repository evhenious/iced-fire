import * as React from "react";
import DataLoader, { DispatchableProps } from "../../util/DataLoader";
import { Char } from "./Model";
import CharacterCard from "./CharacterCard";
import css from "../style/list.module.scss";
import SecondaryDataProvider from "../../containers/SecondaryDataProviderConnected";
import * as config from "../../util/config.json";
import { RouteComponentProps } from "react-router";
import { Params } from "../../util/WebRequest";
import { Button } from "../NavButton";

interface Props extends DispatchableProps, RouteComponentProps {
  characters: Char[];
  pages: string[];
  init: boolean;
  popup: any;
}

export default class CharactersPage extends DataLoader<Props> {
  private urlSegment: string;

  private params: Params;

  constructor(props: Props) {
    super(props);

    this.urlSegment = props.location.pathname.split("/")[1];

    this.params = {
      page: 1,
      pageSize: config.pageSize
    };
  }

  componentDidMount() {
    const { characters } = this.props;

    characters.length <= 1 && this.doAskForDataPage(this.urlSegment, this.params);
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
    this.props.history.push("/");
  };

  render() {
    let chars: any = [];

    const { init } = this.props;
    if (init && this.params.page === 1) return "please wait. init...";

    chars = this.prepareEntityCards();

    const gridType = css.list;
    const onClick = this.loadMore;
    const title = 'Load moar';

    return (
      <div>
        <div className={gridType}>{chars}</div>
        <Button title={title} onClick={onClick} />
      </div>
    );
  }
}
