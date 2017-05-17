/**
 * Created by Z on 2017-05-16.
 */
import {parameter, ENUM_PARAM_IN, TAG_PARAMETER} from "../lib/parameter";
import {get, post, del} from "../lib/method";
import {controller, TAG_CONTROLLER} from "../lib/controller";
import * as joi from 'joi';
import {definition} from "../lib/definition";
import {CDSRouter} from "../lib/index";
import {summary} from "../lib/summary";
import {response} from "../lib/response";
@controller('/v3/api')
class BaseController {

    @get('/')
    index() {

    }


}

@controller('/user')
class UserController extends BaseController {

    @get('/')
    @del('/:userId')
    index() {

    }

    @post('/')
    doPost() {

    }

}

@definition('Admin')
class AdminSchema {
    userName = joi.string().required().min(6).uppercase();
    userPass = joi.string();
}

@controller('/admin')
class AdminController extends UserController {

    @post('/login')
    @parameter('name', joi.string().description('名字'))
    @parameter('list', {type: 'array', items: {type: 'object', $ref: AdminSchema}}, ENUM_PARAM_IN.query)
    @summary('AdminController.index')
    @response(200, {$ref: AdminSchema})
    index() {

    }

}

const router = new CDSRouter();

router.loadController(BaseController);
router.loadController(UserController);
router.loadController(AdminController);

console.log(router.swagger.paths['/user/admin/login'].post.responses)

// console.log('BaseController', METHODS.get(BaseController));
// console.log('BaseController', base[TAG_METHOD]);
// console.log('BaseController', BaseController[TAG_METHOD]);
// console.log('UserController', METHODS.get(UserController));
// console.log('UserController', user[TAG_METHOD]);
// console.log('UserController', UserController[TAG_METHOD]);
// console.log('AdminController', METHODS.get(AdminController));
// console.log('AdminController', admin[TAG_METHOD]);
// console.log('AdminController', AdminController[TAG_METHOD]);
