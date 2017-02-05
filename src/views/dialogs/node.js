'use strict';
import { html } from 'hyperapp';

const view = (model, msg) => (html`
  <div
    onmousedown=${e => msg.drag({
        position: {
            x: e.pageX, y: e.pageY, offsetX: e.offsetX, offsetY: e.offsetY
        }
    })}
    style=${{
        userSelect: "none",
        cursor: "move",
        position: "absolute",
        padding: "10px",
        left: `${model.position.x - model.position.offsetX}px`,
        top: `${model.position.y - model.position.offsetY}px`,
        backgroundColor: model.dragging ? "gold" : "deepskyblue"
    }}
>Drag Me!
</div>
`);

export default view;
