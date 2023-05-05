export interface SizeObserverProps {
  /**
   * OnResize function, triggered when child component resizing.
   */
  onResize: (node: HTMLElement) => any;

  /**
   * Observable child component
   */
  children: React.ReactNode;
}
