"use strict";(self.webpackChunkbuy_radar_react_types=self.webpackChunkbuy_radar_react_types||[]).push([[34],{7493:function(e,t,n){n.d(t,{P:function(){return C},Z:function(){return v}});var i=n(9439),o=n(1413),s=n(5885),a=n(5717),r=n(2791),A=n(4740),c=n(9277),l=n(3839),d=n(7937),u=n(8175),g=n(184),m=function(){var e=document.documentElement.clientWidth<=400?1:document.documentElement.clientWidth>400&&document.documentElement.clientWidth<=600?2:document.documentElement.clientWidth>600&&document.documentElement.clientWidth<=700?3:document.documentElement.clientWidth>700&&document.documentElement.clientWidth<=1e3?4:5;return(0,g.jsx)("div",{className:"d-flex h-100 w-100 my-3",children:Array.from(Array(e).keys()).map((function(e){return(0,g.jsx)(h,{},e)}))})},h=function(){return(0,g.jsx)("div",{className:"mx-3",children:(0,g.jsx)(u.ZP,{speed:1,width:"100%",height:"100%",viewBox:"0 0 20 20",backgroundColor:"#ececec",foregroundColor:"#fafafa",children:(0,g.jsx)("rect",{x:"0",y:"0",rx:"2",ry:"2",width:"100%",height:"100%"})})})},j=n(5974),f=n(4493),x=n(9271),v=function(e){var t=e.isHeading,n=e.slides,i=(e.loaderClassName,e.onClickSlideItem),u=e.selectedCategory,h=(0,A.C)(l.v),f=(h.categories,h.categoriesStatus),v=h.isCategoriesError,b=h.currentCategoriesLimit,p=h.currentCategoriesPage,y=h.categoriesPageTotal,k=h.categoriesClone,L=(h.categorySearch,(0,A.T)()),N=(0,x.TH)(),W=(0,x.k6)();(0,r.useEffect)((function(){k.length||L((0,c.g)({body:{search_keyword:"",page:1,per_page:b}}))}),[]),(0,r.useEffect)((function(){N&&N.state&&N.state.categoryId&&(console.log("selected category----"),L((0,d.se)({categoryId:N.state.categoryId})))}),[k.length]);var Z={dots:!1,infinite:!("/browse"===N.pathname),speed:500,slidesToScroll:1,responsive:[{breakpoint:1367,settings:{slidesToShow:n||4}},{breakpoint:1e3,settings:{slidesToShow:n?4:3}},{breakpoint:700,settings:{slidesToShow:n?3:2}},{breakpoint:599,settings:{slidesToShow:n?2:1}},{breakpoint:399,settings:{slidesToShow:1}}]};return(0,g.jsxs)("section",{className:"shopcategories-sec",children:[t?(0,g.jsx)(s.WB,{heading:"home.shobByCategories"}):null,(0,g.jsxs)("div",{className:"custom-container",children:["loading"===f?(0,g.jsx)("div",{className:"categories-slider slider",children:(0,g.jsx)(m,{})}):!v&&k.length&&(0,g.jsx)("div",{className:"categories-slider slider",id:"browse_cat",children:(0,g.jsxs)(a.Z,(0,o.Z)((0,o.Z)({},Z),{},{useTransform:!1,slidesToShow:n,children:[null===k||void 0===k?void 0:k.map((function(e){return(0,g.jsx)(C,{item:e,onClick:i,active:u===e.id,showImgLoader:!0},e.id)})),"/browse"===N.pathname&&p<y?(0,g.jsx)("div",{className:"topcollection-oter",onClick:function(){W.push("/category")},children:(0,g.jsx)("div",{className:"topcollection-image position-relative",children:(0,g.jsx)(s.Ee,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVkAAAEsCAIAAADmf1f+AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDRDMzkyODM5RERBMTFFQ0JDRDNCRkVDQ0YyRDZDRTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDRDMzkyODQ5RERBMTFFQ0JDRDNCRkVDQ0YyRDZDRTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNEMzOTI4MTlEREExMUVDQkNEM0JGRUNDRjJENkNFMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNEMzOTI4MjlEREExMUVDQkNEM0JGRUNDRjJENkNFMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps7o+X4AAAuXSURBVHja7NsP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fad83L595+JlNl38Y7IQw7hTl9PTiiNvGdRc6nv22a+/xrnnX5I+VZluLuZbiWf0/krZx7duddgndHrj3HbtdlZ9v1v94aQJLWgULrxocBo5scCOEZtny2Wn03W179AlH48cdWslF/C4kMakIy6YMeyHXXlDunKe2v3M4rPlLYNiOyodgW3bRVnihcQz503B+IllP15ZcmHf8I81JbOh4j/K/Hy7Eyv5C+SinXhiZx9ztl/wqRFX0XQQb99ZD/+69hLaq3+Fn4dp2/a4fBxr4+JvrVu78p47r09fJftkOTT5Vl+XU8+IX2Mcpu3GpYtfTLsGMYYP4F8Q9R9Yu4bPN/zynmJZed/ksZmTirdUmu25S7J3dlPZtkVORvSo5IW/uODJfE5KfhBacJClq3Q6zp87zmOpkvX51aPH5/2Cp+c+sm3blniXxwX51puGR1/ia/261cVkNCvcF0hTklSBdJD+1VP6kE+zPZ+PPOC1T/E7xZsmdfXpOyiv8G+5fmj85WMMr3hjyfhxI/NdkjFjJ1a4bRETkLw/Gichni1OSJyWODm3jxuRzskRnz2y0X6O2xqh6eo3YEjJFle+81eJC/pdHtfwNHTLbh+O+v5PSt73JdP14kbDSZ26fXQNcuqBvahLL7sqfbAyDBsxtuGBFyWKoqXHx6mo+/GhGNvFT0Pu01XfveXNN1/bvHFtfNV9tujUkGFjvPHMCxqdkq2Bks8dVzI1uO7GiXmaXfKmv3fKM2XvRxQfX/xEc8nuQH2L/H0q3h2s5ObogIFXxJW/ZDaRRCbiBe7vbGvCnTOKnzUsZuWuX/7epOBjUXXfQ0uqj2zTumXLqqoqp+NjEevYHe+8Xbt0P6XeJXpMd9N9tfYdutQd4Zs3rV++bGH6KMGxbdt16HhazC/qe9PHJDzfYI8YFbcnYi6dDqqrj63kg4/5qUoen15U68OOOLPXhXVfQtknj8n84kXzVr7+ytv/3RrT+JikdO7ypbpbJzHhz599aHi+EAuN1auWpjsmJ7TvFNOcA64b2e7du3fs3Lll6zYtAC2oaYE1AmC/ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQC0ANACQAsALQDQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtADQAkALAC0AtABACwAtALQA0AJACwAtALQAaEiLml9213AuoAmqGft7hn+LD3btem/n+zXfq6pyXqAJxiAKEB1osWvXrm3btx+yw2IBmqgIQfifAAMAKII9NPEwGpoAAAAASUVORK5CYII=",alt:"view-more-categories"})})}):null]}))}),"failed"===f&&v&&(0,g.jsx)(j.Z,{})]})]})},C=function(e){var t=e.item,n=e.onClick,o=e.active,a=(e.showImgLoader,e.isImgLoading),A=(0,r.useState)(!0),c=(0,i.Z)(A,2),l=c[0],d=c[1];return(0,r.useEffect)((function(){a&&a(l)}),[l,a]),(0,g.jsxs)("div",{className:"topcollection-oter",onClick:function(){return n(t.id)},children:[(0,g.jsxs)("div",{className:"topcollection-image position-relative",children:[l&&(0,g.jsx)(f.C,{showClass:!0}),(0,g.jsx)(s.Ee,{className:o?"category-active":"",src:t.category_image_name,alt:"buyradar_img",onLoad:function(){return d(!1)},onError:function(){return d(!1)}})]}),(0,g.jsx)("div",{className:"topcollection-text",children:(0,g.jsx)("h3",{children:t.category_name})})]})}},5974:function(e,t,n){var i=n(4334),o=n(8047),s=n(184);t.Z=function(){return(0,s.jsxs)("div",{className:"warning",children:[(0,s.jsx)(o.Ek,{}),(0,s.jsxs)("p",{children:[(0,s.jsx)(i.Z,{text:"global.somethingWentWrong"})," ",(0,s.jsx)("br",{}),(0,s.jsx)(i.Z,{text:"global.failedToFetch"})]})]})}},7004:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var i=n(9439),o=n(4740),s=n(8047),a=n(7493),r=n(3839),A=n(9277),c=n(5885),l=n(2791),d=n(9271),u=n(1238),g=n(1839),m=n(7937),h=n(9994),j=n(3168),f=n(8175),x=n(184),v=function(){var e=document.documentElement.clientWidth<=540?2:document.documentElement.clientWidth>540&&document.documentElement.clientWidth<=823?3:document.documentElement.clientWidth>823&&document.documentElement.clientWidth<=1024?4:5;return(0,x.jsx)(x.Fragment,{children:Array.from(Array(e).keys()).map((function(e){return(0,x.jsx)(C,{},e)}))})},C=function(){return(0,x.jsx)("div",{className:"topcollection-oter",children:(0,x.jsx)("div",{className:"topcollection-image position-relative",children:(0,x.jsx)(f.ZP,{speed:1,width:"100%",height:"100%",viewBox:"0 0 20 20",backgroundColor:"#ececec",foregroundColor:"#fafafa",children:(0,x.jsx)("rect",{x:"0",y:"0",rx:"2",ry:"2",width:"100%",height:"100%"})})})})},b=(0,h.Z)((function(e){var t=e.countryName,n=(e.countryCode,(0,l.useRef)(null)),h=(0,d.k6)(),f=(0,j.$)().t,C=(0,o.C)(r.v),b=C.categories,p=C.categoriesStatus,y=C.moreCategoriesStatus,k=(C.categoriesErrorMsg,C.categorySearch,C.isCategoriesError),L=C.currentCategoriesPage,N=C.viewMoreCategories,W=C.categoriesPageTotal,Z=C.currentCategoriesLimit,B=(0,o.T)(),Y=(0,l.useState)(""),Q=(0,i.Z)(Y,2),G=Q[0],E=Q[1],w=(0,l.useState)(!0),D=(0,i.Z)(w,2),F=D[0],R=D[1],I=(0,l.useCallback)((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";console.log("currentCategoriesLimit=",Z),B((0,A.g)({body:{search_keyword:t,page:e,per_page:Z}}))}),[B,Z]);(0,l.useEffect)((function(){B((0,m.xY)()),I(1)}),[B,I]),(0,g.Z)({products:b,status:p,ref:n,currentPage:L,totalPages:W,isElementXPercentInViewport:u.MM,viewMore:m.io,Thunk:A.g,ThunkBody:{search_keyword:G,page:L+1,per_page:10},countryName:t,isViewMoreDispatch:!0});return(0,l.useEffect)((function(){var e=setTimeout((function(){return e=G,void(new RegExp(/^\s.*\s$/).test(e)||I(1,e.trim()));var e}),575);return function(){return clearTimeout(e)}}),[G]),(0,x.jsxs)(c.$0,{className:"category-sec",children:[(0,x.jsxs)("div",{className:"custom-containerfluid",children:[(0,x.jsx)(c.WB,{heading:"home.categories"}),(0,x.jsx)("div",{className:"text-center",children:(0,x.jsxs)("div",{className:"searchbar desktop",children:[(0,x.jsx)("input",{type:"text",name:"search",value:G,className:"form-control",placeholder:f("category.searchCategory"),onChange:function(e){E(e.target.value)}}),(0,x.jsx)("button",{type:"submit",children:(0,x.jsx)(s.iR,{})})]})}),(0,x.jsx)("div",{id:"categories",className:"tab-pane browse-tabbinginner active my-4",children:(0,x.jsxs)("div",{className:"categories-outer",children:["loading"===p?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(v,{}),(0,x.jsx)(v,{})]}):"idle"===p&&b.length>0?(0,x.jsx)(x.Fragment,{children:b.map((function(e){return(0,x.jsx)(a.P,{item:e,onClick:function(){h.push({pathname:"/browse",search:"?shop-by=trending",state:{categoryId:e.id}})},showImgLoader:!0,isImgLoading:R},e.id)}))}):"","failed"===p&&k||"idle"===p&&!b.length?(0,x.jsxs)("div",{className:"warning",children:[(0,x.jsx)(s.Ek,{}),(0,x.jsxs)("p",{children:[f("global.somethingWentWrong"),(0,x.jsx)("br",{}),f("category.failedFetchCategoriesReloadPage")]})]}):"","loading"!==y||F?"":(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(v,{}),(0,x.jsx)(v,{})]})]})})]}),N&&"loading"===y?"":(0,x.jsx)("div",{ref:n})]})})),p=b},1839:function(e,t,n){var i=n(9439),o=n(9338),s=n(4740),a=n(2791),r=0;t.Z=function(e){var t=e.products,n=e.status,A=e.ref,c=e.currentPage,l=e.totalPages,d=e.isElementXPercentInViewport,u=e.viewMore,g=e.Thunk,m=e.ThunkBody,h=e.countryName,j=e.isViewMoreDispatch,f=(0,s.T)(),x=(0,a.useState)(!1),v=(0,i.Z)(x,2),C=v[0],b=v[1];(0,a.useEffect)((function(){return document.addEventListener("scroll",p,{passive:!0}),function(){document.removeEventListener("scroll",p),r=0}}),[C]);var p=function(){if(b(!C),t.length&&"idle"===n&&A&&A.current&&c<l&&function(){var e=document.documentElement.scrollTop||document.body.scrollTop;return e>0&&r<=e?(r=e,!0):(r=e,!1)}()&&d(A.current,10))if(j){f(u());var e=m||{platform:o.wT,page:c+1,country_name:h};f(g({body:e}))}else g()}}}}]);
//# sourceMappingURL=category.c210c6a9.chunk.js.map