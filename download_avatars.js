var request = require('request');
var fs = require('fs');
var secrets = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token ' + secrets.GITHUB_TOKEN

    }
  };

  request(options, function(err, res, body) {
    var result = JSON.parse(body);
   // findUrl(result[0]);
    for (var i = 0; i < result.length; i++) {
     var link = findUrl(err, result[i]);

    cb(link, "./Avatars/" + result[i].login + ".jpeg");

  }
  });

}

getRepoContributors("jquery", "jquery", downloadImageByURL)


function downloadImageByURL(url, filePath) {
  fs.createWriteStream(filePath);

}

function findUrl(err, result) {
  return result.avatar_url
}