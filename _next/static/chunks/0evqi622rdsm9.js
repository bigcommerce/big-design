(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,r)=>{"use strict";r._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,r)=>{"use strict";function n(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(n=function(e){return e?r:t})(e)}r._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=n(t);if(r&&r.has(e))return r.get(e);var a={__proto__:null},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var i=s?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(a,o,i):a[o]=e[o]}return a.default=e,r&&r.set(e,a),a}},67327,(e,t,r)=>{"use strict";function n(e,t,r,n){return!1}e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getDomainLocale",{enumerable:!0,get:function(){return n}}),e.r(13144),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},48637,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return w},useLinkStatus:function(){return S}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let s=e.r(10375),o=e.r(80447),i=s._(e.r(99161)),l=e.r(30766),u=e.r(61148),c=e.r(98993),d=e.r(81677),m=e.r(74962),p=e.r(16262),f=e.r(7398),h=e.r(67327),g=e.r(66263),b=e.r(55279),y=new Set;function P(e,t,r,n){if(!("u"<typeof window)&&(0,u.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){let a=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(y.has(a))return;y.add(a)}e.prefetch(t,r,n).catch(e=>{})}}function k(e){return"string"==typeof e?e:(0,c.formatUrl)(e)}let x=i.default.forwardRef(function(e,t){let r,n,{href:a,as:s,children:c,prefetch:y=null,passHref:x,replace:C,shallow:S,scroll:w,locale:v,onClick:j,onNavigate:I,onMouseEnter:T,onTouchStart:_,legacyBehavior:O=!1,transitionTypes:L,...D}=e;r=c,O&&("string"==typeof r||"number"==typeof r)&&(r=(0,o.jsx)("a",{children:r}));let E=i.default.useContext(p.RouterContext),N=!1!==y,{href:M,as:R}=i.default.useMemo(()=>{if(!E){let e=k(a);return{href:e,as:s?k(s):e}}let[e,t]=(0,l.resolveHref)(E,a,!0);return{href:e,as:s?(0,l.resolveHref)(E,s):t||e}},[E,a,s]),F=i.default.useRef(M),A=i.default.useRef(R);O&&(n=i.default.Children.only(r));let $=O?n&&"object"==typeof n&&n.ref:t,[H,q,B]=(0,f.useIntersection)({rootMargin:"200px"}),U=i.default.useCallback(e=>{(A.current!==R||F.current!==M)&&(B(),A.current=R,F.current=M),H(e)},[R,M,B,H]),z=(0,b.useMergedRef)(U,$);i.default.useEffect(()=>{!E||q&&N&&P(E,M,R,{bypassPrefetchedCheck:!1,locale:v})},[R,M,q,v,N,E?.locale,E]);let V={ref:z,onClick(e){O||"function"!=typeof j||j(e),O&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),!E||e.defaultPrevented||function(e,t,r,n,a,s,o,i,l){let c,{nodeName:d}=e.currentTarget;if(!("A"===d.toUpperCase()&&((c=e.currentTarget.getAttribute("target"))&&"_self"!==c||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,u.isLocalURL)(r)){a&&(e.preventDefault(),location.replace(r));return}e.preventDefault(),(()=>{if(l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let e=o??!0;"beforePopState"in t?t[a?"replace":"push"](r,n,{shallow:s,locale:i,scroll:e}):t[a?"replace":"push"](n||r,{scroll:e})})()}}(e,E,M,R,C,S,w,v,I)},onMouseEnter(e){O||"function"!=typeof T||T(e),O&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),E&&P(E,M,R,{locale:v,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){O||"function"!=typeof _||_(e),O&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),E&&P(E,M,R,{locale:v,priority:!0,bypassPrefetchedCheck:!0})}};if((0,d.isAbsoluteUrl)(R))V.href=R;else if(!O||x||"a"===n.type&&!("href"in n.props)){let e=void 0!==v?v:E?.locale;V.href=E?.isLocaleDomain&&(0,h.getDomainLocale)(R,e,E?.locales,E?.domainLocales)||(0,g.addBasePath)((0,m.addLocale)(R,e,E?.defaultLocale))}return O?i.default.cloneElement(n,V):(0,o.jsx)("a",{...D,...V,children:r})}),C=(0,i.createContext)({pending:!1}),S=()=>(0,i.useContext)(C),w=x;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},41662,(e,t,r)=>{t.exports=e.r(48637)},7398,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useIntersection",{enumerable:!0,get:function(){return l}});let n=e.r(99161),a=e.r(11229),s="function"==typeof IntersectionObserver,o=new Map,i=[];function l({rootRef:e,rootMargin:t,disabled:r}){let u=r||!s,[c,d]=(0,n.useState)(!1),m=(0,n.useRef)(null),p=(0,n.useCallback)(e=>{m.current=e},[]);return(0,n.useEffect)(()=>{if(s){if(u||c)return;let r=m.current;if(r&&r.tagName)return function(e,t,r){let{id:n,observer:a,elements:s}=function(e){let t,r={root:e.root||null,margin:e.rootMargin||""},n=i.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=o.get(n)))return t;let a=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=a.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:a},i.push(r),o.set(r,t),t}(r);return s.set(e,t),a.observe(e),function(){if(s.delete(e),a.unobserve(e),0===s.size){a.disconnect(),o.delete(n);let e=i.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&i.splice(e,1)}}}(r,e=>e&&d(e),{root:e?.current,rootMargin:t})}else if(!c){let e=(0,a.requestIdleCallback)(()=>d(!0));return()=>(0,a.cancelIdleCallback)(e)}},[u,t,e,c,m.current]),[p,c,(0,n.useCallback)(()=>{d(!1)},[])]}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},55279,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return a}});let n=e.r(99161);function a(e,t){let r=(0,n.useRef)(null),a=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(r.current=s(e,n)),t&&(a.current=s(t,n))},[e,t])}function s(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HeadManagerContext",{enumerable:!0,get:function(){return n}});let n=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return s}});let n=e.r(80763)._(e.r(99161)),a=e.r(3221),s=n.default.createContext(a.imageConfigDefault)},3221,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return s},imageConfigDefault:function(){return o}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let s=["default","imgix","cloudinary","akamai","custom"],o={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return b},MiddlewareNotFoundError:function(){return x},MissingStaticPage:function(){return k},NormalizeError:function(){return y},PageNotFoundError:function(){return P},SP:function(){return h},ST:function(){return g},WEB_VITALS:function(){return s},execOnce:function(){return o},getDisplayName:function(){return d},getLocationOrigin:function(){return u},getURL:function(){return c},isAbsoluteUrl:function(){return l},isResSent:function(){return m},loadGetInitialProps:function(){return f},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return C}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let s=["CLS","FCP","FID","INP","LCP","TTFB"];function o(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let i=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&i.test(e)};function u(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=u();return e.substring(t.length)}function d(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function m(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function f(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await f(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&m(r))return n;if(!n)throw Object.defineProperty(Error(`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let h="u">typeof performance,g=h&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class b extends Error{}class y extends Error{}class P extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class k extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class x extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function C(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,r)=>{t.exports=e.r(25236)},21908,e=>{"use strict";var t=e.i(80447),r=e.i(1304),n=e.i(23539),a=e.i(84033);let s=({routes:e,id:s})=>{let{activeContent:o,activePills:i,pills:l,handlePillClick:u}=((e,t)=>{let{query:r,push:n}=(0,a.useRouter)(),s=e.map(({render:e,...t})=>t),o=r[t],i=o&&!Array.isArray(o)?o:e[0].id;return{activeContent:e.find(e=>e.id===i),activePills:i?[i]:[],pills:s,handlePillClick:e=>{n({query:{...r,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,s);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.PillTabs,{activePills:i,items:l,onPillClick:u}),(0,t.jsx)(r.Box,{marginTop:"xSmall",children:o?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(s,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),r=e.i(81542);let n=r.css`
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
`,o=({columnCount:e=1,columnGap:r="normal",as:n="ul",children:o,reset:i,...l})=>(0,t.jsx)("ol"===n?a:s,{$columnCount:e,$columnGap:r,$reset:i,...l,children:o});o.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,o],52510)},29636,e=>{"use strict";var t=e.i(80447),r=e.i(41662),n=e.i(81542);let a=(0,n.default)(r.default).withConfig({displayName:"NextLink.tsx__StyledLink",componentId:"sc-72da42e3-0"})`
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
`;e.s(["NextLink",0,({children:e,href:r})=>(0,t.jsx)(a,{href:r,children:e})])},2344,e=>{"use strict";var t=e.i(80447),r=e.i(13332),n=e.i(7277),a=e.i(99161),s=e.i(77136),o=e.i(27746),i=e.i(21908),l=e.i(83603),u=e.i(52510),c=e.i(29636),d=e.i(51969);let m=[{name:"columns",types:(0,t.jsx)(c.NextLink,{href:{hash:"table-columns-prop-table",query:{props:"columns"}},children:"Columns[]"}),description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(c.NextLink,{href:{hash:"table-columns-prop-table",query:{props:"columns"}},children:"Columns"})," ","for usage."]}),required:!0},{name:"items",types:"any[]",description:"The array of items to display.",required:!0},{name:"itemName",types:"string",description:"Item name displayed on the table actions section."},{name:"keyField",types:"string",defaultValue:"id",description:"Unique property identifier for items."},{name:"onRowDrop",types:"(from: number, to: number) => void",description:"Callback called with form and to index once a row has been dragged and dropped."},{name:"pagination",types:[(0,t.jsx)(c.NextLink,{href:"/offset-pagination",children:"OffsetPagination"},"offset"),(0,t.jsx)(c.NextLink,{href:"/stateless-pagination",children:"StatelessPagination"},"stateless")],description:"See the specific pagination components for details."},{name:"selectable",types:(0,t.jsx)(c.NextLink,{href:{hash:"table-selectable-prop-table",query:{props:"selectable"}},children:"Selectable"}),description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(c.NextLink,{href:{hash:"table-selectable-prop-table",query:{props:"selectable"}},children:"Selectable"})," ","for usage."]})},{name:"sortable",types:(0,t.jsx)(c.NextLink,{href:{hash:"table-sortable-prop-table",query:{props:"sortable"}},children:"Sortable"}),description:(0,t.jsxs)(t.Fragment,{children:["See"," ",(0,t.jsx)(c.NextLink,{href:{hash:"table-sortable-prop-table",query:{props:"sortable"}},children:"Sortable"})," ","for usage."]})},{name:"stickyHeader",types:"boolean",description:"Makes the table header and actions fixed."},{name:"headerless",types:"boolean",defaultValue:"false",description:"Hides header row with all table headers. Headers are only visually hidden to keep with accessibility best practices."},{name:"actions",types:"React.ReactNode",description:"Component to render custom actions."},{name:"emptyComponent",types:"React.ReactElement",description:"Component to render when there are no items."},{name:"localization",types:"{ ascendingOrder: string, descendingOrder: string }",description:"Overrides the labels with localized text."}],p=[{name:"render",types:"React.ComponentType<Item>",required:!0,description:"Component used to render a column."},{name:"header",types:"string",required:!0,description:"Header title."},{name:"hideHeader",types:"boolean",defaultValue:"false",description:"Hides individual header values in the header row. Header is only visually hidden to keep with accessibility best practices."},{name:"align",types:["left","center","right"],defaultValue:"left",description:"Sets alignment for column."},{name:"display",types:["table-cell","none"],description:"Sets the CSS display property of a column."},{name:"hash",types:"string",required:!0,description:"Unique identifier for column."},{name:"isSortable",types:"boolean",defaultValue:"false",description:"Defines if the column is sortable."},{name:"verticalAlign",types:["top","middle"],defaultValue:"top",description:"Sets vertical alignment for column (td only)."},{name:"tooltip",types:"string",description:"Tooltip for the table column header."},{name:"width",types:["string","number"],description:"Sets column width."},{name:"withPadding",types:"boolean",defaultValue:!0,description:"Toggles padding on td elements."}],f=[{name:"selectedItems",types:"Item[]",description:"Defines which items are selected.",required:!0},{name:"onSelectionChange",types:"(selectedItems: Item[]) => void",description:"Function to be called when item selection changes.",required:!0}],h=[{name:"direction",types:["ASC","DESC"],required:!0,description:"Defines sort direction."},{name:"columnHash",types:"string",description:"Defines which column is currently sorted."},{name:"onSort",types:"(columnHash: string, direction: TableSortDirection, column: TableColumn<T>): void;",description:"Function to be called when a sortable header is clicked.",required:!0}],g=e=>(0,t.jsx)(d.PropTable,{propList:m,title:"Table",...e}),b=e=>(0,t.jsx)(d.PropTable,{propList:p,title:"Table[Columns]",...e}),y=e=>(0,t.jsx)(d.PropTable,{propList:f,title:"Table[Selectable]",...e}),P=e=>(0,t.jsx)(d.PropTable,{propList:h,title:"Table[Sortable]",...e}),k=e=>(0,t.jsx)(d.PropTable,{nativeElement:["figure","all"],propList:[],title:"TableFigure",...e}),x=[{sku:"ABS",name:"[Sample] Able Brewing System",stock:225},{sku:"CC3C",name:"[Sample] Chemex Coffeemaker 3 cup",stock:49},{sku:"CGLD",name:"[Sample] Laundry Detergent",stock:29},{sku:"CLC",name:"[Sample] Canvas Laundry Cart",stock:2},{sku:"DPB",name:"[Sample] Dustpan & Brush",stock:34},{sku:"OCG",name:"[Sample] Oak Cheese Grater",stock:34},{sku:"OFSUC",name:"[Sample] Utility Caddy",stock:45}],C=[{header:"Sku",hash:"sku",render:({sku:e})=>e},{header:"Name",hash:"name",render:({name:e})=>e},{header:"Stock",hash:"stock",render:({stock:e})=>e}],S=(e,t,r)=>e.concat().sort((e,n)=>"ASC"===r?e[t]>=n[t]?1:-1:e[t]<=n[t]?1:-1),w=(e,t,r)=>{let n=[...e],[a]=n.splice(t,1);return n.splice(r,0,a),n};e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.H1,{children:"Table"}),(0,t.jsxs)(n.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(s.Code,{primary:!0,children:"Tables"})," are used to display data related to a single subject, across one or more rows and columns."]}),(0,t.jsx)(r.Text,{bold:!0,children:"When to use:"}),(0,t.jsxs)(u.List,{children:[(0,t.jsx)(u.List.Item,{children:"When you have multiple objects of the same type you would like to display information about."}),(0,t.jsx)(u.List.Item,{children:"When you need to rapidly add multiple items to a parent object."})]})]}),(0,t.jsx)(n.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(i.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsx)(o.CodePreview,{children:`<Table
  columns={[
    {
      header: 'Sku',
      hash: 'sku',
      tooltip: 'Header tooltip',
      render: ({ sku }) => sku,
    },
    { header: 'Name', hash: 'name', render: ({ name }) => name },
    { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
  ]}
  items={[
    { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
    { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
    { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
    { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
    { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
  ]}
  stickyHeader
/>`},"basic")},{id:"selectable",title:"Selectable",render:()=>(0,t.jsx)(o.CodePreview,{scope:{data:x,columns:C},children:`function Example() {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  return (
    <Table
      columns={columns}
      itemName="Products"
      items={data}
      keyField="sku"
      selectable={{
        selectedItems,
        onSelectionChange: setSelectedItems,
      }}
    />
  );
}`},"selectable")},{id:"offset-pagination",title:"OffsetPagination",render:()=>(0,t.jsx)(o.CodePreview,{scope:{data:x,columns:C},children:`function Example() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageOptions] = useState([5, 10, 20, 30]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentItems, setCurrentItems] = useState<Item[]>([]);

  const onItemsPerPageChange = (newRange) => {
    setCurrentPage(1);
    setItemsPerPage(newRange);
  };

  useEffect(() => {
    const maxItems = currentPage * itemsPerPage;
    const lastItem = Math.min(maxItems, data.length);
    const firstItem = Math.max(0, maxItems - itemsPerPage);

    setCurrentItems(data.slice(firstItem, lastItem));
  }, [currentPage, itemsPerPage]);

  return (
    <Table
      columns={columns}
      itemName="Products"
      items={currentItems}
      keyField="sku"
      pagination={{
        currentPage,
        totalItems: data.length,
        onPageChange: setCurrentPage,
        itemsPerPageOptions,
        onItemsPerPageChange,
        itemsPerPage,
      }}
      stickyHeader
    />
  );
}`},"offset-pagination")},{id:"stateless-pagination",title:"StatelessPagination",render:()=>(0,t.jsx)(o.CodePreview,{scope:{data:x,columns:C},children:`function Example() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageOptions] = useState([5, 10, 20, 30]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentItems, setCurrentItems] = useState<Item[]>([]);

  const onItemsPerPageChange = (newRange) => {
    setCurrentPage(1);
    setItemsPerPage(newRange);
  };

  useEffect(() => {
    const maxItems = currentPage * itemsPerPage;
    const lastItem = Math.min(maxItems, data.length);
    const firstItem = Math.max(0, maxItems - itemsPerPage);

    setCurrentItems(data.slice(firstItem, lastItem));
  }, [currentPage, itemsPerPage]);

  const notFirstPage = currentPage !== 1;
  const onPrevious = notFirstPage
    ? () => setCurrentPage((currentPage) => currentPage - 1)
    : undefined;

  const notLastPage = currentPage < data.length / itemsPerPage;
  const onNext = notLastPage
    ? () => setCurrentPage((currentPage) => currentPage + 1)
    : undefined;

  return (
    <Table
      columns={columns}
      itemName="Products"
      items={currentItems}
      keyField="sku"
      pagination={{
        itemsPerPage,
        itemsPerPageOptions,
        onItemsPerPageChange,
        onNext,
        onPrevious,
      }}
      stickyHeader
    />
  );
}`},"stateless-pagination")},{id:"sortable",title:"Sortable",render:()=>(0,t.jsx)(o.CodePreview,{scope:{data:x,columns:C,sort:S},children:`function Example() {
  const [items, setItems] = useState(data);
  const [columnHash, setColumnHash] = useState('');
  const [direction, setDirection] = useState<'ASC' | 'DESC'>('ASC');

  const onSort = (newColumnHash, newDirection) => {
    setColumnHash(newColumnHash);
    setDirection(newDirection);
    setItems((currentItems) => sort(currentItems, newColumnHash, newDirection));
  };

  return (
    <Table
      columns={[
        {
          header: 'Sku',
          hash: 'sku',
          render: ({ sku }) => sku,
          isSortable: true,
        },
        {
          header: 'Name',
          hash: 'name',
          render: ({ name }) => name,
          isSortable: true,
        },
        {
          header: 'Stock',
          hash: 'stock',
          render: ({ stock }) => stock,
          isSortable: true,
        },
      ]}
      itemName="Products"
      items={items}
      keyField="sku"
      sortable={{
        columnHash,
        direction,
        onSort,
      }}
    />
  );
}`},"sortable")},{id:"table-figure",title:"TableFigure",render:()=>(0,t.jsxs)(a.Fragment,{children:[(0,t.jsxs)(r.Text,{children:[(0,t.jsx)(s.Code,{primary:!0,children:"TableFigure"})," components are used to wrap tables and any relevant information to be grouped with them. ",(0,t.jsx)(s.Code,{primary:!0,children:"TableFigures"})," ","also provide a scrollable overflow on mobile for tables with large amounts of data. Try removing the ",(0,t.jsx)(s.Code,{primary:!0,children:"TableFigure"})," component below in mobile view to see the differences."]}),(0,t.jsx)(o.CodePreview,{children:`<TableFigure>
  <Table
    columns={[
      { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
      { header: 'Name', hash: 'name', render: ({ name }) => name },
      {
        header: 'Description',
        hash: 'description',
        render: ({ description }) => description,
      },
    ]}
    items={[
      {
        sku: 'SM13',
        name: '[Sample] Smith Journal 13',
        description:
          'Volume 13 of Smith Journal is crammed with more than its fair share of sharp minds. Top of the list would have to be Solomon Shereshevsky, who remembered every single thing he’d ever come across – a great skill to have when it came to party tricks, but enough to send him crackers. And then there’s Delbert Trew who spends more time than you can imagine thinking about something very sharp indeed: barbed wire. You can’t go past Samuel Morse, either, who was a famous portrait painter before he gave his name to the code he invented. What a genius! And we’re pretty taken with Noel Turner, who was smart enough to get around some pretty weird New Zealand laws to invent a car that, for a while, was a huge success. As well, you’ll find stories on a cross-dressing spy, a couple of Sydney nerds who revolutionised modern music, court illustration, big wheels, the dubious science of controlling the weather and a whole stack of other stuff.',
      },
      {
        sku: 'DPB',
        name: '	[Sample] Dustpan & Brush',
        description:
          'A seemingly simple dustpan with a few features to make life easier. The arch and length of the dustpan eases cleanup, the wood turned handle provides firm grip and the rubber liner along the edge of the scoop will retrieve small crumbs with a single swipe. A key ring at the top makes storage a cinch - hang it off a broom closet hook when not in use.',
      },
    ]}
    stickyHeader
  />
  <Small marginTop="xSmall">Helpful text to be grouped with the table</Small>
</TableFigure>`})]},"table-figure")},{id:"custom",title:"Custom",render:()=>(0,t.jsx)(o.CodePreview,{children:`<Table
  columns={[
    { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
    {
      header: 'Name',
      hash: 'name',
      render: ({ name }) => name,
      align: 'center',
    },
    {
      header: 'Stock',
      hash: 'stock',
      render: ({ stock }) =>
        stock > 5 ? (
          <Text color="success">{stock}</Text>
        ) : (
          <Text color="danger">{stock}</Text>
        ),
    },
  ]}
  items={[
    { sku: 'SM13', name: '[Sample] Smith Journal 13', stock: 25 },
    { sku: 'DPB', name: '[Sample] Dustpan & Brush', stock: 34 },
    { sku: 'OFSUC', name: '[Sample] Utility Caddy', stock: 45 },
    { sku: 'CLC', name: '[Sample] Canvas Laundry Cart', stock: 2 },
    { sku: 'CGLD', name: '[Sample] Laundry Detergent', stock: 29 },
  ]}
/>`},"custom")},{id:"drag-and-drop",title:"Drag & Drop",render:()=>(0,t.jsx)(o.CodePreview,{scope:{data:x,dragEnd:w},children:`function Example() {
  const [items, setItems] = useState(data);

  const onDragEnd = (from: number, to: number) =>
    setItems((currentItems) => dragEnd(currentItems, from, to));

  return (
    <Table
      columns={[
        { header: 'Sku', hash: 'sku', render: ({ sku }) => sku },
        { header: 'Name', hash: 'name', render: ({ name }) => name },
        { header: 'Stock', hash: 'stock', render: ({ stock }) => stock },
      ]}
      items={items}
      keyField="sku"
      onRowDrop={onDragEnd}
    />
  );
}`},"drap-and-drop")}]})}),(0,t.jsx)(n.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(i.ContentRoutingTabs,{id:"props",routes:[{id:"table",title:"Table",render:()=>(0,t.jsx)(g,{})},{id:"columns",title:"Columns",render:()=>(0,t.jsx)(b,{id:"table-columns-prop-table"})},{id:"selectable",title:"Selectable",render:()=>(0,t.jsx)(y,{id:"table-selectable-prop-table"})},{id:"sortable",title:"Sortable",render:()=>(0,t.jsx)(P,{id:"table-sortable-prop-table"})},{id:"table-figure",title:"TableFigure",render:()=>(0,t.jsx)(k,{})}]})}),(0,t.jsx)(n.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(l.GuidelinesTable,{discouraged:[(0,t.jsxs)(t.Fragment,{children:["Don’t use this when you need to have complex interactions (e.g. filter) with the data in the ",(0,t.jsx)(s.Code,{primary:!0,children:"Table"}),"."]}),(0,t.jsxs)(t.Fragment,{children:["Don’t put unrelated objects in the same ",(0,t.jsx)(s.Code,{primary:!0,children:"Table"}),"."]}),(0,t.jsxs)(t.Fragment,{children:["If using ",(0,t.jsx)(s.Code,{primary:!0,children:"Table"}),"s in cramped places like modals, avoid placing too many columns."]})],recommended:["Keep column headers to one or two words.","Add pagination controls if the user is likely to have 5+ rows of data to view."]})})]})],2344)},79767,(e,t,r)=>{let n="/table";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>e.r(2344)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([n])})}]);