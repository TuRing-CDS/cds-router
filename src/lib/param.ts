/**
 * Created by Z on 2017-05-08.
 */

import {TAG_PARAM, TAG_METHOD_MIDDLE, DEFAULT_PARAM_OPTS} from "./constant";
import {Param, ENUM_PARAM_IN} from "./interface";
import {methodRegist} from "./middleware";
/**
 *
 * @param name
 * @returns {(target:any, key:string)}
 */
export function param(name: string, param: Param = DEFAULT_PARAM_OPTS) {
    return function (target: any, key: string) {
        param = Object.assign(param, {name});
        let params: Map<string,Param[]> = target[TAG_PARAM] || new Map();
        let tempParams: Param[] = [];
        if (params.has(key)) {
            tempParams = params.get(key);
        }
        methodRegist(target, key, (router: any) => {
            if (!router.parameters) {
                router.parameters = [];
            }
            router.parameters.push(Object.assign({}, param, {
                in: ENUM_PARAM_IN[param.in]
            }));
        });
        tempParams.push(param);
        params.set(key, tempParams);
        target[TAG_PARAM] = params;
    }
}