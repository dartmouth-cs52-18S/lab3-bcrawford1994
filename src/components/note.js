import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      x: 400,
      y: 12,
      zIndex: 26,
    };
    console.log(this.state.text);
  }
  onInputChange(event) {
    console.log(event.target.value);
    // this.setState({})
    this.props.new_note(this.state.text);
  }
  // render a note
  render() {
    return (
      <li className="card">
        <div className="container">
          <Textarea />
        </div>
      </li>
    );
  }
}

export default Note;
// <p className="note-content">this.state.title</p>
// value={this.state.text}
// <Textarea onChange={this.onInputChange} value={this.state.text} />
