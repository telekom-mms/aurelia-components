/**
 * Creates an array with unique elements by comparator
 * @param array Input array
 * @param compare Compare function
 * @author Mike Reiche <mike@reiche.world>
 */
export function unique<T>(array:T[], compare:(a:T, b:T)=>number) {
  return array.filter((existing, index, self) => self.findIndex(item => compare(existing, item) == 0) == index);
}
