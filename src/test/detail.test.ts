/**
 * Created by iZhui on 2017/5/13.
 */

import {expect} from 'chai';

import {UserController} from './init/index';

import 'mocha';
import {TAG_SUMMARY} from "../lib/summary";
import {TAG_DETAIL} from "../lib/detail";

const userController = new UserController();

describe('Detail', () => {
    it('userController\'s index Method detail should be eq "This\'s detail"', () => {
        expect(userController[TAG_DETAIL].get('index')).to.eq("This's detail");
    })
});