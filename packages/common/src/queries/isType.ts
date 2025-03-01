import { getPlatePluginType, PlateEditor } from '@udecode/plate-core';
import castArray from 'lodash/castArray';
/**
 * Does the node match the type provided.
 */

export const isType = (
  editor: PlateEditor,
  node: any,
  pluginKey?: string | string[]
) => {
  const keys = castArray(pluginKey);
  keys.forEach((key) => {
    if (node?.type === getPlatePluginType(editor, key)) return true;
  });
  return false;
};
