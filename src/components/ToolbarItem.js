//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: ToolbarItem.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------
//
// This file defines a react component for toolbar action button.

import React from 'react';
import { ClassName } from '../constants';
import Separator from './Separator';
import '../styles/toolbarItem.css';


class ToolbarItem extends React.Component {
  constructor(props) {
    super(props);

    this.toggleAction = (e) => {
      e.preventDefault();
      this.props.toggle();
    };
  } // ToolbarItem::constructor

  render() {
    if (this.props.item.type === 'separator') {
      return <Separator />;
    }

    let className = ClassName.TOOLBAR_ITEM;
    if (this.props.active) {
      className += (' ' + ClassName.TOOLBAR_ITEM_ACTIVE);
    }

    return (
      <span
        className={className}
        aria-label={this.props.item.label}
        onMouseDown={this.toggleAction}
      >
        {this.props.item.icon}
      </span>
    );
  }
} // ToolbarItem

export default ToolbarItem;
