"use strict";(self.webpackChunkbuy_radar_react_types=self.webpackChunkbuy_radar_react_types||[]).push([[525,389],{116:function(e,r,t){t.d(r,{T:function(){return i}});var s=t(8175),c=t(184),i=function(){return(0,c.jsxs)(s.ZP,{speed:1,height:"100%",width:"100%",backgroundColor:"#ececec",foregroundColor:"#fafafa",viewBox:"0 0 400 80",children:[(0,c.jsx)("rect",{x:"0",y:"0",rx:"5",ry:"5",width:"120",height:"80"}),(0,c.jsx)("rect",{x:"130",y:"0",rx:"3",ry:"3",width:"250",height:"7"}),(0,c.jsx)("rect",{x:"130",y:"13",rx:"3",ry:"3",width:"150",height:"7"}),(0,c.jsx)("rect",{x:"130",y:"34",rx:"3",ry:"3",width:"120",height:"7"}),(0,c.jsx)("rect",{x:"130",y:"54",rx:"3",ry:"3",width:"100",height:"7"})]})}},9306:function(e,r,t){t.r(r);var s=t(1359),c=t(5885),i=t(9271),n=t(7023),a=t(87),o=t(3742),d=t(1238),l=t(1839),u=t(4740),m=t(2791),h=t(9338),x=t(9876),j=t(5974),g=t(4334),p=t(184);r.default=function(e){var r=e.countryName,t=e.className,P=e.isProductDetailRecommended,v=e.isWishlistRecommended,f=(0,m.useRef)(null),y=(0,i.k6)(),w=(0,u.T)(),M=(0,u.C)(a.LL),N=M.recommendedProducts,E=M.isRecommendedProductsError,k=M.recommendedProductsStatus,T=M.currentRecommendedProductsPage,R=M.recommendedProductsPageTotal,b=M.viewMoreRecommendedProducts;return(0,m.useEffect)((function(){w((0,n.If)({body:{platform:h.wT,page:T,country_name:r}}))}),[]),(0,l.Z)({products:N,status:k,ref:f,currentPage:T,totalPages:R,isElementXPercentInViewport:d.MM,viewMore:o.vF,Thunk:n.If,ThunkBody:null,countryName:r,isViewMoreDispatch:!0}),(0,p.jsxs)(c.$0,{className:"toprated-sec ".concat(t),children:[(0,p.jsxs)("div",{className:"custom-container",children:[(0,p.jsx)("div",{className:"heading",children:(0,p.jsx)("h2",{children:(0,p.jsx)(g.Z,{text:"product.recommended"})})}),(0,p.jsxs)("div",{className:"recommendedproducts",children:["loading"!==k||E?null:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(x.$,{}),(0,p.jsx)("div",{style:{paddingTop:"40px",width:"100%"}}),(0,p.jsx)(x.$,{})]}),"failed"===k&&E?(0,p.jsx)(j.Z,{}):null,!E&&(null===N||void 0===N?void 0:N.length)>0?N.map((function(e,r){return(0,p.jsx)(s.Z,{product:e,onClick:function(r){y.push({pathname:"/product/".concat(e.id),state:{title:e.name?"BuyRadar - ".concat(e.name):"BuyRadar"}})},isWishlistRecommended:v,isProductDetailRecommended:P,isBrowse:!1},e.id)})):null,b?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(x.$,{}),(0,p.jsx)("div",{style:{paddingTop:"40px",width:"100%"}}),(0,p.jsx)(x.$,{})]}):null]})]}),b?"":(0,p.jsx)("div",{ref:f})]})}},5974:function(e,r,t){var s=t(4334),c=t(8047),i=t(184);r.Z=function(){return(0,i.jsxs)("div",{className:"warning",children:[(0,i.jsx)(c.Ek,{}),(0,i.jsxs)("p",{children:[(0,i.jsx)(s.Z,{text:"global.somethingWentWrong"})," ",(0,i.jsx)("br",{}),(0,i.jsx)(s.Z,{text:"global.failedToFetch"})]})]})}},87:function(e,r,t){t.d(r,{CM:function(){return s},HO:function(){return i},LL:function(){return n},e2:function(){return c}});var s=function(e){var r=e.product;return{productDetailStatus:r.productDetailStatus,isProductDetailError:r.isProductDetailError,productDetailErrorMsg:r.productDetailErrorMsg,productDetail:r.productDetail,targetPriceStatus:r.targetPriceStatus,isTargetPriceError:r.isTargetPriceError,targetPriceErrorMsg:r.targetPriceErrorMsg,targetPrice:r.targetPrice,inCorrectPriceStatus:r.inCorrectPriceStatus,isIncorrectPriceError:r.isIncorrectPriceError,inCorrectPriceErrorMsg:r.inCorrectPriceErrorMsg,inCorrectPrice:r.inCorrectPrice}},c=function(e){var r=e.merchant;return{merchantsStatus:r.merchantsStatus,isMerchantsError:r.isMerchantsError,merchantsErrorMsg:r.merchantsErrorMsg,merchants:r.merchants,merchantsPageTotal:r.merchantsPageTotal,currentMerchantsPage:r.currentMerchantsPage,viewMoreMerchants:r.viewMoreMerchants,isMoreMerchants:r.isMoreMerchants,merchantListLimit:r.merchantListLimit,merchantTotalRecords:r.merchantTotalRecords}},i=function(e){var r=e.product;return{similarProductsStatus:r.similarProductsStatus,isSimilarProductsError:r.isSimilarProductsError,similarProductsErrorMsg:r.similarProductsErrorMsg,similarProducts:r.similarProducts,similarProductsPageTotal:r.similarProductsPageTotal,currentSimilarProductsPage:r.currentSimilarProductsPage,viewMoreSimilarProducts:r.viewMoreSimilarProducts,isMoreSimilarProducts:r.isMoreSimilarProducts}},n=function(e){var r=e.product;return{recommendedProductsStatus:r.recommendedProductsStatus,isRecommendedProductsError:r.isRecommendedProductsError,recommendedProductsErrorMsg:r.recommendedProductsErrorMsg,recommendedProducts:r.recommendedProducts,recommendedProductsPageTotal:r.recommendedProductsPageTotal,currentRecommendedProductsPage:r.currentRecommendedProductsPage,viewMoreRecommendedProducts:r.viewMoreRecommendedProducts,isMoreRecommendedProducts:r.isMoreRecommendedProducts}}},6853:function(e,r,t){t.r(r),t.d(r,{default:function(){return w}});var s=t(5885),c=t(4165),i=t(5861),n=t(3481),a=t(8047),o=t(8410),d=t(4740),l=t(9271),u=t(3742),m=t(4334),h=t(184),x=function(e){var r=e.wish,t=(0,d.T)(),x=(0,l.k6)(),j=r.product,g=j.id,p=j.product_main_image,P=j.name,v=j.deal_type,f=j.soonest_delivery_date,y=j.soonest_pickup_date,w=j.supportLocalEconomy,M=j.currency_symbol,N=j.maxPrice,E=function(){var e=(0,i.Z)((0,c.Z)().mark((function e(){return(0,c.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t((0,o.I1)({body:{product_id:g}}));case 2:200===e.sent.payload.status_code&&t((0,u.Ce)({id:g,isWishlist:!1}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){x.push({pathname:"/product/".concat(g),state:{title:P?"BuyRadar - ".concat(P):"BuyRadar"}})};return(0,h.jsxs)("div",{className:"cartiner",children:[(0,h.jsx)("div",{className:"checkbox-imgtxt",children:(0,h.jsxs)("div",{className:"cartimgtxt",children:[(0,h.jsx)("div",{className:"cartimg pointer",onClick:function(){return k()},children:(0,h.jsx)(s.Ee,{src:p,alt:"wishlist_item_buyradar"})}),(0,h.jsxs)("div",{className:"carttxt",children:[(0,h.jsx)("div",{className:"cartxt-inr",children:(0,h.jsx)("h3",{onClick:function(){return k()},className:"pointer",children:P})}),w?(0,h.jsx)("div",{className:"whishplat",children:(0,h.jsx)(n.Bz,{})}):null,(0,h.jsxs)("div",{className:"singleitem-price",children:[(0,h.jsxs)("h3",{children:[M," ",N||0]}),"good"===v?(0,h.jsxs)("h4",{className:"gooddeal",children:[(0,h.jsx)(a.gL,{})," ",(0,h.jsx)(m.Z,{text:"product.goodDeal"})]}):"bad"===v?(0,h.jsxs)("h4",{className:"gooddeal goodreddeal",children:[(0,h.jsx)(a.Ot,{})," ",(0,h.jsx)(m.Z,{text:"product.badDeal"})]}):(0,h.jsxs)("h4",{className:"gooddeal goodpurpledeal",children:[(0,h.jsx)(a.bP,{}),"  ",(0,h.jsx)(m.Z,{text:"product.averageDeal"})]})]}),(0,h.jsxs)("div",{className:"pick-receive",children:[y&&(0,h.jsxs)("div",{className:"pick-receiveinr",children:[(0,h.jsxs)("div",{className:"pickrecevie-img pick-img",children:[(0,h.jsx)(a.uX,{}),(0,h.jsxs)("h3",{children:[(0,h.jsx)(m.Z,{text:"product.pickupAt"}),":"]})]}),(0,h.jsx)("h4",{children:y||(0,h.jsx)(m.Z,{text:"global.notAvailable"})})]}),f&&(0,h.jsxs)("div",{className:"pick-receiveinr",children:[(0,h.jsxs)("div",{className:"pickrecevie-img recevie-img",children:[(0,h.jsx)(a.rA,{}),(0,h.jsxs)("h3",{children:[(0,h.jsx)(m.Z,{text:"product.receiveBy"}),":"]})]}),(0,h.jsx)("h4",{children:f||(0,h.jsx)(m.Z,{text:"global.notAvailable"})})]})]})]})]})}),(0,h.jsx)("div",{className:"carticons",children:(0,h.jsx)("div",{className:"del-likeicon",children:(0,h.jsxs)("ul",{children:[(0,h.jsx)("li",{children:(0,h.jsx)(s.rU,{onClick:function(e){e.preventDefault(),k()},href:"/move-to-cart",className:"cart",children:(0,h.jsx)(a.to,{})})}),(0,h.jsx)("li",{children:(0,h.jsx)(s.rU,{onClick:function(e){e.preventDefault(),e.stopPropagation(),E()},href:"delete",className:"del",children:(0,h.jsx)(a.w,{})})})]})})})]})},j=t(2791),g=t(6806),p=t(9994),P=t(9306),v=t(116),f=t(109),y=t(9338),w=(0,p.Z)((function(e){var r=e.countryName,t=(0,d.T)(),c=(0,d.C)(g.WY),i=c.wishList,n=c.getWishListStatus,l=(0,d.C)(f.di);return(0,j.useEffect)((function(){l&&l.token&&t((0,o.xv)({body:{country_name:r,platform:y.wT}}))}),[l]),(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(s.$0,{className:"whishlistsec",children:(0,h.jsxs)("div",{className:"custom-container",children:[(0,h.jsx)(s.WB,{heading:"wishlist.myWishlist"}),(0,h.jsx)("div",{className:"whishlist-otr",children:"loading"===n?(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{className:"cartiner",children:(0,h.jsx)(v.T,{})}),(0,h.jsx)("div",{className:"cartiner",children:(0,h.jsx)(v.T,{})})]}):(0,h.jsx)(h.Fragment,{children:i.length?i.map((function(e){return(0,h.jsx)(x,{wish:e},e.product_id)})):(0,h.jsxs)("div",{className:"warning",children:[(0,h.jsx)(a.Ek,{}),(0,h.jsx)("p",{children:(0,h.jsx)(m.Z,{text:"wishlist.noItemsAddedInWishlist"})})]})})}),(0,h.jsx)(P.default,{countryName:r,className:"whishlist-sec",isProductDetailRecommended:!1,isWishlistRecommended:!0})]})})})}))},1839:function(e,r,t){var s=t(9439),c=t(9338),i=t(4740),n=t(2791),a=0;r.Z=function(e){var r=e.products,t=e.status,o=e.ref,d=e.currentPage,l=e.totalPages,u=e.isElementXPercentInViewport,m=e.viewMore,h=e.Thunk,x=e.ThunkBody,j=e.countryName,g=e.isViewMoreDispatch,p=(0,i.T)(),P=(0,n.useState)(!1),v=(0,s.Z)(P,2),f=v[0],y=v[1];(0,n.useEffect)((function(){return document.addEventListener("scroll",w,{passive:!0}),function(){document.removeEventListener("scroll",w),a=0}}),[f]);var w=function(){if(y(!f),r.length&&"idle"===t&&o&&o.current&&d<l&&function(){var e=document.documentElement.scrollTop||document.body.scrollTop;return e>0&&a<=e?(a=e,!0):(a=e,!1)}()&&u(o.current,10))if(g){p(m());var e=x||{platform:c.wT,page:d+1,country_name:j};p(h({body:e}))}else h()}}}}]);
//# sourceMappingURL=wish-list.38af3211.chunk.js.map