//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: block.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

// NOTE: This function is copied from draft-js framework and is licensed under
// the MIT license by Facebook, Inc. and its affiliates.
export function adjustBlockDepth(contentState, selectionState, adjustment, maxDepth) {
  var startKey = selectionState.getStartKey();
  var endKey = selectionState.getEndKey();
  var blockMap = contentState.getBlockMap();
  var blocks = blockMap.toSeq().skipUntil(function (_, k) {
    return k === startKey;
  }).takeUntil(function (_, k) {
    return k === endKey;
  }).concat([[endKey, blockMap.get(endKey)]]).map(function (block) {
    var depth = block.getDepth() + adjustment;
    depth = Math.max(0, Math.min(depth, maxDepth));
    return block.set('depth', depth);
  });
  blockMap = blockMap.merge(blocks);
  return contentState.merge({
    blockMap: blockMap,
    selectionBefore: selectionState,
    selectionAfter: selectionState
  });
}


export function getCurrentBlock(editorState) {
  const selection = editorState.getSelection();
  return editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey());
}


export function getCurrentBlockDepth(editorState) {
  return getCurrentBlock(editorState).getDepth();
}


export function getCurrentBlockType(editorState) {
  return getCurrentBlock(editorState).getType();
}