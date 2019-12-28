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
import { ClassName } from '../constants';


class InlineToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.positionFn = () => {
      if (!this.props.editorState.getSelection().getHasFocus()) {
        return null;
      }
      const selectionReact = window
        .getSelection()
        .getRangeAt(0)
        .getBoundingClientRect();

      const top = selectionReact.y - 36 - 15;
      const left = selectionReact.x - (484/2);
      return {
        top: top+'px',
        left: left+'px'
      };
    };
  } // InlineToolbar::constructor

  render() {
    return (
      <div className={ ClassName.INLINE_TOOLBAR }>
      <Toolbar
        actions={this.props.actions}
        entityInputs={this.props.entityInputs}
        editor={this.props.editor}
        editorState={this.props.editorState}
        onChange={this.props.onChange}
        getPositionFn={this.positionFn}
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