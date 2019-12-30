//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: keyBindingFn.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import { getDefaultKeyBinding } from 'draft-js';


export default (e) => {
  switch (e.keyCode) {
    case 9:
      // TAB
      if (e.shiftKey) return 'shift+tab';
      return 'tab';
    
    case 8:
      // Backspace
      return 'backspace';
    
    default:
      return getDefaultKeyBinding(e);
  }
}