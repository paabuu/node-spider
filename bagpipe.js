var Bagpipe = require('bagpipe');
var bagpipe = new Bagpipe(15);
var path = require('pat2h');

var fs = require('fs')

var cheerio = require('cheerio')

var request = require('request')

var pageURL = "http://www.xxx.com/thread0806.php?type=3&fid=8&search=&page=";
var imagesUrl = "http://www.xxx.com/htm_data/8/1703/2322143.html";
var count = 0;

getArticleURL(1)
//获取文章列表
function getArticleURL(page_num) {
    request( {
        url: pageURL + page_num,
        headers: {
            'Cookie': '__cfduid=ddd446be3a189201a0cb280124c88e71a1490512677; 227c9_lastfid=0; 227c9_lastvisit=0%091490513175%09%2Fread.php%3Ftid%3D2322143; PHPSESSID=igbc04armnhlc0hf5a8gcahq51',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
        }
    } , function(err, res, body) {
        console.log(body)
        var $ = cheerio.load(body);
		var links = $('h3 a');
        links.each(function(i, el) {
            getImageURL(el.attribs.href);
        })
    })
}

//获得图片列表
function getImageURL(imagesUrl) {
	request({
        url: 'http://www.xxx.com/' + imagesUrl,
        headers: {
            'Cookie': '__cfduid=ddd446be3a189201a0cb280124c88e71a1490512677; 227c9_lastfid=0; 227c9_lastvisit=0%091490513175%09%2Fread.php%3Ftid%3D2322143; PHPSESSID=igbc04armnhlc0hf5a8gcahq51',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
        }
    }, function(err, res, body) {
        if(err) {
            console.log(err,'error1')
            return;
        }
		var $ = cheerio.load(body);
		var links = $('.tpc_content.do_not_catch input');
		links.each(function(i, el) {
            var href = el.attribs.src;
            bagpipe.push(download, href, i, function() {
                console.log(count);
            });
        })
	})
}

function download(url, index, callback) {
    request(url).pipe(fs.createWriteStream('images/' + count + '.jpg')).on('close', function() {
        callback(count);
        count++;
    }).on('error', function(error) {
        console.log(error, 'error2')
    });
}
