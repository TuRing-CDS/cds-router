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
import * as fs from 'fs';
import {array} from "joi";
import {string} from "joi";
import {UserSchema} from "../__test__/init/index";
import {tag} from "../lib/tag";
@controller('/v3/api')
class BaseController {

    @get('/')
    index() {

    }


}

@controller('/user')
class UserController extends BaseController {

    @del('/{userId}')
    @parameter('userId', joi.string().description('用户ID'), ENUM_PARAM_IN.path)
    index() {

    }

    @post('/')
    doPost() {

    }

}

@definition('Admin', '管理实体')
class AdminSchema {
    userName = joi.string().required().min(6).uppercase();
    userPass = joi.string();
}

@controller('/admin')
class AdminController extends UserController {

    @post('/login')
    @parameter('name', joi.string().description('名字'))
    @parameter('list', array().items(string()), ENUM_PARAM_IN.query)
    @summary('AdminController.index')
    @response(200, {$ref: AdminSchema})
    @response(202, joi.string().description('aaa'))
    @tag('Admin')
    @tag('User')
    index() {

    }

}

const router = new CDSRouter();

router.loadDefinition(UserSchema);
router.loadDefinition(AdminSchema);
router.loadController(BaseController);
router.loadController(UserController);
router.loadController(AdminController);

fs.writeFileSync('./swagger.json', JSON.stringify(router.swagger));
// console.log('BaseController', METHODS.get(BaseController));
// console.log('BaseController', base[TAG_METHOD]);
// console.log('BaseController', BaseController[TAG_METHOD]);
// console.log('UserController', METHODS.get(UserController));
// console.log('UserController', user[TAG_METHOD]);
// console.log('UserController', UserController[TAG_METHOD]);
// console.log('AdminController', METHODS.get(AdminController));
// console.log('AdminController', admin[TAG_METHOD]);
// console.log('AdminController', AdminController[TAG_METHOD]);
