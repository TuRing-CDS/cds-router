/**
 * Created by iZhui on 2017/5/13.
 */

import {expect} from 'chai';

import {UserController} from './init/index';

import 'mocha';
import {TAG_SUMMARY} from "../lib/summary";

const userController = new UserController();

describe('Summary', () => {
    it('userController\'s index Method summary should be eq "This\'s summary"', () => {
        expect(userController[TAG_SUMMARY].get('index')).to.eq("This's summary");
    })
});