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
  DEFAULT_ACTIONS,
  DEFAULT_INLINE_ACTIONS,
  DEFAULT_BLOCK_ACTIONS
  } from '../defaultActions';
import DEFAULT_ENTITY_INPUTS from '../defaultEntityInputs';

import {
  ClassName,
  HANDLED,
  NOT_HANDLED,
  PLACEHOLDER
} from '../constants';

import StaticToolbar from './StaticToolbar';
import InlineToolbar from './InlineToolbar';
import SideToolbar from './SideToolbar';

import { editorStateFromJSON } from '../utils/index';
import blockStyleFn from '../utils/blockStyleFn';
import customStyleMap from '../utils/customStyleMap';
import keyBindingFn from '../utils/keyBindingFn';
import KeyCommandUtils from '../utils/keyCommandUtils';


class RichDraftEditor extends React.Component {
  static defaultProps = {
    actions: DEFAULT_ACTIONS,
    sideToolbarActions: DEFAULT_BLOCK_ACTIONS,
    inlineToolbarActions: DEFAULT_INLINE_ACTIONS,
    entityInputs: DEFAULT_ENTITY_INPUTS,
    blockStyleFn,
    customStyleMap,
    keyBindingFn,
    placeholder: PLACEHOLDER,
    readOnly: false,
    showStaticToolbar: false,
    showInlineToolbar: true,
    showSideToolbar: true,
    spellCheck: true
  };

  constructor(props) {
    super(props);

    this.state = {
      editorState: editorStateFromJSON(this.props.jsonObject),
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState });
    }

    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handlePastedText = this.handlePastedText.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
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
          ref='editor'
          spellCheck={this.props.placeholder}
        />
      </div>
    );
  }


  renderStaticToolbar(editorState) {
    if (!this.props.showStaticToolbar) return null;

    return (
      <StaticToolbar
        actions={this.props.actions}
        entityInputs={this.props.entityInputs}
        editor={this.refs.editor}
        editorState={editorState}
        onChange={this.onChange}
      />
    );
  }


  renderInlineToolbar(editorState) {
    if (!this.props.showInlineToolbar) return null;

    return (
      <InlineToolbar
        actions={this.props.inlineToolbarActions}
        entityInputs={this.props.entityInputs}
        editor={this.refs.editor}
        editorState={editorState}
        onChange={this.onChange}
      />
    );
  }


  renderSideToolbar(editorState) {
    if (!this.props.showSideToolbar) return null;

    return (
      <SideToolbar
        actions={this.props.sideToolbarActions}
        entityInputs={this.props.entityInputs}
        editor={this.refs.editor}
        editorState={editorState}
        onChange={this.onChange}
      />
    );
  }


  render() {
    const { editorState } = this.state;

    return (
      <div className={ClassName.ROOT}>
        {this.renderInlineToolbar(editorState)}
        {this.renderStaticToolbar(editorState)}
        {this.renderSideToolbar(editorState)}
        {this.renderEditor(editorState)}
      </div>
    );
  }
} // RichDraftEditor

export default RichDraftEditor;
