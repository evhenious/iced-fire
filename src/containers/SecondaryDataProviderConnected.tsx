import { doReceiveEntityData } from "../store/Actions";
import { connect } from "react-redux";
import { State } from "../store/reducer";
import SecondaryDataProvider from "./SecondaryDataProvider";

const mapDispatchToProps = {
  doReceiveEntityData
};

const mapStateToProps = (state: State) => {
  const { houses, characters } = state;

  return {
    houses,
    characters
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondaryDataProvider);
