
export default {
    s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    },

    guid() {
        return this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" +
            this.s4() + "-" + this.s4() + this.s4() + this.s4();
    },

    id() {
        return this.s4() + "-" + this.s4();
    },

    setCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        value = encodeURIComponent(value);
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    getCookie(name) {
        if (document.cookie.length > 0) {
            var c_start = document.cookie.indexOf(name + "=");
            if (c_start != -1) {
                c_start = c_start + name.length + 1;
                var c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) {
                    c_end = document.cookie.length;
                }
                return decodeURIComponent(document.cookie.substring(c_start, c_end));
            }
        }
        return null;
    },

    deleteCookie(name) {
        this.setCookie(name, '', -1);
    },

    escapeHtml(string) {
        let entityMap = {
            "%": "",
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#x2F;'
        };

        return String(string).replace(/[&<>"'\/%]/g, function (s) {
            return entityMap[s];
        });
    },
}