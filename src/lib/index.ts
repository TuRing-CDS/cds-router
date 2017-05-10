/**
 * Created by Z on 2017-05-08.
 */

import {
    TAG_CONTROLLER, TAG_ROUTER, TAG_METHOD_MIDDLE, TAG_DEFINITION, TAG_MODEL_MIDDLE,
    DEFAULT_SWAGGER
} from "./constant";

import * as debug from 'debug';
import {Router, Layer} from "./interface";

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

    constructor(swagger?: any) {
        this.swagger = Object.assign(DEFAULT_SWAGGER, swagger);
    }

    swagger: any = DEFAULT_SWAGGER;

    layers: Map<string,Layer> = new Map();

    loadController(Controller) {
        log(`load controller:`, Controller);
        if (Controller[TAG_CONTROLLER]) {
            let controller = new Controller();
            (controller[TAG_ROUTER] || []).forEach((item: Router) => {
                let path = (Controller[TAG_CONTROLLER] + item.path).replace(this.swagger.basePath, '');
                let method = item.method;
                let regexp = pathToRegexp(path);
                if (!this.layers.has(path)) {
                    this.layers.set(path, {
                        methods: new Map(),
                        regexp
                    });
                }
                this.layers.get(path).methods.set(method, item.handle);
                if (!this.swagger.paths[path]) {
                    this.swagger.paths[path] = {};
                }
                this.swagger.paths[path][method] = {};
                item.path = `${item.method} ${Controller[TAG_CONTROLLER]}${item.path}`;
                controller[TAG_METHOD_MIDDLE] && (controller[TAG_METHOD_MIDDLE][item.key] || []).forEach((deal) => {
                    deal(this.swagger.paths[path][method], this.swagger);
                });
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
        const self = this;
        return async function (ctx: any, next?: Function) {
            log('%s %s', ctx.method, ctx.path);
            let layers = [...self.layers.entries()];
            let item: any[] = null;
            while ((item = layers.shift()) != null) {
                let layer: Layer = item[1];
                if (layer.regexp.exec(ctx.path)) {
                    if (layer.methods.has(ctx.method)) {
                        await layer.methods.get(ctx.method)(ctx, next);
                        if (next) await next;
                        return ctx;
                    } else {
                        ctx.status = 405;
                        return ctx;
                    }
                }
            }
            ctx.status = 404;
            if (next) await next;
        }
    }

    getSwagger() {
        return this.swagger;
    }

}