
//////////////////start//////////////////

signUpBtn = ()=>{
    if (JSON.parse(localStorage.getItem("users")) === null) {localStorage.setItem("users", "[]")}
    let usersArray = JSON.parse(localStorage.getItem("users"));
    let interimObj = {};
    getUserInfoFromForm(interimObj, ['login','email','password','userName','age']);
    interimObj.password = interimObj.password.hashCode();
    usersArray.push(interimObj);
    let usersString = JSON.stringify(usersArray);
    localStorage.setItem("users", usersString);
};

getUserInfoFromForm = (interimObj, fields) => {
    for ( let i = 0; i < fields.length; i++ ) {
        interimObj[fields[i]] = VT.getValue('#form_' + fields[i]);
    }
};

String.prototype.hashCode = function() {
    for(var ret = 0, i = 0, len = this.length; i < len; i++) {
        ret = (31 * ret + this.charCodeAt(i)) << 0;
    }
    return ret;
};

passwordCheck = ( first, second, needToBloc)=>{
    let line1 = VT.getValue(first);
    let line2 = VT.getValue(second);
    if ( line1 !== line2 ) {
        VT.getEl(needToBloc).disabled = true;
        VT.removeClass(first, 'goodS'); VT.addClass(first, 'badS');
        VT.removeClass(second, 'goodS'); VT.addClass(second, 'badS');
    }
    else {
        VT.getEl(needToBloc).disabled = false;
        VT.removeClass(first, 'badS'); VT.addClass(first, 'goodS'); setTimeout(function() {VT.removeClass(first, 'goodS')}, 1000);
        VT.removeClass(second, 'badS'); VT.addClass(second, 'goodS'); setTimeout(function() {VT.removeClass(second, 'goodS')}, 1000);
    }
};

// hideClick = ()=>{
//     let c = VT.getEl('#passHide');
//     if ( c.checked ) {
//         VT.getEl('#form_password').type = 'text';
//         VT.getEl('#form_confirmPassword').type = 'text';
//     }
//     else {
//         VT.getEl('#form_password').type = 'password';
//         VT.getEl('#form_confirmPassword').type = 'password';
//     }
// };

signInBtn = ()=>{
    if (JSON.parse(localStorage.getItem("users")) === null) {localStorage.setItem("users", "[]")}
    let usersArray = JSON.parse(localStorage.getItem("users"));
    console.log(usersArray);
    let searchLogin = VT.getValue('#form_loginAut');
    let searchPassword = VT.getValue('#form_passwordAut').hashCode();
    console.log(usersArray[0].login);
    for ( let i = 0; i < usersArray.length; i++ ) {
        if ( searchLogin === usersArray[i].login ) {
            if ( searchPassword === usersArray[i].password ) {
                VT.removeClass('#form_passwordAut', 'badS');
                VT.getEl('#passwordError').style.display = 'none';
                return window.location.href = 'prifileEdit.html';
            }
            else {
                VT.addClass('#form_passwordAut', 'badS');
                VT.getEl('#passwordError').style.display = 'block';
                return;
            }
        }
    }
    VT.addClass('#form_loginAut', 'badS');
    VT.getEl('#loginError').style.display = 'block';
};


remB = ()=>{
    VT.removeClass('#form_passwordAut', 'badS');
    VT.getEl('#passwordError').style.display = 'none';
    VT.removeClass('#form_loginAut', 'badS');
    VT.getEl('#loginError').style.display = 'none';
};

openFormOfAut = ()=>{
    VT.getEl('#divOfReg').style.display = 'none';
    setTimeout(function(){VT.getEl('#divOfAut').style.display = 'block'}, 1000);
};

openFormOfReg = ()=>{
    VT.getEl('#divOfAut').style.display = 'none';
    setTimeout(function(){VT.getEl('#divOfReg').style.display = 'block'}, 1000);
};
