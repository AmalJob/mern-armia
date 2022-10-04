const User = require("../modal/UserModal");
const bcrypt = require("bcrypt");

exports.register = async (username, email, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    return user;
  } catch (error) {
    throw Error(error);
  }
};

exports.login = async(email,password)=>{
    try {
        const user = await User.findOne({ email:email });
        console.log(user);
     if(user && (await bcrypt.compare(password, user.password))){
        return user;
     }   
             
    } catch (error) {
        throw Error(error)
    }
}
