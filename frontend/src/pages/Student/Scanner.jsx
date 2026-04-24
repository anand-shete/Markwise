import api from '@/api';
import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Loader } from '@/components';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setStudent } from '@/features/studentSlice';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function Scanner() {
  const navigate = useNavigate();
  const student = useSelector(state => state.student);
  const dispatch = useDispatch();
  const qrRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [qrCodeText, setQrCodeText] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isScannerReady, setIsScannerReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (!student._id) {
        try {
          const res = await api.get('/student/check-auth');
          dispatch(setStudent(res.data.student));
        } catch (error) {
          toast.error(error.response.data.message);
          navigate('/student/login');
        }
      }
      if (qrRef.current && !html5QrCodeRef.current) {
        try {
          const html5QrCode = new Html5Qrcode('qr-reader'); // pass the id of the div which will display QR Code
          html5QrCodeRef.current = html5QrCode;
          setIsScannerReady(true);
        } catch (error) {
          toast.error('Failed to start Scanner');
        }
      }

      // Attendance Marking
      if (qrCodeText) {
        try {
          const res = await api.post(
            `/student/attendanceMarked/${qrCodeText}`,
            { studentId: student._id }
          );
          toast.success(res.data.message);
          navigate('/student/dashboard');
        } catch (error) {
          toast.error(
            error.response.data.message || 'Error marking Attendance'
          );
          navigate('/student/dashboard');
        }
      }
    })();
  }, [qrCodeText]);

  const startScanning = async () => {
    try {
      if (!isScanning && html5QrCodeRef.current) {
        setIsScanning(true);

        await html5QrCodeRef.current.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: 200 },
          async decodedText => {
            setQrCodeText(decodedText);
            await html5QrCodeRef.current.stop();
            setIsScanning(false);
          }
        );
      }
    } catch (error) {}
  };

  const stopScanning = async () => {
    try {
      if (isScanning && html5QrCodeRef.current) {
        await html5QrCodeRef.current.stop();
        setIsScanning(false);
      }
    } catch (error) {}
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      {!isScannerReady && <Loader />}
      <div
        id="qr-reader"
        ref={qrRef}
        style={{
          width: 300,
          visibility: isScanning ? 'visible' : 'hidden',
        }}
      />
      {isScannerReady && (
        <>
          <div className="my-5 flex flex-row items-center justify-center">
            <Button
              onClick={stopScanning}
              disabled={!isScanning}
              className="m-5"
            >
              Stop Scanning
            </Button>
            <Button
              onClick={startScanning}
              disabled={isScanning}
              className="m-5"
            >
              Start Scanning
            </Button>
          </div>
          <Button
            onClick={() => navigate('/student/dashboard')}
            className="m-5"
          >
            Back to Dashboard
          </Button>
        </>
      )}
    </div>
  );
}
