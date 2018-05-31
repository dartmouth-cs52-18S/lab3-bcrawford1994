// eslint-disable-next-line
import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';
import { Button } from '@material-ui/core';
import Draggable from 'react-draggable/';
import * as db from '../services/datastore';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      x: null,
      y: null,
      width: null,
      height: null,
    };

    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.editingUpdate = this.editingUpdate.bind(this);
    this.renderSomeSection = this.renderSomeSection.bind(this);
    this.onDrag = this.onDrag.bind(this);
    // this.changeEditing = this.changeEditing.bind(this);
  }

  onDrag = (e, ui) => {
    // this.setState({ x: ui.x, y: ui.x });
    this.props.update_note(this.props.id, { x: ui.x, y: ui.y });
  }

  delete(event) {
    this.props.delete_note(this.props.id);
  }

  update(event) {
    this.props.update_note(this.props.id, { text: event.target.value });
  }

  editingUpdate(event) {
    this.props.update_note(this.props.id, { title: event.target.value });
  }

  renderSomeSection() {
    if (this.state.isEditing) {
      return (
        <div className="editing-card">
          <div className="editing-title-container">
            <input onChange={this.editingUpdate} value={this.props.note.title} placeholder="Title" />
            <button onClick={() => this.setState({ isEditing: false })}>
                Done
            </button>
          </div>
          <div>
            <Textarea onChange={this.update} value={this.props.note.text} />
          </div>
        </div>
      );
      } else {
          return (
            <Draggable
              handle=".note-mover"
              grid={[25, 25]}
              defaultPosition={{ x: 20, y: 20 }}
              position={{
                x: this.props.note.x,
                y: this.props.note.y,
              }}
              onDrag={this.onDrag}
            >
              <div className="card">
                <div className="title-container">
                  {this.props.note.title}
                  <button className="edit-button" onClick={() => this.setState({ isEditing: true })}>
                    Edit
                  </button>
                  <img className="delete-icon" src="https://maxcdn.icons8.com/Share/icon/p1em/Editing//trash1600.png" onClick={this.delete} />
                  <div>
                    <img className="note-mover" src="https://d30y9cdsu7xlg0.cloudfront.net/png/2862-200.png" />
                  </div>
                </div>
                <div className="container">
                  <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
                </div>
              </div>
            </Draggable>
          );
        }
      }

  render() {
    return (
      <div>
        {this.renderSomeSection()}
      </div>
    );
  }
}


export default Note;
// <button onClick={this.delete}>
  // Delete
// </button>
// <Button variant="raised" color="primary" className="edit-button" onClick={() => this.setState({ isEditing: true })}>Edit</Button>
