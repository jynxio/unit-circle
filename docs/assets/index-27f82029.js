(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const T={};function Xe(e){T.context=e}const Qe=(e,t)=>e===t,Re={equals:Qe};let De=He;const I=1,re=2,Ze={owned:null,cleanups:null,context:null,owner:null};var E=null;let O=null,y=null,A=null,L=null,be=0;function Je(e,t){const n=y,o=E,r=e.length===0,s=r?Ze:{owned:null,cleanups:null,context:null,owner:t===void 0?o:t},i=r?e:()=>e(()=>Q(()=>ue(s)));E=s,y=null;try{return J(i,!0)}finally{y=n,E=o}}function qe(e,t){t=t?Object.assign({},Re,t):Re;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},o=r=>(typeof r=="function"&&(r=r(n.value)),Ue(n,r));return[tt.bind(n),o]}function G(e,t,n){const o=Ge(e,t,!1,I);fe(o)}function Be(e,t,n){De=rt;const o=Ge(e,t,!1,I);o.user=!0,L?L.push(o):fe(o)}function Q(e){if(y===null)return e();const t=y;y=null;try{return e()}finally{y=t}}function ye(e){Be(()=>Q(e))}function et(e){return E===null||(E.cleanups===null?E.cleanups=[e]:E.cleanups.push(e)),e}function tt(){const e=O;if(this.sources&&(this.state||e))if(this.state===I||e)fe(this);else{const t=A;A=null,J(()=>ie(this),!1),A=t}if(y){const t=this.observers?this.observers.length:0;y.sources?(y.sources.push(this),y.sourceSlots.push(t)):(y.sources=[this],y.sourceSlots=[t]),this.observers?(this.observers.push(y),this.observerSlots.push(y.sources.length-1)):(this.observers=[y],this.observerSlots=[y.sources.length-1])}return this.value}function Ue(e,t,n){let o=e.value;return(!e.comparator||!e.comparator(o,t))&&(e.value=t,e.observers&&e.observers.length&&J(()=>{for(let r=0;r<e.observers.length;r+=1){const s=e.observers[r],i=O&&O.running;i&&O.disposed.has(s),(i&&!s.tState||!i&&!s.state)&&(s.pure?A.push(s):L.push(s),s.observers&&je(s)),i||(s.state=I)}if(A.length>1e6)throw A=[],new Error},!1)),t}function fe(e){if(!e.fn)return;ue(e);const t=E,n=y,o=be;y=E=e,nt(e,e.value,o),y=n,E=t}function nt(e,t,n){let o;try{o=e.fn(t)}catch(r){e.pure&&(e.state=I,e.owned&&e.owned.forEach(ue),e.owned=null),ze(r)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Ue(e,o):e.value=o,e.updatedAt=n)}function Ge(e,t,n,o=I,r){const s={fn:e,state:o,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:E,context:null,pure:n};return E===null||E!==Ze&&(E.owned?E.owned.push(s):E.owned=[s]),s}function se(e){const t=O;if(e.state===0||t)return;if(e.state===re||t)return ie(e);if(e.suspense&&Q(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<be);)(e.state||t)&&n.push(e);for(let o=n.length-1;o>=0;o--)if(e=n[o],e.state===I||t)fe(e);else if(e.state===re||t){const r=A;A=null,J(()=>ie(e,n[0]),!1),A=r}}function J(e,t){if(A)return e();let n=!1;t||(A=[]),L?n=!0:L=[],be++;try{const o=e();return ot(n),o}catch(o){n||(L=null),A=null,ze(o)}}function ot(e){if(A&&(He(A),A=null),e)return;const t=L;L=null,t.length&&J(()=>De(t),!1)}function He(e){for(let t=0;t<e.length;t++)se(e[t])}function rt(e){let t,n=0;for(t=0;t<e.length;t++){const o=e[t];o.user?e[n++]=o:se(o)}for(T.context&&Xe(),t=0;t<n;t++)se(e[t])}function ie(e,t){const n=O;e.state=0;for(let o=0;o<e.sources.length;o+=1){const r=e.sources[o];r.sources&&(r.state===I||n?r!==t&&se(r):(r.state===re||n)&&ie(r,t))}}function je(e){const t=O;for(let n=0;n<e.observers.length;n+=1){const o=e.observers[n];(!o.state||t)&&(o.state=re,o.pure?A.push(o):L.push(o),o.observers&&je(o))}}function ue(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),o=e.sourceSlots.pop(),r=n.observers;if(r&&r.length){const s=r.pop(),i=n.observerSlots.pop();o<r.length&&(s.sourceSlots[i]=o,r[o]=s,n.observerSlots[o]=i)}}if(e.owned){for(t=0;t<e.owned.length;t++)ue(e.owned[t]);e.owned=null}if(e.cleanups){for(t=0;t<e.cleanups.length;t++)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function st(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function ze(e){throw e=st(e),e}function we(e,t){return Q(()=>e(t||{}))}function it(e,t,n){let o=n.length,r=t.length,s=o,i=0,l=0,f=t[r-1].nextSibling,c=null;for(;i<r||l<s;){if(t[i]===n[l]){i++,l++;continue}for(;t[r-1]===n[s-1];)r--,s--;if(r===i){const u=s<o?l?n[l-1].nextSibling:n[s-l]:f;for(;l<s;)e.insertBefore(n[l++],u)}else if(s===l)for(;i<r;)(!c||!c.has(t[i]))&&t[i].remove(),i++;else if(t[i]===n[s-1]&&n[l]===t[r-1]){const u=t[--r].nextSibling;e.insertBefore(n[l++],t[i++].nextSibling),e.insertBefore(n[--s],u),t[r]=n[s]}else{if(!c){c=new Map;let a=l;for(;a<s;)c.set(n[a],a++)}const u=c.get(t[i]);if(u!=null)if(l<u&&u<s){let a=i,h=1,p;for(;++a<r&&a<s&&!((p=c.get(t[a]))==null||p!==u+h);)h++;if(h>u-l){const x=t[i];for(;l<u;)e.insertBefore(n[l++],x)}else e.replaceChild(n[l++],t[i++])}else i++;else t[i++].remove()}}}const Me="_$DX_DELEGATE";function lt(e,t,n,o={}){let r;return Je(s=>{r=s,t===document?e():H(t,e(),t.firstChild?null:void 0,n)},o.owner),()=>{r(),t.textContent=""}}function ae(e,t,n){const o=document.createElement("template");o.innerHTML=e;let r=o.content.firstChild;return n&&(r=r.firstChild),r}function ct(e,t=window.document){const n=t[Me]||(t[Me]=new Set);for(let o=0,r=e.length;o<r;o++){const s=e[o];n.has(s)||(n.add(s),t.addEventListener(s,ft))}}function B(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ve(e,t,n){return Q(()=>e(t,n))}function H(e,t,n,o){if(n!==void 0&&!o&&(o=[]),typeof t!="function")return le(e,t,o,n);G(r=>le(e,t(),r,n),o)}function ft(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),T.registry&&!T.done&&(T.done=!0,document.querySelectorAll("[id^=pl-]").forEach(o=>{for(;o&&o.nodeType!==8&&o.nodeValue!=="pl-"+e;){let r=o.nextSibling;o.remove(),o=r}o&&o.remove()}));n;){const o=n[t];if(o&&!n.disabled){const r=n[`${t}Data`];if(r!==void 0?o.call(n,r,e):o.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function le(e,t,n,o,r){for(T.context&&!n&&(n=[...e.childNodes]);typeof n=="function";)n=n();if(t===n)return n;const s=typeof t,i=o!==void 0;if(e=i&&n[0]&&n[0].parentNode||e,s==="string"||s==="number"){if(T.context)return n;if(s==="number"&&(t=t.toString()),i){let l=n[0];l&&l.nodeType===3?l.data=t:l=document.createTextNode(t),n=Z(e,n,o,l)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||s==="boolean"){if(T.context)return n;n=Z(e,n,o)}else{if(s==="function")return G(()=>{let l=t();for(;typeof l=="function";)l=l();n=le(e,l,n,o)}),()=>n;if(Array.isArray(t)){const l=[],f=n&&Array.isArray(n);if(Ee(l,t,n,r))return G(()=>n=le(e,l,n,o,!0)),()=>n;if(T.context){if(!l.length)return n;for(let c=0;c<l.length;c++)if(l[c].parentNode)return n=l}if(l.length===0){if(n=Z(e,n,o),i)return n}else f?n.length===0?$e(e,l,o):it(e,n,l):(n&&Z(e),$e(e,l));n=l}else if(t instanceof Node){if(T.context&&t.parentNode)return n=i?[t]:t;if(Array.isArray(n)){if(i)return n=Z(e,n,o,t);Z(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function Ee(e,t,n,o){let r=!1;for(let s=0,i=t.length;s<i;s++){let l=t[s],f=n&&n[s];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))r=Ee(e,l,f)||r;else if(typeof l=="function")if(o){for(;typeof l=="function";)l=l();r=Ee(e,Array.isArray(l)?l:[l],Array.isArray(f)?f:[f])||r}else e.push(l),r=!0;else{const c=String(l);f&&f.nodeType===3&&f.data===c?e.push(f):e.push(document.createTextNode(c))}}return r}function $e(e,t,n=null){for(let o=0,r=t.length;o<r;o++)e.insertBefore(t[o],n)}function Z(e,t,n,o){if(n===void 0)return e.textContent="";const r=o||document.createTextNode("");if(t.length){let s=!1;for(let i=t.length-1;i>=0;i--){const l=t[i];if(r!==l){const f=l.parentNode===e;!s&&!i?f?e.replaceChild(r,l):e.insertBefore(r,n):f&&l.remove()}else s=!0}}else e.insertBefore(r,n);return[r]}const ut="_container_p6vkh_1",at={container:ut};function ht(e,t){new ResizeObserver(o).observe(e,{box:"content-box"});function o(r){for(const s of r){const i=s.contentBoxSize[0].inlineSize,l=s.contentBoxSize[0].blockSize,f=Math.round(i*globalThis.devicePixelRatio),c=Math.round(l*globalThis.devicePixelRatio);e.width=f,e.height=c}t==null||t(e)}}const pt=`#version 300 es

in vec4 a_color;
in vec2 a_position;

uniform vec2 u_rotation;

out vec4 v_color;

void main () {

    v_color = a_color;

    vec2 rotatedPosition = vec2(
        a_position.x * u_rotation.y + a_position.y * u_rotation.x,
        a_position.y * u_rotation.y - a_position.x * u_rotation.x
    );

    gl_Position = vec4( rotatedPosition, 0, 1 );

}`,xt=`#version 300 es

precision highp float;

in vec4 v_color;

out vec4 outColor;

void main () {

    outColor = v_color;

}
`;function gt({canvas:e}){const t=e.getContext("webgl2");if(!t)throw new Error("当前运行时不支持webgl2");const n=Ne(t,t.VERTEX_SHADER,pt),o=Ne(t,t.FRAGMENT_SHADER,xt),r=_t(t,n,o),s=t.createVertexArray();t.bindVertexArray(s);const i=[],l=[],f=t.createBuffer(),c=t.createBuffer(),u=t.getAttribLocation(r,"a_color"),a=t.getAttribLocation(r,"a_position"),h=4,p=t.FLOAT,x=!1,_=0,w=0,m=2,b=t.FLOAT,g=!1,v=0,R=0,P=t.getUniformLocation(r,"u_rotation");this.render=M=>{i.length=0,l.length=0,M.forEach(S=>{i.push(...S.getColors()),l.push(...S.getPositions())}),t.bindBuffer(t.ARRAY_BUFFER,c),t.bufferData(t.ARRAY_BUFFER,new Float32Array(l),t.STATIC_DRAW),t.enableVertexAttribArray(a),t.vertexAttribPointer(a,m,b,g,v,R),t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,new Float32Array(i),t.STATIC_DRAW),t.enableVertexAttribArray(u),t.vertexAttribPointer(u,h,p,x,_,w),t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(r);let $=0;M.forEach(S=>{const N=S.getDrawCount(),xe=S.getRotation(),q=vt(t,S.getDrawType());t.uniform2fv(P,xe),t.drawArrays(q,$,N),$+=N})}}function Ne(e,t,n){const o=e.createShader(t);if(e.shaderSource(o,n),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS))return o;const s=new Error(e.getShaderInfoLog(o));throw e.deleteShader(o),s}function _t(e,t,n){const o=e.createProgram();if(e.attachShader(o,t),e.attachShader(o,n),e.linkProgram(o),e.getProgramParameter(o,e.LINK_STATUS))return o;const s=new Error(e.getProgramInfoLog(o));throw e.deleteProgram(o),s}function vt(e,t){switch(t){case"POINTS":return e.POINTS;case"LINES":return e.LINES;case"LINE_STRIP":return e.LINE_STRIP;case"LINE_LOOP":return e.LINE_LOOP;case"TRIANGLES":return e.TRIANGLES;case"TRIANGLE_STRIP":return e.TRIANGLE_STRIP;case"TRIANGLE_FAN":return e.TRIANGLE_FAN;default:throw new Error("遭遇非法参数")}}function j(e,t){const n=[];for(let o=0;o<e;o++)n.push(...t);return n}function z(e){const t=[];for(let n=0;n<e;n++)t.push(Math.random()*.5+.5,Math.random()*.5+.5,1,1);return t}function F({positions:e,color:t}){e=[...e];const n=Array.isArray(t)?j(e.length/2,[...t]):t==="diamond"?z(e.length/2):new Error("遭遇非法参数");if(n instanceof Error)throw n;const o=[0,1];this.getColors=r=>n,this.getRotation=r=>o,this.getPositions=r=>e,this.getDrawType=r=>"LINE_STRIP",this.getDrawCount=r=>e.length/2,this.setRotation=r=>Object.assign(o,r),this.setPositions=r=>{e.length=0,Object.assign(e,r)}}function Fe({positions:e,color:t}){e=[...e];const n=Array.isArray(t)?j(3,[...t]):t==="diamond"?z(3):new Error("遭遇非法参数");if(n instanceof Error)throw n;const o=[0,1];this.getColors=r=>n,this.getRotation=r=>o,this.getPositions=r=>e,this.getDrawType=r=>"TRIANGLES",this.getDrawCount=r=>3,this.setRotation=r=>Object.assign(o,r),this.setPositions=r=>{e.length=0,Object.assign(e,r)},this.setColor=r=>{const s=Array.isArray(r)?j(3,[...r]):r==="diamond"?z(3):new Error("遭遇非法参数");n.length=0,Object.assign(n,s)}}function de({center:e,radius:t,segmentCount:n,color:o}){const r=n,s=[],[i,l]=e,f=Math.PI*2/r;for(let a=0;a<r;a++){const h=f*a,p=Math.sin(h)*t+i,x=Math.cos(h)*t+l;s.push(p,x)}const c=Array.isArray(o)?j(r,[...o]):o==="diamond"?z(r):new Error("遭遇非法参数");if(c instanceof Error)throw c;const u=[0,1];this.getColors=a=>c,this.getRotation=a=>u,this.getPositions=a=>s,this.getDrawType=a=>"LINE_LOOP",this.getDrawCount=a=>s.length/2,this.setRotation=a=>Object.assign(u,a),this.setRadius=a=>{s.forEach((h,p,x)=>{const _=p%2===0?i:l;x[p]=(h-_)/t*a+_})}}var ce={},dt={get exports(){return ce},set exports(e){ce=e}};dt.exports=he;ce.default=he;function he(e,t,n){n=n||2;var o=t&&t.length,r=o?t[0]*n:e.length,s=ke(e,0,r,n,!0),i=[];if(!s||s.next===s.prev)return i;var l,f,c,u,a,h,p;if(o&&(s=Pt(e,t,s,n)),e.length>80*n){l=c=e[0],f=u=e[1];for(var x=n;x<r;x+=n)a=e[x],h=e[x+1],a<l&&(l=a),h<f&&(f=h),a>c&&(c=a),h>u&&(u=h);p=Math.max(c-l,u-f),p=p!==0?32767/p:0}return Y(s,i,n,l,f,p,0),i}function ke(e,t,n,o,r){var s,i;if(r===me(e,t,n,o)>0)for(s=t;s<n;s+=o)i=Ie(s,e[s],e[s+1],i);else for(s=n-o;s>=t;s-=o)i=Ie(s,e[s],e[s+1],i);return i&&pe(i,i.next)&&(X(i),i=i.next),i}function D(e,t){if(!e)return e;t||(t=e);var n=e,o;do if(o=!1,!n.steiner&&(pe(n,n.next)||d(n.prev,n,n.next)===0)){if(X(n),n=t=n.prev,n===n.next)break;o=!0}else n=n.next;while(o||n!==t);return t}function Y(e,t,n,o,r,s,i){if(e){!i&&s&&Tt(e,o,r,s);for(var l=e,f,c;e.prev!==e.next;){if(f=e.prev,c=e.next,s?wt(e,o,r,s):yt(e)){t.push(f.i/n|0),t.push(e.i/n|0),t.push(c.i/n|0),X(e),e=c.next,l=c.next;continue}if(e=c,e===l){i?i===1?(e=Et(D(e),t,n),Y(e,t,n,o,r,s,2)):i===2&&At(e,t,n,o,r,s):Y(D(e),t,n,o,r,s,1);break}}}}function yt(e){var t=e.prev,n=e,o=e.next;if(d(t,n,o)>=0)return!1;for(var r=t.x,s=n.x,i=o.x,l=t.y,f=n.y,c=o.y,u=r<s?r<i?r:i:s<i?s:i,a=l<f?l<c?l:c:f<c?f:c,h=r>s?r>i?r:i:s>i?s:i,p=l>f?l>c?l:c:f>c?f:c,x=o.next;x!==t;){if(x.x>=u&&x.x<=h&&x.y>=a&&x.y<=p&&U(r,l,s,f,i,c,x.x,x.y)&&d(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function wt(e,t,n,o){var r=e.prev,s=e,i=e.next;if(d(r,s,i)>=0)return!1;for(var l=r.x,f=s.x,c=i.x,u=r.y,a=s.y,h=i.y,p=l<f?l<c?l:c:f<c?f:c,x=u<a?u<h?u:h:a<h?a:h,_=l>f?l>c?l:c:f>c?f:c,w=u>a?u>h?u:h:a>h?a:h,m=Ae(p,x,t,n,o),b=Ae(_,w,t,n,o),g=e.prevZ,v=e.nextZ;g&&g.z>=m&&v&&v.z<=b;){if(g.x>=p&&g.x<=_&&g.y>=x&&g.y<=w&&g!==r&&g!==i&&U(l,u,f,a,c,h,g.x,g.y)&&d(g.prev,g,g.next)>=0||(g=g.prevZ,v.x>=p&&v.x<=_&&v.y>=x&&v.y<=w&&v!==r&&v!==i&&U(l,u,f,a,c,h,v.x,v.y)&&d(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;g&&g.z>=m;){if(g.x>=p&&g.x<=_&&g.y>=x&&g.y<=w&&g!==r&&g!==i&&U(l,u,f,a,c,h,g.x,g.y)&&d(g.prev,g,g.next)>=0)return!1;g=g.prevZ}for(;v&&v.z<=b;){if(v.x>=p&&v.x<=_&&v.y>=x&&v.y<=w&&v!==r&&v!==i&&U(l,u,f,a,c,h,v.x,v.y)&&d(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Et(e,t,n){var o=e;do{var r=o.prev,s=o.next.next;!pe(r,s)&&We(r,o,o.next,s)&&K(r,s)&&K(s,r)&&(t.push(r.i/n|0),t.push(o.i/n|0),t.push(s.i/n|0),X(o),X(o.next),o=e=s),o=o.next}while(o!==e);return D(o)}function At(e,t,n,o,r,s){var i=e;do{for(var l=i.next.next;l!==i.prev;){if(i.i!==l.i&&Mt(i,l)){var f=Ye(i,l);i=D(i,i.next),f=D(f,f.next),Y(i,t,n,o,r,s,0),Y(f,t,n,o,r,s,0);return}l=l.next}i=i.next}while(i!==e)}function Pt(e,t,n,o){var r=[],s,i,l,f,c;for(s=0,i=t.length;s<i;s++)l=t[s]*o,f=s<i-1?t[s+1]*o:e.length,c=ke(e,l,f,o,!1),c===c.next&&(c.steiner=!0),r.push(Rt(c));for(r.sort(mt),s=0;s<r.length;s++)n=bt(r[s],n);return n}function mt(e,t){return e.x-t.x}function bt(e,t){var n=St(e,t);if(!n)return t;var o=Ye(n,e);return D(o,o.next),D(n,n.next)}function St(e,t){var n=t,o=e.x,r=e.y,s=-1/0,i;do{if(r<=n.y&&r>=n.next.y&&n.next.y!==n.y){var l=n.x+(r-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(l<=o&&l>s&&(s=l,i=n.x<n.next.x?n:n.next,l===o))return i}n=n.next}while(n!==t);if(!i)return null;var f=i,c=i.x,u=i.y,a=1/0,h;n=i;do o>=n.x&&n.x>=c&&o!==n.x&&U(r<u?o:s,r,c,u,r<u?s:o,r,n.x,n.y)&&(h=Math.abs(r-n.y)/(o-n.x),K(n,e)&&(h<a||h===a&&(n.x>i.x||n.x===i.x&&Ct(i,n)))&&(i=n,a=h)),n=n.next;while(n!==f);return i}function Ct(e,t){return d(e.prev,e,t.prev)<0&&d(t.next,e,e.next)<0}function Tt(e,t,n,o){var r=e;do r.z===0&&(r.z=Ae(r.x,r.y,t,n,o)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==e);r.prevZ.nextZ=null,r.prevZ=null,Lt(r)}function Lt(e){var t,n,o,r,s,i,l,f,c=1;do{for(n=e,e=null,s=null,i=0;n;){for(i++,o=n,l=0,t=0;t<c&&(l++,o=o.nextZ,!!o);t++);for(f=c;l>0||f>0&&o;)l!==0&&(f===0||!o||n.z<=o.z)?(r=n,n=n.nextZ,l--):(r=o,o=o.nextZ,f--),s?s.nextZ=r:e=r,r.prevZ=s,s=r;n=o}s.nextZ=null,c*=2}while(i>1);return e}function Ae(e,t,n,o,r){return e=(e-n)*r|0,t=(t-o)*r|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Rt(e){var t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function U(e,t,n,o,r,s,i,l){return(r-i)*(t-l)>=(e-i)*(s-l)&&(e-i)*(o-l)>=(n-i)*(t-l)&&(n-i)*(s-l)>=(r-i)*(o-l)}function Mt(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!$t(e,t)&&(K(e,t)&&K(t,e)&&Nt(e,t)&&(d(e.prev,e,t.prev)||d(e,t.prev,t))||pe(e,t)&&d(e.prev,e,e.next)>0&&d(t.prev,t,t.next)>0)}function d(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function pe(e,t){return e.x===t.x&&e.y===t.y}function We(e,t,n,o){var r=ne(d(e,t,n)),s=ne(d(e,t,o)),i=ne(d(n,o,e)),l=ne(d(n,o,t));return!!(r!==s&&i!==l||r===0&&te(e,n,t)||s===0&&te(e,o,t)||i===0&&te(n,e,o)||l===0&&te(n,t,o))}function te(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function ne(e){return e>0?1:e<0?-1:0}function $t(e,t){var n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&We(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function K(e,t){return d(e.prev,e,e.next)<0?d(e,t,e.next)>=0&&d(e,e.prev,t)>=0:d(e,t,e.prev)<0||d(e,e.next,t)<0}function Nt(e,t){var n=e,o=!1,r=(e.x+t.x)/2,s=(e.y+t.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(o=!o),n=n.next;while(n!==e);return o}function Ye(e,t){var n=new Pe(e.i,e.x,e.y),o=new Pe(t.i,t.x,t.y),r=e.next,s=t.prev;return e.next=t,t.prev=e,n.next=r,r.prev=n,o.next=n,n.prev=o,s.next=o,o.prev=s,o}function Ie(e,t,n,o){var r=new Pe(e,t,n);return o?(r.next=o.next,r.prev=o,o.next.prev=r,o.next=r):(r.prev=r,r.next=r),r}function X(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Pe(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}he.deviation=function(e,t,n,o){var r=t&&t.length,s=r?t[0]*n:e.length,i=Math.abs(me(e,0,s,n));if(r)for(var l=0,f=t.length;l<f;l++){var c=t[l]*n,u=l<f-1?t[l+1]*n:e.length;i-=Math.abs(me(e,c,u,n))}var a=0;for(l=0;l<o.length;l+=3){var h=o[l]*n,p=o[l+1]*n,x=o[l+2]*n;a+=Math.abs((e[h]-e[x])*(e[p+1]-e[h+1])-(e[h]-e[p])*(e[x+1]-e[h+1]))}return i===0&&a===0?0:Math.abs((a-i)/i)};function me(e,t,n,o){for(var r=0,s=t,i=n-o;s<n;s+=o)r+=(e[i]-e[s])*(e[s+1]+e[i+1]),i=s;return r}he.flatten=function(e){for(var t=e[0][0].length,n={vertices:[],holes:[],dimensions:t},o=0,r=0;r<e.length;r++){for(var s=0;s<e[r].length;s++)for(var i=0;i<t;i++)n.vertices.push(e[r][s][i]);r>0&&(o+=e[r-1].length,n.holes.push(o))}return n};function Ft({center:e,radius:t,segmentCount:n,color:o}){const r=n,s=[],[i,l]=e,f=Math.PI*2/r;for(let p=r;p>0;p--){const x=f*p,_=Math.sin(x)*t+i,w=Math.cos(x)*t+l;s.push(_,w)}const c=ce(s,void 0,2),u=[];c.forEach(p=>u.push(s[p*2],s[p*2+1]));const a=Array.isArray(o)?j(u.length/2,[...o]):o==="diamond"?z(u.length/2):new Error("遭遇非法参数");if(a instanceof Error)throw a;const h=[0,1];this.getColors=p=>a,this.getRotation=p=>h,this.getPositions=p=>u,this.getDrawType=p=>"TRIANGLES",this.getDrawCount=p=>u.length/2,this.setRotation=p=>Object.assign(h,p),this.setColor=p=>{const x=Array.isArray(p)?j(u.length/2,[...p]):p==="diamond"?z(u.length/2):new Error("遭遇非法参数");a.length=0,Object.assign(a,x)}}const It="_container_1n7cg_2",Ot="_overlay_1n7cg_86",oe={container:It,"axis-tag-container":"_axis-tag-container_1n7cg_31","coordinate-container":"_coordinate-container_1n7cg_72",overlay:Ot},Dt=ae("<div><section><canvas></canvas></section><section><span>0</span><span>-1</span><span>+1</span><span>-1</span><span>+1</span></section><section></section><section></section></div>"),Ke=ae("<p></p>");function Zt(){let e;const[t,n]=qe(0);let o=!1,r=!1,s,i,l;return ye(_=>{const w=new gt({canvas:e}),m=new F({positions:[-.8,-1,-.8,1],color:[.2,.2,.2,1]}),b=new F({positions:[-0,-1,0,1],color:[.2,.2,.2,1]}),g=new F({positions:[.8,-1,.8,1],color:[.2,.2,.2,1]}),v=new F({positions:[-1,-.8,1,-.8],color:[.2,.2,.2,1]}),R=new F({positions:[-1,0,1,0],color:[.2,.2,.2,1]}),P=new F({positions:[-1,.8,1,.8],color:[.2,.2,.2,1]}),M=new F({positions:[0,0,0,.8],color:[1,1,1,1]}),$=new F({positions:[0,0,0,0],color:[1,1,1,1]}),S=new Fe({positions:[-.02,.8-.04,.02,.8-.04,0,.8],color:[1,1,1,1]}),N=new Fe({positions:[-.04,.02,-.04,-.02,0,0],color:[1,1,1,1]}),xe=new de({center:[0,0],radius:.8,segmentCount:256,color:[.7,.7,1,1]}),q=new de({center:[0,0],radius:.8+2/e.width,segmentCount:256,color:[.7,.7,1,1]}),Se=new de({center:[0,.8],radius:.065,segmentCount:32,color:[1,1,1,1]}),ge=new Ft({center:[0,.8],radius:.065,segmentCount:32,color:[0,0,0,1]}),_e=V=>w.render([ge,m,b,g,v,R,P,xe,q,$,N,M,S,Se]);ht(e,V=>{q.setRadius(.8+2/V.width),_e()}),Be(V=>{const k=t(),ee=[Math.sin(k),Math.cos(k)];Se.setRotation([...ee]),ge.setRotation([...ee]);const C=ee[0]*.8,W=ee[1]*.8,Te=Math.sign(C)||1,Le=Math.sign(W)||1;S.setPositions([-.02+C,W-.04*Le,.02+C,W-.04*Le,0+C,W]),N.setPositions([C-.04*Te,.02,C-.04*Te,-.02,C,0]),M.setPositions([C,0,C,W]),$.setPositions([0,0,C,0]),_e()});let ve=!1,Ce=performance.now();requestAnimationFrame(function V(){requestAnimationFrame(V);const k=performance.now();k-Ce<600||(ve=!ve,Ce=k,ge.setColor(ve?[.2,.2,.5,1]:[0,0,0,1]),_e())})}),ye(_=>{globalThis.addEventListener("touchmove",x,{passive:!1})}),et(_=>{globalThis.removeEventListener("touchmove",x)}),(()=>{const _=Dt.cloneNode(!0),w=_.firstChild,m=w.firstChild,b=w.nextSibling,g=b.nextSibling,v=g.nextSibling;_.addEventListener("pointerleave",c),_.addEventListener("pointerenter",f),_.$$pointermove=h,_.$$pointerdown=a,_.$$pointerup=u,_.addEventListener("wheel",p);const R=e;return typeof R=="function"?Ve(R,m):e=m,H(g,()=>Ut(t()),null),H(g,()=>Gt(t()),null),G(P=>{const M=oe.container,$=oe["axis-tag-container"],S=oe["coordinate-container"],N=oe.overlay;return M!==P._v$&&B(_,P._v$=M),$!==P._v$2&&B(b,P._v$2=$),S!==P._v$3&&B(g,P._v$3=S),N!==P._v$4&&B(v,P._v$4=N),P},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),_})();function f(_){o=!1,r=!0}function c(_){o=!1,r=!1}function u(_){o=!1,r=!0}function a(_){o=!0,r=!1,l=t(),[s,i]=[_.clientX,_.clientY]}function h(_){if(!o)return;const w=e.getBoundingClientRect(),m=[(w.right+w.left)/2,(w.top+w.bottom)/2],b=[s,i],g=[_.clientX,_.clientY],v=[b[0]-m[0],m[1]-b[1]],R=[g[0]-m[0],m[1]-g[1]],P=Bt(v,R);n(P/180*Math.PI+l)}function p(_){_.preventDefault(),_.stopPropagation(),r&&n(t()+Math.sign(_.deltaY)*Math.PI/180)}function x(_){_.preventDefault()}}function Bt(e,t){e=[...e],t=[...t];const n=s(e,t)/l(e)/l(t);if(f(n,1))return 0;if(f(n,-1))return 180;const o=Math.acos(n),r=i(e,t)[2];if(r<0)return o/Math.PI*180;if(r>0)return(Math.PI*2-o)/Math.PI*180;throw new Error("Error: Unexpected situation");function s(c,u){return c[0]*u[0]+c[1]*u[1]}function i(c,u){return c=[...c,0],u=[...u,0],[c[1]*u[2]-u[1]*c[2],u[0]*c[2]-c[0]*u[2],c[0]*u[1]-u[0]*c[1]]}function l(c){return Math.hypot(...c)}function f(c,u){return Math.abs(c-u)<Number.EPSILON}}function Ut(e){const t=(Math.sin(e)*.2+.5)*100+"%",n=Math.round(Math.sin(e)*100)/100,o=(n>0?"+":"")+n.toFixed(2);return(()=>{const r=Ke.cloneNode(!0);return r.style.setProperty("bottom","50%"),r.style.setProperty("left",t),H(r,o),r})()}function Gt(e){const t=(Math.cos(e)*.2+.5)*100+"%",n=(Math.sin(e)*.4+.5)*100+"%",o=Math.round(Math.cos(e)*100)/100,r=(o>0?"+":"")+o.toFixed(2);return(()=>{const s=Ke.cloneNode(!0);return s.style.setProperty("bottom",t),s.style.setProperty("left",n),H(s,r),s})()}ct(["pointerup","pointerdown","pointermove"]);const Ht="_footer_1ceuh_1",jt="_scale_1ceuh_1",Oe={footer:Ht,scale:jt},zt=ae('<footer><address>Made with <a href="https://www.solidjs.com/" target="_blank">WebGL<span>✨</span></a></address><hr><address><a href="https://github.com/jynxio/unit-circle" target="_blank">Source code</a></address></footer>');function Vt(){let e;return ye(t=>{(function n(){e.style.setProperty("animation-name","none"),setTimeout(o=>{e.style.setProperty("animation-name",Oe.scale),e.style.setProperty("top",Math.random()*120-30+"%"),e.style.setProperty("left",Math.random()*120-30+"%")},10),setTimeout(n,2e3)})()}),(()=>{const t=zt.cloneNode(!0),n=t.firstChild,o=n.firstChild,r=o.nextSibling,s=r.firstChild,i=s.nextSibling,l=e;return typeof l=="function"?Ve(l,i):e=i,G(()=>B(t,Oe.footer)),t})()}const kt=ae("<div></div>");function Wt(){return[(()=>{const e=kt.cloneNode(!0);return H(e,we(Zt,{})),G(()=>B(e,at.container)),e})(),we(Vt,{})]}lt(e=>we(Wt,{}),document.getElementById("solid-app"));
