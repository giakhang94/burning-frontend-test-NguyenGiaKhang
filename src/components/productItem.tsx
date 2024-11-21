import { ItemProps } from "../types";

const ProductItem = (props: ItemProps): React.JSX.Element => {
  return (
    <div className="flex items-center my-3 border border-gray-300 max-w-[500px] m-5 p-3 rounded-sm">
      <div className="h-[80px] w-[150px]">
        <img
          src={props.thumbnail}
          alt="product thumbnail"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-lg">{props.title}</p>
        <p>{props.description}</p>
        <div className="flex justify-between">
          <p className="font-semibold">Price: ${props.price}</p>
          <p>discount: {props.discountPercentage}%</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
