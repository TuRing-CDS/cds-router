/**
 * Created by Z on 2017-05-08.
 */
import {get, controller, param, summary, CDSRouter, response} from '../lib';
import {ENUM_PARAM_IN} from "../lib/interface";
import {definition} from "../lib/definitions";
import {string} from 'joi';
import {Schema} from "joi";



@definition()
class User {
    uname: Schema = string().min(10).max(20).default('1232432543');
    upass: Schema = string().hostname()
}

@controller('/v3/api')
class MyBase {

    @get('/')
    @param({
        name: 'username',
        type: String,
        description: '',
        isRequired: true,
        in: ENUM_PARAM_IN.query
    })
    @response(200, {
        type: 'array',
        items: {
            $ref: User
        }
    })
    doGet() {

    }

}

const router = new CDSRouter();

router.loadController(MyBase);

router.loadDefinition(User);

console.log(router._routers[0].responses['200']);