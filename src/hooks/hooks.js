const hooks = {
    /*onError: e =>
        console.log("[Error] %c%s", "color: red", e),
    onAction: name =>
        console.log("[Action] %c%s", "color: blue", name),*/
    onUpdate: (last, model) => {
        //console.log("[Update] %c%s -> %c%s", "color: gray", last, "color: blue", model)
        console.log('nodes:', model.rpgs.getNodes());
    }
}

export default hooks;
