import {registMethod} from "../utils/index";
/**
 * Created by iZhui on 2017/5/13.
 */

export const TAG_TAG = Symbol('Tag');

/**
 * Tag
 * @param tag
 * @returns {(target:any, key:string)=>undefined}
 */
export function tag(tag: string): MethodDecorator {
    return function (target: any, key: string) {
        let tags: Map<string,Set<string>> = target[TAG_TAG] || new Map();
        if (!tags.has(key)) {
            tags.set(key, new Set());
        }
        registMethod(target, key, (router, swagger) => {
            let tags = router.tags || [];
            if (-1 == tags.indexOf(tag)) {
                tags.push(tag) && (router.tags = tags);
            }
            if (!swagger.tags) {
                swagger.tags = [];
            }
            swagger.tags.map((x) => x.name).indexOf(tag) == -1 && swagger.tags.push({name: tag});
        });
        tags.get(key).add(tag) && (target[TAG_TAG] = tags);
    }
}
