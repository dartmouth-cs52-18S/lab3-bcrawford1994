import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import Draggable from 'react-draggable/';
import CreateNote from './components/create_note';
// import NotesList from './components/notes_list';
import Note from './components/note';
import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map({ // map that we manipulate whenever we add, delete or update a note
        id: 0,
        title: null,
        text: null,
        x: null,
        y: null,
        zIndex: null,
      }),
    };
    this.new_note = this.new_note.bind(this);
    this.new_note = debounce(this.new_note, 300);
    this.delete_note = this.delete_note.bind(this);
    this.update_note = this.update_note.bind(this);
  }
  // function for additional note
  new_note = (title) => {
    const note = {
      title,
      text: '',
      x: 400,
      y: 12,
      zIndex: 26,
    };
    this.setState({
      notes: this.state.notes.set(this.state.id, note),
      id: this.state.id += 1,
    });
    // return this.state.notes;
    // console.log(this.state.notes);
  }
  // function to delete note
  delete_note = (id) => {
    this.setState({
      notes: this.state.notes.delete(this.state.id),
    });
  }

  // function to update note
  update_note = (id, fields) => {
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
  }
  // iterate notes
  display_notes = (title) => {
    this.new_note(title).then((id, note) => {
      this.state.notes.entrySeq().map(([id, note]) => {
        return (
          <div>
            <Note />
          </div>
        );
      });
    });
  }

  render() {
    return (
      <div>
        <CreateNote new_note={this.display_notes} />
      </div>
   );
}
}

ReactDOM.render(<App />, document.getElementById('main'));
// <div>
  // <Note />
// </div>

// this.state.notes.entrySeq().map(([id, note]) => {
  // console.log('some text');
  // return (
    // <Note />
  // );
// });
// <CreateNote new_note={this.new_note} />

// render() {
//  return (
//    <div>
  //    <CreateNote new_note={this.display_notes} />
    // </div>
   // );
 // }
// }
