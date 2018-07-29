import { Objects } from 'javascriptutilities';
import * as React from 'react';
import { ChangeEventHandler, PureComponent } from 'react';
import { Type as Props } from './props';
import { Type as State } from './state';
type OnChange = ChangeEventHandler<HTMLInputElement>;

export class InputImpl extends PureComponent<Props, State> {
  private inputRef?: HTMLInputElement | null;

  public constructor(props: Props) {
    super(props);
    this.state = { value: props.value };
  }

  public focus() {
    if (this.inputRef) { this.inputRef.focus(); }
  }

  private onChange(callback?: OnChange): OnChange {
    return e => {
      this.setState({ value: e.target.value });
      if (callback) { callback(e); }
    };
  }

  public render() {
    let propsCopy = { ...this.props };

    return <input
      {...Objects.deleteKeysUnsafely(propsCopy, 'innerRef', 'key', 'value')}
      value={this.state.value || this.props.value}
      onChange={this.onChange(this.props.onChange)}
      ref={e => {
        this.inputRef = e;
        if (this.props.innerRef) { this.props.innerRef(e); }
      }} />;
  }
}
