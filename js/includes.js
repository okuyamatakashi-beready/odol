document.addEventListener("DOMContentLoaded", function() {
    function includeHTML(callback) {
        var z, i, elmnt, file, xhr;
        var includes = [];
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            file = elmnt.getAttribute("include-html");
            if (file) {
                includes.push({element: elmnt, file: file});
            }
        }

        function processInclude(include, onComplete) {
            xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        include.element.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        include.element.innerHTML = "Page not found.";
                    }
                    include.element.removeAttribute("include-html");
                    onComplete();
                }
            }
            xhr.open("GET", include.file, true);
            xhr.send();
        }

        function processNextInclude(index) {
            if (index < includes.length) {
                processInclude(includes[index], function() {
                    processNextInclude(index + 1);
                });
            } else {
                callback();
            }
        }

        processNextInclude(0);
    }

    includeHTML(function() {
        // includeHTMLが完了した後にページ固有のスクリプトを実行
        if (typeof loadPageScript === 'function') {
            loadPageScript();
        }
    });
});
