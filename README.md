# Cordova Android PDF Viewer

This widget allows you to view PDFs from within your cordova app on Android. Whereas IOS has support for this out of the box, Android is a little more difficult as it doesn't offer any PDF viewer out of the box. This widget depends on the Sitewaerts cordova plugin and viewer to embed a view.

Note that this widget will *only* work on Android and is not supported for any other platform.
This widget requires the following cordova plugins to be installed:
 - org.apache.cordova.file
 - org.apache.cordova.filetransfer
 - de.sitewaerts.cordova.documentviewer

## Using
You currently can't use this widget out of the box in the Mendix Cloud or Developer app, due to the cordova plugin that is required. If you want to use this widget anyway you will have to build your own cordova package and deploy that. Simply follow the steps in the cloud portal and download the sources afterwards. You should be able to find a config.xml inside the archive. 

In the plugins secion (a list of gap:plugin xml tags) you'll have to add the following:
<gap:plugin name="de.sitewaerts.cordova.documentviewer" />

Afterwards you'll be able to either build your APK/IPA locally or via adobe.

## Contributing

For more information on contributing to this repository visit [Contributing to a GitHub repository](https://world.mendix.com/display/howto50/Contributing+to+a+GitHub+repository)!
