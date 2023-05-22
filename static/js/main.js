function Search() {
    window.open("/search?q=" + document.getElementById("SearchInputBox").value, "_self");
    if (accessToken !== ''){
        $.ajax({
            type: "POST",
            url: "/saveSearchHistoryItem",
            headers: { "Authorization": "JWT " + accessToken },
            data: {
                content: $("#SearchInputBox").val(),
            },
            success: function (result) {
            }
        });
    }
    
}
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
function ReturnAllRawHTMLTorrents(name, backdrop) {
    $("#loaderFrame").show();

    $.ajax({
        type: "GET",
        url: "/returnAllRawTorrents",
        headers: { "Authorization": "JWT " + accessToken },
        data: {
            name: name,
            backdrop:backdrop,
        },
        error: function (xhr, status) {
            if (xhr.status === 401) {
                $("#loaderFrame").hide();
                alert("Login Required.");
            }
        },
        success: function (result) {
            $("#loaderFrame").hide();
            document.getElementById('torrentsFrame').innerHTML = result;
            document.getElementById("torrentsFrame").scrollIntoView();
        }
    });
}

function openStreamWithMagnet(name, backdrop, magnet){
    document.getElementById('playerFrame').innerHTML = '<div style="margin-right:2rem;margin-left:2rem;margin-bottom:4rem;" id="player" class="webtor"></div>';
            window.webtor = window.webtor || [];
            window.webtor.push({
                id: 'player',
                title: name,
                header: true,
                width: '100%',
                height:'550px',
                magnet: magnet,
                on: function (e) {
                    if (e.name == window.webtor.TORRENT_FETCHED) {
                        

                    }
                    if (e.name == window.webtor.TORRENT_ERROR) {
                        alert("Error");
                    }
                },
                poster: 'http://image.tmdb.org/t/p/w500' + backdrop,
                lang: 'en',
                i18n: {
                    en: {
                        common: {
                            "prepare to play": "Preparing Video Stream... Please Wait...",
                        },
                        stat: {
                            "seeding": "Seeding",
                            "waiting": "Client initialization",
                            "waiting for peers": "Waiting for peers",
                            "from": "from",
                        },
                    },
                },
            });
            document.getElementById("playerFrame").scrollIntoView();
}
function openStream(name, backdrop) {
    $("#loaderFrame").show();
    $.ajax({
        type: "GET",
        url: "/returnMagnetLink",
        headers: { "Authorization": "JWT " + accessToken },
        data: {
            name: name,
            backdrop: backdrop,
        },
        error: function (xhr, status) {
            if (xhr.status === 401) {
                $("#loaderFrame").hide();
                alert("Login Required.");
            }

        },
        success: function (result) {
            $("#loaderFrame").hide();
            openStreamWithMagnet(name, backdrop, result);
        }
    });
}
function getMagnetLink(quality) {
    $("#loaderFrame").show();
    $.ajax({
        type: "GET",
        url: "/returnMagnetLink",
        headers: {"Authorization": "JWT "+accessToken },
        data: {
            name: "{{ movieData.title }}",
            quality: quality,
        },
        error: function(xhr, status) {
            if (xhr.status === 401){
                $("#loaderFrame").hide();
                alert("Login Required.");
            }
             
        },
        success: function (result) {
            $("#loaderFrame").hide();
            window.open(result, '_self');
        }
    });
}
function AddtoWatchlist(name, type, contentID, poster_path) {
    $.ajax({
        type: "POST",
        url: "/backendwatchlist",
        headers: { "Authorization": "JWT " + accessToken },
        data: {
            name:name,
            type:type,
            content:contentID,
            poster_path:poster_path,
        },
        error: function (object, status) {
            if (object.status === 400) {
                alert("Error");
            }
        },
        success: function (result) {
            var btn = document.getElementById('watchlistEditButton');
            btn.disabled=true;
            btn.innerHTML = result.message;
        }
    });
}
function RemovefromWatchlist(contentID) {
    $.ajax({
        type: "DELETE",
        url: "/backendwatchlist",
        headers: { "Authorization": "JWT " + accessToken },
        data: {
            content:contentID
        },
        error: function (object, status) {
            if (object.status === 400) {
                alert("Error");
            }
        },
        success: function (result) {
            var btn = document.getElementById('watchlistEditButton');
            btn.disabled=true;
            btn.innerHTML = result.message;
        }
    });
}
function ReturnRawHTMLCast(contentType, contentID){
    $.ajax({
        type: "GET",
        url: "/returnRawHTMLCast",
        data: {
            contentType:contentType,
            contentID:contentID,
        },
        error: function (xhr, status) {
            if (xhr.status === 401) {
                alert("Error.");
            }
        },
        success: function (result) {
            document.getElementById("castDIV").innerHTML = result;
            document.getElementById("castDIV").className = "scrollmenu";
        }
    });
}