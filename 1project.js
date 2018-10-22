const ONEPROJECT = (function() {
    // const background = document.querySelector("#background");
    const projectArea = document.querySelector(".project_container");
    const wip = document.querySelector(".wip");
    const disableToggle = args => args.forEach(el => el.disabled = !el.disabled);
    const setAttrs = (node, attrs) => { 
        Object.keys(attrs).forEach(el => node.setAttribute(el, attrs[el]));
        return node;
    }
    const nodeAdder = (type, pr, refNode) => {
        if (refNode) return pr.insertBefore(document.createElement(type), refNode);
        return pr.appendChild(document.createElement(type));
    }
    const eventAdder = node => (eType,cb) => eType.forEach(el => node.addEventListener(el, cb));

    function addNewInput() {
        let todoLi = nodeAdder("li", wip);
        setAttrs(nodeAdder("input", todoLi), { type: "checkbox", disabled: "true" });
        setAttrs(nodeAdder("input", todoLi), { type: "text", placeholder: "할 일 입력" });
        setAttrs(nodeAdder("a", todoLi), { href: "#", class: "btn-del" });
        wip.lastChild.querySelector("input[type=text]").focus();
    }

    function liMover(target) {
        if(target.className === "done") {
            let todoLi = nodeAdder("li", wip, document.querySelector("li"));
            setAttrs(nodeAdder("input", todoLi), { type: "checkbox" });
            setAttrs(nodeAdder("input", todoLi), { type: "text", placeholder: "할 일 입력", value: target.nextSibling.innerText, disabled: "true" });
            setAttrs(nodeAdder("a", todoLi), { href: "#", class: "btn-del" });
        } else {
            if(document.querySelectorAll("ul").length === 1) {
                nodeAdder("p", setAttrs(nodeAdder("ul", projectArea), { class: "done" })).innerHTML = "완료된 항목";
            }
            let completedLi = nodeAdder("li", document.querySelector("ul[class=done"));
            setAttrs(nodeAdder("input", completedLi), { type: "checkbox", checked: "", class: "done" });
            nodeAdder("span", completedLi).innerHTML = target.nextSibling.value;
        }
    }

    function eventHandler(e) {
        switch(e.type) {
            case "keydown":
                if (e.keyCode !== 13) return;
                var activeEl = document.activeElement;
                if (activeEl.type === "text" && activeEl.value) {
                    if (activeEl.parentNode.nextSibling === null || document.querySelectorAll("input[type=text]").length === 1) {
                        disableToggle(activeEl.parentNode.querySelectorAll("INPUT"));
                        addNewInput();
                    } else {
                        disableToggle([activeEl]);
                    }
                }
                break;
            case "mousedown":
                var activeEl = document.activeElement;
                if (activeEl === e.target) return;
                if (e.target.type === "text" && e.target.value) {
                    disableToggle([e.target]);
                }
                if (activeEl.type === "text" && activeEl.value) {
                    disableToggle([activeEl]);
                    if (activeEl.parentNode.nextSibling === null || document.querySelectorAll("input[type=text]").length === 1) {
                        disableToggle(activeEl.parentNode.querySelectorAll("INPUT"));
                        addNewInput();
                    }
                }
                if ((e.target.className === "btn-del") && e.target.parentNode.querySelector("input[type=text]").value) {
                    e.target.parentNode.remove();
                }
                if (e.target.type === "checkbox") {
                    liMover(e.target);
                    e.target.parentNode.remove();
                }
                break;
        }
    }
    return eventAdder(document.querySelector("#background"))(["keydown", "mousedown"], eventHandler);
}());