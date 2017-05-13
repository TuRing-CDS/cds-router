/**
 * Created by iZhui on 2017/5/13.
 */

export const TAG_TAG = Symbol('Tag');

/**
 * Tag
 * @param tag
 * @returns {(target:any, key:string)=>undefined}
 */
export function tag(tag: string): MethodDecorator {
    return function (target: any, key: string) {
        let tags: Map<string,Set<string>> = target[TAG_TAG] || new Map();
        if (!tags.has(key)) {
            tags.set(key, new Set());
        }
        tags.get(key).add(tag) && (target[TAG_TAG] = tags);
    }
}
