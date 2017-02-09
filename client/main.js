// @flow

import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
// Importing Material UI components below.
/* eslint-disable no-unused-vars */
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
/* eslint-enable no-unused-vars */

// Injecting onTouchTap.
injectTapEventPlugin();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  render() {
    if (this.state.show) {
      return (
        <MuiThemeProvider>
          <div>
            <RaisedButton label="Click Me!"
             onTouchTap={() => this.setState({show: false})} primary={true} />
            <Card>
              <CardText>Hello, world!</CardText>
            </Card>
          </div>
        </MuiThemeProvider>
      );
    } else {
      return (
        <MuiThemeProvider>
          <RaisedButton label="Click Me!"
           onTouchTap={() => this.setState({show: true})} primary={true} />
        </MuiThemeProvider>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("main"));