(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,r)=>{"use strict";r._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,r)=>{"use strict";function i(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(i=function(e){return e?r:t})(e)}r._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=i(t);if(r&&r.has(e))return r.get(e);var n={__proto__:null},l=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var s=l?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(n,o,s):n[o]=e[o]}return n.default=e,r&&r.set(e,n),n}},67327,(e,t,r)=>{"use strict";function i(e,t,r,i){return!1}e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getDomainLocale",{enumerable:!0,get:function(){return i}}),e.r(13144),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},48637,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var i={default:function(){return I},useLinkStatus:function(){return j}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let l=e.r(10375),o=e.r(80447),s=l._(e.r(99161)),a=e.r(30766),c=e.r(61148),u=e.r(98993),d=e.r(81677),p=e.r(74962),f=e.r(16262),m=e.r(7398),h=e.r(67327),g=e.r(66263),b=e.r(55279),y=new Set;function P(e,t,r,i){if(!("u"<typeof window)&&(0,c.isLocalURL)(t)){if(!i.bypassPrefetchedCheck){let n=t+"%"+r+"%"+(void 0!==i.locale?i.locale:"locale"in e?e.locale:void 0);if(y.has(n))return;y.add(n)}e.prefetch(t,r,i).catch(e=>{})}}function v(e){return"string"==typeof e?e:(0,u.formatUrl)(e)}let x=s.default.forwardRef(function(e,t){let r,i,{href:n,as:l,children:u,prefetch:y=null,passHref:x,replace:w,shallow:j,scroll:I,locale:C,onClick:T,onNavigate:_,onMouseEnter:k,onTouchStart:O,legacyBehavior:L=!1,transitionTypes:S,...E}=e;r=u,L&&("string"==typeof r||"number"==typeof r)&&(r=(0,o.jsx)("a",{children:r}));let A=s.default.useContext(f.RouterContext),F=!1!==y,{href:M,as:D}=s.default.useMemo(()=>{if(!A){let e=v(n);return{href:e,as:l?v(l):e}}let[e,t]=(0,a.resolveHref)(A,n,!0);return{href:e,as:l?(0,a.resolveHref)(A,l):t||e}},[A,n,l]),N=s.default.useRef(M),R=s.default.useRef(D);L&&(i=s.default.Children.only(r));let $=L?i&&"object"==typeof i&&i.ref:t,[z,q,G]=(0,m.useIntersection)({rootMargin:"200px"}),B=s.default.useCallback(e=>{(R.current!==D||N.current!==M)&&(G(),R.current=D,N.current=M),z(e)},[D,M,G,z]),U=(0,b.useMergedRef)(B,$);s.default.useEffect(()=>{!A||q&&F&&P(A,M,D,{bypassPrefetchedCheck:!1,locale:C})},[D,M,q,C,F,A?.locale,A]);let W={ref:U,onClick(e){L||"function"!=typeof T||T(e),L&&i.props&&"function"==typeof i.props.onClick&&i.props.onClick(e),!A||e.defaultPrevented||function(e,t,r,i,n,l,o,s,a){let u,{nodeName:d}=e.currentTarget;if(!("A"===d.toUpperCase()&&((u=e.currentTarget.getAttribute("target"))&&"_self"!==u||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,c.isLocalURL)(r)){n&&(e.preventDefault(),location.replace(r));return}e.preventDefault(),(()=>{if(a){let e=!1;if(a({preventDefault:()=>{e=!0}}),e)return}let e=o??!0;"beforePopState"in t?t[n?"replace":"push"](r,i,{shallow:l,locale:s,scroll:e}):t[n?"replace":"push"](i||r,{scroll:e})})()}}(e,A,M,D,w,j,I,C,_)},onMouseEnter(e){L||"function"!=typeof k||k(e),L&&i.props&&"function"==typeof i.props.onMouseEnter&&i.props.onMouseEnter(e),A&&P(A,M,D,{locale:C,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){L||"function"!=typeof O||O(e),L&&i.props&&"function"==typeof i.props.onTouchStart&&i.props.onTouchStart(e),A&&P(A,M,D,{locale:C,priority:!0,bypassPrefetchedCheck:!0})}};if((0,d.isAbsoluteUrl)(D))W.href=D;else if(!L||x||"a"===i.type&&!("href"in i.props)){let e=void 0!==C?C:A?.locale;W.href=A?.isLocaleDomain&&(0,h.getDomainLocale)(D,e,A?.locales,A?.domainLocales)||(0,g.addBasePath)((0,p.addLocale)(D,e,A?.defaultLocale))}return L?s.default.cloneElement(i,W):(0,o.jsx)("a",{...E,...W,children:r})}),w=(0,s.createContext)({pending:!1}),j=()=>(0,s.useContext)(w),I=x;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},41662,(e,t,r)=>{t.exports=e.r(48637)},7398,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useIntersection",{enumerable:!0,get:function(){return a}});let i=e.r(99161),n=e.r(11229),l="function"==typeof IntersectionObserver,o=new Map,s=[];function a({rootRef:e,rootMargin:t,disabled:r}){let c=r||!l,[u,d]=(0,i.useState)(!1),p=(0,i.useRef)(null),f=(0,i.useCallback)(e=>{p.current=e},[]);return(0,i.useEffect)(()=>{if(l){if(c||u)return;let r=p.current;if(r&&r.tagName)return function(e,t,r){let{id:i,observer:n,elements:l}=function(e){let t,r={root:e.root||null,margin:e.rootMargin||""},i=s.find(e=>e.root===r.root&&e.margin===r.margin);if(i&&(t=o.get(i)))return t;let n=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=n.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:n},s.push(r),o.set(r,t),t}(r);return l.set(e,t),n.observe(e),function(){if(l.delete(e),n.unobserve(e),0===l.size){n.disconnect(),o.delete(i);let e=s.findIndex(e=>e.root===i.root&&e.margin===i.margin);e>-1&&s.splice(e,1)}}}(r,e=>e&&d(e),{root:e?.current,rootMargin:t})}else if(!u){let e=(0,n.requestIdleCallback)(()=>d(!0));return()=>(0,n.cancelIdleCallback)(e)}},[c,t,e,u,p.current]),[f,u,(0,i.useCallback)(()=>{d(!1)},[])]}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},55279,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return n}});let i=e.r(99161);function n(e,t){let r=(0,i.useRef)(null),n=(0,i.useRef)(null);return(0,i.useCallback)(i=>{if(null===i){let e=r.current;e&&(r.current=null,e());let t=n.current;t&&(n.current=null,t())}else e&&(r.current=l(e,i)),t&&(n.current=l(t,i))},[e,t])}function l(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HeadManagerContext",{enumerable:!0,get:function(){return i}});let i=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return l}});let i=e.r(80763)._(e.r(99161)),n=e.r(3221),l=i.default.createContext(n.imageConfigDefault)},3221,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i={VALID_LOADERS:function(){return l},imageConfigDefault:function(){return o}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let l=["default","imgix","cloudinary","akamai","custom"],o={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var i={DecodeError:function(){return b},MiddlewareNotFoundError:function(){return x},MissingStaticPage:function(){return v},NormalizeError:function(){return y},PageNotFoundError:function(){return P},SP:function(){return h},ST:function(){return g},WEB_VITALS:function(){return l},execOnce:function(){return o},getDisplayName:function(){return d},getLocationOrigin:function(){return c},getURL:function(){return u},isAbsoluteUrl:function(){return a},isResSent:function(){return p},loadGetInitialProps:function(){return m},normalizeRepeatedSlashes:function(){return f},stringifyError:function(){return w}};for(var n in i)Object.defineProperty(r,n,{enumerable:!0,get:i[n]});let l=["CLS","FCP","FID","INP","LCP","TTFB"];function o(e){let t,r=!1;return(...i)=>(r||(r=!0,t=e(...i)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,a=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&s.test(e)};function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function u(){let{href:e}=window.location,t=c();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function f(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function m(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await m(t.Component,t.ctx)}:{};let i=await e.getInitialProps(t);if(r&&p(r))return i;if(!i)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${i}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return i}let h="u">typeof performance,g=h&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class b extends Error{}class y extends Error{}class P extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class v extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class x extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function w(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,r)=>{t.exports=e.r(25236)},21908,e=>{"use strict";var t=e.i(80447),r=e.i(1304),i=e.i(23539),n=e.i(84033);let l=({routes:e,id:l})=>{let{activeContent:o,activePills:s,pills:a,handlePillClick:c}=((e,t)=>{let{query:r,push:i}=(0,n.useRouter)(),l=e.map(({render:e,...t})=>t),o=r[t],s=o&&!Array.isArray(o)?o:e[0].id;return{activeContent:e.find(e=>e.id===s),activePills:s?[s]:[],pills:l,handlePillClick:e=>{i({query:{...r,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,l);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(i.PillTabs,{activePills:s,items:a,onPillClick:c}),(0,t.jsx)(r.Box,{marginTop:"xSmall",children:o?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(l,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),r=e.i(81542);let i=r.css`
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
`,n=r.default.ol.withConfig({displayName:"styled.tsx__StyledOrderedList",componentId:"sc-6a6922be-0"})`
  ${i};
`,l=r.default.ul.withConfig({displayName:"styled.tsx__StyledUnorderedList",componentId:"sc-6a6922be-1"})`
  ${i}
`,o=({columnCount:e=1,columnGap:r="normal",as:i="ul",children:o,reset:s,...a})=>(0,t.jsx)("ol"===i?n:l,{$columnCount:e,$columnGap:r,$reset:s,...a,children:o});o.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,o],52510)},29636,e=>{"use strict";var t=e.i(80447),r=e.i(41662),i=e.i(81542);let n=(0,i.default)(r.default).withConfig({displayName:"NextLink.tsx__StyledLink",componentId:"sc-72da42e3-0"})`
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
`;e.s(["NextLink",0,({children:e,href:r})=>(0,t.jsx)(n,{href:r,children:e})])},45877,e=>{"use strict";var t=e.i(80447),r=e.i(13332),i=e.i(7277),n=e.i(77136),l=e.i(27746),o=e.i(21908),s=e.i(83603),a=e.i(52510),c=e.i(29636),u=e.i(51969);let d=[{name:"activePills",types:"string[]",description:"The currently active pill ids as an array of strings."},{description:(0,t.jsxs)(t.Fragment,{children:["Accepts either a flat array of"," ",(0,t.jsx)(c.NextLink,{href:{hash:"pill-tabs-items-prop-table",query:{props:"pill-tab-item"}},children:"PillTabItem"})," ","or an array of"," ",(0,t.jsx)(c.NextLink,{href:{hash:"pill-tabs-item-group-prop-table",query:{props:"pill-tab-item-group"}},children:"PillTabItemGroup"})," ","for grouped pills with visual separators."]}),name:"items",required:!0,types:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c.NextLink,{href:{hash:"pill-tabs-items-prop-table",query:{props:"pill-tab-item"}},children:"PillTabItem[]"})," ","|"," ",(0,t.jsx)(c.NextLink,{href:{hash:"pill-tabs-item-group-prop-table",query:{props:"pill-tab-item-group"}},children:"PillTabItemGroup[]"})]})},{name:"onPillClick",types:"(itemId: string) => void",description:"Function that will get called when a pill tab is clicked.",required:!0},{name:"dropdownItems",types:"Array<DropdownItem | DropdownLinkItem> | Array<DropdownItemGroup>",description:(0,t.jsxs)(t.Fragment,{children:["See the ",(0,t.jsx)(c.NextLink,{href:"/dropdown",children:"Dropdown"})," component for usage."]})},{name:"dropdownMaxWidth",types:"number",description:(0,t.jsxs)(t.Fragment,{children:["Forwarded to the overflow ",(0,t.jsx)(c.NextLink,{href:"/dropdown",children:"Dropdown"})," as"," ",(0,t.jsx)("code",{children:"maxWidth"}),". Caps the overflow menu width (in px) and wraps long pill titles instead of letting them overflow."]})}],p=e=>(0,t.jsx)(u.PropTable,{propList:d,title:"PillTabs",...e}),f=[{name:"title",types:"string",description:"The text inside the Pill Tab Item.",required:!0},{description:"A unique identifier for the pill.",name:"id",required:!0,types:"string"}],m=e=>(0,t.jsx)(u.PropTable,{propList:f,title:"PillTabs[PillTabItem]",...e}),h=[{name:"items",types:"PillTabItem[]",description:"Array of pill tab items within this group.",required:!0},{name:"label",types:"string",description:"Optional label displayed as a header in the dropdown when items overflow."},{name:"separated",types:"boolean",description:"Whether to show a separator before this group in the dropdown."}],g=e=>(0,t.jsx)(u.PropTable,{propList:h,title:"PillTabs[PillTabItemGroup]",...e});e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.H1,{children:"PillTabs"}),(0,t.jsxs)(i.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(n.Code,{primary:!0,children:"PillTabs"})," are horizontal navigation buttons within panels. They switch between frequently used filters or sub-views of the same content."]}),(0,t.jsx)(r.Text,{bold:!0,children:"When to use:"}),(0,t.jsxs)(a.List,{children:[(0,t.jsx)(a.List.Item,{children:"To switch between different views or filters of data within a table."}),(0,t.jsx)(a.List.Item,{children:"To switch between different variants of content."})]})]}),(0,t.jsx)(i.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(o.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsx)(l.CodePreview,{children:`function Example() {
  const [activePills, setActivePills] = useState<string[]>([]);
  const Card: React.FC<{ name: string; description: string }> = ({
    name,
    description,
  }) => (
    <Flex
      border="box"
      borderRadius="normal"
      flexDirection="column"
      margin="xxSmall"
      padding="medium"
    >
      <FlexItem marginBottom="xxSmall">
        <Text bold>{name}</Text>
      </FlexItem>
      <FlexItem flexGrow={1}>
        <Text>{description}</Text>
      </FlexItem>
      <FlexItem>
        <Link href="#">Install</Link>
      </FlexItem>
    </Flex>
  );
  const items = [
    { title: 'Shipping', id: 'shipping' },
    { title: 'Orders', id: 'orders' },
  ];
  const onPillClick = (pillId: string) => {
    const isPillActive = !activePills.includes(pillId);
    const updatedPills = isPillActive
      ? [...activePills, pillId]
      : activePills.filter((activePillId) => activePillId !== pillId);

    setActivePills(updatedPills);
  };
  const cards = [
    {
      name: 'Shipping App Pro',
      description: 'All your shipping needs in a one stop shop.',
      type: 'shipping',
    },
    {
      name: 'Order Tracker Deluxe',
      description: 'Track your orders across all your devices.',
      type: 'orders',
    },
    {
      name: 'Expedited Shipper',
      description: 'The best rush rates in the country.',
      type: 'shipping',
    },
    {
      name: 'Inventory Wizard',
      description: 'Inventory tracking app to cover all your needs.',
      type: 'other',
    },
  ];
  const isFiltered = Boolean(activePills.length);
  const filteredCards = cards.filter((card) => activePills.includes(card.type));
  const appCards = isFiltered ? filteredCards : cards;

  return (
    <>
      <PillTabs
        activePills={activePills}
        items={items}
        onPillClick={onPillClick}
      />
      <Flex>
        {appCards.map(({ name, description }) => (
          <Card description={description} key={name} name={name} />
        ))}
      </Flex>
    </>
  );
}`})},{id:"with-item-groups",title:"Item Groups",render:()=>(0,t.jsx)(l.CodePreview,{children:`function Example() {
  const [activePills, setActivePills] = useState<string[]>([]);

  const itemGroups = [
    {
      label: 'Status',
      items: [
        { title: 'All', id: 'all' },
        { title: 'Out of stock', id: 'out-of-stock' },
        { title: 'Low stock', id: 'low-stock' },
      ],
    },
    {
      label: 'Categories',
      items: [
        { title: 'Electronics', id: 'electronics' },
        { title: 'Clothing', id: 'clothing' },
        { title: 'Home & Garden', id: 'home-garden' },
      ],
    },
  ];

  const onPillClick = (pillId: string) => {
    const isPillActive = !activePills.includes(pillId);
    const updatedPills = isPillActive
      ? [...activePills, pillId]
      : activePills.filter((activePillId) => activePillId !== pillId);

    setActivePills(updatedPills);
  };

  return (
    <PillTabs
      activePills={activePills}
      items={itemGroups}
      onPillClick={onPillClick}
    />
  );
}`})},{id:"with-dropdown-items",title:"Dropdown Items",render:()=>(0,t.jsx)(l.CodePreview,{children:`function Example() {
  const [activePills, setActivePills] = useState<string[]>([]);

  const items = [
    { title: 'Shipping', id: 'shipping' },
    { title: 'Orders', id: 'orders' },
  ];

  const onPillClick = (pillId: string) => {
    const isPillActive = !activePills.includes(pillId);
    const updatedPills = isPillActive
      ? [...activePills, pillId]
      : activePills.filter((activePillId) => activePillId !== pillId);

    setActivePills(updatedPills);
  };

  const dropdownItems = [
    {
      type: 'link' as const,
      content: 'Find out more',
      url: '#',
    },
    {
      content: 'Create new item',
      onItemClick: () => undefined,
    },
    {
      content: 'Delete all items',
      onItemClick: () => undefined,
      icon: <DeleteIcon />,
      actionType: 'destructive' as const,
    },
  ];

  return (
    <PillTabs
      activePills={activePills}
      dropdownItems={dropdownItems}
      items={items}
      onPillClick={onPillClick}
    />
  );
}`})}]})}),(0,t.jsx)(i.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(o.ContentRoutingTabs,{id:"props",routes:[{id:"pill-tabs",title:"PillTabs",render:()=>(0,t.jsx)(p,{})},{id:"pill-tab-item",title:"PillTabItem",render:()=>(0,t.jsx)(m,{id:"pill-tabs-items-prop-table"})},{id:"pill-tab-item-group",title:"PillTabItemGroup",render:()=>(0,t.jsx)(g,{id:"pill-tabs-item-group-prop-table"})}]})}),(0,t.jsx)(i.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(s.GuidelinesTable,{discouraged:[(0,t.jsx)(t.Fragment,{children:"Don’t use to navigate between unrelated items."}),(0,t.jsx)(t.Fragment,{children:"Don’t link to content that’s hidden in default view."}),(0,t.jsxs)(t.Fragment,{children:["Never use ",(0,t.jsx)(n.Code,{primary:!0,children:"PillTabs"})," to navigate a user away from the current page."]})],recommended:[(0,t.jsx)(t.Fragment,{children:"Use on pages that have a large amount of content."}),(0,t.jsx)(t.Fragment,{children:"Be concise on the navigation labels, ideally one or two words rather than a phrase."}),(0,t.jsxs)(t.Fragment,{children:["Default page view should have no ",(0,t.jsx)(n.Code,{primary:!0,children:"PillTabs"})," selected."]})]})})]})],45877)},97431,(e,t,r)=>{let i="/pill-tabs";(window.__NEXT_P=window.__NEXT_P||[]).push([i,()=>e.r(45877)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([i])})}]);