//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: ToolbarItem.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import React from 'react';
import { ClassName } from '../constants';
import '../styles/toolbarItem.css';


class ToolbarItem extends React.Component {
  constructor(props) {
    super(props);

    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.editorState, this.props.style);
    };
  } // ToolbarItem::constructor

  render() {
    let className = ClassName.TOOLBAR_ITEM;
    if (this.props.active) {
      className += (' ' + ClassName.TOOLBAR_ITEM_ACTIVE);
    }

    return (
      <span
        className={className}
        aria-label={this.props.label}
        onMouseDown={this.onToggle}
      >
        {this.props.icon}
      </span>
    );
  }
} // ToolbarItem

export default ToolbarItem;