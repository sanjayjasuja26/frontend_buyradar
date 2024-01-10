import { RootState, } from 'app/store';

export const cmsSelector = (state: RootState) => {
    const { 
        cmsStatus,
        cmsErrorMsg,
        cmsData 
    } = state.cms
  
    return {
      cmsStatus,
      cmsErrorMsg,
      cmsData
    }
}
