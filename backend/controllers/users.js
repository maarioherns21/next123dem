import User from "../models/user.js";


export const index = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(404).json({ message: "Credentials not valid" });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: error.message });
  }
};


export const register = async (req, res) => {
  try {
    const user = req.body;

    const oldUser = await User.findOne({ email: req.body.email });

    if (oldUser) return res.json({ message: "User ALready exist" });

    const newUser = new User({ ...user });

    const data = await newUser.save();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);

    res.status(401).json({ message: error.message });
  }
};



