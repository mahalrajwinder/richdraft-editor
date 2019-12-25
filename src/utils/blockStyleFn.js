//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: blockStyleFn.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------


export default (contentBlock) => {
  switch (contentBlock.getType()) {
    case 'blockquote': return 'blockquote';
    case 'code-block': return 'code';
    default: return null;
  }
}