import api from '@/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useSelector, useDispatch } from 'react-redux';
import { setTeacher } from '@/features/teacherSlice';
import { Loader } from '@/components';
import { Button } from '@/components/ui/button';
import { setQrCodes } from '@/features/qrCodeSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Dashboard() {
  const teacher = useSelector(state => state.teacher);
  const qrCodes = useSelector(state => state.qrCode.qrCodes);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    (async () => {
      if (!teacher._id) {
        try {
          const res = await api.get('/teacher/check-auth');
          dispatch(setTeacher(res.data.teacher));
        } catch (error) {
          toast.error(error.response.data.message || 'Please Login');
          navigate('/teacher/login');
        } finally {
          setLoading(false);
        }
      }

      if (teacher._id) {
        try {
          const response = await api.get(
            `/teacher/getQrHistory/${teacher._id}`
          );
          const arr = response.data;
          dispatch(setQrCodes(arr));
        } catch (error) {
          console.error('herr Axios error', error);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [dispatch, navigate, teacher._id]);

  const generateQRCode = async () => {
    try {
      setLoading(true);
      const { data: allQrCodes } = await api.post(
        `/teacher/generateQrCode/${teacher._id}`
      );
      dispatch(setQrCodes(allQrCodes));
      const qrCodeUrl = allQrCodes[0]?.qrCodeURL;
      setQrCodeUrl(qrCodeUrl);
      setLoading(false);
    } catch (error) {
      toast.error('Error Generating QR Code');
    }
  };

  const showQrCode = async () => {
    try {
      setQrCodeUrl(qrCodes[0].qrCodeURL);
    } catch (error) {
      console.error(error);
      toast.error('Generate QR Code First');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center pt-30">
      <h1 className="text-2xl font-semibold md:text-4xl">
        Welcome, {teacher.fullname}!
      </h1>
      {qrCodeUrl && <img className="h-[30vh]" src={qrCodeUrl} alt="qrCode" />}
      <div className="my-10 flex flex-col space-y-4 md:flex-row md:items-stretch md:space-x-10">
        <Button onClick={generateQRCode}>Generate QR Code</Button>
        <Button onClick={showQrCode} disabled={qrCodeUrl}>
          Show Last QR Code
        </Button>
        <Button onClick={() => setQrCodeUrl(null)} disabled={!qrCodeUrl}>
          Hide QR Code
        </Button>
      </div>
      <h1 className="text-base mt-20 mb-10 font-medium md:text-3xl">
        Attendance History
      </h1>
      {qrCodes.length === 0 ? (
        <p className="text-slate-500">No data to display.</p>
      ) : (
        <Table className="mx-auto mb-20 max-w-[70vw]">
          <TableHeader>
            <TableRow className="*:text-center *:font-semibold *:text-black">
              <TableHead>Date</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>PRN</TableHead>
              <TableHead className="text-right">Scan Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {qrCodes.map(qrCode =>
              qrCode.markedByStudents.map((obj, index) => (
                <TableRow key={index} className="*:text-center">
                  <TableCell>{obj.scanDate}</TableCell>
                  <TableCell>{obj.student.fullname}</TableCell>
                  <TableCell>{obj.student.prn}</TableCell>
                  <TableCell>{obj.scanTime}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
