import {
  BuilderContext,
  View,
  ViewBuilder,
  ViewChild,
  Widget,
  WidgetBuilder,
  WidgetSnippet,
  isWidgetSnippet,
} from '@cloud-creator/common';
import React, { Fragment, ReactElement } from 'react';
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
