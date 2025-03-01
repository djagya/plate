import { OverridePropsOptions } from '@udecode/plate-common';

export interface IndentPluginOptions
  extends OverridePropsOptions<string | number> {
  /**
   * Indentation offset used in `(offset * element.indent) + unit`.
   * @default 40
   */
  offset?: number;

  /**
   * Indentation unit used in `(offset * element.indent) + unit`.
   * @default 'px'
   */
  unit?: string;

  /**
   * Maximum number of indentation.
   */
  indentMax?: number;
}
