import { Objects } from 'javascriptutilities';
import * as React from 'react';
import { ChangeEvent, ChangeEventHandler, PureComponent } from 'react';
import { Type as Props } from './props';
import { Type as State } from './state';
type OnChange = ChangeEventHandler<HTMLInputElement>;

export class InputImpl extends PureComponent<Props, State> {
  private inputRef?: HTMLInputElement | null;
  private savedEvent?: ChangeEvent<HTMLInputElement>;
  private savedCTarget?: EventTarget & HTMLInputElement;
  private savedTarget?: EventTarget & HTMLInputElement;

  public constructor(props: Props) {
    super(props);
    this.state = { value: props.value };
  }

  public componentWillUnmount() {
    this.savedEvent = undefined;
    this.savedCTarget = undefined;
    this.savedTarget = undefined;
  }

  public focus() {
    if (this.inputRef) { this.inputRef.focus(); }
  }

  private onChange(callback: OnChange): OnChange {
    return e => {
      this.savedEvent = { ...e };
      this.savedCTarget = { ...e.currentTarget };
      this.savedTarget = { ...e.target };

      this.setState({ value: e.target.value }, () => {
        if (this.savedEvent) {
          if (this.savedEvent) {
            let event = this.savedEvent;
            if (this.savedTarget) { event.target = this.savedTarget; }
            if (this.savedCTarget) { event.currentTarget = this.savedCTarget; }
            callback(event);
          }
        }
      });
    }
  }

  public render() {
    let propsCopy = { ...this.props };
    let onChange = propsCopy.onChange;

    return <input {...Objects.deleteKeysUnsafely(propsCopy, 'innerRef', 'value')}
      value={this.state.value || this.props.value}
      onChange={onChange ? this.onChange(onChange) : undefined}
      ref={e => {
        this.inputRef = e;
        if (this.props.innerRef) { this.props.innerRef(e); }
      }} />
  }
}
