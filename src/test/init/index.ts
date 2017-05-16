/**
 * Created by Z on 2017-05-16.
 */

import {controller} from '../../lib/controller';

import {method, get} from '../../lib/method';

@controller('/v3/api')
export class BaseController {

    @get('/')
    index() {

    }

}

@controller('/user')
export class UserController {
    @get('/')
    doGet() {

    }
}