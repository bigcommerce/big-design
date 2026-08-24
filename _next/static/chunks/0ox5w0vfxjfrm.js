(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,r)=>{"use strict";r._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,r)=>{"use strict";function n(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(n=function(e){return e?r:t})(e)}r._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=n(t);if(r&&r.has(e))return r.get(e);var i={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if("default"!==s&&Object.prototype.hasOwnProperty.call(e,s)){var a=o?Object.getOwnPropertyDescriptor(e,s):null;a&&(a.get||a.set)?Object.defineProperty(i,s,a):i[s]=e[s]}return i.default=e,r&&r.set(e,i),i}},67327,(e,t,r)=>{"use strict";function n(e,t,r,n){return!1}e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getDomainLocale",{enumerable:!0,get:function(){return n}}),e.r(13144),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},48637,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return P},useLinkStatus:function(){return v}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let o=e.r(10375),s=e.r(80447),a=o._(e.r(99161)),l=e.r(30766),c=e.r(61148),d=e.r(98993),u=e.r(81677),p=e.r(74962),h=e.r(16262),f=e.r(7398),m=e.r(67327),g=e.r(66263),x=e.r(55279),b=new Set;function y(e,t,r,n){if(!("u"<typeof window)&&(0,c.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){let i=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(b.has(i))return;b.add(i)}e.prefetch(t,r,n).catch(e=>{})}}function k(e){return"string"==typeof e?e:(0,d.formatUrl)(e)}let C=a.default.forwardRef(function(e,t){let r,n,{href:i,as:o,children:d,prefetch:b=null,passHref:C,replace:j,shallow:v,scroll:P,locale:w,onClick:_,onNavigate:L,onMouseEnter:F,onTouchStart:I,legacyBehavior:O=!1,transitionTypes:S,...T}=e;r=d,O&&("string"==typeof r||"number"==typeof r)&&(r=(0,s.jsx)("a",{children:r}));let M=a.default.useContext(h.RouterContext),E=!1!==b,{href:N,as:D}=a.default.useMemo(()=>{if(!M){let e=k(i);return{href:e,as:o?k(o):e}}let[e,t]=(0,l.resolveHref)(M,i,!0);return{href:e,as:o?(0,l.resolveHref)(M,o):t||e}},[M,i,o]),R=a.default.useRef(N),$=a.default.useRef(D);O&&(n=a.default.Children.only(r));let A=O?n&&"object"==typeof n&&n.ref:t,[B,q,z]=(0,f.useIntersection)({rootMargin:"200px"}),G=a.default.useCallback(e=>{($.current!==D||R.current!==N)&&(z(),$.current=D,R.current=N),B(e)},[D,N,z,B]),U=(0,x.useMergedRef)(G,A);a.default.useEffect(()=>{!M||q&&E&&y(M,N,D,{bypassPrefetchedCheck:!1,locale:w})},[D,N,q,w,E,M?.locale,M]);let H={ref:U,onClick(e){O||"function"!=typeof _||_(e),O&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),!M||e.defaultPrevented||function(e,t,r,n,i,o,s,a,l){let d,{nodeName:u}=e.currentTarget;if(!("A"===u.toUpperCase()&&((d=e.currentTarget.getAttribute("target"))&&"_self"!==d||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,c.isLocalURL)(r)){i&&(e.preventDefault(),location.replace(r));return}e.preventDefault(),(()=>{if(l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let e=s??!0;"beforePopState"in t?t[i?"replace":"push"](r,n,{shallow:o,locale:a,scroll:e}):t[i?"replace":"push"](n||r,{scroll:e})})()}}(e,M,N,D,j,v,P,w,L)},onMouseEnter(e){O||"function"!=typeof F||F(e),O&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),M&&y(M,N,D,{locale:w,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){O||"function"!=typeof I||I(e),O&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),M&&y(M,N,D,{locale:w,priority:!0,bypassPrefetchedCheck:!0})}};if((0,u.isAbsoluteUrl)(D))H.href=D;else if(!O||C||"a"===n.type&&!("href"in n.props)){let e=void 0!==w?w:M?.locale;H.href=M?.isLocaleDomain&&(0,m.getDomainLocale)(D,e,M?.locales,M?.domainLocales)||(0,g.addBasePath)((0,p.addLocale)(D,e,M?.defaultLocale))}return O?a.default.cloneElement(n,H):(0,s.jsx)("a",{...T,...H,children:r})}),j=(0,a.createContext)({pending:!1}),v=()=>(0,a.useContext)(j),P=C;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},41662,(e,t,r)=>{t.exports=e.r(48637)},7398,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useIntersection",{enumerable:!0,get:function(){return l}});let n=e.r(99161),i=e.r(11229),o="function"==typeof IntersectionObserver,s=new Map,a=[];function l({rootRef:e,rootMargin:t,disabled:r}){let c=r||!o,[d,u]=(0,n.useState)(!1),p=(0,n.useRef)(null),h=(0,n.useCallback)(e=>{p.current=e},[]);return(0,n.useEffect)(()=>{if(o){if(c||d)return;let r=p.current;if(r&&r.tagName)return function(e,t,r){let{id:n,observer:i,elements:o}=function(e){let t,r={root:e.root||null,margin:e.rootMargin||""},n=a.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=s.get(n)))return t;let i=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=i.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:i},a.push(r),s.set(r,t),t}(r);return o.set(e,t),i.observe(e),function(){if(o.delete(e),i.unobserve(e),0===o.size){i.disconnect(),s.delete(n);let e=a.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&a.splice(e,1)}}}(r,e=>e&&u(e),{root:e?.current,rootMargin:t})}else if(!d){let e=(0,i.requestIdleCallback)(()=>u(!0));return()=>(0,i.cancelIdleCallback)(e)}},[c,t,e,d,p.current]),[h,d,(0,n.useCallback)(()=>{u(!1)},[])]}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},55279,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return i}});let n=e.r(99161);function i(e,t){let r=(0,n.useRef)(null),i=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(r.current=o(e,n)),t&&(i.current=o(t,n))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HeadManagerContext",{enumerable:!0,get:function(){return n}});let n=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return o}});let n=e.r(80763)._(e.r(99161)),i=e.r(3221),o=n.default.createContext(i.imageConfigDefault)},3221,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return o},imageConfigDefault:function(){return s}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let o=["default","imgix","cloudinary","akamai","custom"],s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return x},MiddlewareNotFoundError:function(){return C},MissingStaticPage:function(){return k},NormalizeError:function(){return b},PageNotFoundError:function(){return y},SP:function(){return m},ST:function(){return g},WEB_VITALS:function(){return o},execOnce:function(){return s},getDisplayName:function(){return u},getLocationOrigin:function(){return c},getURL:function(){return d},isAbsoluteUrl:function(){return l},isResSent:function(){return p},loadGetInitialProps:function(){return f},normalizeRepeatedSlashes:function(){return h},stringifyError:function(){return j}};for(var i in n)Object.defineProperty(r,i,{enumerable:!0,get:n[i]});let o=["CLS","FCP","FID","INP","LCP","TTFB"];function s(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let a=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&a.test(e)};function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function d(){let{href:e}=window.location,t=c();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function h(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function f(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await f(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&p(r))return n;if(!n)throw Object.defineProperty(Error(`"${u(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let m="u">typeof performance,g=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class x extends Error{}class b extends Error{}class y extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class k extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class C extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function j(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,r)=>{t.exports=e.r(25236)},36712,e=>{"use strict";var t=e.i(80447),r=e.i(77136),n=e.i(29636),i=e.i(51969);let o=[{name:"header",types:"string",description:"Optional header to display in message."},{name:"messages",types:(0,t.jsx)(n.NextLink,{href:{hash:"message-item-prop-table",query:{props:"message-item"}},children:"MessageItem"}),description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(n.NextLink,{href:{hash:"message-item-prop-table",query:{props:"message-item"}},children:"MessageItem"})," ","for usage."]}),required:!0},{name:"type",types:["success","error","warning","info"],description:"Determines the style of message to display.",defaultValue:"success"},{name:"onClose",types:"() => void",description:"Function that will be called on close events."}],s=[{name:"text",types:"string",description:"Message to be displayed.",required:!0},{name:"link",types:(0,t.jsx)(n.NextLink,{href:{hash:"message-link-item-prop-table",query:{props:"message-link-item"}},children:"MessageLinkItem"}),description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(n.NextLink,{href:{hash:"message-link-item-prop-table",query:{props:"message-link-item"}},children:"MessageLinkItem"})," ","for usage."]})}],a=[{name:"external",types:"boolean",description:(0,t.jsxs)(t.Fragment,{children:["Shows an external icon when the ",(0,t.jsx)(r.Code,{primary:!0,children:"external"}),' prop is set and target="_blank".']})},{name:"href",types:"string",description:"Same as a HTML anchor href attribute."},{name:"text",types:"string",description:"Link text to display."},{name:"target",types:"string",description:"Same as a HTML anchor target attribute."}];e.s(["MessagingItemPropTable",0,e=>(0,t.jsx)(i.PropTable,{propList:s,title:"",...e,id:"message-item-prop-table"}),"MessagingLinkItemPropTable",0,e=>(0,t.jsx)(i.PropTable,{propList:a,title:"",...e,id:"message-link-item-prop-table"}),"messagingLinkItemProps",0,a,"sharedMessagingProps",0,o])},21908,e=>{"use strict";var t=e.i(80447),r=e.i(1304),n=e.i(23539),i=e.i(84033);let o=({routes:e,id:o})=>{let{activeContent:s,activePills:a,pills:l,handlePillClick:c}=((e,t)=>{let{query:r,push:n}=(0,i.useRouter)(),o=e.map(({render:e,...t})=>t),s=r[t],a=s&&!Array.isArray(s)?s:e[0].id;return{activeContent:e.find(e=>e.id===a),activePills:a?[a]:[],pills:o,handlePillClick:e=>{n({query:{...r,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,o);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.PillTabs,{activePills:a,items:l,onPillClick:c}),(0,t.jsx)(r.Box,{marginTop:"xSmall",children:s?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(o,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),r=e.i(81542);let n=r.css`
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
`,s=({columnCount:e=1,columnGap:r="normal",as:n="ul",children:s,reset:a,...l})=>(0,t.jsx)("ol"===n?i:o,{$columnCount:e,$columnGap:r,$reset:a,...l,children:s});s.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,s],52510)},29636,e=>{"use strict";var t=e.i(80447),r=e.i(41662),n=e.i(81542);let i=(0,n.default)(r.default).withConfig({displayName:"NextLink.tsx__StyledLink",componentId:"sc-72da42e3-0"})`
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
`;e.s(["NextLink",0,({children:e,href:r})=>(0,t.jsx)(i,{href:r,children:e})])},46584,e=>{"use strict";var t=e.i(80447),r=e.i(13332),n=e.i(7277),i=e.i(99161),o=e.i(77136),s=e.i(27746),a=e.i(21908),l=e.i(83603),c=e.i(52510),d=e.i(29636),u=e.i(51969),p=e.i(36712);let h=[{name:"label",types:["string","CheckboxLabel"],required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Label to display next to a ",(0,t.jsx)(o.Code,{primary:!0,children:"Checkbox"})," component."]})},{name:"hiddenLabel",types:"boolean",description:(0,t.jsxs)(t.Fragment,{children:["Renders ",(0,t.jsx)(o.Code,{primary:!0,children:"Checkbox"})," with a visually hidden label, retains accessibility for screen readers."]})},{name:"isIndeterminate",types:"boolean",description:(0,t.jsxs)(t.Fragment,{children:["Styles and sets the checkbox into a indeterminate state. Note that the"," ",(0,t.jsx)(o.Code,{primary:!0,children:"checked"})," prop will take precedence over"," ",(0,t.jsx)(o.Code,{primary:!0,children:"isIndeterminate"}),"."]})},{name:"description",types:["string",(0,t.jsx)(d.NextLink,{href:{hash:"checkbox-description-prop-table",query:{props:"checkbox-description"}},children:"CheckboxDescription"},"checkbox-description")],description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(d.NextLink,{href:{hash:"checkbox-description-prop-table",query:{props:"checkbox-description"}},children:"CheckboxDescription"})," ","for usage."]})},{name:"badge",types:[(0,t.jsx)(d.NextLink,{href:"/badge",children:"BadgeProps"},"badge-type")],description:(0,t.jsxs)(t.Fragment,{children:["See ",(0,t.jsx)(d.NextLink,{href:"/badge",children:"Badge"})," for usage."]})},{name:"img",types:(0,t.jsx)(d.NextLink,{href:{hash:"img-prop-table",query:{props:"img"}},children:"ImgProps"}),description:(0,t.jsxs)(t.Fragment,{children:["Renders a thumbnail between the ",(0,t.jsx)(o.Code,{primary:!0,children:"Checkbox"})," and its label, sized 40×40 by default, and vertically centers the row. See"," ",(0,t.jsx)(d.NextLink,{href:{hash:"img-prop-table",query:{props:"img"}},children:"ImgProps"})," for usage."]})}],f=[{name:"text",types:["string"],required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Description to display below ",(0,t.jsx)(o.Code,{primary:!0,children:"Label"})]})},{name:"link",types:(0,t.jsx)(d.NextLink,{href:{hash:"checkbox-description-link-prop-table",query:{props:"checkbox-description-link"}},children:"CheckboxDescriptionLink"}),description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(d.NextLink,{href:{hash:"checkbox-description-link-prop-table",query:{props:"checkbox-description-link"}},children:"CheckboxDescriptionLink"})," ","for usage."]})}],m=e=>(0,t.jsx)(u.PropTable,{nativeElement:["input","all"],propList:h,title:"Checkbox",...e}),g=e=>(0,t.jsx)(u.PropTable,{propList:f,title:"Checkbox[CheckboxDescription]",...e,id:"checkbox-description-prop-table"}),x=e=>(0,t.jsx)(u.PropTable,{propList:p.messagingLinkItemProps,title:"Checkbox[CheckboxDescriptionLink]",...e,id:"checkbox-description-link-prop-table"}),b=e=>(0,t.jsx)(u.PropTable,{nativeElement:["img","all"],propList:[],title:"Img",...e});e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.H1,{children:"Checkbox"}),(0,t.jsxs)(n.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(o.Code,{primary:!0,children:"Checkboxes"})," let users toggle settings on and off within a form."]}),(0,t.jsx)(r.Text,{bold:!0,children:"When to use:"}),(0,t.jsx)(c.List,{children:(0,t.jsxs)(c.List.Item,{children:["Use ",(0,t.jsx)(o.Code,{primary:!0,children:"Checkboxes"})," when users can toggle one or more items in a form."]})})]}),(0,t.jsx)(n.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(a.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(o.Code,{primary:!0,children:"Checkboxes"})," are a stylized"," ",(0,t.jsx)(o.Code,{children:'input[type="checkbox"]'})," with controllable checked/unchecked states."]}),(0,t.jsx)(s.CodePreview,{children:`function Example() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked(!checked);

  return (
    <Form>
      <FormGroup>
        <Checkbox
          checked={checked}
          label={checked ? 'Checked' : 'Unchecked'}
          onChange={handleChange}
        />
        <Checkbox disabled={true} label="Disabled" />
      </FormGroup>
    </Form>
  );
}`})]},"basic")},{id:"indeterminate",title:"Indeterminate",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(o.Code,{primary:!0,children:"Checkboxes"})," support ",(0,t.jsx)(o.Code,{primary:!0,children:"isIndeterminate"})," ","passed as a prop to show a combined state of partially selected"," ",(0,t.jsx)(o.Code,{primary:!0,children:"Checkboxes"}),"."]}),(0,t.jsx)(s.CodePreview,{children:`<Form>
  <FormGroup>
    <Checkbox isIndeterminate label="Indeterminate" />
  </FormGroup>
</Form>`})]},"implementation")},{id:"description",title:"Description",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(o.Code,{primary:!0,children:"Checkboxes"})," support ",(0,t.jsx)(o.Code,{primary:!0,children:"description"})," passed as a prop, which contains a text and an optional link."]}),(0,t.jsx)(s.CodePreview,{children:`function Example() {
  const [checkedA, setChangeA] = useState(false);
  const [checkedB, setChangeB] = useState(false);
  const handleChangeA = () => setChangeA(!checkedA);
  const handleChangeB = () => setChangeB(!checkedB);

  return (
    <Form>
      <FormGroup>
        <Checkbox
          checked={checkedA}
          description={{
            text: 'I am a CheckboxDescription.',
            link: {
              text: 'Learn more',
              href: 'http://www.bigcommerce.com',
            },
          }}
          label="Checkbox with description and link"
          onChange={handleChangeA}
        />
        <Checkbox
          checked={checkedB}
          description="I am a string description."
          label="Checkbox with description"
          onChange={handleChangeB}
        />
      </FormGroup>
    </Form>
  );
}`})]},"description")},{id:"badge",title:"Badge",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(o.Code,{primary:!0,children:"Checkboxes"})," support ",(0,t.jsx)(o.Code,{primary:!0,children:"Badge"})," that display"," ","status information."]}),(0,t.jsx)(s.CodePreview,{children:`function Example() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked(!checked);

  return (
    <Form>
      <FormGroup>
        <Checkbox
          badge={{
            label: 'warning',
            variant: 'warning',
          }}
          checked={checked}
          label={checked ? 'Checked' : 'Unchecked'}
          onChange={handleChange}
        />
        <Checkbox
          badge={{
            label: 'danger',
            variant: 'danger',
          }}
          disabled={true}
          label="Disabled"
        />
      </FormGroup>
    </Form>
  );
}`})]},"badge")},{id:"image",title:"Image",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(o.Code,{primary:!0,children:"Checkboxes"})," support an ",(0,t.jsx)(o.Code,{primary:!0,children:"img"})," thumbnail shown between the checkbox and its label. Set ",(0,t.jsx)(o.Code,{primary:!0,children:"alt"})," when the image conveys meaning the label doesn't; when omitted it is treated as decorative."]}),(0,t.jsx)(s.CodePreview,{children:`function Example() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked(!checked);

  return (
    <Form>
      <FormGroup>
        <Checkbox
          checked={checked}
          description="Accept credit cards and digital wallets."
          img={{ src: '/logo.svg', alt: 'Payment provider' }}
          label="Enable payment provider"
          onChange={handleChange}
        />
      </FormGroup>
    </Form>
  );
}`})]},"image")}]})}),(0,t.jsx)(n.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(a.ContentRoutingTabs,{id:"props",routes:[{id:"checkbox",title:"Checkbox",render:()=>(0,t.jsx)(m,{})},{id:"checkbox-description",title:"CheckboxDescription",render:()=>(0,t.jsx)(g,{id:"checkbox-description-prop-table"})},{id:"checkbox-description-link",title:"CheckboxDescriptionLink",render:()=>(0,t.jsx)(x,{id:"checkbox-description-link-prop-table"})},{id:"img",title:"ImgProps",render:()=>(0,t.jsx)(b,{id:"img-prop-table"})}]})}),(0,t.jsx)(n.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(l.GuidelinesTable,{discouraged:[(0,t.jsxs)(t.Fragment,{children:["Apply changes made with the ",(0,t.jsx)(o.Code,{primary:!0,children:"Checkbox"})," right away without additional save action."]})],recommended:[(0,t.jsxs)(t.Fragment,{children:["Use ",(0,t.jsx)(o.Code,{primary:!0,children:"Checkboxes"})," to turn on and off settings within a form."]}),(0,t.jsxs)(t.Fragment,{children:["Group related ",(0,t.jsx)(o.Code,{primary:!0,children:"Checkboxes"})," under input label (h4)."]})]})})]})],46584)},94899,(e,t,r)=>{let n="/checkbox";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>e.r(46584)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([n])})}]);