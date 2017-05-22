/**
 * Created by Z on 2017-05-17.
 */
import {ISchema, toJoi, toSwagger} from "./ischema";
import * as joi from 'joi';
import {registMethod, registMiddleware} from "./utils/index";

export const TAG_PARAMETER = Symbol('Parameter');

const PARAMETERS: Map<Function,Map<string,Map<string,IParameter>>> = new Map();

export interface IParameter {
    in: ENUM_PARAM_IN;
    schema: joi.Schema|ISchema;
}

export enum ENUM_PARAM_IN{
    query,
    body,
    header,
    path
}

export function parameter(name: string, schema?: joi.Schema, paramIn?: ENUM_PARAM_IN): MethodDecorator {
    return function (target: any, key: string) {
        if (!paramIn) {
            paramIn = ENUM_PARAM_IN.query;
        }
        if (!PARAMETERS.has(target.constructor)) {
            PARAMETERS.set(target.constructor, new Map());
        }
        if (!PARAMETERS.get(target.constructor).has(key)) {
            PARAMETERS.get(target.constructor).set(key, new Map());
        }
        registMethod(target, key, function fnParameter(router) {
            if (!router.parameters) {
                router.parameters = [];
            }
            router.parameters.push(Object.assign({
                name,
                in: ENUM_PARAM_IN[paramIn],
                description: name
            }, {required: paramIn == ENUM_PARAM_IN.path && true}, toSwagger(schema)));
        });

        registMiddleware(target, key, async function fnParameter(ctx, next) {
            let schemas = PARAMETERS.get(target.constructor).get(key);
            let tempSchema = {params: {}, body: {}, query: {}};
            for (let [name, schema] of schemas) {
                switch (schema.in) {
                    case ENUM_PARAM_IN.query:
                        tempSchema.query[name] = schema.schema;
                        break;
                    case ENUM_PARAM_IN.path:
                        tempSchema.params[name] = schema.schema;
                        break;
                    case ENUM_PARAM_IN.body:
                        tempSchema.body[name] = schema.schema;
                }
            }
            let {error, value} = joi.validate({
                params: ctx.params,
                body: ctx.request.body,
                query: ctx.request.query
            }, tempSchema);
            if (error) {
                return ctx.throw(400, JSON.stringify({type: 'request', message: error.message}));
            }
            ctx.params = value.params;
            ctx.request.body = value.body;
            ctx.request.query = value.query;
            return await next();
        });

        PARAMETERS.get(target.constructor).get(key).set(name, {in: paramIn, schema: toJoi(schema)});
        target[TAG_PARAMETER] = target.constructor[TAG_PARAMETER] = PARAMETERS.get(target.constructor);
    }
}