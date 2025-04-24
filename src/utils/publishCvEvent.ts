import { CV_EVENT, CvEventType } from '../constants.js';

export const publishCvEvent = (pubSub: any, type: CvEventType, cv: any) => {
    pubSub.publish(CV_EVENT, { cvEvent: { type, cv } });
};
