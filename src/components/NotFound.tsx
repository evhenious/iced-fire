import * as React from "react";
import { Link } from "react-router-dom";

export default class NotFound extends React.PureComponent {
  render() {
    return (
      <div>
        <div>Invalid address. Porobably you need this link:</div>
        <Link to={"/"}>Home page - Characters list</Link>
      </div>
    );
  }
}
