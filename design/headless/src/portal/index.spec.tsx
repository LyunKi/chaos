import { render } from '@testing-library/react';
import { Portal } from './';

describe('Portal', () => {
  it('should render child in specify container', async () => {
    render(
      <Portal container={document.body}>
        <div id="remote">test</div>
      </Portal>
    );
    expect(document.body.lastChild).toMatchSnapshot();
  });
});
