/**
 * Created by iZhui on 2017/5/12.
 */

import {controller, TAG_CONTROLLER} from '../../lib/decorators/controller';
import {get, post, del} from "../../lib/decorators/method";
import {definition} from "../../lib/decorators/definition";
import * as joi from 'joi';
import {Schema} from "joi";
import {param, ENUM_PARAM_IN} from "../../lib/decorators/param";
import {string} from "joi";
import {tag} from "../../lib/decorators/tag";
import {summary} from "../../lib/decorators/summary";
import {response} from "../../lib/decorators/response";
import {detail} from "../../lib/decorators/detail";

@definition('User')
export class UserSchema {
    userName: Schema = joi.string().min(6).max(16).required().uppercase();
    userPass: Schema = joi.string().min(6).max(16).required();
    userAge: Schema = joi.number().greater(18).required();
    userGender: Schema = joi.string().valid(['Female', 'Male']);
    userEmail: Schema = joi.string().email();
}

@controller('/v3/api')
export class BaseController {
    @get('/')
    @post('/')
    @del('/')
    index() {

    }
}

@controller('/user')
export class UserController extends BaseController {
    @get('/')
    @post('/')
    @param('userName', {in: ENUM_PARAM_IN.query, description: '用户名', schema: string().required()})
    @param('userPass', {in: ENUM_PARAM_IN.query, description: '密码', schema: string().required()})
    @tag('User')
    @tag('Login')
    @summary("This's summary")
    @detail("This's detail")
    @response(200, UserSchema)
    @response(404)
    index() {

    }
}

