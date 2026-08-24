(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,n)=>{"use strict";n._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,n)=>{"use strict";function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}n._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=r(t);if(n&&n.has(e))return n.get(e);var a={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=i?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(a,o,s):a[o]=e[o]}return a.default=e,n&&n.set(e,a),a}},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"HeadManagerContext",{enumerable:!0,get:function(){return r}});let r=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let r=e.r(80763)._(e.r(99161)),a=e.r(3221),i=r.default.createContext(a.imageConfigDefault)},3221,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return o}};for(var a in r)Object.defineProperty(n,a,{enumerable:!0,get:r[a]});let i=["default","imgix","cloudinary","akamai","custom"],o={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0});var r={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return C},MissingStaticPage:function(){return x},NormalizeError:function(){return b},PageNotFoundError:function(){return v},SP:function(){return h},ST:function(){return g},WEB_VITALS:function(){return i},execOnce:function(){return o},getDisplayName:function(){return d},getLocationOrigin:function(){return l},getURL:function(){return c},isAbsoluteUrl:function(){return u},isResSent:function(){return m},loadGetInitialProps:function(){return p},normalizeRepeatedSlashes:function(){return f},stringifyError:function(){return P}};for(var a in r)Object.defineProperty(n,a,{enumerable:!0,get:r[a]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function o(e){let t,n=!1;return(...r)=>(n||(n=!0,t=e(...r)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,u=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&s.test(e)};function l(){let{protocol:e,hostname:t,port:n}=window.location;return`${e}//${t}${n?":"+n:""}`}function c(){let{href:e}=window.location,t=l();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function m(e){return e.finished||e.headersSent}function f(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function p(e,t){let n=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await p(t.Component,t.ctx)}:{};let r=await e.getInitialProps(t);if(n&&m(n))return r;if(!r)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${r}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return r}let h="u">typeof performance,g=h&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class b extends Error{}class v extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class x extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class C extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function P(e){return JSON.stringify({message:e.message,stack:e.stack})}},52510,e=>{"use strict";var t=e.i(80447),n=e.i(81542);let r=n.css`
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
`,a=n.default.ol.withConfig({displayName:"styled.tsx__StyledOrderedList",componentId:"sc-6a6922be-0"})`
  ${r};
`,i=n.default.ul.withConfig({displayName:"styled.tsx__StyledUnorderedList",componentId:"sc-6a6922be-1"})`
  ${r}
`,o=({columnCount:e=1,columnGap:n="normal",as:r="ul",children:o,reset:s,...u})=>(0,t.jsx)("ol"===r?a:i,{$columnCount:e,$columnGap:n,$reset:s,...u,children:o});o.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,o],52510)},80894,e=>{"use strict";var t=e.i(80447),n=e.i(13332),r=e.i(7277),a=e.i(27746),i=e.i(83603),o=e.i(52510),s=e.i(51969);let u=[{name:"value",types:"string",description:"Value of the search input",required:!0},{name:"onChange",types:"(event: React.ChangeEvent<HTMLInputElement>) => void",description:"Native onChange attribute for a HTML input element.",required:!0},{name:"onSubmit",types:"(event: React.FormEvent<HTMLFormElement>) => void",description:"Native onSubmit attribute for a HTML form element.",required:!0},{name:"localization",types:"{ search: string }",description:"Overrides the label with localized text."}],l=e=>(0,t.jsx)(s.PropTable,{nativeElement:["input","most"],propList:u,title:"Search",...e}),c=[{sku:"ABS",name:"[Sample] Able Brewing System",stock:225},{sku:"CC3C",name:"[Sample] Chemex Coffeemaker 3 cup",stock:49},{sku:"CGLD",name:"[Sample] Laundry Detergent",stock:29},{sku:"CLC",name:"[Sample] Canvas Laundry Cart",stock:2},{sku:"DPB",name:"[Sample] Dustpan & Brush",stock:34},{sku:"OCG",name:"[Sample] Oak Cheese Grater",stock:34},{sku:"OFSUC",name:"[Sample] Utility Caddy",stock:45}];e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.H1,{children:"Search"}),(0,t.jsxs)(r.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsx)(n.Text,{children:"The search bar allows a user to easily find information within columns."}),(0,t.jsx)(n.Text,{bold:!0,children:"When to use:"}),(0,t.jsxs)(o.List,{children:[(0,t.jsx)(o.List.Item,{children:"To search a list or create filters within a table."}),(0,t.jsx)(o.List.Item,{children:"Find specific information within a page."})]})]}),(0,t.jsx)(r.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(a.CodePreview,{scope:{data:c},children:`function Example() {
  const [items, setItems] = useState(data);
  const [searchValue, setSearchValue] = useState('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(event.target.value);

  const onSubmit = () => {
    setItems((prevItems) => {
      if (searchValue) {
        return prevItems.filter((item) => item.name.includes(searchValue));
      }

      return data;
    });
  };

  return (
    <>
      <Box marginBottom="medium">
        <Search onChange={onChange} onSubmit={onSubmit} value={searchValue} />
      </Box>
      <Table
        columns={[
          { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
          { header: 'Name', hash: 'name', render: ({ name }) => name },
          { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
        ]}
        items={items}
      />
    </>
  );
}`})}),(0,t.jsx)(r.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(l,{})}),(0,t.jsx)(r.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(i.GuidelinesTable,{discouraged:["Avoid using a search bar when there is small, easily navigable amount of data on a page."],recommended:["Make the search bar easily noticable.","Always use a search icon within the input box to indicate search functionality."]})})]})],80894)},77216,(e,t,n)=>{let r="/search";(window.__NEXT_P=window.__NEXT_P||[]).push([r,()=>e.r(80894)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([r])})}]);