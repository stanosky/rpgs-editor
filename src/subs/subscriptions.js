'use strict';

const subscriptions = [
    (_, actions) => addEventListener("mouseup", actions.drop),
    (_, actions) => addEventListener("mousemove", e =>
        actions.move({ x: e.pageX - 300, y: e.pageY - 37 }))
];

module.exports = subscriptions;
