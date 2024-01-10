import { RootState, } from 'app/store';

export const categoriesSelector = (state: RootState) => {
    const { 
      categories,
      categoriesStatus,
      moreCategoriesStatus,
      isCategoriesError,
      categoriesErrorMsg,
      categoriesPageTotal,
      currentCategoriesPage,
      currentCategoriesLimit,
      isMoreCategories,
      viewMoreCategories,
      categoriesClone,
      categorySearch
     } = state.category
    return {
      categories,
      categoriesStatus,
      moreCategoriesStatus,
      isCategoriesError,
      categoriesErrorMsg,
      categoriesPageTotal,
      currentCategoriesPage,
      currentCategoriesLimit,
      isMoreCategories,
      viewMoreCategories,
      categoriesClone,
      categorySearch
    }
  }
