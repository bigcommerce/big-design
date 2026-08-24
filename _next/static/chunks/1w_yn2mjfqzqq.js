(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,n)=>{"use strict";n._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,n)=>{"use strict";function o(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(o=function(e){return e?n:t})(e)}n._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=o(t);if(n&&n.has(e))return n.get(e);var i={__proto__:null},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var l=r?Object.getOwnPropertyDescriptor(e,s):null;l&&(l.get||l.set)?Object.defineProperty(i,s,l):i[s]=e[s]}return i.default=e,n&&n.set(e,i),i}},67327,(e,t,n)=>{"use strict";function o(e,t,n,o){return!1}e.i(434),Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"getDomainLocale",{enumerable:!0,get:function(){return o}}),e.r(13144),("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},48637,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0});var o={default:function(){return w},useLinkStatus:function(){return k}};for(var i in o)Object.defineProperty(n,i,{enumerable:!0,get:o[i]});let r=e.r(10375),s=e.r(80447),l=r._(e.r(99161)),c=e.r(30766),a=e.r(61148),d=e.r(98993),m=e.r(81677),u=e.r(74962),p=e.r(16262),f=e.r(7398),h=e.r(67327),g=e.r(66263),I=e.r(55279),y=new Set;function x(e,t,n,o){if(!("u"<typeof window)&&(0,a.isLocalURL)(t)){if(!o.bypassPrefetchedCheck){let i=t+"%"+n+"%"+(void 0!==o.locale?o.locale:"locale"in e?e.locale:void 0);if(y.has(i))return;y.add(i)}e.prefetch(t,n,o).catch(e=>{})}}function C(e){return"string"==typeof e?e:(0,d.formatUrl)(e)}let b=l.default.forwardRef(function(e,t){let n,o,{href:i,as:r,children:d,prefetch:y=null,passHref:b,replace:j,shallow:k,scroll:w,locale:v,onClick:D,onNavigate:P,onMouseEnter:_,onTouchStart:T,legacyBehavior:L=!1,transitionTypes:O,...B}=e;n=d,L&&("string"==typeof n||"number"==typeof n)&&(n=(0,s.jsx)("a",{children:n}));let S=l.default.useContext(p.RouterContext),E=!1!==y,{href:M,as:F}=l.default.useMemo(()=>{if(!S){let e=C(i);return{href:e,as:r?C(r):e}}let[e,t]=(0,c.resolveHref)(S,i,!0);return{href:e,as:r?(0,c.resolveHref)(S,r):t||e}},[S,i,r]),N=l.default.useRef(M),R=l.default.useRef(F);L&&(o=l.default.Children.only(n));let A=L?o&&"object"==typeof o&&o.ref:t,[$,G,U]=(0,f.useIntersection)({rootMargin:"200px"}),z=l.default.useCallback(e=>{(R.current!==F||N.current!==M)&&(U(),R.current=F,N.current=M),$(e)},[F,M,U,$]),q=(0,I.useMergedRef)(z,A);l.default.useEffect(()=>{!S||G&&E&&x(S,M,F,{bypassPrefetchedCheck:!1,locale:v})},[F,M,G,v,E,S?.locale,S]);let H={ref:q,onClick(e){L||"function"!=typeof D||D(e),L&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(e),!S||e.defaultPrevented||function(e,t,n,o,i,r,s,l,c){let d,{nodeName:m}=e.currentTarget;if(!("A"===m.toUpperCase()&&((d=e.currentTarget.getAttribute("target"))&&"_self"!==d||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,a.isLocalURL)(n)){i&&(e.preventDefault(),location.replace(n));return}e.preventDefault(),(()=>{if(c){let e=!1;if(c({preventDefault:()=>{e=!0}}),e)return}let e=s??!0;"beforePopState"in t?t[i?"replace":"push"](n,o,{shallow:r,locale:l,scroll:e}):t[i?"replace":"push"](o||n,{scroll:e})})()}}(e,S,M,F,j,k,w,v,P)},onMouseEnter(e){L||"function"!=typeof _||_(e),L&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),S&&x(S,M,F,{locale:v,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){L||"function"!=typeof T||T(e),L&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),S&&x(S,M,F,{locale:v,priority:!0,bypassPrefetchedCheck:!0})}};if((0,m.isAbsoluteUrl)(F))H.href=F;else if(!L||b||"a"===o.type&&!("href"in o.props)){let e=void 0!==v?v:S?.locale;H.href=S?.isLocaleDomain&&(0,h.getDomainLocale)(F,e,S?.locales,S?.domainLocales)||(0,g.addBasePath)((0,u.addLocale)(F,e,S?.defaultLocale))}return L?l.default.cloneElement(o,H):(0,s.jsx)("a",{...B,...H,children:n})}),j=(0,l.createContext)({pending:!1}),k=()=>(0,l.useContext)(j),w=b;("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},41662,(e,t,n)=>{t.exports=e.r(48637)},7398,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"useIntersection",{enumerable:!0,get:function(){return c}});let o=e.r(99161),i=e.r(11229),r="function"==typeof IntersectionObserver,s=new Map,l=[];function c({rootRef:e,rootMargin:t,disabled:n}){let a=n||!r,[d,m]=(0,o.useState)(!1),u=(0,o.useRef)(null),p=(0,o.useCallback)(e=>{u.current=e},[]);return(0,o.useEffect)(()=>{if(r){if(a||d)return;let n=u.current;if(n&&n.tagName)return function(e,t,n){let{id:o,observer:i,elements:r}=function(e){let t,n={root:e.root||null,margin:e.rootMargin||""},o=l.find(e=>e.root===n.root&&e.margin===n.margin);if(o&&(t=s.get(o)))return t;let i=new Map;return t={id:n,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=i.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e),elements:i},l.push(n),s.set(n,t),t}(n);return r.set(e,t),i.observe(e),function(){if(r.delete(e),i.unobserve(e),0===r.size){i.disconnect(),s.delete(o);let e=l.findIndex(e=>e.root===o.root&&e.margin===o.margin);e>-1&&l.splice(e,1)}}}(n,e=>e&&m(e),{root:e?.current,rootMargin:t})}else if(!d){let e=(0,i.requestIdleCallback)(()=>m(!0));return()=>(0,i.cancelIdleCallback)(e)}},[a,t,e,d,u.current]),[p,d,(0,o.useCallback)(()=>{m(!1)},[])]}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},55279,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"useMergedRef",{enumerable:!0,get:function(){return i}});let o=e.r(99161);function i(e,t){let n=(0,o.useRef)(null),i=(0,o.useRef)(null);return(0,o.useCallback)(o=>{if(null===o){let e=n.current;e&&(n.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(n.current=r(e,o)),t&&(i.current=r(t,o))},[e,t])}function r(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let n=e(t);return"function"==typeof n?n:()=>e(null)}}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"HeadManagerContext",{enumerable:!0,get:function(){return o}});let o=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"ImageConfigContext",{enumerable:!0,get:function(){return r}});let o=e.r(80763)._(e.r(99161)),i=e.r(3221),r=o.default.createContext(i.imageConfigDefault)},3221,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o={VALID_LOADERS:function(){return r},imageConfigDefault:function(){return s}};for(var i in o)Object.defineProperty(n,i,{enumerable:!0,get:o[i]});let r=["default","imgix","cloudinary","akamai","custom"],s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0});var o={DecodeError:function(){return I},MiddlewareNotFoundError:function(){return b},MissingStaticPage:function(){return C},NormalizeError:function(){return y},PageNotFoundError:function(){return x},SP:function(){return h},ST:function(){return g},WEB_VITALS:function(){return r},execOnce:function(){return s},getDisplayName:function(){return m},getLocationOrigin:function(){return a},getURL:function(){return d},isAbsoluteUrl:function(){return c},isResSent:function(){return u},loadGetInitialProps:function(){return f},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return j}};for(var i in o)Object.defineProperty(n,i,{enumerable:!0,get:o[i]});let r=["CLS","FCP","FID","INP","LCP","TTFB"];function s(e){let t,n=!1;return(...o)=>(n||(n=!0,t=e(...o)),t)}let l=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,c=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&l.test(e)};function a(){let{protocol:e,hostname:t,port:n}=window.location;return`${e}//${t}${n?":"+n:""}`}function d(){let{href:e}=window.location,t=a();return e.substring(t.length)}function m(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function u(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function f(e,t){let n=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await f(t.Component,t.ctx)}:{};let o=await e.getInitialProps(t);if(n&&u(n))return o;if(!o)throw Object.defineProperty(Error(`"${m(e)}.getInitialProps()" should resolve to an object. But found "${o}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return o}let h="u">typeof performance,g=h&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class I extends Error{}class y extends Error{}class x extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class C extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class b extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function j(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,n)=>{t.exports=e.r(25236)},12132,e=>{"use strict";var t=e.i(80447),n=e.i(77136),o=e.i(29636),i=e.i(51969);let r=[{name:"disabled",types:"boolean",defaultValue:"false",description:"Disables the toggle."},{name:"maxHeight",types:"number",defaultValue:"250",description:"Sets the max-height of the dropdown."},{name:"maxWidth",types:"number",description:"Sets the max-width (in px) of each dropdown item and enables word wrapping. Useful when item content may be long."},{name:"placement",types:["auto","auto-end","auto-start","bottom","bottom-end","bottom-start","left","left-end","left-start","right","right-end","right-start","top","top-end","top-start"],defaultValue:"bottom-start",description:(0,t.jsxs)(t.Fragment,{children:["Sets the placement of the ",(0,t.jsx)(n.Code,{primary:!0,children:"Dropdown"})," relative to the anchor."]})},{name:"positionFixed",defaultValue:"false",types:"boolean",description:(0,t.jsxs)(t.Fragment,{children:["If set, uses ",(0,t.jsx)(n.Code,{children:"position: fixed"})," instead of ",(0,t.jsx)(n.Code,{children:"position: absolute"})," to position the list."]})},{name:"items",types:"Array<DropdownItem | DropdownLinkItem> | Array<DropdownItemGroup>",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Accepts an array of ",(0,t.jsx)(n.Code,{children:"DropdownItems and DropdownLinkItems"}),". It also accept a"," ",(0,t.jsx)(n.Code,{children:"DropdownItemGroup"})," when you want to group items. See example for usage."]})},{name:"toggle",types:"ReactElement",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Element used as anchor. Toggles the ",(0,t.jsx)(n.Code,{primary:!0,children:"Dropdown"}),"."]})}],s=[{name:"actionType",types:["normal","destructive"],defaultValue:"normal",description:"Indicates whether your item's action is of normal or destructive nature."},{name:"content",types:"string",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Sets the text content of the ",(0,t.jsx)(n.Code,{children:"DropdownItem"}),"."]})},{name:"description",types:"string",description:(0,t.jsxs)(t.Fragment,{children:["Sets the content description of the ",(0,t.jsx)(n.Code,{children:"DropdownItem"}),"."]})},{name:"disabled",types:"boolean",description:"Sets the item to disabled."},{name:"hash",types:"string",description:"Stored hash of the item."},{name:"icon",types:(0,t.jsx)(o.NextLink,{href:"/icons",children:"Icon"}),description:(0,t.jsxs)(t.Fragment,{children:["Pass in an ",(0,t.jsx)(o.NextLink,{href:"/icons",children:"Icon"})," component to display to the left of the text."]})},{name:"onItemClick",types:"(item: DropdownItem): void",required:!0,description:"Returns the item object."},{name:"tooltip",types:"string",description:"Adds tooltip for disabled item."},{name:"type",types:"'text'",description:"Type of the item."}],l=[{name:"actionType",types:["normal","destructive"],defaultValue:"normal",description:"Indicates whether your item's action is of normal or destructive nature."},{name:"content",types:"string",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Sets the text content of the ",(0,t.jsx)(n.Code,{children:"DropdownLinkItem"}),"."]})},{name:"description",types:"string",description:(0,t.jsxs)(t.Fragment,{children:["Sets the content description of the ",(0,t.jsx)(n.Code,{children:"DropdownLinkItem"}),"."]})},{name:"disabled",types:"boolean",description:"Sets the item to disabled."},{name:"icon",types:(0,t.jsx)(o.NextLink,{href:"/icons",children:"Icon"}),description:(0,t.jsxs)(t.Fragment,{children:["Pass in an ",(0,t.jsx)(o.NextLink,{href:"/icons",children:"Icon"})," component to display to the left of the text."]})},{name:"tooltip",types:"string",description:(0,t.jsx)(t.Fragment,{children:"Adds tooltip for disabled item."})},{name:"type",types:"'link'",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Wraps the ",(0,t.jsx)(n.Code,{children:"content"})," in a ",(0,t.jsx)(o.NextLink,{href:"/link",children:"Link"})," component."]})},{name:"url",types:"string",required:!0,description:"Valid URL of a linked resource."},{name:"target",types:"'_blank'",description:"Indicates where to display the linked resource."}],c=[{name:"label",types:"string",description:"Sets the label for the group."},{name:"separated",types:"boolean",description:"If true, adds a line separator above the group."},{name:"items",types:"Array<DropdownItem | DropdownLinkItem>",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Accepts an array of ",(0,t.jsx)(n.Code,{children:"DropdownItems"})," and ",(0,t.jsx)(n.Code,{children:"DropdownLinkItems"}),". See"," ",(0,t.jsx)(o.NextLink,{href:{query:"implementation=item-groups"},children:"example"})," for usage."]})}];e.s(["DropdownItemGroupPropTable",0,e=>(0,t.jsx)(i.PropTable,{propList:c,title:"Dropdown[DropdownItemGroup]",...e}),"DropdownItemPropTable",0,e=>(0,t.jsx)(i.PropTable,{propList:s,title:"Dropdown[DropdownItem]",...e}),"DropdownLinkItemPropTable",0,e=>(0,t.jsx)(i.PropTable,{propList:l,title:"Dropdown[DropdownLinkItem]",...e}),"DropdownPropTable",0,e=>(0,t.jsx)(i.PropTable,{propList:r,title:"Dropdown",...e})])},21908,e=>{"use strict";var t=e.i(80447),n=e.i(1304),o=e.i(23539),i=e.i(84033);let r=({routes:e,id:r})=>{let{activeContent:s,activePills:l,pills:c,handlePillClick:a}=((e,t)=>{let{query:n,push:o}=(0,i.useRouter)(),r=e.map(({render:e,...t})=>t),s=n[t],l=s&&!Array.isArray(s)?s:e[0].id;return{activeContent:e.find(e=>e.id===l),activePills:l?[l]:[],pills:r,handlePillClick:e=>{o({query:{...n,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,r);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.PillTabs,{activePills:l,items:c,onPillClick:a}),(0,t.jsx)(n.Box,{marginTop:"xSmall",children:s?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(r,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),n=e.i(81542);let o=n.css`
  color: ${({theme:e})=>e.colors.secondary70};
  font-size: ${({theme:e})=>e.typography.fontSize.medium};
  font-weight: ${({theme:e})=>e.typography.fontWeight.regular};
  line-height: ${({theme:e})=>e.lineHeight.medium};
  padding-left: ${({theme:e})=>e.spacing.xLarge};

  ${({theme:e})=>e.breakpoints.tablet} {
    column-count: ${({$columnCount:e})=>e};
    column-gap: ${({$columnGap:e})=>e};
  }

  ${({$reset:e,theme:t})=>e&&n.css`
      ${t.helpers.listReset};
    `}
`,i=n.default.ol.withConfig({displayName:"styled.tsx__StyledOrderedList",componentId:"sc-6a6922be-0"})`
  ${o};
`,r=n.default.ul.withConfig({displayName:"styled.tsx__StyledUnorderedList",componentId:"sc-6a6922be-1"})`
  ${o}
`,s=({columnCount:e=1,columnGap:n="normal",as:o="ul",children:s,reset:l,...c})=>(0,t.jsx)("ol"===o?i:r,{$columnCount:e,$columnGap:n,$reset:l,...c,children:s});s.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,s],52510)},29636,e=>{"use strict";var t=e.i(80447),n=e.i(41662),o=e.i(81542);let i=(0,o.default)(n.default).withConfig({displayName:"NextLink.tsx__StyledLink",componentId:"sc-72da42e3-0"})`
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
`;e.s(["NextLink",0,({children:e,href:n})=>(0,t.jsx)(i,{href:n,children:e})])},26698,e=>{"use strict";var t=e.i(80447),n=e.i(13332),o=e.i(7277),i=e.i(99161),r=e.i(77136),s=e.i(27746),l=e.i(21908),c=e.i(83603),a=e.i(52510),d=e.i(29636),m=e.i(12132);e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.H1,{children:"Dropdown"}),(0,t.jsxs)(o.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(n.Text,{children:[(0,t.jsx)(r.Code,{primary:!0,children:"Dropdowns"})," are toggleable, contextual overlays for displaying list of items from which a user can select one item. A selected item can be a link or an action."]}),(0,t.jsx)(n.Text,{bold:!0,children:"When to use:"}),(0,t.jsxs)(a.List,{children:[(0,t.jsx)(a.List.Item,{children:"Use to hide secondary actions or links in order to reduce distraction."}),(0,t.jsx)(a.List.Item,{children:"Use for a set of actions that don’t fit in the available screen space (including overflow)."}),(0,t.jsx)(a.List.Item,{children:"Use when actions’ names are very long or actions require additional description."})]})]}),(0,t.jsx)(o.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(l.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:[(0,t.jsx)(r.Code,{primary:!0,children:"Dropdowns"})," are toggleable, contextual overlays for displaying lists."]}),(0,t.jsx)(s.CodePreview,{children:`<Dropdown
  items={[
    {
      content: 'Edit',
      onItemClick: (item) => item,
      hash: 'edit',
      icon: <EditIcon />,
    },
    {
      content: 'Duplicate',
      onItemClick: (item) => item,
      hash: 'duplicate',
      icon: <FileCopyIcon />,
    },
    {
      content: 'Copy',
      onItemClick: (item) => item,
      hash: 'copy',
      icon: <AssignmentIcon />,
      disabled: true,
      tooltip: 'You cannot copy this item...',
    },
    {
      content: 'Delete',
      onItemClick: (item) => item,
      hash: 'delete',
      icon: <DeleteIcon />,
      actionType: 'destructive',
    },
    {
      content: 'Link',
      icon: <OpenInNewIcon />,
      type: 'link',
      url: '#',
    },
  ]}
  maxHeight={250}
  placement="bottom-start"
  toggle={<Button>Open menu</Button>}
/>`})]},"basic")},{id:"links",title:"Links",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["A ",(0,t.jsx)(r.Code,{primary:!0,children:"Dropdown"})," can render a list of"," ",(0,t.jsx)(d.NextLink,{href:"/link",children:"Links"})," if it receives an object of type"," ",(0,t.jsx)(r.Code,{children:"LinkItem"}),"."]}),(0,t.jsx)(s.CodePreview,{children:`<Dropdown
  items={[
    { content: 'Item', type: 'link', url: '#' },
    { content: 'Item', type: 'link', url: '#' },
    { content: 'Item', type: 'link', url: '#', target: '_blank' },
  ]}
  toggle={<Button>Button</Button>}
/>
`})]},"links")},{id:"icons",title:"Icons",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["An ",(0,t.jsx)(r.Code,{primary:!0,children:"item"})," accepts an ",(0,t.jsx)(d.NextLink,{href:"/icons",children:"Icon"})," ","component to render."]}),(0,t.jsx)(s.CodePreview,{children:`<Dropdown
  items={[
    { content: 'Item', icon: <EditIcon />, onItemClick: (item) => item },
    { content: 'Link', icon: <OpenInNewIcon />, type: 'link', url: '#' },
  ]}
  toggle={<Button>Button</Button>}
/>`})]},"icons")},{id:"action-types",title:"Action types",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["There are two action types: ",(0,t.jsx)(r.Code,{children:"normal"})," & ",(0,t.jsx)(r.Code,{children:"destructive"}),". They are used to indicate the nature of the action when hovering on the item."]}),(0,t.jsx)(s.CodePreview,{children:`<Dropdown
  items={[
    { content: 'Save', onItemClick: (item) => item, actionType: 'normal' },
    {
      content: 'Delete',
      onItemClick: (item) => item,
      actionType: 'destructive',
    },
  ]}
  toggle={<Button>Button</Button>}
/>`})]},"action-types")},{id:"toggle",title:"Toggle",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:[(0,t.jsx)(r.Code,{primary:!0,children:"Dropdown"})," can be anchored to any ",(0,t.jsx)(r.Code,{children:"ReactElement"}),", including all types of ",(0,t.jsx)(d.NextLink,{href:"/button",children:"Buttons"}),"."]}),(0,t.jsx)(s.CodePreview,{children:`<Grid gridColumns="repeat(4, min-content)">
  <Dropdown
    items={[
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
    ]}
    toggle={<Button>Button</Button>}
  />
  <Dropdown
    items={[
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
    ]}
    toggle={<Button actionType="destructive">Button</Button>}
  />

  <Dropdown
    items={[
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
    ]}
    toggle={<Button variant="secondary">Button</Button>}
  />

  <Dropdown
    items={[
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
    ]}
    toggle={<Button variant="subtle">Button</Button>}
  />
</Grid>`})]},"toggle")},{id:"placement",title:"Placement",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:[(0,t.jsx)(r.Code,{primary:!0,children:"Dropdown"})," can be anchored in different directions with the"," ",(0,t.jsx)(r.Code,{primary:!0,children:"placement"})," property. It will automatically find a placement if there's not enough space in the chosen direction."]}),(0,t.jsx)(s.CodePreview,{children:`<Grid gridColumns="repeat(4, min-content)">
  <Dropdown
    items={[
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
    ]}
    placement="right"
    toggle={<Button>Right</Button>}
  />
  <Dropdown
    items={[
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
    ]}
    placement="top"
    toggle={<Button>Top</Button>}
  />
  <Dropdown
    items={[
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
    ]}
    placement="bottom-start"
    toggle={<Button>Bottom-Start</Button>}
  />
  <Dropdown
    items={[
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
    ]}
    placement="bottom-end"
    toggle={<Button>Bottom-End</Button>}
  />
</Grid>`})]},"placement")},{id:"max-height",title:"Max height",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["Once the content is longer than the max-height, the"," ",(0,t.jsx)(r.Code,{primary:!0,children:"Dropdown"})," will be scrollable. It is possible to modify the dimension by passing a ",(0,t.jsx)(r.Code,{primary:!0,children:"maxHeight"})," property."]}),(0,t.jsx)(s.CodePreview,{children:`<Grid gridColumns="repeat(3, min-content)">
  <Dropdown
    items={[
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
    ]}
    toggle={<Button>Default</Button>}
  />
  <Dropdown
    items={[
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
    ]}
    maxHeight={150}
    toggle={<Button>Smaller</Button>}
  />
  <Dropdown
    items={[
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
      { content: 'Item', onItemClick: (item) => item },
    ]}
    maxHeight={350}
    toggle={<Button>Longer</Button>}
  />
</Grid>`})]},"max-height")},{id:"item-groups",title:"Item groups",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["Create ",(0,t.jsx)(r.Code,{primary:!0,children:"Dropdowns"})," with labeled groupings by passing"," ",(0,t.jsx)(r.Code,{primary:!0,children:"DropdownItemGroup"}),"'s to the Dropdown's"," ",(0,t.jsx)(r.Code,{primary:!0,children:"options"})," property."]}),(0,t.jsx)(s.CodePreview,{children:`<Dropdown
  items={[
    {
      label: 'Label 1',
      items: [
        { content: 'Option 1', onItemClick: (item) => item },
        { content: 'Option 2', onItemClick: (item) => item },
        { content: 'Option 3', onItemClick: (item) => item },
      ],
    },
    {
      label: 'Label 2',
      items: [
        { content: 'Option 4', onItemClick: (item) => item },
        { content: 'Option 5', onItemClick: (item) => item },
        { content: 'Option 6', onItemClick: (item) => item },
      ],
    },
  ]}
  toggle={<Button>Button</Button>}
/>`})]},"item-groups")},{id:"item-description",title:"Item description",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["It is possible to add a ",(0,t.jsx)(r.Code,{children:"description"})," for items."]}),(0,t.jsx)(s.CodePreview,{children:`<Dropdown
  items={[
    {
      hash: '1',
      content: 'Item #1',
      description: 'Description for option #1',
      onItemClick: (item) => item,
    },
    {
      content: 'Item #2',
      description: 'Description for item #2',
      disabled: true,
      type: 'link',
      url: '#',
    },
    { hash: '3', content: 'Item #3', onItemClick: (item) => item },
    { hash: '4', content: 'Item #4', onItemClick: (item) => item },
    { hash: '5', content: 'Item #5', onItemClick: (item) => item },
  ]}
  toggle={<Button>Button</Button>}
/>`})]},"Item description")}]})}),(0,t.jsx)(o.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(l.ContentRoutingTabs,{id:"props",routes:[{id:"dropdown",title:"Dropdown",render:()=>(0,t.jsx)(m.DropdownPropTable,{})},{id:"dropdown-item",title:"DropdownItem",render:()=>(0,t.jsx)(m.DropdownItemPropTable,{})},{id:"dropdown-link-item",title:"DropdownLinkItem",render:()=>(0,t.jsx)(m.DropdownLinkItemPropTable,{})},{id:"dropdown-item-group",title:"DropdownItemGroup",render:()=>(0,t.jsx)(m.DropdownItemGroupPropTable,{})}]})}),(0,t.jsx)(o.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(c.GuidelinesTable,{discouraged:["Avoid including complex information in a dropdown menu.",(0,t.jsxs)(t.Fragment,{children:["Don’t nest ",(0,t.jsx)(r.Code,{primary:!0,children:"Dropdowns"})," or use them to display complex information."]}),"Don’t use icons in dropdown items unless they provide additional and necessary context."],recommended:["Anchor the dropdown menu in the least obstructive position on the page.","Organize dropdown items in alphabetical order or by the most relevant content.","Use placeholder text by default if no selection has been made."]})})]})])},21147,(e,t,n)=>{let o="/dropdown";(window.__NEXT_P=window.__NEXT_P||[]).push([o,()=>e.r(26698)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([o])})}]);