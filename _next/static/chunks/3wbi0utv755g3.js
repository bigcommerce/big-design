(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,r)=>{"use strict";r._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,r)=>{"use strict";function n(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(n=function(e){return e?r:t})(e)}r._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=n(t);if(r&&r.has(e))return r.get(e);var i={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=o?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(i,a,s):i[a]=e[a]}return i.default=e,r&&r.set(e,i),i}},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HeadManagerContext",{enumerable:!0,get:function(){return n}});let n=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return o}});let n=e.r(80763)._(e.r(99161)),i=e.r(3221),o=n.default.createContext(i.imageConfigDefault)},3221,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return o},imageConfigDefault:function(){return a}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let o=["default","imgix","cloudinary","akamai","custom"],a={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return x},MiddlewareNotFoundError:function(){return C},MissingStaticPage:function(){return b},NormalizeError:function(){return y},PageNotFoundError:function(){return j},SP:function(){return f},ST:function(){return g},WEB_VITALS:function(){return o},execOnce:function(){return a},getDisplayName:function(){return u},getLocationOrigin:function(){return c},getURL:function(){return d},isAbsoluteUrl:function(){return l},isResSent:function(){return p},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return m},stringifyError:function(){return w}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let o=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&s.test(e)};function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function d(){let{href:e}=window.location,t=c();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function m(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&p(r))return n;if(!n)throw Object.defineProperty(Error(`"${u(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let f="u">typeof performance,g=f&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class x extends Error{}class y extends Error{}class j extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class b extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class C extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function w(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,r)=>{t.exports=e.r(25236)},21908,e=>{"use strict";var t=e.i(80447),r=e.i(1304),n=e.i(23539),i=e.i(84033);let o=({routes:e,id:o})=>{let{activeContent:a,activePills:s,pills:l,handlePillClick:c}=((e,t)=>{let{query:r,push:n}=(0,i.useRouter)(),o=e.map(({render:e,...t})=>t),a=r[t],s=a&&!Array.isArray(a)?a:e[0].id;return{activeContent:e.find(e=>e.id===s),activePills:s?[s]:[],pills:o,handlePillClick:e=>{n({query:{...r,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,o);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.PillTabs,{activePills:s,items:l,onPillClick:c}),(0,t.jsx)(r.Box,{marginTop:"xSmall",children:a?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(o,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),r=e.i(81542);let n=r.css`
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
`,i=r.default.ol.withConfig({displayName:"styled.tsx__StyledOrderedList",componentId:"sc-6a6922be-0"})`
  ${n};
`,o=r.default.ul.withConfig({displayName:"styled.tsx__StyledUnorderedList",componentId:"sc-6a6922be-1"})`
  ${n}
`,a=({columnCount:e=1,columnGap:r="normal",as:n="ul",children:a,reset:s,...l})=>(0,t.jsx)("ol"===n?i:o,{$columnCount:e,$columnGap:r,$reset:s,...l,children:a});a.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,a],52510)},219,e=>{"use strict";var t=e.i(80447),r=e.i(13332),n=e.i(7277),i=e.i(99161),o=e.i(77136),a=e.i(27746),s=e.i(21908),l=e.i(83603),c=e.i(52510),d=e.i(51969);let u=[{name:"description",types:["string","FormControlDescription"],description:"Append a description to the textarea field."},{name:"error",types:["string","string[]","FormControlError","FormControlError[]"],description:"Displays an error message for the field."},{name:"label",types:["string","FormControlLabel"],description:(0,t.jsxs)(t.Fragment,{children:["Label element for textareas. Component with auto generate ",(0,t.jsx)(o.Code,{children:"id"}),"'s for the accessibility API."]})},{name:"labelId",types:"string",description:(0,t.jsxs)(t.Fragment,{children:["Appends an ",(0,t.jsx)(o.Code,{children:"id"})," to the generated label element."]})},{name:"rows",types:["1","2","3","4","5","6","7"],defaultValue:"3",description:(0,t.jsxs)(t.Fragment,{children:["Determines the intial height via HTML's ",(0,t.jsx)(o.Code,{children:"row"})," property."]})},{name:"resize",types:"boolean",defaultValue:"true",description:"Determines if the textarea is resizable vertically."}],p=e=>(0,t.jsx)(d.PropTable,{nativeElement:["textarea","all"],propList:u,title:"Textarea",...e});e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.H1,{children:"Textarea"}),(0,t.jsxs)(n.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(o.Code,{primary:!0,children:"Textareas"})," are text inputs that can be expanded to fit multi-line text content from users."]}),(0,t.jsx)(r.Text,{bold:!0,children:"When to use:"}),(0,t.jsx)(c.List,{children:(0,t.jsxs)(c.List.Item,{children:[(0,t.jsx)(o.Code,{primary:!0,children:"Textareas"})," are useful when users need to create multi-sentence or paragraph length content - e.g. product decriptions or messages."]})})]}),(0,t.jsx)(n.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(s.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsx)(a.CodePreview,{children:`function Example() {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(event.target.value);

  return (
    <Form>
      <FormGroup>
        <Textarea
          description="Description for the textarea."
          label="Label"
          onChange={handleChange}
          placeholder="Placeholder"
          resize={true}
          rows={3}
          value={value}
        />
      </FormGroup>
    </Form>
  );
}`},"basic")},{id:"error-state",title:"Error state",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(o.Code,{primary:!0,children:"Textareas"})," allow you to pass in an"," ",(0,t.jsx)(o.Code,{primary:!0,children:"error"})," message that will control the styles of an input. The logic on the input can be controlled with the ",(0,t.jsx)(o.Code,{primary:!0,children:"onChange"})," ","prop."]}),(0,t.jsx)(a.CodePreview,{children:`<Form>
  <FormGroup>
    <Textarea
      description="Description needs to be at least 64 characters long."
      error="Field needs to contain at least 64 characters."
      label="Description"
      minLength={64}
      onChange={() => null}
      value="Start of some text..."
    />
  </FormGroup>
</Form>`})]},"error-state")},{id:"controlling-rows",title:"Controlling rows",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["By default, a ",(0,t.jsx)(o.Code,{primary:!0,children:"Textarea"})," displays with ",(0,t.jsx)(o.Code,{children:"3"})," rows. In order to set the intial amount of rows, pass in the ",(0,t.jsx)(o.Code,{children:"rows"})," prop. There can only be a maximum of ",(0,t.jsx)(o.Code,{children:"7"})," rows."]}),(0,t.jsx)(a.CodePreview,{children:`<Form>
  <FormGroup>
    <Textarea
      description="Textarea with 5 rows."
      label="Label"
      placeholder="Placeholder"
      rows={5}
    />
  </FormGroup>
</Form>`})]},"controlling-rows")},{id:"resizable",title:"Resizable",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["You can also control whether ",(0,t.jsx)(o.Code,{primary:!0,children:"Textarea"})," components are resizeable. Resizing is only available on the vertical axis."]}),(0,t.jsx)(a.CodePreview,{children:`<Form>
  <FormGroup>
    <Textarea
      label="Label"
      placeholder="Textarea cannot be resized."
      resize={false}
    />
  </FormGroup>
</Form>`})]},"resizable")}]})}),(0,t.jsx)(n.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(p,{})}),(0,t.jsx)(n.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(l.GuidelinesTable,{discouraged:[(0,t.jsxs)(t.Fragment,{children:["Don’t use ",(0,t.jsx)(o.Code,{primary:!0,children:"Textareas"})," when a single line text input is fine (e.g. a line for an address)."]})],recommended:[(0,t.jsxs)(t.Fragment,{children:["Use the default size of the ",(0,t.jsx)(o.Code,{primary:!0,children:"Textarea"})," to set expectations of the size of user input - e.g. a paragraph or single sentence."]})]})})]})],219)},30332,(e,t,r)=>{let n="/textarea";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>e.r(219)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([n])})}]);