import { homeFeed } from "services/home";
import { browseProducts } from "services/browse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveBuyRadarMemeberId } from "utils/helpers";

export const searchFromHeaderThunk = createAsyncThunk(
  "browse/searchFromHeader",
  async ({ body }: { body: any }) => {
    const { data } = await homeFeed({ body });
    saveBuyRadarMemeberId(data.member_id);
    return data;
  }
);

export const browseProductsThunk = createAsyncThunk(
  "browse/browseProducts",
  async ({ body }: { body: any }) => {
    // console.log("browseProductsThunk ===@@@@@@@ page", body.page);
    const { data } = await browseProducts({ body });
    return data;
  }
);
