import React, { ReactElement } from 'react';
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
import { SafeAreaView } from 'react-native';
import { CloudRnBuilderContextInstance } from './BuilderContext';
import { CloudRnWidgetBuilderInstance } from './WidgetBuilder';

class CloudRnViewBuilder extends ViewBuilder<ReactElement, ReactElement> {
  public context: BuilderContext = CloudRnBuilderContextInstance;

  public widgetBuilder: WidgetBuilder<ReactElement> =
    CloudRnWidgetBuilderInstance;

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
      SafeAreaView,
      null,
      children.flatMap(this.buildViewChild)
    );
  }
}

export const CloudRnViewBuilderInstance = new CloudRnViewBuilder();
