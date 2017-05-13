/**
 * Created by Z on 2017-05-13.
 */


export const TAG_REGIST = Symbol('Regist');

/**
 * Regist
 * @param target
 * @param key
 * @param deal
 */
export function regist(target: any, key: string, deal: Function) {
    let map: Map<string,Set<Function>> = target[TAG_REGIST] || new Map();
    if (!map.has(key)) {
        map.set(key, new Set());
    }
    map.get(key).add(deal) && (target[TAG_REGIST] = map);
}