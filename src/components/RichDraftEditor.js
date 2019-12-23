//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: RichDraftEditor.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import React from 'react';
import {
  Editor,
  RichUtils
} from 'draft-js';

import {
  ClassName,
  HANDLED,
  NOT_HANDLED,
  PLACEHOLDER
} from '../constants';

import { editorStateFromJSON } from '../utils/index';
import keyBindingFn from '../utils/keyBindingFn';


class RichDraftEditor extends React.Component {
  static defaultProps = {
    keyBindingFn,
    placeholder: PLACEHOLDER,
    readOnly: false,
    spellCheck: true
  };

  constructor(props) {
    super(props);

    this.state = {
      editorState: editorStateFromJSON(this.props.jsonObject),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => { this.setState({editorState}); }

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  } // RichDraftEditor::constructor


  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return HANDLED;
    }
    return NOT_HANDLED;
  }


  renderEditor(editorState) {
    return (
      <div className={ClassName.EDITOR} onClick={this.focus}>
        <Editor
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.props.keyBindingFn}
          onChange={this.onChange}
          placeholder={this.props.placeholder}
          readOnly={this.props.readOnly}
          ref="editor"
          spellCheck={this.props.placeholder}
        />
      </div>
    );
  }


  render() {
    const { editorState } = this.state;

    return (
      <div className={ClassName.ROOT}>
        {this.renderEditor(editorState)}
      </div>
    );
  }
} // RichDraftEditor

export default RichDraftEditor;