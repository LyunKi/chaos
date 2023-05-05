import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import React, { RefObject } from 'react';
import { Popover } from './';

const ControlStory = () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <Popover
      container={document.body}
      visible={visible}
      renderOverlay={({ ref, style }) => (
        <div
          style={style}
          ref={ref as RefObject<HTMLDivElement>}
          data-testid="overlay"
        >
          overlay
        </div>
      )}
    >
      <button
        data-testid="trigger"
        onClick={() => {
          setVisible(true);
        }}
      >
        trigger
      </button>
    </Popover>
  );
};

describe('Popover', () => {
  it('should render overlay when hovered by default', async () => {
    const triggerRef = React.createRef<HTMLButtonElement>();
    await render(
      <Popover
        container={document.body}
        renderOverlay={() => <div data-testid="overlay">overlay</div>}
      >
        <button ref={triggerRef} data-testid="trigger">
          trigger
        </button>
      </Popover>
    );
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    triggerRef.current && fireEvent.pointerEnter(triggerRef.current);
    await waitFor(() => {
      expect(screen.queryByTestId('overlay')).toBeInTheDocument();
    });
    triggerRef.current && fireEvent.pointerLeave(triggerRef.current);
    await waitFor(() => {
      expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    });
  });

  it('should act as expected when trigger is triggered by clicked', async () => {
    const onTriggered = jest.fn();
    await render(
      <Popover
        container={document.body}
        triggerEvents={['click']}
        renderOverlay={() => <div data-testid="overlay">overlay</div>}
      >
        <button data-testid="trigger" onClick={onTriggered}>
          trigger
        </button>
      </Popover>
    );
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('trigger'));
    await waitFor(() => {
      expect(onTriggered).toBeCalled();
      expect(screen.queryByTestId('overlay')).toBeInTheDocument();
    });
    fireEvent.click(document.body);
    await waitFor(() => {
      expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    });
  });

  it('should be controlled when visible prop is passed', async () => {
    await render(<ControlStory />);
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    fireEvent.pointerEnter(screen.getByTestId('trigger'));
    await waitFor(() => {
      expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
    });
    fireEvent.click(screen.getByTestId('trigger'));
    await waitFor(() => {
      expect(screen.queryByTestId('overlay')).toBeInTheDocument();
    });
  });
});
