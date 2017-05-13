/**
 * Created by iZhui on 2017/5/12.
 */

import {controller, TAG_CONTROLLER} from '../lib/decorators/controller';

import {expect} from 'chai';

import {BaseController, UserController} from './init/index';

import 'mocha';


describe('Controller', () => {
    it('BaseController\'s path should be equal "/v3/api"', () => {
        expect(BaseController[TAG_CONTROLLER]).to.eq('/v3/api');
    });
    it('UserController\'s path should be equal "/v3/api/user"', () => {
        expect(UserController[TAG_CONTROLLER]).to.eq('/v3/api/user');
    });
});