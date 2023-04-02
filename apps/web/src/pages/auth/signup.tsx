import { NextPage } from 'next';

import { Auth } from '@/components/auth';

const Signup: NextPage = () => {
  return <Auth type="signup" />;
};

export default Signup;
