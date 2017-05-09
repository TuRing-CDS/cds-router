/**
 * Created by Z on 2017-05-08.
 */

import * as pathToRegexp from 'path-to-regexp';
import {TAG_DEFINITION} from "./constant";

export declare class Router {
    method: string;
    key: string;
    path: string;
    handle: string;
    regexp?: pathToRegexp.PathRegExp
}

export enum ENUM_PARAM_IN{
    header = 1,
    body = 2,
    path = 3,
    query = 4
}

export declare class Param {
    name?: string;
    type: any;
    in: ENUM_PARAM_IN;
    opts?: any;
    description?: string;
    isRequired?: boolean;
    preFunction?: Function;
}

export class Schema {
    $ref?: any;
    type?: string;
    items?: Schema;
    toJSON?: Function;
}

Schema.prototype.toJSON = function () {
    if (this.$ref && this.$ref[TAG_DEFINITION]) {
        this.$ref = this.$ref[TAG_DEFINITION];
    }
    return Object.assign({}, this, this.items ? {items: Schema.prototype.toJSON.call(this.items)} : {}, {$ref: this.$ref ? '#/definitions/' + this.$ref : this.$ref});
};

export declare class Response {
    code: number;
    description: string;
    schema: Schema
}