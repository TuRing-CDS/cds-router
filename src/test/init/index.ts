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
import {description} from "../../lib/decorators/description";
import {number} from "joi";

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
    index(ctx) {
        ctx.body = '';
    }
}

@controller('/user')
export class UserController extends BaseController {
    @get('/:userId')
    @post('/')
    @param('userId', {in: ENUM_PARAM_IN.path, description: '用户ID', schema: number().required()})
    @param('userName', {in: ENUM_PARAM_IN.query, description: '用户名', schema: string().required()})
    @param('userPass', {in: ENUM_PARAM_IN.query, description: '密码', schema: string().required()})
    @tag('User')
    @tag('Login')
    @summary("This's summary")
    @description("This's detail")
    @response(200, '成功', {type: 'object', $ref: UserSchema})
    @response(404, '失败')
    async index(ctx) {
        if ('cavacn' === ctx.query.userName) {
            ctx.body = 'dagexxx';
        } else {
            ctx.body = {
                userName: ctx.query.userName,
                userPass: ctx.query.userPass,
                userAge: '290'
            }
        }
    }
}

