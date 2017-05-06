/**
 * Created by Z on 2017-05-06.
 */
import {Router, RouterMatch, Enum_PARAM_IN} from "./interface";
import {validate} from 'joi';
import * as pathToRegexp from 'path-to-regexp'
export * from './constant'
export * from './controller'
export * from './description'
export * from './interface'
export * from './methods'
export * from './param'
export * from './schema'

import {TAG_CONTROLLER, TAG_OPTIONS, TAG_ROUTER, TAG_DESCRIPTION, TAG_SCHEMA, TAG_PARAM} from './constant';


export class CDSRouter {

    routes: RouterMatch[] = [];

    constructor() {

    }

    /**
     * Load Controller
     * @param ControllerClass
     */
    loadController(ControllerClass) {
        if (ControllerClass instanceof Function && ControllerClass[TAG_CONTROLLER] && ControllerClass[TAG_OPTIONS].isExpose) {
            const controller = new ControllerClass();
            (controller[TAG_ROUTER] || []).forEach((router: Router) => {
                const path = `${router.method} ${ControllerClass[TAG_CONTROLLER]}${router.path}`;
                const descriptions = controller[TAG_DESCRIPTION] || new Map();
                const description = descriptions.has(router.key) ? descriptions.get(router.key) : '';
                const schemas = controller[TAG_SCHEMA] || new Map();
                const schema = schemas.has(router.key) ? schemas.get(router.key) : '';
                const params = controller[TAG_PARAM] || new Map();
                const param = params.has(router.key) ? params.get(router.key) : [];
                this.routes.push({
                    path,
                    description,
                    match: pathToRegexp(path),
                    handle: router.handle,
                    schema,
                    params: param,
                    pathParams: param.filter((x) => x.options.in === Enum_PARAM_IN.PATH).map((x) => x.name),
                    queryParams: param.filter((x) => x.options.in === Enum_PARAM_IN.QUERY).map((x) => x.name),
                    bodyParams: param.filter((x) => x.options.in === Enum_PARAM_IN.BODY).map((x) => x.name),
                    headerParams: param.filter((x) => x.options.in === Enum_PARAM_IN.HEADER).map((x) => x.name),
                });
            });
        }
        this.routes.sort((a, b) => {
            return a.path < b.path ? 1 : -1;
        });
    }

    /**
     * Invoke
     * @param method
     * @param path
     * @returns {Promise<void>}
     */
    async invoke(method: string, path: string, headers?: Object, query?: Object, body?: Object) {
        let uri = `${method} ${path}`;
        headers = headers || {};
        query = query || {};
        body = body || {};
        for (let i = 0; i < this.routes.length; i++) {
            const router = this.routes[i];
            const match = router.match.exec(uri);
            const pathParams = {};
            const headerParams = {};
            const queryParams = {};
            const bodyParams = {};
            let ctx = {status: 200, body: undefined};
            if (null == match)continue;
            router.match.keys.forEach((item, index) => {
                if (-1 != router.pathParams.indexOf(String(item.name))) {
                    pathParams[item.name] = match[index + 1];
                }
            });
            Object.keys(headers).forEach((item) => {
                if (-1 != router.headerParams.indexOf(String(item))) {
                    headerParams[item] = query[item];
                }
            });
            Object.keys(query).forEach((item) => {
                if (-1 != router.queryParams.indexOf(String(item))) {
                    queryParams[item] = query[item];
                }
            });
            Object.keys(body).forEach((item) => {
                if (-1 != router.bodyParams.indexOf(String(item))) {
                    bodyParams[item] = query[item];
                }
            });
            const result: any = await router.handle(Object.assign(ctx, {path: pathParams}, {headers: headerParams}, {body: bodyParams}, {query: queryParams}));
            if (router.schema) {
                const {error, value} = validate(result, router.schema);
                if (error) throw error;
                ctx['body'] = value;
            }
            return Object.assign({}, {status: ctx.status, body: ctx.body});
        }
        return null;
    }
}