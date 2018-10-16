const ONEPROJECT = (function() {
    // const background = document.querySelector("#background");
    // const projectArea = document.querySelector(".project_container");
    const todoArea = document.querySelector(".todo_area");
    const disableToggle = args => args.forEach(el => el.disabled = !el.disabled);
    const setAttrs = (node, attrs) => Object.keys(attrs).forEach(el => node.setAttribute(el, attrs[el]));
    const nodeAdder = (type, pr) => pr.appendChild(document.createElement(type));

    function addNewInput() {
        let todoLi = nodeAdder("li", todoArea);
        setAttrs(nodeAdder("input", todoLi), { type: "checkbox", disabled: "true" });
        setAttrs(nodeAdder("input", todoLi), { type: "text", placeholder: "할 일 입력" });
        setAttrs(nodeAdder("a", todoLi), { href: "#", class: "close-button" });
        todoArea.lastChild.querySelector("input[type=text]").focus();
    }

    function eventHandler(event) {
        switch(event.type) {
            case "keydown":
                var activeEl = document.activeElement;
                if (activeEl.type === "text") {
                    if (event.keyCode === 13 && activeEl.value.length) {
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
                var activeEl = document.activeElement;
                var eTarget = event.target;
                if (eTarget.type === "text" && eTarget.value && activeEl !== eTarget) {
                    disableToggle([eTarget]);
                }
                if (activeEl.type === "text" && activeEl.value && activeEl !== eTarget) {
                    disableToggle([activeEl]);
                    if (activeEl.parentNode.nextSibling === null || document.querySelectorAll("INPUT").length === 1) {
                        disableToggle(activeEl.parentNode.querySelectorAll("INPUT"));
                        addNewInput();
                    }
                }
                if ((eTarget.className === "close-button") && eTarget.parentNode.querySelector("input[type=text]").value.length) {
                    eTarget.parentNode.remove();
                }
                break;
        }
    }

    return (function() {
        document.querySelector("#background").addEventListener("keydown", eventHandler);
        document.querySelector("#background").addEventListener("mousedown", eventHandler);
    }());
}());