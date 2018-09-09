import {Objects} from 'javascriptutilities';
import * as React from 'react';
import {ChangeEventHandler, PureComponent, ChangeEvent} from 'react';
import {Type as Props} from './props';
import {Type as State} from './state';
type OnChange = ChangeEventHandler<HTMLInputElement>;

export class InputImpl extends PureComponent<Props, State> {
  private inputRef?: HTMLInputElement | null;
  private savedEvent?: ChangeEvent<HTMLInputElement>;
  private savedCrTarget?: HTMLInputElement;
  private savedTarget?: HTMLInputElement;

  public constructor(props: Props) {
    super(props);
    this.state = {selectionStart: null, selectionEnd: null};
  }

  public componentWillUnmount() {
    this.savedEvent = undefined;
    this.savedCrTarget = undefined;
    this.savedTarget = undefined;
  }

  public componentDidUpdate() {
    if (this.inputRef) {
      let {selectionStart, selectionEnd} = this.state;
      this.inputRef.selectionStart = selectionStart;
      this.inputRef.selectionEnd = selectionEnd;
    }
  }

  public focus() {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  private onChange(callback: OnChange): OnChange {
    return e => {
      if (this.inputRef) {
        this.savedEvent = {...e};
        this.savedCrTarget = {...e.currentTarget};
        this.savedTarget = {...e.target};

        this.setState(
          {
            selectionStart: this.inputRef.selectionStart,
            selectionEnd: this.inputRef.selectionEnd,
          },
          () => {
            if (this.savedEvent) {
              if (this.savedCrTarget) {
                this.savedEvent.currentTarget = this.savedCrTarget;
              }

              if (this.savedTarget) {
                this.savedEvent.target = this.savedTarget;
              }

              callback(this.savedEvent);
            }
          }
        );
      } else {
        callback(e);
      }
    };
  }

  public render() {
    let propsCopy = {...this.props};
    let {onChange, innerRef} = propsCopy;

    return (
      <input
        {...Objects.deleteKeysUnsafely(propsCopy, 'innerRef', 'key')}
        onChange={onChange ? this.onChange(onChange) : undefined}
        ref={e => {
          this.inputRef = e;
          if (innerRef) {
            innerRef(e);
          }
        }}
      />
    );
  }
}
