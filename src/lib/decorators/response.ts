import {validate} from "joi";
import * as joi from 'joi';
import {TAG_DEFINITION} from "./definition";
import {registMethod, registMiddleware} from "../utils/index";
/**
 * Created by iZhui on 2017/5/13.
 */


export const TAG_RESPONSE = Symbol('Response');

export const TAG_RESPONSE_CHECK = Symbol('Check');

export interface ISchema {
    type: string;
    $ref?: Function
    items?: ISchema;
}

export function toJSON() {
    let ref = this.$ref;
    if (ref) {
        ref = `#definitions/${this.$ref[TAG_DEFINITION]}`;
    }
    return {
        type: this.type,
        $ref: ref,
        items: this.items ? toJSON.bind(this.items)() : null
    }
}

export function toJoi() {
    let schema = null;
    if (joi[this.type]) {
        schema = joi[this.type]();
    }
    if (this.items) {
        schema = schema.items(new this.items.$ref());
    } else {
        schema = schema.keys(new this.$ref());
    }
    return schema;
}

/**
 * Response
 * @param code
 * @param response
 * @returns {(target:any, key:string)=>undefined}
 */
export function response(code: Number, response?: ISchema): MethodDecorator {
    return function (target: any, key: string) {
        const responses: Map<string,Map<Number,ISchema>> = target[TAG_RESPONSE] || new Map();
        const checks: Map<string,Map<Number,Function>> = target[TAG_RESPONSE_CHECK] || new Map();
        if (!responses.has(key)) {
            responses.set(key, new Map());
        }
        if (!checks.has(key)) {
            checks.set(key, new Map());
            registMiddleware(target, key, async(ctx, next) => {
                await next();
                const cks = target[TAG_RESPONSE_CHECK].get(key) || new Map();
                if (cks.has(ctx.status)) {
                    const {error, value} = cks.get(ctx.status)(ctx.body);
                    if (error) {
                        ctx.status = 500;
                    }
                    ctx.body = value;
                }
            });
        }
        response && registMethod(target, key, (router) => {
            let responses = router.responses || {};
            responses[code.toString()] = Object.assign({}, {schema: toJSON.bind(response)()});
            router.responses = responses;
        });
        responses.get(key).set(code, response) && ( target[TAG_RESPONSE] = responses);
        checks.get(key).set(code, (input) => {
            if (!response) {
                return {error: null, value: input};
            }
            return validate(input, toJoi.bind(response)());
        }) && (target[TAG_RESPONSE_CHECK] = checks);
    }
}