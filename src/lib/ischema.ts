/**
 * Created by Z on 2017-05-17.
 */

import {TAG_DEFINITION_NAME, TAG_DEFINITION_DETAIL} from "./definition";

import * as joi from 'joi';

export interface ISchema {
    type?: string;
    items?: ISchema;
    $ref?: Function;
}

export function toSwagger(iSchema: ISchema) {
    let items = undefined;
    let $ref: any = iSchema.$ref;
    if (iSchema.items) {
        items = toSwagger(iSchema.items);
    }
    if ($ref && $ref[TAG_DEFINITION_NAME]) {
        $ref = '#definitions/' + $ref[TAG_DEFINITION_NAME];
    }
    return {items, type: iSchema.type, $ref}
}

export function toJoi(iSchema: ISchema): joi.Schema {
    let type = iSchema.type || 'object';
    let schema = null;
    let Ref: any = iSchema.$ref || (iSchema.items && iSchema.items.$ref);
    let ref = new Ref();
    let keys = Object.assign({}, ref);
    if (joi[type]) {
        schema = joi[type]();
    }
    if (Ref[TAG_DEFINITION_DETAIL]) {
        schema = schema.description(Ref[TAG_DEFINITION_DETAIL]);
    }
    switch (type) {
        case 'object':
            return schema.keys(keys);
        case 'array':
            return schema.items(keys);
    }
}