## Cds-Router

### How to use

    npm install cds-router --save
    
### Example (*TypeScript*)

    import { controller, get, param, response , definition } from 'cds-router'
    
    import * as joi from 'joi';
    
    @definition('User')
    class User{
        userName: joi.string().required().min(6).max(18);
        userPass: joi.string().required().min(8).max(18);
        userEmail: joi.string().email();
    }
    
    @controller('/v3/api')
    class BaseController{
        @get('/')
        doGet(){
            
        }
    }
    
    class UserController extends BaseController{
        @get('/:userName')
        getUserInfo(){
            return {}
        }
    }

    