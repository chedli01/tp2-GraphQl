import { CV_EVENT } from '../constants.js';

export const Subscription = {
    cvEvent: {
        subscribe: (_: any, _args: any, { pubSub }: any) =>
            pubSub.subscribe(CV_EVENT),
        resolve: (payload: any) => payload.cvEvent,
    },
};