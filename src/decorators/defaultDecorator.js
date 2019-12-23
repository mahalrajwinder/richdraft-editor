//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: defaultDecorator.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import { CompositeDecorator } from 'draft-js';
import { createTypeStrategy } from '../utils/index';
import { Entity } from '../constants';
import Link from '../components/Link';


export const decorator = new CompositeDecorator([
  {
    strategy: createTypeStrategy(Entity.LINK.style),
    component: Link
  }
]);

export default decorator;