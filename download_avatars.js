var request = require('request');
var fs = require('fs');
var secrets = require('./secrets.js');
var Owner = process.argv[2];
var Repo = process.argv[3];


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(Owner, Repo, cb) {
  if(undefined === Owner || undefined === Repo){
    console.log('No Owner or Repo information provided. Please try again')
    return;
  }
  var options = {
    url: "https://api.github.com/repos/" + Owner + "/" + Repo + "/contributors",
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

getRepoContributors(Owner, Repo, downloadImageByURL)


function downloadImageByURL(url, filePath) {
  fs.createWriteStream(filePath);

}

function findUrl(err, result) {
  return result.avatar_url
}