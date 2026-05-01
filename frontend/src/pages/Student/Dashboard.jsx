import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import api from '@/api';
import { Loader } from '@/components';
import { Button } from '@/components/ui/button';
import { setStudent } from '@/features/studentSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { setQrCodes } from '@/features/qrCodeSlice';

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qrCodes = useSelector(state => state.qrCode.qrCodes);
  const [loading, setLoading] = useState(true);
  const student = useSelector(state => state.student);

  useEffect(() => {
    (async () => {
      if (!student._id) {
        try {
          const res = await api.get('/student/check-auth');
          dispatch(setStudent(res.data.student));
        } catch (error) {
          toast.error(error.response.data.message);
          navigate('/student/login');
        } finally {
          setLoading(false);
        }
      }

      if (student._id) {
        try {
          const res = await api.get(`/student/getScanHistory/${student._id}`);
          dispatch(setQrCodes(res.data));
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [dispatch, navigate, student._id]);

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center justify-center">
      <h1 className="my-10 text-2xl font-semibold md:text-3xl">
        Welcome, {student.fullname}!
      </h1>
      <Button onClick={() => navigate('/student/scan')} className="my-10">
        Scan QR Code
      </Button>

      <>
        <h1 className="mt-10 text-xl">Your Attendance History</h1>

        {qrCodes.length === 0 ? (
          <p className="my-5 text-slate-500">No data to display.</p>
        ) : (
          <Table className="mx-auto mt-10 max-w-[70vw]">
            <TableHeader>
              <TableRow className="*:text-center *:font-semibold *:text-black">
                <TableHead>Subject</TableHead>
                <TableHead className="hidden pt-2 md:block">
                  Teacher Name
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qrCodes.map(qrCode => (
                <TableRow key={qrCode.createdAt} className="*:text-center">
                  <TableCell>{qrCode.teacherSubject}</TableCell>
                  <TableCell className="hidden pt-2 md:block">
                    {qrCode.teacherName}
                  </TableCell>
                  <TableCell>{qrCode.markedByStudents[0]?.scanDate}</TableCell>
                  <TableCell>{qrCode.markedByStudents[0]?.scanTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </>
    </div>
  );
}
