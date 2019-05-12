import { connect } from "react-redux";
import { State } from "../store/reducer";
import HousePage from "../components/House/HousePage";
import { doReceiveEntityData } from "../store/Actions";

const mapDispatchToProps = {
  doReceiveEntityData
};

const mapStateToProps = (state: State) => {
  const { houses } = state;

  return {
    houses
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HousePage);
