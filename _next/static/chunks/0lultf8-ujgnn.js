(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,r)=>{"use strict";r._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,r)=>{"use strict";function n(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(n=function(e){return e?r:t})(e)}r._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=n(t);if(r&&r.has(e))return r.get(e);var a={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if("default"!==i&&Object.prototype.hasOwnProperty.call(e,i)){var o=s?Object.getOwnPropertyDescriptor(e,i):null;o&&(o.get||o.set)?Object.defineProperty(a,i,o):a[i]=e[i]}return a.default=e,r&&r.set(e,a),a}},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HeadManagerContext",{enumerable:!0,get:function(){return n}});let n=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return s}});let n=e.r(80763)._(e.r(99161)),a=e.r(3221),s=n.default.createContext(a.imageConfigDefault)},3221,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return s},imageConfigDefault:function(){return i}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let s=["default","imgix","cloudinary","akamai","custom"],i={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return b},MissingStaticPage:function(){return j},NormalizeError:function(){return x},PageNotFoundError:function(){return v},SP:function(){return f},ST:function(){return p},WEB_VITALS:function(){return s},execOnce:function(){return i},getDisplayName:function(){return d},getLocationOrigin:function(){return l},getURL:function(){return c},isAbsoluteUrl:function(){return u},isResSent:function(){return h},loadGetInitialProps:function(){return m},normalizeRepeatedSlashes:function(){return g},stringifyError:function(){return w}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let s=["CLS","FCP","FID","INP","LCP","TTFB"];function i(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let o=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,u=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&o.test(e)};function l(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=l();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function h(e){return e.finished||e.headersSent}function g(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function m(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await m(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&h(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let f="u">typeof performance,p=f&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class x extends Error{}class v extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class j extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class b extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function w(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,r)=>{t.exports=e.r(25236)},21908,e=>{"use strict";var t=e.i(80447),r=e.i(1304),n=e.i(23539),a=e.i(84033);let s=({routes:e,id:s})=>{let{activeContent:i,activePills:o,pills:u,handlePillClick:l}=((e,t)=>{let{query:r,push:n}=(0,a.useRouter)(),s=e.map(({render:e,...t})=>t),i=r[t],o=i&&!Array.isArray(i)?i:e[0].id;return{activeContent:e.find(e=>e.id===o),activePills:o?[o]:[],pills:s,handlePillClick:e=>{n({query:{...r,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,s);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.PillTabs,{activePills:o,items:u,onPillClick:l}),(0,t.jsx)(r.Box,{marginTop:"xSmall",children:i?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(s,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),r=e.i(81542);let n=r.css`
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
`,a=r.default.ol.withConfig({displayName:"styled.tsx__StyledOrderedList",componentId:"sc-6a6922be-0"})`
  ${n};
`,s=r.default.ul.withConfig({displayName:"styled.tsx__StyledUnorderedList",componentId:"sc-6a6922be-1"})`
  ${n}
`,i=({columnCount:e=1,columnGap:r="normal",as:n="ul",children:i,reset:o,...u})=>(0,t.jsx)("ol"===n?a:s,{$columnCount:e,$columnGap:r,$reset:o,...u,children:i});i.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,i],52510)},57380,e=>{"use strict";var t=e.i(80447),r=e.i(13332),n=e.i(7277),a=e.i(99161),s=e.i(77136),i=e.i(27746),o=e.i(21908),u=e.i(52510),l=e.i(83603),c=e.i(51969);let d=[{name:"heading",types:"string",description:"The heading message to display. This is optional and can be omitted if not needed."},{name:"message",types:"string",description:"The main message to display. This is required."},{name:"variant",types:["404","info","search","error","server-error","success","unauthorized","warning"],defaultValue:"info",description:"The variant of the status message. This determines the icon and background pattern used."},{name:"size",types:["panel","page"],defaultValue:"panel",description:"The size of the status message. This determines the layout and spacing of the message."},{name:"actions",types:"React.ReactNode",description:"Component to render custom actions. This can be a buttons, links, etc."}],h=e=>(0,t.jsx)(c.PropTable,{propList:d,title:"Page",...e});e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.H1,{children:"Status Message"}),(0,t.jsxs)(n.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(s.Code,{primary:!0,children:"Status messages"})," are a visual and textual representation of the current state of a page or feature. They are used to inform users about the status of their actions, such as success, error, or warning messages. Status messages can also be used to provide additional next steps by providing relevant actions."]}),(0,t.jsx)(r.Text,{bold:!0,children:"When to use:"}),(0,t.jsx)(u.List,{children:(0,t.jsxs)(u.List.Item,{children:["Use ",(0,t.jsx)(s.Code,{primary:!0,children:"Status messages"})," to indicate the current status of a page or section (e.g. 401, 404 or 500 errors as well as empty states, connection failures and success screens)."]})})]}),(0,t.jsx)(n.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(o.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsx)(i.CodePreview,{children:`<StatusMessage
  actions={<Button variant="secondary">Clear search</Button>}
  heading='No results for search "yellow hat"'
  message="Try adjusting your search or filter to find what you are looking for."
  variant="search"
/>`},"basic")},{id:"variants",title:"Variants",render:()=>(0,t.jsxs)(a.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["There are eight variants to choose from: ",(0,t.jsx)(s.Code,{children:"404"}),", ",(0,t.jsx)(s.Code,{children:"info"}),","," ",(0,t.jsx)(s.Code,{children:"search"}),", ",(0,t.jsx)(s.Code,{children:"error"}),", ",(0,t.jsx)(s.Code,{children:"server-error"}),","," ",(0,t.jsx)(s.Code,{children:"success"}),", ",(0,t.jsx)(s.Code,{children:"unauthorized"})," and ",(0,t.jsx)(s.Code,{children:"warning"}),". You can determine what type by using the ",(0,t.jsx)(s.Code,{primary:!0,children:"variant"})," prop."]}),(0,t.jsx)(i.CodePreview,{children:`<Flex flexDirection="column" flexGap="1rem">
  <StatusMessage
    actions={<Button variant="subtle">Go back to main page</Button>}
    heading="Page not found"
    message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
    variant="404"
  />
  <StatusMessage
    actions={<Button variant="secondary">Add product</Button>}
    heading="You have no products yet"
    message="Start adding products to your store to see them here."
    variant="info"
  />
  <StatusMessage
    actions={<Button variant="secondary">Clear search</Button>}
    heading='No results for search "yellow hat"'
    message="Try adjusting your search or filter to find what you are looking for."
    variant="search"
  />
  <StatusMessage
    actions={<Button variant="secondary">Retry</Button>}
    heading="There was an error connecting to the server"
    message="Please check your internet connection and try again."
    variant="error"
  />
  <StatusMessage
    actions={<Button variant="secondary">Retry</Button>}
    heading="Internal server error"
    message="The server encountered an internal error and was unable to complete your request. Please try again later."
    variant="server-error"
  />
  <StatusMessage
    actions={<Button variant="subtle">View details</Button>}
    heading="Operation successful"
    message="Your operation was completed successfully."
    variant="success"
  />
  <StatusMessage
    actions={<Button variant="secondary">Request access</Button>}
    heading="Unauthorized access"
    message="You do not have the necessary permissions to access this resource."
    variant="unauthorized"
  />
  <StatusMessage
    actions={<Button variant="subtle">Try again</Button>}
    heading="Quota limit exceeded"
    message="You have exceeded your quota limit for this resource. Please try again later."
    variant="warning"
  />
</Flex>`})]},"variants")},{id:"size",title:"Size",render:()=>(0,t.jsxs)(a.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["There are two sizes to choose from: ",(0,t.jsx)(s.Code,{children:"panel"})," which is used to showcase the message within panels, modals and other contained elemnts and"," ",(0,t.jsx)(s.Code,{children:"page"})," which is used for full page status messages such as 404 pages and 500 error pages ."]}),(0,t.jsx)(i.CodePreview,{children:`<Flex flexDirection="column" flexGap="1rem">
  <StatusMessage
    actions={<Button variant="secondary">Clear search</Button>}
    heading='No results for search "yellow hat"'
    message="Try adjusting your search or filter to find what you are looking for."
    variant="search"
  />
  <StatusMessage
    actions={
      <Flex flexGap="0.5rem">
        <Button variant="subtle">Go to main page</Button>
        <Button variant="secondary">Retry</Button>
      </Flex>
    }
    heading="Internal server error"
    message="The server encountered an internal error and was unable to complete your request. Please try again later."
    size="page"
    variant="server-error"
  />
</Flex>`})]},"size")}]})}),(0,t.jsx)(n.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(o.ContentRoutingTabs,{id:"props",routes:[{id:"status-message",title:"StatusMessage",render:()=>(0,t.jsx)(h,{})}]})}),(0,t.jsx)(n.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(l.GuidelinesTable,{discouraged:[(0,t.jsxs)(t.Fragment,{children:["Don’t use the ",(0,t.jsx)(s.Code,{children:"page"})," size within contained elments like panels, modals, etc."]}),"Avoid more than two actions, as this can overwhelm the user."],recommended:[(0,t.jsxs)(t.Fragment,{children:["Use the ",(0,t.jsx)(s.Code,{children:"page"})," size for full page warnings and errors."]}),"Provide meaningful actions that are relevant to the status message."]})})]})],57380)},29276,(e,t,r)=>{let n="/status-message";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>e.r(57380)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([n])})}]);