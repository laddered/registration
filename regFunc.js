
//////////////////start//////////////////

signUpBtn = ()=>{
    VT.getEl('#form_login');







    if (JSON.parse(localStorage.getItem("users")) === null) {localStorage.setItem("users", "[]")}
    let usersArray = JSON.parse(localStorage.getItem("users"));
    let interimObj = {};
    getUserInfoFromForm(interimObj, ['login','password','email','age','userName']);
    interimObj.password = interimObj.password.hashCode();
    usersArray.push(interimObj);
    let usersString = JSON.stringify(usersArray);
    localStorage.setItem("users", usersString);
};


String.prototype.hashCode = function() {
    for(var ret = 0, i = 0, len = this.length; i < len; i++) {
        ret = (31 * ret + this.charCodeAt(i)) << 0;
    }
    return ret;
};

getUserInfoFromForm = (interimObj, fields) => {
    for ( let i = 0; i < fields.length; i++ ) {
        interimObj[fields[i]] = VT.getValue('#form_' + fields[i]);
    }
};

passwordCheck = ()=>{
    let line1 = VT.getValue('#form_password');
    let line2 = VT.getValue('#form_confirmPassword');
    if ( line1 !== line2 ) {
        VT.getEl('#buttonSignUp').disabled = true;
        VT.removeClass('#form_password', 'goodS'); VT.addClass('#form_password', 'badS');
        VT.removeClass('#form_confirmPassword', 'goodS'); VT.addClass('#form_confirmPassword', 'badS');
    }
    else {
        VT.getEl('#buttonSignUp').disabled = false;
        VT.removeClass('#form_password', 'badS'); VT.addClass('#form_password', 'goodS'); setTimeout(function() {VT.removeClass('#form_password', 'goodS')}, 3000);
        VT.removeClass('#form_confirmPassword', 'badS'); VT.addClass('#form_confirmPassword', 'goodS'); setTimeout(function() {VT.removeClass('#form_confirmPassword', 'goodS')}, 3000);
    }
};


hideClick = ()=>{
    let c = VT.getEl('#passHide');
    if ( c.checked ) {
        VT.getEl('#form_password').type = 'text';
        VT.getEl('#form_confirmPassword').type = 'text';
    }
    else {
        VT.getEl('#form_password').type = 'password';
        VT.getEl('#form_confirmPassword').type = 'password';
    }
};

loginCheck = ()=>{

};



















f = ()=>{
};

var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

var email = document.getElementById("mail");

email.addEventListener("input", function (event) {
    if (email.validity.typeMismatch) {
        email.setCustomValidity("I expect an e-mail, darling!");
    } else {
        email.setCustomValidity("");
    }
});