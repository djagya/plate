/** @jsx jsx */

import { PlateEditor } from '@udecode/plate-core';
import { jsx } from '@udecode/plate-test-utils';
import { getPointBefore } from '../../../../queries/getPointBefore';

jsx;

const input = ((
  <editor>
    <hp>
      find **test
      <cursor />
    </hp>
  </editor>
) as any) as PlateEditor;

const output = {
  offset: 7,
  path: [0, 0],
};

it('should be', () => {
  expect(
    getPointBefore(input, input.selection as any, {
      skipInvalid: true,
      afterMatch: true,
      matchString: '**',
    })
  ).toEqual(output);
});
