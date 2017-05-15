/**
 * Created by iZhui on 2017/5/12.
 */

import {expect} from 'chai';

import {UserController} from './init/index';

import 'mocha';
import {TAG_PARAM, TAG_CHECK} from "../lib/decorators/param";

const userController = new UserController();

describe('Param', () => {
    it('UserController index.method has userName param', () => {
        expect(userController[TAG_PARAM].get('index').get('userName')).to.not.eq(null)
    });
    it('UserController index.method\'s param [userName] required', () => {
        expect(userController[TAG_CHECK].get('index')({
            query: {userPass: 'ceg'}
        }).error.message).to.eq('child "query" fails because [child "userName" fails because ["userName" is required]]')
    });
    it('UserController index.method\'s param is validate', () => {
        expect(userController[TAG_CHECK].get('index')({
            query: {
                userName: 'cavacn',
                userPass: 'gehajnjf'
            }
        }).error).to.eq(null);
    });
});