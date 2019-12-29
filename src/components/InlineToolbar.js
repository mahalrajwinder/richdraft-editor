//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: InlineToolbar.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import React from 'react';
import Toolbar from './Toolbar'
import { isEquivalent } from '../utils/index';
import {
  ClassName,
  OFFSET_DELTA
  } from '../constants';

import '../styles/inlineToolbar.css';


class InlineToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { position: {} };
  } // InlineToolbar::constructor

  componentDidUpdate() {
    this.handlePosition();
  }

  handlePosition() {
    const callback = () => {
      const positionObject = this.getPosition();
      if (positionObject && !isEquivalent(positionObject, this.state.position)) {
        this.setState({ position: positionObject });
      }
    }
    setTimeout(callback, 0);
  }

  getPosition() {
    if (!this.props.editorState.getSelection().getHasFocus()) {
      return null;
    }

    const thisEl = document.getElementsByClassName(ClassName.INLINE_TOOLBAR)[0];
    const height = thisEl.offsetHeight;
    const width = thisEl.offsetWidth;
    const selectionReact = window
      .getSelection()
      .getRangeAt(0)
      .getBoundingClientRect();

    let top = selectionReact.y - height - OFFSET_DELTA;
    let left = selectionReact.x - (width/2);
    if (left < 0) {
      left = OFFSET_DELTA;
    }

    return { top: top+'px', left: left+'px' };
  }

  render() {
    return (
      <div className={ ClassName.INLINE_TOOLBAR } style={this.state.position}>
        <Toolbar
          actions={this.props.actions}
          entityInputs={this.props.entityInputs}
          editor={this.props.editor}
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          shouldDisplayToolbarFn={
            (editorState) => !editorState.getSelection().isCollapsed()
              && editorState.getSelection().getHasFocus()
              ? true : false
          }
        />
      </div>
    );
  }
} // InlineToolbar

export default InlineToolbar;