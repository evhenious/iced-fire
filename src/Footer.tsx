import React from "react";

import css from "./components/style/App.module.scss";

export default class Footer extends React.PureComponent {
  render() {
    return (
      <div className={css.hints}>
        <div className={css.hint}>
          <div className={css.colorBoxMale} />
          darkturquoise card - male
        </div>
        <div className={css.hint}>
          <div className={css.colorBoxFemale} />
          cornsilk card - female
        </div>
        <div className={css.hint}>
          <div className={css.colorBoxHouse} />
          coral card - house
        </div>
      </div>
    );
  }
}
