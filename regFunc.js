
//////////////////start//////////////////

signUpBtn = ()=>{
    if (JSON.parse(localStorage.getItem("users")) === null) {localStorage.setItem("users", "[]")}
    let usersArray = ExtractFromLS();
    for ( let i=0; i < usersArray.length; i++ ) {
        if ( VT.getValue('#form_login') === usersArray[i].login ) {
            addBadForThis(['#form_login'],['#form_loginErrorReg']);
            return;
        }
    }
    remBadForThis(['#form_login'],['#form_loginErrorReg']);
    let interimObj = {};
    getUserInfoFromForm(interimObj, ['login','email','userName','age','password']);
    interimObj.password = interimObj.password.hashCode();
    interimObj.gender = getRadioValue('radioGender');
    usersArray.push(interimObj);
    let usersString = JSON.stringify(usersArray);
    localStorage.setItem("users", usersString);
};

signInBtn = ()=>{
    let usersArray = ExtractFromLS();
    let searchLogin = VT.getValue('#form_loginAut');
    let searchPassword = VT.getValue('#form_passwordAut').hashCode();
    for ( let i = 0; i < usersArray.length; i++ ) {
        if ( searchLogin === usersArray[i].login ) {
            if ( searchPassword === usersArray[i].password ) {
                remBadForThis(['#form_passwordAut'],['#form_passwordErrorAut']);
                localStorage.setItem('loginAut', JSON.stringify( usersArray[i].login ));
                cleanEl('adding');
                openForm('editForm.html', false);
                getUserInfoFromLocalStorage(['login', 'email', 'userName', 'age']);
                return;
            }
            else {
                VT.addClass('#form_passwordAut', 'badS');
                VT.getEl('#form_passwordErrorAut').style.display = 'block';
                return;
            }
        }
    }
    addBadForThis(['#form_loginAut'],['#form_loginErrorAut']);
};

editProfilePasswordBtn = ()=>{
    let usersArray = ExtractFromLS();
    let number = inWhichUser();
    if ( VT.getValue('#form_OldPasswordEdit').hashCode() === usersArray[number].password ) {
        VT.removeClass( '#form_OldPasswordEdit', 'badS' );
        usersArray[number].password = VT.getValue('#form_NewPasswordEdit').hashCode();
        localStorage.setItem( "users", JSON.stringify(usersArray));
        console.log(JSON.stringify(usersArray));
    }
    else {
        VT.addClass('#form_OldPasswordEdit' , 'badS')
    }
};

editProfileBtn = ()=>{
    let usersArray = ExtractFromLS();
    let interimObj = {};
    let number = inWhichUser();
    getUserInfoFromForm(interimObj, ['login', 'email', 'userName', 'age'], 'Edit');
    interimObj.gender = getRadioValue('radioGender');
    for ( let i=0; i < usersArray.length; i++ ) {
        if ( VT.getValue('#form_login') === usersArray[i].login ) {
            addBadForThis(['#form_login'],['#form_loginErrorReg']);
            return;
        }
    }
    interimObj.password = usersArray[number].password;
    usersArray[number] = interimObj;
    let usersString = JSON.stringify(usersArray);
    localStorage.setItem("users", usersString);
};

ExtractFromLS = ()=>{
    return JSON.parse(localStorage.getItem("users"))
};

getUserInfoFromForm = (interimObj, fields, idPart) => {
    idPart = idPart || '';
    for ( let i = 0; i < fields.length; i++ ) {
        console.log(VT.getValue('#form_' + fields[i] + idPart));
        interimObj[fields[i]] = VT.getValue('#form_' + fields[i] + idPart);
    }
    return
};

getUserInfoFromLocalStorage = ( fields )=>{
    let usersArray = ExtractFromLS();
    let number = inWhichUser();
    for ( let i = 0; i < fields.length; i++ ) {
        VT.setValue('#form_' + fields[i] + 'Edit' , usersArray[number][fields[i]] )
    }
    if ( usersArray[number].gender === 'Female' ) {
        VT.getEl('#radioFemale').checked = true;
    }
};

getRadioValue = (name)=>{
    let radios = document.getElementsByName(name);
    for (let i = 0, radio; radio = radios[i]; i++) {
        if (radio.checked) return radio.value;
    }
    return null;
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

addBadForThis = (arrFields, arrErrors)=>{
    for ( let i = 0; i < arrFields.length; i++ ) {
        VT.addClass( arrFields[i], 'badS');
        VT.getEl(arrErrors[i]).style.display = 'block';
    }
};

remBadForThis = (arrFields, arrErrors)=>{
    for ( let i = 0; i < arrFields.length; i++ ) {
        VT.removeClass( arrFields[i], 'badS');
        VT.getEl(arrErrors[i]).style.display = 'none';
    }
};

openForm = (form, async)=>{
    cleanEl('adding');
    VT.send("GET", form, {}, function failureSend(code,error){
        alert(code + error)
    }, function successSend(data){
        VT.getEl('#adding').innerHTML = data;
    }, async);
};
// VT.getEl('#divOfReg').style.display = 'none';
// setTimeout(function(){VT.getEl('#divOfAut').style.display = 'block'}, 1000);

inWhichUser = ()=>{
    let user = JSON.parse(localStorage.getItem("loginAut"));
    let usersArray = JSON.parse(localStorage.getItem("users"));
    for ( let i = 0; i < usersArray.length; i++) {
        if ( user === usersArray[i].login ) {
            return i;
        }
    }
};

cleanEl = (elementID)=>{
    let div = document.getElementById(elementID);
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
};

String.prototype.hashCode = function() {
    for(var ret = 0, i = 0, len = this.length; i < len; i++) {
        ret = (31 * ret + this.charCodeAt(i)) << 0;
    }
    return ret;
};




// function send(method, url, params, ecb, scb) {
//     if (!method || !url) ecb({error: "no params"});
//     params = params ? JSON.stringify(params) : null;
//     method = method.toUpperCase();
//
//     if (method === "GET" && params)
//         if (url.indexOf('?') > -1)
//             url += "&" + obj_to_query_str(params);
//         else
//             url += '?' + obj_to_query_str(params);
//
//     var xhr = new XMLHttpRequest();
//
//
//     xhr.open(method, url, true);
//     xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
//     xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//
//
//     xhr.onreadystatechange = function () {
//         var DONE = 4; // readyState 4 means the request is done.
//         var OK = 200; // status 200 is a successful return.
//         if (xhr.readyState === DONE) {
//             if (xhr.status === OK) {
//                 return scb(fromJSON(xhr.responseText));
//             }
//             else {
//                 return ecb(xhr.status, fromJSON(xhr.responseText));
//             }
//         }
//     };
//     xhr.send(params);
// }

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