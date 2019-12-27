//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: Separator.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------
//
// This file defines a react component for separating toolbar action buttons.

import React from 'react';
import { ClassName } from '../constants';


class Separator extends React.Component {
  render() {
    const className = ClassName.TOOLBAR_ITEM + ' ' + ClassName.TOOLBAR_ITEM_SEPARATOT;

    return <span className={className}></span>;
  }
} // Separator

export default Separator;