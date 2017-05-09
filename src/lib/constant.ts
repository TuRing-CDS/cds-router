import {Param, ENUM_PARAM_IN} from "./interface";
/**
 * Created by Z on 2017-05-08.
 */

export const TAG_CONTROLLER = Symbol('Controller');

export const TAG_ROUTER = Symbol('Controller');

export const TAG_PARAM = Symbol('Param');

export const TAG_SUMMARY = Symbol('Summary');

export const TAG_RESPONSE = Symbol('Response');

export const TAG_DEFINITION = Symbol('Definition');

export const TAG_METHOD_MIDDLE = Symbol('MethodMiddle');

export const TAG_MODEL_MIDDLE = Symbol('ModelMiddle');

export const TAG_DEPRECATED = Symbol('deprecated');

export const DEFAULT_PARAM_OPTS: Param = {
    isRequired: false,
    type: String,
    in: ENUM_PARAM_IN.query,
    description: '',
    name: ''
};
