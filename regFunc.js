
//////////////////start//////////////////

signUpBtn = ()=>{
    localStorage.setItem('login', VT.getEl('#form_login').value);
    localStorage.setItem('password', VT.getEl('#form_password').value);
    localStorage.setItem('email', VT.getEl('#form_email').value);
    localStorage.setItem('age', VT.getEl('#form_age').value);
    localStorage.setItem('name', VT.getEl('#form_MyName').value);
};

passwordCheck = ()=>{
    let line1 = VT.getValue('#form_password');
    let line2 = VT.getValue('#form_confirmPassword');
    if ( line1 !== line2 ) {
        VT.addClass('#buttonSignUp', 'disabled');
        VT.getEl('#form_password').classList.remove("styleForGood"); VT.getEl('#form_password').classList.add("styleForBad");
        VT.getEl('#form_confirmPassword').classList.remove("styleForGood"); VT.getEl('#form_confirmPassword').classList.add("styleForBad");
    }
    else {
        VT.removeClass('#buttonSignUp', 'disabled');
        VT.getEl('#form_password').classList.remove("styleForBad"); VT.getEl('#form_password').classList.add("styleForGood"); setTimeout(function() {VT.getEl('#form_password').classList.remove("styleForGood")}, 3000);
        VT.getEl('#form_confirmPassword').classList.remove("styleForBad"); VT.getEl('#form_confirmPassword').classList.add("styleForGood"); setTimeout(function() {VT.getEl('#form_confirmPassword').classList.remove("styleForGood")}, 3000);
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

ff = ()=>{
    console.log(VT.getEl('#form_login').value);
    console.log(VT.getEl('#form_password').value);
    console.log(VT.getEl('#form_email').value);
    console.log(VT.getEl('#form_age').value);
    console.log(VT.getEl('#form_MyName').value);
};