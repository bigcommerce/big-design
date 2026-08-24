(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,r)=>{"use strict";r._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,r)=>{"use strict";function n(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(n=function(e){return e?r:t})(e)}r._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=n(t);if(r&&r.has(e))return r.get(e);var o={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=i?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(o,a,s):o[a]=e[a]}return o.default=e,r&&r.set(e,o),o}},67327,(e,t,r)=>{"use strict";function n(e,t,r,n){return!1}e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getDomainLocale",{enumerable:!0,get:function(){return n}}),e.r(13144),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},48637,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return k},useLinkStatus:function(){return P}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=e.r(10375),a=e.r(80447),s=i._(e.r(99161)),l=e.r(30766),d=e.r(61148),c=e.r(98993),u=e.r(81677),p=e.r(74962),f=e.r(16262),h=e.r(7398),m=e.r(67327),g=e.r(66263),b=e.r(55279),y=new Set;function x(e,t,r,n){if(!("u"<typeof window)&&(0,d.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){let o=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(y.has(o))return;y.add(o)}e.prefetch(t,r,n).catch(e=>{})}}function j(e){return"string"==typeof e?e:(0,c.formatUrl)(e)}let v=s.default.forwardRef(function(e,t){let r,n,{href:o,as:i,children:c,prefetch:y=null,passHref:v,replace:C,shallow:P,scroll:k,locale:_,onClick:R,onNavigate:w,onMouseEnter:L,onTouchStart:O,legacyBehavior:S=!1,transitionTypes:F,...M}=e;r=c,S&&("string"==typeof r||"number"==typeof r)&&(r=(0,a.jsx)("a",{children:r}));let T=s.default.useContext(f.RouterContext),I=!1!==y,{href:E,as:D}=s.default.useMemo(()=>{if(!T){let e=j(o);return{href:e,as:i?j(i):e}}let[e,t]=(0,l.resolveHref)(T,o,!0);return{href:e,as:i?(0,l.resolveHref)(T,i):t||e}},[T,o,i]),N=s.default.useRef(E),$=s.default.useRef(D);S&&(n=s.default.Children.only(r));let A=S?n&&"object"==typeof n&&n.ref:t,[G,q,z]=(0,h.useIntersection)({rootMargin:"200px"}),U=s.default.useCallback(e=>{($.current!==D||N.current!==E)&&(z(),$.current=D,N.current=E),G(e)},[D,E,z,G]),B=(0,b.useMergedRef)(U,A);s.default.useEffect(()=>{!T||q&&I&&x(T,E,D,{bypassPrefetchedCheck:!1,locale:_})},[D,E,q,_,I,T?.locale,T]);let H={ref:B,onClick(e){S||"function"!=typeof R||R(e),S&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),!T||e.defaultPrevented||function(e,t,r,n,o,i,a,s,l){let c,{nodeName:u}=e.currentTarget;if(!("A"===u.toUpperCase()&&((c=e.currentTarget.getAttribute("target"))&&"_self"!==c||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,d.isLocalURL)(r)){o&&(e.preventDefault(),location.replace(r));return}e.preventDefault(),(()=>{if(l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let e=a??!0;"beforePopState"in t?t[o?"replace":"push"](r,n,{shallow:i,locale:s,scroll:e}):t[o?"replace":"push"](n||r,{scroll:e})})()}}(e,T,E,D,C,P,k,_,w)},onMouseEnter(e){S||"function"!=typeof L||L(e),S&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),T&&x(T,E,D,{locale:_,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){S||"function"!=typeof O||O(e),S&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),T&&x(T,E,D,{locale:_,priority:!0,bypassPrefetchedCheck:!0})}};if((0,u.isAbsoluteUrl)(D))H.href=D;else if(!S||v||"a"===n.type&&!("href"in n.props)){let e=void 0!==_?_:T?.locale;H.href=T?.isLocaleDomain&&(0,m.getDomainLocale)(D,e,T?.locales,T?.domainLocales)||(0,g.addBasePath)((0,p.addLocale)(D,e,T?.defaultLocale))}return S?s.default.cloneElement(n,H):(0,a.jsx)("a",{...M,...H,children:r})}),C=(0,s.createContext)({pending:!1}),P=()=>(0,s.useContext)(C),k=v;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},41662,(e,t,r)=>{t.exports=e.r(48637)},7398,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useIntersection",{enumerable:!0,get:function(){return l}});let n=e.r(99161),o=e.r(11229),i="function"==typeof IntersectionObserver,a=new Map,s=[];function l({rootRef:e,rootMargin:t,disabled:r}){let d=r||!i,[c,u]=(0,n.useState)(!1),p=(0,n.useRef)(null),f=(0,n.useCallback)(e=>{p.current=e},[]);return(0,n.useEffect)(()=>{if(i){if(d||c)return;let r=p.current;if(r&&r.tagName)return function(e,t,r){let{id:n,observer:o,elements:i}=function(e){let t,r={root:e.root||null,margin:e.rootMargin||""},n=s.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=a.get(n)))return t;let o=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:o},s.push(r),a.set(r,t),t}(r);return i.set(e,t),o.observe(e),function(){if(i.delete(e),o.unobserve(e),0===i.size){o.disconnect(),a.delete(n);let e=s.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&s.splice(e,1)}}}(r,e=>e&&u(e),{root:e?.current,rootMargin:t})}else if(!c){let e=(0,o.requestIdleCallback)(()=>u(!0));return()=>(0,o.cancelIdleCallback)(e)}},[d,t,e,c,p.current]),[f,c,(0,n.useCallback)(()=>{u(!1)},[])]}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},55279,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(99161);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=i(e,n)),t&&(o.current=i(t,n))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HeadManagerContext",{enumerable:!0,get:function(){return n}});let n=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let n=e.r(80763)._(e.r(99161)),o=e.r(3221),i=n.default.createContext(o.imageConfigDefault)},3221,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return a}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["default","imgix","cloudinary","akamai","custom"],a={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return b},MiddlewareNotFoundError:function(){return v},MissingStaticPage:function(){return j},NormalizeError:function(){return y},PageNotFoundError:function(){return x},SP:function(){return m},ST:function(){return g},WEB_VITALS:function(){return i},execOnce:function(){return a},getDisplayName:function(){return u},getLocationOrigin:function(){return d},getURL:function(){return c},isAbsoluteUrl:function(){return l},isResSent:function(){return p},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return f},stringifyError:function(){return C}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&s.test(e)};function d(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=d();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function f(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&p(r))return n;if(!n)throw Object.defineProperty(Error(`"${u(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let m="u">typeof performance,g=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class b extends Error{}class y extends Error{}class x extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class j extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class v extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function C(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,r)=>{t.exports=e.r(25236)},36712,e=>{"use strict";var t=e.i(80447),r=e.i(77136),n=e.i(29636),o=e.i(51969);let i=[{name:"header",types:"string",description:"Optional header to display in message."},{name:"messages",types:(0,t.jsx)(n.NextLink,{href:{hash:"message-item-prop-table",query:{props:"message-item"}},children:"MessageItem"}),description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(n.NextLink,{href:{hash:"message-item-prop-table",query:{props:"message-item"}},children:"MessageItem"})," ","for usage."]}),required:!0},{name:"type",types:["success","error","warning","info"],description:"Determines the style of message to display.",defaultValue:"success"},{name:"onClose",types:"() => void",description:"Function that will be called on close events."}],a=[{name:"text",types:"string",description:"Message to be displayed.",required:!0},{name:"link",types:(0,t.jsx)(n.NextLink,{href:{hash:"message-link-item-prop-table",query:{props:"message-link-item"}},children:"MessageLinkItem"}),description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(n.NextLink,{href:{hash:"message-link-item-prop-table",query:{props:"message-link-item"}},children:"MessageLinkItem"})," ","for usage."]})}],s=[{name:"external",types:"boolean",description:(0,t.jsxs)(t.Fragment,{children:["Shows an external icon when the ",(0,t.jsx)(r.Code,{primary:!0,children:"external"}),' prop is set and target="_blank".']})},{name:"href",types:"string",description:"Same as a HTML anchor href attribute."},{name:"text",types:"string",description:"Link text to display."},{name:"target",types:"string",description:"Same as a HTML anchor target attribute."}];e.s(["MessagingItemPropTable",0,e=>(0,t.jsx)(o.PropTable,{propList:a,title:"",...e,id:"message-item-prop-table"}),"MessagingLinkItemPropTable",0,e=>(0,t.jsx)(o.PropTable,{propList:s,title:"",...e,id:"message-link-item-prop-table"}),"messagingLinkItemProps",0,s,"sharedMessagingProps",0,i])},21908,e=>{"use strict";var t=e.i(80447),r=e.i(1304),n=e.i(23539),o=e.i(84033);let i=({routes:e,id:i})=>{let{activeContent:a,activePills:s,pills:l,handlePillClick:d}=((e,t)=>{let{query:r,push:n}=(0,o.useRouter)(),i=e.map(({render:e,...t})=>t),a=r[t],s=a&&!Array.isArray(a)?a:e[0].id;return{activeContent:e.find(e=>e.id===s),activePills:s?[s]:[],pills:i,handlePillClick:e=>{n({query:{...r,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,i);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.PillTabs,{activePills:s,items:l,onPillClick:d}),(0,t.jsx)(r.Box,{marginTop:"xSmall",children:a?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(i,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),r=e.i(81542);let n=r.css`
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
`,a=({columnCount:e=1,columnGap:r="normal",as:n="ul",children:a,reset:s,...l})=>(0,t.jsx)("ol"===n?o:i,{$columnCount:e,$columnGap:r,$reset:s,...l,children:a});a.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,a],52510)},29636,e=>{"use strict";var t=e.i(80447),r=e.i(41662),n=e.i(81542);let o=(0,n.default)(r.default).withConfig({displayName:"NextLink.tsx__StyledLink",componentId:"sc-72da42e3-0"})`
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
`;e.s(["NextLink",0,({children:e,href:r})=>(0,t.jsx)(o,{href:r,children:e})])},51606,e=>{"use strict";var t=e.i(80447),r=e.i(13332),n=e.i(7277),o=e.i(99161),i=e.i(77136),a=e.i(27746),s=e.i(21908),l=e.i(83603),d=e.i(52510),c=e.i(29636),u=e.i(51969),p=e.i(36712);let f=[{name:"label",types:["string","RadioLabel"],required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Label to display next to a ",(0,t.jsx)(i.Code,{primary:!0,children:"Radio"})," component."]})},{name:"description",types:["string","RadioDescription"],description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(c.NextLink,{href:{hash:"radio-description-prop-table",query:{props:"radio-description"}},children:"RadioDescription"})," ","for usage."]})}],h=[{name:"text",types:["string"],required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Description to display below ",(0,t.jsx)(i.Code,{primary:!0,children:"label"}),"."]})},{name:"link",types:["RadioDescriptionLink"],description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(c.NextLink,{href:{hash:"radio-description-link-prop-table",query:{props:"radio-description-link"}},children:"RadioDescriptionLink"})," ","for usage."]})}],m=e=>(0,t.jsx)(u.PropTable,{nativeElement:["input","all"],propList:f,title:"Radio",...e}),g=e=>(0,t.jsx)(u.PropTable,{propList:h,title:"Radio[RadioDescription]",...e,id:"radio-description-prop-table"}),b=e=>(0,t.jsx)(u.PropTable,{propList:p.messagingLinkItemProps,title:"Radio[RadioDescriptionLink]",...e,id:"radio-description-link-prop-table"});e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.H1,{children:"Radio"}),(0,t.jsxs)(n.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsx)(r.Text,{children:"Radio buttons let users select an option from a list of two or more items."}),(0,t.jsx)(r.Text,{bold:!0,children:"When to use:"}),(0,t.jsx)(d.List,{children:(0,t.jsx)(d.List.Item,{children:"Use radio buttons when a user can only make one, mutually exclusive selection from a list."})})]}),(0,t.jsx)(n.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(s.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsxs)(o.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["A ",(0,t.jsx)(i.Code,{primary:!0,children:"Radio"})," is a group of items from which a single option can be selected."]}),(0,t.jsx)(a.CodePreview,{children:`function Example() {
  const [selected, setSelected] = useState('');

  const handleChange: InputProps['onChange'] = (event) =>
    setSelected(event.target.value);

  return (
    <Form>
      <FormGroup>
        <Radio
          checked={selected === 'on'}
          label="On"
          onChange={handleChange}
          value="on"
        />
        <Radio
          checked={selected === 'off'}
          label="Off"
          onChange={handleChange}
          value="off"
        />
        <Radio
          checked={selected === 'disabled'}
          disabled={true}
          label="Disabled"
          onChange={handleChange}
          value="disabled"
        />
      </FormGroup>
    </Form>
  );
}`})]},"basic")},{id:"grouping",title:"Grouping",render:()=>(0,t.jsxs)(o.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["In order to group radio controls, use the ",(0,t.jsx)(i.Code,{children:"Fieldset"})," component to separate the controls."]}),(0,t.jsx)(a.CodePreview,{children:`function Example() {
  const [firstRadio, setFirstRadio] = useState('');
  const [secondRadio, setSecondRadio] = useState('');

  const handleFirstChange: InputProps['onChange'] = (event) =>
    setFirstRadio(event.target.value);
  const handleSecondChange: InputProps['onChange'] = (event) =>
    setSecondRadio(event.target.value);

  return (
    <Form>
      <Fieldset legend="First Group">
        <FormGroup>
          <Radio
            checked={firstRadio === 'on'}
            label="On"
            onChange={handleFirstChange}
            value="on"
          />
          <Radio
            checked={firstRadio === 'off'}
            label="Off"
            onChange={handleFirstChange}
            value="off"
          />
        </FormGroup>
      </Fieldset>
      <Fieldset legend="Second Group">
        <FormGroup>
          <Radio
            checked={secondRadio === 'on'}
            label="On"
            onChange={handleSecondChange}
            value="on"
          />
          <Radio
            checked={secondRadio === 'off'}
            label="Off"
            onChange={handleSecondChange}
            value="off"
          />
        </FormGroup>
      </Fieldset>
    </Form>
  );
}`})]},"grouping")},{id:"description",title:"Description",render:()=>(0,t.jsxs)(o.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["Radio support ",(0,t.jsx)(i.Code,{primary:!0,children:"description"})," passed as a prop, which contains a text and an optional link."]}),(0,t.jsx)(a.CodePreview,{children:`function Example() {
  const [selected, setSelected] = useState('');

  const handleChange: InputProps['onChange'] = (event) =>
    setSelected(event.target.value);

  return (
    <Form>
      <FormGroup>
        <Radio
          checked={selected === 'on'}
          description="Description for on"
          label="On"
          onChange={handleChange}
          value="on"
        />
        <Radio
          checked={selected === 'off'}
          description="Description for off"
          label="Off"
          onChange={handleChange}
          value="off"
        />
        <Radio
          checked={selected === 'disabled'}
          description={{
            text: 'Description for disabled.',
            link: {
              text: 'Learn more',
              target: '_blank',
              href: 'http://www.bigcommerce.com',
            },
          }}
          disabled={true}
          label="Disabled"
          onChange={handleChange}
          value="disabled"
        />
      </FormGroup>
    </Form>
  );
}`})]},"description")}]})}),(0,t.jsx)(n.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(s.ContentRoutingTabs,{id:"props",routes:[{id:"radio",title:"Radio",render:()=>(0,t.jsx)(m,{})},{id:"radio-description",title:"RadioDescription",render:()=>(0,t.jsx)(g,{})},{id:"radio-description-link",title:"RadioDescriptionLink",render:()=>(0,t.jsx)(b,{})}]})}),(0,t.jsx)(n.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(l.GuidelinesTable,{discouraged:[(0,t.jsx)(t.Fragment,{children:"Don’t use radio buttons for long lists of short items. Use a select input instead."}),(0,t.jsx)(t.Fragment,{children:"A set of radio buttons should not have a state of being “unselected.” There must always be a selection."})],recommended:[(0,t.jsx)(t.Fragment,{children:"Group related radio buttons under input headings."}),(0,t.jsx)(t.Fragment,{children:"Include a default selected option with the radio buttons."}),(0,t.jsx)(t.Fragment,{children:"Lay radio buttons vertically."})]})})]})],51606)},34577,(e,t,r)=>{let n="/radio";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>e.r(51606)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([n])})}]);