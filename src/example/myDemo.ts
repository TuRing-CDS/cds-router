/**
 * Created by Z on 2017-05-08.
 */
import {get, controller, param, summary, CDSRouter, response} from '../lib';
import {ENUM_PARAM_IN} from "../lib/interface";
import {definition} from "../lib/definitions";
import {string} from "joi";
import {post} from "../lib/method";


@definition()
class User {
    userName = string().min(10).max(20).default('1232432543');
    passWord = string().hostname()
}

@controller('/v3/api')
class MyBase {

    @get('/')
    @param('username', {
        type: string().default('Hello'),
        description: '用户名',
        required: true,
        in: ENUM_PARAM_IN.query
    })
    @response(200, {
        type: 'array',
        items: {
            $ref: User
        }
    })
    @summary('这个是描述')
    doGet() {

    }

    @post('/')
    @param('username', {
        schema: User,
        description: '用户名',
        required: true,
        in: ENUM_PARAM_IN.body
    })
    @summary('POST 描述')
    @response(200, {type: 'object', $ref: User})
    doPost() {

    }

}

const router = new CDSRouter({basePath: '/v3/api'});

router.loadController(MyBase);

router.loadDefinition(User);

const ctx = {
    path: '/',
    method: 'get',
    query: {},
    body: {},
    headers: {}
}

router.routers()(ctx, async function (ctx) {
    console.log('next', ctx);
}).then(console.log).catch(console.error);

console.log(JSON.stringify(router.getSwagger()))