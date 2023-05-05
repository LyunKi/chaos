import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { Modal } from './';

describe('Modal', () => {
  it('should render modal when trigger clicked', async () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    await render(
      <Modal
        container={document.body}
        renderOverlay={() => <div data-testid="overlay">modal overlay</div>}
      >
        <button ref={triggerRef} data-testid="trigger">
          modal trigger
        </button>
      </Modal>
    );
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    triggerRef.current && fireEvent.click(triggerRef.current);
    await waitFor(() => {
      expect(screen.queryByTestId('overlay')).toBeInTheDocument();
    });
    triggerRef.current && fireEvent.click(triggerRef.current);
    await waitFor(() => {
      expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    });
  });
});
