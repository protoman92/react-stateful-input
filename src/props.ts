import { InputHTMLAttributes, Key } from 'react';

export interface Type extends InputHTMLAttributes<HTMLInputElement> {
  readonly innerRef?: (e: HTMLInputElement | null) => void;

  /**
   * We make this prop mandatory, as per suggested by:
   * [https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html].
   * When a key changes, the entire component will be recreated, effectively
   * resetting internal state.
   */
  readonly key: Key;
}
