import {TAG_CONTROLLER} from "./controller";
import {TAG_METHOD} from "./method";
import {TAG_MIDDLE_METHOD} from "./utils/index";
/**
 * Created by Z on 2017-05-17.
 */

export interface ISWagger {
    swagger: string;
    info: {
        description?: string;
        version: string;
        title: string;
        termsOfService?: string;
        concat?: {
            email: string;
        };
        license?: {
            name: string;
            url: string;
        }
    };
    host?: string;
    basePath?: string;
    tags?: {
        name: string;
        description?: string;
        externalDocs?: {
            description: string;
            url: string;
        }
    }[];
    schemes: string[];
    paths: {};
    definitions: {};
}

export const DEFAULT_SWAGGER: ISWagger = {
    swagger: '2.0',
    info: {
        version: "1.0.0",
        title: "CDS-Router"
    },
    host: 'localhost',
    basePath: "/v3/api",
    schemes: ['http'],
    paths: {},
    definitions: {}
};

export class CDSRouter {

    swagger: ISWagger;

    constructor(swagger: ISWagger = DEFAULT_SWAGGER) {
        this.swagger = swagger;
    }

    loadController(Controller) {
        if (Controller[TAG_CONTROLLER]) {
            const allMethods = Controller[TAG_METHOD] || new Map();
            const paths = [...allMethods.keys()];
            const middleMethods = Controller[TAG_MIDDLE_METHOD] || new Map();
            paths.forEach((path) => {
                const router = {};
                const fullPath = (Controller[TAG_CONTROLLER] + path).replace(this.swagger.basePath, '');
                const methods = allMethods.get(path);

                for (let [k, v] of methods) {
                    router[k] = {};
                    (middleMethods.get(v.key) || []).forEach((deal) => {
                        deal(router[k], this.swagger);
                    });
                }
                this.swagger.paths[fullPath] = router;
            });
        }
    }

}