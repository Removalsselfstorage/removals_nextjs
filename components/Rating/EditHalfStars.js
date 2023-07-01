import { BsStarFill, BsStarHalf } from 'react-icons/bs';


const EditHalfStars = ({color}) => {
  return (
    <div className="rating rating-md rating-half">
      <input type="radio" name="rating-10" className="rating-hidden" />
      <input
        type="radio"
        name="rating-10"
        className={`${color} mask mask-star-2 mask-half-1`}
      />
      <input
        type="radio"
        name="rating-10"
        className={`${color} mask mask-star-2 mask-half-2`}
      />
      <input
        type="radio"
        name="rating-10"
        className={`${color} mask mask-star-2 mask-half-1`}
      />
      <input
        type="radio"
        name="rating-10"
        className={`${color} mask mask-star-2 mask-half-2`}
      />
      <input
        type="radio"
        name="rating-10"
        className={`${color} mask mask-star-2 mask-half-1`}
      />
      <input
        type="radio"
        name="rating-10"
        className={`${color} mask mask-star-2 mask-half-2`}
      />
      <input
        type="radio"
        name="rating-10"
        className={`${color} mask mask-star-2 mask-half-1`}
      />
      <input
        type="radio"
        name="rating-10"
        className={`${color} mask mask-star-2 mask-half-2`}
      />
      <input
        type="radio"
        name="rating-10"
        className={`${color} mask mask-star-2 mask-half-1`}
        checked
      />
      <input
        type="radio"
        name="rating-10"
        className={`${color} mask mask-star-2 mask-half-2`}
      />
    </div>
  );
};

export default EditHalfStars;



