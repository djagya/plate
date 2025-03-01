import React from 'react';
import { getPreventDefaultHandler, someNode } from '@udecode/plate-common';
import { getPlatePluginType, usePlateEditorState } from '@udecode/plate-core';
import { ELEMENT_TABLE } from '@udecode/plate-table';
import { ToolbarButton } from '@udecode/plate-toolbar';
import { TableToolbarButtonProps } from './TableToolbarButton.types';

export const TableToolbarButton = ({
  transform,
  header,
  ...props
}: TableToolbarButtonProps) => {
  const editor = usePlateEditorState();
  const type = getPlatePluginType(editor, ELEMENT_TABLE);

  return (
    <ToolbarButton
      active={
        !!editor?.selection &&
        someNode(editor, {
          match: { type },
        })
      }
      onMouseDown={
        !!type && editor
          ? getPreventDefaultHandler(transform, editor, { header })
          : undefined
      }
      {...props}
    />
  );
};
