import {Swagger, DEFAULT_SWAGGER} from "./swagger";
import {TAG_CONTROLLER} from "./decorators/controller";
import {TAG_METHOD} from "./decorators/method";
import {TAG_REGIST} from "./utils/index";
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
            const regists = controller[TAG_REGIST];
            controller[TAG_METHOD].forEach((methods, path) => {
                const router = {};
                methods.forEach((key, method) => {
                    router[method] = controller[key].bind(controller);
                    if (regists) {
                        regists.has(key) && [...regists.get(key)].forEach((deal) => {
                            deal(router, this.swagger);
                        });
                    }
                });

                console.log(router);
            })
        }
    }

}