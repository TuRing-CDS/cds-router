/**
 * Created by Z on 2017-05-06.
 */
import {TAG_PARAM} from './constant'
import {ParamOptions, Param} from './interface'

/**
 * 参数
 * @param p
 * @param options
 * @returns {(target:any, key:string)=>undefined}
 */
export function param(p: string, options?: ParamOptions) {
    return function (target: any, key: string) {
        let params: Map<string,Param[]> = target[TAG_PARAM] || new Map();
        let temp: Param[] = [];
        if (params.has(key)) {
            temp = params.get(key);
        }
        temp.push({
            name: p,
            options: options
        });
        params.set(key, temp);
        target[TAG_PARAM] = params;
    }
}