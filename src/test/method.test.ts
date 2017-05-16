/**
 * Created by Z on 2017-05-16.
 */

import { BaseController, UserController } from './init';
import {TAG_METHOD} from "../lib/method";


const baseController = new BaseController();

const userController = new UserController();

console.log(baseController[TAG_METHOD]);
console.log(baseController[TAG_METHOD]);