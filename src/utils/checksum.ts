import {Md5} from 'ts-md5/dist/md5';
import {recursiveObjectSort} from "./object";

/**
 * Method for generating simple object checksums
 * @author Mike Reiche <mike.reiche@t-systems.com>
 * @param object
 * @param objects
 * @deprecated Use your own checksum library.
 */
export function createChecksum(object: object | [], objects: any[] = []): string {
    if (!object) {
        return ""
    }

    let sorted_object = recursiveObjectSort(object);

    return Md5.hashStr(JSON.stringify(sorted_object)) as string;
}
