const subs = [
    (_, msg) => addEventListener("mouseup", msg.drop),
    (_, msg) => addEventListener("mousemove", e => {
        msg.move({ x: e.pageX, y: e.pageY });
    })
];

export default subs;
