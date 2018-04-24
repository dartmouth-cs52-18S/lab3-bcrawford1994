import React, { Component } from 'react';
// import TitleBar from './title_bar';

class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note_title: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(event) {
    console.log(event.target.value);
    this.setState({ note_title: event.target.value });
  }

  onSubmit(event) {
    console.log(event.target.value);
    this.props.new_note(this.state.note_title);
  }

// input becomes value which has a callback to become a paragraph

  render() {
    return (
      <div>
        <input onChange={this.onInputChange} value={this.state.note_title} />
        <button onClick={this.onSubmit}>
          New Note
        </button>
      </div>
    );
  }
}

export default CreateNote;
