/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console */
/*mendix */
/*
    WidgetName
    ========================

    @file      : WidgetName.js
    @version   : {{version}}
    @author    : {{author}}
    @date      : {{date}}
    @copyright : {{copyright}}
    @license   : {{license}}

    Documentation
    ========================
    Describe your widget here.
*/

console.log("Hello there");
// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define('WidgetName/widget/WidgetName', [
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_TemplatedMixin',
    'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text',
     'dojo/text!WidgetName/widget/template/WidgetName.html'
], function (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text,  widgetTemplate) {
    'use strict';
    
    console.log("I'm being loaded, it's really happening!");
    return declare('WidgetName.widget.WidgetName', _WidgetBase, {

        constructor: function () {
            this._objProperty = {};

            // Mobile event emulator
            if (typeof document.ontouchstart !== 'undefined') {
                this._clickEvent = 'touchstart';
                this._mouseDownEvent = 'touchstart';
                this._mouseUpEvent = 'touchend';
                this._mouseOutEvent = 'touchend';
            } else {
                this._clickEvent = 'click';
                this._mouseDownEvent = 'mousedown';
                this._mouseUpEvent = 'mouseup';
                this._mouseOutEvent = 'mouseout';
            }
        },

        postCreate: function () {
            console.log(this.id + '.postCreate');
        },

        update: function(obj, callback) {
            if (window.cordova && window.requestFileSystem && window.FileTransfer)
                if (obj != null) {
                    domStyle.set(this.domNode, "visibility", "visible");
                    var url = window.mx.appUrl + "file?guid=" + obj.getGuid();
                    var fileName = obj.jsonData.attributes.Name.value;

                    this._downloadFile(url, fileName, function(file) {  
                        console.log("Downloaded to " + file + ", opening now");
                        SitewaertsDocumentViewer.viewDocument(file.nativeURL, "application/pdf")
                    });
                }
                else {
                    console.log("Didn't have an object to show");
                }
            else {
                console.error("Tried loading a pdf but I'm not running in a (correctly configured) cordova setup");
            }
            callback();
        },

        _downloadFile: function (url, fileName, callback) {
            console.log("Downloading file from url '" + url + "'");
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                function(fs) {
                    fs.root.getFile(fileName, {create: true, exclusive: false}, function(destinationFile) {
                        var fileTransfer = new FileTransfer();
                        var uri = encodeURI(url);
                        console.log("downloading to " + destinationFile.toURL());
                        fileTransfer.download(uri, destinationFile.toURL(), function() { callback(destinationFile); });
                    });
                }
            );
        },

    });
});
