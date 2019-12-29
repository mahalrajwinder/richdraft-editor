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
import { ClassName } from '../constants';

import '../styles/staticToolbar.css';


class StaticToolbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { wrapperWidth: {} };
  } // StaticToolbar::constructor

  componentDidMount() {
    this.setWrapperWidth();
  }

  setWrapperWidth() {
    const callback = () => {
      const rootEl = document.getElementsByClassName(ClassName.ROOT)[0];
      const width = rootEl.offsetWidth;
      this.setState({ wrapperWidth: {width: width+'px'} });
    };
    setTimeout(callback, 0);
  }

  render() {
    return (
      <div className={ ClassName.STATIC_TOOLBAR }>
        <div className={ClassName.TOOLBAR_WRAPPER} style={this.state.wrapperWidth}>
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