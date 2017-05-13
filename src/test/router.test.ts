/**
 * Created by iZhui on 2017/5/13.
 */
import {expect} from 'chai';

import {UserController} from './init/index';

import 'mocha';
import {Router} from "../lib/index";
import {TAG_METHOD} from "../lib/decorators/method";

describe('Router', () => {
    const router = new Router();
    it('what',()=>{
        router.loadController(UserController);
    })
});