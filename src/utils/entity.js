//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: entity.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------
//
// This file contains a couple of utility functions for draftJS entities.


// getCurrentEntityKey()
//
// Returns the key of the entity for current selection if exists.
export function getCurrentEntityKey(editorState) {
  const selection = editorState.getSelection();
  const anchorKey = selection.getAnchorKey();
  const anchorOffset = selection.getAnchorOffset();
  const index = selection.isBackward ? anchorOffset - 1 : anchorOffset;

  return editorState
    .getCurrentContent()
    .getBlockForKey(anchorKey)
    .getEntityAt(index);
}


// getCurrentEntity()
//
// Returns the entity for current selection if exists, otherwise null.
export function getCurrentEntity(editorState) {
  const entityKey = getCurrentEntityKey(editorState);
  if (entityKey) {
    return editorState
      .getCurrentContent()
      .getEntity(entityKey);
  }
  return null;
}


// selectionHasEntity()
//
// Returns true if current selection has an entity, otherwise false.
export function selectionHasEntity(editorState, entityType) {
  const entity = getCurrentEntity(editorState);
  if (entity && entity.getType() === entityType) {
    return true;
  }
  return false;
}
