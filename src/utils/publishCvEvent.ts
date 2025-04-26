import { CV_EVENT, CvEventType } from '../constants.js';
import {GraphQLContext} from "../context.js";

export const publishCvEvent = (
    pubSub: GraphQLContext['pubSub'],
    type: CvEventType,
    cv: any
) => {
    pubSub.publish(CV_EVENT, { cvEvent: { type, cv } });
};