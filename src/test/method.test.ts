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
    it('BaseController methods\'s should has "GET" method', () => {
        expect(baseController[TAG_METHOD].get('/').has('GET')).to.eq(true);
    });
    it('Base Controller methods\'s should not has "PUT" method', () => {
        expect(baseController[TAG_METHOD].get('/').has('PUT')).to.eq(false);
    });

    it('UserController methods\'s size should be 3', () => {
        expect(userController[TAG_METHOD].get('/').size).to.eq(3);
    });
    it('UserController methods\'s should has "GET" method', () => {
        expect(userController[TAG_METHOD].get('/').has('GET')).to.eq(true);
    });
    it('UserController methods\'s should not has "PUT" method', () => {
        expect(userController[TAG_METHOD].get('/').has('PUT')).to.eq(false);
    });
});