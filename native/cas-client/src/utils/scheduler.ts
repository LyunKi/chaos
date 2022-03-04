import takeRight from 'lodash/takeRight'
import each from 'lodash/each'
import isEmpty from 'lodash/isEmpty'

interface Time {
  day?: string
  hour: string
  min: string
  sec: string
}

type TaskCallback = (timeObj: Time, seconds: number) => any

class Task {
  callback?: (timeObj: Time, seconds: number) => any
  onComplete?: () => any
  current: number
  interval: number
  showDay: boolean
  //当前时刻，距离执行回调还需要多少基本时长
  timeToExecute: number
  /**
   * 创建一个任务需要的参数
   * @param current 当前倒计时（单位秒）
   * @param onComplete? 倒计时结束执行的回调
   * @param callback? 每秒执行的回调
   * @param showDay? 是否展示天（默认不展示）
   * @param interval 任务间隔时长（默认1基本时长）
   */
  constructor(
    current: number,
    onComplete?: () => any,
    callback?: TaskCallback,
    showDay?: boolean,
    interval = 1
  ) {
    this.callback = callback
    this.current = current
    this.onComplete = onComplete
    this.showDay = !!showDay
    this.interval = interval
    this.timeToExecute = interval
  }
}

/**
 * 基本间隔时长
 */
const BASE_INTERVAL = 1000

/**
 * 将时间转换为时分秒或天时分秒的格式
 * @param seconds 时间（单位秒）
 * @param showDay 是否展示天（默认不展示）
 */
function transformDhms(seconds = 0, showDay = false) {
  const day = Math.floor(seconds / (3600 * 24)).toString()

  const tempHour = showDay ? seconds % (3600 * 24) : seconds
  const hourNumber = Math.floor(tempHour / 3600)
  const hour = hourNumber > 9 ? `${hourNumber}` : `0${hourNumber}`

  const tempMin = seconds % 3600
  const min = takeRight(`0${Math.floor(tempMin / 60)}`, 2).join('')

  const tempSecond = seconds % 60
  const sec = takeRight(`0${tempSecond}`, 2).join('')

  return showDay ? { day, hour, min, sec } : { hour, min, sec }
}

interface Tasks {
  [key: string]: Task
}

/**
 * 任务管理类，用于监听倒计时并管理任务表
 */
export default class Scheduler {
  //任务表，key-value结构，任务都有唯一对应的key
  private tasks: Tasks

  //计数器，用于分配任务对应的key
  private counter: number

  //监听者，可用于关闭对任务的监听
  private listener?: NodeJS.Timeout

  //起始时间
  private start?: number

  //唯一单例
  private static instance?: Scheduler

  /**
   * 私有化构造方法，用于内部单例的创建
   */
  private constructor() {
    this.counter = 0
    this.tasks = {}
  }

  /**
   * 监听执行时每秒进行的操作。
   */
  action() {
    const completionTasks: string[] = []
    const now = Date.now()
    const duration = Math.floor((now - (this.start ?? 0)) / 1000)
    each(this.tasks, (task, key) => {
      const left = task.current - duration
      task.timeToExecute -= 1
      //如果，满足了间隔时间并且有回调方法时
      if (task.timeToExecute === 0) {
        //同时给返回两种格式的时间，防止默认的格式不满足要求
        task.callback && task.callback(transformDhms(left, task.showDay), left)
        task.timeToExecute = task.interval
      }
      //如果任务完成，执行回调，并且加入停止队列
      if (left <= 0) {
        task.onComplete && task.onComplete()
        completionTasks.push(key)
      }
    })
    this.stopTasks(...completionTasks)
  }

  /**
   * 开始监听倒计时
   */
  listen() {
    this.stopListen()
    this.listener = setInterval(this.action.bind(this), BASE_INTERVAL)
  }

  /**
   * 停止监听
   */
  stopListen() {
    this.listener && clearInterval(this.listener)
    this.listener = undefined
  }

  /**
   * 判断是否任务全部结束，如果是可以停止监听
   */
  judgeAndStop() {
    //如果没有任务了，不再开始监听
    isEmpty(this.tasks) && this.stopListen()
  }

  /**
   * 停止已完成的任务队列
   * @param taskKeys 已完成的任务队列
   */
  stopTasks(...taskKeys: string[]) {
    each(taskKeys, (taskKey) => {
      this.tasks.hasOwnProperty(taskKey) && delete this.tasks[taskKey]
    })
    //如果清理任务完成后发现没有需要执行的任务了,
    this.judgeAndStop()
  }

  /**
   * 将待进行的任务列表存入并交由任务管理类管理
   */
  static spawnTasks(...tasks: Task[]): {
    initial: Time[]
    interruptTasks(): void
  } {
    if (isEmpty(tasks)) {
      throw new Error('Please arrange atleast one task')
    }
    //如果没有创建单例
    if (!this.instance) {
      this.instance = new Scheduler()
    }
    const currentKeys: string[] = []
    const initial: Time[] = []
    each(tasks, (task) => {
      //如果初始的countdown就已经完成了
      if (task.current <= 0) {
        task.onComplete && task.onComplete()
        initial.push(transformDhms(0, task.showDay))
        return
      }
      if (!this.instance) {
        throw new Error('Never happened uninitialized Scheduler')
      }
      const key = 'task' + this.instance.counter
      this.instance.tasks[key] = task
      this.instance.counter += 1
      currentKeys.push(key)
      initial.push(transformDhms(task.current, task.showDay))
    })
    //如果有需要监听的任务并且单例没开始进行监听
    if (!isEmpty(currentKeys) && !this.instance.listener) {
      this.instance.listen()
      this.instance.start = Date.now()
    }
    //方便初始的展示和调用者强行中断相应的任务
    return {
      initial,
      interruptTasks: this.instance.stopTasks.bind(
        this.instance,
        ...currentKeys
      ),
    }
  }

  /**
   * 获取唯一单例
   */
  static getInstance() {
    return this.instance
  }

  /**
   * 判断是否有任务正在执行
   */
  static get isListening() {
    return !!this.instance && !!this.instance.listener
  }
}

export { transformDhms, Task }
