import { Application, Router } from 'express';
import { IndexController } from './controllers/index';
import { PingController } from './controllers/ping';

const _routes: Array<[string, Router]> = [
    ['/v1', IndexController],
    ['/v1/ping', PingController],
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
