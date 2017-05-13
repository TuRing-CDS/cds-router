/**
 * Created by iZhui on 2017/5/13.
 */

export const TAG_SUMMARY = Symbol('Summary');

/**
 * Summary
 * @param summary
 * @returns {(target:any, key:string)=>undefined}
 */
export function summary(summary: string): MethodDecorator {
    return function (target: any, key: string) {
        let summaries: Map<string,string> = target[TAG_SUMMARY] || new Map();
        summaries.set(key, summary) && (target[TAG_SUMMARY] = summaries);
    }
}