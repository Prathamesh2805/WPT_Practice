function validateBlank(id, errLoc, errorMsg) {
  var refToTextControl = document.getElementById(id);
  var refToErrorText = document.getElementById(errLoc);
  var refToMyPara = document.getElementById("myPara");

  if (refToTextControl.value == "") {
    refToErrorText.innerText = errorMsg;
    return false;
  } else {
    refToErrorText.innerText = "";
      return true;
  }
}

function validateLength(id, errLoc, errorMsg){
    var val = document.getElementById(id);
    var refToErrorText = document.getElementById(errLoc);

    if(val.length < 3 || val.length > 20){
        refToErrorText.innerText = errorMsg;
        return false;
    }else{
        refToErrorText.innerText = ""
    }
    return true;
}

function vadlidateNumberLenght(id, errLoc, errorMsg){
    var refToNumber = document.getElementById(id)
    var refToErrorLoc = document.getElementById(errLoc)
    
    if(refToNumber.length != 10){
        refToErrorLoc.innerText = errorMsg
        return false;
    }else{
        refToErrorLoc.innerText = ""
        return true;
    }
}