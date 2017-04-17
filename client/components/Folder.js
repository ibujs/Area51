// @flow
/* eslint-env browser */
import React from "react";
/* eslint-disable no-unused-vars */
// Importing material-ui components.
import List from "material-ui/List/List";

// Import Meteor :3
// flow-disable-next-line
import { Meteor } from "meteor/meteor";

// Importing the ListCreator.
import ListCreator from "../../imports/ui/ListCreator";

// Fetching the config from settings.js to get where to initiate the file manager.
import { folderToShow } from "../../settings.json";
/* eslint-enable no-unused-vars */

export default class Folder extends React.Component<any, any, any> {
  constructor() {
    super();

    const folderContents = Meteor.call("getFolderContents", this.state.currentFolder);
    this.state = {
      listItem: [
        {
          name: "Go to parent directory.",
          type: "..",
        },
        ...folderContents,
      ],
      currentFolder: folderToShow,
    };
  }

  addToFolder(addition: string) {
    this.setState({ currentFolder: `${this.state.currentFolder}/${addition}` });
  }

  render() {
    return (
      <List>
        <ListCreator list={this.state.listItem} onItemClick={() => console.log("helloooo! wheeee! cookies!")} />
      </List>
    );
  }
}
