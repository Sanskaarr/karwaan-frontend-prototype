
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div style={{ padding: '50px',display:'flex',flexDirection:"column", alignItems:"center",justifyContent:"center", height:'100vh' }}>
      <h1 style={{ color: 'black', textAlign: 'center', padding: '50px' }}>404 - Page Not Found</h1>
      <p style={{color:"black", textAlign: 'center', padding: '50px' }}>The page you are looking for might have been removed or does not exist.</p>
      <Link href="/">
        <div style={{ color: 'blue', textDecoration: 'underline' }}>Go back to the home page</div>
      </Link>
    </div>
  );
};

export default NotFoundPage;