/**
 * Created by iZhui on 2017/5/13.
 */

import {controller, TAG_CONTROLLER} from '../lib/controller';

import {expect} from 'chai';

import {UserController} from './init/index';

import 'mocha';
import {TAG_METHOD} from "../lib/method";
import {TAG_PARAM, TAG_CHECK} from "../lib/param";
import * as joi from 'joi';
import {validate} from "joi";
import {TAG_TAG} from "../lib/tag";

const userController = new UserController();

describe('Tag', () => {
    it('userController\'s index Method tag should be eq ["Login","User"]', () => {
        expect([...userController[TAG_TAG].get('index')]).to.deep.eq(["Login", "User"])
    })
});