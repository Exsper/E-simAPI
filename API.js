
//TEST
function TEST()
{
    function log(t)
    {
        console.log(t);
    }
    API_apiCountries(log);
}


////////////////////////////////////////////////////////////////////////////////////////////////
//e-sim API
//Soucre: https://esim.wikia.com/wiki/API
////////////////////////////////////////////////////////////////////////////////////////////////

//Template
function API_getAPI(url, callback, notRetry)
{
    $.ajax({
        url: url,
        success: function(data) {
            console.log(url, "success");
            var info = JSON.parse(data);
            if (typeof(callback) === 'function') callback(info);
            else console.log(callback, "is not a function");
            return;
        },
        error: function(xhr,textStatus){
            if (notRetry == true)
            {
                console.log(url, "error: (", textStatus, ")");
                return;
            }
            else
            {
                console.log(url, "error: (", textStatus, "), try again");
                $.ajax(this);
            }
        },
    });
}

//apiCountries.html
function API_apiCountries(callback, notRetry)
{
    return API_getAPI("apiCountries.html", callback, notRetry);
}

//apiRegions.html
function API_apiRegions(callback, notRetry)
{
    return API_getAPI("apiRegions.html", callback, notRetry);
}

//apiMap.html
function API_apiMap(callback, notRetry)
{
    return API_getAPI("apiMap.html", callback, notRetry);
}

//apiCitizenById
function API_apiCitizenById(citizenId, callback, notRetry)
{
    var url = "apiCitizenById.html?id="+citizenId;
    return API_getAPI(url, callback, notRetry);
}

//apiCitizenByName
function API_apiCitizenByName(citizenName, callback, notRetry)
{
    var url = "apiCitizenByName.html?id="+citizenName.toLowerCase();
    return API_getAPI(url, callback, notRetry);
}

//apiOnlinePlayers  (the returned data is a non-standard json)
function API_apiOnlinePlayers(countryId, callback, notRetry) //countryId=0 worldwide
{
    $.ajax({
        url: "apiOnlinePlayers.html?countryId="+countryId,
        success: function(data) {
            var info = JSON.parse(data);
            var playerList = [];
            $.each(info,function(index, value){
                playerList.push(JSON.parse(value));
            });
            callback(playerList);
        },
        error: function(xhr,textStatus){
            if (notRetry == true)
            {
                console.log("apiOnlinePlayers.html?countryId="+countryId+"error: (", textStatus, ")");
                return;
            }
            else
            {
                console.log("apiOnlinePlayers.html?countryId="+countryId+"error: (", textStatus, "), try again");
                $.ajax(this);
            }
        },
    });
}

//apiMilitaryUnitById
function API_apiMilitaryUnitById(muId, callback, notRetry)
{
    var url = "apiMilitaryUnitById.html?id="+muId;
    return API_getAPI(url, callback, notRetry);
}

//apiMilitaryUnitMembers
function API_apiMilitaryUnitMembers(muId, callback, notRetry)
{
    var url = "apiMilitaryUnitMembers.html?id="+muId;
    return API_getAPI(url, callback, notRetry);
}

//apiFights
function API_apiFights(battleId, roundId, callback, notRetry)
{
    var url = "apiFights.html?battleId=" + battleId + "&roundId=" + roundId;
    return API_getAPI(url, callback, notRetry);
}

//apiBattles
function API_apiBattles(battleId, callback, notRetry)
{
    var url = "apiBattles.html?battleId=" + battleId;
    return API_getAPI(url, callback, notRetry);
}

//apiRanks
function API_apiRanks(callback, notRetry)
{
    var url = "apiRanks.html";
    return API_getAPI(url, callback, notRetry);
}
