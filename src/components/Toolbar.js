//
// Copyright (c) 2019 Rajwinder Singh
// Licensed under the MIT license
//
// -----------------------------------------------------------------------------
// File: Toolbar.js
// Author: Rajwinder Singh
// -----------------------------------------------------------------------------

import React from 'react';
import ToolbarItem from './ToolbarItem';

import {
  EditorState,
  RichUtils
  } from 'draft-js';

import { ClassName } from '../constants';
import { getCurrentBlockType } from '../utils/block';
import {
  selectionHasEntity,
  getCurrentEntity
  } from '../utils/entity';

import '../styles/toolbar.css';


class Toolbar extends React.Component {
  static defaultProps = {
    getPositionFn: () => {},
    shouldDisplayToolbarFn: () => true
  };

  constructor(props) {
    super(props);

    this.state = {
      showToolbar: this.props.shouldDisplayToolbarFn(),
      editingEntity: null, // Entity object from actions' array
    };

    this.blur = () => this.setState({ editingEntity: null });

    this.renderToolbarItem = this.renderToolbarItem.bind(this);
    this.cancelEntity = this.cancelEntity.bind(this);
    this.removeEntity = this.removeEntity.bind(this);
    this.setEntity = this.setEntity.bind(this);
  } // Toolbar::constructor


  componentDidMount() {
  }


  componentDidUpdate() {
  }


  toggleBlockType(blockType) {
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    );
  }


  toggleInlineStyle(inlineStyle) {
    this.props.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    );
  }


  toggleEntity(entityObject) {
    this.setState({ editingEntity: entityObject });
  }


  cancelEntity() {
    this.setState(
      { editingEntity: null },
      () => {
        setTimeout(() => this.props.editor && this.props.editor.focus(), 0);
      }
    );
  }


  removeEntity() {
    const editorState = this.props.editorState;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.props.onChange(
        RichUtils.toggleLink(editorState, selection, null)
      );
    }
    this.cancelEntity();
  }


  setEntity(data) {
    const editorState = this.props.editorState;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      this.state.editingEntity.style,
      this.state.editingEntity.mutability,
      data
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey
    );

    const selectionState = EditorState.forceSelection(
      newState,
      editorState.getSelection()
    );

    this.props.onChange(selectionState);
  }


  renderToolbarItem(item, index) {
    let active = null;
    let toggle = null;
    let key = item.label;

    switch (item.type) {
      case 'inline': {
        toggle = () => this.toggleInlineStyle(item.style);
        active = this.props.editorState
          .getCurrentInlineStyle()
          .has(item.style);
        break;
      }
      case 'block': {
        toggle = () => this.toggleBlockType(item.style);
        active = item.style === getCurrentBlockType(this.props.editorState);
        break;
      }
      case 'entity': {
        const entityType = item.style;
        toggle = () => this.toggleEntity(item);
        active = selectionHasEntity(this.props.editorState, entityType);
        break;
      }
      case 'separator': {
        key = 'separator-' + index;
        break;
      }
      default: {
        key += index;
        toggle = () => item.action(this.props.editorState, this.props.onChange);
        active = item.active(this.props.editorState);
        break;
      }
    }

    return (
      <ToolbarItem
        key={key}
        active={active}
        toggle={toggle}
        item={item}
      />
    );
  }


  renderToolbarItems() {
    return (
      <span className={ClassName.TOOLBAR_ITEM_CONTAINER}>
        {this.props.actions.map(this.renderToolbarItem)}
      </span>
    );
  }


  renderEntityInput(entityObject) {
    const entityType = entityObject.style;
    const Component = this.props.entityInputs[entityType];
    if (!Component) {
      console.warn('no entityInput for Entity(' + entityType + ') provided');
      return null;
    }

    let entity = null;
    let entityData = {};
    if (selectionHasEntity(this.props.editorState, entityType)) {
      entity = getCurrentEntity(this.props.editorState);
      entityData = entity.getData();
    }

    return (
      <Component
        onCancel={this.cancelEntity}
        onRemove={this.removeEntity}
        setEntity={this.setEntity}
        entity={entity}
        entityData={entityData}
        entityType={entityType}
      />
    );
  }


  render() {
    if (!this.state.showToolbar) {
      return null;
    }
    return (
      <div className={ClassName.TOOLBAR} onBlur={this.blur}>
        {
          this.state.editingEntity
          ? this.renderEntityInput(this.state.editingEntity)
          : this.renderToolbarItems()
        }
      </div>
    );
  }
} // Toolbar

export default Toolbar;
