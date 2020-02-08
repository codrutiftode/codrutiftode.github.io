window.addEventListener("load", function() {

    // Get easy challenges from jsonp
    var easyGroup = document.querySelector("#group-easy .challenge-row");
    appendChallenges(challengesData[0], easyGroup);

    // Get easy challenges from jsonp
    var mediumGroup = document.querySelector("#group-medium .challenge-row");
    appendChallenges(challengesData[1], mediumGroup);

    // Get easy challenges from jsonp
    var hardGroup = document.querySelector("#group-hard .challenge-row");
    appendChallenges(challengesData[2], hardGroup);
});

function appendChallenges(challengesArr, htmlGroup) 
{
    // First, empty the html group
    while (htmlGroup.firstElementChild) {
        htmlGroup.firstElementChild.remove();
    }

    var newElem;
    for (var i = 0; i < challengesArr.length; i++)
    {
        // Create new challenge element
        newElem = document.createElement("div");
        newElem.setAttribute("id", "challenge" + challengesArr[i].challengeNumber);
        newElem.setAttribute("class", "challenge");
        newElem.setAttribute("onclick", "challengeClick(this);");
        newElem.innerHTML = "<h3>" + challengesArr[i].challengeNumber + "</h3>";

        // Add new elem to the group
        htmlGroup.appendChild(newElem);
    }
}

// Called when a challenge is clicked
function challengeClick(currentChallenge)
{
    // Find the current challenge details in the challengesData object
    var targetNumber = currentChallenge.firstElementChild.innerHTML;
    var pos = {"group":"-1", "index": "-1"};
    var shouldStop = false;
    for (var i = 0; i < challengesData.length && !shouldStop; i++)
    {
        for (var j = 0; j < challengesData[i].length && !shouldStop; j++)
        {
            if (challengesData[i][j].challengeNumber == targetNumber)
            {
                pos.group = i;
                pos.index = j;
                shouldStop = true;
            }
        }
    }
    var challengeDetails = challengesData[pos.group][pos.index];

    // Set the current challenge title
    var title = "Challenge " + challengeDetails.challengeNumber + ": " + challengeDetails.challengeTitle;
    document.getElementById("challenge-title").innerHTML = title; 

    // Set the challenge description
    document.getElementById("challenge-desc").innerHTML = challengeDetails.challengeDesc;

    // Set the challenge example input and output
    document.getElementById("challenge-input-example").innerHTML = challengeDetails.input;
    document.getElementById("challenge-output-example").innerHTML = challengeDetails.output;

    // Display the current challenge view
    document.getElementById("current-challenge-view").style.display = "flex";
}

// Called when the return button in the challenge view is clicked
function challengeReturnClick()
{
    // Hide the current challenge view
    document.getElementById("current-challenge-view").style.display = "none";
}
