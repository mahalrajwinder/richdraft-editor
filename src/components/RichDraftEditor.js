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

import Toolbar from './Toolbar';

import { editorStateFromJSON } from '../utils/index';
import blockStyleFn from '../utils/blockStyleFn';
import customStyleMap from '../utils/customStyleMap';
import keyBindingFn from '../utils/keyBindingFn';
import KeyCommandUtils from '../utils/keyCommandUtils';


class RichDraftEditor extends React.Component {
  static defaultProps = {
    blockStyleFn,
    customStyleMap,
    keyBindingFn,
    placeholder: PLACEHOLDER,
    readOnly: false,
    showToolbar: true,
    spellCheck: true
  };

  constructor(props) {
    super(props);

    this.state = {
      editorState: editorStateFromJSON(this.props.jsonObject),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({editorState});
    }

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handlePastedText = this.handlePastedText.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.triggerEntity = this.triggerEntity.bind(this);
  } // RichDraftEditor::constructor


  componentDidMount() {
    this.focus();
  }


  handleKeyCommand(command, editorState) {
    let newState;

    if (command === 'tab') {
      newState = KeyCommandUtils.onTab(editorState);
    } else if (command === 'shift+tab') {
      newState = KeyCommandUtils.onTab(editorState, true);
    } else {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      this.onChange(newState);
      return HANDLED;
    }
    return NOT_HANDLED;
  }


  handlePastedText(text, html, editorState) {
    return NOT_HANDLED;
  }


  handleReturn(e, editorState) {
    return NOT_HANDLED;
  }


  toggleBlockType(editorState, blockType) {
    this.onChange(
      RichUtils.toggleBlockType(editorState, blockType)
    );
  }


  toggleInlineStyle(editorState, inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }


  triggerEntity(editorState, type) {
    // TODO: Implement this method
    console.log(type);
  }


  renderEditor(editorState) {
    return (
      <div className={ClassName.EDITOR} onClick={this.focus}>
        <Editor
          blockStyleFn={this.props.blockStyleFn}
          customStyleMap={this.props.customStyleMap}
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          handlePastedText={this.handlePastedText}
          handleReturn={this.handleReturn}
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


  renderToolbar(editorState) {
    if (!this.props.showToolbar) return null;

    return (
      <Toolbar
        editorState={editorState}
        toggleBlockType={this.toggleBlockType}
        toggleInlineStyle={this.toggleInlineStyle}
        triggerEntity={this.triggerEntity}
      />
    );
  }


  render() {
    const { editorState } = this.state;

    return (
      <div className={ClassName.ROOT}>
        {this.renderToolbar(editorState)}
        {this.renderEditor(editorState)}
      </div>
    );
  }
} // RichDraftEditor

export default RichDraftEditor;