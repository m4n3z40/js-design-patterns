function pubSub() {
    const channels = Object.create(null);

    function createChannel(id) {
        channels[id] = {
            subscribers: [],
            messages: []
        };
    }

    function getChannel(id) {
        if (!channels[id]) {
            createChannel(id);
        }

        return channels[id];
    }

    return {
        publish(id, ...args) {
            const channel = getChannel(id);

            channel.messages.push(args);
            channel.subscribers.forEach(subscriber => subscriber(...args));
        },
        subscribe(id, subscriber) {
            const channel = getChannel(id);

            channel.subscribers.push(subscriber);
            channel.messages.forEach(args => subscriber(...args));
        },
        unsubscribe(id, subscriber) {
            if (!id) {
                return;
            }

            if (!subscriber) {
                createChannel(id);
            } else {
                channels[id].subscribers = channels[id].subscribers.filter(sub => sub !== subscriber);
            }
        }
    };
}
