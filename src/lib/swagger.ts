/**
 * Created by iZhui on 2017/5/13.
 */

export interface Info {
    title: string;
    description?: string;
    version: string;
    termsOfServices?: string;
    contact?: {
        email: string;
    };
    license?: {
        name: string;
        url: string;
    }
}

export interface Tag {
    name: string;
    description: string;
    externalDocs?: {
        description: string;
        url: string;
    }
}

/**
 * Swagger
 */
export class Swagger {
    swagger: string;
    info: Info;
    host?: string;
    basePath?: string;
    tags: Tag[];
    schemes: string[];
    paths: any;
    securityDefinitions?: any;
    definitions: any
    externalDocs?: any;

    constructor(info: Info) {
        this.info = info;
    }
}

export const DEFAULT_SWAGGER: Swagger = {
    swagger: "2.0",
    info: {
        title: 'CDS-Router',
        version: '1.0.0'
    },
    schemes: ['http'],
    tags: [],
    paths: {},
    definitions: {}
};