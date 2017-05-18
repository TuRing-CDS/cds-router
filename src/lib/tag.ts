/**
 * Created by Z on 2017-05-18.
 */

export const TAG_TAG = Symbol('Tag');

const TAGS: Map<Function,Map<string,Set<string>>> = new Map();

export function tag(tag: string): MethodDecorator {
    return function (target: any, key: string) {
        if (!TAGS.has(target.constructor)) {
            TAGS.set(target.constructor, new Map());
        }
        if (!TAGS.get(target.constructor).has(key)) {
            TAGS.get(target.constructor).set(key, new Set());
        }
        TAGS.get(target.constructor).get(key).add(tag);
        target[TAG_TAG] = target.constructor[TAG_TAG] = TAGS.get(target.constructor);
    }
}