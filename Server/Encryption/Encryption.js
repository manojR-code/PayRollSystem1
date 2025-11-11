const bcrypt = require("bcrypt");
async function Encryption(Data) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Data, salt);
    return hash;
};
module.exports = {
    Encryption
}