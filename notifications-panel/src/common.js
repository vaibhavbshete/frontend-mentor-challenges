// const fs = require('fs');
// const crypto = require('crypto');
// const getHash = (content, limit = -1) => {
//     var hash = crypto.createHash('md4');
//     //passing the data to be hashed
//     let data = hash.update(content, 'utf-8');
//     //Creating the hash in the required format
//     let gen_hash = data.digest('hex');
//     if (limit > -1) {
//         gen_hash = gen_hash.substring(0, limit);
//     }
//     return gen_hash;
// };
// const getFileHash = function (filepath) {
//     var content = getHash(fs.readFileSync(path.resolve(__dirname, filepath)), 20);
//     return content;
// };

const titleToKebab=function(string){
    string = string.replaceAll(/\s+/g, "-");
    string = string.toLowerCase();
    return string;
}
// exports.getFileHash = getFileHash 
exports.titleToKebab = titleToKebab