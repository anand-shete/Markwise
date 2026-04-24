import {
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOutIcon,
  UserRoundPlus,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const DesktopNavbar = () => {
  const navigate = useNavigate();
  const teacher = useSelector(state => state.teacher);
  const student = useSelector(state => state.student);

  return (
    <div className="space-x-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link">
            Student
            <ChevronDown className="pb-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => navigate('/student/login')}>
            <LogIn />
            Login
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/student/signup')}>
            <UserRoundPlus />
            Sign Up
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/student/dashboard')}>
            <LayoutDashboard />
            Dashboard
          </DropdownMenuItem>
          {student?._id && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => navigate('/student/logout')}
              >
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="link">
            Teacher
            <ChevronDown className="pb-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => navigate('/teacher/login')}>
            <LogIn />
            Login
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/teacher/signup')}>
            <UserRoundPlus />
            Sign Up
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/teacher/dashboard')}>
            <LayoutDashboard />
            Dashboard
          </DropdownMenuItem>
          {teacher?._id && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => navigate('/teacher/logout')}
              >
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default DesktopNavbar;
