import {TAG_DEFINITION} from "./constant";
import {modelRegist} from "./middleware";
import * as j2s from 'joi-to-swagger';
/**
 * Created by Z on 2017-05-08.
 */

export function definition(name?: string) {
    return function (Definition) {
        if (!name) {
            name = Definition.name;
        }
        modelRegist(Definition, (swagger) => {
            const definition = new Definition();
            if (!swagger['definitions']) {
                swagger['definitions'] = {};
            }
            let properties = {};
            Object.keys(definition).forEach((key) => {
                let item = definition[key];
                properties[key] = j2s(item).swagger
            });
            swagger['definitions'][name] = {type: 'object', properties};
        });
        Definition[TAG_DEFINITION] = name;
    }
}