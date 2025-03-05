import bcrypt from "bcryptjs";
const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds

const getPassword = async (password) => {
  let hashedPassword = await bcrypt.hash(password, salt); // Hash the password
  console.log("hashedPassword ===> ", hashedPassword);
  return hashedPassword;
};

getPassword("test123");

