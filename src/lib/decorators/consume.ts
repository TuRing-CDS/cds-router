/**
 * Created by Z on 2017-05-13.
 */

export const TAG_CONSUME = Symbol('Consume');

/**
 * Consume
 * @param consume
 * @returns {(target:any, key:string)=>undefined}
 */
export function consume(consume: string): MethodDecorator {
    return function (target: any, key: string) {
        let consumes: Map<string,Set<string>> = consume[TAG_CONSUME] || new Map();
        if (!consumes.has(key)) {
            consumes.set(key, new Set());
        }
        consumes.get(key).add(consume) && (target[TAG_CONSUME] = consumes);
    }
}