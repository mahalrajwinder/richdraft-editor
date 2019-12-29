//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: SideToolbar.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import React from 'react';
import Toolbar from './Toolbar'
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import { getCurrentBlock } from '../utils/block';
import { isEquivalent } from '../utils/index';
import { AddIcon, RemoveIcon } from '../icons';
import { ClassName, OFFSET_DELTA } from '../constants';

import '../styles/sideToolbar.css';


class SideToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
      show: false,
      position: {}
    };

    this.toggleShow = () => {
      this.setState({ show: !this.state.show });
      setTimeout(() => this.props.editor.focus(), 0);
    }
  } // SideToolbar::constructor

  componentDidMount() {
    this.handleFocus();
  }

  componentDidUpdate() {
    this.handlePosition();
    this.handleFocus();
  }

  handleFocus() {
    const focus = this.props.editorState.getSelection().getHasFocus();
    if (focus !== this.state.hasFocus) {
      this.setState({ hasFocus: focus });
    }
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
    const block = getCurrentBlock(this.props.editorState);
    const offsetKey = DraftOffsetKey.encode(block.getKey(), 0, 0);
    const node = document.querySelectorAll(
      `[data-offset-key='${offsetKey}']`
    )[0];

    const rootEl = document.getElementsByClassName(ClassName.ROOT)[0];
    const left = rootEl.offsetLeft - OFFSET_DELTA;
    const top = node.offsetTop + rootEl.offsetTop;

    return { top: top+'px', left: 'calc('+left+'px - 6.75em)' };
  }

  renderSideToolbar() {
    if (!this.state.show) return null;

    return (
      <div className={ ClassName.SIDE_TOOLBAR }>
        <Toolbar
          actions={this.props.actions}
          entityInputs={this.props.entityInputs}
          editor={this.props.editor}
          editorState={this.props.editorState}
          onChange={this.props.onChange}
        />
      </div>
    );
  }

  renderBtn() {
    if (this.state.show) {
      return RemoveIcon;
    }
    return AddIcon;
  }

  render() {
    if (!this.state.hasFocus) return null;

    return (
      <div className={ClassName.SIDE_TOOLBAR_CONTAINER} style={this.state.position}>
        <span
          onMouseDown={this.toggleShow}
          style={{cursor: 'pointer'}}
          className={ClassName.SIDE_TOOLBAR_TRIGGER}
        >
          {this.renderBtn()}
        </span>
        {this.renderSideToolbar()}
      </div>
    );
  }
} // SideToolbar

export default SideToolbar;