import { useRouter } from 'next/router';
import Link from 'next/link';

function CoffeeStore() {
  const router = useRouter();
  return (
    <div>
      <h1>Coffee Store</h1>
      <p>{router.query.id}</p>
      <Link href='/'>Back to home</Link>
    </div>
  );
}

export default CoffeeStore;
