//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: Toolbar.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import React from 'react';
import ToolbarItem from './ToolbarItem';
import Separator from './Separator';
import {
  BLOCK_TYPES,
  ClassName,
  Entity,
  INLINE_STYLES
} from '../constants';

import { getCurrentBlockType } from '../utils/block';
import '../styles/toolbar.css';


class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  } // Toolbar::constructor


  renderToolbarItems(editorState, isActive, items, onToggle) {
    const style = {
      display: 'inline-block',
      height: '100%'
    };

    return (
      <span style={style}>
        {items.map((type) =>
          <ToolbarItem
            active={isActive(editorState, type.style)}
            editorState={editorState}
            icon={type.icon}
            key={type.label}
            label={type.label}
            onToggle={onToggle}
            style={type.style}
          />
        )}
      </span>
    );
  }


  render() {
    return (
      <div className={ClassName.TOOLBAR}>
        {this.renderToolbarItems(
          this.props.editorState,
          (editorState, style) => {
            return editorState.getCurrentInlineStyle().has(style);
          },
          INLINE_STYLES,
          this.props.toggleInlineStyle
        )}

        {this.renderToolbarItems(
          this.props.editorState,
          (editorState, style) => {
            return false; // TODO: implement this
          },
          [Entity.LINK],
          this.props.triggerEntity
        )}

        {<Separator/>}
        
        {this.renderToolbarItems(
          this.props.editorState,
          (editorState, style) => {
            return style === getCurrentBlockType(editorState);
          },
          BLOCK_TYPES,
          this.props.toggleBlockType
        )}
      </div>
    );
  }
} // Toolbar

export default Toolbar;