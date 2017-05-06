/**
 * Created by Z on 2017-05-06.
 */

import {Options} from './interface';

/**
 * Controller
 * @type {symbol}
 */
export const TAG_CONTROLLER = Symbol('Controller');

/**
 * Middleware
 * @type {symbol}
 */
export const TAG_MIDDLEWARE = Symbol('Middleware');

/**
 * Options
 * @type {symbol}
 */
export const TAG_OPTIONS = Symbol('Options');

/**
 * Schema
 * @type {symbol}
 */
export const TAG_SCHEMA = Symbol('Schema');

/**
 * Router
 * @type {symbol}
 */
export const TAG_ROUTER = Symbol('Router');

/**
 * Description
 * @type {symbol}
 */
export const TAG_DESCRIPTION = Symbol('Description');

/**
 * Param
 * @type {symbol}
 */
export const TAG_PARAM = Symbol('Param');

/**
 * Default Options
 * @type {{isExpose: boolean}}
 */
export const DEFAULT_OPTIONS: Options = {
    isExpose: true
};
