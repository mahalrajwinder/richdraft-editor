//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: index.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import 'draft-js/dist/Draft.css';
import './index.css';
import RichDraftEditor from './components/RichDraftEditor';

ReactDOM.render(
  <RichDraftEditor />,
  document.getElementById('root')
);