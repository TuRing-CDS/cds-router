import {TAG_DEPRECATED} from "./constant";
import {methodRegist} from "./middleware";
/**
 * Created by Z on 2017-05-09.
 */

export function deprecated(isDeprecated: boolean = true) {
    return function (target: any, key: string) {
        methodRegist(target, key, (router) => {
            router.deprecated = isDeprecated;
        });
        target[TAG_DEPRECATED] = isDeprecated;
    }
}