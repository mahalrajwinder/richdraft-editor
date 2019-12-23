//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: Link.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import React from 'react';


class Link extends React.Component {
  render() {
    const { contentState, entityKey } = this.props;
    const { url } = contentState.getEntity(entityKey).getData();
    return (
      <a href={url}>
        {this.props.children}
      </a>
    );
  }
}

export default Link;