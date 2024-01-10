import CategoriesSlider from "components/categoriesSlider";
import { useHistory } from "react-router-dom";

const ShopByCategories = () => {

  const history = useHistory();

  const selectCategoryHandler = (id: number) => {
    history.push({
      pathname: "/browse",
      search: "?shop-by=trending",
      state: { categoryId: id }
    })
  };

  return (
    <CategoriesSlider
      isHeading={true}
      slides={4}
      loaderClassName="width-75"
      onClickSlideItem={selectCategoryHandler}
    />
  );
};

export default ShopByCategories;
