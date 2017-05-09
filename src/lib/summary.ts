/**
 * Created by Z on 2017-05-08.
 */
import {TAG_SUMMARY} from "./constant";
import {methodRegist} from "./middleware";
/**
 * Summary
 * @param summary
 * @returns {(target:any, key:string)=>undefined}
 */
export function summary(summary: string) {
    return function (target: any, key: string) {
        let summaries: Map<string,string> = target[TAG_SUMMARY] || new Map();
        summaries.set(key, summary);
        methodRegist(target, key, (router) => {
            router.summary = summary;
        });
        target[TAG_SUMMARY] = summaries;
    }
}