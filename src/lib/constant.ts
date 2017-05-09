import {Param, ENUM_PARAM_IN} from "./interface";
import {string} from "joi";
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
    required: false,
    type: string(),
    in: ENUM_PARAM_IN.query,
    description: ''
};

export const DEFAULT_SWAGGER: any = {
    swagger: "2.0",
    info: {
        description: "CDS-ROUTER",
        title: "CDS-ROUTER",
        version: 'Beta-v2'
    },
    schemes: ['https', 'http'],
    paths: {},
    securityDefinitions: {},
    definitions: {},
};
