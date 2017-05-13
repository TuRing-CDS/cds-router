/**
 * Created by Z on 2017-05-13.
 */
export const TAG_PRODUCE = Symbol('Produce');

/**
 * Produce
 * @param produce
 * @returns {(target:any, key:string)=>undefined}
 */
export function produce(produce: string): MethodDecorator {
    return function (target: any, key: string) {
        let produces: Map<string,Set<string>> = produce[TAG_PRODUCE] || new Map();
        if (!produces.has(key)) {
            produces.set(key, new Set());
        }
        produces.get(key).add(produce) && (target[TAG_PRODUCE] = produces);
    }
}