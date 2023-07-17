import '@fortawesome/fontawesome-free/css/all.css';

const StarRating = ({ rating, size }) => {
  const starCount = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStar = (index) => {
    if (index < fullStars) {
      return <i className={`fas fa-star text-secondary ${size} `} />;
    } else if (hasHalfStar && index === fullStars) {
      return <i className={`fas fa-star-half-alt text-secondary ${size}`} />;
    } else {
      return <i className={`far fa-star text-secondary text-[16px]`} />;
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(starCount)].map((_, index) => (
        <span key={index} className="">
          {renderStar(index)}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
