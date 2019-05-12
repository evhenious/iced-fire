import { connect } from "react-redux";
import CharactersPage from "../components/Characters/CharactersPage";
import { doFetchDataPage, doReceiveDataPage, doReceiveEntityData} from "../store/Actions";
import { State } from "../store/reducer";

const mapDispatchToProps = {
  doFetchDataPage,
  doReceiveDataPage,
  doReceiveEntityData
};

const mapStateToProps = (state: State) => {
  const { characters, pages, init } = state;

  return {
    characters,
    pages,
    init
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersPage);
