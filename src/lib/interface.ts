/**
 * Created by Z on 2017-05-08.
 */

import * as pathToRegexp from 'path-to-regexp';
import {TAG_DEFINITION} from "./constant";
import * as joi from 'joi';

export declare class Router {
    method: string;
    key: string;
    path: string;
    handle: Function;
}

export declare class Layer {
    methods: Map<string,Function>;
    regexp: pathToRegexp.PathRegExp;
}

export enum ENUM_PARAM_IN{
    header = 1,
    body = 2,
    path = 3,
    query = 4
}

export declare class Param {
    name?: string;
    type?: joi.Schema;
    in: ENUM_PARAM_IN;
    description?: string;
    required?: boolean;
    schema?: Schema
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