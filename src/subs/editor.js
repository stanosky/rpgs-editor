let ds;
const subs = [
    (_, msg) => addEventListener("mouseup", msg.drop),
    (_, msg) => addEventListener("mousemove", e => {
        ds = document.getElementById('dialogs-stage').getBoundingClientRect();
        msg.move({ x: e.pageX - ds.left, y: e.pageY - ds.top});
    })
];

export default subs;
