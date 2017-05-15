/**
 * Created by iZhui on 2017/5/13.
 */

import {expect} from 'chai';

import {UserController} from './init/index';

import 'mocha';
import {TAG_SUMMARY} from "../lib/decorators/summary";
import {TAG_DESCRIPTION} from "../lib/decorators/description";

const userController = new UserController();

describe('Detail', () => {
    it('userController\'s index Method detail should be eq "This\'s detail"', () => {
        expect(userController[TAG_DESCRIPTION].get('index')).to.eq("This's detail");
    })
});