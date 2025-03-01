import {
  getRangeBefore,
  getRangeFromBlockStart,
  getText,
  isCollapsed,
  isUrl as isUrlProtocol,
  someNode,
  unwrapNodes,
} from '@udecode/plate-common';
import {
  getPlatePluginType,
  PlateEditor,
  WithOverride,
} from '@udecode/plate-core';
import { withRemoveEmptyNodes } from '@udecode/plate-normalizers';
import { Range } from 'slate';
import { upsertLinkAtSelection } from './transforms/upsertLinkAtSelection';
import { wrapLink } from './transforms/wrapLink';
import { ELEMENT_LINK } from './defaults';
import { WithLinkOptions } from './types';

const upsertLink = (
  editor: PlateEditor,
  {
    url,
    at,
  }: {
    url: string;
    at: Range;
  }
) => {
  unwrapNodes(editor, {
    at,
    match: { type: getPlatePluginType(editor, ELEMENT_LINK) },
  });

  const newSelection = editor.selection as Range;

  wrapLink(editor, {
    at: {
      ...at,
      focus: newSelection.focus,
    },
    url,
  });
};

const upsertLinkIfValid = (editor: PlateEditor, { isUrl }: { isUrl: any }) => {
  const rangeFromBlockStart = getRangeFromBlockStart(editor);
  const textFromBlockStart = getText(editor, rangeFromBlockStart);

  if (rangeFromBlockStart && isUrl(textFromBlockStart)) {
    upsertLink(editor, { url: textFromBlockStart, at: rangeFromBlockStart });
    return true;
  }
};

/**
 * Insert space after a url to wrap a link.
 * Lookup from the block start to the cursor to check if there is an url.
 * If not found, lookup before the cursor for a space character to check the url.
 *
 * On insert data:
 * Paste a string inside a link element will edit its children text but not its url.
 *
 */
export const withLink = ({
  isUrl = isUrlProtocol,
  rangeBeforeOptions = {
    matchString: ' ',
    skipInvalid: true,
    afterMatch: true,
    multiPaths: true,
  },
}: WithLinkOptions = {}): WithOverride => (editor) => {
  const { insertData, insertText } = editor;

  const type = getPlatePluginType(editor, ELEMENT_LINK);

  editor.insertText = (text) => {
    if (text === ' ' && isCollapsed(editor.selection)) {
      const selection = editor.selection as Range;

      if (upsertLinkIfValid(editor, { isUrl })) {
        return insertText(text);
      }

      const beforeWordRange = getRangeBefore(
        editor,
        selection,
        rangeBeforeOptions
      );

      if (beforeWordRange) {
        const beforeWordText = getText(editor, beforeWordRange);

        if (isUrl(beforeWordText)) {
          upsertLink(editor, { url: beforeWordText, at: beforeWordRange });
        }
      }
    }

    insertText(text);
  };

  editor.insertData = (data: DataTransfer) => {
    const text = data.getData('text/plain');

    if (text) {
      if (isUrl(text)) {
        return upsertLinkAtSelection(editor, { url: text });
      }

      if (someNode(editor, { match: { type } })) {
        return insertText(text);
      }
    }

    insertData(data);
  };

  // editor.insertBreak = () => {
  //   if (upsertLinkIfValid(editor, { link, isUrl })) {
  //     console.info('fix cursor');
  //   }
  //
  //   insertBreak();
  // };

  editor = withRemoveEmptyNodes({ type })(editor);

  return editor;
};
