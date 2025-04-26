import { EVENTS } from '../constants.js';
import { EventType } from '../constants.js';

export const publishEvent = (
    pubSub: any,
    entity: keyof typeof EVENTS,
    type: EventType,
    payload: object
) => {
    pubSub.publish(EVENTS[entity], {
        [`${entity.toLowerCase()}Event`]: {
            type,
            ...payload,
        },
    });
};
