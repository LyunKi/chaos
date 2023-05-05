import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { SizeObserver } from './';

describe('Size observer', () => {
  it('should pass ref to child', async () => {
    // jest不会触发 onResize 事件，所以这里无法测试
    const mockOnResize = jest.fn();
    const superRef = React.createRef<HTMLDivElement>();
    const childRef = React.createRef<HTMLDivElement>();
    render(
      <SizeObserver onResize={mockOnResize} ref={superRef}>
        <div ref={childRef} style={{ height: 5 }}>
          test
        </div>
      </SizeObserver>
    );
    if (!childRef.current) {
      throw new Error('Ref not work');
    }
    childRef.current.style.height = '10px';
    await waitFor(() => {
      expect(superRef.current?.style.height).toBe('10px');
    });
  });
});
