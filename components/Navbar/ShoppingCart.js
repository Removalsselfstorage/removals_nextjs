import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ShoppingCart = ({ items }) => {
  return (
    <Link href="/cart">
      <ShoppingCartIcon
        className="h-12"
        sx={{
          color: 'black',
        }}
      />
      <span className="badge badge-warning w-[30px] h-[30px] rounded-[2000px] text-white mr-5">0</span>
    </Link>
  );
};

export default ShoppingCart;
