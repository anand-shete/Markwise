const express = require('express');
const Student = require('../models/student');
const Qrcode = require('../models/qrcode');
const { generateTokenForStudent, verifyToken } = require('../services/auth');
const router = express.Router();

router.get('/check-auth', (req, res) => {
    try {
        const token = req.cookies?.studentToken;
        if (!token) return res.status(404).json({ message: "Login Required!" })

        const student = verifyToken(token);
        res.json({ student })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Authentication failed using Token" })
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { fullname, prn, password } = req.body;
        if (!fullname || !prn || !password) return res.status(400).json({ message: "All fields are required." })

        const student = await Student.countDocuments({ prn }).lean();
        if (student) return res.status(409).json({ message: "Account aldready exists. Please Login!" })
        await Student.create({
            fullname, prn, password
        })

        return res.status(201).json({ message: "Student registered successfully!" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to Register Student!" })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { prn, password } = req.body;
        if (!prn || !password) return res.status(400).json({ message: "All fields are required!" });

        const student = await Student.findOne({ prn });
        if (!student) return res.status(404).json({ message: 'Account not found' })

        const check = await student.matchPassword(password);
        if (!check) return res.send(401).json({ message: "Incorrect Password" });

        const token = generateTokenForStudent(student);
        if (process.env.NODE_ENV === "production") {
            return res.cookie("studentToken", token, {
                maxAge: 3600000, httpOnly: true, secure: true, sameSite: "none", path: "/"
            }).status(200).json({ message: "Login Success!", id: student._id })
        } else {
            return res.cookie("studentToken", token, {
                maxAge: 3600000, httpOnly: true
            }).status(200).json({ message: "Login Success!", id: student._id });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Student Login Failed" })
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('studentToken').status(200).end();
})

router.post('/attendanceMarked/:id', async (req, res) => {
    try {
        const { studentId } = req.body;
        const qrCodeId = req.params.id;
        const student = await Student.findById(studentId).lean();
        if (!student) return res.status(404).json({ message: "Student not found" });

        const qrCode = await Qrcode.findById(qrCodeId).lean();
        if (!qrCode) return res.status(404).json({ message: "Invalid QR Code" });

        const marked = qrCode.markedByStudents.some(obj => obj.student.equals(studentId))
        if (marked) return res.status(409).json({ message: "Attendance Previously Marked" })

        await Qrcode.findByIdAndUpdate(qrCodeId, {
            $push: { markedByStudents: { student: studentId, scanTime: new Date() } }
        })
        return res.status(200).json({ message: "Attendance Marked" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error marking Attendace" })
    }
})


router.get('/getScanHistory/:id', async (req, res) => {
    try {
        const id = req.params?.id;
        const student = await Student.findById(id);
        if (!student) return res.status(404).json({ message: "Student not Found" });

        const allQrCodes = await Qrcode.find({ "markedByStudents.student": id }).sort({ createdAt: -1 });
        return res.status(200).json(allQrCodes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error in fetching data" })
    }
});

module.exports = router;