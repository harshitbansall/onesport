
function EnterEventSearch() {
    if (event.key === 'Enter') {
        Search();
    }
}
function EnterEventLogin() {
    if (event.key === 'Enter') {
        Login();
    }
}
function GoToSignUp() {
    window.location.replace("/signup" + window.location.search);
}
function showLogin() {
    if (window.location.pathname === '/login') { }
    else if (window.location.pathname === '/signup') {
        window.location.replace("/login" + window.location.search);
    }
    else {
        window.location.replace("/login?next=" + window.location.pathname + window.location.search);
    }
}
function Login() {
    $("#loaderFrame").show();
    $.ajax({
        type: "POST",
        url: "/auth/login",
        data: {
            username: $("#usernameInputBox").val(),
            password: $("#passwordInputBox").val(),
        },
        error: function (object, status) {
            if (object.status === 400) {
                $("#loaderFrame").hide();
                alert("Error");
            }
        },
        success: function (result) {
            $("#loaderFrame").hide();
            alert(result);
            window.location.replace(redirect_url);
        }
    });
}
function SignUp() {
    $("#loaderFrame").show();
    $.ajax({
        type: "POST",
        url: "/auth/signup",
        data: {
            full_name: $("#firstNameField").val() + " " + $("#lastNameField").val(),
            username: $("#usernameField").val(),
            password: $("#passwordField").val(),
            email: $("#emailField").val(),
        },
        error: function (object, status) {
            if (object.status === 400) {
                $("#loaderFrame").hide();
                alert("Error");
            }
        },
        success: function (result) {
            $.ajax({
                type: "POST",
                url: "/auth/login",
                data: {
                    username: $("#usernameField").val(),
                    password: $("#passwordField").val(),
                },
                success: function (result) {
                    $("#loaderFrame").hide();
                    alert(result);
                    window.location.replace(redirect_url);
                }
            });
        }
    });

}
function Logout() {
    $.ajax({
        type: "POST",
        url: "/auth/logout",
        headers: { "Authorization": "JWT " + accessToken },
        success: function (result) {
            alert(result);
            location.reload();
        }
    });
}
function saveProfileSettings() {
    $.ajax({
        type: "PUT",
        url: "/auth/updateProfile",
        headers: { "Authorization": "JWT " + accessToken },
        data: {
            full_name: $("#fullNameSettingsInput").val(),
            username: $("#usernameSettingsInput").val(),
            email: $("#emailSettingsInput").val(),
            mobile_number: $("#mobileNumberSettingsInput").val(),
        },
        error: function (xhr, status) {
            if (xhr.status === 401) {
                alert("Login Required.");
            }
        },
        success: function (result) {
            alert(result);
            location.reload();
        }
    });
}
function saveNewPassword() {
    $.ajax({
        type: "PUT",
        url: "/auth/updatePassword",
        headers: { "Authorization": "JWT " + accessToken },
        data: {
            old_password: $("#old_passwordSettingsInput").val(),
            new_password: $("#new_passwordSettingsInput").val(),
        },
        error: function (xhr, status) {
            if (xhr.status === 401) {
                alert("Login Required.");
            }
        },
        success: function (result) {
            alert(result);
            location.reload();
        }
    });
}