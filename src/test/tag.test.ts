/**
 * Created by iZhui on 2017/5/13.
 */

import {expect} from 'chai';

import {UserController} from './init/index';

import 'mocha';
import {TAG_TAG} from "../lib/tag";

const userController = new UserController();

describe('Tag', () => {
    it('userController\'s index Method tag should be eq ["Login","User"]', () => {
        expect([...userController[TAG_TAG].get('index')]).to.deep.eq(["Login", "User"])
    })
});