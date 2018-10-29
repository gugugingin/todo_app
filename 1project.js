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
    const nodeCounter = (node, pr) => pr ? pr.querySelectorAll(node).length : document.querySelectorAll(node).length;

    function addNewInput() {
        let todoLi = nodeAdder("li", wip);
        setAttrs(nodeAdder("input", todoLi), { type: "checkbox", disabled: "true" });
        setAttrs(nodeAdder("input", todoLi), { type: "text", placeholder: "할 일 입력" });
        setAttrs(nodeAdder("a", todoLi), { href: "#", class: "btn-del btn-del-wip" });
        wip.lastChild.querySelector("input[type=text]").focus();
    }

    function liMover(target) {
        let todoValue = target.nextSibling.value || target.nextSibling.innerText;
        if(target.className === "done") {
            let todoLi = nodeAdder("li", wip, document.querySelector("li"));
            setAttrs(nodeAdder("input", todoLi), { type: "checkbox" });
            setAttrs(nodeAdder("input", todoLi), { type: "text", placeholder: "할 일 입력", value: todoValue, disabled: "true" });
            setAttrs(nodeAdder("a", todoLi), { href: "#", class: "btn-del btn-del-wip" });
            if(document.querySelectorAll("ul[class=done] li").length < 2) {
                document.querySelector("ul[class=done]").remove();
            }
        } else {
            if(document.querySelectorAll("ul").length === 1) {
                nodeAdder("button", setAttrs(nodeAdder("ul", projectArea), { class: "done" }));
                setAttrs(nodeAdder("div", document.querySelector("ul[class=done]")), { class: "done" });
            }
            var completedLi = nodeAdder("li", document.querySelector("ul[class=done] div"));
            setAttrs(nodeAdder("input", completedLi), { type: "checkbox", checked: "", class: "done" });
            nodeAdder("span", completedLi).innerHTML = todoValue;
            setAttrs(nodeAdder("a", completedLi), { href: "#", class: "btn-del btn-del-done" });
        }
        target.parentNode.remove();
        let liNumber = nodeCounter("ul[class=done] li") ? `(${nodeCounter("ul[class=done] li")})` : "";
        if (document.querySelector("ul[class=done]")) document.querySelector("ul[class=done] button").innerText = `완료된 항목 ${liNumber} 보이기`;
    }

    function liRemover(target) {
        switch(target.classList[1]) {
            case "btn-del-wip":
                if (!target.parentNode.querySelector("input[type=text]").value) return;
                target.parentNode.remove();
                break;
            case "btn-del-done":
                if (nodeCounter("ul[class=done] li") === 1) document.querySelector("ul[class=done]").remove();
                target.parentNode.remove();
                let liNumber = nodeCounter("ul[class=done] li") ? `(${nodeCounter("ul[class=done] li")})` : "";
                if (document.querySelector("ul[class=done]")) document.querySelector("ul[class=done] button").innerText = `완료된 항목 ${liNumber} 보이기`;
        }
    }

    function liHideToggler() {
        event.preventDefault();
        let doneLi = document.querySelectorAll("ul[class=done] li");
        let liHeight = doneLi[0].clientHeight === 18 ? "0px" : "18px";
        doneLi.forEach(el => el.style.height = liHeight);
        let doneDiv = document.querySelector("div[class=done]");
        let displayToggle = doneDiv.style.display === "flex" ? "none" : "flex";
        doneDiv.style.display = displayToggle;
        let liNumber = nodeCounter("ul[class=done] li") ? `(${nodeCounter("ul[class=done] li")})` : "";
        let showHideMessage = doneDiv.style.display === "none" ? "보이기" : "숨기기";
        if (document.querySelector("ul[class=done]")) document.querySelector("ul[class=done] button").innerText = `완료된 항목 ${liNumber} ${showHideMessage}`;
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
                if (e.target.type === "checkbox") liMover(e.target);
                if (e.target.classList.contains("btn-del")) liRemover(e.target);
                if (e.target.nodeName === "BUTTON") { liHideToggler() };
                break;
        }
    }
    return eventAdder(document.querySelector("#background"))(["keydown", "mousedown"], eventHandler);
}());