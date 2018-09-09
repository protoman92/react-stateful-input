import { Undefined } from 'javascriptutilities';
import { InputHTMLAttributes, Key } from 'react';

export interface Type extends InputHTMLAttributes<HTMLInputElement> {
  readonly innerRef?: (e: HTMLInputElement | null) => void;

  /**
   * We make this prop mandatory, as per suggested by:
   * [https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html].
   * This is kept to protect against future implementations that could make
   * this component uncontrolled.
   */
  readonly key: Undefined<Key>;
}
