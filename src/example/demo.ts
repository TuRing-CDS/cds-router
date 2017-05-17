/**
 * Created by Z on 2017-05-16.
 */
import {parameter, ENUM_PARAM_IN, TAG_PARAMETER} from "../lib/parameter";
import {get, post, del} from "../lib/method";
import {controller, TAG_CONTROLLER} from "../lib/controller";
import * as joi from 'joi';
import {definition} from "../lib/definition";
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

class AdminController extends UserController {

    @post('/login')
    @parameter('name', joi.string().description('名字'))
    @parameter('list', {type: 'array', items: {type: 'object', $ref: AdminSchema}}, ENUM_PARAM_IN.query)
    index() {

    }

}

const base = new BaseController();

const user = new UserController();

const admin = new AdminController();

console.log(UserController[TAG_CONTROLLER])

console.log(AdminController[TAG_PARAMETER].get('index').get('name').schema._description)

// console.log('BaseController', METHODS.get(BaseController));
// console.log('BaseController', base[TAG_METHOD]);
// console.log('BaseController', BaseController[TAG_METHOD]);
// console.log('UserController', METHODS.get(UserController));
// console.log('UserController', user[TAG_METHOD]);
// console.log('UserController', UserController[TAG_METHOD]);
// console.log('AdminController', METHODS.get(AdminController));
// console.log('AdminController', admin[TAG_METHOD]);
// console.log('AdminController', AdminController[TAG_METHOD]);
