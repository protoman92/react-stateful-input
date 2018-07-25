import { InputHTMLAttributes } from 'react';

export interface Type extends InputHTMLAttributes<HTMLInputElement> {
  readonly innerRef?: (e: HTMLInputElement | null) => void;
}
