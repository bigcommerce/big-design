(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,r)=>{"use strict";r._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,r)=>{"use strict";function o(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(o=function(e){return e?r:t})(e)}r._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=o(t);if(r&&r.has(e))return r.get(e);var n={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var l=i?Object.getOwnPropertyDescriptor(e,a):null;l&&(l.get||l.set)?Object.defineProperty(n,a,l):n[a]=e[a]}return n.default=e,r&&r.set(e,n),n}},67327,(e,t,r)=>{"use strict";function o(e,t,r,o){return!1}e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getDomainLocale",{enumerable:!0,get:function(){return o}}),e.r(13144),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},48637,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var o={default:function(){return k},useLinkStatus:function(){return P}};for(var n in o)Object.defineProperty(r,n,{enumerable:!0,get:o[n]});let i=e.r(10375),a=e.r(80447),l=i._(e.r(99161)),s=e.r(30766),d=e.r(61148),c=e.r(98993),u=e.r(81677),m=e.r(74962),p=e.r(16262),h=e.r(7398),f=e.r(67327),b=e.r(66263),y=e.r(55279),g=new Set;function x(e,t,r,o){if(!("u"<typeof window)&&(0,d.isLocalURL)(t)){if(!o.bypassPrefetchedCheck){let n=t+"%"+r+"%"+(void 0!==o.locale?o.locale:"locale"in e?e.locale:void 0);if(g.has(n))return;g.add(n)}e.prefetch(t,r,o).catch(e=>{})}}function v(e){return"string"==typeof e?e:(0,c.formatUrl)(e)}let w=l.default.forwardRef(function(e,t){let r,o,{href:n,as:i,children:c,prefetch:g=null,passHref:w,replace:C,shallow:P,scroll:k,locale:j,onClick:N,onNavigate:F,onMouseEnter:T,onTouchStart:E,legacyBehavior:S=!1,transitionTypes:O,..._}=e;r=c,S&&("string"==typeof r||"number"==typeof r)&&(r=(0,a.jsx)("a",{children:r}));let I=l.default.useContext(p.RouterContext),A=!1!==g,{href:L,as:R}=l.default.useMemo(()=>{if(!I){let e=v(n);return{href:e,as:i?v(i):e}}let[e,t]=(0,s.resolveHref)(I,n,!0);return{href:e,as:i?(0,s.resolveHref)(I,i):t||e}},[I,n,i]),W=l.default.useRef(L),M=l.default.useRef(R);S&&(o=l.default.Children.only(r));let U=S?o&&"object"==typeof o&&o.ref:t,[q,$,V]=(0,h.useIntersection)({rootMargin:"200px"}),D=l.default.useCallback(e=>{(M.current!==R||W.current!==L)&&(V(),M.current=R,W.current=L),q(e)},[R,L,V,q]),z=(0,y.useMergedRef)(D,U);l.default.useEffect(()=>{!I||$&&A&&x(I,L,R,{bypassPrefetchedCheck:!1,locale:j})},[R,L,$,j,A,I?.locale,I]);let H={ref:z,onClick(e){S||"function"!=typeof N||N(e),S&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(e),!I||e.defaultPrevented||function(e,t,r,o,n,i,a,l,s){let c,{nodeName:u}=e.currentTarget;if(!("A"===u.toUpperCase()&&((c=e.currentTarget.getAttribute("target"))&&"_self"!==c||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,d.isLocalURL)(r)){n&&(e.preventDefault(),location.replace(r));return}e.preventDefault(),(()=>{if(s){let e=!1;if(s({preventDefault:()=>{e=!0}}),e)return}let e=a??!0;"beforePopState"in t?t[n?"replace":"push"](r,o,{shallow:i,locale:l,scroll:e}):t[n?"replace":"push"](o||r,{scroll:e})})()}}(e,I,L,R,C,P,k,j,F)},onMouseEnter(e){S||"function"!=typeof T||T(e),S&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),I&&x(I,L,R,{locale:j,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){S||"function"!=typeof E||E(e),S&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),I&&x(I,L,R,{locale:j,priority:!0,bypassPrefetchedCheck:!0})}};if((0,u.isAbsoluteUrl)(R))H.href=R;else if(!S||w||"a"===o.type&&!("href"in o.props)){let e=void 0!==j?j:I?.locale;H.href=I?.isLocaleDomain&&(0,f.getDomainLocale)(R,e,I?.locales,I?.domainLocales)||(0,b.addBasePath)((0,m.addLocale)(R,e,I?.defaultLocale))}return S?l.default.cloneElement(o,H):(0,a.jsx)("a",{..._,...H,children:r})}),C=(0,l.createContext)({pending:!1}),P=()=>(0,l.useContext)(C),k=w;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},41662,(e,t,r)=>{t.exports=e.r(48637)},7398,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useIntersection",{enumerable:!0,get:function(){return s}});let o=e.r(99161),n=e.r(11229),i="function"==typeof IntersectionObserver,a=new Map,l=[];function s({rootRef:e,rootMargin:t,disabled:r}){let d=r||!i,[c,u]=(0,o.useState)(!1),m=(0,o.useRef)(null),p=(0,o.useCallback)(e=>{m.current=e},[]);return(0,o.useEffect)(()=>{if(i){if(d||c)return;let r=m.current;if(r&&r.tagName)return function(e,t,r){let{id:o,observer:n,elements:i}=function(e){let t,r={root:e.root||null,margin:e.rootMargin||""},o=l.find(e=>e.root===r.root&&e.margin===r.margin);if(o&&(t=a.get(o)))return t;let n=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=n.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:n},l.push(r),a.set(r,t),t}(r);return i.set(e,t),n.observe(e),function(){if(i.delete(e),n.unobserve(e),0===i.size){n.disconnect(),a.delete(o);let e=l.findIndex(e=>e.root===o.root&&e.margin===o.margin);e>-1&&l.splice(e,1)}}}(r,e=>e&&u(e),{root:e?.current,rootMargin:t})}else if(!c){let e=(0,n.requestIdleCallback)(()=>u(!0));return()=>(0,n.cancelIdleCallback)(e)}},[d,t,e,c,m.current]),[p,c,(0,o.useCallback)(()=>{u(!1)},[])]}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},55279,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let o=e.r(99161);function n(e,t){let r=(0,o.useRef)(null),n=(0,o.useRef)(null);return(0,o.useCallback)(o=>{if(null===o){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=i(e,o)),t&&(n.current=i(t,o))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},51547,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HeadManagerContext",{enumerable:!0,get:function(){return o}});let o=e.r(80763)._(e.r(99161)).default.createContext({})},81677,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var o={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return w},MissingStaticPage:function(){return v},NormalizeError:function(){return g},PageNotFoundError:function(){return x},SP:function(){return f},ST:function(){return b},WEB_VITALS:function(){return i},execOnce:function(){return a},getDisplayName:function(){return u},getLocationOrigin:function(){return d},getURL:function(){return c},isAbsoluteUrl:function(){return s},isResSent:function(){return m},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return C}};for(var n in o)Object.defineProperty(r,n,{enumerable:!0,get:o[n]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){let t,r=!1;return(...o)=>(r||(r=!0,t=e(...o)),t)}let l=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,s=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&l.test(e)};function d(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=d();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function m(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let o=await e.getInitialProps(t);if(r&&m(r))return o;if(!o)throw Object.defineProperty(Error(`"${u(e)}.getInitialProps()" should resolve to an object. But found "${o}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return o}let f="u">typeof performance,b=f&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class g extends Error{}class x extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class v extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class w extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function C(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,r)=>{t.exports=e.r(25236)},21908,e=>{"use strict";var t=e.i(80447),r=e.i(1304),o=e.i(23539),n=e.i(84033);let i=({routes:e,id:i})=>{let{activeContent:a,activePills:l,pills:s,handlePillClick:d}=((e,t)=>{let{query:r,push:o}=(0,n.useRouter)(),i=e.map(({render:e,...t})=>t),a=r[t],l=a&&!Array.isArray(a)?a:e[0].id;return{activeContent:e.find(e=>e.id===l),activePills:l?[l]:[],pills:i,handlePillClick:e=>{o({query:{...r,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,i);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.PillTabs,{activePills:l,items:s,onPillClick:d}),(0,t.jsx)(r.Box,{marginTop:"xSmall",children:a?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(i,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),r=e.i(81542);let o=r.css`
  color: ${({theme:e})=>e.colors.secondary70};
  font-size: ${({theme:e})=>e.typography.fontSize.medium};
  font-weight: ${({theme:e})=>e.typography.fontWeight.regular};
  line-height: ${({theme:e})=>e.lineHeight.medium};
  padding-left: ${({theme:e})=>e.spacing.xLarge};

  ${({theme:e})=>e.breakpoints.tablet} {
    column-count: ${({$columnCount:e})=>e};
    column-gap: ${({$columnGap:e})=>e};
  }

  ${({$reset:e,theme:t})=>e&&r.css`
      ${t.helpers.listReset};
    `}
`,n=r.default.ol.withConfig({displayName:"styled.tsx__StyledOrderedList",componentId:"sc-6a6922be-0"})`
  ${o};
`,i=r.default.ul.withConfig({displayName:"styled.tsx__StyledUnorderedList",componentId:"sc-6a6922be-1"})`
  ${o}
`,a=({columnCount:e=1,columnGap:r="normal",as:o="ul",children:a,reset:l,...s})=>(0,t.jsx)("ol"===o?n:i,{$columnCount:e,$columnGap:r,$reset:l,...s,children:a});a.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,a],52510)},29636,e=>{"use strict";var t=e.i(80447),r=e.i(41662),o=e.i(81542);let n=(0,o.default)(r.default).withConfig({displayName:"NextLink.tsx__StyledLink",componentId:"sc-72da42e3-0"})`
  color: ${({theme:e})=>e.colors.primary};
  cursor: pointer;
  font-size: ${({theme:e})=>e.typography.fontSize.medium};
  font-weight: ${({theme:e})=>e.typography.fontWeight.regular};
  text-decoration: none;

  &:active {
    color: ${({theme:e})=>e.colors.primary70};
  }

  &:hover:not(:active) {
    color: ${({theme:e})=>e.colors.primary70};
  }
`;e.s(["NextLink",0,({children:e,href:r})=>(0,t.jsx)(n,{href:r,children:e})])},599,e=>{"use strict";var t=e.i(80447),r=e.i(13332),o=e.i(7277),n=e.i(42198),i=e.i(99161),a=e.i(77136),l=e.i(27746),s=e.i(21908),d=e.i(83603),c=e.i(52510),u=e.i(29636),m=e.i(51969);let p=[{name:"columns",types:[(0,t.jsx)(u.NextLink,{href:{hash:"worksheet-text-column-prop-table",query:{props:"text-column"}},children:"TextColumn"},"text"),(0,t.jsx)(u.NextLink,{href:{hash:"worksheet-number-column-prop-table",query:{props:"number-column"}},children:"NumberColumn"},"number"),(0,t.jsx)(u.NextLink,{href:{hash:"worksheet-checkbox-column-prop-table",query:{props:"checkbox-column"}},children:"CheckboxColumn"},"checkbox"),(0,t.jsx)(u.NextLink,{href:{hash:"worksheet-selectable-column-prop-table",query:{props:"selectable-column"}},children:"SelectableColumn"},"selectable"),(0,t.jsx)(u.NextLink,{href:{hash:"worksheet-modal-column-prop-table",query:{props:"modal-column"}},children:"ModalColumn"},"modal")],description:(0,t.jsxs)(t.Fragment,{children:["Columns will be of type"," ",(0,t.jsx)(u.NextLink,{href:{hash:"worksheet-text-column-prop-table",query:{props:"text-column"}},children:"TextColumn"})," ","by default."]}),required:!0},{name:"expandableRows",types:"[key: string]: Array<string | number>;",description:"Accepts an object with parent ids as keys and an array of child ids that will be hidden on render."},{name:"defaultExpandedRows",types:"Array<string | number>",description:"Accepts an array with parent ids that will be expanded by default."},{name:"disabledRows",types:"Array<string | number>",description:"Accepts an array with ids of rows that will be disabled."},{name:"items",types:"any[]",description:"The array of items to display.",required:!0},{name:"onChange",types:"(items: any[]) => void",description:"Returns the items that have been updated.",required:!0},{name:"onErrors",types:"(items: WorksheetError[]) => void",description:(0,t.jsxs)(t.Fragment,{children:["Returns an array of"," ",(0,t.jsx)(u.NextLink,{href:{hash:"worksheet-error-prop-table",query:{props:"error"}},children:"Error"})," ","when an error is present."]})},{name:"minWidth",types:"number",description:"Sets a min-width."},{name:"localization",types:"{ toggleRowExpanded: string }",description:"Overrides the label with localized text."}],h=[{name:"hash",types:"string",required:!0,description:"Unique identifier for the column value of each row. Used internally to identify and manage state values."},{name:"header",types:"string",required:!0,description:"Header for the column."},{name:"type",types:"text",defaultValue:"text",description:"Sets the cell type of the column."},{name:"formatting",types:"(value: any) => string",description:"Used to format the value of a cell."},{name:"validation",types:"(value: any) => boolean",description:"Will set a cell as invalid if it returns false."},{name:"notation",types:"(value: any, row: any; }) => { color: keyof Colors; description: string; } | undefined",description:"Used to provide a way to show additional notes/comments/instructions on a particular cell."},{name:"action",types:"{ icon: React.ReactElement; transform: (value: string | number) => string }",description:"Used to provide a way to show change the value of a cell and save it. The icon will be displayed in the cell."},{name:"disabled",types:"boolean",description:"Disables cell manipulation for the entire column."},{name:"enabled",types:"boolean",description:"Enables cell manipulation for the entire column even when a row is disabled."},{name:"width",types:["string","number"],description:"Sets column width."},{name:"tooltip",types:"string",description:"Tooltip for the worksheet column header."}],f=[{name:"hash",types:"string",required:!0,description:"Unique identifier for the column value of each row. Used internally to identify and manage state values."},{name:"header",types:"string",required:!0,description:"Header for the column."},{name:"type",types:"number",required:!0,description:"Sets the cell type of the column."},{name:"formatting",types:"(value: any) => string",description:"Used to format the value of a cell."},{name:"validation",types:"(value: any) => boolean",description:"Function to test the validity of the cell."},{name:"notation",types:"(value: any, row: any; }) => { color: keyof Colors; description: string; } | undefined",description:"Used to provide a way to show additional notes/comments/instructions on a particular cell."},{name:"action",types:"{ icon: React.ReactElement; transform: (value: string | number) => string }",description:"Used to provide a way to show change the value of a cell and save it. The icon will be displayed in the cell."},{name:"disabled",types:"boolean",description:"Disables cell manipulation for the entire column."},{name:"enabled",types:"boolean",description:"Enables cell manipulation for the entire column even when a row is disabled."},{name:"width",types:["string","number"],description:"Sets column width."},{name:"tooltip",types:"string",description:"Tooltip for the worksheet column header."}],b=[{name:"hash",types:"string",required:!0,description:"Unique identifier for the column value of each row. Used internally to identify and manage state values."},{name:"header",types:"string",required:!0,description:"Header for the column."},{name:"type",types:"checkbox",required:!0,description:"Sets the cell type of the column."},{name:"validation",types:"(value: any) => boolean",description:"Function to test the validity of the cell."},{name:"notation",types:"(value: any, row: any; }) => { color: keyof Colors; description: string; } | undefined",description:"Used to provide a way to show additional notes/comments/instructions on a particular cell."},{name:"disabled",types:"boolean",description:"Disables cell manipulation for the entire column."},{name:"enabled",types:"boolean",description:"Enables cell manipulation for the entire column even when a row is disabled."},{name:"width",types:["string","number"],description:"Sets column width."},{name:"tooltip",types:"string",description:"Tooltip for the worksheet column header."}],y=[{name:"hash",types:"string",required:!0,description:"Unique identifier for the column value of each row. Used internally to identify and manage state values."},{name:"header",types:"string",required:!0,description:"Header for the column."},{name:"type",types:"select",required:!0,description:"Sets the cell type of the column."},{name:"validation",types:"(value: any) => boolean",description:"Function to test the validity of the cell."},{name:"notation",types:"(value: any, row: any; }) => { color: keyof Colors; description: string; } | undefined",description:"Used to provide a way to show additional notes/comments/instructions on a particular cell."},{name:"config",types:(0,t.jsx)(u.NextLink,{href:{hash:"worksheet-selectable-config-prop-table",query:{props:"selectable-config"}},children:"SelectableConfig"}),description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(u.NextLink,{href:{hash:"worksheet-selectable-config-prop-table",query:{props:"selectable-config"}},children:"SelectableConfig"})," ","for usage."]})},{name:"disabled",types:"boolean",description:"Disables cell manipulation for the entire column."},{name:"enabled",types:"boolean",description:"Enables cell manipulation for the entire column even when a row is disabled."},{name:"width",types:["string","number"],description:"Sets column width."},{name:"tooltip",types:"string",description:"Tooltip for the worksheet column header."}],g=[{name:"hash",types:"string",required:!0,description:"Unique identifier for the column value of each row. Used internally to identify and manage state values."},{name:"header",types:"string",required:!0,description:"Header for the column."},{name:"type",types:"modal",required:!0,description:"Sets the cell type of the column."},{name:"formatting",types:"(value: any) => string",description:"Used to format the value of a cell."},{name:"validation",types:"(value: any) => boolean",description:"Function to test the validity of the cell."},{name:"notation",types:"(value: any, row: any; }) => { color: keyof Colors; description: string; } | undefined",description:"Used to provide a way to show additional notes/comments/instructions on a particular cell."},{name:"config",types:(0,t.jsx)(u.NextLink,{href:{hash:"worksheet-modal-config-prop-table",query:{props:"modal-config"}},children:"ModalConfig"}),description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(u.NextLink,{href:{hash:"worksheet-modal-config-prop-table",query:{props:"modal-config"}},children:"ModalConfig"})," ","for usage."]})},{name:"disabled",types:"boolean",description:"Disables cell manipulation for the entire column."},{name:"enabled",types:"boolean",description:"Enables cell manipulation for the entire column even when a row is disabled."},{name:"width",types:["string","number"],description:"Sets column width."},{name:"tooltip",types:"string",description:"Tooltip for the worksheet column header."}],x=[{name:"options",types:"Array<SelectOption> | Array<SelectOptionGroup>",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Accepts an array of ",(0,t.jsx)(a.Code,{children:"SelectOptions"})," or an array of"," ",(0,t.jsx)(a.Code,{children:"SelectOptionGroups"}),". See examples for usage."]})}],v=[{name:"cancelActionText",types:"string",defaultValue:"Cancel",description:"Sets custom text for cancel action."},{name:"header",types:"string",description:"Header for the column."},{name:"saveActionText",types:"string",defaultValue:"Save",description:"Sets custom text for save action."},{name:"render",types:"React.ComponentType",required:!0,description:"Content to render in Modal."}],w=[{name:"item",types:"any",description:"Item with errored cell."},{name:"error",types:"any[]",description:"Keys of cells with errors."}],C=e=>(0,t.jsx)(m.PropTable,{propList:p,title:"Worksheet",...e}),P=e=>(0,t.jsx)(m.PropTable,{propList:h,title:"Worksheet[TextColumn]",...e}),k=e=>(0,t.jsx)(m.PropTable,{propList:f,title:"Worksheet[NumberColumn]",...e}),j=e=>(0,t.jsx)(m.PropTable,{propList:b,title:"Worksheet[CheckboxColumn]",...e}),N=e=>(0,t.jsx)(m.PropTable,{propList:y,title:"Worksheet[SelectableColumn]",...e}),F=e=>(0,t.jsx)(m.PropTable,{propList:g,title:"Worksheet[ModalColumn]",...e}),T=e=>(0,t.jsx)(m.PropTable,{propList:x,title:"Worksheet[SelectableConfig]",...e}),E=e=>(0,t.jsx)(m.PropTable,{propList:v,title:"Worksheet[ModalConfig]",...e}),S=e=>(0,t.jsx)(m.PropTable,{propList:w,title:"Worksheet[Error]",...e}),O={0:"Category 0",1:"Category 1",2:"Category 2",3:"Category 3",4:"Category 4",5:"Category 5",6:"Category 6",7:"Category 7",8:"Category 8",9:"Category 9"},_=[{id:"0",value:0,label:"Category 0",children:[{id:"5",value:5,label:"Category 5",children:[{id:"9",value:9,label:"Category 9"}]}]},{id:"1",value:1,label:"Category 1",children:[{id:"6",value:6,label:"Category 6"}]},{id:"2",value:2,label:"Category 2"},{id:"3",value:3,label:"Category 3",children:[{id:"7",value:7,label:"Category 7"}]},{id:"4",value:4,label:"Category 4",children:[{id:"8",value:8,label:"Category 8"}]}],I=(e,r)=>(0,t.jsx)(n.StatefulTree,{defaultExpanded:["0","5","1"],defaultSelected:[String(e)],disabledNodes:["1"],nodes:_,onSelectionChange:e=>r(e[0]),selectable:"radio"});e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.H1,{children:"Worksheet"}),(0,t.jsxs)(o.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(a.Code,{primary:!0,children:"Worksheet"})," displays information about a collection of objects and allow the merchant to manage and edit object data."]}),(0,t.jsx)(r.Text,{bold:!0,children:"When to use:"}),(0,t.jsxs)(c.List,{children:[(0,t.jsx)(c.List.Item,{children:"To display and edit information across a large data set (e.x. products, customers, inventory, price lists)."}),(0,t.jsx)(c.List.Item,{children:"To quickly scan and compare information in order to identify patterns, transform data, or augment with additional details."}),(0,t.jsxs)(c.List.Item,{children:["Unlike ",(0,t.jsx)(a.Code,{primary:!0,children:"Tables"}),", a ",(0,t.jsx)(a.Code,{primary:!0,children:"Worksheet"})," component is actionable and interactive and should be used in situations where editing is the primary purpose."]})]})]}),(0,t.jsx)(o.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(s.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsx)(l.CodePreview,{scope:{CATEGORIES:O,CategoryTree:I,nodes:_},children:`function Example() {
  const columns: Array<WorksheetColumn<Product>> = [
    {
      hash: 'productName',
      header: 'Product name',
      validation: (value) => !!value,
      notation: (value) => {
        switch (value) {
          case 'Product 1':
            return {
              color: 'danger',
              description: 'Change value to 2',
            };

          case '2':
            return {
              color: 'warning40',
              description: 'To make it green change it to 3',
            };

          case '3':
            return {
              color: 'success',
              description: 'Value is equal 3',
            };
        }
      },
      width: 200,
      tooltip: 'Tooltip text',
    },
    { hash: 'isVisible', header: 'Visible', type: 'checkbox', width: 80 },
    { hash: 'otherField', header: 'Other field' },
    {
      hash: 'otherField2',
      header: 'Other field',
      type: 'select',
      config: {
        options: [
          { value: 'option-1', content: 'Option 1' },
          { value: 'option-2', content: 'Option 2' },
          { value: 'option-3', content: 'Option 3' },
        ],
      },
      validation: (value) => !!value,
      width: 200,
    },
    {
      hash: 'otherField3',
      header: 'Category',
      type: 'modal',
      config: {
        header: 'Choose categories',
        render: CategoryTree,
      },
      formatting: (value: number) => CATEGORIES[value],
    },
    {
      hash: 'numberField',
      header: 'Number field',
      type: 'number',
      formatting: (value: number) => \`$\${value}.00\`,
      validation: (value: number) =>
        typeof value === 'number' && !Number.isNaN(value),
      width: 100,
    },
  ];

  const items: Array<Partial<Product>> = [
    {
      id: 1,
      productName: 'Product 1',
      isVisible: true,
      otherField: 'Text',
      otherField2: 'option-1',
      otherField3: 2,
      numberField: 50,
    },
    {
      id: 2,
      productName: 'Product 2',
      isVisible: true,
      otherField: 'Text',
      otherField2: 'option-1',
      otherField3: 6,
      numberField: 50,
    },
    {
      id: 3,
      productName: 'Product 3',
    },
    {
      id: 4,
      productName: 'Variant 1',
      isVisible: true,
      otherField: 'Text',
      otherField2: 'option-2',
      otherField3: 9,
      numberField: 50,
    },
    {
      id: 5,
      productName: '',
      isVisible: true,
      otherField: 'Text',
      otherField2: '',
      otherField3: 4,
      numberField: 50,
    },
    {
      id: 6,
      productName: 'Variant 3',
      isVisible: true,
      otherField: 'Text',
      otherField2: '',
      otherField3: 3,
      numberField: 50,
    },
    {
      id: 7,
      productName: 'Variant 4',
      isVisible: false,
      otherField: 'Text',
      otherField2: 'option-2',
      otherField3: 4,
      numberField: 50,
    },
    {
      id: 8,
      productName: 'Product 4',
      isVisible: true,
      otherField: 'Text',
      otherField2: 'option-2',
      otherField3: 7,
      numberField: 50,
    },
    {
      id: 9,
      productName: 'Product 5',
      isVisible: true,
      otherField: 'Text',
      otherField2: 'option-2',
      otherField3: 3,
      numberField: 50,
    },
    {
      id: 10,
      productName: 'Product 6',
      isVisible: true,
      otherField: 'Text',
      otherField2: 'option-3',
      otherField3: 3,
      numberField: 50,
    },
  ];

  return (
    <Worksheet
      columns={columns}
      items={items}
      minWidth={900}
      onChange={(items) => items}
      onErrors={(items) => items}
    />
  );
}`},"basic")},{id:"text-columns",title:"Text columns",render:()=>(0,t.jsx)(l.CodePreview,{children:`function Example() {
  const columns: Array<WorksheetColumn<Partial<Product>>> = [
    {
      hash: 'productName',
      header: 'Product name',
      validation: (value) => !!value,
    },
    { hash: 'otherField', header: 'Other field' },
  ];

  const items: Array<Partial<Product>> = [
    {
      id: 1,
      productName: 'Product 1',
      otherField: 'Text',
    },
    {
      id: 2,
      productName: 'Product 2',
      otherField: 'Text',
    },
    {
      id: 3,
      productName: 'Product 3',
      otherField: 'Text',
    },
  ];

  return (
    <Worksheet
      columns={columns}
      items={items}
      onChange={(items) => items}
      onErrors={(items) => items}
    />
  );
}`},"text-columns")},{id:"number-columns",title:"Number columns",render:()=>(0,t.jsx)(l.CodePreview,{scope:{CATEGORIES:O,CategoryTree:I,nodes:_},children:`function Example() {
  const columns: Array<
    WorksheetColumn<{
      id: number;
      cost: number;
      stock: number;
      backorderLimit: number | 'Unlimited';
    }>
  > = [
    {
      hash: 'cost',
      header: 'Cost',
      type: 'number',
      formatting: (value: number) => \`$\${value}.00\`,
      validation: (value: number) =>
        typeof value === 'number' && !Number.isNaN(value),
    },
    {
      hash: 'stock',
      header: 'Stock',
      type: 'number',
      validation: (value: number) =>
        typeof value === 'number' && !Number.isNaN(value),
    },
    {
      hash: 'backorderLimit',
      header: 'Stock',
      type: 'number',
      validation: (value: number | string) =>
        typeof value === 'number' || value === 'Unlimited',
      action: {
        transform: () => 'Unlimited',
        icon: <AllInclusiveIcon />,
      },
    },
  ];

  const items: Array<{
    id: number;
    cost: number;
    stock: number;
    backorderLimit: number | 'Unlimited';
  }> = [
    {
      id: 1,
      cost: 100,
      stock: 3,
      backorderLimit: 'Unlimited',
    },
    {
      id: 2,
      cost: 200,
      stock: 10,
      backorderLimit: 'Unlimited',
    },
    {
      id: 3,
      cost: 300,
      stock: 5,
      backorderLimit: 100,
    },
  ];

  return (
    <Worksheet
      columns={columns}
      items={items}
      onChange={(items) => items}
      onErrors={(items) => items}
    />
  );
}`},"number-columns")},{id:"checkbox-columns",title:"Checkbox columns",render:()=>(0,t.jsx)(l.CodePreview,{children:`function Example() {
  const columns: Array<WorksheetColumn<Partial<Product>>> = [
    {
      hash: 'productName',
      header: 'Product name',
      validation: (value) => !!value,
    },
    { hash: 'isVisible', header: 'Visible', type: 'checkbox' },
  ];

  const items: Array<Partial<Product>> = [
    {
      id: 1,
      productName: 'Product 1',
      isVisible: true,
    },
    {
      id: 2,
      productName: 'Product 2',
      isVisible: false,
    },
    {
      id: 3,
      productName: 'Product 3',
      isVisible: false,
    },
  ];

  return (
    <Worksheet
      columns={columns}
      items={items}
      onChange={(items) => items}
      onErrors={(items) => items}
    />
  );
}`},"checkbox-columns")},{id:"selectable-columns",title:"Selectable columns",render:()=>(0,t.jsx)(l.CodePreview,{children:`function Example() {
  const columns: Array<WorksheetColumn<Partial<Product>>> = [
    {
      hash: 'productName',
      header: 'Product name',
      validation: (value) => !!value,
    },
    {
      hash: 'otherField2',
      header: 'Other field',
      type: 'select',
      config: {
        options: [
          { value: 'option-1', content: 'Option 1' },
          { value: 'option-2', content: 'Option 2' },
          { value: 'option-3', content: 'Option 3' },
        ],
      },
      validation: (value) => !!value,
    },
  ];

  const items: Array<Partial<Product>> = [
    {
      id: 1,
      productName: 'Product 1',
      otherField2: 'option-1',
    },
    {
      id: 2,
      productName: 'Product 2',
      otherField2: 'option-2',
    },
    {
      id: 3,
      productName: 'Product 3',
      otherField2: 'option-3',
    },
  ];

  return (
    <Worksheet
      columns={columns}
      items={items}
      onChange={(items) => items}
      onErrors={(items) => items}
    />
  );
}`},"selectable-columns")},{id:"modal-columns",title:"Modal columns",render:()=>(0,t.jsx)(l.CodePreview,{scope:{CATEGORIES:O,CategoryTree:I,nodes:_},children:`function Example() {
  const columns: Array<WorksheetColumn<Partial<Product>>> = [
    {
      hash: 'productName',
      header: 'Product name',
      validation: (value) => !!value,
    },
    {
      hash: 'otherField3',
      header: 'Category',
      type: 'modal',
      config: {
        header: 'Choose categories',
        render: CategoryTree,
      },
      formatting: (value: number) => CATEGORIES[value],
    },
  ];

  const items: Array<Partial<Product>> = [
    {
      id: 1,
      productName: 'Product 1',
      otherField3: 1,
    },
    {
      id: 2,
      productName: 'Product 2',
      otherField3: 2,
    },
    {
      id: 3,
      productName: 'Product 3',
      otherField3: 3,
    },
  ];

  return (
    <Worksheet
      columns={columns}
      items={items}
      onChange={(items) => items}
      onErrors={(items) => items}
    />
  );
}`},"modal-columns")},{id:"disabled-columns",title:"Disabled columns",render:()=>(0,t.jsx)(l.CodePreview,{children:`function Example() {
  const columns: Array<WorksheetColumn<Partial<Product>>> = [
    {
      hash: 'productName',
      header: 'Product name',
      validation: (value) => !!value,
    },
    { hash: 'otherField', header: 'Other field', disabled: true },
  ];

  const items: Array<Partial<Product>> = [
    {
      id: 1,
      productName: 'Product 1',
      otherField: 'Text',
    },
    {
      id: 2,
      productName: 'Product 2',
      otherField: 'Text',
    },
    {
      id: 3,
      productName: 'Product 3',
      otherField: 'Text',
    },
  ];

  return (
    <Worksheet
      columns={columns}
      items={items}
      onChange={(items) => items}
      onErrors={(items) => items}
    />
  );
}`},"disabled-columns")},{id:"expandable-rows",title:"Expandable rows",render:()=>(0,t.jsx)(l.CodePreview,{children:`function Example() {
  const columns: Array<WorksheetColumn<Partial<Product>>> = [
    {
      hash: 'productName',
      header: 'Product name',
      validation: (value) => !!value,
    },
    { hash: 'otherField', header: 'Other field' },
  ];

  const expandableRows = {
    2: [3],
    4: [5, 6],
  };

  const items: Array<Partial<Product>> = [
    {
      id: 1,
      productName: 'Product 1',
      otherField: 'Text',
    },
    {
      id: 2,
      productName: 'Product 2',
      otherField: 'Text',
    },
    {
      id: 3,
      productName: 'Product 3',
      otherField: 'Text',
    },
    {
      id: 4,
      productName: 'Product 4',
      otherField: 'Text',
    },
    {
      id: 5,
      productName: 'Product 5',
      otherField: 'Text',
    },
    {
      id: 6,
      productName: 'Product 6',
      otherField: 'Text',
    },
    {
      id: 7,
      productName: 'Product 7',
      otherField: 'Text',
    },
  ];

  return (
    <Worksheet
      columns={columns}
      defaultExpandedRows={[4]}
      expandableRows={expandableRows}
      items={items}
      onChange={(items) => items}
      onErrors={(items) => items}
    />
  );
}`},"expandable-rows")},{id:"virtualization",title:"Virtualization (1k rows)",render:()=>(0,t.jsx)(l.CodePreview,{scope:{useMemo:i.useMemo,useState:i.useState},children:`function Example() {
  const columns: Array<WorksheetColumn<Partial<Product>>> = [
    {
      hash: 'productName',
      header: 'Product name',
      validation: (value) => !!value,
      width: 200,
    },
    { hash: 'isVisible', header: 'Visible', type: 'checkbox', width: 80 },
    { hash: 'otherField', header: 'SKU', width: 160 },
    {
      hash: 'numberField',
      header: 'Price',
      type: 'number',
      formatting: (value: number) => \`$\${(value ?? 0).toFixed(2)}\`,
      width: 100,
    },
  ];

  const { items, expandableRows } = useMemo(() => {
    const VARIANT_COUNT = 1000;
    const builtItems: Array<Partial<Product>> = [];
    const childIds: number[] = [];

    builtItems.push({
      id: 1,
      productName: 'Product 1',
      isVisible: true,
      otherField: 'SKU-P0001',
      numberField: 99.99,
    });

    for (let c = 0; c < VARIANT_COUNT; c++) {
      const childId = c + 2;

      builtItems.push({
        id: childId,
        productName: \`Variant \${c + 1}\`,
        isVisible: c % 2 === 0,
        otherField: \`SKU-V\${String(childId).padStart(4, '0')}\`,
        numberField: Math.round((c + 1) * 4.99 * 10) / 10,
      });
      childIds.push(childId);
    }

    return { expandableRows: { 1: childIds }, items: builtItems };
  }, []);

  const [currentItems, setCurrentItems] = useState(items);

  const handleChange = (changedItems: Array<Partial<Product>>) => {
    const byId = new Map(changedItems.map((item) => [item.id, item]));

    setCurrentItems((prev) => prev.map((item) => byId.get(item.id) ?? item));
  };

  return (
    <Worksheet
      columns={columns}
      defaultExpandedRows={[1]}
      expandableRows={expandableRows}
      height={500}
      items={currentItems}
      onChange={handleChange}
    />
  );
}`},"virtualization")},{id:"disabled-rows",title:"Disabled rows",render:()=>(0,t.jsx)(l.CodePreview,{children:`function Example() {
  const columns: Array<WorksheetColumn<Partial<Product>>> = [
    {
      hash: 'productName',
      header: 'Product name',
      validation: (value) => !!value,
    },
    { hash: 'otherField', header: 'Other field' },
  ];

  const disabledRows = [2, 4];

  const items: Array<Partial<Product>> = [
    {
      id: 1,
      productName: 'Product 1',
      otherField: 'Text',
    },
    {
      id: 2,
      productName: 'Product 2',
      otherField: 'Text',
    },
    {
      id: 3,
      productName: 'Product 3',
      otherField: 'Text',
    },
    {
      id: 4,
      productName: 'Product 4',
      otherField: 'Text',
    },
    {
      id: 5,
      productName: 'Product 5',
      otherField: 'Text',
    },
  ];

  return (
    <Worksheet
      columns={columns}
      disabledRows={disabledRows}
      items={items}
      onChange={(items) => items}
      onErrors={(items) => items}
    />
  );
}`},"disabled-rows")}]})}),(0,t.jsx)(o.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(s.ContentRoutingTabs,{id:"props",routes:[{id:"worksheet",title:"Worksheet",render:()=>(0,t.jsx)(C,{})},{id:"text-column",title:"TextColumn",render:()=>(0,t.jsx)(P,{id:"worksheet-text-column-prop-table"})},{id:"number-column",title:"NumberColumn",render:()=>(0,t.jsx)(k,{id:"worksheet-number-column-prop-table"})},{id:"checkbox-column",title:"CheckboxColumn",render:()=>(0,t.jsx)(j,{id:"worksheet-checkbox-column-prop-table"})},{id:"selectable-column",title:"SelectableColumn",render:()=>(0,t.jsx)(N,{id:"worksheet-selectable-column-prop-table"})},{id:"modal-column",title:"ModalColumn",render:()=>(0,t.jsx)(F,{id:"worksheet-modal-column-prop-table"})},{id:"selectable-config",title:"SelectableConfig",render:()=>(0,t.jsx)(T,{id:"worksheet-selectable-config-prop-table"})},{id:"modal-config",title:"ModalConfig",render:()=>(0,t.jsx)(E,{id:"worksheet-modal-config-prop-table"})},{id:"error",title:"Error",render:()=>(0,t.jsx)(S,{id:"worksheet-error-prop-table"})}]})}),(0,t.jsx)(o.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(d.GuidelinesTable,{discouraged:[(0,t.jsxs)(t.Fragment,{children:["Never use the ",(0,t.jsx)(a.Code,{primary:!0,children:"Worksheet"})," component to display a simple list of related content. Instead use a ",(0,t.jsx)(u.NextLink,{href:"/table",children:"Table"}),"."]}),"Editing or actions should always be initiated directly on a cell.  Do not use the actions icon/menu."],recommended:[(0,t.jsxs)(t.Fragment,{children:["Always display a ",(0,t.jsx)(a.Code,{primary:!0,children:"Worksheet"})," component with collapsed side navigation."]}),"Column header names should use sentence case, be concise and describe the type of content displayed in that column.","Each row contains information related to a single entity.","Each cell contains either a single data point or groups of data from a multi-select interaction (e.g. categories).","Interactive elements per cell include: text/numerical input, subtle buttons which open a modal, checkboxes and drop downs.",(0,t.jsxs)(t.Fragment,{children:["Show the total number of items at the top of the ",(0,t.jsx)(a.Code,{primary:!0,children:"Worksheet"}),"."]}),(0,t.jsxs)(t.Fragment,{children:["Use the ",(0,t.jsx)(a.Code,{primary:!0,children:"Worksheet"})," for bulk editing actions."]}),(0,t.jsxs)(t.Fragment,{children:["A ",(0,t.jsx)(a.Code,{primary:!0,children:"Worksheet"})," should always be on it’s own page. Never combine a worksheet with other tables or panels of content."]})]})})]})],599)},76554,(e,t,r)=>{let o="/worksheet";(window.__NEXT_P=window.__NEXT_P||[]).push([o,()=>e.r(599)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([o])})}]);