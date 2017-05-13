/**
 * Created by Z on 2017-05-13.
 */

import {UserController, BaseController} from "../init";
import {expect} from 'chai'
import 'mocha'
import {TAG_CONTROLLER} from "../../lib";
import {TAG_METHOD} from "../../lib/decorators/method";

const baseController = new BaseController();

describe('Method', () => {
    it('BaseController has method [ GET / ]', () => {
        expect(baseController[TAG_METHOD].get('/').get('GET')).to.not.eq(null);
    });
    it('BaseController has method [ POST / ]', () => {
        expect(baseController[TAG_METHOD].get('/').get('POST')).to.not.eq(null);
    });
    it('BaseController has method [ PUT / ]', () => {
        expect(baseController[TAG_METHOD].get('/').get('PUT')).to.not.eq(null);
    });
    it('BaseController has method [ DELETE / ]', () => {
        expect(baseController[TAG_METHOD].get('/').get('DELETE')).to.not.eq(null);
    });
});