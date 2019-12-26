//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: keyCommandUtils.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import { EditorState } from 'draft-js';
import {
  adjustBlockDepth,
  getCurrentBlockDepth,
  getCurrentBlockType
} from './block';

import { MAX_LIST_DEPTH } from '../constants';


export function onTab(editorState, isShiftKeyCommand = false) {
  const selection = editorState.getSelection();
  const key = selection.getAnchorKey();

  if (key !== selection.getFocusKey()) {
    return editorState;
  }

  switch (getCurrentBlockType(editorState)) {
    case 'unordered-list-item' || 'ordered-list-item':
      return onTabList(editorState, isShiftKeyCommand);

    case 'code-block':
      return editorState // TODO: Implement this;

    default:
      return editorState;
  }
}


const KeyCommandUtils = {
  onTab
}

export default KeyCommandUtils;


////////////////////////////
// PRIVATE Helper Methods //
////////////////////////////

function onTabList(editorState, isShiftKeyCommand) {
  const depth = getCurrentBlockDepth(editorState);

  if (!isShiftKeyCommand && depth === MAX_LIST_DEPTH) {
    return editorState;
  }

  const withAdjustment = adjustBlockDepth(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    isShiftKeyCommand ? -1 : 1,
    MAX_LIST_DEPTH
  );

  return EditorState.push(editorState, withAdjustment, 'adjust-depth');
}


// function onTabCode(editorState, isShiftKeyCommand) {
//   let map = getCurrentBlock(editorState).getData();
//   if (map.has('tabIndex')) {
//     let value = map.get('tabIndex') + isShiftKeyCommand ? -1 : 1;
//     if (value < 0) {
//       value = 0;
//     }
//     map.set('tabIndex', value);
//   } else {
//     map = new Map();
//     map.set('tabIndex', isShiftKeyCommand ? 0 : 1);
//   }
//   console.log(map);

//   const withAdjustment = Modifier.setBlockData(
//     editorState.getCurrentContent(),
//     editorState.getSelection(),
//     map
//   );

//   const newState = EditorState.push(editorState, withAdjustment, 'change-block-data');

//   const indentAdjustment = Modifier.replaceText(
//     newState.getCurrentContent(),
//     editorState.getSelection(),
//     getIndentCharacters(map.get('tabIndex'))
//   );

//   return EditorState.push(newState, indentAdjustment, 'insert-characters');
// }

