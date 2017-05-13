import {regist} from "../utils/index";
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
        regist(target, key, (router) => {
            router.summary = summary;
        });
        summaries.set(key, summary) && (target[TAG_SUMMARY] = summaries);
    }
}