/** @jsx jsx */

import { jsx } from '@udecode/plate-test-utils';
import { withReact } from 'slate-react';
import { withLink } from '../../../withLink';

jsx;

const input = (
  <editor>
    <hp>
      test
      <cursor />
    </hp>
  </editor>
) as any;

const data: any = { getData: () => 'test' };

const output = (
  <editor>
    <hp>testtest</hp>
  </editor>
) as any;

it('should run default insertText', () => {
  jest.spyOn(JSON, 'parse').mockReturnValue(<fragment>test</fragment>);

  const editor = withLink()(withReact(input));

  editor.insertData(data);

  expect(input.children).toEqual(output.children);
});
