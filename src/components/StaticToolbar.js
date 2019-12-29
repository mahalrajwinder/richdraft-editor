//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: staticToolbar.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import React from 'react';
import Toolbar from './Toolbar';
import { isEquivalent } from '../utils/index';
import { ClassName } from '../constants';

import '../styles/staticToolbar.css';


class StaticToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wrapperWidth: {},
      position: {},
    };
  } // StaticToolbar::constructor

  componentDidMount() {
    this.setWrapperWidth();
  }

  componentDidUpdate() {
    window.addEventListener('scroll', () => this.setPosition());
  }

  setWrapperWidth() {
    const callback = () => {
      const rootEl = document.getElementsByClassName(ClassName.ROOT)[0];
      const width = rootEl.offsetWidth;
      this.setState({ wrapperWidth: {width: width+'px'} });
    };
    setTimeout(callback, 0);
  }

  setPosition() {
    const callback = () => {
      const positionObject = this.getPosition();
      if (!isEquivalent(positionObject, this.state.position)) {
        this.setState({ position: positionObject });
      }
    }
    setTimeout(callback, 0);
  }

  getPosition() {
    const rootEl = document.getElementsByClassName(ClassName.ROOT)[0];
    let top = rootEl.getBoundingClientRect().y;
    if (top < 0) {
      top = 0;
    }
    return { top: top+'px' };
  }

  render() {
    return (
      <div className={ ClassName.STATIC_TOOLBAR }>
        <div
          className={ClassName.TOOLBAR_WRAPPER}
          style={ {...this.state.wrapperWidth, ...this.state.position} }
          >
          <Toolbar
            actions={this.props.actions}
            entityInputs={this.props.entityInputs}
            editor={this.props.editor}
            editorState={this.props.editorState}
            onChange={this.props.onChange}
          />
        </div>
      </div>
    );
  }
} // StaticToolbar

export default StaticToolbar;