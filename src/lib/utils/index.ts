/**
 * Created by iZhui on 2017/5/13.
 */

export const TAG_MIDDLE_METHOD = Symbol('MiddleMethod');

export const TAG_MIDDLE_GLOBAL = Symbol('MiddleGlobal');

/**
 * Regist Method
 * @param target
 * @param key
 * @param deal
 */
export function registMethod(target: any, key: string, deal: Function) {
    const temp: Map<string,Set<Function>> = target[TAG_MIDDLE_METHOD] || new Map();
    if (!temp.has(key)) {
        temp.set(key, new Set());
    }
    temp.get(key).add(deal) && (target[TAG_MIDDLE_METHOD] = temp);
}

/**
 * Regist Global
 * @param target
 * @param deal
 */
export function registGlobal(target: any, deal: Function) {
    const temp: Set<Function> = target[TAG_MIDDLE_GLOBAL] || new Set();
    temp.add(deal) && (target[TAG_MIDDLE_GLOBAL] = temp);
}