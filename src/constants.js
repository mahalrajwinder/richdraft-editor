//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: constants.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import icons from './icons';


export const BLOCK_TYPES = [
  {
    label: 'H1',
    style: 'header-one',
    icon: icons.HeaderOneIcon
  },
  {
    label: 'H2',
    style: 'header-two',
    icon: icons.HeaderTwoIcon
  },
  {
    label: 'H3',
    style: 'header-three',
    icon: icons.HeaderThreeIcon
  },
  {
    label: 'UL',
    style: 'unordered-list-item',
    icon: icons.ULIcon
  },
  {
    label: 'OL',
    style: 'ordered-list-item',
    icon: icons.OLIcon
  },
  {
    label: 'Blockquote',
    style: 'blockquote',
    icon: icons.BlockQuoteIcon
  },
  {
    label: 'Code',
    style: 'code-block',
    icon: icons.CodeBlockIcon
  }
];


export const INLINE_STYLES = [
  {
    label: 'B',
    style: 'BOLD',
    icon: icons.BoldIcon
  },
  {
    label: 'I',
    style: 'ITALIC',
    icon: icons.ItalicIcon
  },
  {
    label: 'U',
    style: 'UNDERLINE',
    icon: icons.UnderlineIcon
  },
  {
    label: 'H',
    style: 'HIGHLIGHT',
    icon: icons.HighlightIcon
  },
  {
    label: 'S',
    style: 'STRIKETHROUGH',
    icon: icons.StrikeThroughIcon
  }
];


export const Entity = {
  LINK: {
    label: 'Link',
    style: 'LINK',
    mutability: 'MUTABLE',
    icon: icons.LinkIcon
  }
};


export const ClassName = {
  EDITOR: 'RichDraftEditor-editor',
  HIDE_PLACEHOLDER: 'RichDraftEditor-editor-hidePlaceholder',
  ROOT: 'RichDraftEditor-root',
  TOOLBAR: 'RichDraftEditor-toolbar',
  TOOLBAR_ITEM: 'RichDraftEditor-toolbarItem',
  TOOLBAR_ITEM_ACTIVE: 'RichDraftEditor-toolbarItem-active'
};


export const HANDLED = 'handled';
export const NOT_HANDLED = 'not_handled';
export const PLACEHOLDER = 'Tell a story';

export default {
  BLOCK_TYPES,
  INLINE_STYLES,
  Entity
};