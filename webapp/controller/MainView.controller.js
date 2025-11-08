sap.ui.define([
"sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller, MessageBox, MessageToast) => {
    "use strict";

    return Controller.extend("com.training.exer4corro.controller.MainView", {
        onInit() {
        },
        onAddItem: function (){

                var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                var sMsg = oTextBundle.getText("addButtonMsg");
                this.fnDisplayMsg(sMsg);
            },

            fnDisplayMsg: function (sMsg){
                MessageToast.show(sMsg);
            },

       onChangeMOP: function (oEvent) {
                var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");
                var oMobileLabel = this.getView().byId("idLblPhone");
                var oMobileInput = this.getView().byId("idInputPhone");
                var oCCLabel = this.getView().byId("idLblCC");
                var oCCInput = this.getView().byId("idInputCC");


                if (sSelectedKey === "GCASH"){
                    // show the mobile field
                    oMobileLabel.setVisible(true);
                    oMobileInput.setVisible(true);
                    oCCLabel.setVisible(false);
                    oCCInput.setVisible(false);

                } else if(sSelectedKey === "CC"){
                    oMobileLabel.setVisible(false);
                    oMobileInput.setVisible(false);
                    oCCLabel.setVisible(true);
                    oCCInput.setVisible(true);
                } else {
                    oMobileLabel.setVisible(false);
                    oMobileInput.setVisible(false);
                    oCCLabel.setVisible(false);
                    oCCInput.setVisible(false);
                }
                var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                var sText = oBundle.getText("selectedMOPMsg", [oBundle.getText((sSelectedKey === 'COD') ? 'cod' : 
                                                                               (sSelectedKey === 'CC') ? 'creditCard' : 
                                                                               (sSelectedKey === 'GCASH') ? 'gcash' : sSelectedKey)]);
                     MessageToast.show(sText);
            },
        onPressCheckout: function (){
                var oInputFNameValue = this.getView().byId("idInptFName").getValue();
                var oInputLNameValue = this.getView().byId("idInptLName").getValue();

            if (oInputFNameValue === "" && oInputLNameValue === "") {
                 MessageBox.error(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("bothNameRequired"));
            } else if (oInputFNameValue === "") {
                 MessageBox.error(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("firstNameRequired"));
            } else if (oInputLNameValue === "") {
                 MessageBox.error(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("lastNameRequired"));
            } else {
                 MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("checkoutSuccess"));
            }

            },

    });
});
