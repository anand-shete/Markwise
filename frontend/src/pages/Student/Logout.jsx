import api from '@/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { clearStudent } from '@/features/studentSlice';
import { Loader } from '@/components';
import { toast } from 'sonner';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/student/logout')
      .then(v => {
        dispatch(clearStudent());
        toast.success('Logout successful');
        navigate('/');
      })
      .catch(e => console.error('Axios error:', e))
      .finally(() => setLoading(false));
  }, [dispatch, navigate]);

  if (loading) return <Loader />;
}
