const ONEPROJECT = (function() {
    // const background = document.querySelector("#background");
    // const projectArea = document.querySelector(".project_container");
    const todoArea = document.querySelector(".todo_area");
    const disableToggle = args => args.forEach(el => el.disabled = !el.disabled);
    const setAttrs = (node, attrs) => Object.keys(attrs).forEach(el => node.setAttribute(el, attrs[el]));
    const nodeAdder = (type, pr) => pr.appendChild(document.createElement(type));
    const eventAdder = node => (eType,cb) => eType.forEach(el => node.addEventListener(el, cb));

    function addNewInput() {
        let todoLi = nodeAdder("li", todoArea);
        setAttrs(nodeAdder("input", todoLi), { type: "checkbox", disabled: "true" });
        setAttrs(nodeAdder("input", todoLi), { type: "text", placeholder: "할 일 입력" });
        setAttrs(nodeAdder("a", todoLi), { href: "#", class: "close-button" });
        todoArea.lastChild.querySelector("input[type=text]").focus();
    }

    function eventHandler(e) {
        switch(e.type) {
            case "keydown":
                if (e.keyCode === 13) {
                    let activeEl = document.activeElement;
                    if (activeEl.type === "text" && activeEl.value) {
                        if (activeEl.parentNode.nextSibling === null || document.querySelectorAll("INPUT").length === 1) {
                            disableToggle(activeEl.parentNode.querySelectorAll("INPUT"));
                            addNewInput();
                        } else {
                            disableToggle([activeEl]);
                        }
                    }
                }
                break;
            case "mousedown":
                let activeEl = document.activeElement;
                if (activeEl !== e.target) {
                    if (e.target.type === "text" && e.target.value) {
                        disableToggle([e.target]);
                    }
                    if (activeEl.type === "text" && activeEl.value) {
                        disableToggle([activeEl]);
                        if (activeEl.parentNode.nextSibling === null || document.querySelectorAll("INPUT").length === 1) {
                            disableToggle(activeEl.parentNode.querySelectorAll("INPUT"));
                            addNewInput();
                        }
                    }
                }
                if ((e.target.className === "close-button") && e.target.parentNode.querySelector("input[type=text]").value) {
                    e.target.parentNode.remove();
                }
                break;
        }
    }
    return eventAdder(document.querySelector("#background"))(["keydown", "mousedown"], eventHandler);
}());