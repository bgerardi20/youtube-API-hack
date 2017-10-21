//class="wrapper"
//id="js-search-form" -form
//id="js-query" -input
//id="submit" -submit button
//class="js-search-results" - results

$(document).ready(function () {


    //1.Get the input from the user(query)
    //listen for submit on form
    //preventDefault to make JavaScript handle any refreshes during page load
    //great variable for user input and get value for it
    //run that value through the function below
    $("#js-search-form").submit(function (event) {
        event.preventDefault();
        let userInput = $("#js-query").val();
        getResults(userInput);
    });
    //2.Use the input from the user, make the API call to get the JSON response
    //create getResults function
    //make API call to get JSON respone
    //if JSON response doesnt have any results alert "No videos found"
    //if JSON response does return results, display those results
    //run the JSON response through function below
    function getResults(userSearchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet",
                maxResults: 20,
                key: "AIzaSyBPmmta7Gnx4E0iMB8KBePwjfjwJgGuJ24",
                q: userSearchTerm,
                type: "video"
            },

            function (recievedApiData) {

                console.log(recievedApiData);

                if (recievedApiData.pageInfo.totalResults == 0) {
                    alert("No results found!");
                } else {
                    displaySearchResults(recievedApiData.items);
                }
            });
    }

    //3.Use the JSON response to populate the relevant HTML with the variable inside the JSON
    //declare displaySearchResults function
    //declare empty array for populated HTML
    //Using the JSON response, populate the HTML with one LI tag for each result
    //use the HTML output to show it in the index.html
    function displaySearchResults(videosArray) {

        let buildHtml = "";

        $.each(videosArray, function (videosArrayKey, videosArrayValue) {
            buildHtml += "<li>";
            buildHtml += "<p>" + videosArrayValue.snippet.title + "</p>";
            buildHtml += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "'target='_blank'>";
            buildHtml += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>";
            buildHtml += "</a>";
            buildHtml += "</li>";
        });

        $(".js-search-results ul").html(buildHtml);
    }
});
