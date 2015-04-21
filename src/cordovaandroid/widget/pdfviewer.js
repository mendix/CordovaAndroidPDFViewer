/* Cordova PDF viewer for Android
 * ========================
 *
 * View PDFs directly on android in cordova. This widget requires the following cordova plugins to be installed:
 *  - org.apache.cordova.file
 *  - org.apache.cordova.filetransfer
 *  - de.sitewaerts.cordova.documentviewer
 *
 *  Note that this widget will ask users to install the Cleverdox Viewer, also by Sitewaerts.
 */

define("cordovaandroid/widget/pdfviewer", [
    "mxui/widget/_WidgetBase", "mxui/widget/_Button", "dojo/_base/lang", "dojo/_base/declare"
], function ( _WidgetBase, _Button, dojoLang, declare) {
    "use strict";

    function downloadFile(url, fileName, callback) {
        console.log("Downloading file from url '" + url + "'");
        window.requestFileSystem(LocalFileSystem.TEMPORARY, 0,
            function(fs) {
                fs.root.getFile(fileName, {create: true, exclusive: false},
                    function(destinationFile) {
                        var fileTransfer = new FileTransfer();
                        var uri = encodeURI(url);
                        console.log("Downloading to " + destinationFile.toURL());
                        fileTransfer.download(uri, destinationFile.toURL(), function() { callback(destinationFile); });
                    }
                );
            }
        );
    }

    return declare("cordovaandroid.widget.pdfviewer", _WidgetBase, {

        constructor: function() {
            if (!window.cordova || !window.requestFileSystem || !window.FileTransfer) {
                throw new Error("Tried loading a pdf but I'm not running in a (correctly configured) cordova setup");
            }
        },

        postCreate: function() {
            var openButton = new _Button({
                caption: this.caption,
                onClick: dojoLang.hitch(this, "_viewPDF")
            });

            this.domNode.appendChild(openButton.domNode);
        },

        update: function(obj, callback) {
            this._obj = obj;
            if (callback) callback();
        },

        _viewPDF: function() {
            if (this._obj != null) {
                var url = window.mx.appUrl + "file?guid=" + this._obj.getGuid();
                var fileName = this._obj.get("Name");

                downloadFile(url, fileName, function(file) {
                    console.log("Downloaded to " + file.nativeURL + ", opening now");
                    SitewaertsDocumentViewer.viewDocument(file.nativeURL, "application/pdf")
                });
            } else {
                console.log("Didn't have an object to show");
            }
        }
    });
});
