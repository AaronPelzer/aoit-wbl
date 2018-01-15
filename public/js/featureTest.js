function makeRequest(url, options, success) {
    var request = new Request(url, options);

    fetch(request).then(function(results) {
        return results.json();
    }).then(function(data) {
        console.log(data);
        success(data);
    });
}

/*
makeRequest("https://randomuser.me/api/?results=10", {
  method: "GET"
});
*/