import {
  AppBuilder,
  ViewBuilder,
  WidgetBuilder,
  BuilderContext,
} from '@cloud-creator/common';
import { CloudWidgetBuilderInstance } from './WidgetBuilder';
import { CloudViewBuilderInstance } from './ViewBuilder';
import { CloudBuilderContextInstance } from './BuilderContext';
import { ReactElement } from 'react';

export class CloudAppBuilder extends AppBuilder<
  ReactElement,
  ReactElement,
  ReactElement
> {
  public builderName: string;

  public constructor(builderName: string) {
    super();
    this.builderName = builderName;
  }

  public context: BuilderContext = CloudBuilderContextInstance;

  public viewBuilder: ViewBuilder<ReactElement, ReactElement> =
    CloudViewBuilderInstance;

  public widgetBuilder: WidgetBuilder<ReactElement> =
    CloudWidgetBuilderInstance;
}
