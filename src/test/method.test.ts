/**
 * Created by iZhui on 2017/5/12.
 */

import {expect} from 'chai';

import {BaseController, UserController} from './init/index';

import 'mocha';
import {TAG_METHOD} from "../lib/decorators/method";

const baseController = new BaseController();

const userController = new UserController();

describe('Method', () => {
    it('BaseController methods\'s size should be 3', () => {
        expect(baseController[TAG_METHOD].get('/').size).to.eq(3);
    });
    it('BaseController methods\'s should has "get" method', () => {
        expect(baseController[TAG_METHOD].get('/').has('get')).to.eq(true);
    });
    it('Base Controller methods\'s should not has "put" method', () => {
        expect(baseController[TAG_METHOD].get('/').has('put')).to.eq(false);
    });

    it('UserController methods\'s size should be 3', () => {
        expect(userController[TAG_METHOD].get('/').size).to.eq(3);
    });
    it('UserController methods\'s should has "get" method', () => {
        expect(userController[TAG_METHOD].get('/').has('get')).to.eq(true);
    });
    it('UserController methods\'s should not has "put" method', () => {
        expect(userController[TAG_METHOD].get('/').has('put')).to.eq(false);
    });
});