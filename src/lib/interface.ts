/**
 * Created by Z on 2017-05-06.
 */

import * as pathToRegexp from 'path-to-regexp'

/**
 * Options
 */
export declare class Options {
    isExpose: boolean
}

/**
 * Param Options
 */
export declare class ParamOptions {
    in: Enum_PARAM_IN;
    required: Boolean;
}

/**
 * Input Param Type
 */
export enum Enum_PARAM_IN{
    QUERY = 1,
    PATH = 2,
    BODY = 3,
    HEADER = 4
}

/**
 * Param
 */
export declare class Param {
    name: string;
    options: ParamOptions;
}

/**
 * Router
 */
export declare class Router {
    method: string;
    path: string;
    key: string;
    handle: Function;
}

export declare class RouterMatch {
    path: string;
    description: string;
    match: pathToRegexp.PathRegExp;
    handle: Function;
    schema: Object;
    params: Param[];
    pathParams: string[];
    queryParams: string[];
    bodyParams: string[];
    headerParams: string[]
}