'use strict';

const subscriptions = [
    (_, actions) => addEventListener("mouseup", actions.onDropHandler),
    (_, actions) => addEventListener("mousemove", e =>
        actions.onMoveHandler({ x: e.pageX, y: e.pageY})),
    (_, actions) => addEventListener("keydown", e => actions.onKeyDown(e)),
    (_, actions) => addEventListener("keyup", e => actions.onKeyUp(e)),
];

module.exports = subscriptions;
