//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: defaultActions.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------
//
// This file contains an array of default action objects for the toolbar.

import icons from './icons';


export default [
  {
    type: 'inline',
    label: 'Bold',
    style: 'BOLD',
    icon: icons.BoldIcon
  },

  {
    type: 'inline',
    label: 'Italic',
    style: 'ITALIC',
    icon: icons.ItalicIcon
  },

  {
    type: 'inline',
    label: 'Underline',
    style: 'UNDERLINE',
    icon: icons.UnderlineIcon
  },

  {
    type: 'inline',
    label: 'Highlight',
    style: 'HIGHLIGHT',
    icon: icons.HighlightIcon
  },

  {
    type: 'inline',
    label: 'StrikeThrough',
    style: 'STRIKETHROUGH',
    icon: icons.StrikeThroughIcon
  },

  {
    type: 'entity',
    label: 'Link',
    style: 'LINK',
    mutability: 'MUTABLE',
    icon: icons.LinkIcon
  },

  { type: 'separator' },

  {
    type: 'block',
    label: 'H1',
    style: 'header-one',
    icon: icons.HeaderOneIcon
  },

  {
    type: 'block',
    label: 'H2',
    style: 'header-two',
    icon: icons.HeaderTwoIcon
  },

  {
    type: 'block',
    label: 'H3',
    style: 'header-three',
    icon: icons.HeaderThreeIcon
  },

  {
    type: 'block',
    label: 'UL',
    style: 'unordered-list-item',
    icon: icons.ULIcon
  },

  {
    type: 'block',
    label: 'OL',
    style: 'ordered-list-item',
    icon: icons.OLIcon
  },

  {
    type: 'block',
    label: 'Blockquote',
    style: 'blockquote',
    icon: icons.BlockQuoteIcon
  },

  {
    type: 'block',
    label: 'Code',
    style: 'code-block',
    icon: icons.CodeBlockIcon
  },
];
