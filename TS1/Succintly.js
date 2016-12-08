var Succintly;
(function (Succintly) {
    var Logger = (function () {
        function Logger() {
        }
        Logger.prototype.log = function (message) {
            if (typeof window.console !== 'undefined') {
                window.console.log('TypeScript generated msg: ' + message);
            }
        };
        return Logger;
    }());
    Succintly.Logger = Logger;
})(Succintly || (Succintly = {}));
//# sourceMappingURL=Succintly.js.map