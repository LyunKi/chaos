import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import { useForceUpdate } from './';

describe('useForceUpdate', () => {
  it('should rerender app', () => {
    const fn = jest.fn();
    function App() {
      const forceUpdate = useForceUpdate();
      fn();
      return (
        <div>
          <button data-testid="rerender" onClick={forceUpdate}>
            rerender
          </button>
        </div>
      );
    }
    render(<App />);
    expect(fn).toBeCalledTimes(1);
    fireEvent.click(screen.getByTestId('rerender'));
    waitFor(() => {
      expect(fn).toBeCalledTimes(2);
    });
  });
});
