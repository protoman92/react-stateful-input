import { InputImpl } from 'component';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import { Numbers, Strings } from 'javascriptutilities';
import { Type as Props } from 'props';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { capture, instance, spy } from 'ts-mockito-2';

describe('Block builder component should be implemented correctly', () => {
  let component: JSX.Element;
  let props: Props;
  let wrapperInput: InputImpl;
  let innerInput: HTMLInputElement;

  beforeEach(() => {
    enzyme.configure({ adapter: new Adapter() });
    props = spy({})
  });

  it('Triggering focus - should focus inner input', () => {
    /// Setup
    component = <><InputImpl
      {...instance(props)}
      ref={e => wrapperInput = e!}
      innerRef={e => innerInput = e!} /></>;

    enzyme.mount(component);

    /// When
    wrapperInput.focus();

    /// Then
    expect(ReactDOM.findDOMNode(innerInput)!).toEqual(document.activeElement);
  });

  it('Triggering input - should trigger inner input event', () => {
    /// Setup
    props = spy({ ...instance(props), onChange: () => { } });
    component = <><InputImpl  {...instance(props)} /></>;
    let mounted = enzyme.mount(component);
    let inputs = Numbers.range(0, 1000).map(() => Strings.randomString(10));

    /// When
    for (let input of inputs) {
      mounted.simulate('change', { target: { value: input } });
    }

    mounted.unmount();

    /// Then
    for (let i = 0, length = inputs.length; i < length; i++) {
      let capturedEvent = capture(props.onChange!).byCallIndex(i)[0];
      expect(capturedEvent.target.value).toEqual(inputs[i]);
    }
  });
});
