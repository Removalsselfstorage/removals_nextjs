// import DotLoader from 'react-spinners/DotLoader';
// import PuffLoader from 'react-spinners/PuffLoader';

const Loader1 = ({ loading }) => {
  return (
  <div className='fixed top-0 right-0 bottom-0 left-0 z-[5000] grid place-items-center bg-white/60'>
    <span className="loading loading-ring w-[200px] text-primary"></span>
  </div>
  )
}

export default Loader1
