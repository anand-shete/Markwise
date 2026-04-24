import api from '@/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { clearTeacher } from '@/features/teacherSlice';
import { Loader } from '@/components';
import { toast } from 'sonner';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/teacher/logout')
      .then(v => {
        dispatch(clearTeacher());
        navigate('/');
        toast.success('Logout successful');
      })
      .catch(e => console.error('Axios error:', e))
      .finally(() => setLoading(false));
  }, [dispatch, navigate]);

  if (loading) return <Loader />;
}
