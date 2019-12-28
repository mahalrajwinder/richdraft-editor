//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: defaultDecorator.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------
//
// This file defines a default decorator for the Link entity.

import { CompositeDecorator } from 'draft-js';
import { createTypeStrategy } from '../utils/index';
import Link from '../components/Link';


export const decorator = new CompositeDecorator([
  {
    strategy: createTypeStrategy('LINK'),
    component: Link
  }
]);

export default decorator;