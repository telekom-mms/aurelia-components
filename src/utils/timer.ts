import {
  addTimedelta,
  TimeComponents,
  toMilliseconds
} from "./time"

export type TimerComponentsParameters = {
  duration: TimeComponents,
  tick?: TimeComponents,
  continues?: boolean,
  onTick?: (timer: Timer) => void,
  onComplete: (timer: Timer) => void,
  onStart?: (timer: Timer) => void,
}

export class Timer {
  private readonly _params: TimerComponentsParameters
  private _tickInterval: number
  private _durationTimeout: number
  private _startDate: Date
  private _durationMs: number
  private _completeDate: Date

  constructor(params: TimerComponentsParameters) {
    this._params = params
    this._startDate = new Date()
    this._completeDate = this._startDate
    this._updateDuration()
  }

  /**
   * (Re)starts the timer
   */
  start() {
    this.dispose()
    if (this._params.tick && this._params.onTick) {
      this._tickInterval = window.setInterval(() => this._params.onTick(this), toMilliseconds(this._params.tick))
    }
    this._startDate = new Date()
    this._completeDate = addTimedelta(this._startDate, this._params.duration)
    this._updateDuration()
    this._durationTimeout = window.setTimeout(() => this._onComplete(), this._durationMs)
  }

  private _updateDuration() {
    this._durationMs = this._completeDate.getTime() - this._startDate.getTime()
  }

  /**
   * @return Date of start
   */
  get startDate(): Date {
    return this._startDate
  }

  /**
   * @return Date of completion
   */
  get completeDate(): Date {
    return this._completeDate
  }

  /**
   * @return Progress in percent (0..1)
   */
  get progress(): number {
    return this.timePassed / this._durationMs
  }

  /**
   * @return Passed time in milliseconds
   */
  get timePassed(): number {
    return new Date().getTime() - this._startDate.getTime()
  }

  /**
   * @return Time left in milliseconds
   */
  get timeLeft(): number {
    return this._completeDate.getTime() - new Date().getTime()
  }

  private _onComplete() {
    window.clearInterval(this._tickInterval)

    this._params.onComplete(this)

    if (this._params.continues) {
      this.start()
    }
  }

  /**
   * Stops the timer and clears all intervals.
   */
  dispose() {
    window.clearInterval(this._tickInterval)
    window.clearTimeout(this._durationTimeout)
  }
}
