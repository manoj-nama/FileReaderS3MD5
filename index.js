window.onload = function() {
    
  var fileInput = document.getElementById('fileInput');
  var fileDisplayArea = document.getElementById('fileDisplayArea');

  fileInput.addEventListener('change', function(e) {
var offset = 0;
    var chunkSize = 10;
    var file = fileInput.files[0];
    var textType = /.*/;

    var reader = new FileReader();
    var fileSize = file.size;
    var md5s = [];
    var hashes;
    console.time("x");
    var chunks = 0;
    console.log("total");

    reader.onload = function(e) {
      var contents = e.target.result;
      // This goes here:
      var hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(contents));
      
      console.log(hash, ">>>>>");
      console.timeEnd("x");
      md5s.push(hash);
      if(hashes) {
        hashes += hash;
      } else {
        hashes = hash;
      }
      chunks++;
      offset += (chunkSize * 1024 * 1024);
      if(offset < fileSize) {
        getChunk(offset, reader, chunkSize, file);
      } else {
        console.timeEnd("total");
        console.log("File completely parsed", hashes);
        fileDisplayArea.innerText = CryptoJS.MD5(hashes) + '-' + chunks;
      }
    }

    console.log("Reading file......", (file.size / 1024 / 1024).toFixed(2), 'MB');
    //console.time("x");
    
    // reader.readAsText(file.slice(0, 1 * 1024 * 1024));
    getChunk(0, reader, chunkSize, file);
  });
}

function Hex2Bin(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(2)}
function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}
function getChunk(offset, reader, chunkSize, file) {
  reader.readAsArrayBuffer(file.slice(offset, chunkSize * 1024 * 1024));
}