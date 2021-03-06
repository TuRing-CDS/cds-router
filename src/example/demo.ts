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
import * as koa from 'koa';
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

    @get('/')
    @parameter('userId', joi.string().required(), ENUM_PARAM_IN.query)
    doGet(ctx) {
        ctx.body = Date.now();
    }

    @get('/{userId}')
    @parameter('userId', joi.number().description('userId'), ENUM_PARAM_IN.path)
    @response(200, {$ref: UserSchema})
    getUser(ctx) {
        ctx.body = {userName: ctx.params.userId.toString(), userPass: Date.now().toString()};
    }

    @post('/')
    doPost() {

    }

    @get('s')
    @response(200, {type: 'array', items: {$ref: UserSchema}})
    getUsers() {

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
    @parameter('list', array().items(string()).required(), ENUM_PARAM_IN.query)
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

// console.log(router.getRouter());
// console.log('BaseController', METHODS.get(BaseController));
// console.log('BaseController', base[TAG_METHOD]);
// console.log('BaseController', BaseController[TAG_METHOD]);
// console.log('UserController', METHODS.get(UserController));
// console.log('UserController', user[TAG_METHOD]);
// console.log('UserController', UserController[TAG_METHOD]);
// console.log('AdminController', METHODS.get(AdminController));
// console.log('AdminController', admin[TAG_METHOD]);
// console.log('AdminController', AdminController[TAG_METHOD]);

const app = new koa();

app.use(async function (ctx, next) {
    if (ctx.query && ctx.query.iou) {
        ctx['isOld'] = true;
        delete ctx.query.iou;
    }
    await next();
});

app.use(async function (ctx, next) {
    await next();
    if (ctx['isOld']) {
        ctx.body = {status: ctx.status, body: ctx.body};
        ctx.status = 200;
        return;
    }
});

app.use(router.getRouter().routes());

app.use(router.getRouter().allowedMethods());


app.listen(3002);
