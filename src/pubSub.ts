import { createPubSub } from 'graphql-yoga'

export type PubSubChannels = {
    CV_EVENT: [{ cvEvent: { type: string; cv: any } }]
}

export const pubSub = createPubSub<PubSubChannels>()
