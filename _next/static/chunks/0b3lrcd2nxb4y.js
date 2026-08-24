(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,76741,(e,t,r)=>{"use strict";var i=e.r(99161);function s(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var r=2;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function o(){}var n={d:{f:o,r:function(){throw Error(s(522))},D:o,C:o,L:o,m:o,X:o,S:o,M:o},p:0,findDOMNode:null},l=Symbol.for("react.portal"),a=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){return"font"===e?"":"string"==typeof t?"use-credentials"===t?t:"":void 0}r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=n,r.createPortal=function(e,t){var r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!t||1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType)throw Error(s(299));return function(e,t,r){var i=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:l,key:null==i?null:""+i,children:e,containerInfo:t,implementation:r}}(e,t,null,r)},r.flushSync=function(e){var t=a.T,r=n.p;try{if(a.T=null,n.p=2,e)return e()}finally{a.T=t,n.p=r,n.d.f()}},r.preconnect=function(e,t){"string"==typeof e&&(t=t?"string"==typeof(t=t.crossOrigin)?"use-credentials"===t?t:"":void 0:null,n.d.C(e,t))},r.prefetchDNS=function(e){"string"==typeof e&&n.d.D(e)},r.preinit=function(e,t){if("string"==typeof e&&t&&"string"==typeof t.as){var r=t.as,i=d(r,t.crossOrigin),s="string"==typeof t.integrity?t.integrity:void 0,o="string"==typeof t.fetchPriority?t.fetchPriority:void 0;"style"===r?n.d.S(e,"string"==typeof t.precedence?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:o}):"script"===r&&n.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:o,nonce:"string"==typeof t.nonce?t.nonce:void 0})}},r.preinitModule=function(e,t){if("string"==typeof e)if("object"==typeof t&&null!==t){if(null==t.as||"script"===t.as){var r=d(t.as,t.crossOrigin);n.d.M(e,{crossOrigin:r,integrity:"string"==typeof t.integrity?t.integrity:void 0,nonce:"string"==typeof t.nonce?t.nonce:void 0})}}else null==t&&n.d.M(e)},r.preload=function(e,t){if("string"==typeof e&&"object"==typeof t&&null!==t&&"string"==typeof t.as){var r=t.as,i=d(r,t.crossOrigin);n.d.L(e,r,{crossOrigin:i,integrity:"string"==typeof t.integrity?t.integrity:void 0,nonce:"string"==typeof t.nonce?t.nonce:void 0,type:"string"==typeof t.type?t.type:void 0,fetchPriority:"string"==typeof t.fetchPriority?t.fetchPriority:void 0,referrerPolicy:"string"==typeof t.referrerPolicy?t.referrerPolicy:void 0,imageSrcSet:"string"==typeof t.imageSrcSet?t.imageSrcSet:void 0,imageSizes:"string"==typeof t.imageSizes?t.imageSizes:void 0,media:"string"==typeof t.media?t.media:void 0})}},r.preloadModule=function(e,t){if("string"==typeof e)if(t){var r=d(t.as,t.crossOrigin);n.d.m(e,{as:"string"==typeof t.as&&"script"!==t.as?t.as:void 0,crossOrigin:r,integrity:"string"==typeof t.integrity?t.integrity:void 0})}else n.d.m(e)},r.requestFormReset=function(e){n.d.r(e)},r.unstable_batchedUpdates=function(e,t){return e(t)},r.useFormState=function(e,t,r){return a.H.useFormState(e,t,r)},r.useFormStatus=function(){return a.H.useHostTransitionStatus()},r.version="19.2.8"},83164,(e,t,r)=>{"use strict";e.i(434),!function e(){if("u">typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),t.exports=e.r(76741)},81768,e=>{"use strict";var t=e.i(99161),r=e.i(37563),i=e.i(80447);let s=({svgRef:e,title:r,theme:s,color:o,size:n,...l})=>{let a=(0,t.useId)(),d=r?l.titleId||a:void 0,c=!d||void 0;return(0,i.jsxs)("svg",{"aria-hidden":c,"aria-labelledby":d,fill:"currentColor",height:24,ref:e,stroke:"currentColor",strokeWidth:"0",viewBox:"0 0 24 24",width:24,...l,children:[r?(0,i.jsx)("title",{id:d,children:r}):null,(0,i.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),(0,i.jsx)("path",{d:"M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m1 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1m3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1m0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1"})]})},o=(0,t.forwardRef)((e,t)=>(0,i.jsx)(s,{...e,svgRef:t})),n=(0,t.memo)((0,r.createStyledIcon)(o));n.displayName="AssignmentIcon",e.s(["AssignmentIcon",0,n])},96893,e=>{"use strict";var t=e.i(99161),r=e.i(37563),i=e.i(80447);let s=({svgRef:e,title:r,theme:s,color:o,size:n,...l})=>{let a=(0,t.useId)(),d=r?l.titleId||a:void 0,c=!d||void 0;return(0,i.jsxs)("svg",{"aria-hidden":c,"aria-labelledby":d,fill:"currentColor",height:24,ref:e,stroke:"currentColor",strokeWidth:"0",viewBox:"0 0 24 24",width:24,...l,children:[r?(0,i.jsx)("title",{id:d,children:r}):null,(0,i.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),(0,i.jsx)("path",{d:"M9 16.17 5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41z"})]})},o=(0,t.forwardRef)((e,t)=>(0,i.jsx)(s,{...e,svgRef:t})),n=(0,t.memo)((0,r.createStyledIcon)(o));n.displayName="CheckIcon",e.s(["CheckIcon",0,n])},74104,65696,e=>{"use strict";var t=e.i(99161),r=e.i(37563),i=e.i(80447);let s=({svgRef:e,title:r,theme:s,color:o,size:n,...l})=>{let a=(0,t.useId)(),d=r?l.titleId||a:void 0,c=!d||void 0;return(0,i.jsxs)("svg",{"aria-hidden":c,"aria-labelledby":d,fill:"currentColor",height:24,ref:e,stroke:"currentColor",strokeWidth:"0",viewBox:"0 0 24 24",width:24,...l,children:[r?(0,i.jsx)("title",{id:d,children:r}):null,(0,i.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),(0,i.jsx)("path",{d:"M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"})]})},o=(0,t.forwardRef)((e,t)=>(0,i.jsx)(s,{...e,svgRef:t})),n=(0,t.memo)((0,r.createStyledIcon)(o));n.displayName="CloseIcon",e.s(["CloseIcon",0,n],74104);let l=({svgRef:e,title:r,theme:s,color:o,size:n,...l})=>{let a=(0,t.useId)(),d=r?l.titleId||a:void 0,c=!d||void 0;return(0,i.jsxs)("svg",{"aria-hidden":c,"aria-labelledby":d,fill:"currentColor",height:24,ref:e,stroke:"currentColor",strokeWidth:"0",viewBox:"0 0 24 24",width:24,...l,children:[r?(0,i.jsx)("title",{id:d,children:r}):null,(0,i.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),(0,i.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1m1-8h-2V7h2z"})]})},a=(0,t.forwardRef)((e,t)=>(0,i.jsx)(l,{...e,svgRef:t})),d=(0,t.memo)((0,r.createStyledIcon)(a));d.displayName="InfoIcon",e.s(["InfoIcon",0,d],65696)},48320,17859,e=>{"use strict";var t=e.i(99161),r=e.i(37563),i=e.i(80447);let s=({svgRef:e,title:r,theme:s,color:o,size:n,...l})=>{let a=(0,t.useId)(),d=r?l.titleId||a:void 0,c=!d||void 0;return(0,i.jsxs)("svg",{"aria-hidden":c,"aria-labelledby":d,fill:"currentColor",height:24,ref:e,stroke:"currentColor",strokeWidth:"0",viewBox:"0 0 24 24",width:24,...l,children:[r?(0,i.jsx)("title",{id:d,children:r}):null,(0,i.jsx)("path",{d:"M24 0H0v24h24z",fill:"none"}),(0,i.jsx)("path",{d:"M6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58s4.1-.78 5.66-2.34c3.12-3.12 3.12-8.19 0-11.31l-4.95-4.95a.996.996 0 0 0-1.41 0zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1z"})]})},o=(0,t.forwardRef)((e,t)=>(0,i.jsx)(s,{...e,svgRef:t})),n=(0,t.memo)((0,r.createStyledIcon)(o));n.displayName="InvertColorsIcon",e.s(["InvertColorsIcon",0,n],48320);let l=({svgRef:e,title:r,theme:s,color:o,size:n,...l})=>{let a=(0,t.useId)(),d=r?l.titleId||a:void 0,c=!d||void 0;return(0,i.jsxs)("svg",{"aria-hidden":c,"aria-labelledby":d,fill:"currentColor",height:24,ref:e,stroke:"currentColor",strokeWidth:"0",viewBox:"0 0 24 24",width:24,...l,children:[r?(0,i.jsx)("title",{id:d,children:r}):null,(0,i.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),(0,i.jsx)("path",{d:"M13.25 3a9.003 9.003 0 0 0-9.26 9H2.2c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8c.32-.31.09-.85-.35-.85h-1.8c0-3.9 3.18-7.05 7.1-7 3.72.05 6.85 3.18 6.9 6.9.05 3.91-3.1 7.1-7 7.1-1.61 0-3.1-.55-4.28-1.48a.994.994 0 0 0-1.32.08c-.42.43-.39 1.13.08 1.5a8.93 8.93 0 0 0 5.52 1.9c5.05 0 9.14-4.17 9-9.26-.13-4.69-4.05-8.61-8.74-8.74m-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.33-.74-.75-.74"})]})},a=(0,t.forwardRef)((e,t)=>(0,i.jsx)(l,{...e,svgRef:t})),d=(0,t.memo)((0,r.createStyledIcon)(a));d.displayName="RestoreIcon",e.s(["RestoreIcon",0,d],17859)},42881,e=>{"use strict";var t=e.i(99161),r=e.i(37563),i=e.i(80447);let s=({svgRef:e,title:r,theme:s,color:o,size:n,...l})=>{let a=(0,t.useId)(),d=r?l.titleId||a:void 0,c=!d||void 0;return(0,i.jsxs)("svg",{"aria-hidden":c,"aria-labelledby":d,fill:"currentColor",height:24,ref:e,stroke:"currentColor",strokeWidth:"0",viewBox:"0 0 24 24",width:24,...l,children:[r?(0,i.jsx)("title",{id:d,children:r}):null,(0,i.jsx)("path",{d:"M0 0h24v24H0z",fill:"none"}),(0,i.jsx)("path",{d:"M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1"})]})},o=(0,t.forwardRef)((e,t)=>(0,i.jsx)(s,{...e,svgRef:t})),n=(0,t.memo)((0,r.createStyledIcon)(o));n.displayName="MenuIcon",e.s(["MenuIcon",0,n])},76224,e=>{"use strict";var t=e.i(99161),r=e.i(37563),i=e.i(80447);let s=({svgRef:e,title:r,theme:s,color:o,size:n,...l})=>{let a=(0,t.useId)(),d=r?l.titleId||a:void 0,c=!d||void 0;return(0,i.jsxs)("svg",{"aria-hidden":c,"aria-labelledby":d,fill:"currentColor",height:24,ref:e,stroke:"currentColor",strokeWidth:"0",viewBox:"0 0 24 24",width:24,...l,children:[r?(0,i.jsx)("title",{id:d,children:r}):null,(0,i.jsx)("path",{d:"M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3M12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1m1 4h-2v-2h2z"})]})},o=(0,t.forwardRef)((e,t)=>(0,i.jsx)(s,{...e,svgRef:t})),n=(0,t.memo)((0,r.createStyledIcon)(o));n.displayName="WarningIcon",e.s(["WarningIcon",0,n])},96224,57087,25934,e=>{"use strict";var t=e.i(80447),r=e.i(74104),i=e.i(99161),s=e.i(1431),o=e.i(17419),n=e.i(1304),l=e.i(30304),a=e.i(4292),d=e.i(81542);let c=(e,t,r)=>"object"==typeof e?h(e,t,r):"string"==typeof e||"number"==typeof e?u(e,r):[],u=(e,t)=>d.css`
  ${t}: ${e}
`,h=(e,t,r)=>Object.keys(e).sort((e,t)=>a.breakpointsOrder.indexOf(e)-a.breakpointsOrder.indexOf(t)).map(i=>d.css`
      ${t.breakpoints[i]} {
        ${""}
        ${u(e[i],r)}
      }
    `);var g=e.i(18995);let m=(0,d.default)(n.Box).withConfig({displayName:"styled.tsx__StyledGridItem",componentId:"sc-76bf419e-0"})`
  ${d.css`
  ${({$gridArea:e,theme:t})=>e&&c(e,t,"grid-area")};
  ${({$gridColumn:e,theme:t})=>e&&c(e,t,"grid-column")};
  ${({$gridColumnEnd:e,theme:t})=>e&&c(e,t,"grid-column-end")};
  ${({$gridColumnStart:e,theme:t})=>e&&c(e,t,"grid-column-start")};
  ${({$gridRow:e,theme:t})=>e&&c(e,t,"grid-row")};
  ${({$gridRowEnd:e,theme:t})=>e&&c(e,t,"grid-row-end")};
  ${({$gridRowStart:e,theme:t})=>e&&c(e,t,"grid-row-start")};
`}
`;m.defaultProps={theme:g.theme};let f=e=>{let{as:r,gridArea:i,gridColumn:s,gridColumnEnd:o,gridColumnStart:n,gridRow:l,gridRowEnd:a,gridRowStart:d,...c}=e;return(0,t.jsx)(m,{forwardedAs:r,...c,...function(e){let{gridArea:t,gridColumn:r,gridColumnEnd:i,gridColumnStart:s,gridRow:o,gridRowEnd:n,gridRowStart:l}=e;return{$gridArea:t,$gridColumn:r,$gridColumnEnd:i,$gridColumnStart:s,$gridRow:o,$gridRowEnd:n,$gridRowStart:l}}(e)})};e.s(["GridItem",0,f],57087);var p=e.i(87166);let y=(0,d.default)(n.Box).withConfig({displayName:"styled.tsx__StyledGrid",componentId:"sc-5ca71989-0"})`
  ${d.css`
  ${({$gridAreas:e,theme:t})=>e&&c(e,t,"grid-template-areas")};
  ${({$gridAutoColumns:e,theme:t})=>e&&c(e,t,"grid-auto-columns")};
  ${({$gridAutoFlow:e,theme:t})=>e&&c(e,t,"grid-auto-flow")};
  ${({$gridAutoRows:e,theme:t})=>e&&c(e,t,"grid-auto-rows")};
  ${({$gridColumns:e,theme:t})=>e&&c(e,t,"grid-template-columns")};
  ${({$gridGap:e,theme:t})=>c(e??t.spacing.medium,t,"gap")};
  ${({$gridColumnGap:e,theme:t})=>e&&c(e,t,"column-gap")};
  ${({$gridRows:e,theme:t})=>e&&c(e,t,"grid-template-rows")};
  ${({$gridRowGap:e,theme:t})=>e&&c(e,t,"row-gap")};
  ${({$gridTemplate:e,theme:t})=>e&&c(e,t,"grid-template")};
`}

  display: grid;

  ${(0,p.withDisplay)()}
`;y.defaultProps={theme:g.theme};let x=e=>{let{as:r,display:i,forwardedRef:s,gridAreas:o,gridAutoColumns:n,gridAutoFlow:l,gridAutoRows:a,gridColumns:d,gridColumnGap:c,gridGap:u,gridRows:h,gridRowGap:g,gridTemplate:m,...f}=e;return(0,t.jsx)(y,{$display:i,display:i,forwardedAs:r,ref:s,...f,...function(e){let{gridAreas:t,gridAutoColumns:r,gridAutoFlow:i,gridAutoRows:s,gridColumns:o,gridColumnGap:n,gridGap:l,gridRows:a,gridRowGap:d,gridTemplate:c}=e;return{$gridAreas:t,$gridAutoColumns:r,$gridAutoFlow:i,$gridAutoRows:s,$gridColumns:o,$gridColumnGap:n,$gridGap:l,$gridRows:a,$gridRowGap:d,$gridTemplate:c}}(e)})},v=(0,i.forwardRef)((e,r)=>(0,t.jsx)(x,{...e,forwardedRef:r}));e.s(["Grid",0,v],25934);var $=e.i(74474),j=e.i(13332);let b=(0,d.default)(v).withConfig({displayName:"styled.ts__StyledAlert",componentId:"sc-b6699699-0"})`
  ${({theme:e})=>e.shadow.floating}

  animation: ${({theme:e})=>e.keyframes.fadeIn} .5s ease-in-out;
  background-color: ${({theme:e})=>e.colors.white};
  grid-gap: ${({theme:e})=>e.spacing.small};
  max-width: ${({theme:e})=>e.helpers.remCalc(456)};
  padding: ${({theme:e})=>e.spacing.small};
  position: fixed;
  right: ${({theme:e})=>e.spacing.medium};
  top: ${({theme:e})=>e.spacing.medium};
  z-index: ${({theme:e})=>e.zIndex.fixed};

  ${({$onClose:e})=>e?d.css`
          grid-template-areas: 'icon messages close';
          grid-template-columns: ${({theme:e})=>`${e.spacing.xLarge} 1fr ${e.spacing.large}`};
        `:d.css`
          grid-template-areas: 'icon messages';
          grid-template-columns: ${({theme:e})=>`${e.spacing.xLarge} 1fr`};
        `}

  ${({theme:e,type:t})=>t&&(0,o.getBorderStyle)(t,e)};
`,w=(0,d.default)(j.StyleableH4).withConfig({displayName:"styled.ts__StyledHeader",componentId:"sc-b6699699-1"})`
  line-height: ${({theme:e})=>e.spacing.medium};
  margin-bottom: ${({theme:e})=>e.spacing.xxSmall};
`,I=(0,d.default)(j.StyleableSmall).attrs({as:"span"}).withConfig({displayName:"styled.ts__StyledMessageItem",componentId:"sc-b6699699-2"})`
  color: ${({theme:e})=>e.colors.secondary70};
  vertical-align: middle;
`,S=(0,d.default)($.Link).withConfig({displayName:"styled.ts__StyledLink",componentId:"sc-b6699699-3"})`
  font-size: ${({theme:e})=>e.typography.fontSize.small};
  vertical-align: middle;
`;b.defaultProps={theme:g.theme},w.defaultProps={theme:g.theme},I.defaultProps={theme:g.theme},S.defaultProps={theme:g.theme};let C=(0,i.memo)(({className:e,style:a,header:d,messages:c=[],onClose:u,type:h="success",...g})=>{let m=(0,i.useId)(),p=(0,s.excludePaddingProps)(g),y=(0,i.useMemo)(()=>h&&(0,o.getMessagingIcon)(h),[h]),x=(0,i.useMemo)(()=>c.map(({text:e,link:r},i)=>(0,t.jsxs)(n.Box,{children:[(0,t.jsx)(I,{children:e})," ",r&&(0,t.jsx)(S,{external:r.external,href:r.href,target:r.target,children:r.text})]},i)),[c]),v=(0,i.useMemo)(()=>d&&(0,t.jsx)(w,{id:m,children:d}),[d,m]);return(0,t.jsxs)(b,{...p,$onClose:u,"aria-labelledby":d&&m,role:"alert",type:h,children:[(0,t.jsx)(f,{gridArea:"icon",children:y}),(0,t.jsxs)(f,{gridArea:"messages",children:[v,x]}),u&&(0,t.jsx)(f,{children:(0,t.jsx)(l.MessagingButton,{iconOnly:(0,t.jsx)(r.CloseIcon,{size:"large"}),onClick:u})})]})});e.s(["Alert",0,C],96224)},30304,e=>{"use strict";var t=e.i(18995),r=e.i(81542),i=e.i(59572);let s=i.StyleableButton,o=(0,r.default)(i.StyleableButton).withConfig({displayName:"private.ts__MessagingButton",componentId:"sc-ed9fbd3c-0"})`
  background-color: transparent;
  border: ${({theme:e})=>e.border.none};
  color: ${({theme:e})=>e.colors.secondary70};
  height: auto;
  min-width: auto;
  padding: ${({theme:e})=>e.spacing.none};

  &:active {
    background-color: ${({theme:e})=>e.colors.primary20};
  }

  &:focus {
    box-shadow: ${({theme:e})=>`0 0 0 ${e.spacing.xxSmall} ${e.colors.primary20}`};
  }

  &:hover:not(:active) {
    background-color: ${({theme:e})=>e.colors.primary10};
  }

  &[disabled] {
    color: ${({theme:e})=>e.colors.secondary30};
  }
`;o.defaultProps={theme:t.theme},e.s(["MessagingButton",0,o,"StyleableButton",0,s])},3209,e=>{"use strict";var t=e.i(80447),r=e.i(18995),i=e.i(16057),s=e.i(99161),o=e.i(81542);let n=o.createGlobalStyle`
  ${(0,i.normalize)()}

  body {
    font-family: ${({$fontFamily:e})=>e};
  }
`;e.s(["GlobalStyles",0,()=>{let e=(0,s.useContext)(o.ThemeContext)??r.theme;return(0,t.jsx)(n,{$fontFamily:e.typography.fontFamily})}])},7277,85588,69194,30134,e=>{"use strict";var t=e.i(80447),r=e.i(99161),i=e.i(1431);e.s(["isClient",0,!0,"isProduction",0,!0],85588);let s=e=>{};e.s(["warning",0,s],69194);var o=e.i(47085),n=e.i(18995),l=e.i(81542);let a=l.default.span.withConfig({displayName:"styled.tsx__StyledBadge",componentId:"sc-c9d9457-0"})`
  ${(0,o.withMargins)()};

  color: ${({theme:e})=>e.colors.white};
  border-radius: ${({theme:e})=>e.borderRadius.normal};
  display: inline-block;
  font-size: ${({theme:e})=>e.helpers.remCalc(12)};
  font-weight: ${({theme:e})=>e.typography.fontWeight.semiBold};
  line-height: ${({theme:e})=>e.lineHeight.small};
  text-align: center;
  text-transform: uppercase;
  vertical-align: middle;
  padding: 0 ${({theme:e})=>e.spacing.xSmall};

  ${({theme:e,$variant:t})=>"secondary"===t&&l.css`
      background-color: ${e.colors.secondary60};
    `}

  ${({theme:e,$variant:t})=>"success"===t&&l.css`
      background-color: ${e.colors.success50};
    `}

  ${({theme:e,$variant:t})=>"warning"===t&&l.css`
      color: ${e.colors.secondary70};
      background-color: ${e.colors.warning40};
    `}

  ${({theme:e,$variant:t})=>"danger"===t&&l.css`
      background-color: ${e.colors.danger40};
    `}

  ${({theme:e,$variant:t})=>"primary"===t&&l.css`
      background-color: ${e.colors.primary40};
    `}
`;a.defaultProps={theme:n.theme};let d=(0,r.memo)(e=>{let{className:r,style:i,label:s,variant:n,margin:l,marginTop:d,marginRight:c,marginBottom:u,marginLeft:h,marginVertical:g,marginHorizontal:m,...f}=e;return"string"==typeof s?(0,t.jsx)(a,{...f,...(0,o.toTransientMarginProps)(e),$variant:n??"secondary",children:s}):null});d.displayName="Badge",e.s(["Badge",0,d],30134);var c=e.i(1304),u=e.i(59572),h=e.i(65059),g=e.i(13332);let m=(0,l.default)(c.Box).withConfig({displayName:"styled.tsx__StyledPanel",componentId:"sc-cb69a69c-0"})`
  border-radius: ${({theme:e})=>e.borderRadius.none};

  ${({theme:e})=>e.breakpoints.tablet} {
    border-radius: ${({theme:e})=>e.borderRadius.normal};
  }
`,f=(0,l.default)(g.StyleableH2).withConfig({displayName:"styled.tsx__StyledH2",componentId:"sc-cb69a69c-1"})`
  flex-grow: 1;

  & ~ .bd-button {
    width: auto;
    margin-top: 0;
  }
`;m.defaultProps={theme:n.theme},f.defaultProps={theme:n.theme};let p=(0,r.memo)(({forwardedRef:e,...o})=>{let{action:n,children:l,description:a,header:p,headerId:y,badge:x,...v}=(0,i.excludePaddingProps)(o),{text:$,...j}=n??{};return(0,t.jsxs)(m,{marginBottom:"medium",...v,backgroundColor:"white",padding:{mobile:"medium",tablet:"xLarge"},ref:e,shadow:"raised",children:[(p||n)&&"string"==typeof p?(0,t.jsxs)(h.Flex,{flexDirection:"row",children:[!!p&&(0,t.jsxs)(f,{$marginBottom:"none",id:y,children:[p,x&&(0,t.jsx)(d,{marginLeft:"xSmall",...x})]}),n&&(0,t.jsx)(u.Button,{...j,children:$})]}):null,a?"string"==typeof a?(0,t.jsx)(g.Text,{color:"secondary60",marginBottom:"none",marginTop:p?"xxSmall":"none",children:a}):(0,r.isValidElement)(a)?a:void s("description must be either a string or a ReactNode."):null,void 0!==l&&(0,t.jsx)(c.Box,{marginTop:"medium",children:l})]})}),y=(0,r.forwardRef)(({className:e,style:r,...i},s)=>(0,t.jsx)(p,{...i,forwardedRef:s}));y.displayName="Panel",e.s(["Panel",0,y],7277)},99042,70871,e=>{"use strict";var t=e.i(80447),r=e.i(99161),i=e.i(96224);e.s(["AlertsManager",0,({manager:e})=>{let[s,o]=(0,r.useState)(null);if((0,r.useEffect)(()=>e.subscribe(o),[e]),!s)return null;let{key:n,autoDismiss:l,...a}=s;return(0,t.jsx)(i.Alert,{...a},n)}],99042);class s{alerts=[];counter=0;subscribers=[];timeout={};typeMap={error:0,warning:1,success:2,info:3};add=e=>{e.key&&this.containsKey(e.key)&&this.remove(e.key);let t=void 0===e.key?this.getUniqueId():e.key,r=()=>{"function"==typeof e.onClose&&e.onClose(),this.remove(t)},i={...e,key:t,onClose:r};return this.alerts=this.alerts.concat([i]).sort(this.sortAlerts),this.afterEvent(),t};clear=()=>{let e=this.alerts;return this.alerts=[],this.afterEvent(),e};remove=e=>{let t;return this.alerts=this.alerts.reduce((r,i)=>i.key===e?(t=i,r):[...r,i],[]),this.afterEvent(),t};subscribe=e=>(this.subscribers.push(e),()=>{this.subscribers=this.subscribers.filter(t=>t!==e)});afterEvent(){this.manageTimeout(),this.notifySubscribers()}manageTimeout(){let e=this.alerts[0]??null;this.timeout?.key!==e?.key&&(this.timeout&&(window.clearTimeout(this.timeout.id),this.timeout={}),e?.autoDismiss&&(this.timeout.key=e.key,this.timeout.id=window.setTimeout(e.onClose,5e3)))}notifySubscribers(){this.subscribers.forEach(e=>e(this.alerts[0]??null))}getUniqueId(){return this.counter+=1,`alert-${this.counter}`}sortAlerts=(e,t)=>this.typeMap[e.type]-this.typeMap[t.type];containsKey(e){return!!this.alerts.find(t=>t.key===e)}}e.s(["createAlertsManager",0,()=>new s],70871)},17419,e=>{"use strict";var t=e.i(80447),r=e.i(2198),i=e.i(17528),s=e.i(65696),o=e.i(76224),n=e.i(81542);e.s(["getActionVariant",0,e=>"primary"===e?"secondary":e,"getBorderStyle",0,(e,t)=>n.css`
  ${"success"===e&&n.css`
    border-left: ${t.spacing.xxSmall} solid ${t.colors.success};
  `};

  ${"error"===e&&n.css`
    border-left: ${t.spacing.xxSmall} solid ${t.colors.danger};
  `};

  ${"warning"===e&&n.css`
    border-left: ${t.spacing.xxSmall} solid ${t.colors.warning50};
  `};

  ${"info"===e&&n.css`
    border-left: ${t.spacing.xxSmall} solid ${t.colors.primary60};
  `};
`,"getMessagingIcon",0,(e,n)=>{let l=n?"large":"xLarge";switch(e){case"success":return(0,t.jsx)(r.CheckCircleIcon,{color:"success",size:l});case"error":return(0,t.jsx)(i.ErrorIcon,{color:"danger",size:l});case"warning":return(0,t.jsx)(o.WarningIcon,{color:"warning50",size:l});case"info":return(0,t.jsx)(s.InfoIcon,{color:"primary60",size:l})}}])},83603,e=>{"use strict";var t=e.i(80447),r=e.i(1304),i=e.i(65059),s=e.i(85287),o=e.i(79564),n=e.i(2198),l=e.i(17528);e.s(["GuidelinesTable",0,({recommended:e,discouraged:a})=>(0,t.jsxs)(t.Fragment,{children:[e.length>0&&(0,t.jsx)(o.StatefulTable,{columns:[{header:"Do",hash:"do",render:({recommend:e})=>e}],items:e.map(e=>({recommend:(0,t.jsxs)(i.Flex,{alignItems:"center",children:[(0,t.jsx)(s.FlexItem,{flexGrow:0,marginRight:"large",children:(0,t.jsx)(n.CheckCircleIcon,{color:"success"})}),(0,t.jsx)(s.FlexItem,{children:e})]})}))}),a.length>0&&(0,t.jsx)(r.Box,{marginTop:"xLarge",children:(0,t.jsx)(o.StatefulTable,{columns:[{header:"Don't",hash:"dont",render:({discourage:e})=>e}],items:a.map(e=>({discourage:(0,t.jsxs)(i.Flex,{alignItems:"center",children:[(0,t.jsx)(s.FlexItem,{flexGrow:0,marginRight:"large",children:(0,t.jsx)(l.ErrorIcon,{color:"danger"})}),(0,t.jsx)(s.FlexItem,{children:e})]})}))})})]})])},51969,e=>{"use strict";var t=e.i(80447),r=e.i(65059),i=e.i(13332),s=e.i(74474),o=e.i(60785),n=e.i(99161),l=e.i(77136),a=e.i(57115),d=e.i(95899),c=e.i(81542);let u=(0,c.default)(r.Flex).withConfig({displayName:"styled.tsx__StyledFlex",componentId:"sc-19f856ee-0"})`
  cursor: pointer;
  display: inline-flex;
  flex-direction: row;
`,h=({children:e,title:r})=>{let[s,o]=(0,n.useState)(!0),l=()=>o(!s);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(u,{alignItems:"center",marginBottom:"xSmall",onClick:l,onKeyDown:e=>{("Enter"===e.key||" "===e.key)&&l()},tabIndex:0,children:[s?(0,t.jsx)(a.ChevronRightIcon,{title:"Expand"}):(0,t.jsx)(d.ExpandMoreIcon,{title:"Collapse"}),(0,t.jsx)(i.Text,{children:r})]}),!s&&e]})},g=({type:e})=>(0,n.isValidElement)(e)&&e.type===s.Link?(0,t.jsx)(l.Code,{highlight:!1,children:e}):(0,t.jsx)(l.Code,{children:e}),m=e=>{let{types:r}=e;return Array.isArray(r)?r.map((e,i)=>(0,t.jsxs)(n.default.Fragment,{children:[(0,t.jsx)(g,{type:e}),i<r.length-1?" | ":null]},(0,n.isValidElement)(e)&&e.key?e.key:i)):(0,t.jsx)(g,{type:r})};e.s(["PropTable",0,e=>{let{collapsible:s,id:n,propList:a,title:d,inheritedProps:c,nativeElement:u}=e,g=()=>a.length>0?(0,t.jsxs)(o.TableFigure,{marginBottom:s||c?"xLarge":"none",children:[(0,t.jsx)(o.Table,{columns:[{header:"Prop name",hash:"propName",render:({name:e,required:r})=>(0,t.jsxs)("span",{style:{whiteSpace:"nowrap"},children:[(0,t.jsx)(l.Code,{primary:!0,children:e}),r?(0,t.jsx)("b",{children:" *"}):null]})},{header:"Type",hash:"type",render:({types:e})=>(0,t.jsx)(m,{types:e})},{header:"Default",hash:"default",render:({defaultValue:e})=>(0,t.jsx)(l.Code,{highlight:!1,children:e})},{header:"Description",hash:"description",width:"50%",render:({description:e})=>(0,t.jsx)(i.Text,{children:e})}],id:n,items:a}),(0,t.jsx)(i.Small,{marginTop:"xSmall",children:"Props ending with * are required"})]}):null;return s?(0,t.jsx)(h,{title:`${d} Props`,children:g()}):(0,t.jsxs)(t.Fragment,{children:[(()=>{if(u){let[e,r]=u;return(0,t.jsxs)(i.Text,{children:["Supports ",r," native ",(0,t.jsxs)(l.Code,{children:["<",e," />"]})," element attributes."]})}return null})(),g(),c?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.H3,{children:"Inherited"}),(0,t.jsx)(r.Flex,{flexDirection:"column",children:c})]}):null]})}],51969)}]);