/**
 * Created by Z on 2017-05-08.
 */

import {Schema, Response} from "./interface";
import {TAG_RESPONSE} from "./constant";
import {methodRegist} from "./middleware";

/**
 * Response
 * @param code
 * @param schema
 * @param description
 * @returns {(target:any, key:string)=>undefined}
 */
export function response(code: number, schema?: Schema, description?: string,) {
    return function (target: any, key: string) {
        let responses: Map<string,Response[]> = target[TAG_RESPONSE] || new Map();
        if (!responses.has(key)) {
            responses.set(key, []);
        }
        let tempResponse: Response[] = responses.get(key);
        tempResponse.push({
            code,
            description,
            schema
        });
        methodRegist(target, key, (router) => {
            if (!router['responses']) {
                router['responses'] = {};
            }
            router['responses'][code] = {
                description: description || '',
                schema: Schema.prototype.toJSON.call(schema)
            }
        });
        responses.set(key, tempResponse);
        target[TAG_RESPONSE] = responses;
    }
}