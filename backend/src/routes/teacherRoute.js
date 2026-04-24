const express = require('express');
const Teacher = require('../models/teacher');
const Qrcode = require('../models/qrcode');
const router = express.Router();
const qrcode = require('qrcode');
const { generateTokenForTeacher, verifyToken } = require('../services/auth');

router.get('/check-auth', (req, res) => {
  try {
    const token = req.cookies?.teacherToken;
    if (!token) return res.status(404).json({ message: 'Login Required!' });

    const teacher = verifyToken(token);
    res.json({ teacher });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Authentication Failed' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { fullname, faculty_id, subject, password } = req.body;

    if (!fullname || !faculty_id || !subject || !password)
      return res.status(400).json({ message: 'All fields are required.' });

    const teacher = await Teacher.countDocuments({ faculty_id }).lean();
    if (teacher)
      return res
        .status(409)
        .json({ message: 'Account Aldready exists. Please Login!' });

    await Teacher.create({
      fullname,
      faculty_id,
      subject,
      password,
    });

    return res.status(201).json({ message: 'Teacher Registration complete' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to Register Teacher' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { faculty_id, password } = req.body;
    if (!faculty_id || !password)
      return res.status(400).json({ message: 'All fields are required' });

    const teacher = await Teacher.findOne({ faculty_id });
    if (!teacher) return res.status(404).json({ message: 'Account not Found' });

    const check = await teacher.matchPassword(password);
    if (!check) return res.status(401).json({ message: 'Incorrect Password' });

    const token = generateTokenForTeacher(teacher);

    if (process.env.NODE_ENV === 'production') {
      return res
        .cookie('teacherToken', token, {
          maxAge: 3600000,
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
        })
        .status(200)
        .json({ message: 'Login Success!', id: teacher._id });
    } else {
      return res
        .cookie('teacherToken', token, {
          maxAge: 3600000,
          httpOnly: true,
        })
        .status(200)
        .json({ message: 'Login Success!', id: teacher._id });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Teacher Login Failed' });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('teacherToken').status(200).end();
});

router.get('/getQrHistory/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;

    const teacher = await Teacher.findOne({ _id: teacherId });
    if (!teacher) return res.status(404).json({ message: 'Teacher not Found' });

    const qrCodeHistoryOfTeacher = await Qrcode.find({
      teacherName: teacher.fullname,
    })
      .sort({ createdAt: -1 })
      .populate('markedByStudents.student', 'fullname prn');
    if (!qrCodeHistoryOfTeacher)
      return res.status(404).json({ message: 'Generate QR Code First!' });

    return res.status(200).json(qrCodeHistoryOfTeacher);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Error in fetching QR Code History' });
  }
});

router.post('/generateQrCode/:id', async (req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: 'Teacher not Found' });

    const qrCode = await Qrcode.create({
      // create the document in db
      teacherName: teacher.fullname,
      teacherSubject: teacher.subject,
      createdByTeacher: teacherId,
    });

    const qrCodeUrl = await qrcode.toDataURL(qrCode._id.toString(), {
      errorCorrectionLevel: 'L',
    });
    if (!qrCodeUrl)
      return res.status(500).json({ message: 'Error generating QR Code' });

    await Qrcode.updateOne(
      { _id: qrCode._id },
      { $set: { qrCodeURL: qrCodeUrl } }
    );

    const allQrCodes = await Qrcode.find({ createdByTeacher: teacherId }).sort({
      createdAt: -1,
    });
    if (!allQrCodes)
      return res.status(500).json({ message: 'Error in generating QR Code' });

    return res.status(201).json(allQrCodes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error in generating QR Code' });
  }
});
module.exports = router;
