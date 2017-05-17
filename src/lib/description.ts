/**
 * Created by Z on 2017-05-17.
 */

export const TAG_DESCRIPTION = Symbol('Description');

const DESCRIPTIONS: Map<Function,Map<string,string>> = new Map();

export function description(summary: string): MethodDecorator {
    return function (target: any, key: string) {
        if (!DESCRIPTIONS.has(target.constructor)) {
            DESCRIPTIONS.set(target.constructor, new Map());
        }
        DESCRIPTIONS.get(target.constructor).set(key, summary);
        target[TAG_DESCRIPTION] = target.constructor[TAG_DESCRIPTION] = DESCRIPTIONS.get(target.constructor);
    }
}