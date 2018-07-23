
var config = {
    homes: {
        preStartFn: ()=>{loadFile('navBar.html', '#adding', false);},
        file: 'homeForm.html',
        where: '#underNavBar',
        async: false,
        startFn: ()=>{homeStart()},
        failFn: ()=>{returnToAuthz()}
    },
    edit: {
        preStartFn: ()=>{loadFile('navBar.html', '#adding', false);},
        file: 'editForm.html',
        where: '#underNavBar',
        async: false,
        startFn: ()=>{getUserInfoFromLocalStorage(['login', 'email', 'userName', 'age'])},
        failFn: ()=>{returnToAuthz()}
    },
};

homeStart = ()=>{
    VT.getEl('#navBarEdit').disabled=false;
    VT.getEl('#navBarHome').disabled=true;
    presettingHomeMenu();
    populateDropdawnMenu();
};

returnToAuthz = ()=>{
    alert('You are not authorized!');
    loadFile('authorizationForm.html', '#adding', true);
};

bootWithConfig = (configSet, authorized)=>{
    if ( authorized ) {
        configSet.preStartFn();
        loadFile(configSet.file,configSet.where,configSet.async);
        configSet.startFn();
    }
    else {
        configSet.failFn()
    }
};

navigationFunc = (receivedHash, authorized)=>{
switch ( receivedHash ) {
    case '#authz':
        loadFile('authorizationForm.html', '#adding', true);
        break;
    case '#reg':
        loadFile('registrationForm.html', '#adding', true);
        break;
    case '#edit':
        bootWithConfig(config.edit, authorized);
        break;
    case '#homes':
        bootWithConfig(config.homes, authorized);
        break;
    default:
        if ( authorized ) {
            loadFile('navBar.html', '#adding', false);
            loadFile('editForm.html', '#underNavBar', false);
            getUserInfoFromLocalStorage(['login', 'email', 'userName', 'age']);
        }
        else {
            loadFile('authorizationForm.html', '#adding', true);
        }
        break;
}
};

authzCheck = ()=>{
   return VT.isDefined(JSON.parse(localStorage.getItem("loginAut")))
};

signInBtn = ()=>{
    let usersArray = extractFromLS("users");
    let searchLogin = VT.getValue('#form_loginAut');
    let searchPassword = VT.getValue('#form_passwordAut').hashCode();
    for ( let i = 0; i < usersArray.length; i++ ) {
        if ( searchLogin === usersArray[i].login ) {
            if ( searchPassword === usersArray[i].password ) {
                remBadForThis(['#form_passwordAut'],['#form_passwordErrorAut']);
                localStorage.setItem('loginAut', JSON.stringify( usersArray[i].login ));
                loadFile('navBar.html', '#adding', false);
                loadFile('editForm.html', '#underNavBar', false);
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

signUpBtn = ()=>{
    if (JSON.parse(localStorage.getItem("users")) === null) {localStorage.setItem("users", "[]")}
    let usersArray = extractFromLS("users");
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
    alert('User ' + VT.getValue('#form_login') + ' was registered!');
};

editProfilePasswordBtn = ()=>{
    let usersArray = extractFromLS("users");
    let number = inWhichUser();
    if ( VT.getValue('#form_OldPasswordEdit').hashCode() === usersArray[number].password ) {
        VT.removeClass( '#form_OldPasswordEdit', 'badS' );
        usersArray[number].password = VT.getValue('#form_NewPasswordEdit').hashCode();
        localStorage.setItem( "users", JSON.stringify(usersArray));
    }
    else {
        VT.addClass('#form_OldPasswordEdit' , 'badS')
    }
};

editProfileBtn = ()=>{
    let usersArray = extractFromLS("users");
    let interimObj = {};
    let number = inWhichUser();
    getUserInfoFromForm(interimObj, ['login', 'email', 'userName', 'age'], 'Edit');
    interimObj.gender = getRadioValue('radioGender');
    for ( let i=0; i < usersArray.length; i++ ) {
        if ( VT.getValue('#form_loginEdit') === usersArray[i].login ) {
            addBadForThis(['#form_loginEdit'],['#form_loginErrorEdit']);
            return;
        }
    }
    remBadForThis(['#form_loginEdit'],['#form_loginErrorEdit']);
    interimObj.password = usersArray[number].password;
    usersArray[number] = interimObj;
    let usersString = JSON.stringify(usersArray);
    localStorage.setItem("loginAut", JSON.stringify(VT.getValue('#form_loginEdit')));
    localStorage.setItem("users", usersString);
};

logOut = ()=>{
    cleanEl('#adding');
    localStorage.removeItem('loginAut');
    loadFile('authorizationForm.html','#adding', true);
};

extractFromLS = (item)=>{
    return JSON.parse(localStorage.getItem(item))
};

getUserInfoFromForm = (interimObj, fields, idPart) => {
    idPart = idPart || '';
    for ( let i = 0; i < fields.length; i++ ) {
        interimObj[fields[i]] = VT.getValue('#form_' + fields[i] + idPart);
    }
};

getUserInfoFromLocalStorage = ( fields )=>{
    let usersArray = extractFromLS("users");
    let number = inWhichUser();
    for ( let i = 0; i < fields.length; i++ ) {
        VT.setValue('#form_' + fields[i] + 'Edit' , usersArray[number][fields[i]] )
    }
    if ( usersArray[number].gender === 'Female' ) {
        VT.getEl('#radioFemale').checked = true;
    }
};

inWhichUser = ()=>{
    let user = JSON.parse(localStorage.getItem("loginAut"));
    let usersArray = JSON.parse(localStorage.getItem("users"));
    for ( let i = 0; i < usersArray.length; i++) {
        if ( user === usersArray[i].login ) {
            return i;
        }
    }
};