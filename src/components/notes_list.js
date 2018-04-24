import React, { Component } from 'react';
import Note from './note';

class NotesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: {
        id: '',
        title: '',
        text: '',
        x: 0,
        y: 0,
        zIndex: 0,
      },
      id2: {
        id: '',
        title: '',
        text: '',
        x: 0,
        y: 0,
        zIndex: 0,
      },
    };
  }
  render() {
    return (
      <ul>
        {note_items}
      <ul/>
    );
  };
}

export default NotesList;
