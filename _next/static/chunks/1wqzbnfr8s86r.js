(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,r)=>{"use strict";r._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,r)=>{"use strict";function n(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(n=function(e){return e?r:t})(e)}r._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=n(t);if(r&&r.has(e))return r.get(e);var o={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in e)if("default"!==l&&Object.prototype.hasOwnProperty.call(e,l)){var a=i?Object.getOwnPropertyDescriptor(e,l):null;a&&(a.get||a.set)?Object.defineProperty(o,l,a):o[l]=e[l]}return o.default=e,r&&r.set(e,o),o}},67327,(e,t,r)=>{"use strict";function n(e,t,r,n){return!1}e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getDomainLocale",{enumerable:!0,get:function(){return n}}),e.r(13144),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},48637,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return F},useLinkStatus:function(){return P}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=e.r(10375),l=e.r(80447),a=i._(e.r(99161)),s=e.r(30766),u=e.r(61148),c=e.r(98993),d=e.r(81677),p=e.r(74962),f=e.r(16262),m=e.r(7398),h=e.r(67327),g=e.r(66263),x=e.r(55279),b=new Set;function y(e,t,r,n){if(!("u"<typeof window)&&(0,u.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){let o=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(b.has(o))return;b.add(o)}e.prefetch(t,r,n).catch(e=>{})}}function j(e){return"string"==typeof e?e:(0,c.formatUrl)(e)}let v=a.default.forwardRef(function(e,t){let r,n,{href:o,as:i,children:c,prefetch:b=null,passHref:v,replace:C,shallow:P,scroll:F,locale:_,onClick:w,onNavigate:E,onMouseEnter:S,onTouchStart:T,legacyBehavior:O=!1,transitionTypes:k,...L}=e;r=c,O&&("string"==typeof r||"number"==typeof r)&&(r=(0,l.jsx)("a",{children:r}));let M=a.default.useContext(f.RouterContext),R=!1!==b,{href:I,as:G}=a.default.useMemo(()=>{if(!M){let e=j(o);return{href:e,as:i?j(i):e}}let[e,t]=(0,s.resolveHref)(M,o,!0);return{href:e,as:i?(0,s.resolveHref)(M,i):t||e}},[M,o,i]),D=a.default.useRef(I),N=a.default.useRef(G);O&&(n=a.default.Children.only(r));let $=O?n&&"object"==typeof n&&n.ref:t,[A,q,B]=(0,m.useIntersection)({rootMargin:"200px"}),U=a.default.useCallback(e=>{(N.current!==G||D.current!==I)&&(B(),N.current=G,D.current=I),A(e)},[G,I,B,A]),z=(0,x.useMergedRef)(U,$);a.default.useEffect(()=>{!M||q&&R&&y(M,I,G,{bypassPrefetchedCheck:!1,locale:_})},[G,I,q,_,R,M?.locale,M]);let W={ref:z,onClick(e){O||"function"!=typeof w||w(e),O&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),!M||e.defaultPrevented||function(e,t,r,n,o,i,l,a,s){let c,{nodeName:d}=e.currentTarget;if(!("A"===d.toUpperCase()&&((c=e.currentTarget.getAttribute("target"))&&"_self"!==c||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,u.isLocalURL)(r)){o&&(e.preventDefault(),location.replace(r));return}e.preventDefault(),(()=>{if(s){let e=!1;if(s({preventDefault:()=>{e=!0}}),e)return}let e=l??!0;"beforePopState"in t?t[o?"replace":"push"](r,n,{shallow:i,locale:a,scroll:e}):t[o?"replace":"push"](n||r,{scroll:e})})()}}(e,M,I,G,C,P,F,_,E)},onMouseEnter(e){O||"function"!=typeof S||S(e),O&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),M&&y(M,I,G,{locale:_,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){O||"function"!=typeof T||T(e),O&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),M&&y(M,I,G,{locale:_,priority:!0,bypassPrefetchedCheck:!0})}};if((0,d.isAbsoluteUrl)(G))W.href=G;else if(!O||v||"a"===n.type&&!("href"in n.props)){let e=void 0!==_?_:M?.locale;W.href=M?.isLocaleDomain&&(0,h.getDomainLocale)(G,e,M?.locales,M?.domainLocales)||(0,g.addBasePath)((0,p.addLocale)(G,e,M?.defaultLocale))}return O?a.default.cloneElement(n,W):(0,l.jsx)("a",{...L,...W,children:r})}),C=(0,a.createContext)({pending:!1}),P=()=>(0,a.useContext)(C),F=v;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},41662,(e,t,r)=>{t.exports=e.r(48637)},7398,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useIntersection",{enumerable:!0,get:function(){return s}});let n=e.r(99161),o=e.r(11229),i="function"==typeof IntersectionObserver,l=new Map,a=[];function s({rootRef:e,rootMargin:t,disabled:r}){let u=r||!i,[c,d]=(0,n.useState)(!1),p=(0,n.useRef)(null),f=(0,n.useCallback)(e=>{p.current=e},[]);return(0,n.useEffect)(()=>{if(i){if(u||c)return;let r=p.current;if(r&&r.tagName)return function(e,t,r){let{id:n,observer:o,elements:i}=function(e){let t,r={root:e.root||null,margin:e.rootMargin||""},n=a.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=l.get(n)))return t;let o=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:o},a.push(r),l.set(r,t),t}(r);return i.set(e,t),o.observe(e),function(){if(i.delete(e),o.unobserve(e),0===i.size){o.disconnect(),l.delete(n);let e=a.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&a.splice(e,1)}}}(r,e=>e&&d(e),{root:e?.current,rootMargin:t})}else if(!c){let e=(0,o.requestIdleCallback)(()=>d(!0));return()=>(0,o.cancelIdleCallback)(e)}},[u,t,e,c,p.current]),[f,c,(0,n.useCallback)(()=>{d(!1)},[])]}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},55279,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(99161);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=i(e,n)),t&&(o.current=i(t,n))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HeadManagerContext",{enumerable:!0,get:function(){return n}});let n=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let n=e.r(80763)._(e.r(99161)),o=e.r(3221),i=n.default.createContext(o.imageConfigDefault)},3221,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return l}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["default","imgix","cloudinary","akamai","custom"],l={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return x},MiddlewareNotFoundError:function(){return v},MissingStaticPage:function(){return j},NormalizeError:function(){return b},PageNotFoundError:function(){return y},SP:function(){return h},ST:function(){return g},WEB_VITALS:function(){return i},execOnce:function(){return l},getDisplayName:function(){return d},getLocationOrigin:function(){return u},getURL:function(){return c},isAbsoluteUrl:function(){return s},isResSent:function(){return p},loadGetInitialProps:function(){return m},normalizeRepeatedSlashes:function(){return f},stringifyError:function(){return C}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function l(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let a=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,s=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&a.test(e)};function u(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=u();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function f(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function m(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await m(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&p(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let h="u">typeof performance,g=h&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class x extends Error{}class b extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class j extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class v extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function C(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,r)=>{t.exports=e.r(25236)},94861,e=>{"use strict";var t=e.i(80447),r=e.i(29636),n=e.i(51969);let o=[{name:"margin",types:(0,t.jsx)(r.NextLink,{href:"/spacing",children:"Spacing"}),description:"Determines the margin to be applied."},{name:"marginTop",types:(0,t.jsx)(r.NextLink,{href:"/spacing",children:"Spacing"}),description:"Determines the top margin to be applied."},{name:"marginRight",types:(0,t.jsx)(r.NextLink,{href:"/spacing",children:"Spacing"}),description:"Determines the right margin to be applied."},{name:"marginBottom",types:(0,t.jsx)(r.NextLink,{href:"/spacing",children:"Spacing"}),description:"Determines the bottom margin to be applied."},{name:"marginLeft",types:(0,t.jsx)(r.NextLink,{href:"/spacing",children:"Spacing"}),description:"Determines the left margin to be applied."},{name:"marginVertical",types:(0,t.jsx)(r.NextLink,{href:"/spacing",children:"Spacing"}),description:"Determines the top and bottom margin to be applied."},{name:"marginHorizontal",types:(0,t.jsx)(r.NextLink,{href:"/spacing",children:"Spacing"}),description:"Determines the left and right margin to be applied."}];e.s(["MarginPropTable",0,e=>(0,t.jsx)(n.PropTable,{propList:o,title:"Margin",...e})])},21908,e=>{"use strict";var t=e.i(80447),r=e.i(1304),n=e.i(23539),o=e.i(84033);let i=({routes:e,id:i})=>{let{activeContent:l,activePills:a,pills:s,handlePillClick:u}=((e,t)=>{let{query:r,push:n}=(0,o.useRouter)(),i=e.map(({render:e,...t})=>t),l=r[t],a=l&&!Array.isArray(l)?l:e[0].id;return{activeContent:e.find(e=>e.id===a),activePills:a?[a]:[],pills:i,handlePillClick:e=>{n({query:{...r,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,i);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.PillTabs,{activePills:a,items:s,onPillClick:u}),(0,t.jsx)(r.Box,{marginTop:"xSmall",children:l?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(i,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),r=e.i(81542);let n=r.css`
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
`,l=({columnCount:e=1,columnGap:r="normal",as:n="ul",children:l,reset:a,...s})=>(0,t.jsx)("ol"===n?o:i,{$columnCount:e,$columnGap:r,$reset:a,...s,children:l});l.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,l],52510)},29636,e=>{"use strict";var t=e.i(80447),r=e.i(41662),n=e.i(81542);let o=(0,n.default)(r.default).withConfig({displayName:"NextLink.tsx__StyledLink",componentId:"sc-72da42e3-0"})`
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
`;e.s(["NextLink",0,({children:e,href:r})=>(0,t.jsx)(o,{href:r,children:e})])},46777,e=>{"use strict";var t=e.i(80447),r=e.i(13332),n=e.i(74474),o=e.i(7277),i=e.i(99161),l=e.i(77136),a=e.i(27746),s=e.i(21908),u=e.i(83603),c=e.i(52510),d=e.i(51969);let p=e=>(0,t.jsx)(d.PropTable,{nativeElement:["p","all"],propList:[],title:"FormControlError",...e}),f=[{name:"fullWidth",types:"boolean",defaultValue:"false",description:"Sets the form width to 100%"}],m=[{name:"description",types:["string","FieldsetDescription"],description:"Pass in a description to display in the fieldset. Will render nothing if not the correct type."},{name:"legend",types:["string","FieldsetLegend"],description:"Pass in a legend to display in the fieldset. Will render nothing if not the correct type."}],h=e=>(0,t.jsx)(d.PropTable,{propList:m,title:"Fieldset",...e}),g=[{name:"required",types:"boolean",description:"Shows required asterisk."}],x=e=>(0,t.jsx)(d.PropTable,{nativeElement:["label","all"],propList:g,title:"FormControlLabel",...e}),b=e=>(0,t.jsx)(d.PropTable,{nativeElement:["p","all"],propList:[],title:"FormControlDescription",...e}),y=[{name:"errors",types:["React.ReactChild","React.ReactChild[]"],description:"Pass error(s) into the form group to override child input errors."}],j=e=>(0,t.jsx)(d.PropTable,{nativeElement:["form","all"],propList:f,title:"Form",...e}),v=e=>(0,t.jsx)(d.PropTable,{propList:y,title:"FormGroup",...e});var C=e.i(94861);e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.H1,{children:"Form"}),(0,t.jsxs)(o.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(r.Text,{children:["The provided ",(0,t.jsx)(l.Code,{primary:!0,children:"Form"})," component is a wrapper around an"," ",(0,t.jsxs)(n.Link,{external:!0,href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form",rel:"nofollow noreferrer",target:"_blank",children:["HTML ","<form />"]})," ","element. It provides form width styling and accessibility features when using form controls within."]}),(0,t.jsx)(r.Text,{bold:!0,children:"When to use:"}),(0,t.jsx)(c.List,{children:(0,t.jsx)(c.List.Item,{children:"Any usage of a form control."})})]}),(0,t.jsx)(o.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(s.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["Form fields are essential to any website or web application. Unique"," ",(0,t.jsx)(l.Code,{children:"id"}),"'s' will be auto-generated for the form fields and labels"," ",(0,t.jsx)(l.Code,{children:"for"})," attribute, unless manually specified."]}),(0,t.jsx)(a.CodePreview,{children:`<Form>
  <FormGroup>
    <Input
      description="Please provide a valid email address."
      label="Email"
      placeholder="Email address"
      required
      type="email"
    />
  </FormGroup>
  <FormGroup>
    <Input label="Password" placeholder="Password" required type="password" />
  </FormGroup>
  <Box marginTop="xxLarge">
    <Button type="submit">Sign in</Button>
  </Box>
</Form>`})]},"basic")},{id:"input-types",title:"Input types",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["BigDesign comes with many input types: ",(0,t.jsx)(l.Code,{children:"Input"}),", ",(0,t.jsx)(l.Code,{children:"Checkbox"}),", ",(0,t.jsx)(l.Code,{children:"Radio"}),", ",(0,t.jsx)(l.Code,{children:"Select"}),", ",(0,t.jsx)(l.Code,{children:"MultiSelect"}),","," ",(0,t.jsx)(l.Code,{children:"Textarea"}),", ",(0,t.jsx)(l.Code,{children:"Counter"}),", ",(0,t.jsx)(l.Code,{children:"Switch"}),","," ",(0,t.jsx)(l.Code,{children:"Datepicker"}),", and ",(0,t.jsx)(l.Code,{children:"Timepicker"}),"."]}),(0,t.jsx)(a.CodePreview,{children:`<Form>
  <FormGroup>
    <Input label="Example Input" placeholder="Example" />
  </FormGroup>
  <FormGroup>
    <Checkbox checked={true} label="Example Checkbox" onChange={() => null} />
  </FormGroup>
  <FormGroup>
    <Radio checked={true} label="Example Radio" onChange={() => null} />
  </FormGroup>
  <FormGroup>
    <Select
      label="Example Select"
      onOptionChange={() => null}
      options={[
        { value: 1, content: 'Option 1' },
        { value: 2, content: 'Option 2' },
        { value: 3, content: 'Option 3' },
        { value: 4, content: 'Option 4' },
      ]}
      placeholder="Example"
    />
  </FormGroup>
  <FormGroup>
    <MultiSelect
      label="Example MultiSelect"
      onOptionsChange={() => null}
      options={[
        { value: 1, content: 'Option 1' },
        { value: 2, content: 'Option 2' },
        { value: 3, content: 'Option 3' },
        { value: 4, content: 'Option 4' },
      ]}
      placeholder="Example"
    />
  </FormGroup>
  <FormGroup>
    <Textarea label="Example Textarea" placeholder="Example" />
  </FormGroup>
  <FormGroup>
    <Counter label="Example Counter" onCountChange={() => null} value={1} />
  </FormGroup>
  <FormGroup>
    <div>
      <FormControlLabel>Example Switch</FormControlLabel>
      <Switch checked={true} onChange={() => null} />
    </div>
  </FormGroup>
  <FormGroup>
    <Datepicker
      dateFormat="MMMM d, yyyy"
      label="Example Datepicker"
      onDateChange={() => null}
      value={new Date().toISOString()}
    />
  </FormGroup>
  <FormGroup>
    <Timepicker
      label="Example Timepicker"
      onTimeChange={() => null}
      value="13:00"
    />
  </FormGroup>
</Form>`})]},"input-types")},{id:"layout",title:"Layout",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["You can up to 3 ",(0,t.jsx)(l.Code,{children:"Input"})," components in row to add more dimension to a"," ",(0,t.jsx)(l.Code,{children:"FormGroup"}),". ",(0,t.jsx)(l.Code,{children:"Radio"})," and ",(0,t.jsx)(l.Code,{children:"Checkbox"})," components will never display inline inside a ",(0,t.jsx)(l.Code,{children:"FormGroup"}),"."]}),(0,t.jsx)(a.CodePreview,{children:`<Form>
  <FormGroup>
    <Input label="Company" placeholder="BigCommerce" required />
  </FormGroup>
  <FormGroup>
    <Input label="First Name" placeholder="John" required />
    <Input label="Last Name" placeholder="Doe" required />
  </FormGroup>
  <FormGroup>
    <Input label="City" placeholder="Austin" required />
    <Input label="State" placeholder="Texas" required />
    <Input label="Postal Code" placeholder="78726" required />
  </FormGroup>
  <Fieldset legend="Shipping Method">
    <FormGroup>
      <Radio checked label="Free – Three Day Shipping" onChange={() => null} />
      <Radio label="$4.99 – Two Day Shipping" />
      <Radio label="$9.99 – One Day Shipping" />
    </FormGroup>
  </Fieldset>
</Form>`})]},"layout")},{id:"validation",title:"Validation",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["All form controls are tied to ",(0,t.jsx)(l.Code,{primary:!0,children:"onChange"})," or equivalent event handlers. Validation messages can be passed through the ",(0,t.jsx)(l.Code,{children:"error"})," prop. All input errors in an ",(0,t.jsx)(l.Code,{children:"FormGroup"})," will appear at the bottom of the group component component."]}),(0,t.jsx)(a.CodePreview,{children:`function Example() {
  const ERROR_MSG = 'Must be less than or equal to 3 characters long.';

  const [value, setValue] = useState('BigCommerce');
  const [error, setError] = useState(ERROR_MSG);

  const handleSubmit: FormProps['onSubmit'] = (event) => {
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleChange: InputProps['onChange'] = (event) => {
    const { target } = event;
    const regex = RegExp(target.pattern, 'g');

    regex.test(target.value) ? setError('') : setError(ERROR_MSG);

    setValue(target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          description="Remove characters to preview validation."
          error={error}
          label="Example"
          onChange={handleChange}
          pattern="^.{1,3}$"
          required
          value={value}
        />
      </FormGroup>
      <FormGroup>
        <Input
          error="You must enter a valid City."
          label="City"
          placeholder="Austin"
          required
        />
        <Input label="State" placeholder="Texas" required />
        <Input
          error="You must enter a valid Postal Code."
          label="Postal Code"
          placeholder="78726"
          required
        />
      </FormGroup>
    </Form>
  );
}`})]},"validation")}]})}),(0,t.jsx)(o.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(s.ContentRoutingTabs,{id:"props",routes:[{id:"form",title:"Form",render:()=>(0,t.jsx)(j,{inheritedProps:(0,t.jsx)(C.MarginPropTable,{collapsible:!0})})},{id:"form-group",title:"FormGroup",render:()=>(0,t.jsx)(v,{})},{id:"form-control-error",title:"FormControlError",render:()=>(0,t.jsx)(p,{})},{id:"form-control-label",title:"FormControlLabel",render:()=>(0,t.jsx)(x,{})},{id:"form-control-description",title:"FormControlDescription",render:()=>(0,t.jsx)(b,{})},{id:"form-fieldset",title:"Fieldset",render:()=>(0,t.jsx)(h,{})}]})}),(0,t.jsx)(o.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(u.GuidelinesTable,{discouraged:["Use forms for immediate actions (i.e. toggling a setting)"],recommended:[(0,t.jsxs)(t.Fragment,{children:["Use max-width form for most scenarios. ",(0,t.jsx)(l.Code,{primary:!0,children:"fullWidth"})," prop should be used non-traditional forms."]}),(0,t.jsxs)(t.Fragment,{children:["Use ",(0,t.jsx)(l.Code,{children:'type="submit"'})," on the button you want as your submit button (HTML defaults the first button as the submit action)"]}),"Validate form fields before the user submits the form."]})})]})],46777)},55968,(e,t,r)=>{let n="/form";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>e.r(46777)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([n])})}]);