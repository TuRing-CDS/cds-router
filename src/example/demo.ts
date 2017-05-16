import {controller} from "../lib/controller";
import {get, post, TAG_METHOD, del} from "../lib/method";
/**
 * Created by Z on 2017-05-16.
 */

@controller('/v3/api')
class BaseController {

    @get('/')
    index() {

    }


}

@controller('/user')
class UserController extends BaseController{

    @get('/')
    @del('/:userId')
    index() {

    }

    @post('/')
    doPost() {

    }

}

class AdminController extends UserController{

    @post('/login')
    index2(){

    }

}

const base = new BaseController();

const user = new UserController();

const admin = new AdminController();

console.log(base[TAG_METHOD]);
console.log(user[TAG_METHOD]);
console.log(admin[TAG_METHOD]);
console.log(BaseController.prototype);