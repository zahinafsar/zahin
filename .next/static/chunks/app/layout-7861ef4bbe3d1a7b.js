(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{8955:function(e,t,n){Promise.resolve().then(n.t.bind(n,2489,23)),Promise.resolve().then(n.t.bind(n,1654,23)),Promise.resolve().then(n.bind(n,7188))},7188:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var r=n(7437),i=n(2265),s=n(538);function o(){let e=(0,i.useRef)(!1);return(0,s.L)(()=>(e.current=!0,()=>{e.current=!1}),[]),e}var l=n(2363),a=n(8243),u=n(961);class c extends i.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){let e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function f({children:e,isPresent:t}){let n=(0,i.useId)(),r=(0,i.useRef)(null),s=(0,i.useRef)({width:0,height:0,top:0,left:0});return(0,i.useInsertionEffect)(()=>{let{width:e,height:i,top:o,left:l}=s.current;if(t||!r.current||!e||!i)return;r.current.dataset.motionPopId=n;let a=document.createElement("style");return document.head.appendChild(a),a.sheet&&a.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${i}px !important;
            top: ${o}px !important;
            left: ${l}px !important;
          }
        `),()=>{document.head.removeChild(a)}},[t]),i.createElement(c,{isPresent:t,childRef:r,sizeRef:s},i.cloneElement(e,{ref:r}))}let d=({children:e,initial:t,isPresent:n,onExitComplete:r,custom:s,presenceAffectsLayout:o,mode:l})=>{let c=(0,u.h)(m),d=(0,i.useId)(),h=(0,i.useMemo)(()=>({id:d,initial:t,isPresent:n,custom:s,onExitComplete:e=>{for(let t of(c.set(e,!0),c.values()))if(!t)return;r&&r()},register:e=>(c.set(e,!1),()=>c.delete(e))}),o?void 0:[n]);return(0,i.useMemo)(()=>{c.forEach((e,t)=>c.set(t,!1))},[n]),i.useEffect(()=>{n||c.size||!r||r()},[n]),"popLayout"===l&&(e=i.createElement(f,{isPresent:n},e)),i.createElement(a.O.Provider,{value:h},e)};function m(){return new Map}var h=n(781),p=n(6567);let v=e=>e.key||"",E=({children:e,custom:t,initial:n=!0,onExitComplete:r,exitBeforeEnter:a,presenceAffectsLayout:u=!0,mode:c="sync"})=>{var f;(0,p.k)(!a,"Replace exitBeforeEnter with mode='wait'");let m=(0,i.useContext)(h.p).forceRender||function(){let e=o(),[t,n]=(0,i.useState)(0),r=(0,i.useCallback)(()=>{e.current&&n(t+1)},[t]),s=(0,i.useCallback)(()=>l.Wi.postRender(r),[r]);return[s,t]}()[0],E=o(),x=function(e){let t=[];return i.Children.forEach(e,e=>{(0,i.isValidElement)(e)&&t.push(e)}),t}(e),g=x,w=(0,i.useRef)(new Map).current,k=(0,i.useRef)(g),y=(0,i.useRef)(new Map).current,_=(0,i.useRef)(!0);if((0,s.L)(()=>{_.current=!1,function(e,t){e.forEach(e=>{let n=v(e);t.set(n,e)})}(x,y),k.current=g}),f=()=>{_.current=!0,y.clear(),w.clear()},(0,i.useEffect)(()=>()=>f(),[]),_.current)return i.createElement(i.Fragment,null,g.map(e=>i.createElement(d,{key:v(e),isPresent:!0,initial:!!n&&void 0,presenceAffectsLayout:u,mode:c},e)));g=[...g];let b=k.current.map(v),R=x.map(v),C=b.length;for(let e=0;e<C;e++){let t=b[e];-1!==R.indexOf(t)||w.has(t)||w.set(t,void 0)}return"wait"===c&&w.size&&(g=[]),w.forEach((e,n)=>{if(-1!==R.indexOf(n))return;let s=y.get(n);if(!s)return;let o=b.indexOf(n),l=e;l||(l=i.createElement(d,{key:v(s),isPresent:!1,onExitComplete:()=>{w.delete(n);let e=Array.from(y.keys()).filter(e=>!R.includes(e));if(e.forEach(e=>y.delete(e)),k.current=x.filter(t=>{let r=v(t);return r===n||e.includes(r)}),!w.size){if(!1===E.current)return;m(),r&&r()}},custom:t,presenceAffectsLayout:u,mode:c},s),w.set(n,l)),g.splice(o,0,l)}),g=g.map(e=>{let t=e.key;return w.has(t)?e:i.createElement(d,{key:v(e),isPresent:!0,presenceAffectsLayout:u,mode:c},e)}),i.createElement(i.Fragment,null,w.size?g:g.map(e=>(0,i.cloneElement)(e)))};var x=n(7870),g={src:"/_next/static/media/sun.6061f54d.svg",height:137,width:137,blurWidth:0,blurHeight:0},w={src:"/_next/static/media/moon.8a4d2fc7.svg",height:137,width:137,blurWidth:0,blurHeight:0},k=n(6691),y=n.n(k);let _="dark"===localStorage.getItem("theme");function b(e){var t,n,s,o;let{className:l}=e,[a,u]=(0,i.useState)(0),[c,f]=(0,i.useState)(0),d=(0,i.useRef)(null),[m,h]=(0,i.useState)(_);(0,i.useEffect)(()=>{u(window.innerWidth),f(window.innerHeight)},[!0]);let p=Math.sqrt(a*a+c*c),v=(p-a)/2,k=(p-c)/2,b={x:(null===(t=d.current)||void 0===t?void 0:t.offsetLeft)||0,y:(null===(n=d.current)||void 0===n?void 0:n.offsetTop)||0},R={v:((null===(s=d.current)||void 0===s?void 0:s.offsetHeight)||0)/2,h:((null===(o=d.current)||void 0===o?void 0:o.offsetWidth)||0)/2};(0,i.useEffect)(()=>{let e=localStorage.getItem("theme");"dark"===e&&h(!0)},[]);let C={scale:0},P={rotate:0};return(0,r.jsxs)(E,{initial:!1,children:[(0,r.jsx)(x.E.div,{onClick:()=>{h(e=>(e?(document.documentElement.classList.remove("dark"),localStorage.removeItem("theme")):(document.documentElement.classList.add("dark"),localStorage.setItem("theme","dark")),!e))},ref:d,className:"cursor-pointer rounded-full w-[40px] h-[40px] flex justify-center items-center bg-slate-500 inner-shadow z-50 "+l,initial:P,animate:m?{rotate:180}:P,transition:{duration:.5},children:m?(0,r.jsx)(y(),{src:g,alt:"sun",className:"w-5 h-5"}):(0,r.jsx)(y(),{src:w,alt:"moon",className:"w-5 h-5"})}),(0,r.jsx)(x.E.div,{style:{position:"fixed",top:-k,left:-v,zIndex:-9999,width:p,height:p,backgroundColor:"#1b0021",borderRadius:p/2,transformOrigin:"\n            ".concat(R.h+v+b.x,"px\n            ").concat(R.v+k+b.y,"px\n            ")},initial:C,animate:m?{scale:1}:C,transition:{duration:.3}})]})}},2489:function(){},1654:function(e){e.exports={style:{fontFamily:"'__Inter_e66fe9', '__Inter_Fallback_e66fe9'",fontStyle:"normal"},className:"__className_e66fe9"}}},function(e){e.O(0,[62,971,472,744],function(){return e(e.s=8955)}),_N_E=e.O()}]);