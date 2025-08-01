import { axiosInstance } from '@/apis/axiosInstance';
import { useEffect } from 'react';

export default function ReissuePage() {
  useEffect(() => {
    const handleRedirection = async () => {
      try {
        const isNewUser = document.cookie.includes('isSignUp=false');

        if (isNewUser) {
          window.location.href = '/signup';
        } else {
          const response = await axiosInstance.get('/api/jwt/access-token', {
            withCredentials: true,
          });

          const accessToken = response.headers['authorization']?.replace(
            'Bearer ',
            ''
          );
          const sseToken = response.data?.data?.value;

          if (accessToken) {
            localStorage.setItem('access_token', accessToken);
          }

          if (sseToken) {
            localStorage.setItem('sse_token', sseToken);
          }

          window.location.href = '/';
        }
      } catch (error) {
        window.location.href = '/login';
      }
    };

    handleRedirection();
  }, []);

  // TODO: 로딩스피너 넣는게 좋을듯
  return <p>Reissuing access token... Please wait.</p>;
}
