import Loader from "assets/gifs/loader.gif";

const Loading = ({ style }: { style?: any }) => {
  return (
    <div className="img-loader" style={style ? style : {}}>
      <img src={Loader} alt="Loading..." />
    </div>
  );
};

export default Loading;
