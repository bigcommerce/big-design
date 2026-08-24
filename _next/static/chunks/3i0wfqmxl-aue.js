(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,r)=>{"use strict";r._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,r)=>{"use strict";function n(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(n=function(e){return e?r:t})(e)}r._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=n(t);if(r&&r.has(e))return r.get(e);var o={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var a=i?Object.getOwnPropertyDescriptor(e,s):null;a&&(a.get||a.set)?Object.defineProperty(o,s,a):o[s]=e[s]}return o.default=e,r&&r.set(e,o),o}},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HeadManagerContext",{enumerable:!0,get:function(){return n}});let n=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let n=e.r(80763)._(e.r(99161)),o=e.r(3221),i=n.default.createContext(o.imageConfigDefault)},3221,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return s}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["default","imgix","cloudinary","akamai","custom"],s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return x},MiddlewareNotFoundError:function(){return b},MissingStaticPage:function(){return j},NormalizeError:function(){return C},PageNotFoundError:function(){return y},SP:function(){return f},ST:function(){return g},WEB_VITALS:function(){return i},execOnce:function(){return s},getDisplayName:function(){return d},getLocationOrigin:function(){return u},getURL:function(){return c},isAbsoluteUrl:function(){return l},isResSent:function(){return m},loadGetInitialProps:function(){return p},normalizeRepeatedSlashes:function(){return h},stringifyError:function(){return v}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function s(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let a=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&a.test(e)};function u(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=u();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function m(e){return e.finished||e.headersSent}function h(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function p(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await p(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&m(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let f="u">typeof performance,g=f&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class x extends Error{}class C extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class j extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class b extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function v(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,r)=>{t.exports=e.r(25236)},21908,e=>{"use strict";var t=e.i(80447),r=e.i(1304),n=e.i(23539),o=e.i(84033);let i=({routes:e,id:i})=>{let{activeContent:s,activePills:a,pills:l,handlePillClick:u}=((e,t)=>{let{query:r,push:n}=(0,o.useRouter)(),i=e.map(({render:e,...t})=>t),s=r[t],a=s&&!Array.isArray(s)?s:e[0].id;return{activeContent:e.find(e=>e.id===a),activePills:a?[a]:[],pills:i,handlePillClick:e=>{n({query:{...r,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,i);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.PillTabs,{activePills:a,items:l,onPillClick:u}),(0,t.jsx)(r.Box,{marginTop:"xSmall",children:s?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(i,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),r=e.i(81542);let n=r.css`
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
`,o=r.default.ol.withConfig({displayName:"styled.tsx__StyledOrderedList",componentId:"sc-6a6922be-0"})`
  ${n};
`,i=r.default.ul.withConfig({displayName:"styled.tsx__StyledUnorderedList",componentId:"sc-6a6922be-1"})`
  ${n}
`,s=({columnCount:e=1,columnGap:r="normal",as:n="ul",children:s,reset:a,...l})=>(0,t.jsx)("ol"===n?o:i,{$columnCount:e,$columnGap:r,$reset:a,...l,children:s});s.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,s],52510)},63346,e=>{"use strict";var t=e.i(80447),r=e.i(13332),n=e.i(7277),o=e.i(99161),i=e.i(77136),s=e.i(27746),a=e.i(21908),l=e.i(83603),u=e.i(52510),c=e.i(51969);let d=[{name:"label",types:["string","FormControlLabel"],description:(0,t.jsxs)(t.Fragment,{children:["Label element for ",(0,t.jsx)(i.Code,{primary:!0,children:"Counters"}),". Component will auto generate"," ",(0,t.jsx)(i.Code,{children:"id"}),"'s for the accessibility API."]})},{name:"labelId",types:"string",description:(0,t.jsxs)(t.Fragment,{children:["Appends an ",(0,t.jsx)(i.Code,{children:"id"})," to the generated label element."]})},{name:"description",types:["string","FormControlDescription"],description:"Append a description to the input field."},{name:"error",types:["string","string[]","FormControlError","FormControlError[]"],description:(0,t.jsxs)(t.Fragment,{children:["Displays an error message for the field. Error message will be passed to the"," ",(0,t.jsx)(i.Code,{children:"FormGroup"})," for display purposes."]})},{name:"value",types:"number",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Value for the ",(0,t.jsx)(i.Code,{children:"Counter"}),". Only accepts whole numbers."]})},{name:"min",types:"number",defaultValue:0,description:(0,t.jsxs)(t.Fragment,{children:["The minimum ",(0,t.jsx)(i.Code,{children:"value"})," allowed."]})},{name:"max",types:"number",defaultValue:100,description:(0,t.jsxs)(t.Fragment,{children:["The maximum ",(0,t.jsx)(i.Code,{children:"value"})," allowed."]})},{name:"step",types:"number",defaultValue:1,description:(0,t.jsxs)(t.Fragment,{children:["The amount beetween one ",(0,t.jsx)(i.Code,{children:"value"})," and the next when incrementing or decrementing the ",(0,t.jsx)(i.Code,{children:"Counter"}),"."]})},{name:"onCountChange",types:"(count: number) => void",description:"Function to be called that changes counter value. Receives the new count from the component.",required:!0},{name:"localization",types:"{ decreaseCount: string, increaseCount: string }",description:"Overrides the labels with localized text."}],m=e=>(0,t.jsx)(c.PropTable,{nativeElement:["input","most"],propList:d,title:"Counter",...e});e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.H1,{children:"Counter"}),(0,t.jsxs)(n.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(i.Code,{primary:!0,children:"Counter"})," is a field that lets you increase or decrease its value incrementally, as well as directly input a value."]}),(0,t.jsx)(r.Text,{bold:!0,children:"When to use:"}),(0,t.jsxs)(u.List,{children:[(0,t.jsxs)(u.List.Item,{children:["Use ",(0,t.jsx)(i.Code,{primary:!0,children:"Counters"})," to input values that have a small range of likely values (e.g. 1-10)."]}),(0,t.jsxs)(u.List.Item,{children:["Use ",(0,t.jsx)(i.Code,{primary:!0,children:"Counters"})," for values that are usually a number with some exceptions - e.g. number of copies."]})]})]}),(0,t.jsx)(n.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(a.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsxs)(o.Fragment,{children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(i.Code,{primary:!0,children:"Counters"})," are stylized numerical form controls with the ability to control validation."]}),(0,t.jsx)(s.CodePreview,{children:`function Example() {
  const [counterValue, setCounterValue] = useState(5);
  const handleChange = (value: number) => {
    setCounterValue(value);
  };

  return (
    <Form>
      <FormGroup>
        <Counter
          description="Description for the counter."
          label="Label"
          max={10}
          min={0}
          onCountChange={handleChange}
          value={counterValue}
        />
      </FormGroup>
    </Form>
  );
}`})]},"basic")},{id:"error-states",title:"Error states",render:()=>(0,t.jsxs)(o.Fragment,{children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(i.Code,{primary:!0,children:"Counters"})," allow you to pass in an ",(0,t.jsx)(i.Code,{primary:!0,children:"error"})," ","message that will control the styles of a ",(0,t.jsx)(i.Code,{primary:!0,children:"Counter"}),". The logic on the counter can be controlled with the"," ",(0,t.jsx)(i.Code,{primary:!0,children:"onCountChange"})," prop."]}),(0,t.jsx)(s.CodePreview,{children:`function Example() {
  const [counterValue, setCounterValue] = useState(0);
  const [errors, setErrors] = useState('Number of items must be at least 1.');
  const handleChange = (value: number) => {
    setCounterValue(value);

    if (value >= 1) {
      setErrors('');
    } else {
      setErrors('Number of items must be at least 1.');
    }
  };

  return (
    <Form>
      <FormGroup>
        <Counter
          description="Select at least one item."
          error={errors}
          label="Products"
          onCountChange={handleChange}
          required
          value={counterValue}
        />
      </FormGroup>
    </Form>
  );
}`})]},"error-states")}]})}),(0,t.jsx)(n.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(m,{})}),(0,t.jsx)(n.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(l.GuidelinesTable,{discouraged:[(0,t.jsxs)(t.Fragment,{children:["Avoid ",(0,t.jsx)(i.Code,{primary:!0,children:"Counters"})," if the value will likley change by large/unpredictable increments (e.g. price)."]})],recommended:[(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.Code,{primary:!0,children:"Counters"})," should have a default value that represents the most likley choice the user will take."]}),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.Code,{primary:!0,children:"Counters"})," should always have a clear label as to what the number represents."]}),(0,t.jsxs)(t.Fragment,{children:["Include relevant signs (e.g. %, $) in the ",(0,t.jsx)(i.Code,{primary:!0,children:"Counter"})," to give context for the value’s type."]})]})})]})],63346)},12771,(e,t,r)=>{let n="/counter";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>e.r(63346)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([n])})}]);