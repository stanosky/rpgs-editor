'use strict';

const subscriptions = [
    (_, actions) => addEventListener("mouseup", actions.onDropHandler),
    (_, actions) => addEventListener("mousemove", e =>
        actions.onMoveHandler({ x: e.pageX, y: e.pageY}))
];

module.exports = subscriptions;
