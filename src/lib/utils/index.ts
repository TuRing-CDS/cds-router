/**
 * Created by iZhui on 2017/5/13.
 */

export const TAG_REGIST = Symbol('Regist');

/**
 * Regist
 * @param target
 * @param key
 * @param deal
 */
export function regist(target: any, key: string, deal: Function) {
    const temp: Map<string,Set<Function>> = target[TAG_REGIST] || new Map();
    if (!temp.has(key)) {
        temp.set(key, new Set());
    }
    temp.get(key).add(deal) && (target[TAG_REGIST] = temp);
}