import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(hashedPassword);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        console.log(newUser);

        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const age = 1000 * 60 * 60 * 24 * 7;

        const user = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")
        const token = jwt.sign(
            {
                id: user.id,
                isAdmin: false,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        const {
            password: userPassword, ...userInfo
        } = user

        res
            .cookie("token", token, {
                httpOnly: true,
                // secure: true,
                maxAge: age,
            })
            .status(200)
            //   .json({ message: "Success on login" });
            .json(userInfo)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "logout success" });
};
