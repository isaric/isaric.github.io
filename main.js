function includeHTML() {
    let z, i, element, file, request, path;
    z = document.querySelectorAll("div,[include-template]");
    for (i = 0; i < z.length; i++) {
        element = z[i];
        file = element.getAttribute("include-template");
        if (file) {
            path = "/templates/" + file + ".html";
            request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        element.innerHTML = this.responseText;
                    }
                    if (this.status === 404) {
                        throw new DOMException("Template file not found")
                    }
                    element.outerHTML = element.innerHTML;
                    element.innerHTML = null;
                    includeHTML();
                }
            }
            request.open("GET", path, true);
            request.send();
            return;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    includeHTML();
});
