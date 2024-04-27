import { Component } from 'react';
import { action, observable, runInAction } from '@cloud-dragon/obx-core';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { observer } from './';

describe('observer', () => {
  it('should support react component', async () => {
    const fc = jest.fn();
    const FC1 = observer((props: any) => {
      fc();
      return (
        <div data-testid="fc">
          {props.user.name} has a pet {props.user.pet.type}
        </div>
      );
    });

    const cc = jest.fn();
    @observer
    class CC1 extends Component<any> {
      render() {
        cc();
        return (
          <div data-testid="cc">current pet age:{this.props.user.pet.age}</div>
        );
      }
    }

    class User {
      @observable accessor name = 'unknown';
      @observable accessor pet = {
        name: 'dogA',
        age: 1,
        type: 'dog',
      };

      @action changeName(newName: string) {
        this.name = newName;
      }

      @action addAge() {
        this.pet.age += 1;
      }

      @action async changePet() {
        this.addAge();
        await Promise.resolve('mock');
        // 异步任务，需要将状态变更包装在 runInAction 里,或者调用 action方法，非 action 里的 observables 变化不会被观察
        // 同步的状态变化会被合并
        runInAction(() => {
          this.pet.name = 'dogB';
        });
        this.addAge();
      }
    }

    const app = jest.fn();
    const App = () => {
      const user = new User();
      let count = 0;
      app();
      return (
        <>
          <FC1 user={user} />
          <CC1 user={user} />
          <button
            data-testid="changeName"
            onClick={() => {
              user.changeName(`user-${count}`);
              count += 1;
            }}
          >
            changeName
          </button>
          <button
            data-testid="changePet"
            onClick={() => {
              user.changePet();
            }}
          >
            changePet
          </button>
        </>
      );
    };

    render(<App />);

    fireEvent.click(screen.getByTestId('changePet'));
    await waitFor(() => {
      expect(fc).toHaveBeenCalledTimes(1);
      expect(app).toHaveBeenCalledTimes(1);
      // 同步更新一次，异步更新一次
      expect(cc).toHaveBeenCalledTimes(3);
      expect(screen.getByTestId('cc')).toHaveTextContent('3');
    });

    fireEvent.click(screen.getByTestId('changeName'));
    await waitFor(() => {
      expect(cc).toHaveBeenCalledTimes(3);
      expect(fc).toHaveBeenCalledTimes(2);
      expect(app).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('fc')).toHaveTextContent('user-0');
    });
  });
});
