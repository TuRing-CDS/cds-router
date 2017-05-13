/**
 * Created by Z on 2017-05-13.
 */
import {
    controller,
    get,
    post,
    put,
    del,
    detail,
    summary,
    parameter,
    response,
    consume,
    produce,
    ENUM_PARAM_IN
} from '../lib';
import * as joi from 'joi';
import {Schema} from "joi";
import {definition} from "../lib/decorators/definition";


@definition('User')
export class UserSchema {
    userName: Schema = joi.string();
    userPass: Schema = joi.string();
}


@controller('/v3/api')
export class BaseController {

    @get('/')
    @parameter('userName', ENUM_PARAM_IN.body, joi.string().min(6))
    @response(200, UserSchema)
    doGet(ctx) {
        ctx.body = `doGet${new Date()}`;
    }

    @post('/')
    doPost(ctx) {
        ctx.body = `doPost${new Date()}`;
    }

    @post('/')
    doPut(ctx) {
        ctx.body = `doPut${new Date()}`;
    }

    @del('/')
    doDelete(ctx) {
        ctx.body = `doDelete${new Date()}`;
    }
}

@controller('/user')
export class UserController extends BaseController {

    @get('/')
    @parameter('userName', ENUM_PARAM_IN.query, joi.string().required())
    doGet(ctx) {
        ctx.body = `user / doGet ${new Date()}`;
    }

}
