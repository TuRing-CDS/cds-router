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

export interface tag {
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
    info: Info;
    host?: string;
    basePath?: string;
    tags?: tag[];
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
    info: {
        title: 'CDS-Router',
        version: '1.0.0'
    },
    schemes: ['http'],
    paths: {},
    definitions: {}
};