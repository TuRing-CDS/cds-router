/**
 * Created by Z on 2017-05-13.
 */
import {UserController, BaseController} from "../init";
import {expect} from 'chai'
import 'mocha'
import {TAG_CONTROLLER} from "../../lib";
import {TAG_METHOD} from "../../lib/decorators/method";
import {TAG_PARAM} from "../../lib/decorators/parameter";

const baseController = new BaseController();

describe('Parameter', () => {
    it('BaseController\'s method [ GET / ] has parameter { userName }', () => {
        expect(baseController[TAG_PARAM].get(baseController[TAG_METHOD].get('/').get('GET')).has('userName')).to.eq(true);
    });

    it('BaseController\'s method [ GET / ] check input { userName: "aaa" } will not validate', () => {
        console.log(baseController[TAG_PARAM].get(baseController[TAG_METHOD].get('/').get('GET')));
    })
});