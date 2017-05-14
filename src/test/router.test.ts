/**
 * Created by iZhui on 2017/5/13.
 */
import {expect} from 'chai';

import {UserController, UserSchema} from './init/index';
import * as koa from 'koa';
import 'mocha';
import {Router} from "../lib/index";

describe('Router', () => {
    const router = new Router();
    router.loadDefinition(UserSchema);
    router.loadController(UserController);
    const app = new koa();



});