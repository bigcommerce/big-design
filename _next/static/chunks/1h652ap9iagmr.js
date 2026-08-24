(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,r)=>{"use strict";r._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,r)=>{"use strict";function n(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(n=function(e){return e?r:t})(e)}r._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=n(t);if(r&&r.has(e))return r.get(e);var a={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=i?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(a,o,s):a[o]=e[o]}return a.default=e,r&&r.set(e,a),a}},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HeadManagerContext",{enumerable:!0,get:function(){return n}});let n=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let n=e.r(80763)._(e.r(99161)),a=e.r(3221),i=n.default.createContext(a.imageConfigDefault)},3221,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return o}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=["default","imgix","cloudinary","akamai","custom"],o={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return P},MissingStaticPage:function(){return j},NormalizeError:function(){return x},PageNotFoundError:function(){return b},SP:function(){return f},ST:function(){return g},WEB_VITALS:function(){return i},execOnce:function(){return o},getDisplayName:function(){return u},getLocationOrigin:function(){return d},getURL:function(){return c},isAbsoluteUrl:function(){return l},isResSent:function(){return p},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return m},stringifyError:function(){return v}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function o(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&s.test(e)};function d(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=d();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function m(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&p(r))return n;if(!n)throw Object.defineProperty(Error(`"${u(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let f="u">typeof performance,g=f&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class x extends Error{}class b extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class j extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class P extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function v(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,r)=>{t.exports=e.r(25236)},21908,e=>{"use strict";var t=e.i(80447),r=e.i(1304),n=e.i(23539),a=e.i(84033);let i=({routes:e,id:i})=>{let{activeContent:o,activePills:s,pills:l,handlePillClick:d}=((e,t)=>{let{query:r,push:n}=(0,a.useRouter)(),i=e.map(({render:e,...t})=>t),o=r[t],s=o&&!Array.isArray(o)?o:e[0].id;return{activeContent:e.find(e=>e.id===s),activePills:s?[s]:[],pills:i,handlePillClick:e=>{n({query:{...r,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,i);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.PillTabs,{activePills:s,items:l,onPillClick:d}),(0,t.jsx)(r.Box,{marginTop:"xSmall",children:o?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(i,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),r=e.i(81542);let n=r.css`
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
`,i=r.default.ul.withConfig({displayName:"styled.tsx__StyledUnorderedList",componentId:"sc-6a6922be-1"})`
  ${n}
`,o=({columnCount:e=1,columnGap:r="normal",as:n="ul",children:o,reset:s,...l})=>(0,t.jsx)("ol"===n?a:i,{$columnCount:e,$columnGap:r,$reset:s,...l,children:o});o.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,o],52510)},84927,e=>{"use strict";var t=e.i(80447),r=e.i(13332),n=e.i(7277),a=e.i(99161),i=e.i(77136),o=e.i(27746),s=e.i(21908),l=e.i(83603),d=e.i(52510),c=e.i(74474),u=e.i(51969);let p=[{name:"onDateChange",types:"(date: string) => void",required:!0,description:"Callback called with value of selected date."},{name:"label",types:"string",description:"Adds a label to the field."},{name:"value",types:"string",description:"The ISO time that should be used as the input value."},{name:"max",types:"string",description:"Maximum date in ISO format that can selected in the calendar."},{name:"min",types:"string",description:"Minimum date in ISO format that can selected in the calendar."},{name:"dateFormat",types:"string",defaultValue:"EE, dd MMM, yyyy",description:"Format for selected date to be displayed in input."},{name:"locale",types:"string",defaultValue:"en-US",description:(0,t.jsxs)(t.Fragment,{children:["Locale used to format the the date and calendar. See"," ",(0,t.jsx)(c.Link,{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat",target:"_blank",children:"DateTimeFormat"})]})}],m=e=>(0,t.jsx)(u.PropTable,{nativeElement:['input[type="date"]',"all"],propList:p,title:"Datepicker",...e});e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.H1,{children:"Datepicker"}),(0,t.jsxs)(n.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(i.Code,{primary:!0,children:"Datepickers"})," allow users to select a specific date. Users can input dates either by typing on the field or by selecting from the dropdown calendar."]}),(0,t.jsx)(r.Text,{bold:!0,children:"When to use:"}),(0,t.jsx)(d.List,{children:(0,t.jsxs)(d.List.Item,{children:["Use a ",(0,t.jsx)(i.Code,{primary:!0,children:"Datepicker"})," when the user need to input a specific date. It works best when the user need to pick a date close to the present time or the exact date is known by the user."]})})]}),(0,t.jsx)(n.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(s.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsxs)(a.Fragment,{children:[(0,t.jsx)(r.Text,{children:"Use to select a single date from the calendar."}),(0,t.jsx)(o.CodePreview,{children:`function Example() {
  const [date, setDate] = useState<string>();

  return (
    <Form>
      <FormGroup>
        <Datepicker
          label="Pick a date"
          locale="en-US"
          max="06/19/2020"
          min="06/03/2020"
          onDateChange={(value: string) => setDate(value)}
          value={date}
        />
      </FormGroup>
    </Form>
  );
}`})]},"basic")},{id:"error-states",title:"Error states",render:()=>(0,t.jsxs)(a.Fragment,{children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(i.Code,{primary:!0,children:"Datepicker"})," allows you to pass in an"," ",(0,t.jsx)(i.Code,{primary:!0,children:"error"})," message that will control the styles of a counter. The logic on the ",(0,t.jsx)(i.Code,{primary:!0,children:"Datepicker"})," can be controlled with the"," ",(0,t.jsx)(i.Code,{primary:!0,children:"onDateChange"})," prop."]}),(0,t.jsx)(o.CodePreview,{children:`function Example() {
  const [date, setDate] = useState<string>();
  const [errors, setErrors] = useState('Please select a date.');
  const handleChange = (value: string) => {
    if (value) {
      setErrors('');
    } else {
      setErrors('Please select a date.');

      return;
    }

    setDate(value);
  };

  return (
    <Form>
      <FormGroup>
        <Datepicker
          error={errors}
          label="Pick a date"
          onDateChange={handleChange}
          required
          value={date}
        />
      </FormGroup>
    </Form>
  );
}`})]},"error-state")}]})}),(0,t.jsx)(n.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(m,{})}),(0,t.jsx)(n.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(l.GuidelinesTable,{discouraged:["Don’t enable dates that are erroneous in the context, for example, don’t enable dates in the past when users are planning a campaign, and don't enable a date that is prior to the start date in the end date picker."],recommended:["The selectable dates in the dropdown calendar should be suitable for the context. Use min and max dates to help prevent user error.",(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.Code,{primary:!0,children:"Datepicker"})," works best when the user need to pick a date in the near future (or past) or the exact date is known by the user. If a user needs to input a far distant date, consider having the dropdown calendar default open to a more convenient day."]}),"Spell out the name of the month to distinguish it from the day."]})})]})],84927)},16906,(e,t,r)=>{let n="/datepicker";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>e.r(84927)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([n])})}]);