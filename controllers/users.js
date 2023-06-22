import User from "../models/userModel.js";

export const createUser = async (req, res) => {
    const { email } = req.body;

    try {
        const result = await User.findOne({ email: email });
        if (result) {
            res.send({ message: "email is already registered.", alert: false });
        } else {
            const data = User(req.body);
            await data.save();
            res.send({ message: "successfully signed up", alert: true });
        }
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const filter = [{ email: email }, { password: password }];

    try {
        const haveAccount = await User.findOne({ $and: filter });
        if (haveAccount) {
            const sendToFrontend = {
                _id: haveAccount._id,
                firstName: haveAccount.firstName,
                lastName: haveAccount.lastName,
                email: haveAccount.email,
                password: haveAccount.password,
                image: haveAccount.image,
            };
            res.send({
                message: "User and Pasword is registered...Good",
                alert: true,
                backendData: sendToFrontend,
            });
        } else {
            res.send({ message: "User of Password is wrong", alert: false });
        }
    } catch (error) {
        console.log(error);
    }
};
