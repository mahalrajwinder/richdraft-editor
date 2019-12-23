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
  return getDefaultKeyBinding(e);
}