(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,r)=>{"use strict";r._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,r)=>{"use strict";function n(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,r=new WeakMap;return(n=function(e){return e?r:t})(e)}r._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var r=n(t);if(r&&r.has(e))return r.get(e);var o={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in e)if("default"!==l&&Object.prototype.hasOwnProperty.call(e,l)){var a=i?Object.getOwnPropertyDescriptor(e,l):null;a&&(a.get||a.set)?Object.defineProperty(o,l,a):o[l]=e[l]}return o.default=e,r&&r.set(e,o),o}},67327,(e,t,r)=>{"use strict";function n(e,t,r,n){return!1}e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getDomainLocale",{enumerable:!0,get:function(){return n}}),e.r(13144),("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},48637,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return _},useLinkStatus:function(){return P}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=e.r(10375),l=e.r(80447),a=i._(e.r(99161)),s=e.r(30766),d=e.r(61148),u=e.r(98993),c=e.r(81677),f=e.r(74962),p=e.r(16262),h=e.r(7398),m=e.r(67327),g=e.r(66263),y=e.r(55279),b=new Set;function x(e,t,r,n){if(!("u"<typeof window)&&(0,d.isLocalURL)(t)){if(!n.bypassPrefetchedCheck){let o=t+"%"+r+"%"+(void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0);if(b.has(o))return;b.add(o)}e.prefetch(t,r,n).catch(e=>{})}}function v(e){return"string"==typeof e?e:(0,u.formatUrl)(e)}let j=a.default.forwardRef(function(e,t){let r,n,{href:o,as:i,children:u,prefetch:b=null,passHref:j,replace:C,shallow:P,scroll:_,locale:w,onClick:T,onNavigate:S,onMouseEnter:E,onTouchStart:O,legacyBehavior:M=!1,transitionTypes:L,...k}=e;r=u,M&&("string"==typeof r||"number"==typeof r)&&(r=(0,l.jsx)("a",{children:r}));let I=a.default.useContext(p.RouterContext),N=!1!==b,{href:$,as:R}=a.default.useMemo(()=>{if(!I){let e=v(o);return{href:e,as:i?v(i):e}}let[e,t]=(0,s.resolveHref)(I,o,!0);return{href:e,as:i?(0,s.resolveHref)(I,i):t||e}},[I,o,i]),A=a.default.useRef($),D=a.default.useRef(R);M&&(n=a.default.Children.only(r));let z=M?n&&"object"==typeof n&&n.ref:t,[F,U,H]=(0,h.useIntersection)({rootMargin:"200px"}),B=a.default.useCallback(e=>{(D.current!==R||A.current!==$)&&(H(),D.current=R,A.current=$),F(e)},[R,$,H,F]),q=(0,y.useMergedRef)(B,z);a.default.useEffect(()=>{!I||U&&N&&x(I,$,R,{bypassPrefetchedCheck:!1,locale:w})},[R,$,U,w,N,I?.locale,I]);let W={ref:q,onClick(e){M||"function"!=typeof T||T(e),M&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),!I||e.defaultPrevented||function(e,t,r,n,o,i,l,a,s){let u,{nodeName:c}=e.currentTarget;if(!("A"===c.toUpperCase()&&((u=e.currentTarget.getAttribute("target"))&&"_self"!==u||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,d.isLocalURL)(r)){o&&(e.preventDefault(),location.replace(r));return}e.preventDefault(),(()=>{if(s){let e=!1;if(s({preventDefault:()=>{e=!0}}),e)return}let e=l??!0;"beforePopState"in t?t[o?"replace":"push"](r,n,{shallow:i,locale:a,scroll:e}):t[o?"replace":"push"](n||r,{scroll:e})})()}}(e,I,$,R,C,P,_,w,S)},onMouseEnter(e){M||"function"!=typeof E||E(e),M&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),I&&x(I,$,R,{locale:w,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){M||"function"!=typeof O||O(e),M&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),I&&x(I,$,R,{locale:w,priority:!0,bypassPrefetchedCheck:!0})}};if((0,c.isAbsoluteUrl)(R))W.href=R;else if(!M||j||"a"===n.type&&!("href"in n.props)){let e=void 0!==w?w:I?.locale;W.href=I?.isLocaleDomain&&(0,m.getDomainLocale)(R,e,I?.locales,I?.domainLocales)||(0,g.addBasePath)((0,f.addLocale)(R,e,I?.defaultLocale))}return M?a.default.cloneElement(n,W):(0,l.jsx)("a",{...k,...W,children:r})}),C=(0,a.createContext)({pending:!1}),P=()=>(0,a.useContext)(C),_=j;("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},41662,(e,t,r)=>{t.exports=e.r(48637)},7398,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useIntersection",{enumerable:!0,get:function(){return s}});let n=e.r(99161),o=e.r(11229),i="function"==typeof IntersectionObserver,l=new Map,a=[];function s({rootRef:e,rootMargin:t,disabled:r}){let d=r||!i,[u,c]=(0,n.useState)(!1),f=(0,n.useRef)(null),p=(0,n.useCallback)(e=>{f.current=e},[]);return(0,n.useEffect)(()=>{if(i){if(d||u)return;let r=f.current;if(r&&r.tagName)return function(e,t,r){let{id:n,observer:o,elements:i}=function(e){let t,r={root:e.root||null,margin:e.rootMargin||""},n=a.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=l.get(n)))return t;let o=new Map;return t={id:r,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e),elements:o},a.push(r),l.set(r,t),t}(r);return i.set(e,t),o.observe(e),function(){if(i.delete(e),o.unobserve(e),0===i.size){o.disconnect(),l.delete(n);let e=a.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&a.splice(e,1)}}}(r,e=>e&&c(e),{root:e?.current,rootMargin:t})}else if(!u){let e=(0,o.requestIdleCallback)(()=>c(!0));return()=>(0,o.cancelIdleCallback)(e)}},[d,t,e,u,f.current]),[p,u,(0,n.useCallback)(()=>{c(!1)},[])]}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},55279,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(99161);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=i(e,n)),t&&(o.current=i(t,n))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},84223,e=>{e.v(t=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(t=>e.l(t))).then(()=>t(35465)))},46915,e=>{e.v(t=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(t=>e.l(t))).then(()=>t(43232)))},51547,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"HeadManagerContext",{enumerable:!0,get:function(){return n}});let n=e.r(80763)._(e.r(99161)).default.createContext({})},83158,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let n=e.r(80763)._(e.r(99161)),o=e.r(3221),i=n.default.createContext(o.imageConfigDefault)},3221,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return l}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["default","imgix","cloudinary","akamai","custom"],l={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},81677,(e,t,r)=>{"use strict";e.i(434),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return j},MissingStaticPage:function(){return v},NormalizeError:function(){return b},PageNotFoundError:function(){return x},SP:function(){return m},ST:function(){return g},WEB_VITALS:function(){return i},execOnce:function(){return l},getDisplayName:function(){return c},getLocationOrigin:function(){return d},getURL:function(){return u},isAbsoluteUrl:function(){return s},isResSent:function(){return f},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return C}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function l(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let a=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,s=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&a.test(e)};function d(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function u(){let{href:e}=window.location,t=d();return e.substring(t.length)}function c(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&f(r))return n;if(!n)throw Object.defineProperty(Error(`"${c(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let m="u">typeof performance,g=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class b extends Error{}class x extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class v extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class j extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function C(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,r)=>{t.exports=e.r(25236)},21908,e=>{"use strict";var t=e.i(80447),r=e.i(1304),n=e.i(23539),o=e.i(84033);let i=({routes:e,id:i})=>{let{activeContent:l,activePills:a,pills:s,handlePillClick:d}=((e,t)=>{let{query:r,push:n}=(0,o.useRouter)(),i=e.map(({render:e,...t})=>t),l=r[t],a=l&&!Array.isArray(l)?l:e[0].id;return{activeContent:e.find(e=>e.id===a),activePills:a?[a]:[],pills:i,handlePillClick:e=>{n({query:{...r,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,i);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.PillTabs,{activePills:a,items:s,onPillClick:d}),(0,t.jsx)(r.Box,{marginTop:"xSmall",children:l?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(i,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),r=e.i(81542);let n=r.css`
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
`;e.s(["NextLink",0,({children:e,href:r})=>(0,t.jsx)(o,{href:r,children:e})])},37763,e=>{"use strict";var t=e.i(80447),r=e.i(13332),n=e.i(82218),o=e.i(7277),i=e.i(99161),l=e.i(77136),a=e.i(27746),s=e.i(21908),d=e.i(83603),u=e.i(52510),c=e.i(29636),f=e.i(51969);let p=[{name:"defaultExpanded",types:"string[]",description:"An array of expanded node ids. Can also be used to reset expanded nodes."},{name:"defaultSelected",types:"string[]",description:"An array of selected node ids. Can also be used to reset selected nodes."},{name:"disabledNodes",types:"string[]",description:"An array of disabled node ids. Nodes will not be abled to be selectedable but can still expand/collapse."},{name:"iconless",types:"boolean",description:"Hides/shows all icons on the tree."},{name:"id",types:"string",description:"Defines a HTML id attribute to the parent wrapper."},{name:"nodes",types:(0,t.jsx)(c.NextLink,{href:{hash:"tree-node-prop-table",query:{props:"treenode"}},children:"TreeNode[]"}),description:(0,t.jsxs)(t.Fragment,{children:["Nodes to render in the tree. See"," ",(0,t.jsx)(c.NextLink,{href:{hash:"tree-node-prop-table",query:{props:"treenode"}},children:"TreeNode"})," ","for usage."]}),required:!0},{name:"onExpandedChange",types:"(expandedNodes: string[]) => void",description:"Function that will get called when a tree node is expanded/collapsed. Passes the ids of expanded nodes as an argument."},{name:"onNodeClick",types:"(event: React.MouseEvent<HTMLLIElement>, nodeId: string) => void",description:"Function that will get called when a tree node is clicked."},{name:"onSelectionChange",types:"(selectedValues: T[]) => void",description:"Function that will get called when a tree node is selected/deselecteds. Passes the values of selected nodes as an argument."},{name:"selectable",types:["multi","radio"],description:"Determines the type of selectable tree to render."},{name:"virtualization",types:"{ maxHeight: number }",description:(0,t.jsxs)(t.Fragment,{children:["Renders only the nodes within the viewport. Recommended for large trees (thousands of nodes). ",(0,t.jsx)(l.Code,{primary:!0,children:"maxHeight"})," (in px) bounds the scrollable area."]})}],h=e=>(0,t.jsx)(f.PropTable,{propList:p,title:"StatefulTree",...e}),m=[{name:"children",types:"TreeNode[]",description:"Children for the current node."},{name:"icon",types:(0,t.jsx)(c.NextLink,{href:"/icons",children:"Icon"}),description:"Custom icon, in place of the folder icon."},{name:"id",types:"string",description:"TreeNode identifier, must be unique.",required:!0},{name:"label",types:"string",description:"Label for the tree node.",required:!0},{name:"value",types:"T",description:(0,t.jsxs)(t.Fragment,{children:["Value of the selected node. A checkbox or radio will not appear if"," ",(0,t.jsx)(l.Code,{primary:!0,children:"value"})," and ",(0,t.jsx)(l.Code,{primary:!0,children:"selectable"})," is not defined."]})}],g=e=>(0,t.jsx)(f.PropTable,{propList:m,title:"StatefulTree[TreeNode]",...e});e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.H1,{children:"StatefulTree"}),(0,t.jsxs)(o.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(r.Text,{children:["The ",(0,t.jsx)(l.Code,{primary:!0,children:"StatefulTree"})," component is used to display a tree of items. Useful for defining a tree of categories or subcollections."]}),(0,t.jsx)(r.Text,{bold:!0,children:"When to use:"}),(0,t.jsxs)(u.List,{children:[(0,t.jsx)(u.List.Item,{children:"To display a tree of items"}),(0,t.jsx)(u.List.Item,{children:"Creating or assigning items to a specific category/sub-category"}),(0,t.jsx)(u.List.Item,{children:"To organize items through structure hierarchy"})]})]}),(0,t.jsx)(o.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(s.ContentRoutingTabs,{id:"implementation",routes:[{id:"multiple-selections",title:"Multiple selections",render:()=>(0,t.jsx)(a.CodePreview,{children:`function Example() {
  const nodes = [
    {
      id: '0',
      value: 0,
      label: 'Category',
      children: [
        {
          id: '5',
          value: 5,
          label: 'Category',
          children: [{ id: '9', value: 9, label: 'Category' }],
        },
      ],
    },
    {
      id: '1',
      value: 1,
      label: 'Category',
      children: [{ id: '6', value: 6, label: 'Category' }],
    },
    { id: '2', value: 2, label: 'Category' },
    {
      id: '3',
      value: 3,
      label: 'Category',
      children: [{ id: '7', value: 7, label: 'Category' }],
    },
    {
      id: '4',
      value: 4,
      label: 'Category',
      children: [{ id: '8', value: 8, label: 'Category' }],
    },
  ];

  return (
    <StatefulTree
      defaultExpanded={['0', '5', '1']}
      defaultSelected={['9', '3', '7']}
      disabledNodes={['1']}
      nodes={nodes}
      selectable="multi"
    />
  );
}`},"multiple-selections")},{id:"single-select",title:"Single selection",render:()=>(0,t.jsx)(a.CodePreview,{children:`function Example() {
  const nodes = [
    {
      id: '0',
      value: 0,
      label: 'Category',
      children: [{ id: '3', value: 3, label: 'Subcategory' }],
    },
    { id: '1', value: 1, label: 'Category' },
    { id: '2', value: 2, label: 'Category' },
  ];

  return (
    <StatefulTree
      defaultExpanded={['0']}
      disabledNodes={['0', '2']}
      nodes={nodes}
      selectable="radio"
    />
  );
}`},"single-select")},{id:"custom-icons",title:"Custom icons",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsx)(r.Text,{children:"You can replace the folder icon with a custom icon of your choice."}),(0,t.jsx)(n.Message,{marginBottom:"medium",messages:[{text:"If you use the iconless prop, ALL icons will be hidden (including custom ones)."}],type:"warning"}),(0,t.jsx)(a.CodePreview,{children:`function Example() {
  const nodes = [
    {
      id: '0',
      icon: <StoreIcon color="primary" />,
      label: 'Storefront - US',
      children: [{ id: '3', label: 'Subcategory' }],
    },
    {
      id: '1',
      icon: <LanguageIcon color="primary" />,
      label: 'Storefront - CA',
    },
    {
      id: '2',
      icon: <AssignmentIcon color="primary" />,
      label: 'Storefront - EU',
    },
  ];

  return <StatefulTree defaultExpanded={['0']} nodes={nodes} />;
}`})]},"custom-icons")},{id:"virtualized",title:"Virtualized",render:()=>(0,t.jsxs)(i.Fragment,{children:[(0,t.jsxs)(r.Text,{children:["For large trees (thousands of nodes), pass ",(0,t.jsx)(l.Code,{primary:!0,children:"virtualization"})," ","with a ",(0,t.jsx)(l.Code,{primary:!0,children:"maxHeight"})," to render only the nodes within the viewport."]}),(0,t.jsx)(a.CodePreview,{scope:{useMemo:i.useMemo},children:`function Example() {
  // 500 categories \xd7 10 subcategories = 5,500 nodes.
  const nodes = useMemo(
    () =>
      Array.from({ length: 500 }, (_, index) => ({
        id: \`\${index}\`,
        value: index,
        label: \`Category \${index}\`,
        children: Array.from({ length: 10 }, (_, childIndex) => ({
          id: \`\${index}-\${childIndex}\`,
          value: index * 10 + childIndex,
          label: \`Subcategory \${index}.\${childIndex}\`,
        })),
      })),
    [],
  );

  return (
    <StatefulTree
      defaultExpanded={['0', '1']}
      nodes={nodes}
      selectable="multi"
      virtualization={{ maxHeight: 400 }}
    />
  );
}`})]},"virtualized")}]})}),(0,t.jsx)(o.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(s.ContentRoutingTabs,{id:"props",routes:[{id:"stateful-tree",title:"StatefulTree",render:()=>(0,t.jsx)(h,{})},{id:"tree-node",title:"TreeNode",render:()=>(0,t.jsx)(g,{id:"tree-node-prop-table"})}]})}),(0,t.jsx)(o.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(d.GuidelinesTable,{discouraged:["Make sure radio buttons and checkboxes are used correctly within BigDesign Guidelines. Checkboxes are additive, radio buttons are either/or.","Don’t use to display a list of items."],recommended:["Display collapsable side navigation if sub-categories exist.","Use an icon next to categories, regardless of heirarchy.","Use checkboxes when multiple items can be selected vs. radio buttons for either/or.","Selected sub-categories should always be shown numerically next to the parent catergories, both in collapsed or expanded states."]})})]})],37763)},11912,(e,t,r)=>{let n="/statefulTree";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>e.r(37763)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([n])})}]);