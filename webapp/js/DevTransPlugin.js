
function DevTransPlugin() {
    
    this.StartAudio = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['audio_start']);
    };
    
    this.StartBluetooth = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['bluetooth_start']);
    };
    
    this.GetKsn = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['get_ksn']);
    };
    
    this.ResetDevice = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['dev_reset']);
    };
    
    this.SetAmount = function (success, failure, amount, tips, currly) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['set_amount',amount, tips, currly]);
    };
    
    this.EmvStart = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['emv_start']);
    };
    
    this.CheckCard = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['card_check']);
    };
    
    this.SelectApp = function (success, failure, code) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['sel_app',code]);
    };
    
    this.SaleReq = function (success, failure, trantype, apprcode) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['pack_sale',trantype, apprcode]);
    };
    
    this.ClearAction = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['clear_action']);
    };
    
    this.ClearActionData = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['clear_action_result']);
    };
    
    this.ClearStage = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['clear_stage']);
    };
    
    this.ClearResponse = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['clear_response']);
    };
    
    
    this.ClearAll = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'run_action', ['clear_all']);
    };
    
    this.GetResponse = function (success, failure) {
        return cordova.exec(success, failure, 'DevTransPlugin', 'get_response', ['get_response']);
    };
}

function ResponseHelper() {
    this.Parse = function(response) {
        //  var arry = new Array(response);
        this.Act = response[0];
        this.ActData = response[1];
        this.Stage = response[2];
        this.Response = response[3];
        this.Error = response[4];
    }
}
