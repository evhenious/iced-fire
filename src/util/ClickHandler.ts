import { RouteComponentProps } from "react-router";
import * as config from "../util/config.json";

export default class ClickHandler {
  public static handleClick(props: RouteComponentProps, url: string) {
    let path = "";
    if (url.includes(config.urlBase)) {
      path = url.replace(config.urlBase, "");
    } else {
      path = url.replace(config.urlBaseV2, "");
    }

    props.history.push(path);
  }

  public static goHomeClick(props: RouteComponentProps) {
    props.history.push("/");
  }
}
