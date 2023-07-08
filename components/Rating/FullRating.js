import { BsStarFill, BsStarHalf } from 'react-icons/bs';

const FullRating = ({ value, color, small }) => {
  const renderStar = (index) => {
    if (index <= value) {
      return (
        <span role="img" aria-label="star" className={`${color} ${small ? 'text-[20px]': 'text-[30px]'} `}>
          &#9733;
        </span>
      );
    } else if (index === Math.ceil(value) && !Number.isInteger(value)) {
      return (
        <span
          role="img"
          aria-label="half-star"
          className={`${color} ${small ? 'text-[20px]': 'text-[30px]'} `}
        >
          &#9733;&#189;
        </span>
      );
    } else {
      return (
        <span
          role="img"
          aria-label="empty-star"
          className={`${color} ${small ? 'text-[20px]': 'text-[30px]'} `}
        >
          &#9734;
        </span>
      );
    }
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index}>{renderStar(index)}</span>
      ))}
    </div>
  );
};

export default FullRating;
