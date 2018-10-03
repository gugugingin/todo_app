var ONEPROJECT = (function() {
    // const background = document.querySelector("#background");
    // const projectArea = document.querySelector(".project_container");
    const todoArea = document.querySelector(".todo_area");

    function disableToggle(args) {
        args.forEach(el => el.disabled = !el.disabled);
    }

    function addNewInput() {
        var todo = document.createElement("li");
        todo.innerHTML = `<input type="checkbox" disabled>
                          <input type = "text" placeholder="할 일 입력">
                          <a href="#" class="close-button"></a>`;
        todoArea.appendChild(todo);
        todoArea.lastChild.querySelector("input[type=text]").focus();  
    }

    function deleteTodo(target) {
        return target.parentNode.parentNode.removeChild(target.parentNode);
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
                    deleteTodo(eTarget);
                }
                break;
        }
    }

    return (function() {
        document.querySelector("#background").addEventListener("keydown", eventHandler);
        document.querySelector("#background").addEventListener("mousedown", eventHandler);
    }());
}());