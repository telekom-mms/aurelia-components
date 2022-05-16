import {Md5} from 'ts-md5/dist/md5';
import {recursiveObjectSort} from "./object";

/**
 * Method for generating simple object checksums
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @deprecated Use your own checksum library.
 * @param object
 * @param objects
 */
export function createChecksum(object: object | [], objects: any[] = []): string {
  if (!object) {
    return ""
  }

  const sorted_object = recursiveObjectSort(object);
  return Md5.hashStr(JSON.stringify(sorted_object)) as string;
}
