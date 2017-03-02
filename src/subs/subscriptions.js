'use strict';

const subscriptions = [
    (_, actions) => addEventListener("mouseup", actions.drop),
    (_, actions) => addEventListener("mousemove", e =>
        actions.move({ x: e.pageX, y: e.pageY}))
];

module.exports = subscriptions;
