import { Button } from '@/shared/ui/Button';
import { useNavigate } from 'react-router-dom';

export function AuthButtons() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="flex items-center gap-[16px] text-[17px]">
      <Button onClick={handleLogin} className=" h-auto py-[12px] px-[16px]">
        로그인
      </Button>
      <Button
        variant="ghost"
        onClick={handleSignup}
        className="h-auto py-[12px] px-[16px]"
      >
        회원가입
      </Button>
    </div>
  );
}
