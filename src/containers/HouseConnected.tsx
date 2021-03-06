import { connect } from "react-redux";
import { State } from "../store/reducer";
import SingleEntityPage from "../components/SingleEntityPage";
import { doReceiveEntityData } from "../store/Actions";

const mapDispatchToProps = {
  doReceiveEntityData
};

const mapStateToProps = (state: State) => {
  const { houses } = state;

  return {
    houses,
    secondary: 'characters'
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleEntityPage);
