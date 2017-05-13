/**
 * Created by iZhui on 2017/5/13.
 */
import {expect} from 'chai';

import {UserController} from './init/index';

import 'mocha';
import {TAG_RESPONSE, TAG_RESPONSE_CHECK} from "../lib/response";

const userController = new UserController();

describe('Response', () => {
    it('userController\'s index Method response is not validate', () => {
        const {error, value} = userController[TAG_RESPONSE_CHECK].get('index').get(200)({});
        expect(error).to.not.eq(null);
    });

    it('userController\'s index Method response is validate', () => {
        const {error, value} = userController[TAG_RESPONSE_CHECK].get('index').get(200)({
            userName: 'aaaartr',
            userPass: 'feagegeeafe',
            userAge: 19
        });
        expect(error).to.eq(null);
    });
});