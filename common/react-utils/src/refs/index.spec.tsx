import { render } from '@testing-library/react';
import React from 'react';
import { combineRefs } from '.';

const TestRef = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => {
    return {
      injected: () => {
        return 'work';
      },
    };
  });
  return null;
});

describe('util:combineRefs', () => {
  it('should enable pass multi refs to component', () => {
    let mock: any;
    const ref1 = (node: any) => {
      mock = node;
    };
    const ref2 = React.createRef<any>();
    render(<TestRef ref={combineRefs(ref1, ref2)} />);
    expect(mock?.injected()).toBe('work');
    expect(ref2.current?.injected()).toBe('work');
  });
});
