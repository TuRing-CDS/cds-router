/**
 * Created by iZhui on 2017/5/13.
 */
import {expect} from 'chai';

import {UserController, UserSchema} from './init/index';

import 'mocha';
import {Router} from "../lib/index";

describe('Router', () => {
    const router = new Router();
    it('what', () => {
        router.loadDefinition(UserSchema);
        router.loadController(UserController);

        console.log(router.swagger)
    })
});