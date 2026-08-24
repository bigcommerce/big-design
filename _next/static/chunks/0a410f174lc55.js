(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,n)=>{"use strict";n._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,n)=>{"use strict";function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}n._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=r(t);if(n&&n.has(e))return n.get(e);var i={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=o?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(i,a,s):i[a]=e[a]}return i.default=e,n&&n.set(e,i),i}},67327,(e,t,n)=>{"use strict";function r(e,t,n,r){return!1}e.i(434),Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"getDomainLocale",{enumerable:!0,get:function(){return r}}),e.r(13144),("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},48637,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0});var r={default:function(){return k},useLinkStatus:function(){return C}};for(var i in r)Object.defineProperty(n,i,{enumerable:!0,get:r[i]});let o=e.r(10375),a=e.r(80447),s=o._(e.r(99161)),l=e.r(30766),c=e.r(61148),u=e.r(98993),d=e.r(81677),p=e.r(74962),f=e.r(16262),m=e.r(7398),g=e.r(67327),h=e.r(66263),x=e.r(55279),y=new Set;function b(e,t,n,r){if(!("u"<typeof window)&&(0,c.isLocalURL)(t)){if(!r.bypassPrefetchedCheck){let i=t+"%"+n+"%"+(void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0);if(y.has(i))return;y.add(i)}e.prefetch(t,n,r).catch(e=>{})}}function P(e){return"string"==typeof e?e:(0,u.formatUrl)(e)}let j=s.default.forwardRef(function(e,t){let n,r,{href:i,as:o,children:u,prefetch:y=null,passHref:j,replace:v,shallow:C,scroll:k,locale:w,onClick:_,onNavigate:T,onMouseEnter:S,onTouchStart:O,legacyBehavior:L=!1,transitionTypes:E,...M}=e;n=u,L&&("string"==typeof n||"number"==typeof n)&&(n=(0,a.jsx)("a",{children:n}));let I=s.default.useContext(f.RouterContext),q=!1!==y,{href:R,as:D}=s.default.useMemo(()=>{if(!I){let e=P(i);return{href:e,as:o?P(o):e}}let[e,t]=(0,l.resolveHref)(I,i,!0);return{href:e,as:o?(0,l.resolveHref)(I,o):t||e}},[I,i,o]),$=s.default.useRef(R),N=s.default.useRef(D);L&&(r=s.default.Children.only(n));let A=L?r&&"object"==typeof r&&r.ref:t,[B,z,F]=(0,m.useIntersection)({rootMargin:"200px"}),U=s.default.useCallback(e=>{(N.current!==D||$.current!==R)&&(F(),N.current=D,$.current=R),B(e)},[D,R,F,B]),H=(0,x.useMergedRef)(U,A);s.default.useEffect(()=>{!I||z&&q&&b(I,R,D,{bypassPrefetchedCheck:!1,locale:w})},[D,R,z,w,q,I?.locale,I]);let W={ref:H,onClick(e){L||"function"!=typeof _||_(e),L&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),!I||e.defaultPrevented||function(e,t,n,r,i,o,a,s,l){let u,{nodeName:d}=e.currentTarget;if(!("A"===d.toUpperCase()&&((u=e.currentTarget.getAttribute("target"))&&"_self"!==u||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,c.isLocalURL)(n)){i&&(e.preventDefault(),location.replace(n));return}e.preventDefault(),(()=>{if(l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let e=a??!0;"beforePopState"in t?t[i?"replace":"push"](n,r,{shallow:o,locale:s,scroll:e}):t[i?"replace":"push"](r||n,{scroll:e})})()}}(e,I,R,D,v,C,k,w,T)},onMouseEnter(e){L||"function"!=typeof S||S(e),L&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),I&&b(I,R,D,{locale:w,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){L||"function"!=typeof O||O(e),L&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),I&&b(I,R,D,{locale:w,priority:!0,bypassPrefetchedCheck:!0})}};if((0,d.isAbsoluteUrl)(D))W.href=D;else if(!L||j||"a"===r.type&&!("href"in r.props)){let e=void 0!==w?w:I?.locale;W.href=I?.isLocaleDomain&&(0,g.getDomainLocale)(D,e,I?.locales,I?.domainLocales)||(0,h.addBasePath)((0,p.addLocale)(D,e,I?.defaultLocale))}return L?s.default.cloneElement(r,W):(0,a.jsx)("a",{...M,...W,children:n})}),v=(0,s.createContext)({pending:!1}),C=()=>(0,s.useContext)(v),k=j;("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},41662,(e,t,n)=>{t.exports=e.r(48637)},7398,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"useIntersection",{enumerable:!0,get:function(){return l}});let r=e.r(99161),i=e.r(11229),o="function"==typeof IntersectionObserver,a=new Map,s=[];function l({rootRef:e,rootMargin:t,disabled:n}){let c=n||!o,[u,d]=(0,r.useState)(!1),p=(0,r.useRef)(null),f=(0,r.useCallback)(e=>{p.current=e},[]);return(0,r.useEffect)(()=>{if(o){if(c||u)return;let n=p.current;if(n&&n.tagName)return function(e,t,n){let{id:r,observer:i,elements:o}=function(e){let t,n={root:e.root||null,margin:e.rootMargin||""},r=s.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=a.get(r)))return t;let i=new Map;return t={id:n,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=i.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e),elements:i},s.push(n),a.set(n,t),t}(n);return o.set(e,t),i.observe(e),function(){if(o.delete(e),i.unobserve(e),0===o.size){i.disconnect(),a.delete(r);let e=s.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&s.splice(e,1)}}}(n,e=>e&&d(e),{root:e?.current,rootMargin:t})}else if(!u){let e=(0,i.requestIdleCallback)(()=>d(!0));return()=>(0,i.cancelIdleCallback)(e)}},[c,t,e,u,p.current]),[f,u,(0,r.useCallback)(()=>{d(!1)},[])]}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},55279,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"useMergedRef",{enumerable:!0,get:function(){return i}});let r=e.r(99161);function i(e,t){let n=(0,r.useRef)(null),i=(0,r.useRef)(null);return(0,r.useCallback)(r=>{if(null===r){let e=n.current;e&&(n.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(n.current=o(e,r)),t&&(i.current=o(t,r))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let n=e(t);return"function"==typeof n?n:()=>e(null)}}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"HeadManagerContext",{enumerable:!0,get:function(){return r}});let r=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"ImageConfigContext",{enumerable:!0,get:function(){return o}});let r=e.r(80763)._(e.r(99161)),i=e.r(3221),o=r.default.createContext(i.imageConfigDefault)},3221,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={VALID_LOADERS:function(){return o},imageConfigDefault:function(){return a}};for(var i in r)Object.defineProperty(n,i,{enumerable:!0,get:r[i]});let o=["default","imgix","cloudinary","akamai","custom"],a={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0});var r={DecodeError:function(){return x},MiddlewareNotFoundError:function(){return j},MissingStaticPage:function(){return P},NormalizeError:function(){return y},PageNotFoundError:function(){return b},SP:function(){return g},ST:function(){return h},WEB_VITALS:function(){return o},execOnce:function(){return a},getDisplayName:function(){return d},getLocationOrigin:function(){return c},getURL:function(){return u},isAbsoluteUrl:function(){return l},isResSent:function(){return p},loadGetInitialProps:function(){return m},normalizeRepeatedSlashes:function(){return f},stringifyError:function(){return v}};for(var i in r)Object.defineProperty(n,i,{enumerable:!0,get:r[i]});let o=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){let t,n=!1;return(...r)=>(n||(n=!0,t=e(...r)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&s.test(e)};function c(){let{protocol:e,hostname:t,port:n}=window.location;return`${e}//${t}${n?":"+n:""}`}function u(){let{href:e}=window.location,t=c();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function f(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function m(e,t){let n=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await m(t.Component,t.ctx)}:{};let r=await e.getInitialProps(t);if(n&&p(n))return r;if(!r)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${r}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return r}let g="u">typeof performance,h=g&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class x extends Error{}class y extends Error{}class b extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class P extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class j extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function v(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,n)=>{t.exports=e.r(25236)},40520,e=>{"use strict";var t=e.i(80447),n=e.i(1304),r=e.i(10444),i=e.i(99161),o=e.i(61003),a=e.i(89618),s=e.i(68754);e.s(["CodeSnippet",0,e=>{let{children:l,language:c="tsx",showControls:u=!0}=e,{theme:d}=(0,i.useContext)(s.CodeEditorContext),p=function(e){let t,n;if("string"!=typeof e)throw Error("<CodeSnippet> children must be of type string");return""===(t=e.split("\n"))[0].trim()&&t.splice(0,1),""===t[t.length-1].trim()&&t.pop(),n=t[0].search(/\S|$/),t.map(e=>e.slice(n)).join("\n")}(l);return(0,t.jsxs)(n.Box,{border:"box",marginBottom:"xxLarge",children:[u&&(0,t.jsx)(a.SnippetControls,{copyToClipboard:()=>(0,r.default)(p),helperText:"Code example"}),(0,t.jsx)(o.Editor,{code:p,disabled:!0,language:c,style:{...d.plain,overflow:"auto"},theme:{...d,plain:{...d.plain,fontFamily:"monospace",whiteSpace:"pre-wrap"}}})]})}])},21908,e=>{"use strict";var t=e.i(80447),n=e.i(1304),r=e.i(23539),i=e.i(84033);let o=({routes:e,id:o})=>{let{activeContent:a,activePills:s,pills:l,handlePillClick:c}=((e,t)=>{let{query:n,push:r}=(0,i.useRouter)(),o=e.map(({render:e,...t})=>t),a=n[t],s=a&&!Array.isArray(a)?a:e[0].id;return{activeContent:e.find(e=>e.id===s),activePills:s?[s]:[],pills:o,handlePillClick:e=>{r({query:{...n,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,o);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.PillTabs,{activePills:s,items:l,onPillClick:c}),(0,t.jsx)(n.Box,{marginTop:"xSmall",children:a?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(o,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),n=e.i(81542);let r=n.css`
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
  ${r};
`,o=n.default.ul.withConfig({displayName:"styled.tsx__StyledUnorderedList",componentId:"sc-6a6922be-1"})`
  ${r}
`,a=({columnCount:e=1,columnGap:n="normal",as:r="ul",children:a,reset:s,...l})=>(0,t.jsx)("ol"===r?i:o,{$columnCount:e,$columnGap:n,$reset:s,...l,children:a});a.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,a],52510)},29636,e=>{"use strict";var t=e.i(80447),n=e.i(41662),r=e.i(81542);let i=(0,r.default)(n.default).withConfig({displayName:"NextLink.tsx__StyledLink",componentId:"sc-72da42e3-0"})`
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
`;e.s(["NextLink",0,({children:e,href:n})=>(0,t.jsx)(i,{href:n,children:e})])},41826,e=>{"use strict";var t=e.i(80447),n=e.i(13332),r=e.i(7277),i=e.i(99161),o=e.i(77136),a=e.i(27746),s=e.i(40520),l=e.i(21908),c=e.i(83603),u=e.i(52510),d=e.i(29636),p=e.i(51969);let f=[{name:"header",types:(0,t.jsx)(d.NextLink,{href:"/header",children:"Header"}),description:(0,t.jsxs)(t.Fragment,{children:["Pass in an optional ",(0,t.jsx)(d.NextLink,{href:"/header",children:"Header"})," component for displaying the page title and description."]})},{name:"message",types:(0,t.jsx)(d.NextLink,{href:"/message?props=inline-message",children:"MessageProps"}),description:(0,t.jsxs)(t.Fragment,{children:["An optional ",(0,t.jsx)(o.Code,{primary:!0,children:"Message"})," component for displaying alerts or notifications."]})},{name:"background",types:(0,t.jsx)(d.NextLink,{href:{hash:"props",query:{props:"background-props"}},children:"Background"}),description:"The background settings for the page, determining background color or image."},{name:"actionBar",types:(0,t.jsx)(d.NextLink,{href:"/action-bar",children:"ActionBar"}),description:(0,t.jsxs)(t.Fragment,{children:["Pass in an optional ",(0,t.jsx)(d.NextLink,{href:"/action-bar",children:"ActionBar"})," component for displaying action buttons at the bottom."]})}],m=e=>(0,t.jsx)(p.PropTable,{propList:f,title:"Page",...e}),g=[{name:"src",types:"string",description:"The URL of the background image.",required:!0},{name:"backgroundSize",types:["auto","length","cover","contain","initial","inherit"],defaultValue:"contain",description:(0,t.jsxs)(t.Fragment,{children:["Defines the size of the background image. Same as the"," ",(0,t.jsx)(o.Code,{highlight:!1,children:"background-size"})," CSS property."]})},{name:"backgroundPosition",types:["left top","left center","left bottom","right top","right center","right bottom","center top","center center","center bottom","x% y%","x-pos y-pos","initial","inherit"],defaultValue:"top right",description:(0,t.jsxs)(t.Fragment,{children:["Sets the position of the background image. Same as the"," ",(0,t.jsx)(o.Code,{highlight:!1,children:"background-position"})," CSS property."]})},{name:"backgroundRepeat",defaultValue:"no-repeat",types:["repeat","repeat-x","repeat-y","no-repeat","initial","inherit"],description:(0,t.jsxs)(t.Fragment,{children:["Specifies if/how the background image repeats. Same as the"," ",(0,t.jsx)(o.Code,{highlight:!1,children:"background-repeat"})," CSS property."]})}],h=e=>(0,t.jsx)(p.PropTable,{propList:g,title:"Page[Background]",...e});e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.H1,{children:"Page"}),(0,t.jsxs)(r.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(n.Text,{children:["The ",(0,t.jsx)(o.Code,{primary:!0,children:"Page"})," component serves as a high-level layout component that organizes the content of a page, including optional elements such as a"," ",(0,t.jsx)(o.Code,{primary:!0,children:"Header"}),", ",(0,t.jsx)(o.Code,{primary:!0,children:"Message"}),", and"," ",(0,t.jsx)(o.Code,{primary:!0,children:"ActionBar"}),". It ensures consistent spacing, background management, and placement of key UI elements."]}),(0,t.jsx)(n.Text,{bold:!0,children:"When to use:"}),(0,t.jsxs)(u.List,{children:[(0,t.jsx)(u.List.Item,{children:"To provide a container for the entire page structure, including header, content, messages, and action buttons."}),(0,t.jsx)(u.List.Item,{children:"To maintain consistency in page layout and background customization."})]})]}),(0,t.jsxs)(r.Panel,{header:"Implementation",headerId:"implementation",children:[(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["To use ",(0,t.jsx)(o.Code,{primary:!0,children:"Page"})," import the component from the package:"]}),(0,t.jsx)(s.CodeSnippet,{children:"import { Page } from '@bigcommerce/big-design-patterns';"})]},"basic"),(0,t.jsx)(l.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:[(0,t.jsx)(o.Code,{primary:!0,children:"Page"})," is a high-level layout component that organizes the content of a page."]}),(0,t.jsx)(a.CodePreview,{children:`<Page
  header={
    <Header description="Page description (optional)" title="Basic page" />
  }
>
  <Panel header="Main contents">
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
  </Panel>
</Page>`})]},"basic")},{id:"message",title:"Status messasges",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["The ",(0,t.jsx)(o.Code,{primary:!0,children:"Message"})," prop allows you to deliver status information relevant to the context shown on the page and relates to the information displayed below it."]}),(0,t.jsx)(a.CodePreview,{children:`<Page
  header={<Header title="Status messages" />}
  message={{
    header: 'Status message title',
    type: 'success',
    messages: [
      {
        text: 'This is a success message.',
        link: {
          href: 'https://www.bigcommerce.com',
          target: '_blank',
          text: 'Learn more',
        },
      },
    ],
  }}
>
  <Panel header="Main contents">
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
  </Panel>
</Page>`})]},"basic")},{id:"header-actions",title:"Header actions",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["The ",(0,t.jsx)(o.Code,{primary:!0,children:"Header"})," component allows you to add actions to the header, such as buttons or dropdowns."]}),(0,t.jsx)(a.CodePreview,{children:`<Page
  header={
    <Header
      actions={[
        {
          text: 'Main',
          variant: 'primary',
          iconLeft: <AddIcon />,
        },
        {
          items: [
            { content: 'Option 1', onItemClick: (item) => item },
            { content: 'Option 2', onItemClick: (item) => item },
          ],
          toggle: {
            text: 'Secondary',
            variant: 'secondary',
            iconRight: <ArrowDropDownIcon />,
          },
        },
        {
          text: 'Tertiary',
          variant: 'subtle',
        },
      ]}
      description="Page description (optional)"
      title="Header with actions"
    />
  }
>
  <Panel header="Page contents">
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
  </Panel>
</Page>`})]},"header-actions")},{id:"action-bar",title:"Action Bar",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsx)(n.Text,{children:"Use to provide quick and consistent access to key actions at the bottom of a page. Be aware that pages may only have one primary action button, which would be placed in the action bar."}),(0,t.jsx)(a.CodePreview,{children:`<Page
  actionBar={
    <ActionBar
      actions={[
        {
          text: 'Main action',
          variant: 'primary',
        },
        {
          text: 'Dismiss',
          variant: 'subtle',
        },
      ]}
    />
  }
  header={
    <Header
      actions={[
        {
          text: 'Secondary',
          variant: 'secondary',
          iconLeft: <AddIcon />,
        },
      ]}
      description="Page description (optional)"
      title="Page with action bar"
    />
  }
>
  <Panel header="Page contents">
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
  </Panel>
</Page>`})]},"action-bar")},{id:"background-images",title:"Background images",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["On featured pages, you may want to add a background image to the page to provide context or visual interest. The ",(0,t.jsx)(o.Code,{primary:!0,children:"Page"})," component allows you to add a background image with custom positioning and size."]}),(0,t.jsx)(a.CodePreview,{children:`<Page
  background={{
    src: '/page-background.svg',
    backgroundSize: 'contain',
    backgroundPosition: 'top right',
  }}
  header={
    <Header
      actions={[
        { text: 'Primary', variant: 'primary' },
        { text: 'Secondary', variant: 'secondary' },
      ]}
      description="Page description (optional)"
      title="Page Title"
    />
  }
>
  <Panel header="Main contents">
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
  </Panel>
</Page>`})]},"background-images")}]})]}),(0,t.jsx)(r.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(l.ContentRoutingTabs,{id:"props",routes:[{id:"page-props",title:"Page",render:()=>(0,t.jsx)(m,{})},{id:"background-props",title:"Background",render:()=>(0,t.jsx)(h,{})}]})}),(0,t.jsx)(r.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(c.GuidelinesTable,{discouraged:["Don’t pass non-Header or non-ActionBar components to the 'header' or 'actionBar' props.",`Avoid using the Page component for small sections of content; 
            it’s meant to wrap the entire page.`],recommended:[`Use the Page component as a container for your entire page structure, including header, 
            content, messages, and action buttons.`,`Utilize the 'background' prop to customize the page's background, 
            aligning it with the overall design.`]})})]})],41826)},60183,(e,t,n)=>{let r="/page";(window.__NEXT_P=window.__NEXT_P||[]).push([r,()=>e.r(41826)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([r])})}]);