jQuery.sap.registerPreloadedModules({
	"name": "undefined.Component-preload",
	"version": "2.0",
	"modules": {
		"controller/BaseController.js": "sap.ui.define([\r\n\t\"sap/ui/core/mvc/Controller\",\r\n\t\"sap/ui/core/routing/History\",\r\n\t\"com/raprins/ui5/offline/model/JSONModel\"\r\n], function (Controller, History, JSONModel) {\r\n\t\"use strict\";\r\n\treturn Controller.extend(\"com.raprins.ui5.offline.controller.BaseController\", {\r\n\t\tgetRouter : function () {\r\n\t\t\treturn sap.ui.core.UIComponent.getRouterFor(this);\r\n\t\t\t\r\n\t\t},\r\n\t\t\r\n\t\t\r\n\t\tgetModel : function(){\r\n\t\t\t\r\n\t\t\tif(!this.oModel){\r\n\t\t\t\tthis.oModel = new JSONModel();\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\treturn this.oModel;\r\n\t\t\t\r\n\t\t},\r\n\t\t\r\n\t\t\r\n\t\t/**\r\n\t\t * Retour de navigation\r\n\t\t */\r\n\t\tonNavigationBack: function (oEvent) {\r\n\t\t\tvar oHistory, sPreviousHash;\r\n\t\t\toHistory = History.getInstance();\r\n\t\t\tsPreviousHash = oHistory.getPreviousHash();\r\n\t\t\tif (sPreviousHash !== undefined) {\r\n\t\t\t\twindow.history.go(-1);\r\n\t\t\t} else {\r\n\t\t\t\tthis.getRouter().navTo(\"home\", {}, true);\r\n\t\t\t}\r\n\t\t}\r\n\t});\r\n});",
		"controller/Home.controller.js": "sap.ui.define([\r\n\t\"com/raprins/ui5/offline/controller/BaseController\",\r\n\t\"sap/m/Dialog\",\r\n\t\"sap/m/MessageToast\"\r\n], function (BaseController, Dialog, MessageToast) {\r\n\t\"use strict\";\r\n\treturn BaseController.extend(\"com.raprins.ui5.offline.controller.Home\", {\r\n\t\tonInit: function () {\r\n\t\t\tthis.getModel().loadData(\"/sap/bc/rest/personnes?sap-client=100\");\r\n\t\t\tthis.oPersonModel = new sap.ui.model.json.JSONModel();\r\n\t\t\tthis.getModel().attachDataChanged(this._onDataChanged.bind(this));//attachErrorRaised\r\n\t\t\tthis.getModel().attachErrorRaised(this._onErrorRaised.bind(this));//\r\n\t\t\tthis.getView().setModel(this.getModel(),\"personnes\");\r\n\t\t\t\r\n\t\t},\r\n\t\t\r\n\t\tonAddPersonne : function(oEvent){\r\n\t\t\tthis.oPersonModel.setData({});\r\n\t\t\tvar oPersonFormDialog = this._getPersonForm();\r\n\t\t\toPersonFormDialog.setModel(this.oPersonModel,\"personForm\");\r\n\t\t\toPersonFormDialog.open();\r\n\t\t\r\n\t\t},\r\n\t\t\r\n\t\t_onErrorRaised : function(oEvent){\r\n\t\t\t\r\n\t\t\tMessageToast.show(\"Erreur de Je ne sais pas quoi\");\r\n\t\t\t\r\n\t\t\t\r\n\t\t},\r\n\t\t\r\n\t\t_onDataChanged : function(oEvent){\r\n\t\t\t\r\n\t\t\tthis._getPersonForm().setModel(null,\"personForm\");\r\n\t\t\tthis._getPersonForm().close();\r\n\t\t\t\r\n\t\t},\r\n\t\t\r\n\t\t_getPersonForm : function(){\r\n\t\t\t\r\n\t\t\tif(!this._oPersonForm){\r\n\t\t\t\tthis._oPersonForm = sap.ui.xmlfragment(\"com.raprins.ui5.offline.view.PersonForm\", this);\r\n\t\t\t\tthis.getView().addDependent(this._oPersonForm);\r\n\t\t\t}\r\n\t\t\t\r\n\t\t\treturn this._oPersonForm;\r\n\t\t},\r\n\t\t\r\n\t\tonSavePersonne : function(oEvent){\r\n\t\t\tvar oModel = oEvent.getSource().getModel(\"personForm\");\r\n\t\t\tthis.getModel().addData(oModel.getData());\r\n\t\t\t\r\n\t\t},\r\n\t\t\r\n\t\tonClosePersonForm : function(){\r\n\t\t\tthis._getPersonForm().close();\r\n\t\t}\r\n\t\t\r\n\t\r\n\t\r\n\t});\r\n});\r\n",
		"controller/PageContainer.controller.js": "sap.ui.controller(\"com.raprins.archetype.controller.PageContainer\", {\r\n\r\n\tonInit: function(){\r\n\t\t\r\n\t}\r\n\r\n});",
		"view/Home.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\"\r\n\txmlns=\"sap.m\" controllerName=\"com.raprins.ui5.offline.controller.Home\"\r\n\txmlns:html=\"http://www.w3.org/1999/xhtml\">\r\n\r\n\t<Page title=\"Hello Offline\">\r\n\t\t<content>\r\n\t\t\t<Table id=\"idPersonnesTable\" inset=\"false\" mode=\"MultiSelect\"\r\n\t\t\t\titems=\"{\r\n\t\t\t\t\tpath: 'personnes>/'\r\n\t\t\t\t}\">\r\n\t\t\t\t<headerToolbar>\r\n\t\t\t\t    <OverflowToolbar>\r\n\t\t\t\t        <ToolbarSpacer/>\r\n\t\t\t\t        <OverflowToolbarButton type=\"Transparent\" icon=\"sap-icon://add\"  press=\"onAddPersonne\"/>\r\n\t\t\t\t        <OverflowToolbarButton type=\"Transparent\" icon=\"sap-icon://edit\" press=\"onAddPersonne\"/>\r\n\t\t\t\t    </OverflowToolbar>\r\n\t\t\t\t</headerToolbar>\r\n\t\t\t\t<columns>\r\n\t\t\t\t\t<Column hAlign=\"Center\">\r\n\t\t\t\t\t\t<Text text=\"Nom\" />\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<Column minScreenWidth=\"Tablet\" demandPopin=\"true\" hAlign=\"Center\">\r\n\t\t\t\t\t\t<Text text=\"Prenom\" />\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t\t<Column minScreenWidth=\"Tablet\" demandPopin=\"true\" hAlign=\"Center\">\r\n\t\t\t\t\t\t<Text text=\"Date de Naissance\" />\r\n\t\t\t\t\t</Column>\r\n\t\t\t\t</columns>\r\n\t\t\t\t<items>\r\n\t\t\t\t\t<ColumnListItem>\r\n\t\t\t\t\t\t<cells>\r\n\t\t\t\t\t\t    \r\n\t\t\t\t\t\t\t<ObjectIdentifier title=\"{personnes>lastname}\" text=\"{personnes>id}\" />\r\n\t\t\t\t\t\t\t<Text text=\"{personnes>firstname}\" />\r\n\t\t\t\t\t\t\t<Text text=\"{personnes>birthdate}\" />\r\n\t\t\t\t\t\t</cells>\r\n\t\t\t\t\t</ColumnListItem>\r\n\t\t\t\t</items>\r\n\t\t\t</Table>\r\n\t\t</content>\r\n\t</Page>\r\n</mvc:View>",
		"view/PageContainer.view.xml": "<mvc:View xmlns:core=\"sap.ui.core\" xmlns:mvc=\"sap.ui.core.mvc\"\r\n\txmlns=\"sap.m\" \r\n\txmlns:html=\"http://www.w3.org/1999/xhtml\">\r\n\r\n\t<App id=\"mainPageContainer\">\r\n\r\n\t</App>\r\n\r\n</mvc:View>",
		"view/PersonForm.fragment.xml": "<core:FragmentDefinition \t\r\n    xmlns=\"sap.m\"\r\n\txmlns:l=\"sap.ui.layout\"\r\n\txmlns:f=\"sap.ui.layout.form\"\r\n\txmlns:core=\"sap.ui.core\">\r\n\t<Dialog showHeader=\"false\">\r\n\t\t<content>\r\n\t\t\t<VBox class=\"sapUiSmallMargin\">\r\n\t\t\t\t<f:SimpleForm editable=\"true\"\r\n\t\t\t\t\tlayout=\"ResponsiveGridLayout\" title=\"Personne\" labelSpanXL=\"3\"\r\n\t\t\t\t\tlabelSpanL=\"3\" labelSpanM=\"3\" labelSpanS=\"12\" adjustLabelSpan=\"false\"\r\n\t\t\t\t\temptySpanXL=\"4\" emptySpanL=\"4\" emptySpanM=\"4\" emptySpanS=\"0\"\r\n\t\t\t\t\tcolumnsXL=\"1\" columnsL=\"1\" columnsM=\"1\" singleContainerFullSize=\"false\">\r\n\t\t\t\t\t<f:content>\r\n\t\t\t\t\t\t<Label text=\"Prénom\" />\r\n\t\t\t\t\t\t<Input value=\"{personForm>/firstname}\" />\r\n\t\t\t\t\t\t<Label text=\"Nom\"/>\r\n\t\t\t\t\t\t<Input value=\"{personForm>/lastname}\" />\r\n\t\t\t\t\t\t<Label text=\"Date de Naissance\" />\r\n\t\t\t\t\t\t<DatePicker valueFormat=\"dd/MM/yyyy\" value=\"{personForm>/birthdate}\"/>\r\n\t\t\t\t\t</f:content>\r\n\t\t\t\t</f:SimpleForm>\r\n\t\t\t</VBox>\r\n\t\t</content>\r\n\t\t<beginButton>\r\n\t\t\t<Button icon=\"sap-icon://save\" press=\"onSavePersonne\" />\r\n\t\t</beginButton>\r\n\t\t<endButton>\r\n\t\t\t<Button icon=\"sap-icon://cancel\" press=\"onClosePersonForm\" />\r\n\t\t</endButton>\r\n\t</Dialog>\r\n</core:FragmentDefinition>",
		"Component.js": "sap.ui.define([\r\n   \"sap/ui/core/UIComponent\"\r\n], function (UIComponent) {\r\n   \"use strict\";\r\n   return UIComponent.extend(\"com.raprins.ui5.offline.Component\", {\r\n\t   \r\n\t    metadata : {\r\n           manifest: \"json\"\r\n\t   },\r\n\t   \r\n\t   init: function () {\r\n\t\t   \r\n           UIComponent.prototype.init.apply(this, arguments);\r\n           this.getRouter().initialize();\r\n       }\r\n   });\r\n});"
	}
});