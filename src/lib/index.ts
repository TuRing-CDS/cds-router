/**
 * Created by Z on 2017-05-08.
 */

import {TAG_CONTROLLER, TAG_ROUTER, TAG_METHOD_MIDDLE, TAG_DEFINITION, TAG_MODEL_MIDDLE} from "./constant";

import * as debug from 'debug';
import {Router} from "./interface";

import * as pathToRegexp from 'path-to-regexp';

export * from './constant';
export * from './controller';
export * from './definitions';
export * from './deprecated';
export * from './interface';
export * from './method';
export * from './middleware';
export * from './param';
export * from './response';
export * from './summary';


const log = debug('cds-router');

const warn = console.warn;

export class CDSRouter {

    swagger: any = {};

    _routers: Router[] = [];

    loadController(Controller) {
        log(`load controller:`, Controller);
        if (Controller[TAG_CONTROLLER]) {
            let controller = new Controller();
            (controller[TAG_ROUTER] || []).forEach((item) => {
                item.path = `${item.method} ${Controller[TAG_CONTROLLER]}${item.path}`;
                item.regexp = pathToRegexp(item.path);
                controller[TAG_METHOD_MIDDLE] && (controller[TAG_METHOD_MIDDLE][item.key] || []).forEach((deal) => {
                    deal(item, this.swagger);
                });
                this._routers.push(item);
            });
        } else {
            warn('load controller fail:', Controller, ' is not a controller!');
        }
    }

    loadDefinition(Definition) {
        log(`load definition:`, Definition);
        if (Definition[TAG_DEFINITION]) {
            (Definition[TAG_MODEL_MIDDLE] || []).forEach((deal) => {
                deal(this.swagger);
            })
        }
    }

    routers() {
        return async function (ctx: any, next?: Function) {
            log('%s %s', ctx.method, ctx.path);
            if (next) await next
        }
    }

}