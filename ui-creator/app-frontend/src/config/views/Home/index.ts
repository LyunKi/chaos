import { View, RouteItem } from '@cloud-creator/common';

const HOME: View = {
  children: [
    {
      type: 'View',
      props: [
        {
          name: 'ts',
          value: { background: '$color.bg.layout', flexDirection: 'column' },
          valueType: 'object',
        },
      ],
      children: [
        {
          type: 'View',
          props: [
            {
              name: 'ts',
              value: {
                height: '$rem:4',
                paddingHorizontal: '$space.6',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
              valueType: 'object',
            },
          ],
          children: [
            {
              type: 'View',
              props: [
                {
                  name: 'ts',
                  value: {
                    alignItems: 'center',
                  },
                  valueType: 'object',
                },
              ],
              children: [
                {
                  type: '@cloud-creator/components:Logo',
                  props: [
                    { name: 'width', value: '$rem:2.25' },
                    { name: 'height', value: '$rem:2.25' },
                  ],
                },
                {
                  type: 'Text',
                  props: [
                    {
                      name: 'value',
                      value: 'UI Creator',
                    },
                    {
                      name: 'ts',
                      value: {
                        marginLeft: '$rem:0.5',
                        fontSize: '$fontSize.xl',
                        fontWeight: '$fontWeight.bold',
                      },
                      valueType: 'object',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const HomeRoute: RouteItem = {
  name: 'Home',
  child: HOME,
};
