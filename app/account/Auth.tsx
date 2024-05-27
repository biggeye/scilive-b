import supabase from '../supabaseClient';

const Auth: React.FC = () => {
  const handleSignIn = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) {
      console.error('Error signing in:', error);
    } else {
      console.log('Signed in user:', user);
    }
  };

  return (
    <div>
      <button onClick={() => handleSignIn('email@example.com', 'password')}>Sign In</button>
    </div>
  );
};

export default Auth;
