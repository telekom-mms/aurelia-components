import {Timer} from "../../src/utils/timer";
import {sleep, TimeComponents} from "../../src/utils/time";

test('test timer', async () => {
  let ticks = 0
  let completed = false
  const duration: TimeComponents = {ms: 500}
  const timer = new Timer({
    tick: {ms: 110},
    duration: duration,
    onTick: _timer => {
      ++ticks
    },
    onComplete: _timer => {
      completed = true
    }
  })

  timer.start()

  await sleep(duration)

  // The correct calculation of timer.progress is given in 1 = 100%.
  // It's depend on test execution environment how much time is gone between the end of Timer, sleep() and this check.
  expect(timer.progress).toBeGreaterThanOrEqual(1)
  expect(timer.progress).toBeLessThanOrEqual(1.05)
  expect(completed).toBe(true)
  expect(ticks).toBe(4)
});
