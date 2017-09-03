// @flow
/* eslint-env browser */
// Import React.
import React from 'react'

// Importing material-ui components.
import List from 'material-ui/List/List'

// Import Meteor :3 and Minimongo :333 and createContainer :33333
import { Meteor } from 'meteor/meteor'

// Importing the ListCreator.
import ListCreator from '../../imports/ui/ListCreator'

// Fetching the config from settings.js to get where to initiate the file manager.
import { folderToShow } from '../../settings.json'

// State types.
type listItemsState = { name: string, type: string };
type state = { listItems: Array<listItemsState>, currentFolder: string };

// Create the class.
export default class Folder extends React.Component<{}, state> {
  constructor () {
    super()

    this.state = {
      listItems: [
        {
          name: 'Please wait, data is being fetched from the server.',
          type: 'dataFetch'
        }
      ],
      currentFolder: folderToShow
    }
  }

  componentDidMount () {
    // Fetch directory contents in async mode.
    Meteor.call('getFolderContents', folderToShow, (err: string, result: Array<listItemsState>) => {
      if (err) console.error('Error while retrieving initial data.')
      // set state to the go back item and the items in the directory.
      this.setState({ listItems: [{
        name: 'Go to parent directory',
        type: '..'
      }, ...result] })
    })
  }

  onItemClick (type: string, addition: string) {
    // Callback function to update folder contents.
    const handleNewPath = (err: string, result: string) => {
      if (err) console.error('Error during changing folder.')
      // In callback, set currentFolder to the joint result.
      this.setState({ currentFolder: result })
      // Now get the folder contents for the result.
      Meteor.call('getFolderContents', this.state.currentFolder, (error: string, files: Array<listItemsState>) => {
        if (error) console.error('Error while retrieving folder contents.')
        // set state to the go back item and the items in the directory.
        this.setState({ listItems: [{
          name: 'Go to parent directory',
          type: '..'
        }, ...files] })
      })
    }

    if (type === 'folder') {
      // Ask server to join paths.
      Meteor.call('joinPaths', this.state.currentFolder, addition, handleNewPath)
    } else if (type === 'file') {
      // eslint-disable-next-line no-console
      console.log("hellooooo! wheeeee! cookies! I'm a fileeee!")
    } else {
      // Ask server to remove the last directory to go up one directory.
      Meteor.call('goUpOneDirectory', this.state.currentFolder, handleNewPath)
    }
  }

  render () {
    const reactifunc = (t: string, a: string) => this.onItemClick(t, a)
    return (
      <List>
        <ListCreator list={this.state.listItems} onItemClick={reactifunc} />
      </List>
    )
  }
}
