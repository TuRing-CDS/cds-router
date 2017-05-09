/**
 * Created by Z on 2017-05-08.
 */
import {get, controller, param, summary, CDSRouter, response} from '../lib';
import {ENUM_PARAM_IN} from "../lib/interface";
import {definition} from "../lib/definitions";
import {string} from "joi";


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

}

const router = new CDSRouter();

router.loadController(MyBase);

router.loadDefinition(User);

console.log(JSON.stringify(router.getSwagger()));