/** @jsx jsx */

import { PlateEditor } from '@udecode/plate-core';
import { jsx } from '@udecode/plate-test-utils';
import { getPointBefore } from '../../../../queries/getPointBefore';

jsx;

const input = ((
  <editor>
    <hp>
      test http://google.com
      <cursor />
    </hp>
  </editor>
) as any) as PlateEditor;

const output = { offset: 4, path: [0, 0] };

it('should be', () => {
  expect(
    getPointBefore(input, input.selection as any, {
      matchString: ' ',
      skipInvalid: true,
    })
  ).toEqual(output);
});
