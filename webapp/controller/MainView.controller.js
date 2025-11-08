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

              //  var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
              //  var sMsg = oTextBundle.getText("addButtonMsg");
              //  this.fnDisplayMsg(sMsg);
              // Instantiate the fragment

                // create dialog lazily
                if (!this.oDialog) {
                    // By using loadFragment, we are adding the fragment as a dependent to the View
                    // By doing so, we can use the functions inside the view's controller
                    this.oDialog = this.loadFragment({
                        name: "com.training.exer4baraquiel.fragments.ProductDialog"
                    });
                  
                } 
                this.oDialog.then(function(oDialog) {
                    oDialog.open();
                });
            
                
            },
            onCloseDialog: function (){
                this.getView().byId("idProductDialog").close();
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
        // onPressCheckout: function (){
        //         var oInputFNameValue = this.getView().byId("idInptFName").getValue();
        //         var oInputLNameValue = this.getView().byId("idInptLName").getValue();

        //     if (oInputFNameValue === "" && oInputLNameValue === "") {
        //          MessageBox.error(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("bothNameRequired"));
        //     } else if (oInputFNameValue === "") {
        //          MessageBox.error(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("firstNameRequired"));
        //     } else if (oInputLNameValue === "") {
        //          MessageBox.error(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("lastNameRequired"));
        //     } else {
        //          MessageToast.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("checkoutSuccess"));
        //     }



        //     },
             onPressCheckout: function (){
                var oInputFName = this.getView().byId("idInptFName");
                var oInputLName = this.getView().byId("idInptLName");
                var oInputFNameValue = oInputFName.getValue();
                var oInputLNameValue = oInputLName.getValue();
                var oRouter = this.getOwnerComponent().getRouter();

                // Check if first name and last name is blank
                if (oInputFNameValue === "" || oInputLNameValue === ""){
                   
// set value state to Error
                    oInputFName.setValueState("Error");
                    oInputLName.setValueState("Error");
                } else {
                    oInputFName.setValueState("None");
                    oInputLName.setValueState("None");

                    //Navigate to review page passing first
                    oRouter.navTo("RouteReviewPage", {
                        firstName: oInputFNameValue
                    });

                }
            },


    });
});
