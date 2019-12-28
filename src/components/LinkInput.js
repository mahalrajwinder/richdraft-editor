//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: LinkInput.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------
//
// This files defines a react component for inputing a link.

import React from 'react';
import { ClassName } from '../constants';
import {
  LinkOffIcon,
  ClearIcon
} from '../icons';

import '../styles/linkInput.css';


class LinkInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: this.props.entityData['url'] ? this.props.entityData['url'] : ''
    };

    this.focus = () => this.refs.input.focus();

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  onChange(e) {
    e.stopPropagation();
    this.setState({ url: e.target.value });
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.setEntity({ url: this.state.url });
    }
  }

  renderActionBtn() {
    if (this.props.entity) {
      return (
        <span style={ {cursor: 'pointer'} } onMouseDown={this.props.onRemove}>
          { LinkOffIcon }
        </span>
      );
    }
    return (
      <span style={ {cursor: 'pointer'} } onMouseDown={this.props.onCancel}>
        { ClearIcon }
      </span>
    );
  }

  render() {
    return (
      <div className={ ClassName.LINK_INPUT }>
        <input
          type='url'
          placeholder='https://...'
          ref='input'
          value={this.state.url}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        {this.renderActionBtn()}
      </div>
    );
  }
}

export default LinkInput;
