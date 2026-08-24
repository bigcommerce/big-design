(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,80763,(e,t,n)=>{"use strict";n._=function(e){return e&&e.__esModule?e:{default:e}}},10375,(e,t,n)=>{"use strict";function o(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(o=function(e){return e?n:t})(e)}n._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=o(t);if(n&&n.has(e))return n.get(e);var r={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var l in e)if("default"!==l&&Object.prototype.hasOwnProperty.call(e,l)){var a=i?Object.getOwnPropertyDescriptor(e,l):null;a&&(a.get||a.set)?Object.defineProperty(r,l,a):r[l]=e[l]}return r.default=e,n&&n.set(e,r),r}},67327,(e,t,n)=>{"use strict";function o(e,t,n,o){return!1}e.i(434),Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"getDomainLocale",{enumerable:!0,get:function(){return o}}),e.r(13144),("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},48637,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0});var o={default:function(){return S},useLinkStatus:function(){return O}};for(var r in o)Object.defineProperty(n,r,{enumerable:!0,get:o[r]});let i=e.r(10375),l=e.r(80447),a=i._(e.r(99161)),s=e.r(30766),c=e.r(61148),d=e.r(98993),u=e.r(81677),p=e.r(74962),h=e.r(16262),f=e.r(7398),m=e.r(67327),g=e.r(66263),x=e.r(55279),y=new Set;function b(e,t,n,o){if(!("u"<typeof window)&&(0,c.isLocalURL)(t)){if(!o.bypassPrefetchedCheck){let r=t+"%"+n+"%"+(void 0!==o.locale?o.locale:"locale"in e?e.locale:void 0);if(y.has(r))return;y.add(r)}e.prefetch(t,n,o).catch(e=>{})}}function v(e){return"string"==typeof e?e:(0,d.formatUrl)(e)}let j=a.default.forwardRef(function(e,t){let n,o,{href:r,as:i,children:d,prefetch:y=null,passHref:j,replace:C,shallow:O,scroll:S,locale:w,onClick:F,onNavigate:P,onMouseEnter:M,onTouchStart:T,legacyBehavior:_=!1,transitionTypes:A,...I}=e;n=d,_&&("string"==typeof n||"number"==typeof n)&&(n=(0,l.jsx)("a",{children:n}));let E=a.default.useContext(h.RouterContext),L=!1!==y,{href:k,as:R}=a.default.useMemo(()=>{if(!E){let e=v(r);return{href:e,as:i?v(i):e}}let[e,t]=(0,s.resolveHref)(E,r,!0);return{href:e,as:i?(0,s.resolveHref)(E,i):t||e}},[E,r,i]),D=a.default.useRef(k),G=a.default.useRef(R);_&&(o=a.default.Children.only(n));let N=_?o&&"object"==typeof o&&o.ref:t,[q,$,V]=(0,f.useIntersection)({rootMargin:"200px"}),H=a.default.useCallback(e=>{(G.current!==R||D.current!==k)&&(V(),G.current=R,D.current=k),q(e)},[R,k,V,q]),U=(0,x.useMergedRef)(H,N);a.default.useEffect(()=>{!E||$&&L&&b(E,k,R,{bypassPrefetchedCheck:!1,locale:w})},[R,k,$,w,L,E?.locale,E]);let B={ref:U,onClick(e){_||"function"!=typeof F||F(e),_&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(e),!E||e.defaultPrevented||function(e,t,n,o,r,i,l,a,s){let d,{nodeName:u}=e.currentTarget;if(!("A"===u.toUpperCase()&&((d=e.currentTarget.getAttribute("target"))&&"_self"!==d||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which)||e.currentTarget.hasAttribute("download"))){if(!(0,c.isLocalURL)(n)){r&&(e.preventDefault(),location.replace(n));return}e.preventDefault(),(()=>{if(s){let e=!1;if(s({preventDefault:()=>{e=!0}}),e)return}let e=l??!0;"beforePopState"in t?t[r?"replace":"push"](n,o,{shallow:i,locale:a,scroll:e}):t[r?"replace":"push"](o||n,{scroll:e})})()}}(e,E,k,R,C,O,S,w,P)},onMouseEnter(e){_||"function"!=typeof M||M(e),_&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),E&&b(E,k,R,{locale:w,priority:!0,bypassPrefetchedCheck:!0})},onTouchStart:function(e){_||"function"!=typeof T||T(e),_&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),E&&b(E,k,R,{locale:w,priority:!0,bypassPrefetchedCheck:!0})}};if((0,u.isAbsoluteUrl)(R))B.href=R;else if(!_||j||"a"===o.type&&!("href"in o.props)){let e=void 0!==w?w:E?.locale;B.href=E?.isLocaleDomain&&(0,m.getDomainLocale)(R,e,E?.locales,E?.domainLocales)||(0,g.addBasePath)((0,p.addLocale)(R,e,E?.defaultLocale))}return _?a.default.cloneElement(o,B):(0,l.jsx)("a",{...I,...B,children:n})}),C=(0,a.createContext)({pending:!1}),O=()=>(0,a.useContext)(C),S=j;("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},41662,(e,t,n)=>{t.exports=e.r(48637)},7398,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"useIntersection",{enumerable:!0,get:function(){return s}});let o=e.r(99161),r=e.r(11229),i="function"==typeof IntersectionObserver,l=new Map,a=[];function s({rootRef:e,rootMargin:t,disabled:n}){let c=n||!i,[d,u]=(0,o.useState)(!1),p=(0,o.useRef)(null),h=(0,o.useCallback)(e=>{p.current=e},[]);return(0,o.useEffect)(()=>{if(i){if(c||d)return;let n=p.current;if(n&&n.tagName)return function(e,t,n){let{id:o,observer:r,elements:i}=function(e){let t,n={root:e.root||null,margin:e.rootMargin||""},o=a.find(e=>e.root===n.root&&e.margin===n.margin);if(o&&(t=l.get(o)))return t;let r=new Map;return t={id:n,observer:new IntersectionObserver(e=>{e.forEach(e=>{let t=r.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e),elements:r},a.push(n),l.set(n,t),t}(n);return i.set(e,t),r.observe(e),function(){if(i.delete(e),r.unobserve(e),0===i.size){r.disconnect(),l.delete(o);let e=a.findIndex(e=>e.root===o.root&&e.margin===o.margin);e>-1&&a.splice(e,1)}}}(n,e=>e&&u(e),{root:e?.current,rootMargin:t})}else if(!d){let e=(0,r.requestIdleCallback)(()=>u(!0));return()=>(0,r.cancelIdleCallback)(e)}},[c,t,e,d,p.current]),[h,d,(0,o.useCallback)(()=>{u(!1)},[])]}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},55279,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"useMergedRef",{enumerable:!0,get:function(){return r}});let o=e.r(99161);function r(e,t){let n=(0,o.useRef)(null),r=(0,o.useRef)(null);return(0,o.useCallback)(o=>{if(null===o){let e=n.current;e&&(n.current=null,e());let t=r.current;t&&(r.current=null,t())}else e&&(n.current=i(e,o)),t&&(r.current=i(t,o))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let n=e(t);return"function"==typeof n?n:()=>e(null)}}("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},51547,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"HeadManagerContext",{enumerable:!0,get:function(){return o}});let o=e.r(80763)._(e.r(99161)).default.createContext({})},81677,(e,t,n)=>{"use strict";e.i(434),Object.defineProperty(n,"__esModule",{value:!0});var o={DecodeError:function(){return x},MiddlewareNotFoundError:function(){return j},MissingStaticPage:function(){return v},NormalizeError:function(){return y},PageNotFoundError:function(){return b},SP:function(){return m},ST:function(){return g},WEB_VITALS:function(){return i},execOnce:function(){return l},getDisplayName:function(){return u},getLocationOrigin:function(){return c},getURL:function(){return d},isAbsoluteUrl:function(){return s},isResSent:function(){return p},loadGetInitialProps:function(){return f},normalizeRepeatedSlashes:function(){return h},stringifyError:function(){return C}};for(var r in o)Object.defineProperty(n,r,{enumerable:!0,get:o[r]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function l(e){let t,n=!1;return(...o)=>(n||(n=!0,t=e(...o)),t)}let a=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,s=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&a.test(e)};function c(){let{protocol:e,hostname:t,port:n}=window.location;return`${e}//${t}${n?":"+n:""}`}function d(){let{href:e}=window.location,t=c();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function h(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function f(e,t){let n=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await f(t.Component,t.ctx)}:{};let o=await e.getInitialProps(t);if(n&&p(n))return o;if(!o)throw Object.defineProperty(Error(`"${u(e)}.getInitialProps()" should resolve to an object. But found "${o}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return o}let m="u">typeof performance,g=m&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class x extends Error{}class y extends Error{}class b extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class v extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class j extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function C(e){return JSON.stringify({message:e.message,stack:e.stack})}},84033,(e,t,n)=>{t.exports=e.r(25236)},49653,e=>{"use strict";var t=e.i(80447),n=e.i(77136),o=e.i(29636),r=e.i(51969);let i=[{name:"action",types:"SelectAction",description:"Action option displayed at the end of the list."},{name:"autoComplete",defaultValue:"off",types:"string",description:"Set the autoComplete property for the input."},{name:"description",types:"string | FormControlDescription",description:"Append a description to the select field."},{name:"disabled",defaultValue:"false",types:"boolean",description:(0,t.jsxs)(t.Fragment,{children:["Disables the ",(0,t.jsx)(n.Code,{primary:!0,children:"Select"})," component."]})},{name:"error",types:"string",description:"Displays a form error around the field."},{name:"filterable",types:"boolean",defaultValue:"true",description:(0,t.jsxs)(t.Fragment,{children:["Allows you to filter the ",(0,t.jsx)(n.Code,{children:"SelectOptions"})," in the ",(0,t.jsx)(n.Code,{primary:!0,children:"Select"}),"."]})},{name:"inputRef",types:"React.Ref<HTMLInputElement> | React.RefObject<HTMLInputElement>",description:(0,t.jsxs)(t.Fragment,{children:["The provided ref will be used for the underlying input element used in the"," ",(0,t.jsx)(n.Code,{primary:!0,children:"Select"}),"."]})},{name:"label",types:["string","FormControlLabel"],description:"Adds a label to the field."},{name:"labelId",types:"string",description:"Adds a custom id to the label."},{name:"maxHeight",types:"number",defaultValue:"250",description:(0,t.jsxs)(t.Fragment,{children:["Sets a ",(0,t.jsx)(n.Code,{children:"max-height"})," to the dropdown."]})},{name:"onClose",types:"() => void",description:(0,t.jsxs)(t.Fragment,{children:["Function that will be called when the ",(0,t.jsx)(n.Code,{primary:!0,children:"Select"})," is closed."]})},{name:"onOpen",types:"() => void",description:(0,t.jsxs)(t.Fragment,{children:["Function that will be called when the ",(0,t.jsx)(n.Code,{primary:!0,children:"Select"})," is opened."]})},{name:"onOptionChange",types:"(value: any, option: SelectOption) => void",required:!0,description:"Callback called with value of selected option."},{name:"options",types:"Array<SelectOption> | Array<SelectOptionGroup>",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Accepts an array of ",(0,t.jsx)(n.Code,{children:"SelectOptions"})," or an array of"," ",(0,t.jsx)(n.Code,{children:"SelectOptionGroups"}),". See"," ",(0,t.jsx)(o.NextLink,{href:{hash:"implementation"},children:"implementation"})," section for usage."]})},{name:"placement",types:["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],defaultValue:"bottom-start",description:"Determines the location in which the dropdown will be placed."},{name:"positionFixed",defaultValue:"false",types:"boolean",description:(0,t.jsxs)(t.Fragment,{children:["If set, uses ",(0,t.jsx)(n.Code,{children:"position: fixed"})," instead of ",(0,t.jsx)(n.Code,{children:"position: absolute"})," to position the list."]})},{name:"required",types:"boolean",description:"Sets the field as required."},{name:"value",types:"any ",description:(0,t.jsx)(t.Fragment,{children:"Modifies the current selected value of the field."})}],l=[{name:"disabled",defaultValue:"false",types:"boolean",description:(0,t.jsxs)(t.Fragment,{children:["Sets the ",(0,t.jsx)(n.Code,{children:"SelectOption"})," to disabled."]})},{name:"content",types:"string",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Sets the text content of the ",(0,t.jsx)(n.Code,{children:"SelectOption"}),"."]})},{name:"description",types:"string",description:(0,t.jsxs)(t.Fragment,{children:["Sets the content description of the ",(0,t.jsx)(n.Code,{children:"SelectOption"}),"."]})},{name:"tooltip",types:"string",description:(0,t.jsx)(t.Fragment,{children:"Adds tooltip for disabled item."})},{name:"icon",types:(0,t.jsx)(o.NextLink,{href:"/icons",children:"Icon"}),description:(0,t.jsxs)(t.Fragment,{children:["Pass in an ",(0,t.jsx)(o.NextLink,{href:"/icons",children:"Icon"})," component to display to the left of the text. Only available for single select."]})},{name:"value",types:"any",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Stored value of the ",(0,t.jsx)(n.Code,{children:"SelectOption"}),"."]})}],a=[{name:"actionType",types:["normal","destructive"],defaultValue:"normal",description:(0,t.jsxs)(t.Fragment,{children:["Indicates whether the ",(0,t.jsx)(n.Code,{children:"SelectAction"})," is of normal or destructive nature."]})},{name:"disabled",defaultValue:"false",types:"boolean",description:(0,t.jsxs)(t.Fragment,{children:["Sets the ",(0,t.jsx)(n.Code,{children:"SelectAction"})," to disabled."]})},{name:"content",types:"string",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Sets the text content of the ",(0,t.jsx)(n.Code,{children:"SelectAction"}),"."]})},{name:"description",types:"string",description:(0,t.jsxs)(t.Fragment,{children:["Sets the content description of the ",(0,t.jsx)(n.Code,{children:"SelectAction"}),"."]})},{name:"tooltip",types:"string",description:(0,t.jsx)(t.Fragment,{children:"Adds tooltip for disabled item."})},{name:"icon",types:(0,t.jsx)(o.NextLink,{href:"/icons",children:"Icon"}),description:(0,t.jsxs)(t.Fragment,{children:["Pass in an ",(0,t.jsx)(o.NextLink,{href:"/icons",children:"Icon"})," component to display to the left of the text."]})},{name:"onClick",types:"(inputText: string): void",description:"Returns the current text in the input."}],s=[{name:"label",types:"string",required:!0,description:(0,t.jsx)(t.Fragment,{children:"Adds a label to the option group."})},{name:"separated",types:"boolean",description:"If true, adds a line separator above the group."},{name:"options",types:"Array<SelectOption>",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Accepts an array of ",(0,t.jsx)(n.Code,{children:"SelectOption"}),". See"," ",(0,t.jsx)(o.NextLink,{href:{query:"implementation=select-group"},children:"example"})," for usage."]})}];e.s(["SelectActionPropTable",0,e=>(0,t.jsx)(r.PropTable,{propList:a,title:"Select[SelectAction]",...e}),"SelectGroupPropTable",0,e=>(0,t.jsx)(r.PropTable,{propList:s,title:"Select[SelectGroup]",...e}),"SelectOptionPropTable",0,e=>(0,t.jsx)(r.PropTable,{propList:l,title:"Select[SelectOption]",...e}),"SelectPropTable",0,e=>(0,t.jsx)(r.PropTable,{propList:i,title:"Select",...e})])},21908,e=>{"use strict";var t=e.i(80447),n=e.i(1304),o=e.i(23539),r=e.i(84033);let i=({routes:e,id:i})=>{let{activeContent:l,activePills:a,pills:s,handlePillClick:c}=((e,t)=>{let{query:n,push:o}=(0,r.useRouter)(),i=e.map(({render:e,...t})=>t),l=n[t],a=l&&!Array.isArray(l)?l:e[0].id;return{activeContent:e.find(e=>e.id===a),activePills:a?[a]:[],pills:i,handlePillClick:e=>{o({query:{...n,[t]:e}},void 0,{scroll:!1,shallow:!0})}}})(e,i);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.PillTabs,{activePills:a,items:s,onPillClick:c}),(0,t.jsx)(n.Box,{marginTop:"xSmall",children:l?.render()})]})};e.s(["ContentRoutingTabs",0,e=>0===e.routes.length?null:(0,t.jsx)(i,{...e})],21908)},52510,e=>{"use strict";var t=e.i(80447),n=e.i(81542);let o=n.css`
  color: ${({theme:e})=>e.colors.secondary70};
  font-size: ${({theme:e})=>e.typography.fontSize.medium};
  font-weight: ${({theme:e})=>e.typography.fontWeight.regular};
  line-height: ${({theme:e})=>e.lineHeight.medium};
  padding-left: ${({theme:e})=>e.spacing.xLarge};

  ${({theme:e})=>e.breakpoints.tablet} {
    column-count: ${({$columnCount:e})=>e};
    column-gap: ${({$columnGap:e})=>e};
  }

  ${({$reset:e,theme:t})=>e&&n.css`
      ${t.helpers.listReset};
    `}
`,r=n.default.ol.withConfig({displayName:"styled.tsx__StyledOrderedList",componentId:"sc-6a6922be-0"})`
  ${o};
`,i=n.default.ul.withConfig({displayName:"styled.tsx__StyledUnorderedList",componentId:"sc-6a6922be-1"})`
  ${o}
`,l=({columnCount:e=1,columnGap:n="normal",as:o="ul",children:l,reset:a,...s})=>(0,t.jsx)("ol"===o?r:i,{$columnCount:e,$columnGap:n,$reset:a,...s,children:l});l.Item=({...e})=>(0,t.jsx)("li",{...e}),e.s(["List",0,l],52510)},29636,e=>{"use strict";var t=e.i(80447),n=e.i(41662),o=e.i(81542);let r=(0,o.default)(n.default).withConfig({displayName:"NextLink.tsx__StyledLink",componentId:"sc-72da42e3-0"})`
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
`;e.s(["NextLink",0,({children:e,href:n})=>(0,t.jsx)(r,{href:n,children:e})])},6315,e=>{"use strict";var t=e.i(80447),n=e.i(13332),o=e.i(7277),r=e.i(99161),i=e.i(77136),l=e.i(27746),a=e.i(21908),s=e.i(83603),c=e.i(52510),d=e.i(51969);let u=[{name:"action",types:"SelectAction",description:"Action option displayed at the end of the list."},{name:"autoComplete",defaultValue:"off",types:"string",description:"Set the autoComplete property for the input."},{name:"description",types:"string | FormControlDescription",description:"Append a description to the select field."},{name:"disabled",defaultValue:"false",types:"boolean",description:(0,t.jsxs)(t.Fragment,{children:["Disables the ",(0,t.jsx)(i.Code,{children:"MultiSelect"})," component."]})},{name:"error",types:"string",description:"Displays a form error around the field."},{name:"filterable",types:"boolean",defaultValue:"true",description:(0,t.jsxs)(t.Fragment,{children:["Allows you to filter the ",(0,t.jsx)(i.Code,{children:"SelectOptions"})," in the ",(0,t.jsx)(i.Code,{children:"MultiSelect"}),"."]})},{name:"inputRef",types:"React.Ref<HTMLInputElement> | React.RefObject<HTMLInputElement>",description:(0,t.jsxs)(t.Fragment,{children:["The provided ref will be used for the underlying input element used in the"," ",(0,t.jsx)(i.Code,{children:"MultiSelect"}),"."]})},{name:"label",types:["string","FormControlLabel"],description:"Adds a label to the field."},{name:"labelId",types:"string",description:"Adds a custom id to the label."},{name:"maxHeight",types:"number",defaultValue:"250",description:(0,t.jsxs)(t.Fragment,{children:["Sets a ",(0,t.jsx)(i.Code,{children:"max-height"})," to the dropdown."]})},{name:"onClose",types:"() => void",description:"Function that will be called when the MultiSelect is closed."},{name:"onOpen",types:"() => void",description:"Function that will be called when the MultiSelect is opened."},{name:"onOptionsChange",types:"(value: [any], option: [SelectOption]) => void",required:!0,description:"Callback called with value of selected option."},{name:"options",types:"Array<SelectOption> | Array<SelectOptionGroup>",required:!0,description:(0,t.jsxs)(t.Fragment,{children:["Accepts an array of ",(0,t.jsx)(i.Code,{children:"SelectOption"})," or an array of ",(0,t.jsx)(i.Code,{children:"SelectOptionGroups"}),". See example for usage."]})},{name:"placement",types:["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],defaultValue:"bottom-start",description:"Determines the location in which the dropdown will be placed."},{name:"positionFixed",defaultValue:"false",types:"boolean",description:(0,t.jsxs)(t.Fragment,{children:["If set, uses ",(0,t.jsx)(i.Code,{children:"position: fixed"})," instead of ",(0,t.jsx)(i.Code,{children:"position: absolute"})," to position the items."]})},{name:"selectAll",types:"boolean",required:!1,description:(0,t.jsxs)(t.Fragment,{children:["If set, a ",(0,t.jsx)(i.Code,{children:"Select All"})," option will be added to the top of the list."]})},{name:"required",types:"boolean",description:"Sets the field as required."},{name:"value",types:"[any]",description:(0,t.jsx)(t.Fragment,{children:"Modifies the current selected value of the field."})}],p=e=>(0,t.jsx)(d.PropTable,{propList:u,title:"MultiSelect",...e});var h=e.i(49653);e.s(["default",0,()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.H1,{children:"MultiSelect"}),(0,t.jsxs)(o.Panel,{header:"Overview",headerId:"overview",children:[(0,t.jsxs)(n.Text,{children:[(0,t.jsx)(i.Code,{primary:!0,children:"MultiSelects"})," allow users to select multiple items within a list of options."]}),(0,t.jsx)(n.Text,{bold:!0,children:"When to use:"}),(0,t.jsxs)(c.List,{children:[(0,t.jsx)(c.List.Item,{children:"To select multiple options within a list, usually of related or grouped items."}),(0,t.jsx)(c.List.Item,{children:"To select four or more predefined selections."})]})]}),(0,t.jsx)(o.Panel,{header:"Implementation",headerId:"implementation",children:(0,t.jsx)(a.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,t.jsxs)(r.Fragment,{children:[(0,t.jsxs)(n.Text,{children:[(0,t.jsx)(i.Code,{primary:!0,children:"MultiSelects"})," are typeable inputs with multiple selectable items within a dropdown."]}),(0,t.jsx)(l.CodePreview,{children:`function Example() {
  const [value, setValue] = useState(['mx']);
  const handleChange = (val) => setValue(val);

  return (
    <Form>
      <FormGroup>
        <MultiSelect
          action={{
            actionType: 'destructive' as const,
            content: 'Remove Country',
            icon: <DeleteIcon />,
            onActionClick: () => null,
          }}
          filterable={true}
          label="Countries"
          maxHeight={300}
          onOptionsChange={handleChange}
          options={[
            { value: 'us', content: 'United States' },
            { value: 'mx', content: 'Mexico' },
            { value: 'ca', content: 'Canada' },
            { value: 'en', content: 'England' },
            { value: 'fr', content: 'France' },
            { value: 'gr', content: 'Germany' },
            { value: 'ar', content: 'Argentina' },
            { value: 'ru', content: 'Russia', disabled: true },
            { value: 'ch', content: 'Chile' },
            { value: 'bo', content: 'Bolivia' },
            { value: 'jp', content: 'Japan' },
            { value: 'cn', content: 'China' },
            { value: 'sk', content: 'South Korea' },
            { value: 'au', content: 'Australia' },
            { value: 'ug', content: 'Uganda' },
          ]}
          placeholder="Choose country"
          placement="bottom-start"
          required
          value={value}
        />
      </FormGroup>
    </Form>
  );
}`})]},"basic")},{id:"position",title:"Position",render:()=>(0,t.jsxs)(r.Fragment,{children:[(0,t.jsxs)(n.Text,{children:[(0,t.jsx)(i.Code,{primary:!0,children:"MultiSelect"})," can be anchored in different directions with the ",(0,t.jsx)(i.Code,{primary:!0,children:"placement"})," property. It will automatically find a position if there's not enough space in the chosen direction."]}),(0,t.jsx)(l.CodePreview,{children:`<Grid gridColumns="repeat(4, 1fr)">
  <MultiSelect
    label="Select"
    onOptionsChange={() => null}
    options={[
      { value: 1, content: 'Option' },
      { value: 2, content: 'Option' },
      { value: 3, content: 'Option' },
      { value: 4, content: 'Option' },
    ]}
    placeholder="Choose from above"
    placement="top"
    required
  />
  <MultiSelect
    label="Select"
    onOptionsChange={() => null}
    options={[
      { value: 1, content: 'Option' },
      { value: 2, content: 'Option' },
      { value: 3, content: 'Option' },
      { value: 4, content: 'Option' },
    ]}
    placeholder="Choose from below"
    placement="bottom-start"
    required
  />
  <MultiSelect
    label="Select"
    onOptionsChange={() => null}
    options={[
      { value: 1, content: 'Option' },
      { value: 2, content: 'Option' },
      { value: 3, content: 'Option' },
      { value: 4, content: 'Option' },
    ]}
    placeholder="Choose from the right"
    placement="right-start"
    required
  />
  <MultiSelect
    label="Select"
    onOptionsChange={() => null}
    options={[
      { value: 1, content: 'Option' },
      { value: 2, content: 'Option' },
      { value: 3, content: 'Option' },
      { value: 4, content: 'Option' },
    ]}
    placeholder="Choose from the left"
    placement="left-end"
    required
  />
</Grid>`})]},"position")},{id:"max-height",title:"Max height",render:()=>(0,t.jsxs)(r.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["Once the content is longer than the max-height, the dropdown will be scrollable. It is possible to modify the dimension by passing a"," ",(0,t.jsx)(i.Code,{primary:!0,children:"maxHeight"})," property."]}),(0,t.jsx)(l.CodePreview,{children:`<Grid gridColumns="repeat(3, 1fr)">
  <MultiSelect
    label="Select"
    onOptionsChange={() => null}
    options={[
      { value: 1, content: 'Option' },
      { value: 2, content: 'Option' },
      { value: 3, content: 'Option' },
      { value: 4, content: 'Option' },
      { value: 5, content: 'Option' },
      { value: 6, content: 'Option' },
      { value: 7, content: 'Option' },
      { value: 8, content: 'Option' },
    ]}
    placeholder="Default"
    required
  />
  <MultiSelect
    label="Select"
    maxHeight={150}
    onOptionsChange={() => null}
    options={[
      { value: 1, content: 'Option' },
      { value: 2, content: 'Option' },
      { value: 3, content: 'Option' },
      { value: 4, content: 'Option' },
      { value: 5, content: 'Option' },
      { value: 6, content: 'Option' },
      { value: 7, content: 'Option' },
      { value: 8, content: 'Option' },
    ]}
    placeholder="Smaller"
    required
  />
  <MultiSelect
    label="Select"
    maxHeight={350}
    onOptionsChange={() => null}
    options={[
      { value: 1, content: 'Option' },
      { value: 2, content: 'Option' },
      { value: 3, content: 'Option' },
      { value: 4, content: 'Option' },
      { value: 5, content: 'Option' },
      { value: 6, content: 'Option' },
      { value: 7, content: 'Option' },
      { value: 8, content: 'Option' },
      { value: 9, content: 'Option' },
      { value: 10, content: 'Option' },
      { value: 11, content: 'Option' },
      { value: 12, content: 'Option' },
    ]}
    placeholder="Larger"
    required
  />
</Grid>`})]},"max-height")},{id:"disabled",title:"Disabled",render:()=>(0,t.jsxs)(r.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["It is possible to disable the entire select component, similar to how you would disable a native HTML select element, by using the ",(0,t.jsx)(i.Code,{primary:!0,children:"disabled"})," ","property."]}),(0,t.jsx)(l.CodePreview,{children:`<Form>
  <FormGroup>
    <MultiSelect
      disabled
      label="Select"
      maxHeight={350}
      onOptionsChange={() => null}
      options={[
        { value: 1, content: 'Option' },
        { value: 2, content: 'Option' },
        { value: 3, content: 'Option' },
        { value: 4, content: 'Option' },
      ]}
      placeholder="Larger"
      required
    />
  </FormGroup>
</Form>
`})]},"disabled")},{id:"actions",title:"Actions",render:()=>(0,t.jsxs)(r.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["Accepts an ",(0,t.jsx)(i.Code,{children:"action"})," object to display at the end of the list."]}),(0,t.jsx)(l.CodePreview,{children:`<Form>
  <FormGroup>
    <MultiSelect
      action={{
        actionType: 'destructive',
        content: 'Remove Country',
        icon: <DeleteIcon />,
        onActionClick: () => null,
      }}
      label="Countries"
      onOptionsChange={() => null}
      options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'en', content: 'England' },
      ]}
      placeholder="Choose country"
      placement="bottom-start"
      required
    />
  </FormGroup>
</Form>`})]},"actions")},{id:"error",title:"Error",render:()=>(0,t.jsxs)(r.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["An ",(0,t.jsx)(i.Code,{primary:!0,children:"error"})," prop receives a ",(0,t.jsx)(i.Code,{children:"string"})," to display."]}),(0,t.jsx)(l.CodePreview,{children:`<Form>
  <FormGroup>
    <MultiSelect
      error="Need to choose a country before proceeding"
      label="Countries"
      onOptionsChange={() => null}
      options={[
        { value: 'us', content: 'United States' },
        { value: 'mx', content: 'Mexico' },
        { value: 'ca', content: 'Canada' },
        { value: 'en', content: 'England' },
      ]}
      placeholder="Choose country"
      placement="bottom-start"
      required
    />
  </FormGroup>
</Form>`})]},"error")},{id:"multi-select-groups",title:"Multi select groups",render:()=>(0,t.jsxs)(r.Fragment,{children:[(0,t.jsxs)(n.Text,{children:["It is possible to create grouped options with labels with a"," ",(0,t.jsx)(i.Code,{primary:!0,children:"Select Group"})," by passing ",(0,t.jsx)(i.Code,{primary:!0,children:"label"})," and"," ",(0,t.jsx)(i.Code,{primary:!0,children:"options"})," to the top-level ",(0,t.jsx)(i.Code,{primary:!0,children:"options"})," ","property."]}),(0,t.jsx)(l.CodePreview,{children:`<Form>
  <FormGroup>
    <MultiSelect
      filterable
      label="My Options"
      onOptionsChange={() => null}
      options={[
        {
          label: 'Group 1',
          options: [
            { value: 'mx', content: 'Mexico' },
            { value: 'ca', content: 'Canada' },
            { value: 'en', content: 'England' },
          ],
        },
        {
          label: 'Group 2',
          options: [
            { value: 'fr', content: 'France' },
            { value: 'gr', content: 'Germany' },
            { value: 'ar', content: 'Argentina' },
          ],
        },
      ]}
    />
  </FormGroup>
</Form>`})]},"multi-select-groups")},{id:"description",title:"Description",render:()=>(0,t.jsxs)(r.Fragment,{children:[(0,t.jsx)(n.Text,{children:"It is possible to add a description for select options and actions."}),(0,t.jsx)(l.CodePreview,{children:`function Example() {
  const [value, setValue] = useState([1]);
  const handleChange = (val) => setValue(val);

  return (
    <Form>
      <FormGroup>
        <MultiSelect
          action={{
            actionType: 'destructive',
            content: 'Remove',
            description: 'Description for remove action',
            icon: <DeleteIcon />,
            onActionClick: () => null,
          }}
          label="Select"
          onOptionsChange={handleChange}
          options={[
            {
              value: 1,
              content: 'Option #1',
              description: 'Description for option #1',
            },
            {
              value: 2,
              content: 'Option #2',
              description: 'Description for option #2',
              disabled: true,
            },
            { value: 3, content: 'Option #3' },
            { value: 4, content: 'Option #4' },
            { value: 5, content: 'Option #5' },
          ]}
          placeholder="Choose option"
          required
          value={value}
        />
      </FormGroup>
    </Form>
  );
}`})]},"description")}]})}),(0,t.jsx)(o.Panel,{header:"Props",headerId:"props",children:(0,t.jsx)(a.ContentRoutingTabs,{id:"props",routes:[{id:"multi-select",title:"MultiSelect",render:()=>(0,t.jsx)(p,{})},{id:"select-option",title:"SelectOption",render:()=>(0,t.jsx)(h.SelectOptionPropTable,{})},{id:"select-action",title:"SelectAction",render:()=>(0,t.jsx)(h.SelectActionPropTable,{})}]})}),(0,t.jsx)(o.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,t.jsx)(s.GuidelinesTable,{discouraged:[(0,t.jsxs)(t.Fragment,{children:["Avoid using a ",(0,t.jsx)(i.Code,{primary:!0,children:"MultiSelect"})," if there are less than three options provided in the dropdown."]})],recommended:[(0,t.jsx)(t.Fragment,{children:"Have a default selection whenever possible. If there’s no logical default, leverage placeholder text."}),(0,t.jsx)(t.Fragment,{children:"Sort the list of options in a way that makes the most sense to users."}),(0,t.jsx)(t.Fragment,{children:"Provide the ability to search when there is a use case for particular choices."})]})})]})],6315)},3441,(e,t,n)=>{let o="/multi-select";(window.__NEXT_P=window.__NEXT_P||[]).push([o,()=>e.r(6315)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([o])})}]);