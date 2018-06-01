import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import io from 'socket.io-client';
import Draggable from 'react-draggable/';
import CreateNote from './components/create_note';
import Note from './components/note';
// import * as db from './services/datastore';
import './style.scss';

const socketserver = 'http://localhost:9090';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: Immutable.Map({ // map that we manipulate whenever we add, delete or update a note
        id1: {
          title: null,
          text: null,
          x: null,
          y: null,
          zIndex: null,
        },
      }),
    };
    this.new_note = this.new_note.bind(this);
    this.new_note = debounce(this.new_note, 300);
    this.delete_note = this.delete_note.bind(this);
    this.update_note = this.update_note.bind(this);
    this.render_notes = this.render_notes.bind(this);

    this.socket = io(socketserver);
    this.socket.on('connect', () => { console.log('socket.io connected'); });
    this.socket.on('disconnect', () => { console.log('socket.io disconnected'); });
    this.socket.on('reconnect', () => { console.log('socket.io reconnected'); });
    this.socket.on('error', (error) => { console.log(error); });
  }

  componentDidMount() {
    /*
    this.socket.on('notes', (notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    });
    */
    const callback = (notes) => {
      this.setState({ notes: Immutable.Map(notes) });
    };

    // db.fetchNotes(callback);
    // this.socket.on('notes', callback);
    this.socket.on('notes', callback);
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
    /*
    this.setState({
      notes: this.state.notes.set(this.state.id, note),
      id: this.state.id += 1,
    });
    */
    // db.createNewNote(note);
    this.socket.emit('createNote', note);
  }
  // function to delete note
  delete_note = (id) => {
    /*
    this.setState({
      notes: this.state.notes.delete(id),
    });
    */
    // db.removeNote(id);
    this.socket.emit('deleteNote', id);
  }

  // function to update note
  update_note = (id, fields) => {
    /*
    this.setState({
      notes: this.state.notes.update(id, (n) => { return Object.assign({}, n, fields); }),
    });
    */
    // db.updateNote(id, fields);
    this.socket.emit('updateNote', id, fields);
  }
    render_notes() {
      console.log(this.state.notes);
      return this.state.notes.entrySeq().map(([id, note]) => {
        return (
          <Note id={id} key={id} note={note} delete_note={this.delete_note} update_note={this.update_note} />
        );
      });
    }

  render() {
    return (
      <div>
        <CreateNote new_note={this.new_note} />
        {this.render_notes()}
      </div>
   );
 }
}

ReactDOM.render(<App />, document.getElementById('main'));
// <CreateNote new_note={this.display_notes} />


// <CreateNote new_note={this.new_note} />
