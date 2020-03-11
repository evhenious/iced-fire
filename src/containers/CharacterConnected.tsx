import { connect } from "react-redux";
import SingleEntityPage from "../components/SingleEntityPage";
import { doReceiveEntityData} from "../store/Actions";
import { State } from "../store/reducer";

const mapDispatchToProps = {
  doReceiveEntityData
};

const mapStateToProps = (state: State) => {
  const { characters } = state;

  return {
    characters,
    secondary: 'houses'
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleEntityPage);
