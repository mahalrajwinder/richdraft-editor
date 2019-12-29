//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: index.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import {
  convertFromRaw,
  convertToRaw,
  EditorState
} from 'draft-js';

import defaultDecorator from '../decorators/defaultDecorator';


export function editorStateFromJSON(jsonObj, decorator = defaultDecorator) {
  if (jsonObj) {
    const rawContent = convertFromRaw(JSON.parse(jsonObj));
    return EditorState.createWithContent(rawContent, decorator);
  }
  return EditorState.createEmpty(decorator);
}


export function editorStateToJSON(editorState) {
  if (editorState) {
    const rawContent = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(rawContent), null, 2);
  }
}


export function createTypeStrategy(type) {
  return (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === type
        );
      },
      callback
    );
  };
}


export function isEquivalent(obj1, obj2) {
  const props_obj1 = Object.keys(obj1);
  const props_obj2 = Object.keys(obj2);

  if (props_obj1.length !== props_obj2.length) {
    return false;
  }

  for (var i = 0; i < props_obj1.length; ++i) {
    var propName = props_obj1[i];
    if (obj1[propName] !== obj2[propName]) {
      return false;
    }
  }

  return true;
}
