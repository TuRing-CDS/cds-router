import {Swagger, DEFAULT_SWAGGER} from "./swagger";
import {TAG_CONTROLLER} from "./decorators/controller";
import {TAG_METHOD} from "./decorators/method";
import {TAG_MIDDLE_METHOD, TAG_MIDDLE_GLOBAL} from "./utils/index";
import {TAG_DEFINITION} from "./decorators/definition";
/**
 * Created by iZhui on 2017/5/13.
 */

export class Router {

    swagger: Swagger = DEFAULT_SWAGGER;

    constructor() {

    }

    loadController(Controller: any) {
        if (Controller[TAG_CONTROLLER]) {
            const controller = new Controller();
            const middleMethod = controller[TAG_MIDDLE_METHOD];
            controller[TAG_METHOD].forEach((methods, path) => {
                let temp = {};
                methods.forEach((key, method) => {
                    const router: any = {};
                    router.handle = controller[key].bind(controller);
                    if (middleMethod) {
                        middleMethod.has(key) && [...middleMethod.get(key)].forEach((deal) => {
                            deal(router, this.swagger);
                        });
                    }
                    temp[method.toLowerCase()] = router;
                });
                this.swagger.paths[path] = temp;
            })
        }
    }

    loadDefinition(Definition: any) {
        if (Definition[TAG_DEFINITION]) {
            const middleGlobal = Definition[TAG_MIDDLE_GLOBAL];
            if (middleGlobal) {
                [...middleGlobal].forEach((deal) => {
                    deal(this.swagger);
                });
            }
        }
    }

}