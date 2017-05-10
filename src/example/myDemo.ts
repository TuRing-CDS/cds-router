/**
 * Created by Z on 2017-05-08.
 */
import {get, controller, param,definition, summary, CDSRouter, response,ENUM_PARAM_IN,} from '../lib';
import {string} from "joi";
import {post} from "../lib/method";
import * as Application from 'koa';

const koa = new Application();


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
    async doGet(ctx) {
        let p = new Promise((resolve) => {
            setTimeout(() => {
                ctx.body = {ctx};
                resolve();
            }, 5000);
        });
        await p;
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

koa.use(router.routers());

koa.listen(3008);

// const ctx = {
//     path: '/',
//     method: 'get',
//     query: {},
//     body: {},
//     headers: {}
// }

// router.routers()(ctx, async function (ctx) {
//     console.log('next', ctx);
// }).then(console.log).catch(console.error);

// console.log(JSON.stringify(router.getSwagger()))