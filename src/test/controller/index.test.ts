/**
 * Created by Z on 2017-05-13.
 */

import {UserController, BaseController} from "../init";
import {expect} from 'chai'
import 'mocha'
import {TAG_CONTROLLER} from "../../lib";

describe('Controller', () => {
    it('BaseController\'s path should be equal "/v3/api"', () => {
        expect(BaseController[TAG_CONTROLLER]).to.be.eq('/v3/api')
    });
    it('UserController\'s path should be equal "/v3/api/user"',()=>{
        expect(UserController[TAG_CONTROLLER]).to.be.eq('/v3/api/user')
    });
});