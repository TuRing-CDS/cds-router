/**
 * Created by iZhui on 2017/5/12.
 */

import {expect} from 'chai';

import {UserSchema} from './init/index';

import 'mocha';
import {TAG_JOI_VALIDATE} from "../lib/decorators/definition";

describe('Definition', () => {

    it('UserSchema [userName] is required', () => {
        const {error} = UserSchema[TAG_JOI_VALIDATE]({});
        expect(error.message).be.eq('child "userName" fails because ["userName" is required]');
    });

    it('UserSchema [userName]\'s length must be great than 6', () => {
        expect(UserSchema[TAG_JOI_VALIDATE]({userName: 'iamee'}).error.message).be.eq('child "userName" fails because ["userName" length must be at least 6 characters long]');
    });

    it('UserSchema [userName]\'s length must be less than 17', () => {
        expect(UserSchema[TAG_JOI_VALIDATE]({userName: 'iamee45kjhuytghjk'}).error.message).be.eq('child "userName" fails because ["userName" length must be less than or equal to 16 characters long]');
    });

    it('UserSchema [userPass] is required', () => {
        const {error} = UserSchema[TAG_JOI_VALIDATE]({userName: 'cavacn'});
        expect(error.message).be.eq('child "userPass" fails because ["userPass" is required]');
    });

    it('UserSchema [userAge] is required', () => {
        const {error} = UserSchema[TAG_JOI_VALIDATE]({userName: 'cavacn', userPass: 'password'});
        expect(error.message).be.eq('child "userAge" fails because ["userAge" is required]');
    });

    it('UserSchema [userAge] must be great than 18', () => {
        const {error} = UserSchema[TAG_JOI_VALIDATE]({userName: 'cavacn', userPass: 'password', userAge: 16});
        expect(error.message).be.eq('child "userAge" fails because ["userAge" must be greater than 18]');
    });

    it('UserSchema [userGender] must in ["Male","Female"]', () => {
        const {error, value} = UserSchema[TAG_JOI_VALIDATE]({
            userName: 'cavacn',
            userPass: 'password',
            userAge: 19,
            userGender: 'boy'
        });
        expect(error.message).be.eq('child "userGender" fails because ["userGender" must be one of [Female, Male]]');
    });

    it('UserSchema [userEmail] must be a email', () => {
        const {error, value} = UserSchema[TAG_JOI_VALIDATE]({
            userName: 'cavacn',
            userPass: 'password',
            userAge: 19,
            userGender: 'Male',
            userEmail: 'xxxx'
        });
        expect(error.message).be.eq('child "userEmail" fails because ["userEmail" must be a valid email]');
    });

    it('UserSchema validate success!', () => {
        const {error, value} = UserSchema[TAG_JOI_VALIDATE]({
            userName: 'cavacn',
            userPass: 'password',
            userAge: 19,
            userGender: 'Male',
            userEmail: '862333853@qq.com'
        });
        expect(error).be.eq(null);
    });

    it('UserSchema validate success! And the userName will be toUpperCase', () => {
        const {error, value} = UserSchema[TAG_JOI_VALIDATE]({
            userName: 'cavacn',
            userPass: 'password',
            userAge: 19,
            userGender: 'Male',
            userEmail: '862333853@qq.com'
        });
        expect(error).be.eq(null);
        expect(value.userName).be.eq('CAVACN');
    });
});