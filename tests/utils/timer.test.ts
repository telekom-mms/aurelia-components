import {Timer} from "../../src/utils/timer";
import {sleep, TimeComponents} from "../../src/utils/time";

test('test timer', async () => {
  let ticks = 0
  let completed = false
  const duration: TimeComponents = {ms: 10}
  const timer = new Timer({
    tick: {ms: 4},
    duration: duration,
    onTick: timer => {
      ++ticks
    },
    onComplete: timer => {
      completed = true
    }
  })

  timer.start()

  await sleep(duration)

  expect(timer.progress).toBe(1)
  expect(completed).toBe(true)
  expect(ticks).toBe(2)
});
