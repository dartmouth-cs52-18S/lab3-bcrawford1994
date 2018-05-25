// eslint-disable-next-line
import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import marked from 'marked';
import Draggable from 'react-draggable/';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      x: null,
      y: null,
      // position: {
        // x: 0, y: 0
      // },
    };

    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.renderSomeSection = this.renderSomeSection.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }

  delete(event) {
    this.props.delete_note(this.props.id);
  }

  update(event) {
    this.props.update_note(this.props.id, { text: event.target.value });
  }

  editingUpdate(event) {
    this.props.update_note(this.props.id, {title: event.target.value })
  }

  onDrag = (e, ui) => {
    this.setState({ x: ui.x }, { y: ui.x });
    this.props.update_note(this.props.id, { x: this.state.x }, { y: this.state.y });
  }

  renderSomeSection() {
    if (this.state.isEditing) {
      return (
          <div className="editing-card">
            <div className="editing-title-container">
              <input onChange={this.update} value={this.props.note.text} placeholder="Title" />
              <button onClick={this.state.isEditing=false}>
                Done
                </button>
            </div>
            <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }}>
              <Textarea onChange={this.update} value={this.props.note.text} />
            </div>
          </div>
      );
      } else {
          return (
            <Draggable
              handle=".note-mover"
              grid={[25, 25]}
              defaultPosition={ {x: 20, y: 20} }
              position={position}
              // onStart={this.onStartDrag}
              onDrag={this.onDrag}
              // onStop={this.onStopDrag}
            >
              <div className="card">
                <div className="title-container">
                  {this.props.note.title}
                  <button onClick={this.state.isEditing=true}>
                    Edit Note
                  </button>
                  <button onClick={this.delete}>
                    Delete Note
                  </button>
                </div>
                <div className="container">
                  <Textarea onChange={this.update} value={this.props.note.text} />
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

  // render a note
  /*
  render() {
    return (
      <div className="card">
        <div className="title-container">
          {this.props.note.title}
          <button onClick={this.delete}>
            Delete Note
          </button>
        </div>
        <div className="container">
          <Textarea onChange={this.update} value={this.props.note.text} />
        </div>
      </div>
    );
  }
}
*/

export default Note;
// <img className="delete-icon" src="http://cdn.onlinewebfonts.com/svg/img_529017.png" />
// <p className="note-content">this.state.title</p>
// value={this.state.text}
