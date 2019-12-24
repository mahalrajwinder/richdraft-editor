//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: block.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

export function getCurrentBlock(editorState) {
  const selection = editorState.getSelection();
  return editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey());
}


export function getCurrentBlockType(editorState) {
  return getCurrentBlock(editorState).getType();
}