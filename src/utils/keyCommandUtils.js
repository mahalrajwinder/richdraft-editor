//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: keyCommandUtils.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import {
  EditorState,
  RichUtils,
  Modifier,
  SelectionState,
  } from 'draft-js';

import {
  adjustBlockDepth,
  getCurrentBlock,
  getCurrentBlockDepth,
  getCurrentBlockType,
} from './block';

import {
  MAX_LIST_DEPTH,
  INDENT_SIZE,
  } from '../constants';


export function onBackspace(editorState) {
  if (getCurrentBlockType(editorState) !== 'code-block'
      || !editorState.getSelection().isCollapsed()) {
    return null;
  }

  return deleteIndent(editorState);
}


export function onReturn(editorState, isShiftKeyCommand = false) {
  if (getCurrentBlockType(editorState) !== 'code-block'
      || isShiftKeyCommand) {
    return null;
  }

  const selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    const withReplaced = Modifier.replaceText(
      editorState.getCurrentContent(),
      selection,
      '\n'
    );
    return EditorState.push(editorState, withReplaced, 'insert-characters');
  }

  const newState = RichUtils.insertSoftNewline(editorState);
  const text = getCurrentBlock(editorState).getText();
  const endIndex = editorState.getSelection().getAnchorOffset(); // exclusive
  const startIndex = getStartIndex(text, endIndex);
  const indentSize = getIndentSize(text, startIndex, endIndex);
  const withIndent = Modifier.replaceText(
    newState.getCurrentContent(),
    newState.getSelection(),
    getIndentCharacters(indentSize)
  );

  return EditorState.push(newState, withIndent, 'insert-characters');
}


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
      return onTabCode(editorState, isShiftKeyCommand);

    default:
      return editorState;
  }
}


const KeyCommandUtils = {
  onBackspace,
  onReturn,
  onTab,
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


function onTabCode(editorState, isShiftKeyCommand) {
  const selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    return editorState;
  }

  if (isShiftKeyCommand) {
    return deleteIndent(editorState);
  }

  const withIndent = Modifier.replaceText(
    editorState.getCurrentContent(),
    selection,
    getIndentCharacters(INDENT_SIZE)
  );

  return EditorState.push(editorState, withIndent, 'insert-characters');
}


function deleteIndent(editorState) {
  const block = getCurrentBlock(editorState);
  const text = block.getText();
  const anchorOffset = editorState.getSelection().getAnchorOffset();
  if (!hasIndent(text, anchorOffset)) {
    return null;
  }

  const selectionState = SelectionState.createEmpty(block.getKey());
  const updatedSelection = selectionState.merge({
    focusOffset: anchorOffset,
    anchorOffset: anchorOffset - INDENT_SIZE,
  });

  const withDeleted = Modifier.replaceText(
    editorState.getCurrentContent(),
    updatedSelection,
    ''
  );

  const newState = EditorState.push(
    editorState,
    withDeleted,
    'insert-characters'
  );
  return EditorState.forceSelection(newState, newState.getSelection());
}


function hasIndent(text, anchorOffset) {
  let size = 0;
  for (var i = anchorOffset - 1; i >= 0; --i) {
    if (text[i] !== ' ' || size >= INDENT_SIZE) break;
    ++size;
  }
  return size >= INDENT_SIZE;
}


function getStartIndex(text, endIndex) {
  for (var i = endIndex - 1; i >= 0; --i) {
    if (text[i] === '\n') {
      return i+1;
    }
  }
  return 0;
}


function getIndentSize(text, startIndex, endIndex) {
  let size = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (text[i] !== ' ') break;
    ++size;
  }
  return size;
}


function getIndentCharacters(size) {
  let indent = '';
  for (var i = 0; i < size; ++i) {
    indent += ' ';
  }
  return indent;
}
