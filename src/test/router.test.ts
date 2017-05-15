/**
 * Created by iZhui on 2017/5/13.
 */
import {expect} from 'chai';

import {UserController, UserSchema, BaseController} from './init/index';
import * as koa from 'koa';
import 'mocha';
import {Router} from "../lib/index";
import * as supertest from 'supertest';

describe('Router', () => {
    const router = new Router();
    router.loadDefinition(UserSchema);
    router.loadController(BaseController);
    router.loadController(UserController);
    const app = new koa();

    app.use(router.getRouter().routes());

    app.use(router.getRouter().allowedMethods());

    console.log(JSON.stringify(router.getSwagger()));

    it('GET /v3/api success', (done) => {
        supertest(app.callback())
            .get('/v3/api')
            .expect(200)
            .end((err) => {
                if (err) throw done(err);
                done();
            })
    });

    it('DELETE /v3/api success', (done) => {
        supertest(app.callback())
            .del('/v3/api')
            .expect(200)
            .end((err) => {
                if (err) throw done(err);
                done();
            })
    });

    it('POST /v3/api success', (done) => {
        supertest(app.callback())
            .post('/v3/api')
            .expect(200)
            .end((err) => {
                if (err) throw done(err);
                done();
            })
    });

    it('PUT /v3/api fail', (done) => {
        supertest(app.callback())
            .put('/v3/api')
            .expect(405)
            .end((err) => {
                if (err) throw done(err);
                done();
            })
    });

    it('GET /v3/api/user/10000?userName=cavacn&userPass=xxxgeljg', (done) => {
        supertest(app.callback())
            .get('/v3/api/user/10000?userName=cavacn&userPass=xxxgeljg')
            .expect(500)
            .expect('dagexxx')
            .end((err) => {
                if (err) throw done(err);
                done();
            })
    });

    it('GET /v3/api/user/10000?userName=cavacn2&userPass=xxxgeljg', (done) => {
        supertest(app.callback())
            .get('/v3/api/user/10000?userName=cavacn2&userPass=xxxgeljg')
            .expect(200)
            .expect({"userName":"CAVACN2","userPass":"xxxgeljg","userAge":290})
            .end((err) => {
                if (err) throw done(err);
                done();
            })
    });

});