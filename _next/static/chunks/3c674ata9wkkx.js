(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,84223,e=>{e.v(i=>Promise.all(["static/chunks/0h0fandno2j3p.js"].map(i=>e.l(i))).then(()=>i(35465)))},46915,e=>{e.v(i=>Promise.all(["static/chunks/2bk7_uthx7f7l.js"].map(i=>e.l(i))).then(()=>i(43232)))},83158,(e,i,t)=>{"use strict";e.i(434),Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ImageConfigContext",{enumerable:!0,get:function(){return s}});let r=e.r(80763)._(e.r(99161)),n=e.r(3221),s=r.default.createContext(n.imageConfigDefault)},3221,(e,i,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={VALID_LOADERS:function(){return s},imageConfigDefault:function(){return o}};for(var n in r)Object.defineProperty(t,n,{enumerable:!0,get:r[n]});let s=["default","imgix","cloudinary","akamai","custom"],o={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},83603,e=>{"use strict";var i=e.i(80447),t=e.i(1304),r=e.i(65059),n=e.i(85287),s=e.i(79564),o=e.i(2198),a=e.i(17528);e.s(["GuidelinesTable",0,({recommended:e,discouraged:d})=>(0,i.jsxs)(i.Fragment,{children:[e.length>0&&(0,i.jsx)(s.StatefulTable,{columns:[{header:"Do",hash:"do",render:({recommend:e})=>e}],items:e.map(e=>({recommend:(0,i.jsxs)(r.Flex,{alignItems:"center",children:[(0,i.jsx)(n.FlexItem,{flexGrow:0,marginRight:"large",children:(0,i.jsx)(o.CheckCircleIcon,{color:"success"})}),(0,i.jsx)(n.FlexItem,{children:e})]})}))}),d.length>0&&(0,i.jsx)(t.Box,{marginTop:"xLarge",children:(0,i.jsx)(s.StatefulTable,{columns:[{header:"Don't",hash:"dont",render:({discourage:e})=>e}],items:d.map(e=>({discourage:(0,i.jsxs)(r.Flex,{alignItems:"center",children:[(0,i.jsx)(n.FlexItem,{flexGrow:0,marginRight:"large",children:(0,i.jsx)(a.ErrorIcon,{color:"danger"})}),(0,i.jsx)(n.FlexItem,{children:e})]})}))})})]})])},26214,e=>{"use strict";var i=e.i(80447),t=e.i(1304),r=e.i(13332),n=e.i(82218),s=e.i(7277),o=e.i(4292),a=e.i(99161),d=e.i(77136),l=e.i(27746),c=e.i(21908),h=e.i(83603);let m=({children:e,...r})=>(0,i.jsx)(t.Box,{backgroundColor:"secondary10",border:"box",...r,children:e});e.s(["default",0,()=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.H1,{children:"Breakpoints"}),(0,i.jsx)(s.Panel,{header:"Overview",headerId:"overview",children:(0,i.jsxs)(r.Text,{children:["BigDesign exposes a set of ",(0,i.jsx)(d.Code,{primary:!0,children:"breakpoints"})," and"," ",(0,i.jsx)(d.Code,{primary:!0,children:"breakpointValues"})," that can be used to create responsive layouts and components. Our breakpoints include ",(0,i.jsx)(d.Code,{primary:!0,children:"mobile"}),", ",(0,i.jsx)(d.Code,{primary:!0,children:"tablet"})," ","and ",(0,i.jsx)(d.Code,{primary:!0,children:"desktop"}),". For each breakpoint, the breakpoint values are"," ",(0,i.jsx)(d.Code,{children:o.breakpointValues.mobile}),", ",(0,i.jsx)(d.Code,{children:o.breakpointValues.tablet}),","," ",(0,i.jsx)(d.Code,{children:o.breakpointValues.desktop})," and ",(0,i.jsx)(d.Code,{children:o.breakpointValues.wide})," ","respectively."]})}),(0,i.jsx)(s.Panel,{header:"Implementation",headerId:"implementation",children:(0,i.jsx)(c.ContentRoutingTabs,{id:"implementation",routes:[{id:"basic",title:"Basic",render:()=>(0,i.jsxs)(a.Fragment,{children:[(0,i.jsxs)(r.Text,{children:["Most utility components contain responsive props. You can pass in an object with"," ",(0,i.jsx)(d.Code,{primary:!0,children:"breakpoints"})," as keys to provide values at each breakpoint. BigDesign is mobile-first in nature, so bigger screen size values will override smaller ones."]}),(0,i.jsx)(l.CodePreview,{scope:{Box:m},children:`<Box
  padding={{
    mobile: 'none',
    tablet: 'small',
    desktop: 'xLarge',
    wide: 'xxLarge',
  }}
>
  This box has responsive props!
</Box>`})]},"basic")},{id:"extending",title:"Extending",render:()=>(0,i.jsxs)(a.Fragment,{children:[(0,i.jsx)(n.Message,{marginVertical:"medium",messages:[{text:"Before extending a component, if possible, use one of BigDesigns core components."}],type:"warning"}),(0,i.jsxs)(r.Text,{children:["If you need a customized wrapper you can extend one of our utility components (",(0,i.jsx)(d.Code,{primary:!0,children:"Box"}),", ",(0,i.jsx)(d.Code,{primary:!0,children:"Flex"}),", or ",(0,i.jsx)(d.Code,{primary:!0,children:"Grid"}),") using ",(0,i.jsx)(d.Code,{children:"styled-components"}),". Exposed on the ",(0,i.jsx)(d.Code,{primary:!0,children:"theme"})," ","object is the ",(0,i.jsx)(d.Code,{primary:!0,children:"breakpoints"})," key. The values returned are"," ",(0,i.jsx)(d.Code,{children:"@media"})," queries ready for consumtion."]}),(0,i.jsx)(l.CodePreview,{scope:{Box:m},children:`function Example() {
  const StyledBox = styled(Box)\`
    height: \${({ theme }) => theme.spacing.xxxLarge};
    width: 100%;

    \${({ theme }) => theme.breakpoints.tablet} {
      width: 75%;
    }

    \${({ theme }) => theme.breakpoints.desktop} {
      width: 50%;
    }

    \${({ theme }) => theme.breakpoints.wide} {
      width: 25%;
    }
  \`;

  return <StyledBox />;
}`})]},"extending")},{id:"breakpoint-values",title:"Breakpoint Values",render:()=>(0,i.jsxs)(a.Fragment,{children:[(0,i.jsxs)(r.Text,{children:[(0,i.jsx)(d.Code,{primary:!0,children:"breakpointValues"})," are also exposed on the"," ",(0,i.jsx)(d.Code,{primary:!0,children:"theme"})," object. Each value is the ",(0,i.jsx)(d.Code,{children:"px"})," value of each breakpoint."]}),(0,i.jsx)(l.CodePreview,{scope:{Box:m},children:`function Example() {
  const StyledBox = styled(Box)\`
    height: \${({ theme }) => theme.spacing.xxxLarge};
    width: 100%;

    \${({ theme }) => theme.breakpoints.desktop} {
      width: \${({ theme }) => theme.breakpointValues.tablet};
    }
  \`;

  return <StyledBox />;
}`})]},"breakpoint-values")}]})}),(0,i.jsx)(s.Panel,{header:"Do's and Don'ts",headerId:"guidelines",children:(0,i.jsx)(h.GuidelinesTable,{discouraged:[],recommended:["Use built in responsive props, where applicable."]})})]})])},72418,(e,i,t)=>{let r="/breakpoints";(window.__NEXT_P=window.__NEXT_P||[]).push([r,()=>e.r(26214)]),i.hot&&i.hot.dispose(function(){window.__NEXT_P.push([r])})}]);