/**
 * Created by Z on 2017-05-16.
 */

import {controller} from '../../lib/controller';

import {method, get, post, del, put} from '../../lib/method';
import {parameter, ENUM_PARAM_IN} from "../../lib/parameter";
import * as joi from 'joi';
import {definition} from "../../lib/definition";
import {summary} from "../../lib/summary";
import {response} from "../../lib/response";

@definition('User', '用户实体')
export class UserSchema {
    userName = joi.string().min(6).description('用户名').required();
    userPass = joi.string().min(6).description('密码').required();
}

@controller('/v3/api')
export class BaseController {

    @get('/')
    @parameter('version', joi.string().description('版本'))
    @summary('BaseController[index]')
    @response(200)
    index() {

    }

}


@controller('/user')
export class UserController extends BaseController {
    @get('/')
    @parameter('userName', joi.string().description('用户名'))
    @response(200, {$ref: UserSchema})
    @response(201)
    doGet() {

    }

    @post('/')
    @parameter('user', {$ref: UserSchema}, ENUM_PARAM_IN.body)
    @summary('UserController[doPost]')
    @response(303)
    doPost() {

    }

    @del('/{uid}')
    @parameter('uid', joi.string().required().description('用户ID'), ENUM_PARAM_IN.path)
    doDelete() {

    }

    @put('/')
    @parameter('token', joi.string().description('token'), ENUM_PARAM_IN.header)
    doPut() {

    }
}