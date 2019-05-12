import React from "react";

import css from "./components/style/App.module.scss";
import { Route, Switch, Redirect } from "react-router";
import CharactersConnected from "./containers/CharactersConnected";
import HouseConnected from "./containers/HouseConnected";
import NotFound from "./components/NotFound";
import Footer from "./Footer";

class App extends React.Component {
  render() {
    return (
      <div>
        <div className={css.header}>Song of Ice and Fire: characters and houses info</div>

        <div className={css.body}>
          <Switch>
            <Route exact path={"/"} render={() => <Redirect to={"/characters"} />} />
            <Route exact path={["/characters", "/characters/:charID"]} component={CharactersConnected} />
            <Route exact path={"/houses/:houseID"} component={HouseConnected} />

            <Route component={NotFound} />
          </Switch>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
