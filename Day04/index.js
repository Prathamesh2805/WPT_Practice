function validateBlank(id, errLoc, errorMsg) {
  var refToTextControl = document.getElementById(id);
  var refToErrorText = document.getElementById(errLoc);
  var refToMyPara = document.getElementById("myPara");

  if (refToTextControl.value == "") {
    refToErrorText.innerText = errorMsg;
  } else {
    refToErrorText.innerText = "";
    refToMyPara.innerText =
      refToMyPara.innerText + " " + refToTextControl.value;
  }
}

// function validateName(id, errLoc, errorMsg)
