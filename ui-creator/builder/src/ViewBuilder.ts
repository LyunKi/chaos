import React, { Fragment, ReactElement } from 'react';
import {
  ViewBuilder,
  WidgetSnippet,
  Widget,
  ViewChild,
  isWidgetSnippet,
  View,
  WidgetBuilder,
  BuilderContext,
} from '@cloud-design/creator-common';
import { CloudBuilderContextInstance } from './BuilderContext';
import { CloudWidgetBuilderInstance } from './WidgetBuilder';

class CloudViewBuilder extends ViewBuilder<ReactElement, ReactElement> {
  public context: BuilderContext = CloudBuilderContextInstance;

  public widgetBuilder: WidgetBuilder<ReactElement> =
    CloudWidgetBuilderInstance;

  public buildWidgetSnippet = (widgetSnippet: WidgetSnippet) => {
    return widgetSnippet.children.map(this.buildWidget);
  };

  public buildWidget = (widget: Widget): ReactElement => {
    return this.widgetBuilder.build(widget);
  };

  private buildViewChild = (viewChild: ViewChild) => {
    return isWidgetSnippet(viewChild)
      ? this.buildWidgetSnippet(viewChild)
      : this.buildWidget(viewChild);
  };

  public build(view: View): ReactElement {
    const { children } = view;
    return React.createElement(
      Fragment,
      null,
      children.flatMap(this.buildViewChild)
    );
  }
}

export const CloudViewBuilderInstance = new CloudViewBuilder();
