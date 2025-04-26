import { EVENTS } from "../constants.js";

export const Subscription = {
    cvEvent: {
        subscribe: (_: any, _args: any, { pubSub }: any) =>
            pubSub.subscribe(EVENTS.CV),
        resolve: (payload: any) => payload.cvEvent,
    }
};
