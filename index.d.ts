import {Schema} from "joi";
import {Param} from "./src/lib/param";
/**
 * Created by iZhui on 2017/5/12.
 */

/**
 * Controller
 * @param name
 */
export function controller(name?: string): ClassDecorator;

export function definition(name?: string, schema?: Schema): ClassDecorator;

/**
 * Param
 * @param name
 * @param schema
 */
export function param(name?: string, schema?: Schema): MethodDecorator;

/**
 * Summary
 * @param summary
 */
export function summary(summary: string): MethodDecorator;

/**
 * TAG
 * @param tag
 */
export function tag(tag: string): MethodDecorator;

/**
 * Description
 * @param description
 */
export function description(description: string): MethodDecorator;

/**
 * Consumer
 * @param contentType
 */
export function consumes(contentType: string): MethodDecorator;

/**
 * Produces
 * @param contentType
 */
export function produces(contentType: string): MethodDecorator;

/**
 * Method
 * @param method
 * @param path
 */
export function method(method?: string, path?: string): MethodDecorator;

/**
 * Get
 * @param path
 */
export function get(path?: string): MethodDecorator;

/**
 * Post
 * @param path
 */
export function post(path?: string): MethodDecorator;

/**
 * Put
 * @param path
 */
export function put(path?: string): MethodDecorator;

/**
 * Delete
 * @param path
 */
export function del(path?: string): MethodDecorator;

/**
 * SwaggerSchema
 */
export interface SwaggerSchema {
    $ref?: FunctionConstructor;
    type?: string;
    items?: SwaggerSchema
}

/**
 * Response
 */
export interface Response {
    description?: string;
    schema?: SwaggerSchema;
}

/**
 * Parameter
 * @param parameterName
 * @param schema
 */
export function parameter(parameterName: string, param?: Param): MethodDecorator;

/**
 * Response
 * @param code
 * @param response
 */
export function response(code: number, response: Response): MethodDecorator;

/**
 * Swagger
 */
export interface Swagger {
    info: {
        description: string;
        version: string;
        title: string;
        termsOfServices: string;
        contact: {
            email: string;
        };
        license: {
            name: string;
            url: string;
        }
    },
    host: string;
    basePath: string;
    tags?: [
        {
            name: string,
            description: string,
            externalDocs: {description: string;url: string}
        }
        ];

    schemes: [{string}];
    paths: any;
    securityDefinitions: any;
    definitions: any
    externalDocs: any;
}

/**
 * CDS Router
 */
export class CdsRouter {

    /**
     * Load Controller
     * @param Controller
     */
    loadController(Controller: FunctionConstructor): void;

    /**
     * Load Definition
     * @param Definition
     */
    loadDefinition(Definition: FunctionConstructor): void;

    /**
     * Get Routers
     */
    routers(): Function;

    /**
     * Swagger
     */
    getSwagger(): Swagger;

}