/* ------------- GLOBAL VARIABLES ----------------- */

var pageUrl = location.href;


/* ------------ LOGIN ---------------*/

if(localStorage.getItem('username') && pageUrl.indexOf('partials') <= -1){
    alert("you are loggin in with username"+ localStorage.getItem('username'));
    window.location = "/partials/home.html";
    loadDashboard();  
}

$(".login").on("click",function (e) {
    e.preventDefault();

    var username = $("#inputUsername").val();
    var password = $("#inputPassword").val();

    console.log(username);
    console.log(password);

    if(username == 'traceyH' && password == 'ackermans1'){
        alert("successfull login");
        localStorage.setItem('username',username);
        window.location = "/partials/home.html";
        loadDashboard();       
    } else {
        alert("your details are incorrect. Please try again!");
        $("#inputPassword").val('');
    }
});

/* ---------------- DASHBOARD -------------------- */

function loadDashboard(){
    alert("DASHBOARD!!")
}

/* --------------- LOG OUT --------------------*/

$(".signout-link").click(function(e){ e.preventDefault(); signOut(); })

function signOut(){
    alert("lets sign out")
    localStorage.removeItem('username');
    window.location = "/";
}

/* ========== COUNTRY DATA ========== */

let getCountryData = () => {
    $.ajax({
        url: "/api/world/cities",
        success: function(res){
            var allData = res.data;
            var html = "";
            for(var i=0; i <= allData.length - 1; i++){
                html += "<tr><td>"+allData[i].Name+"</td><td>"+allData[i].CountryCode+"</td>"+
                "<td>"+allData[i].District+"</td><td>"+allData[i].Population+"</td></tr>";
            }
            $(".country_data").prepend(html);
        }
    })
}

// INIT country data
getCountryData();