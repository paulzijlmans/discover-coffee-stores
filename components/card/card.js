import Image from 'next/image';
import Link from 'next/link';

function Card(props) {
  return (
    <Link href={props.href}>
      <a>
        <h2>{props.name}</h2>
        <Image src={props.imgUrl} width={260} height={160} alt='card image' />
      </a>
    </Link>
  );
}

export default Card;
