import{W as Ri,r as mr,c as It,w as Ge,M as _r,B as gt,m as _i,C as Qi,f as Ze,I as pa,H as Ht,U as xt,F as Bt,s as At,t as yn,g as gr,u as Gt,v as ht,x as ni,N as ti,y as vr,z as Ln,E as Dn,G as ri,J as gi,P as wt,e as je,Q as Vt,L as en,T as ln,V as cn,i as xr,X as ut,Y as Sr,Z as Mr,_ as Er,$ as Tr,a0 as Ar,a1 as br,a2 as Rr,a3 as yt,a4 as zt,a5 as ai,a6 as ha,a7 as ma,a8 as Ia,a9 as Ai,aa as Xi,ab as io,ac as no,h as Cr,ad as Ot,k as Yi,ae as ao,af as ro,ag as vi,ah as oo,ai as so,p as Na,aj as lo,ak as co,A as Mi,al as fo,am as uo,an as po,ao as ho,ap as mo,aq as _o,O as go,ar as vo,as as xo,at as So,au as Mo,o as Eo,av as To,aw as Ao,ax as bo,ay as Ro,az as Co,aA as wo,aB as Po,aC as yo,aD as Lo,aE as Do,aF as Uo,aG as Fa,aH as Io,aI as No,aJ as Oa,aK as Ba,aL as Ga,aM as Fo,aN as Oo,aO as Bo,aP as Un,aQ as In,aR as Nn,aS as Fn,aT as On,aU as Bn,aV as Gn,aW as Vn,aX as Hn,aY as zn,aZ as kn,a_ as Wn,a$ as Xn,b0 as Yn,b1 as qn,b2 as Kn,b3 as Zn,b4 as $n,b5 as jn,b6 as Jn,b7 as Qn,b8 as ea,b9 as ta,ba as ia,bb as na,bc as aa,bd as ra,be as oa,bf as sa,bg as la,bh as ca,bi as fa,bj as qi,bk as Ki,bl as Zi,bm as $i,bn as _a,bo as wr,bp as ga,bq as va,br as Pr,bs as yr,bt as Lr,bu as Dr,bv as xa,bw as Sa,bx as Ur,by as Ci,bz as Ir,bA as fn,bB as Ui,bC as Go,bD as Vo,bE as Ho,bF as zo,bG as ko,bH as Wo,bI as Xo,bJ as wi,R as Yo,bK as qo,b as Ko,bL as Zo,bM as Va,bN as $o}from"./CdXmL3b-.js";import{a as tt,M as tn,C as Je,S as dn}from"./rBEjZqXj.js";import{V as ot}from"./B2p6Yrcu.js";import{V as ue}from"./RyH58GJG.js";import{S as Nr,B as si}from"./BkZDg-z0.js";import{M as Fe,E as Ma}from"./MLRWC7cq.js";import{E as Ea,O as Ta,M as oi,L as jo}from"./Dmu2ZQ86.js";import{Float32BufferAttribute as qt,BufferAttribute as ji,Uint32BufferAttribute as Jo,Uint16BufferAttribute as Qo}from"./HeXHYqK4.js";import{R as es}from"./DyYQloVW.js";import{C as ts,P as Et}from"./ConipNQq.js";const un=new ue,is=new ue,ns=new Fe;class ei{constructor(e=new ue(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,n,a){return this.normal.set(e,i,n),this.constant=a,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,n){const a=un.subVectors(n,i).cross(is.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const n=e.delta(un),a=this.normal.dot(n);if(a===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/a;return r<0||r>1?null:i.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const i=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return i<0&&n>0||n<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const n=i||ns.getNormalMatrix(e),a=this.coplanarPoint(un).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-a.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $t=new Nr,as=new ot(.5,.5),Ii=new ue;class Fr{constructor(e=new ei,i=new ei,n=new ei,a=new ei,r=new ei,o=new ei){this.planes=[e,i,n,a,r,o]}set(e,i,n,a,r,o){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(n),d[3].copy(a),d[4].copy(r),d[5].copy(o),this}copy(e){const i=this.planes;for(let n=0;n<6;n++)i[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,i=Ri,n=!1){const a=this.planes,r=e.elements,o=r[0],d=r[1],m=r[2],_=r[3],T=r[4],b=r[5],p=r[6],v=r[7],S=r[8],L=r[9],c=r[10],l=r[11],x=r[12],A=r[13],M=r[14],D=r[15];if(a[0].setComponents(_-o,v-T,l-S,D-x).normalize(),a[1].setComponents(_+o,v+T,l+S,D+x).normalize(),a[2].setComponents(_+d,v+b,l+L,D+A).normalize(),a[3].setComponents(_-d,v-b,l-L,D-A).normalize(),n)a[4].setComponents(m,p,c,M).normalize(),a[5].setComponents(_-m,v-p,l-c,D-M).normalize();else if(a[4].setComponents(_-m,v-p,l-c,D-M).normalize(),i===Ri)a[5].setComponents(_+m,v+p,l+c,D+M).normalize();else if(i===mr)a[5].setComponents(m,p,c,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$t.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),$t.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($t)}intersectsSprite(e){$t.center.set(0,0,0);const i=as.distanceTo(e.center);return $t.radius=.7071067811865476+i,$t.applyMatrix4(e.matrixWorld),this.intersectsSphere($t)}intersectsSphere(e){const i=this.planes,n=e.center,a=-e.radius;for(let r=0;r<6;r++)if(i[r].distanceToPoint(n)<a)return!1;return!0}intersectsBox(e){const i=this.planes;for(let n=0;n<6;n++){const a=i[n];if(Ii.x=a.normal.x>0?e.max.x:e.min.x,Ii.y=a.normal.y>0?e.max.y:e.min.y,Ii.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Ii)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let n=0;n<6;n++)if(i[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class at{constructor(e=0,i=0,n=0,a=1){at.prototype.isVector4=!0,this.x=e,this.y=i,this.z=n,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,n,a){return this.x=e,this.y=i,this.z=n,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,n=this.y,a=this.z,r=this.w,o=e.elements;return this.x=o[0]*i+o[4]*n+o[8]*a+o[12]*r,this.y=o[1]*i+o[5]*n+o[9]*a+o[13]*r,this.z=o[2]*i+o[6]*n+o[10]*a+o[14]*r,this.w=o[3]*i+o[7]*n+o[11]*a+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,n,a,r;const m=e.elements,_=m[0],T=m[4],b=m[8],p=m[1],v=m[5],S=m[9],L=m[2],c=m[6],l=m[10];if(Math.abs(T-p)<.01&&Math.abs(b-L)<.01&&Math.abs(S-c)<.01){if(Math.abs(T+p)<.1&&Math.abs(b+L)<.1&&Math.abs(S+c)<.1&&Math.abs(_+v+l-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const A=(_+1)/2,M=(v+1)/2,D=(l+1)/2,w=(T+p)/4,U=(b+L)/4,u=(S+c)/4;return A>M&&A>D?A<.01?(n=0,a=.707106781,r=.707106781):(n=Math.sqrt(A),a=w/n,r=U/n):M>D?M<.01?(n=.707106781,a=0,r=.707106781):(a=Math.sqrt(M),n=w/a,r=u/a):D<.01?(n=.707106781,a=.707106781,r=0):(r=Math.sqrt(D),n=U/r,a=u/r),this.set(n,a,r,i),this}let x=Math.sqrt((c-S)*(c-S)+(b-L)*(b-L)+(p-T)*(p-T));return Math.abs(x)<.001&&(x=1),this.x=(c-S)/x,this.y=(b-L)/x,this.z=(p-T)/x,this.w=Math.acos((_+v+l-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=It(this.x,e.x,i.x),this.y=It(this.y,e.y,i.y),this.z=It(this.z,e.z,i.z),this.w=It(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=It(this.x,e,i),this.y=It(this.y,e,i),this.z=It(this.z,e,i),this.w=It(this.w,e,i),this}clampLength(e,i){const n=this.length();return this.divideScalar(n||1).multiplyScalar(It(n,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,n){return this.x=e.x+(i.x-e.x)*n,this.y=e.y+(i.y-e.y)*n,this.z=e.z+(i.z-e.z)*n,this.w=e.w+(i.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}function Or(){let t=null,e=!1,i=null,n=null;function a(r,o){i(r,o),n=t.requestAnimationFrame(a)}return{start:function(){e!==!0&&i!==null&&(n=t.requestAnimationFrame(a),e=!0)},stop:function(){t.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){i=r},setContext:function(r){t=r}}}function rs(t){const e=new WeakMap;function i(d,m){const _=d.array,T=d.usage,b=_.byteLength,p=t.createBuffer();t.bindBuffer(m,p),t.bufferData(m,_,T),d.onUploadCallback();let v;if(_ instanceof Float32Array)v=t.FLOAT;else if(typeof Float16Array<"u"&&_ instanceof Float16Array)v=t.HALF_FLOAT;else if(_ instanceof Uint16Array)d.isFloat16BufferAttribute?v=t.HALF_FLOAT:v=t.UNSIGNED_SHORT;else if(_ instanceof Int16Array)v=t.SHORT;else if(_ instanceof Uint32Array)v=t.UNSIGNED_INT;else if(_ instanceof Int32Array)v=t.INT;else if(_ instanceof Int8Array)v=t.BYTE;else if(_ instanceof Uint8Array)v=t.UNSIGNED_BYTE;else if(_ instanceof Uint8ClampedArray)v=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+_);return{buffer:p,type:v,bytesPerElement:_.BYTES_PER_ELEMENT,version:d.version,size:b}}function n(d,m,_){const T=m.array,b=m.updateRanges;if(t.bindBuffer(_,d),b.length===0)t.bufferSubData(_,0,T);else{b.sort((v,S)=>v.start-S.start);let p=0;for(let v=1;v<b.length;v++){const S=b[p],L=b[v];L.start<=S.start+S.count+1?S.count=Math.max(S.count,L.start+L.count-S.start):(++p,b[p]=L)}b.length=p+1;for(let v=0,S=b.length;v<S;v++){const L=b[v];t.bufferSubData(_,L.start*T.BYTES_PER_ELEMENT,T,L.start,L.count)}m.clearUpdateRanges()}m.onUploadCallback()}function a(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function r(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=e.get(d);m&&(t.deleteBuffer(m.buffer),e.delete(d))}function o(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const T=e.get(d);(!T||T.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const _=e.get(d);if(_===void 0)e.set(d,i(d,m));else if(_.version<d.version){if(_.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(_.buffer,d,m),_.version=d.version}}return{get:a,remove:r,update:o}}class yi extends si{constructor(e=1,i=1,n=1,a=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:n,widthSegments:a,heightSegments:r,depthSegments:o};const d=this;a=Math.floor(a),r=Math.floor(r),o=Math.floor(o);const m=[],_=[],T=[],b=[];let p=0,v=0;S("z","y","x",-1,-1,n,i,e,o,r,0),S("z","y","x",1,-1,n,i,-e,o,r,1),S("x","z","y",1,1,e,n,i,a,o,2),S("x","z","y",1,-1,e,n,-i,a,o,3),S("x","y","z",1,-1,e,i,n,a,r,4),S("x","y","z",-1,-1,e,i,-n,a,r,5),this.setIndex(m),this.setAttribute("position",new qt(_,3)),this.setAttribute("normal",new qt(T,3)),this.setAttribute("uv",new qt(b,2));function S(L,c,l,x,A,M,D,w,U,u,g){const K=M/U,y=D/u,V=M/2,W=D/2,z=w/2,X=U+1,B=u+1;let F=0,ee=0;const j=new ue;for(let pe=0;pe<B;pe++){const Me=pe*y-W;for(let ce=0;ce<X;ce++){const Le=ce*K-V;j[L]=Le*x,j[c]=Me*A,j[l]=z,_.push(j.x,j.y,j.z),j[L]=0,j[c]=0,j[l]=w>0?1:-1,T.push(j.x,j.y,j.z),b.push(ce/U),b.push(1-pe/u),F+=1}}for(let pe=0;pe<u;pe++)for(let Me=0;Me<U;Me++){const ce=p+Me+X*pe,Le=p+Me+X*(pe+1),Qe=p+(Me+1)+X*(pe+1),$e=p+(Me+1)+X*pe;m.push(ce,Le,$e),m.push(Le,Qe,$e),ee+=6}d.addGroup(v,ee,g),v+=ee,p+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class nn extends si{constructor(e=1,i=1,n=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:n,heightSegments:a};const r=e/2,o=i/2,d=Math.floor(n),m=Math.floor(a),_=d+1,T=m+1,b=e/d,p=i/m,v=[],S=[],L=[],c=[];for(let l=0;l<T;l++){const x=l*p-o;for(let A=0;A<_;A++){const M=A*b-r;S.push(M,-x,0),L.push(0,0,1),c.push(A/d),c.push(1-l/m)}}for(let l=0;l<m;l++)for(let x=0;x<d;x++){const A=x+_*l,M=x+_*(l+1),D=x+1+_*(l+1),w=x+1+_*l;v.push(A,M,w),v.push(M,D,w)}this.setIndex(v),this.setAttribute("position",new qt(S,3)),this.setAttribute("normal",new qt(L,3)),this.setAttribute("uv",new qt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nn(e.width,e.height,e.widthSegments,e.heightSegments)}}function xi(t){const e={};for(const i in t){e[i]={};for(const n in t[i]){const a=t[i][n];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][n]=null):e[i][n]=a.clone():Array.isArray(a)?e[i][n]=a.slice():e[i][n]=a}}return e}function mt(t){const e={};for(let i=0;i<t.length;i++){const n=xi(t[i]);for(const a in n)e[a]=n[a]}return e}function os(t){const e=[];for(let i=0;i<t.length;i++)e.push(t[i].clone());return e}function Br(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}const ss={clone:xi,merge:mt},ls=`
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`,cs=`
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;class Lt extends tn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ls,this.fragmentShader=cs,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xi(e.uniforms),this.uniformsGroups=os(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const a in this.uniforms){const o=this.uniforms[a].value;o&&o.isTexture?i.uniforms[a]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?i.uniforms[a]={type:"c",value:o.getHex()}:o&&o.isVector2?i.uniforms[a]={type:"v2",value:o.toArray()}:o&&o.isVector3?i.uniforms[a]={type:"v3",value:o.toArray()}:o&&o.isVector4?i.uniforms[a]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?i.uniforms[a]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?i.uniforms[a]={type:"m4",value:o.toArray()}:i.uniforms[a]={value:o}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const n={};for(const a in this.extensions)this.extensions[a]===!0&&(n[a]=!0);return Object.keys(n).length>0&&(i.extensions=n),i}}const Mt=new ue,Nt=new ue,pn=new ue,Ft=new ue,fi=new ue,di=new ue,Ha=new ue,hn=new ue,mn=new ue,_n=new ue,gn=new at,vn=new at,xn=new at;class Tt{constructor(e=new ue,i=new ue,n=new ue){this.a=e,this.b=i,this.c=n}static getNormal(e,i,n,a){a.subVectors(n,i),Mt.subVectors(e,i),a.cross(Mt);const r=a.lengthSq();return r>0?a.multiplyScalar(1/Math.sqrt(r)):a.set(0,0,0)}static getBarycoord(e,i,n,a,r){Mt.subVectors(a,i),Nt.subVectors(n,i),pn.subVectors(e,i);const o=Mt.dot(Mt),d=Mt.dot(Nt),m=Mt.dot(pn),_=Nt.dot(Nt),T=Nt.dot(pn),b=o*_-d*d;if(b===0)return r.set(0,0,0),null;const p=1/b,v=(_*m-d*T)*p,S=(o*T-d*m)*p;return r.set(1-v-S,S,v)}static containsPoint(e,i,n,a){return this.getBarycoord(e,i,n,a,Ft)===null?!1:Ft.x>=0&&Ft.y>=0&&Ft.x+Ft.y<=1}static getInterpolation(e,i,n,a,r,o,d,m){return this.getBarycoord(e,i,n,a,Ft)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(r,Ft.x),m.addScaledVector(o,Ft.y),m.addScaledVector(d,Ft.z),m)}static getInterpolatedAttribute(e,i,n,a,r,o){return gn.setScalar(0),vn.setScalar(0),xn.setScalar(0),gn.fromBufferAttribute(e,i),vn.fromBufferAttribute(e,n),xn.fromBufferAttribute(e,a),o.setScalar(0),o.addScaledVector(gn,r.x),o.addScaledVector(vn,r.y),o.addScaledVector(xn,r.z),o}static isFrontFacing(e,i,n,a){return Mt.subVectors(n,i),Nt.subVectors(e,i),Mt.cross(Nt).dot(a)<0}set(e,i,n){return this.a.copy(e),this.b.copy(i),this.c.copy(n),this}setFromPointsAndIndices(e,i,n,a){return this.a.copy(e[i]),this.b.copy(e[n]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,i,n,a){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mt.subVectors(this.c,this.b),Nt.subVectors(this.a,this.b),Mt.cross(Nt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Tt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Tt.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,n,a,r){return Tt.getInterpolation(e,this.a,this.b,this.c,i,n,a,r)}containsPoint(e){return Tt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Tt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const n=this.a,a=this.b,r=this.c;let o,d;fi.subVectors(a,n),di.subVectors(r,n),hn.subVectors(e,n);const m=fi.dot(hn),_=di.dot(hn);if(m<=0&&_<=0)return i.copy(n);mn.subVectors(e,a);const T=fi.dot(mn),b=di.dot(mn);if(T>=0&&b<=T)return i.copy(a);const p=m*b-T*_;if(p<=0&&m>=0&&T<=0)return o=m/(m-T),i.copy(n).addScaledVector(fi,o);_n.subVectors(e,r);const v=fi.dot(_n),S=di.dot(_n);if(S>=0&&v<=S)return i.copy(r);const L=v*_-m*S;if(L<=0&&_>=0&&S<=0)return d=_/(_-S),i.copy(n).addScaledVector(di,d);const c=T*S-v*b;if(c<=0&&b-T>=0&&v-S>=0)return Ha.subVectors(r,a),d=(b-T)/(b-T+(v-S)),i.copy(a).addScaledVector(Ha,d);const l=1/(c+L+p);return o=L*l,d=p*l,i.copy(n).addScaledVector(fi,o).addScaledVector(di,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Gr extends tn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ea,this.combine=_r,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const za=new oi,jt=new es,Ni=new Nr,ka=new ue,Fi=new ue,Oi=new ue,Bi=new ue,Sn=new ue,Gi=new ue,Wa=new ue,Vi=new ue;class kt extends Ta{constructor(e=new si,i=new Gr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,n=Object.keys(i);if(n.length>0){const a=i[n[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=a.length;r<o;r++){const d=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=r}}}}getVertexPosition(e,i){const n=this.geometry,a=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;i.fromBufferAttribute(a,e);const d=this.morphTargetInfluences;if(r&&d){Gi.set(0,0,0);for(let m=0,_=r.length;m<_;m++){const T=d[m],b=r[m];T!==0&&(Sn.fromBufferAttribute(b,e),o?Gi.addScaledVector(Sn,T):Gi.addScaledVector(Sn.sub(i),T))}i.add(Gi)}return i}raycast(e,i){const n=this.geometry,a=this.material,r=this.matrixWorld;a!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ni.copy(n.boundingSphere),Ni.applyMatrix4(r),jt.copy(e.ray).recast(e.near),!(Ni.containsPoint(jt.origin)===!1&&(jt.intersectSphere(Ni,ka)===null||jt.origin.distanceToSquared(ka)>(e.far-e.near)**2))&&(za.copy(r).invert(),jt.copy(e.ray).applyMatrix4(za),!(n.boundingBox!==null&&jt.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,i,jt)))}_computeIntersections(e,i,n){let a;const r=this.geometry,o=this.material,d=r.index,m=r.attributes.position,_=r.attributes.uv,T=r.attributes.uv1,b=r.attributes.normal,p=r.groups,v=r.drawRange;if(d!==null)if(Array.isArray(o))for(let S=0,L=p.length;S<L;S++){const c=p[S],l=o[c.materialIndex],x=Math.max(c.start,v.start),A=Math.min(d.count,Math.min(c.start+c.count,v.start+v.count));for(let M=x,D=A;M<D;M+=3){const w=d.getX(M),U=d.getX(M+1),u=d.getX(M+2);a=Hi(this,l,e,n,_,T,b,w,U,u),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=c.materialIndex,i.push(a))}}else{const S=Math.max(0,v.start),L=Math.min(d.count,v.start+v.count);for(let c=S,l=L;c<l;c+=3){const x=d.getX(c),A=d.getX(c+1),M=d.getX(c+2);a=Hi(this,o,e,n,_,T,b,x,A,M),a&&(a.faceIndex=Math.floor(c/3),i.push(a))}}else if(m!==void 0)if(Array.isArray(o))for(let S=0,L=p.length;S<L;S++){const c=p[S],l=o[c.materialIndex],x=Math.max(c.start,v.start),A=Math.min(m.count,Math.min(c.start+c.count,v.start+v.count));for(let M=x,D=A;M<D;M+=3){const w=M,U=M+1,u=M+2;a=Hi(this,l,e,n,_,T,b,w,U,u),a&&(a.faceIndex=Math.floor(M/3),a.face.materialIndex=c.materialIndex,i.push(a))}}else{const S=Math.max(0,v.start),L=Math.min(m.count,v.start+v.count);for(let c=S,l=L;c<l;c+=3){const x=c,A=c+1,M=c+2;a=Hi(this,o,e,n,_,T,b,x,A,M),a&&(a.faceIndex=Math.floor(c/3),i.push(a))}}}}function fs(t,e,i,n,a,r,o,d){let m;if(e.side===gt?m=n.intersectTriangle(o,r,a,!0,d):m=n.intersectTriangle(a,r,o,e.side===_i,d),m===null)return null;Vi.copy(d),Vi.applyMatrix4(t.matrixWorld);const _=i.ray.origin.distanceTo(Vi);return _<i.near||_>i.far?null:{distance:_,point:Vi.clone(),object:t}}function Hi(t,e,i,n,a,r,o,d,m,_){t.getVertexPosition(d,Fi),t.getVertexPosition(m,Oi),t.getVertexPosition(_,Bi);const T=fs(t,e,i,n,Fi,Oi,Bi,Wa);if(T){const b=new ue;Tt.getBarycoord(Wa,Fi,Oi,Bi,b),a&&(T.uv=Tt.getInterpolatedAttribute(a,d,m,_,b,new ot)),r&&(T.uv1=Tt.getInterpolatedAttribute(r,d,m,_,b,new ot)),o&&(T.normal=Tt.getInterpolatedAttribute(o,d,m,_,b,new ue),T.normal.dot(n.direction)>0&&T.normal.multiplyScalar(-1));const p={a:d,b:m,c:_,normal:new ue,materialIndex:0};Tt.getNormal(Fi,Oi,Bi,p.normal),T.face=p,T.barycoord=b}return T}const ds=`
#ifdef USE_ALPHAHASH

	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;

#endif
`,us=`
#ifdef USE_ALPHAHASH

	/**
	 * See: https://casual-effects.com/research/Wyman2017Hashed/index.html
	 */

	const float ALPHA_HASH_SCALE = 0.05; // Derived from trials only, and may be changed.

	float hash2D( vec2 value ) {

		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );

	}

	float hash3D( vec3 value ) {

		return hash2D( vec2( hash2D( value.xy ), value.z ) );

	}

	float getAlphaHashThreshold( vec3 position ) {

		// Find the discretized derivatives of our coordinates
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );

		// Find two nearest log-discretized noise scales
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);

		// Compute alpha thresholds at our two noise scales
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);

		// Factor to interpolate lerp with
		float lerpFactor = fract( log2( pixScale ) );

		// Interpolate alpha threshold from noise at two scales
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;

		// Pass into CDF to compute uniformly distrib threshold
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);

		// Find our final, uniformly distributed alpha threshold (ατ)
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;

		// Avoids ατ == 0. Could also do ατ =1-ατ
		return clamp( threshold , 1.0e-6, 1.0 );

	}

#endif
`,ps=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;

#endif
`,hs=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`,ms=`
#ifdef USE_ALPHATEST

	#ifdef ALPHA_TO_COVERAGE

	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;

	#else

	if ( diffuseColor.a < alphaTest ) discard;

	#endif

#endif
`,_s=`
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`,gs=`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

	#endif

#endif
`,vs=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`,xs=`
#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif

	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {

		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );

	}

	float getIndirectIndex( const in int i ) {

		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );

	}

#endif

#ifdef USE_BATCHING_COLOR

	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {

		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );

	}

#endif
`,Ss=`
#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif
`,Ms=`
vec3 transformed = vec3( position );

#ifdef USE_ALPHAHASH

	vPosition = vec3( position );

#endif
`,Es=`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`,Ts=`

float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

	// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
	return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {

	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

}

vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( specularColor, 1.0, dotVH );

	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

	float D = D_BlinnPhong( shininess, dotNH );

	return F * ( G * D );

} // validated

`,As=`

#ifdef USE_IRIDESCENCE

	// XYZ to linear-sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	// Assume air interface for top
	// Note: We don't handle the case fresnel0 == 1
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float IorToFresnel0( float transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));

	}

	// Fresnel equations for dielectric/dielectric interfaces.
	// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	// Evaluation XYZ sensitivity curves in Fourier space
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;

		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;

	}

	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;

		// Phase shift
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

#endif

`,bs=`
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );

		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		// normalize is done to ensure that the bump map looks the same regardless of the texture's scale
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm; // normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

#endif
`,Rs=`
#if NUM_CLIPPING_PLANES > 0

	vec4 plane;

	#ifdef ALPHA_TO_COVERAGE

		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;

		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );

			if ( clipOpacity == 0.0 ) discard;

		}
		#pragma unroll_loop_end

		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

			float unionClipOpacity = 1.0;

			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );

			}
			#pragma unroll_loop_end

			clipOpacity *= 1.0 - unionClipOpacity;

		#endif

		diffuseColor.a *= clipOpacity;

		if ( diffuseColor.a == 0.0 ) discard;

	#else

		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;

		}
		#pragma unroll_loop_end

		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

			bool clipped = true;

			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;

			}
			#pragma unroll_loop_end

			if ( clipped ) discard;

		#endif

	#endif

#endif
`,Cs=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`,ws=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`,Ps=`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`,ys=`
#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#endif
`,Ls=`
#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#endif
`,Ds=`
#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )

	varying vec4 vColor;

#endif
`,Us=`
#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )

	vColor = vec4( 1.0 );

#endif

#ifdef USE_COLOR_ALPHA

	vColor *= color;

#elif defined( USE_COLOR )

	vColor.rgb *= color;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.rgb *= instanceColor.rgb;

#endif

#ifdef USE_BATCHING_COLOR

	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );

#endif
`,Is=`
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
// <tonemapping_pars_fragment> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

	return fract( sin( sn ) * c );

}

#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

#ifdef USE_ALPHAHASH

	varying vec3 vPosition;

#endif

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {

	// dir can be either a direction vector or a normal vector
	// upper-left 3x3 of matrix is assumed to be orthogonal

	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}

bool isPerspectiveMatrix( mat4 m ) {

	return m[ 2 ][ 3 ] == - 1.0;

}

vec2 equirectUv( in vec3 dir ) {

	// dir is assumed to be unit length

	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;

	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

	return vec2( u, v );

}

vec3 BRDF_Lambert( const in vec3 diffuseColor ) {

	return RECIPROCAL_PI * diffuseColor;

} // validated

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated

float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated
`,Ns=`
#ifdef ENVMAP_TYPE_CUBE_UV

	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0

	// These shader functions convert between the UV coordinates of a single face of
	// a cubemap, the 0-5 integer index of a cube face, and the direction vector for
	// sampling a textureCube (not generally normalized ).

	float getFace( vec3 direction ) {

		vec3 absDirection = abs( direction );

		float face = - 1.0;

		if ( absDirection.x > absDirection.z ) {

			if ( absDirection.x > absDirection.y )

				face = direction.x > 0.0 ? 0.0 : 3.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		} else {

			if ( absDirection.z > absDirection.y )

				face = direction.z > 0.0 ? 2.0 : 5.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		}

		return face;

	}

	// RH coordinate system; PMREM face-indexing convention
	vec2 getUV( vec3 direction, float face ) {

		vec2 uv;

		if ( face == 0.0 ) {

			uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

		} else if ( face == 1.0 ) {

			uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

		} else if ( face == 2.0 ) {

			uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

		} else if ( face == 3.0 ) {

			uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

		} else if ( face == 4.0 ) {

			uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

		} else {

			uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

		}

		return 0.5 * ( uv + 1.0 );

	}

	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {

		float face = getFace( direction );

		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );

		mipInt = max( mipInt, cubeUV_minMipLevel );

		float faceSize = exp2( mipInt );

		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0; // #25071

		if ( face > 2.0 ) {

			uv.y += faceSize;

			face -= 3.0;

		}

		uv.x += face * faceSize;

		uv.x += filterInt * 3.0 * cubeUV_minTileSize;

		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );

		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;

		#ifdef texture2DGradEXT

			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering

		#else

			return texture2D( envMap, uv ).rgb;

		#endif

	}

	// These defines must match with PMREMGenerator

	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0

	float roughnessToMip( float roughness ) {

		float mip = 0.0;

		if ( roughness >= cubeUV_r1 ) {

			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;

		} else if ( roughness >= cubeUV_r4 ) {

			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;

		} else if ( roughness >= cubeUV_r5 ) {

			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;

		} else if ( roughness >= cubeUV_r6 ) {

			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;

		} else {

			mip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25
		}

		return mip;

	}

	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {

		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );

		float mipF = fract( mip );

		float mipInt = floor( mip );

		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );

		if ( mipF == 0.0 ) {

			return vec4( color0, 1.0 );

		} else {

			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );

			return vec4( mix( color0, color1, mipF ), 1.0 );

		}

	}

#endif
`,Fs=`

vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT

	vec3 transformedTangent = objectTangent;

#endif

#ifdef USE_BATCHING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = bm * transformedTangent;

	#endif

#endif

#ifdef USE_INSTANCING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = im * transformedTangent;

	#endif

#endif

transformedNormal = normalMatrix * transformedNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif

#ifdef USE_TANGENT

	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;

	#ifdef FLIP_SIDED

		transformedTangent = - transformedTangent;

	#endif

#endif
`,Os=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`,Bs=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );

#endif
`,Gs=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );

	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)

		emissiveColor = sRGBTransferEOTF( emissiveColor );

	#endif

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`,Vs=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`,Hs=`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`,zs=`

vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}

vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}

vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

`,ks=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vec3 cameraToFrag;

		if ( isOrthographic ) {

			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToFrag = normalize( vWorldPosition - cameraPosition );

		}

		// Transforming Normal Vectors with the Inverse Transformation
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vec3 reflectVec = reflect( cameraToFrag, worldNormal );

		#else

			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );

		#endif

	#else

		vec3 reflectVec = vReflect;

	#endif

	#ifdef ENVMAP_TYPE_CUBE

		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );

		#ifdef ENVMAP_BLENDING_MULTIPLY

			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

		#elif defined( ENVMAP_BLENDING_MIX )

			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );

		#elif defined( ENVMAP_BLENDING_ADD )

			outgoingLight += envColor.xyz * specularStrength * reflectivity;

		#endif

	#endif

#endif
`,Ws=`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif

#endif
`,Xs=`
#ifdef USE_ENVMAP

	uniform float reflectivity;

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif

#endif
`,Ys=`
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;

	#else

		varying vec3 vReflect;
		uniform float refractionRatio;

	#endif

#endif
`,qs=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vWorldPosition = worldPosition.xyz;

	#else

		vec3 cameraToVertex;

		if ( isOrthographic ) {

			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

		}

		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vReflect = reflect( cameraToVertex, worldNormal );

		#else

			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );

		#endif

	#endif

#endif
`,Ks=`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`,Zs=`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`,$s=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`,js=`
#ifdef USE_FOG

	uniform vec3 fogColor;
	varying float vFogDepth;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;

	#endif

#endif
`,Js=`

#ifdef USE_GRADIENTMAP

	uniform sampler2D gradientMap;

#endif

vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {

	// dotNL will be from -1.0 to 1.0
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );

	#ifdef USE_GRADIENTMAP

		return vec3( texture2D( gradientMap, coord ).r );

	#else

		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );

	#endif

}
`,Qs=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`,el=`
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`,tl=`
varying vec3 vViewPosition;

struct LambertMaterial {

	vec3 diffuseColor;
	float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
`,il=`
uniform bool receiveShadow;
uniform vec3 ambientLightColor;

#if defined( USE_LIGHT_PROBES )

	uniform vec3 lightProbe[ 9 ];

#endif

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {

	// normal is assumed to have unit length

	float x = normal.x, y = normal.y, z = normal.z;

	// band 0
	vec3 result = shCoefficients[ 0 ] * 0.886227;

	// band 1
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;

	// band 2
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );

	return result;

}

vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {

	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );

	return irradiance;

}

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

	vec3 irradiance = ambientLightColor;

	return irradiance;

}

float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

	// based upon Frostbite 3 Moving to Physically-based Rendering
	// page 32, equation 26: E[window1]
	// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

	if ( cutoffDistance > 0.0 ) {

		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

	}

	return distanceFalloff;

}

float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

	return smoothstep( coneCosine, penumbraCosine, angleCosine );

}

#if NUM_DIR_LIGHTS > 0

	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {

		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;

	}

#endif


#if NUM_POINT_LIGHTS > 0

	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};

	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = pointLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float lightDistance = length( lVector );

		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );

	}

#endif


#if NUM_SPOT_LIGHTS > 0

	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};

	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = spotLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float angleCos = dot( light.direction, spotLight.direction );

		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );

		if ( spotAttenuation > 0.0 ) {

			float lightDistance = length( lVector );

			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );

		} else {

			light.color = vec3( 0.0 );
			light.visible = false;

		}

	}

#endif


#if NUM_RECT_AREA_LIGHTS > 0

	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};

	// Pre-computed values of LinearTransformedCosine approximation of BRDF
	// BRDF approximation Texture is 64x64
	uniform sampler2D ltc_1; // RGBA Float
	uniform sampler2D ltc_2; // RGBA Float

	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};

	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {

		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

		return irradiance;

	}

#endif
`,nl=`
#ifdef USE_ENVMAP

	vec3 getIBLIrradiance( const in vec3 normal ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );

			return PI * envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 reflectVec = reflect( - viewDir, normal );

			// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );

			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );

			return envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	#ifdef USE_ANISOTROPY

		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {

			#ifdef ENVMAP_TYPE_CUBE_UV

			  // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );

				return getIBLRadiance( viewDir, bentNormal, roughness );

			#else

				return vec3( 0.0 );

			#endif

		}

	#endif

#endif
`,al=`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`,rl=`
varying vec3 vViewPosition;

struct ToonMaterial {

	vec3 diffuseColor;

};

void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
`,ol=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`,sl=`
varying vec3 vViewPosition;

struct BlinnPhongMaterial {

	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;

};

void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
`,ll=`
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;

vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

material.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );

#ifdef IOR

	material.ior = ior;

	#ifdef USE_SPECULAR

		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;

		#ifdef USE_SPECULAR_COLORMAP

			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;

		#endif

		#ifdef USE_SPECULAR_INTENSITYMAP

			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;

		#endif

		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );

	#else

		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;

	#endif

	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );

#else

	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;

#endif

#ifdef USE_CLEARCOAT

	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;

	#ifdef USE_CLEARCOATMAP

		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;

	#endif

	#ifdef USE_CLEARCOAT_ROUGHNESSMAP

		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;

	#endif

	material.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model
	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );

#endif

#ifdef USE_DISPERSION

	material.dispersion = dispersion;

#endif

#ifdef USE_IRIDESCENCE

	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;

	#ifdef USE_IRIDESCENCEMAP

		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;

	#endif

	#ifdef USE_IRIDESCENCE_THICKNESSMAP

		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;

	#else

		material.iridescenceThickness = iridescenceThicknessMaximum;

	#endif

#endif

#ifdef USE_SHEEN

	material.sheenColor = sheenColor;

	#ifdef USE_SHEEN_COLORMAP

		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;

	#endif

	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );

	#ifdef USE_SHEEN_ROUGHNESSMAP

		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;

	#endif

#endif

#ifdef USE_ANISOTROPY

	#ifdef USE_ANISOTROPYMAP

		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;

	#else

		vec2 anisotropyV = anisotropyVector;

	#endif

	material.anisotropy = length( anisotropyV );

	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}

	// Roughness along the anisotropy bitangent is the material roughness, while the tangent roughness increases with anisotropy.
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );

	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;

#endif
`,cl=`

uniform sampler2D dfgLUT;

struct PhysicalMaterial {

	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;

	float roughness;
	float metalness;
	float specularF90;
	float dispersion;

	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif

	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif

	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif

	#ifdef IOR
		float ior;
	#endif

	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif

	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif

};

// temporary
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );

vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );

    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {

	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );

	return 0.5 / max( gv + gl, EPSILON );

}

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney’s reparameterization
float D_GGX( const in float alpha, const in float dotNH ) {

	float a2 = pow2( alpha );

	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1

	return RECIPROCAL_PI * a2 / pow2( denom );

}

// https://google.github.io/filament/Filament.md.html#materialsystem/anisotropicmodel/anisotropicspecularbrdf
#ifdef USE_ANISOTROPY

	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {

		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );

		return v;

	}

	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {

		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;

		return RECIPROCAL_PI * a2 * pow2 ( w2 );

	}

#endif

#ifdef USE_CLEARCOAT

	// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {

		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;

		float alpha = pow2( roughness ); // UE4's roughness

		vec3 halfDir = normalize( lightDir + viewDir );

		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );

		vec3 F = F_Schlick( f0, f90, dotVH );

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

		return F * ( V * D );

	}

#endif

vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {

	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;

	float alpha = pow2( roughness ); // UE4's roughness

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( f0, f90, dotVH );

	#ifdef USE_IRIDESCENCE

		F = mix( F, material.iridescenceFresnel, material.iridescence );

	#endif

	#ifdef USE_ANISOTROPY

		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );

		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );

		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );

	#else

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

	#endif

	return F * ( V * D );

}

// Rect Area Light

// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt
// code: https://github.com/selfshadow/ltc_code/

vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	float dotNV = saturate( dot( N, V ) );

	// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );

	uv = uv * LUT_SCALE + LUT_BIAS;

	return uv;

}

float LTC_ClippedSphereFormFactor( const in vec3 f ) {

	// Real-Time Area Lighting: a Journey from Research to Production (p.102)
	// An approximation of the form factor of a horizon-clipped rectangle.

	float l = length( f );

	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );

}

vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {

	float x = dot( v1, v2 );

	float y = abs( x );

	// rational polynomial approximation to theta / sin( theta ) / 2PI
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;

	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;

	return cross( v1, v2 ) * theta_sintheta;

}

vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {

	// bail if point is on back side of plane of light
	// assumes ccw winding order of light vertices
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );

	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );

	// construct orthonormal basis around N
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system

	// compute transform
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );

	// transform rect
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );

	// project rect onto sphere
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );

	// calculate vector form factor
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );

	// adjust for horizon clipping
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );

/*
	// alternate method of adjusting for horizon clipping (see reference)
	// refactoring required
	float len = length( vectorFormFactor );
	float z = vectorFormFactor.z / len;

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	// tabulated horizon-clipped sphere, apparently...
	vec2 uv = vec2( z * 0.5 + 0.5, len );
	uv = uv * LUT_SCALE + LUT_BIAS;

	float scale = texture2D( ltc_2, uv ).w;

	float result = len * scale;
*/

	return vec3( result );

}

// End Rect Area Light

#if defined( USE_SHEEN )

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float D_Charlie( float roughness, float dotNH ) {

	float alpha = pow2( roughness );

	// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16

	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );

}

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float V_Neubelt( float dotNV, float dotNL ) {

	// Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );

}

vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );

	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );

	return sheenColor * ( D * V );

}

#endif

// This is a curve-fit approximation to the "Charlie sheen" BRDF integrated over the hemisphere from
// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF".
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );

	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;

	float DG = exp( a * dotNV + b );

	return saturate( DG );

}

vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;

	return specularColor * fab.x + specularF90 * fab.y;

}

// Fdez-Agüera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif

	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;

	#ifdef USE_IRIDESCENCE

		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );

	#else

		vec3 Fr = specularColor;

	#endif

	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;

	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;

	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21
	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );

	singleScatter += FssEss;
	multiScatter += Fms * Ems;

}

// GGX BRDF with multi-scattering energy compensation for direct lighting
// Based on "Practical Multiple Scattering Compensation for Microfacet Models"
// https://blog.selfshadow.com/publications/turquin/ms_comp_final.pdf
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {

	// Single-scattering BRDF (standard GGX)
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );

	// Multi-scattering compensation
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );

	// Precomputed DFG values for view and light directions
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;

	// Single-scattering energy for view and light
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;

	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;

	// Energy lost to multiple scattering
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;

	// Average Fresnel reflectance
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619; // 1/21

	// Multiple scattering contribution
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );

	// Energy compensation factor
	float compensationFactor = Ems_V * Ems_L;

	vec3 multiScatter = Fms * compensationFactor;

	return singleScatter + multiScatter;

}

#if NUM_RECT_AREA_LIGHTS > 0

	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;

		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, roughness );

		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );

		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		// LTC Fresnel Approximation by Stephen Hill
		// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

		#ifdef USE_CLEARCOAT

			vec3 Ncc = geometryClearcoatNormal;

			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );

			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );

			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);

			// LTC Fresnel Approximation for clearcoat
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;

			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );

		#endif

	}

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );

	vec3 irradiance = dotNL * directLight.color;

	#ifdef USE_CLEARCOAT

		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );

		vec3 ccIrradiance = dotNLcc * directLight.color;

		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );

	#endif

	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif

	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );

	#ifdef USE_SHEEN

		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );

		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;

		diffuse *= sheenEnergyComp;

	#endif

	reflectedLight.indirectDiffuse += diffuse;

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

	#ifdef USE_CLEARCOAT

		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;

 	#endif

	// Both indirect specular and indirect diffuse light accumulate here
	// Compute multiscattering separately for dielectric and metallic, then mix

	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );

	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );

	#ifdef USE_IRIDESCENCE

		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );

	#else

		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );

	#endif

	// Mix based on metalness
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );

	// Diffuse energy conservation uses dielectric path
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );

	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;

	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;

	#ifdef USE_SHEEN

		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );

		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;

		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;

	#endif

	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;

}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`,fl=`
/**
 * This is a template that can be used to light a material, it uses pluggable
 * RenderEquations (RE)for specific lighting scenarios.
 *
 * Instructions for use:
 * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined
 * - Create a material parameter that is to be passed as the third parameter to your lighting functions.
 *
 * TODO:
 * - Add area light support.
 * - Add sphere light support.
 * - Add diffuse light probe (irradiance cubemap) support.
 */

vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal = vec3( 0.0 );

#ifdef USE_CLEARCOAT

	geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometryViewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );

		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );

		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

	}

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometryPosition, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if defined( USE_LIGHT_PROBES )

		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,dl=`
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )

		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )

			iblIrradiance += getIBLIrradiance( geometryNormal );

		#endif

	#endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	#ifdef USE_ANISOTROPY

		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );

	#else

		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );

	#endif

	#ifdef USE_CLEARCOAT

		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );

	#endif

#endif
`,ul=`
#if defined( RE_IndirectDiffuse )

	#if defined( LAMBERT ) || defined( PHONG )

		irradiance += iblIrradiance;

	#endif

	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif
`,pl=`
#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`,hl=`
#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`,ml=`
#ifdef USE_LOGARITHMIC_DEPTH_BUFFER

	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`,_l=`
#ifdef USE_LOGARITHMIC_DEPTH_BUFFER

	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );

#endif
`,gl=`
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vMapUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)

		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );

	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`,vl=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`,xl=`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	#if defined( USE_POINTS_UV )

		vec2 uv = vUv;

	#else

		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

	#endif

#endif

#ifdef USE_MAP

	diffuseColor *= texture2D( map, uv );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`,Sl=`
#if defined( USE_POINTS_UV )

	varying vec2 vUv;

#else

	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

		uniform mat3 uvTransform;

	#endif

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`,Ml=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`,El=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`,Tl=`
#ifdef USE_INSTANCING_MORPH

	float morphTargetInfluences[ MORPHTARGETS_COUNT ];

	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;

	}
#endif
`,Al=`
#if defined( USE_MORPHCOLORS )

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	vColor *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		#if defined( USE_COLOR_ALPHA )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];

		#elif defined( USE_COLOR )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];

		#endif

	}

#endif
`,bl=`
#ifdef USE_MORPHNORMALS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	objectNormal *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];

	}

#endif
`,Rl=`
#ifdef USE_MORPHTARGETS

	#ifndef USE_INSTANCING_MORPH

		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];

	#endif

	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;

	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {

		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;

		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );

	}

#endif
`,Cl=`
#ifdef USE_MORPHTARGETS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	transformed *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];

	}

#endif
`,wl=`
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

#ifdef FLAT_SHADED

	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal *= faceDirection;

	#endif

#endif

#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )

	#ifdef USE_TANGENT

		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;

	#endif

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	#ifdef USE_TANGENT

		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 nonPerturbedNormal = normal;

`,Pl=`

#ifdef USE_NORMALMAP_OBJECTSPACE

	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

	#ifdef FLIP_SIDED

		normal = - normal;

	#endif

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	normal = normalize( normalMatrix * normal );

#elif defined( USE_NORMALMAP_TANGENTSPACE )

	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;

	normal = normalize( tbn * mapN );

#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`,yl=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`,Ll=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`,Dl=`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`,Ul=`
#ifdef USE_NORMALMAP

	uniform sampler2D normalMap;
	uniform vec2 normalScale;

#endif

#ifdef USE_NORMALMAP_OBJECTSPACE

	uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )

	// Normal Mapping Without Precomputed Tangents
	// http://www.thetenthplanet.de/archives/1180

	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );

		vec3 N = surf_norm; // normalized

		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );

		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;

		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

		return mat3( T * scale, B * scale, N );

	}

#endif
`,Il=`
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = nonPerturbedNormal;

#endif
`,Nl=`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	clearcoatNormal = normalize( tbn2 * clearcoatMapN );

#endif
`,Fl=`

#ifdef USE_CLEARCOATMAP

	uniform sampler2D clearcoatMap;

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;

#endif

#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform sampler2D clearcoatRoughnessMap;

#endif
`,Ol=`

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`,Bl=`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`,Gl=`
vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}

vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}

const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)
const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;

const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );

const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );

vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}

vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	// the 0.9999 tweak is unimportant, very tiny empirical improvement
	// return vec3( vuf * Inv255, gf * PackUpscale, bf * 0.9999 );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}

vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}

float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}

float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}

float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}

vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}

vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}

// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( viewZ + near ) / ( near - far );
}

float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {

	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;

	#else

		return depth * ( near - far ) - near;

	#endif
}

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}

float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER

		return ( near * far ) / ( ( near - far ) * depth - near );

	#else

		return ( near * far ) / ( ( far - near ) * depth - far );

	#endif
}
`,Vl=`
#ifdef PREMULTIPLIED_ALPHA

	// Get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`,Hl=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_BATCHING

	mvPosition = batchingMatrix * mvPosition;

#endif

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`,zl=`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`,kl=`
#ifdef DITHERING

	// based on https://www.shadertoy.com/view/MslGR8
	vec3 dithering( vec3 color ) {
		//Calculate grid position
		float grid_position = rand( gl_FragCoord.xy );

		//Shift the individual colors differently, thus making it even harder to see the dithering pattern
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );

		//modify shift according to grid position.
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );

		//shift the color by dither_shift
		return color + dither_shift_RGB;
	}

#endif
`,Wl=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`,Xl=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`,Yl=`
#if NUM_SPOT_LIGHT_COORDS > 0

	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#if NUM_SPOT_LIGHT_MAPS > 0

	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		#if defined( SHADOWMAP_TYPE_PCF )

			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];

		#else

			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];

		#endif

		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		#if defined( SHADOWMAP_TYPE_PCF )

			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];

		#else

			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];

		#endif

		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		#if defined( SHADOWMAP_TYPE_PCF )

			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];

		#elif defined( SHADOWMAP_TYPE_BASIC )

			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];

		#endif

		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	#if defined( SHADOWMAP_TYPE_PCF )

		// Interleaved Gradient Noise for randomizing sampling patterns
		float interleavedGradientNoise( vec2 position ) {

			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );

		}

		// Vogel disk sampling for uniform circular distribution
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {

			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;

		}

	#endif

	#if defined( SHADOWMAP_TYPE_PCF )

		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

			float shadow = 1.0;

			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;

			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

			if ( frustumTest ) {

				// Hardware PCF with LinearFilter gives us 4-tap filtering per sample
				// 5 samples using Vogel disk + IGN = effectively 20 filtered taps with better distribution
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;

				// Use IGN to rotate sampling pattern per pixel
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;

				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;

			}

			return mix( 1.0, shadow, shadowIntensity );

		}

	#elif defined( SHADOWMAP_TYPE_VSM )

		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

			float shadow = 1.0;

			shadowCoord.xyz /= shadowCoord.w;

			#ifdef USE_REVERSED_DEPTH_BUFFER

				shadowCoord.z -= shadowBias;

			#else

				shadowCoord.z += shadowBias;

			#endif

			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

			if ( frustumTest ) {

				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;

				float mean = distribution.x;
				float variance = distribution.y * distribution.y;

				#ifdef USE_REVERSED_DEPTH_BUFFER

					float hard_shadow = step( mean, shadowCoord.z );

				#else

					float hard_shadow = step( shadowCoord.z, mean );

				#endif
				
				// Early return if fully lit
				if ( hard_shadow == 1.0 ) {

					shadow = 1.0;

				} else {

					// Variance must be non-zero to avoid division by zero
					variance = max( variance, 0.0000001 );

					// Distance from mean
					float d = shadowCoord.z - mean;

					// Chebyshev's inequality for upper bound on probability
					float p_max = variance / ( variance + d * d );

					// Reduce light bleeding by remapping [amount, 1] to [0, 1]
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );

					shadow = max( hard_shadow, p_max );

				}

			}

			return mix( 1.0, shadow, shadowIntensity );

		}

	#else // SHADOWMAP_TYPE_BASIC

		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

			float shadow = 1.0;

			shadowCoord.xyz /= shadowCoord.w;

			#ifdef USE_REVERSED_DEPTH_BUFFER

				shadowCoord.z -= shadowBias;

			#else

				shadowCoord.z += shadowBias;

			#endif

			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

			if ( frustumTest ) {

				float depth = texture2D( shadowMap, shadowCoord.xy ).r;

				#ifdef USE_REVERSED_DEPTH_BUFFER

					shadow = step( depth, shadowCoord.z );

				#else

					shadow = step( shadowCoord.z, depth );

				#endif

			}

			return mix( 1.0, shadow, shadowIntensity );

		}

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

	#if defined( SHADOWMAP_TYPE_PCF )

	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		float shadow = 1.0;

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;

		// Direction from light to fragment
		vec3 bd3D = normalize( lightToPosition );

		// For cube shadow maps, depth is stored as distance along each face's view axis, not radial distance
		// The view-space depth is the maximum component of the direction vector (which face is sampled)
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );

		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {

			// viewZ to perspective depth

			#ifdef USE_REVERSED_DEPTH_BUFFER

				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;

			#else

				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;

			#endif

			// Hardware PCF with LinearFilter gives us 4-tap filtering per sample
			// Use Vogel disk + IGN sampling for better quality
			float texelSize = shadowRadius / shadowMapSize.x;

			// Build a tangent-space coordinate system for applying offsets
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );

			// Use IGN to rotate sampling pattern per pixel
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;

			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );

			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;

		}

		return mix( 1.0, shadow, shadowIntensity );

	}

	#elif defined( SHADOWMAP_TYPE_BASIC )

	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		float shadow = 1.0;

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;

		// For cube shadow maps, depth is stored as distance along each face's view axis, not radial distance
		// The view-space depth is the maximum component of the direction vector (which face is sampled)
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );

		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {

			// viewZ to perspective depth

			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;

			// Direction from light to fragment
			vec3 bd3D = normalize( lightToPosition );

			float depth = textureCube( shadowMap, bd3D ).r;

			#ifdef USE_REVERSED_DEPTH_BUFFER

				depth = 1.0 - depth;

			#endif

			shadow = step( dp, depth );

		}

		return mix( 1.0, shadow, shadowIntensity );

	}

	#endif

	#endif

#endif
`,ql=`

#if NUM_SPOT_LIGHT_COORDS > 0

	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): uniforms for area light shadows

	#endif
	*/

#endif
`,Kl=`

#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )

	// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;

#endif

#if defined( USE_SHADOWMAP )

	#if NUM_DIR_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update vAreaShadowCoord with area light info

	#endif
	*/

#endif

// spot lights can be evaluated without active shadow mapping (when SpotLight.map is used)

#if NUM_SPOT_LIGHT_COORDS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {

		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;

	}
	#pragma unroll_loop_end

#endif


`,Zl=`
float getShadowMask() {

	float shadow = 1.0;

	#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

	DirectionalLightShadow directionalLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

	SpotLightShadow spotLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )

	PointLightShadow pointLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update shadow for Area light

	#endif
	*/

	#endif

	return shadow;

}
`,$l=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`,jl=`
#ifdef USE_SKINNING

	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;

	uniform highp sampler2D boneTexture;

	mat4 getBoneMatrix( const in float i ) {

		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );

		return mat4( v1, v2, v3, v4 );

	}

#endif
`,Jl=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`,Ql=`
#ifdef USE_SKINNING

	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;

	#ifdef USE_TANGENT

		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

	#endif

#endif
`,ec=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`,tc=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`,ic=`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`,nc=`
#ifndef saturate
// <common> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

	return saturate( toneMappingExposure * color );

}

// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
vec3 ReinhardToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
vec3 CineonToneMapping( vec3 color ) {

	// filmic operator by Jim Hejl and Richard Burgess-Dawson
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
vec3 RRTAndODTFit( vec3 v ) {

	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;

}

// this implementation of ACES is modified to accommodate a brighter viewing environment.
// the scale factor of 1/0.6 is subjective. see discussion in #19621.

vec3 ACESFilmicToneMapping( vec3 color ) {

	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);

	// ODT_SAT => XYZ => D60_2_D65 => sRGB
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);

	color *= toneMappingExposure / 0.6;

	color = ACESInputMat * color;

	// Apply RRT and ODT
	color = RRTAndODTFit( color );

	color = ACESOutputMat * color;

	// Clamp to [0, 1]
	return saturate( color );

}

// Matrices for rec 2020 <> rec 709 color space conversion
// matrix provided in row-major order so it has been transposed
// https://www.itu.int/pub/R-REP-BT.2407-2017
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);

const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);

// https://iolite-engine.com/blog_posts/minimal_agx_implementation
// Mean error^2: 3.6705141e-06
vec3 agxDefaultContrastApprox( vec3 x ) {

	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;

	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;

}

// AgX Tone Mapping implementation based on Filament, which in turn is based
// on Blender's implementation using rec 2020 primaries
// https://github.com/google/filament/pull/7236
// Inputs and outputs are encoded as Linear-sRGB.

vec3 AgXToneMapping( vec3 color ) {

	// AgX constants
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);

	// explicit AgXOutsetMatrix generated from Filaments AgXOutsetMatrixInv
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);

	// LOG2_MIN      = -10.0
	// LOG2_MAX      =  +6.5
	// MIDDLE_GRAY   =  0.18
	const float AgxMinEv = - 12.47393;  // log2( pow( 2, LOG2_MIN ) * MIDDLE_GRAY )
	const float AgxMaxEv = 4.026069;    // log2( pow( 2, LOG2_MAX ) * MIDDLE_GRAY )

	color *= toneMappingExposure;

	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;

	color = AgXInsetMatrix * color;

	// Log2 encoding
	color = max( color, 1e-10 ); // avoid 0 or negative numbers for log2
	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );

	color = clamp( color, 0.0, 1.0 );

	// Apply sigmoid
	color = agxDefaultContrastApprox( color );

	// Apply AgX look
	// v = agxLook(v, look);

	color = AgXOutsetMatrix * color;

	// Linearize
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );

	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;

	// Gamut mapping. Simple clamp for now.
	color = clamp( color, 0.0, 1.0 );

	return color;

}

// https://modelviewer.dev/examples/tone-mapping

vec3 NeutralToneMapping( vec3 color ) {

	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;

	color *= toneMappingExposure;

	float x = min( color.r, min( color.g, color.b ) );

	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;

	color -= offset;

	float peak = max( color.r, max( color.g, color.b ) );

	if ( peak < StartCompression ) return color;

	float d = 1. - StartCompression;

	float newPeak = 1. - d * d / ( peak + d - StartCompression );

	color *= newPeak / peak;

	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );

	return mix( color, vec3( newPeak ), g );

}

vec3 CustomToneMapping( vec3 color ) { return color; }
`,ac=`
#ifdef USE_TRANSMISSION

	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;

	#endif

	#ifdef USE_THICKNESSMAP

		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;

	#endif

	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );

	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );

	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );

	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );

#endif
`,rc=`
#ifdef USE_TRANSMISSION

	// Transmission code is based on glTF-Sampler-Viewer
	// https://github.com/KhronosGroup/glTF-Sample-Viewer

	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		uniform sampler2D transmissionMap;

	#endif

	#ifdef USE_THICKNESSMAP

		uniform sampler2D thicknessMap;

	#endif

	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;

	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;

	varying vec3 vWorldPosition;

	// Mipped Bicubic Texture Filtering by N8
	// https://www.shadertoy.com/view/Dl2SDW

	float w0( float a ) {

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );

	}

	float w1( float a ) {

		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );

	}

	float w2( float a ){

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );

	}

	float w3( float a ) {

		return ( 1.0 / 6.0 ) * ( a * a * a );

	}

	// g0 and g1 are the two amplitude functions
	float g0( float a ) {

		return w0( a ) + w1( a );

	}

	float g1( float a ) {

		return w2( a ) + w3( a );

	}

	// h0 and h1 are the two offset functions
	float h0( float a ) {

		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );

	}

	float h1( float a ) {

		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );

	}

	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {

		uv = uv * texelSize.zw + 0.5;

		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );

		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );

		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;

		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );

	}

	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {

		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );

	}

	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {

		// Direction of refracted light.
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );

		// Compute rotation-independent scaling of the model matrix.
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );

		// The thickness is specified in local space.
		return normalize( refractionVector ) * thickness * modelScale;

	}

	float applyIorToRoughness( const in float roughness, const in float ior ) {

		// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
		// an IOR of 1.5 results in the default amount of microfacet refraction.
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );

	}

	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {

		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );

	}

	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {

		if ( isinf( attenuationDistance ) ) {

			// Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
			return vec3( 1.0 );

		} else {

			// Compute light attenuation using Beer's law.
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
			return transmittance;

		}

	}

	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {

		vec4 transmittedLight;
		vec3 transmittance;

		#ifdef USE_DISPERSION

			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );

			for ( int i = 0; i < 3; i ++ ) {

				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;

				// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;

				// Sample framebuffer to get pixel the refracted ray hits.
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;

				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];

			}

			transmittedLight.a /= 3.0;

		#else

			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;

			// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;

			// Sample framebuffer to get pixel the refracted ray hits.
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );

		#endif

		vec3 attenuatedColor = transmittance * transmittedLight.rgb;

		// Get the specular component.
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );

		// As less light is transmitted, the opacity should be increased. This simple approximation does a decent job
		// of modulating a CSS background, and has no effect when the buffer is opaque, due to a solid object or clear color.
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;

		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );

	}
#endif
`,oc=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	varying vec2 vNormalMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_SPECULARMAP

	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`,sc=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;

#endif
#ifdef USE_DISPLACEMENTMAP

	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SPECULARMAP

	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`,lc=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	vUv = vec3( uv, 1 ).xy;

#endif
#ifdef USE_MAP

	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ALPHAMAP

	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_LIGHTMAP

	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_AOMAP

	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_BUMPMAP

	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_NORMALMAP

	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_EMISSIVEMAP

	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_METALNESSMAP

	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ROUGHNESSMAP

	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ANISOTROPYMAP

	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOATMAP

	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULARMAP

	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_THICKNESSMAP

	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;

#endif
`,cc=`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0

	vec4 worldPosition = vec4( transformed, 1.0 );

	#ifdef USE_BATCHING

		worldPosition = batchingMatrix * worldPosition;

	#endif

	#ifdef USE_INSTANCING

		worldPosition = instanceMatrix * worldPosition;

	#endif

	worldPosition = modelMatrix * worldPosition;

#endif
`,fc=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,dc=`
uniform sampler2D t2D;
uniform float backgroundIntensity;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures

		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,uc=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,pc=`

#ifdef ENVMAP_TYPE_CUBE

	uniform samplerCube envMap;

#elif defined( ENVMAP_TYPE_CUBE_UV )

	uniform sampler2D envMap;

#endif

uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	#ifdef ENVMAP_TYPE_CUBE

		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );

	#elif defined( ENVMAP_TYPE_CUBE_UV )

		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );

	#else

		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,hc=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,mc=`
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,_c=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vHighPrecisionZW = gl_Position.zw;

}
`,gc=`
#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	#include <logdepthbuf_fragment>

	// Higher precision equivalent of gl_FragCoord.z

	#ifdef USE_REVERSED_DEPTH_BUFFER

		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];

	#else

		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;

	#endif

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

	#elif DEPTH_PACKING == 3201

		// TODO Deprecate
		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#elif DEPTH_PACKING == 3202

		// TODO Deprecate
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );

	#elif DEPTH_PACKING == 3203

		// TODO Deprecate
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );

	#endif

}
`,vc=`
#define DISTANCE

varying vec3 vWorldPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>

	vWorldPosition = worldPosition.xyz;

}
`,xc=`
#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>

void main () {

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );

}
`,Sc=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,Mc=`
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 direction = normalize( vWorldDirection );

	vec2 sampleUV = equirectUv( direction );

	gl_FragColor = texture2D( tEquirect, sampleUV );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,Ec=`
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	vLineDistance = scale * lineDistance;

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,Tc=`
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	if ( mod( vLineDistance, totalSize ) > dashSize ) {

		discard;

	}

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`,Ac=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>

}
`,bc=`
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,Rc=`
#define LAMBERT

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Cc=`
#define LAMBERT

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,wc=`
#define MATCAP

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

	vViewPosition = - mvPosition.xyz;

}
`,Pc=`
#define MATCAP

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

	#ifdef USE_MATCAP

		vec4 matcapColor = texture2D( matcap, uv );

	#else

		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing

	#endif

	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,yc=`
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	vViewPosition = - mvPosition.xyz;

#endif

}
`,Lc=`
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );

	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );

	#ifdef OPAQUE

		gl_FragColor.a = 1.0;

	#endif

}
`,Dc=`
#define PHONG

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Uc=`
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,Ic=`
#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}
`,Nc=`
#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
	uniform float ior;
#endif

#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;

	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif

	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif

#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif

#ifdef USE_DISPERSION
	uniform float dispersion;
#endif

#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;

	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif

	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif

#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;

	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif

	#ifdef USE_CLEARCOAT

		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );

		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;

	#endif

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,Fc=`
#define TOON

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Oc=`
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,Bc=`
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_POINTS_UV

	varying vec2 vUv;
	uniform mat3 uvTransform;

#endif

void main() {

	#ifdef USE_POINTS_UV

		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	#endif

	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size;

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
`,Gc=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`,Vc=`
#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Hc=`
uniform vec3 color;
uniform float opacity;

#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	#include <logdepthbuf_fragment>

	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`,zc=`
uniform float rotation;
uniform vec2 center;

#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	vec4 mvPosition = modelViewMatrix[ 3 ];

	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );

	#ifndef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;

	#endif

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,kc=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`,De={alphahash_fragment:ds,alphahash_pars_fragment:us,alphamap_fragment:ps,alphamap_pars_fragment:hs,alphatest_fragment:ms,alphatest_pars_fragment:_s,aomap_fragment:gs,aomap_pars_fragment:vs,batching_pars_vertex:xs,batching_vertex:Ss,begin_vertex:Ms,beginnormal_vertex:Es,bsdfs:Ts,iridescence_fragment:As,bumpmap_pars_fragment:bs,clipping_planes_fragment:Rs,clipping_planes_pars_fragment:Cs,clipping_planes_pars_vertex:ws,clipping_planes_vertex:Ps,color_fragment:ys,color_pars_fragment:Ls,color_pars_vertex:Ds,color_vertex:Us,common:Is,cube_uv_reflection_fragment:Ns,defaultnormal_vertex:Fs,displacementmap_pars_vertex:Os,displacementmap_vertex:Bs,emissivemap_fragment:Gs,emissivemap_pars_fragment:Vs,colorspace_fragment:Hs,colorspace_pars_fragment:zs,envmap_fragment:ks,envmap_common_pars_fragment:Ws,envmap_pars_fragment:Xs,envmap_pars_vertex:Ys,envmap_physical_pars_fragment:nl,envmap_vertex:qs,fog_vertex:Ks,fog_pars_vertex:Zs,fog_fragment:$s,fog_pars_fragment:js,gradientmap_pars_fragment:Js,lightmap_pars_fragment:Qs,lights_lambert_fragment:el,lights_lambert_pars_fragment:tl,lights_pars_begin:il,lights_toon_fragment:al,lights_toon_pars_fragment:rl,lights_phong_fragment:ol,lights_phong_pars_fragment:sl,lights_physical_fragment:ll,lights_physical_pars_fragment:cl,lights_fragment_begin:fl,lights_fragment_maps:dl,lights_fragment_end:ul,logdepthbuf_fragment:pl,logdepthbuf_pars_fragment:hl,logdepthbuf_pars_vertex:ml,logdepthbuf_vertex:_l,map_fragment:gl,map_pars_fragment:vl,map_particle_fragment:xl,map_particle_pars_fragment:Sl,metalnessmap_fragment:Ml,metalnessmap_pars_fragment:El,morphinstance_vertex:Tl,morphcolor_vertex:Al,morphnormal_vertex:bl,morphtarget_pars_vertex:Rl,morphtarget_vertex:Cl,normal_fragment_begin:wl,normal_fragment_maps:Pl,normal_pars_fragment:yl,normal_pars_vertex:Ll,normal_vertex:Dl,normalmap_pars_fragment:Ul,clearcoat_normal_fragment_begin:Il,clearcoat_normal_fragment_maps:Nl,clearcoat_pars_fragment:Fl,iridescence_pars_fragment:Ol,opaque_fragment:Bl,packing:Gl,premultiplied_alpha_fragment:Vl,project_vertex:Hl,dithering_fragment:zl,dithering_pars_fragment:kl,roughnessmap_fragment:Wl,roughnessmap_pars_fragment:Xl,shadowmap_pars_fragment:Yl,shadowmap_pars_vertex:ql,shadowmap_vertex:Kl,shadowmask_pars_fragment:Zl,skinbase_vertex:$l,skinning_pars_vertex:jl,skinning_vertex:Jl,skinnormal_vertex:Ql,specularmap_fragment:ec,specularmap_pars_fragment:tc,tonemapping_fragment:ic,tonemapping_pars_fragment:nc,transmission_fragment:ac,transmission_pars_fragment:rc,uv_pars_fragment:oc,uv_pars_vertex:sc,uv_vertex:lc,worldpos_vertex:cc,background_vert:fc,background_frag:dc,backgroundCube_vert:uc,backgroundCube_frag:pc,cube_vert:hc,cube_frag:mc,depth_vert:_c,depth_frag:gc,distance_vert:vc,distance_frag:xc,equirect_vert:Sc,equirect_frag:Mc,linedashed_vert:Ec,linedashed_frag:Tc,meshbasic_vert:Ac,meshbasic_frag:bc,meshlambert_vert:Rc,meshlambert_frag:Cc,meshmatcap_vert:wc,meshmatcap_frag:Pc,meshnormal_vert:yc,meshnormal_frag:Lc,meshphong_vert:Dc,meshphong_frag:Uc,meshphysical_vert:Ic,meshphysical_frag:Nc,meshtoon_vert:Fc,meshtoon_frag:Oc,points_vert:Bc,points_frag:Gc,shadow_vert:Vc,shadow_frag:Hc,sprite_vert:zc,sprite_frag:kc},re={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},Ct={basic:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Je(0)},envMapIntensity:{value:1}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:mt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:mt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:mt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new Je(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:mt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:mt([re.points,re.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:mt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:mt([re.common,re.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:mt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:mt([re.sprite,re.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distance:{uniforms:mt([re.common,re.displacementmap,{referencePosition:{value:new ue},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distance_vert,fragmentShader:De.distance_frag},shadow:{uniforms:mt([re.lights,re.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};Ct.physical={uniforms:mt([Ct.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};const zi={r:0,b:0,g:0},Jt=new Ea,Wc=new oi;function Xc(t,e,i,n,a,r){const o=new Je(0);let d=a===!0?0:1,m,_,T=null,b=0,p=null;function v(x){let A=x.isScene===!0?x.background:null;if(A&&A.isTexture){const M=x.backgroundBlurriness>0;A=e.get(A,M)}return A}function S(x){let A=!1;const M=v(x);M===null?c(o,d):M&&M.isColor&&(c(M,1),A=!0);const D=t.xr.getEnvironmentBlendMode();D==="additive"?i.buffers.color.setClear(0,0,0,1,r):D==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(t.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function L(x,A){const M=v(A);M&&(M.isCubeTexture||M.mapping===Qi)?(_===void 0&&(_=new kt(new yi(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:xi(Ct.backgroundCube.uniforms),vertexShader:Ct.backgroundCube.vertexShader,fragmentShader:Ct.backgroundCube.fragmentShader,side:gt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(D,w,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(_)),Jt.copy(A.backgroundRotation),Jt.x*=-1,Jt.y*=-1,Jt.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Jt.y*=-1,Jt.z*=-1),_.material.uniforms.envMap.value=M,_.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,_.material.uniforms.backgroundRotation.value.setFromMatrix4(Wc.makeRotationFromEuler(Jt)),_.material.toneMapped=tt.getTransfer(M.colorSpace)!==Ze,(T!==M||b!==M.version||p!==t.toneMapping)&&(_.material.needsUpdate=!0,T=M,b=M.version,p=t.toneMapping),_.layers.enableAll(),x.unshift(_,_.geometry,_.material,0,0,null)):M&&M.isTexture&&(m===void 0&&(m=new kt(new nn(2,2),new Lt({name:"BackgroundMaterial",uniforms:xi(Ct.background.uniforms),vertexShader:Ct.background.vertexShader,fragmentShader:Ct.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(m)),m.material.uniforms.t2D.value=M,m.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,m.material.toneMapped=tt.getTransfer(M.colorSpace)!==Ze,M.matrixAutoUpdate===!0&&M.updateMatrix(),m.material.uniforms.uvTransform.value.copy(M.matrix),(T!==M||b!==M.version||p!==t.toneMapping)&&(m.material.needsUpdate=!0,T=M,b=M.version,p=t.toneMapping),m.layers.enableAll(),x.unshift(m,m.geometry,m.material,0,0,null))}function c(x,A){x.getRGB(zi,Br(t)),i.buffers.color.setClear(zi.r,zi.g,zi.b,A,r)}function l(){_!==void 0&&(_.geometry.dispose(),_.material.dispose(),_=void 0),m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,A=1){o.set(x),d=A,c(o,d)},getClearAlpha:function(){return d},setClearAlpha:function(x){d=x,c(o,d)},render:S,addToRenderList:L,dispose:l}}function Yc(t,e){const i=t.getParameter(t.MAX_VERTEX_ATTRIBS),n={},a=p(null);let r=a,o=!1;function d(y,V,W,z,X){let B=!1;const F=b(y,z,W,V);r!==F&&(r=F,_(r.object)),B=v(y,z,W,X),B&&S(y,z,W,X),X!==null&&e.update(X,t.ELEMENT_ARRAY_BUFFER),(B||o)&&(o=!1,M(y,V,W,z),X!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function m(){return t.createVertexArray()}function _(y){return t.bindVertexArray(y)}function T(y){return t.deleteVertexArray(y)}function b(y,V,W,z){const X=z.wireframe===!0;let B=n[V.id];B===void 0&&(B={},n[V.id]=B);const F=y.isInstancedMesh===!0?y.id:0;let ee=B[F];ee===void 0&&(ee={},B[F]=ee);let j=ee[W.id];j===void 0&&(j={},ee[W.id]=j);let pe=j[X];return pe===void 0&&(pe=p(m()),j[X]=pe),pe}function p(y){const V=[],W=[],z=[];for(let X=0;X<i;X++)V[X]=0,W[X]=0,z[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:W,attributeDivisors:z,object:y,attributes:{},index:null}}function v(y,V,W,z){const X=r.attributes,B=V.attributes;let F=0;const ee=W.getAttributes();for(const j in ee)if(ee[j].location>=0){const Me=X[j];let ce=B[j];if(ce===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(ce=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(ce=y.instanceColor)),Me===void 0||Me.attribute!==ce||ce&&Me.data!==ce.data)return!0;F++}return r.attributesNum!==F||r.index!==z}function S(y,V,W,z){const X={},B=V.attributes;let F=0;const ee=W.getAttributes();for(const j in ee)if(ee[j].location>=0){let Me=B[j];Me===void 0&&(j==="instanceMatrix"&&y.instanceMatrix&&(Me=y.instanceMatrix),j==="instanceColor"&&y.instanceColor&&(Me=y.instanceColor));const ce={};ce.attribute=Me,Me&&Me.data&&(ce.data=Me.data),X[j]=ce,F++}r.attributes=X,r.attributesNum=F,r.index=z}function L(){const y=r.newAttributes;for(let V=0,W=y.length;V<W;V++)y[V]=0}function c(y){l(y,0)}function l(y,V){const W=r.newAttributes,z=r.enabledAttributes,X=r.attributeDivisors;W[y]=1,z[y]===0&&(t.enableVertexAttribArray(y),z[y]=1),X[y]!==V&&(t.vertexAttribDivisor(y,V),X[y]=V)}function x(){const y=r.newAttributes,V=r.enabledAttributes;for(let W=0,z=V.length;W<z;W++)V[W]!==y[W]&&(t.disableVertexAttribArray(W),V[W]=0)}function A(y,V,W,z,X,B,F){F===!0?t.vertexAttribIPointer(y,V,W,X,B):t.vertexAttribPointer(y,V,W,z,X,B)}function M(y,V,W,z){L();const X=z.attributes,B=W.getAttributes(),F=V.defaultAttributeValues;for(const ee in B){const j=B[ee];if(j.location>=0){let pe=X[ee];if(pe===void 0&&(ee==="instanceMatrix"&&y.instanceMatrix&&(pe=y.instanceMatrix),ee==="instanceColor"&&y.instanceColor&&(pe=y.instanceColor)),pe!==void 0){const Me=pe.normalized,ce=pe.itemSize,Le=e.get(pe);if(Le===void 0)continue;const Qe=Le.buffer,$e=Le.type,Y=Le.bytesPerElement,te=$e===t.INT||$e===t.UNSIGNED_INT||pe.gpuType===pa;if(pe.isInterleavedBufferAttribute){const ae=pe.data,ye=ae.stride,be=pe.offset;if(ae.isInstancedInterleavedBuffer){for(let Ce=0;Ce<j.locationSize;Ce++)l(j.location+Ce,ae.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ce=0;Ce<j.locationSize;Ce++)c(j.location+Ce);t.bindBuffer(t.ARRAY_BUFFER,Qe);for(let Ce=0;Ce<j.locationSize;Ce++)A(j.location+Ce,ce/j.locationSize,$e,Me,ye*Y,(be+ce/j.locationSize*Ce)*Y,te)}else{if(pe.isInstancedBufferAttribute){for(let ae=0;ae<j.locationSize;ae++)l(j.location+ae,pe.meshPerAttribute);y.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let ae=0;ae<j.locationSize;ae++)c(j.location+ae);t.bindBuffer(t.ARRAY_BUFFER,Qe);for(let ae=0;ae<j.locationSize;ae++)A(j.location+ae,ce/j.locationSize,$e,Me,ce*Y,ce/j.locationSize*ae*Y,te)}}else if(F!==void 0){const Me=F[ee];if(Me!==void 0)switch(Me.length){case 2:t.vertexAttrib2fv(j.location,Me);break;case 3:t.vertexAttrib3fv(j.location,Me);break;case 4:t.vertexAttrib4fv(j.location,Me);break;default:t.vertexAttrib1fv(j.location,Me)}}}}x()}function D(){g();for(const y in n){const V=n[y];for(const W in V){const z=V[W];for(const X in z){const B=z[X];for(const F in B)T(B[F].object),delete B[F];delete z[X]}}delete n[y]}}function w(y){if(n[y.id]===void 0)return;const V=n[y.id];for(const W in V){const z=V[W];for(const X in z){const B=z[X];for(const F in B)T(B[F].object),delete B[F];delete z[X]}}delete n[y.id]}function U(y){for(const V in n){const W=n[V];for(const z in W){const X=W[z];if(X[y.id]===void 0)continue;const B=X[y.id];for(const F in B)T(B[F].object),delete B[F];delete X[y.id]}}}function u(y){for(const V in n){const W=n[V],z=y.isInstancedMesh===!0?y.id:0,X=W[z];if(X!==void 0){for(const B in X){const F=X[B];for(const ee in F)T(F[ee].object),delete F[ee];delete X[B]}delete W[z],Object.keys(W).length===0&&delete n[V]}}}function g(){K(),o=!0,r!==a&&(r=a,_(r.object))}function K(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:d,reset:g,resetDefaultState:K,dispose:D,releaseStatesOfGeometry:w,releaseStatesOfObject:u,releaseStatesOfProgram:U,initAttributes:L,enableAttribute:c,disableUnusedAttributes:x}}function qc(t,e,i){let n;function a(_){n=_}function r(_,T){t.drawArrays(n,_,T),i.update(T,n,1)}function o(_,T,b){b!==0&&(t.drawArraysInstanced(n,_,T,b),i.update(T,n,b))}function d(_,T,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,_,0,T,0,b);let v=0;for(let S=0;S<b;S++)v+=T[S];i.update(v,n,1)}function m(_,T,b,p){if(b===0)return;const v=e.get("WEBGL_multi_draw");if(v===null)for(let S=0;S<_.length;S++)o(_[S],T[S],p[S]);else{v.multiDrawArraysInstancedWEBGL(n,_,0,T,0,p,0,b);let S=0;for(let L=0;L<b;L++)S+=T[L]*p[L];i.update(S,n,1)}}this.setMode=a,this.render=r,this.renderInstances=o,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function Kc(t,e,i,n){let a;function r(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function o(U){return!(U!==At&&n.convert(U)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(U){const u=U===Ht&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==xt&&n.convert(U)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==Bt&&!u)}function m(U){if(U==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let _=i.precision!==void 0?i.precision:"highp";const T=m(_);T!==_&&(Ge("WebGLRenderer:",_,"not supported, using",T,"instead."),_=T);const b=i.logarithmicDepthBuffer===!0,p=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),v=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),S=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),L=t.getParameter(t.MAX_TEXTURE_SIZE),c=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),l=t.getParameter(t.MAX_VERTEX_ATTRIBS),x=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),A=t.getParameter(t.MAX_VARYING_VECTORS),M=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),D=t.getParameter(t.MAX_SAMPLES),w=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:m,textureFormatReadable:o,textureTypeReadable:d,precision:_,logarithmicDepthBuffer:b,reversedDepthBuffer:p,maxTextures:v,maxVertexTextures:S,maxTextureSize:L,maxCubemapSize:c,maxAttributes:l,maxVertexUniforms:x,maxVaryings:A,maxFragmentUniforms:M,maxSamples:D,samples:w}}function Zc(t){const e=this;let i=null,n=0,a=!1,r=!1;const o=new ei,d=new Fe,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(b,p){const v=b.length!==0||p||n!==0||a;return a=p,n=b.length,v},this.beginShadows=function(){r=!0,T(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(b,p){i=T(b,p,0)},this.setState=function(b,p,v){const S=b.clippingPlanes,L=b.clipIntersection,c=b.clipShadows,l=t.get(b);if(!a||S===null||S.length===0||r&&!c)r?T(null):_();else{const x=r?0:n,A=x*4;let M=l.clippingState||null;m.value=M,M=T(S,p,A,v);for(let D=0;D!==A;++D)M[D]=i[D];l.clippingState=M,this.numIntersection=L?this.numPlanes:0,this.numPlanes+=x}};function _(){m.value!==i&&(m.value=i,m.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function T(b,p,v,S){const L=b!==null?b.length:0;let c=null;if(L!==0){if(c=m.value,S!==!0||c===null){const l=v+L*4,x=p.matrixWorldInverse;d.getNormalMatrix(x),(c===null||c.length<l)&&(c=new Float32Array(l));for(let A=0,M=v;A!==L;++A,M+=4)o.copy(b[A]).applyMatrix4(x,d),o.normal.toArray(c,M),c[M+3]=o.constant}m.value=c,m.needsUpdate=!0}return e.numPlanes=L,e.numIntersection=0,c}}class Vr extends ts{constructor(e=-1,i=1,n=1,a=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=n,this.bottom=a,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,n,a,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=n,this.view.offsetY=a,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let r=n-e,o=n+e,d=a+i,m=a-i;if(this.view!==null&&this.view.enabled){const _=(this.right-this.left)/this.view.fullWidth/this.zoom,T=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=_*this.view.offsetX,o=r+_*this.view.width,d-=T*this.view.offsetY,m=d-T*this.view.height}this.projectionMatrix.makeOrthographic(r,o,d,m,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}let ui;class $c{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ui===void 0&&(ui=yn("canvas")),ui.width=e.width,ui.height=e.height;const a=ui.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),n=ui}return n.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=yn("canvas");i.width=e.width,i.height=e.height;const n=i.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const a=n.getImageData(0,0,e.width,e.height),r=a.data;for(let o=0;o<r.length;o++)r[o]=dn(r[o]/255)*255;return n.putImageData(a,0,0),i}else if(e.data){const i=e.data.slice(0);for(let n=0;n<i.length;n++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[n]=Math.floor(dn(i[n]/255)*255):i[n]=dn(i[n]);return{data:i,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let jc=0;class Aa{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jc++}),this.uuid=gr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayHeight,i.displayWidth,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let o=0,d=a.length;o<d;o++)a[o].isDataTexture?r.push(Mn(a[o].image)):r.push(Mn(a[o]))}else r=Mn(a);n.url=r}return i||(e.images[this.uuid]=n),n}}function Mn(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?$c.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let Jc=0;const En=new ue;class _t extends Ma{constructor(e=_t.DEFAULT_IMAGE,i=_t.DEFAULT_MAPPING,n=Gt,a=Gt,r=ht,o=ni,d=At,m=xt,_=_t.DEFAULT_ANISOTROPY,T=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jc++}),this.uuid=gr(),this.name="",this.source=new Aa(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=n,this.wrapT=a,this.magFilter=r,this.minFilter=o,this.anisotropy=_,this.format=d,this.internalFormat=null,this.type=m,this.offset=new ot(0,0),this.repeat=new ot(1,1),this.center=new ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=T,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(En).x}get height(){return this.source.getSize(En).y}get depth(){return this.source.getSize(En).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const n=e[i];if(n===void 0){Ge(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const a=this[i];if(a===void 0){Ge(`Texture.setValues(): property '${i}' does not exist.`);continue}a&&n&&a.isVector2&&n.isVector2||a&&n&&a.isVector3&&n.isVector3||a&&n&&a.isMatrix3&&n.isMatrix3?a.copy(n):this[i]=n}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),i||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vr)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Dn:e.x=e.x-Math.floor(e.x);break;case Gt:e.x=e.x<0?0:1;break;case Ln:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Dn:e.y=e.y-Math.floor(e.y);break;case Gt:e.y=e.y<0?0:1;break;case Ln:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}_t.DEFAULT_IMAGE=null;_t.DEFAULT_MAPPING=vr;_t.DEFAULT_ANISOTROPY=1;class Qc extends Ma{constructor(e=1,i=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ht,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=n.depth,this.scissor=new at(0,0,e,i),this.scissorTest=!1,this.viewport=new at(0,0,e,i),this.textures=[];const a={width:e,height:i,depth:n.depth},r=new _t(a),o=n.count;for(let d=0;d<o;d++)this.textures[d]=r.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const i={minFilter:ht,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,n=1){if(this.width!==e||this.height!==i||this.depth!==n){this.width=e,this.height=i,this.depth=n;for(let a=0,r=this.textures.length;a<r;a++)this.textures[a].image.width=e,this.textures[a].image.height=i,this.textures[a].image.depth=n,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,n=e.textures.length;i<n;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const a=Object.assign({},e.textures[i].image);this.textures[i].source=new Aa(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pt extends Qc{constructor(e=1,i=1,n={}){super(e,i,n),this.isWebGLRenderTarget=!0}}const Yt=4,Xa=[.125,.215,.35,.446,.526,.582],ii=20,ef=256,Ei=new Vr,Ya=new Je;let Tn=null,An=0,bn=0,Rn=!1;const tf=new ue;class qa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,n=.1,a=100,r={}){const{size:o=256,position:d=tf}=r;Tn=this._renderer.getRenderTarget(),An=this._renderer.getActiveCubeFace(),bn=this._renderer.getActiveMipmapLevel(),Rn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const m=this._allocateTargets();return m.depthBuffer=!0,this._sceneToCubeUV(e,n,a,m,d),i>0&&this._blur(m,0,0,i),this._applyPMREM(m),this._cleanup(m),m}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$a(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Za(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Tn,An,bn),this._renderer.xr.enabled=Rn,e.scissorTest=!1,pi(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===ri||e.mapping===gi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Tn=this._renderer.getRenderTarget(),An=this._renderer.getActiveCubeFace(),bn=this._renderer.getActiveMipmapLevel(),Rn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=i||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,n={magFilter:ht,minFilter:ht,generateMipmaps:!1,type:Ht,format:At,colorSpace:en,depthBuffer:!1},a=Ka(e,i,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ka(e,i,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=nf(r)),this._blurMaterial=rf(r,e,i),this._ggxMaterial=af(r,e,i)}return a}_compileMaterial(e){const i=new kt(new si,e);this._renderer.compile(i,Ei)}_sceneToCubeUV(e,i,n,a,r){const m=new Et(90,1,i,n),_=[1,-1,1,1,1,1],T=[1,1,1,-1,-1,-1],b=this._renderer,p=b.autoClear,v=b.toneMapping;b.getClearColor(Ya),b.toneMapping=wt,b.autoClear=!1,b.state.buffers.depth.getReversed()&&(b.setRenderTarget(a),b.clearDepth(),b.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new kt(new yi,new Gr({name:"PMREM.Background",side:gt,depthWrite:!1,depthTest:!1})));const L=this._backgroundBox,c=L.material;let l=!1;const x=e.background;x?x.isColor&&(c.color.copy(x),e.background=null,l=!0):(c.color.copy(Ya),l=!0);for(let A=0;A<6;A++){const M=A%3;M===0?(m.up.set(0,_[A],0),m.position.set(r.x,r.y,r.z),m.lookAt(r.x+T[A],r.y,r.z)):M===1?(m.up.set(0,0,_[A]),m.position.set(r.x,r.y,r.z),m.lookAt(r.x,r.y+T[A],r.z)):(m.up.set(0,_[A],0),m.position.set(r.x,r.y,r.z),m.lookAt(r.x,r.y,r.z+T[A]));const D=this._cubeSize;pi(a,M*D,A>2?D:0,D,D),b.setRenderTarget(a),l&&b.render(L,m),b.render(e,m)}b.toneMapping=v,b.autoClear=p,e.background=x}_textureToCubeUV(e,i){const n=this._renderer,a=e.mapping===ri||e.mapping===gi;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=$a()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Za());const r=a?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const d=r.uniforms;d.envMap.value=e;const m=this._cubeSize;pi(i,0,0,3*m,2*m),n.setRenderTarget(i),n.render(o,Ei)}_applyPMREM(e){const i=this._renderer,n=i.autoClear;i.autoClear=!1;const a=this._lodMeshes.length;for(let r=1;r<a;r++)this._applyGGXFilter(e,r-1,r);i.autoClear=n}_applyGGXFilter(e,i,n){const a=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,d=this._lodMeshes[n];d.material=o;const m=o.uniforms,_=n/(this._lodMeshes.length-1),T=i/(this._lodMeshes.length-1),b=Math.sqrt(_*_-T*T),p=0+_*1.25,v=b*p,{_lodMax:S}=this,L=this._sizeLods[n],c=3*L*(n>S-Yt?n-S+Yt:0),l=4*(this._cubeSize-L);m.envMap.value=e.texture,m.roughness.value=v,m.mipInt.value=S-i,pi(r,c,l,3*L,2*L),a.setRenderTarget(r),a.render(d,Ei),m.envMap.value=r.texture,m.roughness.value=0,m.mipInt.value=S-n,pi(e,c,l,3*L,2*L),a.setRenderTarget(e),a.render(d,Ei)}_blur(e,i,n,a,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,i,n,a,"latitudinal",r),this._halfBlur(o,e,n,n,a,"longitudinal",r)}_halfBlur(e,i,n,a,r,o,d){const m=this._renderer,_=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&je("blur direction must be either latitudinal or longitudinal!");const T=3,b=this._lodMeshes[a];b.material=_;const p=_.uniforms,v=this._sizeLods[n]-1,S=isFinite(r)?Math.PI/(2*v):2*Math.PI/(2*ii-1),L=r/S,c=isFinite(r)?1+Math.floor(T*L):ii;c>ii&&Ge(`sigmaRadians, ${r}, is too large and will clip, as it requested ${c} samples when the maximum is set to ${ii}`);const l=[];let x=0;for(let U=0;U<ii;++U){const u=U/L,g=Math.exp(-u*u/2);l.push(g),U===0?x+=g:U<c&&(x+=2*g)}for(let U=0;U<l.length;U++)l[U]=l[U]/x;p.envMap.value=e.texture,p.samples.value=c,p.weights.value=l,p.latitudinal.value=o==="latitudinal",d&&(p.poleAxis.value=d);const{_lodMax:A}=this;p.dTheta.value=S,p.mipInt.value=A-n;const M=this._sizeLods[a],D=3*M*(a>A-Yt?a-A+Yt:0),w=4*(this._cubeSize-M);pi(i,D,w,3*M,2*M),m.setRenderTarget(i),m.render(b,Ei)}}function nf(t){const e=[],i=[],n=[];let a=t;const r=t-Yt+1+Xa.length;for(let o=0;o<r;o++){const d=Math.pow(2,a);e.push(d);let m=1/d;o>t-Yt?m=Xa[o-t+Yt-1]:o===0&&(m=0),i.push(m);const _=1/(d-2),T=-_,b=1+_,p=[T,T,b,T,b,b,T,T,b,b,T,b],v=6,S=6,L=3,c=2,l=1,x=new Float32Array(L*S*v),A=new Float32Array(c*S*v),M=new Float32Array(l*S*v);for(let w=0;w<v;w++){const U=w%3*2/3-1,u=w>2?0:-1,g=[U,u,0,U+2/3,u,0,U+2/3,u+1,0,U,u,0,U+2/3,u+1,0,U,u+1,0];x.set(g,L*S*w),A.set(p,c*S*w);const K=[w,w,w,w,w,w];M.set(K,l*S*w)}const D=new si;D.setAttribute("position",new ji(x,L)),D.setAttribute("uv",new ji(A,c)),D.setAttribute("faceIndex",new ji(M,l)),n.push(new kt(D,null)),a>Yt&&a--}return{lodMeshes:n,sizeLods:e,sigmas:i}}function Ka(t,e,i){const n=new Pt(t,e,i);return n.texture.mapping=Qi,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function pi(t,e,i,n,a){t.viewport.set(e,i,n,a),t.scissor.set(e,i,n,a)}function af(t,e,i){return new Lt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ef,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:an(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function rf(t,e,i){const n=new Float32Array(ii),a=new ue(0,1,0);return new Lt({name:"SphericalGaussianBlur",defines:{n:ii,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:an(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function Za(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:an(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function $a(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:an(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Vt,depthTest:!1,depthWrite:!1})}function an(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}const hi=-90,mi=1;class of extends Ta{constructor(e,i,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Et(hi,mi,e,i);a.layers=this.layers,this.add(a);const r=new Et(hi,mi,e,i);r.layers=this.layers,this.add(r);const o=new Et(hi,mi,e,i);o.layers=this.layers,this.add(o);const d=new Et(hi,mi,e,i);d.layers=this.layers,this.add(d);const m=new Et(hi,mi,e,i);m.layers=this.layers,this.add(m);const _=new Et(hi,mi,e,i);_.layers=this.layers,this.add(_)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[n,a,r,o,d,m]=i;for(const _ of i)this.remove(_);if(e===Ri)n.up.set(0,1,0),n.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===mr)n.up.set(0,-1,0),n.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const _ of i)this.add(_),_.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,d,m,_,T]=this.children,b=e.getRenderTarget(),p=e.getActiveCubeFace(),v=e.getActiveMipmapLevel(),S=e.xr.enabled;e.xr.enabled=!1;const L=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let c=!1;e.isWebGLRenderer===!0?c=e.state.buffers.depth.getReversed():c=e.reversedDepthBuffer,e.setRenderTarget(n,0,a),c&&e.autoClear===!1&&e.clearDepth(),e.render(i,r),e.setRenderTarget(n,1,a),c&&e.autoClear===!1&&e.clearDepth(),e.render(i,o),e.setRenderTarget(n,2,a),c&&e.autoClear===!1&&e.clearDepth(),e.render(i,d),e.setRenderTarget(n,3,a),c&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),e.setRenderTarget(n,4,a),c&&e.autoClear===!1&&e.clearDepth(),e.render(i,_),n.texture.generateMipmaps=L,e.setRenderTarget(n,5,a),c&&e.autoClear===!1&&e.clearDepth(),e.render(i,T),e.setRenderTarget(b,p,v),e.xr.enabled=S,n.texture.needsPMREMUpdate=!0}}class Hr extends _t{constructor(e=[],i=ri,n,a,r,o,d,m,_,T){super(e,i,n,a,r,o,d,m,_,T),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zr extends Pt{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},a=[n,n,n,n,n,n];this.texture=new Hr(a),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new yi(5,5,5),r=new Lt({name:"CubemapFromEquirect",uniforms:xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gt,blending:Vt});r.uniforms.tEquirect.value=i;const o=new kt(a,r),d=i.minFilter;return i.minFilter===ni&&(i.minFilter=ht),new of(1,10,this).update(e,o),i.minFilter=d,o.geometry.dispose(),o.material.dispose(),this}clear(e,i=!0,n=!0,a=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(i,n,a);e.setRenderTarget(r)}}function sf(t){let e=new WeakMap,i=new WeakMap,n=null;function a(p,v=!1){return p==null?null:v?o(p):r(p)}function r(p){if(p&&p.isTexture){const v=p.mapping;if(v===ln||v===cn)if(e.has(p)){const S=e.get(p).texture;return d(S,p.mapping)}else{const S=p.image;if(S&&S.height>0){const L=new zr(S.height);return L.fromEquirectangularTexture(t,p),e.set(p,L),p.addEventListener("dispose",_),d(L.texture,p.mapping)}else return null}}return p}function o(p){if(p&&p.isTexture){const v=p.mapping,S=v===ln||v===cn,L=v===ri||v===gi;if(S||L){let c=i.get(p);const l=c!==void 0?c.texture.pmremVersion:0;if(p.isRenderTargetTexture&&p.pmremVersion!==l)return n===null&&(n=new qa(t)),c=S?n.fromEquirectangular(p,c):n.fromCubemap(p,c),c.texture.pmremVersion=p.pmremVersion,i.set(p,c),c.texture;if(c!==void 0)return c.texture;{const x=p.image;return S&&x&&x.height>0||L&&x&&m(x)?(n===null&&(n=new qa(t)),c=S?n.fromEquirectangular(p):n.fromCubemap(p),c.texture.pmremVersion=p.pmremVersion,i.set(p,c),p.addEventListener("dispose",T),c.texture):null}}}return p}function d(p,v){return v===ln?p.mapping=ri:v===cn&&(p.mapping=gi),p}function m(p){let v=0;const S=6;for(let L=0;L<S;L++)p[L]!==void 0&&v++;return v===S}function _(p){const v=p.target;v.removeEventListener("dispose",_);const S=e.get(v);S!==void 0&&(e.delete(v),S.dispose())}function T(p){const v=p.target;v.removeEventListener("dispose",T);const S=i.get(v);S!==void 0&&(i.delete(v),S.dispose())}function b(){e=new WeakMap,i=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:a,dispose:b}}function lf(t){const e={};function i(n){if(e[n]!==void 0)return e[n];const a=t.getExtension(n);return e[n]=a,a}return{has:function(n){return i(n)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(n){const a=i(n);return a===null&&xr("WebGLRenderer: "+n+" extension not supported."),a}}}function cf(t,e,i,n){const a={},r=new WeakMap;function o(b){const p=b.target;p.index!==null&&e.remove(p.index);for(const S in p.attributes)e.remove(p.attributes[S]);p.removeEventListener("dispose",o),delete a[p.id];const v=r.get(p);v&&(e.remove(v),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,i.memory.geometries--}function d(b,p){return a[p.id]===!0||(p.addEventListener("dispose",o),a[p.id]=!0,i.memory.geometries++),p}function m(b){const p=b.attributes;for(const v in p)e.update(p[v],t.ARRAY_BUFFER)}function _(b){const p=[],v=b.index,S=b.attributes.position;let L=0;if(S===void 0)return;if(v!==null){const x=v.array;L=v.version;for(let A=0,M=x.length;A<M;A+=3){const D=x[A+0],w=x[A+1],U=x[A+2];p.push(D,w,w,U,U,D)}}else{const x=S.array;L=S.version;for(let A=0,M=x.length/3-1;A<M;A+=3){const D=A+0,w=A+1,U=A+2;p.push(D,w,w,U,U,D)}}const c=new(S.count>=65535?Jo:Qo)(p,1);c.version=L;const l=r.get(b);l&&e.remove(l),r.set(b,c)}function T(b){const p=r.get(b);if(p){const v=b.index;v!==null&&p.version<v.version&&_(b)}else _(b);return r.get(b)}return{get:d,update:m,getWireframeAttribute:T}}function ff(t,e,i){let n;function a(p){n=p}let r,o;function d(p){r=p.type,o=p.bytesPerElement}function m(p,v){t.drawElements(n,v,r,p*o),i.update(v,n,1)}function _(p,v,S){S!==0&&(t.drawElementsInstanced(n,v,r,p*o,S),i.update(v,n,S))}function T(p,v,S){if(S===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,v,0,r,p,0,S);let c=0;for(let l=0;l<S;l++)c+=v[l];i.update(c,n,1)}function b(p,v,S,L){if(S===0)return;const c=e.get("WEBGL_multi_draw");if(c===null)for(let l=0;l<p.length;l++)_(p[l]/o,v[l],L[l]);else{c.multiDrawElementsInstancedWEBGL(n,v,0,r,p,0,L,0,S);let l=0;for(let x=0;x<S;x++)l+=v[x]*L[x];i.update(l,n,1)}}this.setMode=a,this.setIndex=d,this.render=m,this.renderInstances=_,this.renderMultiDraw=T,this.renderMultiDrawInstances=b}function df(t){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,d){switch(i.calls++,o){case t.TRIANGLES:i.triangles+=d*(r/3);break;case t.LINES:i.lines+=d*(r/2);break;case t.LINE_STRIP:i.lines+=d*(r-1);break;case t.LINE_LOOP:i.lines+=d*r;break;case t.POINTS:i.points+=d*r;break;default:je("WebGLInfo: Unknown draw mode:",o);break}}function a(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:a,update:n}}class kr extends _t{constructor(e=null,i=1,n=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:n,depth:a},this.magFilter=ut,this.minFilter=ut,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}function uf(t,e,i){const n=new WeakMap,a=new at;function r(o,d,m){const _=o.morphTargetInfluences,T=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,b=T!==void 0?T.length:0;let p=n.get(d);if(p===void 0||p.count!==b){let g=function(){U.dispose(),n.delete(d),d.removeEventListener("dispose",g)};p!==void 0&&p.texture.dispose();const v=d.morphAttributes.position!==void 0,S=d.morphAttributes.normal!==void 0,L=d.morphAttributes.color!==void 0,c=d.morphAttributes.position||[],l=d.morphAttributes.normal||[],x=d.morphAttributes.color||[];let A=0;v===!0&&(A=1),S===!0&&(A=2),L===!0&&(A=3);let M=d.attributes.position.count*A,D=1;M>e.maxTextureSize&&(D=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const w=new Float32Array(M*D*4*b),U=new kr(w,M,D,b);U.type=Bt,U.needsUpdate=!0;const u=A*4;for(let K=0;K<b;K++){const y=c[K],V=l[K],W=x[K],z=M*D*4*K;for(let X=0;X<y.count;X++){const B=X*u;v===!0&&(a.fromBufferAttribute(y,X),w[z+B+0]=a.x,w[z+B+1]=a.y,w[z+B+2]=a.z,w[z+B+3]=0),S===!0&&(a.fromBufferAttribute(V,X),w[z+B+4]=a.x,w[z+B+5]=a.y,w[z+B+6]=a.z,w[z+B+7]=0),L===!0&&(a.fromBufferAttribute(W,X),w[z+B+8]=a.x,w[z+B+9]=a.y,w[z+B+10]=a.z,w[z+B+11]=W.itemSize===4?a.w:1)}}p={count:b,texture:U,size:new ot(M,D)},n.set(d,p),d.addEventListener("dispose",g)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)m.getUniforms().setValue(t,"morphTexture",o.morphTexture,i);else{let v=0;for(let L=0;L<_.length;L++)v+=_[L];const S=d.morphTargetsRelative?1:1-v;m.getUniforms().setValue(t,"morphTargetBaseInfluence",S),m.getUniforms().setValue(t,"morphTargetInfluences",_)}m.getUniforms().setValue(t,"morphTargetsTexture",p.texture,i),m.getUniforms().setValue(t,"morphTargetsTextureSize",p.size)}return{update:r}}function pf(t,e,i,n,a){let r=new WeakMap;function o(_){const T=a.render.frame,b=_.geometry,p=e.get(_,b);if(r.get(p)!==T&&(e.update(p),r.set(p,T)),_.isInstancedMesh&&(_.hasEventListener("dispose",m)===!1&&_.addEventListener("dispose",m),r.get(_)!==T&&(i.update(_.instanceMatrix,t.ARRAY_BUFFER),_.instanceColor!==null&&i.update(_.instanceColor,t.ARRAY_BUFFER),r.set(_,T))),_.isSkinnedMesh){const v=_.skeleton;r.get(v)!==T&&(v.update(),r.set(v,T))}return p}function d(){r=new WeakMap}function m(_){const T=_.target;T.removeEventListener("dispose",m),n.releaseStatesOfObject(T),i.remove(T.instanceMatrix),T.instanceColor!==null&&i.remove(T.instanceColor)}return{update:o,dispose:d}}class hf extends Lt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}const mf={[Rr]:"LINEAR_TONE_MAPPING",[br]:"REINHARD_TONE_MAPPING",[Ar]:"CINEON_TONE_MAPPING",[Tr]:"ACES_FILMIC_TONE_MAPPING",[Er]:"AGX_TONE_MAPPING",[Mr]:"NEUTRAL_TONE_MAPPING",[Sr]:"CUSTOM_TONE_MAPPING"};function _f(t,e,i,n,a){const r=new Pt(e,i,{type:t,depthBuffer:n,stencilBuffer:a}),o=new Pt(e,i,{type:Ht,depthBuffer:!1,stencilBuffer:!1}),d=new si;d.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new qt([0,2,0,0,2,0],2));const m=new hf({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),_=new kt(d,m),T=new Vr(-1,1,1,-1,0,1);let b=null,p=null,v=!1,S,L=null,c=[],l=!1;this.setSize=function(x,A){r.setSize(x,A),o.setSize(x,A);for(let M=0;M<c.length;M++){const D=c[M];D.setSize&&D.setSize(x,A)}},this.setEffects=function(x){c=x,l=c.length>0&&c[0].isRenderPass===!0;const A=r.width,M=r.height;for(let D=0;D<c.length;D++){const w=c[D];w.setSize&&w.setSize(A,M)}},this.begin=function(x,A){if(v||x.toneMapping===wt&&c.length===0)return!1;if(L=A,A!==null){const M=A.width,D=A.height;(r.width!==M||r.height!==D)&&this.setSize(M,D)}return l===!1&&x.setRenderTarget(r),S=x.toneMapping,x.toneMapping=wt,!0},this.hasRenderPass=function(){return l},this.end=function(x,A){x.toneMapping=S,v=!0;let M=r,D=o;for(let w=0;w<c.length;w++){const U=c[w];if(U.enabled!==!1&&(U.render(x,D,M,A),U.needsSwap!==!1)){const u=M;M=D,D=u}}if(b!==x.outputColorSpace||p!==x.toneMapping){b=x.outputColorSpace,p=x.toneMapping,m.defines={},tt.getTransfer(b)===Ze&&(m.defines.SRGB_TRANSFER="");const w=mf[p];w&&(m.defines[w]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=M.texture,x.setRenderTarget(L),x.render(_,T),L=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){r.dispose(),o.dispose(),d.dispose(),m.dispose()}}class gf extends _t{constructor(e=null,i=1,n=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:n,depth:a},this.magFilter=ut,this.minFilter=ut,this.wrapR=Gt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pi extends _t{constructor(e,i,n=yt,a,r,o,d=ut,m=ut,_,T=zt,b=1){if(T!==zt&&T!==ai)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const p={width:e,height:i,depth:b};super(p,a,r,o,d,m,T,n,_),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Aa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}const Wr=new _t,da=new Pi(1,1),Xr=new kr,Yr=new gf,qr=new Hr,ja=[],Ja=[],Qa=new Float32Array(16),er=new Float32Array(9),tr=new Float32Array(4);function Si(t,e,i){const n=t[0];if(n<=0||n>0)return t;const a=e*i;let r=ja[a];if(r===void 0&&(r=new Float32Array(a),ja[a]=r),e!==0){n.toArray(r,0);for(let o=1,d=0;o!==e;++o)d+=i,t[o].toArray(r,d)}return r}function st(t,e){if(t.length!==e.length)return!1;for(let i=0,n=t.length;i<n;i++)if(t[i]!==e[i])return!1;return!0}function lt(t,e){for(let i=0,n=e.length;i<n;i++)t[i]=e[i]}function rn(t,e){let i=Ja[e];i===void 0&&(i=new Int32Array(e),Ja[e]=i);for(let n=0;n!==e;++n)i[n]=t.allocateTextureUnit();return i}function vf(t,e){const i=this.cache;i[0]!==e&&(t.uniform1f(this.addr,e),i[0]=e)}function xf(t,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(st(i,e))return;t.uniform2fv(this.addr,e),lt(i,e)}}function Sf(t,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(st(i,e))return;t.uniform3fv(this.addr,e),lt(i,e)}}function Mf(t,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(st(i,e))return;t.uniform4fv(this.addr,e),lt(i,e)}}function Ef(t,e){const i=this.cache,n=e.elements;if(n===void 0){if(st(i,e))return;t.uniformMatrix2fv(this.addr,!1,e),lt(i,e)}else{if(st(i,n))return;tr.set(n),t.uniformMatrix2fv(this.addr,!1,tr),lt(i,n)}}function Tf(t,e){const i=this.cache,n=e.elements;if(n===void 0){if(st(i,e))return;t.uniformMatrix3fv(this.addr,!1,e),lt(i,e)}else{if(st(i,n))return;er.set(n),t.uniformMatrix3fv(this.addr,!1,er),lt(i,n)}}function Af(t,e){const i=this.cache,n=e.elements;if(n===void 0){if(st(i,e))return;t.uniformMatrix4fv(this.addr,!1,e),lt(i,e)}else{if(st(i,n))return;Qa.set(n),t.uniformMatrix4fv(this.addr,!1,Qa),lt(i,n)}}function bf(t,e){const i=this.cache;i[0]!==e&&(t.uniform1i(this.addr,e),i[0]=e)}function Rf(t,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(st(i,e))return;t.uniform2iv(this.addr,e),lt(i,e)}}function Cf(t,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(st(i,e))return;t.uniform3iv(this.addr,e),lt(i,e)}}function wf(t,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(st(i,e))return;t.uniform4iv(this.addr,e),lt(i,e)}}function Pf(t,e){const i=this.cache;i[0]!==e&&(t.uniform1ui(this.addr,e),i[0]=e)}function yf(t,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(st(i,e))return;t.uniform2uiv(this.addr,e),lt(i,e)}}function Lf(t,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(st(i,e))return;t.uniform3uiv(this.addr,e),lt(i,e)}}function Df(t,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(st(i,e))return;t.uniform4uiv(this.addr,e),lt(i,e)}}function Uf(t,e,i){const n=this.cache,a=i.allocateTextureUnit();n[0]!==a&&(t.uniform1i(this.addr,a),n[0]=a);let r;this.type===t.SAMPLER_2D_SHADOW?(da.compareFunction=i.isReversedDepthBuffer()?ha:ma,r=da):r=Wr,i.setTexture2D(e||r,a)}function If(t,e,i){const n=this.cache,a=i.allocateTextureUnit();n[0]!==a&&(t.uniform1i(this.addr,a),n[0]=a),i.setTexture3D(e||Yr,a)}function Nf(t,e,i){const n=this.cache,a=i.allocateTextureUnit();n[0]!==a&&(t.uniform1i(this.addr,a),n[0]=a),i.setTextureCube(e||qr,a)}function Ff(t,e,i){const n=this.cache,a=i.allocateTextureUnit();n[0]!==a&&(t.uniform1i(this.addr,a),n[0]=a),i.setTexture2DArray(e||Xr,a)}function Of(t){switch(t){case 5126:return vf;case 35664:return xf;case 35665:return Sf;case 35666:return Mf;case 35674:return Ef;case 35675:return Tf;case 35676:return Af;case 5124:case 35670:return bf;case 35667:case 35671:return Rf;case 35668:case 35672:return Cf;case 35669:case 35673:return wf;case 5125:return Pf;case 36294:return yf;case 36295:return Lf;case 36296:return Df;case 35678:case 36198:case 36298:case 36306:case 35682:return Uf;case 35679:case 36299:case 36307:return If;case 35680:case 36300:case 36308:case 36293:return Nf;case 36289:case 36303:case 36311:case 36292:return Ff}}function Bf(t,e){t.uniform1fv(this.addr,e)}function Gf(t,e){const i=Si(e,this.size,2);t.uniform2fv(this.addr,i)}function Vf(t,e){const i=Si(e,this.size,3);t.uniform3fv(this.addr,i)}function Hf(t,e){const i=Si(e,this.size,4);t.uniform4fv(this.addr,i)}function zf(t,e){const i=Si(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,i)}function kf(t,e){const i=Si(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,i)}function Wf(t,e){const i=Si(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,i)}function Xf(t,e){t.uniform1iv(this.addr,e)}function Yf(t,e){t.uniform2iv(this.addr,e)}function qf(t,e){t.uniform3iv(this.addr,e)}function Kf(t,e){t.uniform4iv(this.addr,e)}function Zf(t,e){t.uniform1uiv(this.addr,e)}function $f(t,e){t.uniform2uiv(this.addr,e)}function jf(t,e){t.uniform3uiv(this.addr,e)}function Jf(t,e){t.uniform4uiv(this.addr,e)}function Qf(t,e,i){const n=this.cache,a=e.length,r=rn(i,a);st(n,r)||(t.uniform1iv(this.addr,r),lt(n,r));let o;this.type===t.SAMPLER_2D_SHADOW?o=da:o=Wr;for(let d=0;d!==a;++d)i.setTexture2D(e[d]||o,r[d])}function ed(t,e,i){const n=this.cache,a=e.length,r=rn(i,a);st(n,r)||(t.uniform1iv(this.addr,r),lt(n,r));for(let o=0;o!==a;++o)i.setTexture3D(e[o]||Yr,r[o])}function td(t,e,i){const n=this.cache,a=e.length,r=rn(i,a);st(n,r)||(t.uniform1iv(this.addr,r),lt(n,r));for(let o=0;o!==a;++o)i.setTextureCube(e[o]||qr,r[o])}function id(t,e,i){const n=this.cache,a=e.length,r=rn(i,a);st(n,r)||(t.uniform1iv(this.addr,r),lt(n,r));for(let o=0;o!==a;++o)i.setTexture2DArray(e[o]||Xr,r[o])}function nd(t){switch(t){case 5126:return Bf;case 35664:return Gf;case 35665:return Vf;case 35666:return Hf;case 35674:return zf;case 35675:return kf;case 35676:return Wf;case 5124:case 35670:return Xf;case 35667:case 35671:return Yf;case 35668:case 35672:return qf;case 35669:case 35673:return Kf;case 5125:return Zf;case 36294:return $f;case 36295:return jf;case 36296:return Jf;case 35678:case 36198:case 36298:case 36306:case 35682:return Qf;case 35679:case 36299:case 36307:return ed;case 35680:case 36300:case 36308:case 36293:return td;case 36289:case 36303:case 36311:case 36292:return id}}class ad{constructor(e,i,n){this.id=e,this.addr=n,this.cache=[],this.type=i.type,this.setValue=Of(i.type)}}class rd{constructor(e,i,n){this.id=e,this.addr=n,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=nd(i.type)}}class od{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,n){const a=this.seq;for(let r=0,o=a.length;r!==o;++r){const d=a[r];d.setValue(e,i[d.id],n)}}}const Cn=/(\w+)(\])?(\[|\.)?/g;function ir(t,e){t.seq.push(e),t.map[e.id]=e}function sd(t,e,i){const n=t.name,a=n.length;for(Cn.lastIndex=0;;){const r=Cn.exec(n),o=Cn.lastIndex;let d=r[1];const m=r[2]==="]",_=r[3];if(m&&(d=d|0),_===void 0||_==="["&&o+2===a){ir(i,_===void 0?new ad(d,t,e):new rd(d,t,e));break}else{let b=i.map[d];b===void 0&&(b=new od(d),ir(i,b)),i=b}}}class Ji{constructor(e,i){this.seq=[],this.map={};const n=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const d=e.getActiveUniform(i,o),m=e.getUniformLocation(i,d.name);sd(d,m,this)}const a=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?a.push(o):r.push(o);a.length>0&&(this.seq=a.concat(r))}setValue(e,i,n,a){const r=this.map[i];r!==void 0&&r.setValue(e,n,a)}setOptional(e,i,n){const a=i[n];a!==void 0&&this.setValue(e,n,a)}static upload(e,i,n,a){for(let r=0,o=i.length;r!==o;++r){const d=i[r],m=n[d.id];m.needsUpdate!==!1&&d.setValue(e,m.value,a)}}static seqWithValue(e,i){const n=[];for(let a=0,r=e.length;a!==r;++a){const o=e[a];o.id in i&&n.push(o)}return n}}function nr(t,e,i){const n=t.createShader(e);return t.shaderSource(n,i),t.compileShader(n),n}const ld=37297;let cd=0;function fd(t,e){const i=t.split(`
`),n=[],a=Math.max(e-6,0),r=Math.min(e+6,i.length);for(let o=a;o<r;o++){const d=o+1;n.push(`${d===e?">":" "} ${d}: ${i[o]}`)}return n.join(`
`)}const ar=new Fe;function dd(t){tt._getMatrix(ar,tt.workingColorSpace,t);const e=`mat3( ${ar.elements.map(i=>i.toFixed(4))} )`;switch(tt.getTransfer(t)){case Cr:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function rr(t,e,i){const n=t.getShaderParameter(e,t.COMPILE_STATUS),r=(t.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const d=parseInt(o[1]);return i.toUpperCase()+`

`+r+`

`+fd(t.getShaderSource(e),d)}else return r}function ud(t,e){const i=dd(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const pd={[Rr]:"Linear",[br]:"Reinhard",[Ar]:"Cineon",[Tr]:"ACESFilmic",[Er]:"AgX",[Mr]:"Neutral",[Sr]:"Custom"};function hd(t,e){const i=pd[e];return i===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const ki=new ue;function md(){tt.getLuminanceCoefficients(ki);const t=ki.x.toFixed(4),e=ki.y.toFixed(4),i=ki.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _d(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(bi).join(`
`)}function gd(t){const e=[];for(const i in t){const n=t[i];n!==!1&&e.push("#define "+i+" "+n)}return e.join(`
`)}function vd(t,e){const i={},n=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let a=0;a<n;a++){const r=t.getActiveAttrib(e,a),o=r.name;let d=1;r.type===t.FLOAT_MAT2&&(d=2),r.type===t.FLOAT_MAT3&&(d=3),r.type===t.FLOAT_MAT4&&(d=4),i[o]={type:r.type,location:t.getAttribLocation(e,o),locationSize:d}}return i}function bi(t){return t!==""}function or(t,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sr(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xd=/^[ \t]*#include +<([\w\d./]+)>/gm;function ua(t){return t.replace(xd,Md)}const Sd=new Map;function Md(t,e){let i=De[e];if(i===void 0){const n=Sd.get(e);if(n!==void 0)i=De[n],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ua(i)}const Ed=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lr(t){return t.replace(Ed,Td)}function Td(t,e,i,n){let a="";for(let r=parseInt(e);r<parseInt(i);r++)a+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function cr(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Ad={[Xi]:"SHADOWMAP_TYPE_PCF",[Ai]:"SHADOWMAP_TYPE_VSM"};function bd(t){return Ad[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Rd={[ri]:"ENVMAP_TYPE_CUBE",[gi]:"ENVMAP_TYPE_CUBE",[Qi]:"ENVMAP_TYPE_CUBE_UV"};function Cd(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":Rd[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const wd={[gi]:"ENVMAP_MODE_REFRACTION"};function Pd(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":wd[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const yd={[_r]:"ENVMAP_BLENDING_MULTIPLY",[no]:"ENVMAP_BLENDING_MIX",[io]:"ENVMAP_BLENDING_ADD"};function Ld(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":yd[t.combine]||"ENVMAP_BLENDING_NONE"}function Dd(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:n,maxMip:i}}function Ud(t,e,i,n){const a=t.getContext(),r=i.defines;let o=i.vertexShader,d=i.fragmentShader;const m=bd(i),_=Cd(i),T=Pd(i),b=Ld(i),p=Dd(i),v=_d(i),S=gd(r),L=a.createProgram();let c,l,x=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(c=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,S].filter(bi).join(`
`),c.length>0&&(c+=`
`),l=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,S].filter(bi).join(`
`),l.length>0&&(l+=`
`)):(c=[cr(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,S,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+T:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(bi).join(`
`),l=[cr(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,S,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.envMap?"#define "+T:"",i.envMap?"#define "+b:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==wt?"#define TONE_MAPPING":"",i.toneMapping!==wt?De.tonemapping_pars_fragment:"",i.toneMapping!==wt?hd("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,ud("linearToOutputTexel",i.outputColorSpace),md(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(bi).join(`
`)),o=ua(o),o=or(o,i),o=sr(o,i),d=ua(d),d=or(d,i),d=sr(d,i),o=lr(o),d=lr(d),i.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,c=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+c,l=["#define varying in",i.glslVersion===Ia?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Ia?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+l);const A=x+c+o,M=x+l+d,D=nr(a,a.VERTEX_SHADER,A),w=nr(a,a.FRAGMENT_SHADER,M);a.attachShader(L,D),a.attachShader(L,w),i.index0AttributeName!==void 0?a.bindAttribLocation(L,0,i.index0AttributeName):i.morphTargets===!0&&a.bindAttribLocation(L,0,"position"),a.linkProgram(L);function U(y){if(t.debug.checkShaderErrors){const V=a.getProgramInfoLog(L)||"",W=a.getShaderInfoLog(D)||"",z=a.getShaderInfoLog(w)||"",X=V.trim(),B=W.trim(),F=z.trim();let ee=!0,j=!0;if(a.getProgramParameter(L,a.LINK_STATUS)===!1)if(ee=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,L,D,w);else{const pe=rr(a,D,"vertex"),Me=rr(a,w,"fragment");je("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(L,a.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+X+`
`+pe+`
`+Me)}else X!==""?Ge("WebGLProgram: Program Info Log:",X):(B===""||F==="")&&(j=!1);j&&(y.diagnostics={runnable:ee,programLog:X,vertexShader:{log:B,prefix:c},fragmentShader:{log:F,prefix:l}})}a.deleteShader(D),a.deleteShader(w),u=new Ji(a,L),g=vd(a,L)}let u;this.getUniforms=function(){return u===void 0&&U(this),u};let g;this.getAttributes=function(){return g===void 0&&U(this),g};let K=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return K===!1&&(K=a.getProgramParameter(L,ld)),K},this.destroy=function(){n.releaseStatesOfProgram(this),a.deleteProgram(L),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=cd++,this.cacheKey=e,this.usedTimes=1,this.program=L,this.vertexShader=D,this.fragmentShader=w,this}let Id=0;class Nd{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,n=e.fragmentShader,a=this._getShaderStage(i),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(a)===!1&&(o.add(a),a.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const n of i)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let n=i.get(e);return n===void 0&&(n=new Set,i.set(e,n)),n}_getShaderStage(e){const i=this.shaderCache;let n=i.get(e);return n===void 0&&(n=new Fd(e),i.set(e,n)),n}}class Fd{constructor(e){this.id=Id++,this.code=e,this.usedTimes=0}}function Od(t,e,i,n,a,r){const o=new jo,d=new Nd,m=new Set,_=[],T=new Map,b=n.logarithmicDepthBuffer;let p=n.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function S(u){return m.add(u),u===0?"uv":`uv${u}`}function L(u,g,K,y,V){const W=y.fog,z=V.geometry,X=u.isMeshStandardMaterial||u.isMeshLambertMaterial||u.isMeshPhongMaterial?y.environment:null,B=u.isMeshStandardMaterial||u.isMeshLambertMaterial&&!u.envMap||u.isMeshPhongMaterial&&!u.envMap,F=e.get(u.envMap||X,B),ee=F&&F.mapping===Qi?F.image.height:null,j=v[u.type];u.precision!==null&&(p=n.getMaxPrecision(u.precision),p!==u.precision&&Ge("WebGLProgram.getParameters:",u.precision,"not supported, using",p,"instead."));const pe=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Me=pe!==void 0?pe.length:0;let ce=0;z.morphAttributes.position!==void 0&&(ce=1),z.morphAttributes.normal!==void 0&&(ce=2),z.morphAttributes.color!==void 0&&(ce=3);let Le,Qe,$e,Y;if(j){const ze=Ct[j];Le=ze.vertexShader,Qe=ze.fragmentShader}else Le=u.vertexShader,Qe=u.fragmentShader,d.update(u),$e=d.getVertexShaderID(u),Y=d.getFragmentShaderID(u);const te=t.getRenderTarget(),ae=t.state.buffers.depth.getReversed(),ye=V.isInstancedMesh===!0,be=V.isBatchedMesh===!0,Ce=!!u.map,ct=!!u.matcap,Oe=!!F,He=!!u.aoMap,Xe=!!u.lightMap,Ue=!!u.bumpMap,it=!!u.normalMap,E=!!u.displacementMap,rt=!!u.emissiveMap,Ve=!!u.metalnessMap,qe=!!u.roughnessMap,xe=u.anisotropy>0,h=u.clearcoat>0,s=u.dispersion>0,C=u.iridescence>0,k=u.sheen>0,q=u.transmission>0,H=xe&&!!u.anisotropyMap,he=h&&!!u.clearcoatMap,ie=h&&!!u.clearcoatNormalMap,Ae=h&&!!u.clearcoatRoughnessMap,Re=C&&!!u.iridescenceMap,Z=C&&!!u.iridescenceThicknessMap,J=k&&!!u.sheenColorMap,me=k&&!!u.sheenRoughnessMap,ge=!!u.specularMap,le=!!u.specularColorMap,Ie=!!u.specularIntensityMap,R=q&&!!u.transmissionMap,ne=q&&!!u.thicknessMap,Q=!!u.gradientMap,de=!!u.alphaMap,$=u.alphaTest>0,G=!!u.alphaHash,_e=!!u.extensions;let we=wt;u.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(we=t.toneMapping);const Ke={shaderID:j,shaderType:u.type,shaderName:u.name,vertexShader:Le,fragmentShader:Qe,defines:u.defines,customVertexShaderID:$e,customFragmentShaderID:Y,isRawShaderMaterial:u.isRawShaderMaterial===!0,glslVersion:u.glslVersion,precision:p,batching:be,batchingColor:be&&V._colorsTexture!==null,instancing:ye,instancingColor:ye&&V.instanceColor!==null,instancingMorph:ye&&V.morphTexture!==null,outputColorSpace:te===null?t.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:en,alphaToCoverage:!!u.alphaToCoverage,map:Ce,matcap:ct,envMap:Oe,envMapMode:Oe&&F.mapping,envMapCubeUVHeight:ee,aoMap:He,lightMap:Xe,bumpMap:Ue,normalMap:it,displacementMap:E,emissiveMap:rt,normalMapObjectSpace:it&&u.normalMapType===ro,normalMapTangentSpace:it&&u.normalMapType===ao,metalnessMap:Ve,roughnessMap:qe,anisotropy:xe,anisotropyMap:H,clearcoat:h,clearcoatMap:he,clearcoatNormalMap:ie,clearcoatRoughnessMap:Ae,dispersion:s,iridescence:C,iridescenceMap:Re,iridescenceThicknessMap:Z,sheen:k,sheenColorMap:J,sheenRoughnessMap:me,specularMap:ge,specularColorMap:le,specularIntensityMap:Ie,transmission:q,transmissionMap:R,thicknessMap:ne,gradientMap:Q,opaque:u.transparent===!1&&u.blending===Yi&&u.alphaToCoverage===!1,alphaMap:de,alphaTest:$,alphaHash:G,combine:u.combine,mapUv:Ce&&S(u.map.channel),aoMapUv:He&&S(u.aoMap.channel),lightMapUv:Xe&&S(u.lightMap.channel),bumpMapUv:Ue&&S(u.bumpMap.channel),normalMapUv:it&&S(u.normalMap.channel),displacementMapUv:E&&S(u.displacementMap.channel),emissiveMapUv:rt&&S(u.emissiveMap.channel),metalnessMapUv:Ve&&S(u.metalnessMap.channel),roughnessMapUv:qe&&S(u.roughnessMap.channel),anisotropyMapUv:H&&S(u.anisotropyMap.channel),clearcoatMapUv:he&&S(u.clearcoatMap.channel),clearcoatNormalMapUv:ie&&S(u.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ae&&S(u.clearcoatRoughnessMap.channel),iridescenceMapUv:Re&&S(u.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&S(u.iridescenceThicknessMap.channel),sheenColorMapUv:J&&S(u.sheenColorMap.channel),sheenRoughnessMapUv:me&&S(u.sheenRoughnessMap.channel),specularMapUv:ge&&S(u.specularMap.channel),specularColorMapUv:le&&S(u.specularColorMap.channel),specularIntensityMapUv:Ie&&S(u.specularIntensityMap.channel),transmissionMapUv:R&&S(u.transmissionMap.channel),thicknessMapUv:ne&&S(u.thicknessMap.channel),alphaMapUv:de&&S(u.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(it||xe),vertexColors:u.vertexColors,vertexAlphas:u.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!z.attributes.uv&&(Ce||de),fog:!!W,useFog:u.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:u.wireframe===!1&&(u.flatShading===!0||z.attributes.normal===void 0&&it===!1&&(u.isMeshLambertMaterial||u.isMeshPhongMaterial||u.isMeshStandardMaterial||u.isMeshPhysicalMaterial)),sizeAttenuation:u.sizeAttenuation===!0,logarithmicDepthBuffer:b,reversedDepthBuffer:ae,skinning:V.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:ce,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:u.dithering,shadowMapEnabled:t.shadowMap.enabled&&K.length>0,shadowMapType:t.shadowMap.type,toneMapping:we,decodeVideoTexture:Ce&&u.map.isVideoTexture===!0&&tt.getTransfer(u.map.colorSpace)===Ze,decodeVideoTextureEmissive:rt&&u.emissiveMap.isVideoTexture===!0&&tt.getTransfer(u.emissiveMap.colorSpace)===Ze,premultipliedAlpha:u.premultipliedAlpha,doubleSided:u.side===Ot,flipSided:u.side===gt,useDepthPacking:u.depthPacking>=0,depthPacking:u.depthPacking||0,index0AttributeName:u.index0AttributeName,extensionClipCullDistance:_e&&u.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&u.extensions.multiDraw===!0||be)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:u.customProgramCacheKey()};return Ke.vertexUv1s=m.has(1),Ke.vertexUv2s=m.has(2),Ke.vertexUv3s=m.has(3),m.clear(),Ke}function c(u){const g=[];if(u.shaderID?g.push(u.shaderID):(g.push(u.customVertexShaderID),g.push(u.customFragmentShaderID)),u.defines!==void 0)for(const K in u.defines)g.push(K),g.push(u.defines[K]);return u.isRawShaderMaterial===!1&&(l(g,u),x(g,u),g.push(t.outputColorSpace)),g.push(u.customProgramCacheKey),g.join()}function l(u,g){u.push(g.precision),u.push(g.outputColorSpace),u.push(g.envMapMode),u.push(g.envMapCubeUVHeight),u.push(g.mapUv),u.push(g.alphaMapUv),u.push(g.lightMapUv),u.push(g.aoMapUv),u.push(g.bumpMapUv),u.push(g.normalMapUv),u.push(g.displacementMapUv),u.push(g.emissiveMapUv),u.push(g.metalnessMapUv),u.push(g.roughnessMapUv),u.push(g.anisotropyMapUv),u.push(g.clearcoatMapUv),u.push(g.clearcoatNormalMapUv),u.push(g.clearcoatRoughnessMapUv),u.push(g.iridescenceMapUv),u.push(g.iridescenceThicknessMapUv),u.push(g.sheenColorMapUv),u.push(g.sheenRoughnessMapUv),u.push(g.specularMapUv),u.push(g.specularColorMapUv),u.push(g.specularIntensityMapUv),u.push(g.transmissionMapUv),u.push(g.thicknessMapUv),u.push(g.combine),u.push(g.fogExp2),u.push(g.sizeAttenuation),u.push(g.morphTargetsCount),u.push(g.morphAttributeCount),u.push(g.numDirLights),u.push(g.numPointLights),u.push(g.numSpotLights),u.push(g.numSpotLightMaps),u.push(g.numHemiLights),u.push(g.numRectAreaLights),u.push(g.numDirLightShadows),u.push(g.numPointLightShadows),u.push(g.numSpotLightShadows),u.push(g.numSpotLightShadowsWithMaps),u.push(g.numLightProbes),u.push(g.shadowMapType),u.push(g.toneMapping),u.push(g.numClippingPlanes),u.push(g.numClipIntersection),u.push(g.depthPacking)}function x(u,g){o.disableAll(),g.instancing&&o.enable(0),g.instancingColor&&o.enable(1),g.instancingMorph&&o.enable(2),g.matcap&&o.enable(3),g.envMap&&o.enable(4),g.normalMapObjectSpace&&o.enable(5),g.normalMapTangentSpace&&o.enable(6),g.clearcoat&&o.enable(7),g.iridescence&&o.enable(8),g.alphaTest&&o.enable(9),g.vertexColors&&o.enable(10),g.vertexAlphas&&o.enable(11),g.vertexUv1s&&o.enable(12),g.vertexUv2s&&o.enable(13),g.vertexUv3s&&o.enable(14),g.vertexTangents&&o.enable(15),g.anisotropy&&o.enable(16),g.alphaHash&&o.enable(17),g.batching&&o.enable(18),g.dispersion&&o.enable(19),g.batchingColor&&o.enable(20),g.gradientMap&&o.enable(21),u.push(o.mask),o.disableAll(),g.fog&&o.enable(0),g.useFog&&o.enable(1),g.flatShading&&o.enable(2),g.logarithmicDepthBuffer&&o.enable(3),g.reversedDepthBuffer&&o.enable(4),g.skinning&&o.enable(5),g.morphTargets&&o.enable(6),g.morphNormals&&o.enable(7),g.morphColors&&o.enable(8),g.premultipliedAlpha&&o.enable(9),g.shadowMapEnabled&&o.enable(10),g.doubleSided&&o.enable(11),g.flipSided&&o.enable(12),g.useDepthPacking&&o.enable(13),g.dithering&&o.enable(14),g.transmission&&o.enable(15),g.sheen&&o.enable(16),g.opaque&&o.enable(17),g.pointsUvs&&o.enable(18),g.decodeVideoTexture&&o.enable(19),g.decodeVideoTextureEmissive&&o.enable(20),g.alphaToCoverage&&o.enable(21),u.push(o.mask)}function A(u){const g=v[u.type];let K;if(g){const y=Ct[g];K=ss.clone(y.uniforms)}else K=u.uniforms;return K}function M(u,g){let K=T.get(g);return K!==void 0?++K.usedTimes:(K=new Ud(t,g,u,a),_.push(K),T.set(g,K)),K}function D(u){if(--u.usedTimes===0){const g=_.indexOf(u);_[g]=_[_.length-1],_.pop(),T.delete(u.cacheKey),u.destroy()}}function w(u){d.remove(u)}function U(){d.dispose()}return{getParameters:L,getProgramCacheKey:c,getUniforms:A,acquireProgram:M,releaseProgram:D,releaseShaderCache:w,programs:_,dispose:U}}function Bd(){let t=new WeakMap;function e(o){return t.has(o)}function i(o){let d=t.get(o);return d===void 0&&(d={},t.set(o,d)),d}function n(o){t.delete(o)}function a(o,d,m){t.get(o)[d]=m}function r(){t=new WeakMap}return{has:e,get:i,remove:n,update:a,dispose:r}}function Gd(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function fr(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function dr(){const t=[];let e=0;const i=[],n=[],a=[];function r(){e=0,i.length=0,n.length=0,a.length=0}function o(p){let v=0;return p.isInstancedMesh&&(v+=2),p.isSkinnedMesh&&(v+=1),v}function d(p,v,S,L,c,l){let x=t[e];return x===void 0?(x={id:p.id,object:p,geometry:v,material:S,materialVariant:o(p),groupOrder:L,renderOrder:p.renderOrder,z:c,group:l},t[e]=x):(x.id=p.id,x.object=p,x.geometry=v,x.material=S,x.materialVariant=o(p),x.groupOrder=L,x.renderOrder=p.renderOrder,x.z=c,x.group=l),e++,x}function m(p,v,S,L,c,l){const x=d(p,v,S,L,c,l);S.transmission>0?n.push(x):S.transparent===!0?a.push(x):i.push(x)}function _(p,v,S,L,c,l){const x=d(p,v,S,L,c,l);S.transmission>0?n.unshift(x):S.transparent===!0?a.unshift(x):i.unshift(x)}function T(p,v){i.length>1&&i.sort(p||Gd),n.length>1&&n.sort(v||fr),a.length>1&&a.sort(v||fr)}function b(){for(let p=e,v=t.length;p<v;p++){const S=t[p];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:i,transmissive:n,transparent:a,init:r,push:m,unshift:_,finish:b,sort:T}}function Vd(){let t=new WeakMap;function e(n,a){const r=t.get(n);let o;return r===void 0?(o=new dr,t.set(n,[o])):a>=r.length?(o=new dr,r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:e,dispose:i}}function Hd(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new ue,color:new Je};break;case"SpotLight":i={position:new ue,direction:new ue,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new ue,color:new Je,distance:0,decay:0};break;case"HemisphereLight":i={direction:new ue,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":i={color:new Je,position:new ue,halfWidth:new ue,halfHeight:new ue};break}return t[e.id]=i,i}}}function zd(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=i,i}}}let kd=0;function Wd(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function Xd(t){const e=new Hd,i=zd(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let _=0;_<9;_++)n.probe.push(new ue);const a=new ue,r=new oi,o=new oi;function d(_){let T=0,b=0,p=0;for(let g=0;g<9;g++)n.probe[g].set(0,0,0);let v=0,S=0,L=0,c=0,l=0,x=0,A=0,M=0,D=0,w=0,U=0;_.sort(Wd);for(let g=0,K=_.length;g<K;g++){const y=_[g],V=y.color,W=y.intensity,z=y.distance;let X=null;if(y.shadow&&y.shadow.map&&(y.shadow.map.texture.format===vi?X=y.shadow.map.texture:X=y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)T+=V.r*W,b+=V.g*W,p+=V.b*W;else if(y.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(y.sh.coefficients[B],W);U++}else if(y.isDirectionalLight){const B=e.get(y);if(B.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const F=y.shadow,ee=i.get(y);ee.shadowIntensity=F.intensity,ee.shadowBias=F.bias,ee.shadowNormalBias=F.normalBias,ee.shadowRadius=F.radius,ee.shadowMapSize=F.mapSize,n.directionalShadow[v]=ee,n.directionalShadowMap[v]=X,n.directionalShadowMatrix[v]=y.shadow.matrix,x++}n.directional[v]=B,v++}else if(y.isSpotLight){const B=e.get(y);B.position.setFromMatrixPosition(y.matrixWorld),B.color.copy(V).multiplyScalar(W),B.distance=z,B.coneCos=Math.cos(y.angle),B.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),B.decay=y.decay,n.spot[L]=B;const F=y.shadow;if(y.map&&(n.spotLightMap[D]=y.map,D++,F.updateMatrices(y),y.castShadow&&w++),n.spotLightMatrix[L]=F.matrix,y.castShadow){const ee=i.get(y);ee.shadowIntensity=F.intensity,ee.shadowBias=F.bias,ee.shadowNormalBias=F.normalBias,ee.shadowRadius=F.radius,ee.shadowMapSize=F.mapSize,n.spotShadow[L]=ee,n.spotShadowMap[L]=X,M++}L++}else if(y.isRectAreaLight){const B=e.get(y);B.color.copy(V).multiplyScalar(W),B.halfWidth.set(y.width*.5,0,0),B.halfHeight.set(0,y.height*.5,0),n.rectArea[c]=B,c++}else if(y.isPointLight){const B=e.get(y);if(B.color.copy(y.color).multiplyScalar(y.intensity),B.distance=y.distance,B.decay=y.decay,y.castShadow){const F=y.shadow,ee=i.get(y);ee.shadowIntensity=F.intensity,ee.shadowBias=F.bias,ee.shadowNormalBias=F.normalBias,ee.shadowRadius=F.radius,ee.shadowMapSize=F.mapSize,ee.shadowCameraNear=F.camera.near,ee.shadowCameraFar=F.camera.far,n.pointShadow[S]=ee,n.pointShadowMap[S]=X,n.pointShadowMatrix[S]=y.shadow.matrix,A++}n.point[S]=B,S++}else if(y.isHemisphereLight){const B=e.get(y);B.skyColor.copy(y.color).multiplyScalar(W),B.groundColor.copy(y.groundColor).multiplyScalar(W),n.hemi[l]=B,l++}}c>0&&(t.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2)),n.ambient[0]=T,n.ambient[1]=b,n.ambient[2]=p;const u=n.hash;(u.directionalLength!==v||u.pointLength!==S||u.spotLength!==L||u.rectAreaLength!==c||u.hemiLength!==l||u.numDirectionalShadows!==x||u.numPointShadows!==A||u.numSpotShadows!==M||u.numSpotMaps!==D||u.numLightProbes!==U)&&(n.directional.length=v,n.spot.length=L,n.rectArea.length=c,n.point.length=S,n.hemi.length=l,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=M+D-w,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=U,u.directionalLength=v,u.pointLength=S,u.spotLength=L,u.rectAreaLength=c,u.hemiLength=l,u.numDirectionalShadows=x,u.numPointShadows=A,u.numSpotShadows=M,u.numSpotMaps=D,u.numLightProbes=U,n.version=kd++)}function m(_,T){let b=0,p=0,v=0,S=0,L=0;const c=T.matrixWorldInverse;for(let l=0,x=_.length;l<x;l++){const A=_[l];if(A.isDirectionalLight){const M=n.directional[b];M.direction.setFromMatrixPosition(A.matrixWorld),a.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(a),M.direction.transformDirection(c),b++}else if(A.isSpotLight){const M=n.spot[v];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(c),M.direction.setFromMatrixPosition(A.matrixWorld),a.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(a),M.direction.transformDirection(c),v++}else if(A.isRectAreaLight){const M=n.rectArea[S];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(c),o.identity(),r.copy(A.matrixWorld),r.premultiply(c),o.extractRotation(r),M.halfWidth.set(A.width*.5,0,0),M.halfHeight.set(0,A.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),S++}else if(A.isPointLight){const M=n.point[p];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(c),p++}else if(A.isHemisphereLight){const M=n.hemi[L];M.direction.setFromMatrixPosition(A.matrixWorld),M.direction.transformDirection(c),L++}}}return{setup:d,setupView:m,state:n}}function ur(t){const e=new Xd(t),i=[],n=[];function a(T){_.camera=T,i.length=0,n.length=0}function r(T){i.push(T)}function o(T){n.push(T)}function d(){e.setup(i)}function m(T){e.setupView(i,T)}const _={lightsArray:i,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:_,setupLights:d,setupLightsView:m,pushLight:r,pushShadow:o}}function Yd(t){let e=new WeakMap;function i(a,r=0){const o=e.get(a);let d;return o===void 0?(d=new ur(t),e.set(a,[d])):r>=o.length?(d=new ur(t),o.push(d)):d=o[r],d}function n(){e=new WeakMap}return{get:i,dispose:n}}class qd extends tn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=oo,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Kd extends tn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Zd extends Pi{constructor(e,i=yt,n=ri,a,r,o=ut,d=ut,m,_=zt){const T={width:e,height:e,depth:1},b=[T,T,T,T,T,T];super(e,e,i,n,a,r,o,d,m,_),this.image=b,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}const $d=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`,jd=`
uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;

void main() {

	const float samples = float( VSM_SAMPLES );

	float mean = 0.0;
	float squared_mean = 0.0;

	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {

		float uvOffset = uvStart + i * uvStride;

		#ifdef HORIZONTAL_PASS

			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;

		#else

			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;

		#endif

	}

	mean = mean / samples;
	squared_mean = squared_mean / samples;

	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );

	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );

}
`,Jd=[new ue(1,0,0),new ue(-1,0,0),new ue(0,1,0),new ue(0,-1,0),new ue(0,0,1),new ue(0,0,-1)],Qd=[new ue(0,-1,0),new ue(0,-1,0),new ue(0,0,1),new ue(0,0,-1),new ue(0,-1,0),new ue(0,-1,0)],pr=new oi,Ti=new ue,wn=new ue;function eu(t,e,i){let n=new Fr;const a=new ot,r=new ot,o=new at,d=new qd,m=new Kd,_={},T=i.maxTextureSize,b={[_i]:gt,[gt]:_i,[Ot]:Ot},p=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ot},radius:{value:4}},vertexShader:$d,fragmentShader:jd}),v=p.clone();v.defines.HORIZONTAL_PASS=1;const S=new si;S.setAttribute("position",new ji(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const L=new kt(S,p),c=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xi;let l=this.type;this.render=function(w,U,u){if(c.enabled===!1||c.autoUpdate===!1&&c.needsUpdate===!1||w.length===0)return;this.type===so&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Xi);const g=t.getRenderTarget(),K=t.getActiveCubeFace(),y=t.getActiveMipmapLevel(),V=t.state;V.setBlending(Vt),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const W=l!==this.type;W&&U.traverse(function(z){z.material&&(Array.isArray(z.material)?z.material.forEach(X=>X.needsUpdate=!0):z.material.needsUpdate=!0)});for(let z=0,X=w.length;z<X;z++){const B=w[z],F=B.shadow;if(F===void 0){Ge("WebGLShadowMap:",B,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;a.copy(F.mapSize);const ee=F.getFrameExtents();a.multiply(ee),r.copy(F.mapSize),(a.x>T||a.y>T)&&(a.x>T&&(r.x=Math.floor(T/ee.x),a.x=r.x*ee.x,F.mapSize.x=r.x),a.y>T&&(r.y=Math.floor(T/ee.y),a.y=r.y*ee.y,F.mapSize.y=r.y));const j=t.state.buffers.depth.getReversed();if(F.camera._reversedDepth=j,F.map===null||W===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Ai){if(B.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new Pt(a.x,a.y,{format:vi,type:Ht,minFilter:ht,magFilter:ht,generateMipmaps:!1}),F.map.texture.name=B.name+".shadowMap",F.map.depthTexture=new Pi(a.x,a.y,Bt),F.map.depthTexture.name=B.name+".shadowMapDepth",F.map.depthTexture.format=zt,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=ut,F.map.depthTexture.magFilter=ut}else B.isPointLight?(F.map=new zr(a.x),F.map.depthTexture=new Zd(a.x,yt)):(F.map=new Pt(a.x,a.y),F.map.depthTexture=new Pi(a.x,a.y,yt)),F.map.depthTexture.name=B.name+".shadowMap",F.map.depthTexture.format=zt,this.type===Xi?(F.map.depthTexture.compareFunction=j?ha:ma,F.map.depthTexture.minFilter=ht,F.map.depthTexture.magFilter=ht):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=ut,F.map.depthTexture.magFilter=ut);F.camera.updateProjectionMatrix()}const pe=F.map.isWebGLCubeRenderTarget?6:1;for(let Me=0;Me<pe;Me++){if(F.map.isWebGLCubeRenderTarget)t.setRenderTarget(F.map,Me),t.clear();else{Me===0&&(t.setRenderTarget(F.map),t.clear());const ce=F.getViewport(Me);o.set(r.x*ce.x,r.y*ce.y,r.x*ce.z,r.y*ce.w),V.viewport(o)}if(B.isPointLight){const ce=F.camera,Le=F.matrix,Qe=B.distance||ce.far;Qe!==ce.far&&(ce.far=Qe,ce.updateProjectionMatrix()),Ti.setFromMatrixPosition(B.matrixWorld),ce.position.copy(Ti),wn.copy(ce.position),wn.add(Jd[Me]),ce.up.copy(Qd[Me]),ce.lookAt(wn),ce.updateMatrixWorld(),Le.makeTranslation(-Ti.x,-Ti.y,-Ti.z),pr.multiplyMatrices(ce.projectionMatrix,ce.matrixWorldInverse),F._frustum.setFromProjectionMatrix(pr,ce.coordinateSystem,ce.reversedDepth)}else F.updateMatrices(B);n=F.getFrustum(),M(U,u,F.camera,B,this.type)}F.isPointLightShadow!==!0&&this.type===Ai&&x(F,u),F.needsUpdate=!1}l=this.type,c.needsUpdate=!1,t.setRenderTarget(g,K,y)};function x(w,U){const u=e.update(L);p.defines.VSM_SAMPLES!==w.blurSamples&&(p.defines.VSM_SAMPLES=w.blurSamples,v.defines.VSM_SAMPLES=w.blurSamples,p.needsUpdate=!0,v.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Pt(a.x,a.y,{format:vi,type:Ht})),p.uniforms.shadow_pass.value=w.map.depthTexture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(U,null,u,p,L,null),v.uniforms.shadow_pass.value=w.mapPass.texture,v.uniforms.resolution.value=w.mapSize,v.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(U,null,u,v,L,null)}function A(w,U,u,g){let K=null;const y=u.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(y!==void 0)K=y;else if(K=u.isPointLight===!0?m:d,t.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0||U.alphaToCoverage===!0){const V=K.uuid,W=U.uuid;let z=_[V];z===void 0&&(z={},_[V]=z);let X=z[W];X===void 0&&(X=K.clone(),z[W]=X,U.addEventListener("dispose",D)),K=X}if(K.visible=U.visible,K.wireframe=U.wireframe,g===Ai?K.side=U.shadowSide!==null?U.shadowSide:U.side:K.side=U.shadowSide!==null?U.shadowSide:b[U.side],K.alphaMap=U.alphaMap,K.alphaTest=U.alphaToCoverage===!0?.5:U.alphaTest,K.map=U.map,K.clipShadows=U.clipShadows,K.clippingPlanes=U.clippingPlanes,K.clipIntersection=U.clipIntersection,K.displacementMap=U.displacementMap,K.displacementScale=U.displacementScale,K.displacementBias=U.displacementBias,K.wireframeLinewidth=U.wireframeLinewidth,K.linewidth=U.linewidth,u.isPointLight===!0&&K.isMeshDistanceMaterial===!0){const V=t.properties.get(K);V.light=u}return K}function M(w,U,u,g,K){if(w.visible===!1)return;if(w.layers.test(U.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&K===Ai)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(u.matrixWorldInverse,w.matrixWorld);const W=e.update(w),z=w.material;if(Array.isArray(z)){const X=W.groups;for(let B=0,F=X.length;B<F;B++){const ee=X[B],j=z[ee.materialIndex];if(j&&j.visible){const pe=A(w,j,g,K);w.onBeforeShadow(t,w,U,u,W,pe,ee),t.renderBufferDirect(u,null,W,pe,w,ee),w.onAfterShadow(t,w,U,u,W,pe,ee)}}}else if(z.visible){const X=A(w,z,g,K);w.onBeforeShadow(t,w,U,u,W,X,null),t.renderBufferDirect(u,null,W,X,w,null),w.onAfterShadow(t,w,U,u,W,X,null)}}const V=w.children;for(let W=0,z=V.length;W<z;W++)M(V[W],U,u,g,K)}function D(w){w.target.removeEventListener("dispose",D);for(const u in _){const g=_[u],K=w.target.uuid;K in g&&(g[K].dispose(),delete g[K])}}}function tu(t,e){function i(){let R=!1;const ne=new at;let Q=null;const de=new at(0,0,0,0);return{setMask:function($){Q!==$&&!R&&(t.colorMask($,$,$,$),Q=$)},setLocked:function($){R=$},setClear:function($,G,_e,we,Ke){Ke===!0&&($*=we,G*=we,_e*=we),ne.set($,G,_e,we),de.equals(ne)===!1&&(t.clearColor($,G,_e,we),de.copy(ne))},reset:function(){R=!1,Q=null,de.set(-1,0,0,0)}}}function n(){let R=!1,ne=!1,Q=null,de=null,$=null;return{setReversed:function(G){if(ne!==G){const _e=e.get("EXT_clip_control");G?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),ne=G;const we=$;$=null,this.setClear(we)}},getReversed:function(){return ne},setTest:function(G){G?te(t.DEPTH_TEST):ae(t.DEPTH_TEST)},setMask:function(G){Q!==G&&!R&&(t.depthMask(G),Q=G)},setFunc:function(G){if(ne&&(G=Fo[G]),de!==G){switch(G){case Do:t.depthFunc(t.NEVER);break;case Lo:t.depthFunc(t.ALWAYS);break;case yo:t.depthFunc(t.LESS);break;case Na:t.depthFunc(t.LEQUAL);break;case Po:t.depthFunc(t.EQUAL);break;case wo:t.depthFunc(t.GEQUAL);break;case Co:t.depthFunc(t.GREATER);break;case Ro:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}de=G}},setLocked:function(G){R=G},setClear:function(G){$!==G&&($=G,ne&&(G=1-G),t.clearDepth(G))},reset:function(){R=!1,Q=null,de=null,$=null,ne=!1}}}function a(){let R=!1,ne=null,Q=null,de=null,$=null,G=null,_e=null,we=null,Ke=null;return{setTest:function(ze){R||(ze?te(t.STENCIL_TEST):ae(t.STENCIL_TEST))},setMask:function(ze){ne!==ze&&!R&&(t.stencilMask(ze),ne=ze)},setFunc:function(ze,Dt,Ut){(Q!==ze||de!==Dt||$!==Ut)&&(t.stencilFunc(ze,Dt,Ut),Q=ze,de=Dt,$=Ut)},setOp:function(ze,Dt,Ut){(G!==ze||_e!==Dt||we!==Ut)&&(t.stencilOp(ze,Dt,Ut),G=ze,_e=Dt,we=Ut)},setLocked:function(ze){R=ze},setClear:function(ze){Ke!==ze&&(t.clearStencil(ze),Ke=ze)},reset:function(){R=!1,ne=null,Q=null,de=null,$=null,G=null,_e=null,we=null,Ke=null}}}const r=new i,o=new n,d=new a,m=new WeakMap,_=new WeakMap;let T={},b={},p=new WeakMap,v=[],S=null,L=!1,c=null,l=null,x=null,A=null,M=null,D=null,w=null,U=new Je(0,0,0),u=0,g=!1,K=null,y=null,V=null,W=null,z=null;const X=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,F=0;const ee=t.getParameter(t.VERSION);ee.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(ee)[1]),B=F>=1):ee.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),B=F>=2);let j=null,pe={};const Me=t.getParameter(t.SCISSOR_BOX),ce=t.getParameter(t.VIEWPORT),Le=new at().fromArray(Me),Qe=new at().fromArray(ce);function $e(R,ne,Q,de){const $=new Uint8Array(4),G=t.createTexture();t.bindTexture(R,G),t.texParameteri(R,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(R,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let _e=0;_e<Q;_e++)R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY?t.texImage3D(ne,0,t.RGBA,1,1,de,0,t.RGBA,t.UNSIGNED_BYTE,$):t.texImage2D(ne+_e,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,$);return G}const Y={};Y[t.TEXTURE_2D]=$e(t.TEXTURE_2D,t.TEXTURE_2D,1),Y[t.TEXTURE_CUBE_MAP]=$e(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[t.TEXTURE_2D_ARRAY]=$e(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Y[t.TEXTURE_3D]=$e(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),d.setClear(0),te(t.DEPTH_TEST),o.setFunc(Na),Ue(!1),it(Fa),te(t.CULL_FACE),He(Vt);function te(R){T[R]!==!0&&(t.enable(R),T[R]=!0)}function ae(R){T[R]!==!1&&(t.disable(R),T[R]=!1)}function ye(R,ne){return b[R]!==ne?(t.bindFramebuffer(R,ne),b[R]=ne,R===t.DRAW_FRAMEBUFFER&&(b[t.FRAMEBUFFER]=ne),R===t.FRAMEBUFFER&&(b[t.DRAW_FRAMEBUFFER]=ne),!0):!1}function be(R,ne){let Q=v,de=!1;if(R){Q=p.get(ne),Q===void 0&&(Q=[],p.set(ne,Q));const $=R.textures;if(Q.length!==$.length||Q[0]!==t.COLOR_ATTACHMENT0){for(let G=0,_e=$.length;G<_e;G++)Q[G]=t.COLOR_ATTACHMENT0+G;Q.length=$.length,de=!0}}else Q[0]!==t.BACK&&(Q[0]=t.BACK,de=!0);de&&t.drawBuffers(Q)}function Ce(R){return S!==R?(t.useProgram(R),S=R,!0):!1}const ct={[Mi]:t.FUNC_ADD,[co]:t.FUNC_SUBTRACT,[lo]:t.FUNC_REVERSE_SUBTRACT};ct[Oo]=t.MIN,ct[Bo]=t.MAX;const Oe={[bo]:t.ZERO,[Ao]:t.ONE,[To]:t.SRC_COLOR,[Eo]:t.SRC_ALPHA,[Mo]:t.SRC_ALPHA_SATURATE,[So]:t.DST_COLOR,[xo]:t.DST_ALPHA,[vo]:t.ONE_MINUS_SRC_COLOR,[go]:t.ONE_MINUS_SRC_ALPHA,[_o]:t.ONE_MINUS_DST_COLOR,[mo]:t.ONE_MINUS_DST_ALPHA,[ho]:t.CONSTANT_COLOR,[po]:t.ONE_MINUS_CONSTANT_COLOR,[uo]:t.CONSTANT_ALPHA,[fo]:t.ONE_MINUS_CONSTANT_ALPHA};function He(R,ne,Q,de,$,G,_e,we,Ke,ze){if(R===Vt){L===!0&&(ae(t.BLEND),L=!1);return}if(L===!1&&(te(t.BLEND),L=!0),R!==No){if(R!==c||ze!==g){if((l!==Mi||M!==Mi)&&(t.blendEquation(t.FUNC_ADD),l=Mi,M=Mi),ze)switch(R){case Yi:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ga:t.blendFunc(t.ONE,t.ONE);break;case Ba:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Oa:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:je("WebGLState: Invalid blending: ",R);break}else switch(R){case Yi:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ga:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Ba:je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Oa:je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:je("WebGLState: Invalid blending: ",R);break}x=null,A=null,D=null,w=null,U.set(0,0,0),u=0,c=R,g=ze}return}$=$||ne,G=G||Q,_e=_e||de,(ne!==l||$!==M)&&(t.blendEquationSeparate(ct[ne],ct[$]),l=ne,M=$),(Q!==x||de!==A||G!==D||_e!==w)&&(t.blendFuncSeparate(Oe[Q],Oe[de],Oe[G],Oe[_e]),x=Q,A=de,D=G,w=_e),(we.equals(U)===!1||Ke!==u)&&(t.blendColor(we.r,we.g,we.b,Ke),U.copy(we),u=Ke),c=R,g=!1}function Xe(R,ne){R.side===Ot?ae(t.CULL_FACE):te(t.CULL_FACE);let Q=R.side===gt;ne&&(Q=!Q),Ue(Q),R.blending===Yi&&R.transparent===!1?He(Vt):He(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),o.setFunc(R.depthFunc),o.setTest(R.depthTest),o.setMask(R.depthWrite),r.setMask(R.colorWrite);const de=R.stencilWrite;d.setTest(de),de&&(d.setMask(R.stencilWriteMask),d.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),d.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),rt(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?te(t.SAMPLE_ALPHA_TO_COVERAGE):ae(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(R){K!==R&&(R?t.frontFace(t.CW):t.frontFace(t.CCW),K=R)}function it(R){R!==Uo?(te(t.CULL_FACE),R!==y&&(R===Fa?t.cullFace(t.BACK):R===Io?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ae(t.CULL_FACE),y=R}function E(R){R!==V&&(B&&t.lineWidth(R),V=R)}function rt(R,ne,Q){R?(te(t.POLYGON_OFFSET_FILL),(W!==ne||z!==Q)&&(W=ne,z=Q,o.getReversed()&&(ne=-ne),t.polygonOffset(ne,Q))):ae(t.POLYGON_OFFSET_FILL)}function Ve(R){R?te(t.SCISSOR_TEST):ae(t.SCISSOR_TEST)}function qe(R){R===void 0&&(R=t.TEXTURE0+X-1),j!==R&&(t.activeTexture(R),j=R)}function xe(R,ne,Q){Q===void 0&&(j===null?Q=t.TEXTURE0+X-1:Q=j);let de=pe[Q];de===void 0&&(de={type:void 0,texture:void 0},pe[Q]=de),(de.type!==R||de.texture!==ne)&&(j!==Q&&(t.activeTexture(Q),j=Q),t.bindTexture(R,ne||Y[R]),de.type=R,de.texture=ne)}function h(){const R=pe[j];R!==void 0&&R.type!==void 0&&(t.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function s(){try{t.compressedTexImage2D(...arguments)}catch(R){je("WebGLState:",R)}}function C(){try{t.compressedTexImage3D(...arguments)}catch(R){je("WebGLState:",R)}}function k(){try{t.texSubImage2D(...arguments)}catch(R){je("WebGLState:",R)}}function q(){try{t.texSubImage3D(...arguments)}catch(R){je("WebGLState:",R)}}function H(){try{t.compressedTexSubImage2D(...arguments)}catch(R){je("WebGLState:",R)}}function he(){try{t.compressedTexSubImage3D(...arguments)}catch(R){je("WebGLState:",R)}}function ie(){try{t.texStorage2D(...arguments)}catch(R){je("WebGLState:",R)}}function Ae(){try{t.texStorage3D(...arguments)}catch(R){je("WebGLState:",R)}}function Re(){try{t.texImage2D(...arguments)}catch(R){je("WebGLState:",R)}}function Z(){try{t.texImage3D(...arguments)}catch(R){je("WebGLState:",R)}}function J(R){Le.equals(R)===!1&&(t.scissor(R.x,R.y,R.z,R.w),Le.copy(R))}function me(R){Qe.equals(R)===!1&&(t.viewport(R.x,R.y,R.z,R.w),Qe.copy(R))}function ge(R,ne){let Q=_.get(ne);Q===void 0&&(Q=new WeakMap,_.set(ne,Q));let de=Q.get(R);de===void 0&&(de=t.getUniformBlockIndex(ne,R.name),Q.set(R,de))}function le(R,ne){const de=_.get(ne).get(R);m.get(ne)!==de&&(t.uniformBlockBinding(ne,de,R.__bindingPointIndex),m.set(ne,de))}function Ie(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),T={},j=null,pe={},b={},p=new WeakMap,v=[],S=null,L=!1,c=null,l=null,x=null,A=null,M=null,D=null,w=null,U=new Je(0,0,0),u=0,g=!1,K=null,y=null,V=null,W=null,z=null,Le.set(0,0,t.canvas.width,t.canvas.height),Qe.set(0,0,t.canvas.width,t.canvas.height),r.reset(),o.reset(),d.reset()}return{buffers:{color:r,depth:o,stencil:d},enable:te,disable:ae,bindFramebuffer:ye,drawBuffers:be,useProgram:Ce,setBlending:He,setMaterial:Xe,setFlipSided:Ue,setCullFace:it,setLineWidth:E,setPolygonOffset:rt,setScissorTest:Ve,activeTexture:qe,bindTexture:xe,unbindTexture:h,compressedTexImage2D:s,compressedTexImage3D:C,texImage2D:Re,texImage3D:Z,updateUBOMapping:ge,uniformBlockBinding:le,texStorage2D:ie,texStorage3D:Ae,texSubImage2D:k,texSubImage3D:q,compressedTexSubImage2D:H,compressedTexSubImage3D:he,scissor:J,viewport:me,reset:Ie}}function hr(t,e,i,n){const a=iu(n);switch(i){case yr:return t*e;case Pr:return t*e/a.components*a.byteLength;case va:return t*e/a.components*a.byteLength;case vi:return t*e*2/a.components*a.byteLength;case ga:return t*e*2/a.components*a.byteLength;case wr:return t*e*3/a.components*a.byteLength;case At:return t*e*4/a.components*a.byteLength;case _a:return t*e*4/a.components*a.byteLength;case $i:case Zi:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Ki:case qi:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case fa:case ca:return Math.max(t,16)*Math.max(e,8)/4;case la:case sa:return Math.max(t,8)*Math.max(e,8)/2;case oa:case ra:case aa:case na:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case ia:case ta:case ea:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Qn:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Jn:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case jn:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case $n:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Zn:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Kn:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case qn:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Yn:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Xn:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Wn:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case kn:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case zn:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Hn:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Vn:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Gn:case Bn:case On:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Fn:case Nn:return Math.ceil(t/4)*Math.ceil(e/4)*8;case In:case Un:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function iu(t){switch(t){case xt:case Ir:return{byteLength:1,components:1};case Ci:case Ur:case Ht:return{byteLength:2,components:1};case Sa:case xa:return{byteLength:2,components:4};case yt:case pa:case Bt:return{byteLength:4,components:1};case Dr:case Lr:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function nu(t,e,i,n,a,r,o){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new ot,T=new WeakMap;let b;const p=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(h,s){return v?new OffscreenCanvas(h,s):yn("canvas")}function L(h,s,C){let k=1;const q=xe(h);if((q.width>C||q.height>C)&&(k=C/Math.max(q.width,q.height)),k<1)if(typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&h instanceof ImageBitmap||typeof VideoFrame<"u"&&h instanceof VideoFrame){const H=Math.floor(k*q.width),he=Math.floor(k*q.height);b===void 0&&(b=S(H,he));const ie=s?S(H,he):b;return ie.width=H,ie.height=he,ie.getContext("2d").drawImage(h,0,0,H,he),Ge("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+H+"x"+he+")."),ie}else return"data"in h&&Ge("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),h;return h}function c(h){return h.generateMipmaps}function l(h){t.generateMipmap(h)}function x(h){return h.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:h.isWebGL3DRenderTarget?t.TEXTURE_3D:h.isWebGLArrayRenderTarget||h.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function A(h,s,C,k,q=!1){if(h!==null){if(t[h]!==void 0)return t[h];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+h+"'")}let H=s;if(s===t.RED&&(C===t.FLOAT&&(H=t.R32F),C===t.HALF_FLOAT&&(H=t.R16F),C===t.UNSIGNED_BYTE&&(H=t.R8)),s===t.RED_INTEGER&&(C===t.UNSIGNED_BYTE&&(H=t.R8UI),C===t.UNSIGNED_SHORT&&(H=t.R16UI),C===t.UNSIGNED_INT&&(H=t.R32UI),C===t.BYTE&&(H=t.R8I),C===t.SHORT&&(H=t.R16I),C===t.INT&&(H=t.R32I)),s===t.RG&&(C===t.FLOAT&&(H=t.RG32F),C===t.HALF_FLOAT&&(H=t.RG16F),C===t.UNSIGNED_BYTE&&(H=t.RG8)),s===t.RG_INTEGER&&(C===t.UNSIGNED_BYTE&&(H=t.RG8UI),C===t.UNSIGNED_SHORT&&(H=t.RG16UI),C===t.UNSIGNED_INT&&(H=t.RG32UI),C===t.BYTE&&(H=t.RG8I),C===t.SHORT&&(H=t.RG16I),C===t.INT&&(H=t.RG32I)),s===t.RGB_INTEGER&&(C===t.UNSIGNED_BYTE&&(H=t.RGB8UI),C===t.UNSIGNED_SHORT&&(H=t.RGB16UI),C===t.UNSIGNED_INT&&(H=t.RGB32UI),C===t.BYTE&&(H=t.RGB8I),C===t.SHORT&&(H=t.RGB16I),C===t.INT&&(H=t.RGB32I)),s===t.RGBA_INTEGER&&(C===t.UNSIGNED_BYTE&&(H=t.RGBA8UI),C===t.UNSIGNED_SHORT&&(H=t.RGBA16UI),C===t.UNSIGNED_INT&&(H=t.RGBA32UI),C===t.BYTE&&(H=t.RGBA8I),C===t.SHORT&&(H=t.RGBA16I),C===t.INT&&(H=t.RGBA32I)),s===t.RGB&&(C===t.UNSIGNED_INT_5_9_9_9_REV&&(H=t.RGB9_E5),C===t.UNSIGNED_INT_10F_11F_11F_REV&&(H=t.R11F_G11F_B10F)),s===t.RGBA){const he=q?Cr:tt.getTransfer(k);C===t.FLOAT&&(H=t.RGBA32F),C===t.HALF_FLOAT&&(H=t.RGBA16F),C===t.UNSIGNED_BYTE&&(H=he===Ze?t.SRGB8_ALPHA8:t.RGBA8),C===t.UNSIGNED_SHORT_4_4_4_4&&(H=t.RGBA4),C===t.UNSIGNED_SHORT_5_5_5_1&&(H=t.RGB5_A1)}return(H===t.R16F||H===t.R32F||H===t.RG16F||H===t.RG32F||H===t.RGBA16F||H===t.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function M(h,s){let C;return h?s===null||s===yt||s===wi?C=t.DEPTH24_STENCIL8:s===Bt?C=t.DEPTH32F_STENCIL8:s===Ci&&(C=t.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):s===null||s===yt||s===wi?C=t.DEPTH_COMPONENT24:s===Bt?C=t.DEPTH_COMPONENT32F:s===Ci&&(C=t.DEPTH_COMPONENT16),C}function D(h,s){return c(h)===!0||h.isFramebufferTexture&&h.minFilter!==ut&&h.minFilter!==ht?Math.log2(Math.max(s.width,s.height))+1:h.mipmaps!==void 0&&h.mipmaps.length>0?h.mipmaps.length:h.isCompressedTexture&&Array.isArray(h.image)?s.mipmaps.length:1}function w(h){const s=h.target;s.removeEventListener("dispose",w),u(s),s.isVideoTexture&&T.delete(s)}function U(h){const s=h.target;s.removeEventListener("dispose",U),K(s)}function u(h){const s=n.get(h);if(s.__webglInit===void 0)return;const C=h.source,k=p.get(C);if(k){const q=k[s.__cacheKey];q.usedTimes--,q.usedTimes===0&&g(h),Object.keys(k).length===0&&p.delete(C)}n.remove(h)}function g(h){const s=n.get(h);t.deleteTexture(s.__webglTexture);const C=h.source,k=p.get(C);delete k[s.__cacheKey],o.memory.textures--}function K(h){const s=n.get(h);if(h.depthTexture&&(h.depthTexture.dispose(),n.remove(h.depthTexture)),h.isWebGLCubeRenderTarget)for(let k=0;k<6;k++){if(Array.isArray(s.__webglFramebuffer[k]))for(let q=0;q<s.__webglFramebuffer[k].length;q++)t.deleteFramebuffer(s.__webglFramebuffer[k][q]);else t.deleteFramebuffer(s.__webglFramebuffer[k]);s.__webglDepthbuffer&&t.deleteRenderbuffer(s.__webglDepthbuffer[k])}else{if(Array.isArray(s.__webglFramebuffer))for(let k=0;k<s.__webglFramebuffer.length;k++)t.deleteFramebuffer(s.__webglFramebuffer[k]);else t.deleteFramebuffer(s.__webglFramebuffer);if(s.__webglDepthbuffer&&t.deleteRenderbuffer(s.__webglDepthbuffer),s.__webglMultisampledFramebuffer&&t.deleteFramebuffer(s.__webglMultisampledFramebuffer),s.__webglColorRenderbuffer)for(let k=0;k<s.__webglColorRenderbuffer.length;k++)s.__webglColorRenderbuffer[k]&&t.deleteRenderbuffer(s.__webglColorRenderbuffer[k]);s.__webglDepthRenderbuffer&&t.deleteRenderbuffer(s.__webglDepthRenderbuffer)}const C=h.textures;for(let k=0,q=C.length;k<q;k++){const H=n.get(C[k]);H.__webglTexture&&(t.deleteTexture(H.__webglTexture),o.memory.textures--),n.remove(C[k])}n.remove(h)}let y=0;function V(){y=0}function W(){const h=y;return h>=a.maxTextures&&Ge("WebGLTextures: Trying to use "+h+" texture units while this GPU supports only "+a.maxTextures),y+=1,h}function z(h){const s=[];return s.push(h.wrapS),s.push(h.wrapT),s.push(h.wrapR||0),s.push(h.magFilter),s.push(h.minFilter),s.push(h.anisotropy),s.push(h.internalFormat),s.push(h.format),s.push(h.type),s.push(h.generateMipmaps),s.push(h.premultiplyAlpha),s.push(h.flipY),s.push(h.unpackAlignment),s.push(h.colorSpace),s.join()}function X(h,s){const C=n.get(h);if(h.isVideoTexture&&Ve(h),h.isRenderTargetTexture===!1&&h.isExternalTexture!==!0&&h.version>0&&C.__version!==h.version){const k=h.image;if(k===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(k.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(C,h,s);return}}else h.isExternalTexture&&(C.__webglTexture=h.sourceTexture?h.sourceTexture:null);i.bindTexture(t.TEXTURE_2D,C.__webglTexture,t.TEXTURE0+s)}function B(h,s){const C=n.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&C.__version!==h.version){Y(C,h,s);return}else h.isExternalTexture&&(C.__webglTexture=h.sourceTexture?h.sourceTexture:null);i.bindTexture(t.TEXTURE_2D_ARRAY,C.__webglTexture,t.TEXTURE0+s)}function F(h,s){const C=n.get(h);if(h.isRenderTargetTexture===!1&&h.version>0&&C.__version!==h.version){Y(C,h,s);return}i.bindTexture(t.TEXTURE_3D,C.__webglTexture,t.TEXTURE0+s)}function ee(h,s){const C=n.get(h);if(h.isCubeDepthTexture!==!0&&h.version>0&&C.__version!==h.version){te(C,h,s);return}i.bindTexture(t.TEXTURE_CUBE_MAP,C.__webglTexture,t.TEXTURE0+s)}const j={[Dn]:t.REPEAT,[Gt]:t.CLAMP_TO_EDGE,[Ln]:t.MIRRORED_REPEAT},pe={[ut]:t.NEAREST,[Go]:t.NEAREST_MIPMAP_NEAREST,[Ui]:t.NEAREST_MIPMAP_LINEAR,[ht]:t.LINEAR,[fn]:t.LINEAR_MIPMAP_NEAREST,[ni]:t.LINEAR_MIPMAP_LINEAR},Me={[Xo]:t.NEVER,[Wo]:t.ALWAYS,[ko]:t.LESS,[ma]:t.LEQUAL,[zo]:t.EQUAL,[ha]:t.GEQUAL,[Ho]:t.GREATER,[Vo]:t.NOTEQUAL};function ce(h,s){if(s.type===Bt&&e.has("OES_texture_float_linear")===!1&&(s.magFilter===ht||s.magFilter===fn||s.magFilter===Ui||s.magFilter===ni||s.minFilter===ht||s.minFilter===fn||s.minFilter===Ui||s.minFilter===ni)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(h,t.TEXTURE_WRAP_S,j[s.wrapS]),t.texParameteri(h,t.TEXTURE_WRAP_T,j[s.wrapT]),(h===t.TEXTURE_3D||h===t.TEXTURE_2D_ARRAY)&&t.texParameteri(h,t.TEXTURE_WRAP_R,j[s.wrapR]),t.texParameteri(h,t.TEXTURE_MAG_FILTER,pe[s.magFilter]),t.texParameteri(h,t.TEXTURE_MIN_FILTER,pe[s.minFilter]),s.compareFunction&&(t.texParameteri(h,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(h,t.TEXTURE_COMPARE_FUNC,Me[s.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(s.magFilter===ut||s.minFilter!==Ui&&s.minFilter!==ni||s.type===Bt&&e.has("OES_texture_float_linear")===!1)return;if(s.anisotropy>1||n.get(s).__currentAnisotropy){const C=e.get("EXT_texture_filter_anisotropic");t.texParameterf(h,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(s.anisotropy,a.getMaxAnisotropy())),n.get(s).__currentAnisotropy=s.anisotropy}}}function Le(h,s){let C=!1;h.__webglInit===void 0&&(h.__webglInit=!0,s.addEventListener("dispose",w));const k=s.source;let q=p.get(k);q===void 0&&(q={},p.set(k,q));const H=z(s);if(H!==h.__cacheKey){q[H]===void 0&&(q[H]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,C=!0),q[H].usedTimes++;const he=q[h.__cacheKey];he!==void 0&&(q[h.__cacheKey].usedTimes--,he.usedTimes===0&&g(s)),h.__cacheKey=H,h.__webglTexture=q[H].texture}return C}function Qe(h,s,C){return Math.floor(Math.floor(h/C)/s)}function $e(h,s,C,k){const H=h.updateRanges;if(H.length===0)i.texSubImage2D(t.TEXTURE_2D,0,0,0,s.width,s.height,C,k,s.data);else{H.sort((Z,J)=>Z.start-J.start);let he=0;for(let Z=1;Z<H.length;Z++){const J=H[he],me=H[Z],ge=J.start+J.count,le=Qe(me.start,s.width,4),Ie=Qe(J.start,s.width,4);me.start<=ge+1&&le===Ie&&Qe(me.start+me.count-1,s.width,4)===le?J.count=Math.max(J.count,me.start+me.count-J.start):(++he,H[he]=me)}H.length=he+1;const ie=t.getParameter(t.UNPACK_ROW_LENGTH),Ae=t.getParameter(t.UNPACK_SKIP_PIXELS),Re=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,s.width);for(let Z=0,J=H.length;Z<J;Z++){const me=H[Z],ge=Math.floor(me.start/4),le=Math.ceil(me.count/4),Ie=ge%s.width,R=Math.floor(ge/s.width),ne=le,Q=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,Ie),t.pixelStorei(t.UNPACK_SKIP_ROWS,R),i.texSubImage2D(t.TEXTURE_2D,0,Ie,R,ne,Q,C,k,s.data)}h.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,ie),t.pixelStorei(t.UNPACK_SKIP_PIXELS,Ae),t.pixelStorei(t.UNPACK_SKIP_ROWS,Re)}}function Y(h,s,C){let k=t.TEXTURE_2D;(s.isDataArrayTexture||s.isCompressedArrayTexture)&&(k=t.TEXTURE_2D_ARRAY),s.isData3DTexture&&(k=t.TEXTURE_3D);const q=Le(h,s),H=s.source;i.bindTexture(k,h.__webglTexture,t.TEXTURE0+C);const he=n.get(H);if(H.version!==he.__version||q===!0){i.activeTexture(t.TEXTURE0+C);const ie=tt.getPrimaries(tt.workingColorSpace),Ae=s.colorSpace===ti?null:tt.getPrimaries(s.colorSpace),Re=s.colorSpace===ti||ie===Ae?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,s.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,s.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);let Z=L(s.image,!1,a.maxTextureSize);Z=qe(s,Z);const J=r.convert(s.format,s.colorSpace),me=r.convert(s.type);let ge=A(s.internalFormat,J,me,s.colorSpace,s.isVideoTexture);ce(k,s);let le;const Ie=s.mipmaps,R=s.isVideoTexture!==!0,ne=he.__version===void 0||q===!0,Q=H.dataReady,de=D(s,Z);if(s.isDepthTexture)ge=M(s.format===ai,s.type),ne&&(R?i.texStorage2D(t.TEXTURE_2D,1,ge,Z.width,Z.height):i.texImage2D(t.TEXTURE_2D,0,ge,Z.width,Z.height,0,J,me,null));else if(s.isDataTexture)if(Ie.length>0){R&&ne&&i.texStorage2D(t.TEXTURE_2D,de,ge,Ie[0].width,Ie[0].height);for(let $=0,G=Ie.length;$<G;$++)le=Ie[$],R?Q&&i.texSubImage2D(t.TEXTURE_2D,$,0,0,le.width,le.height,J,me,le.data):i.texImage2D(t.TEXTURE_2D,$,ge,le.width,le.height,0,J,me,le.data);s.generateMipmaps=!1}else R?(ne&&i.texStorage2D(t.TEXTURE_2D,de,ge,Z.width,Z.height),Q&&$e(s,Z,J,me)):i.texImage2D(t.TEXTURE_2D,0,ge,Z.width,Z.height,0,J,me,Z.data);else if(s.isCompressedTexture)if(s.isCompressedArrayTexture){R&&ne&&i.texStorage3D(t.TEXTURE_2D_ARRAY,de,ge,Ie[0].width,Ie[0].height,Z.depth);for(let $=0,G=Ie.length;$<G;$++)if(le=Ie[$],s.format!==At)if(J!==null)if(R){if(Q)if(s.layerUpdates.size>0){const _e=hr(le.width,le.height,s.format,s.type);for(const we of s.layerUpdates){const Ke=le.data.subarray(we*_e/le.data.BYTES_PER_ELEMENT,(we+1)*_e/le.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,we,le.width,le.height,1,J,Ke)}s.clearLayerUpdates()}else i.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,0,le.width,le.height,Z.depth,J,le.data)}else i.compressedTexImage3D(t.TEXTURE_2D_ARRAY,$,ge,le.width,le.height,Z.depth,0,le.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?Q&&i.texSubImage3D(t.TEXTURE_2D_ARRAY,$,0,0,0,le.width,le.height,Z.depth,J,me,le.data):i.texImage3D(t.TEXTURE_2D_ARRAY,$,ge,le.width,le.height,Z.depth,0,J,me,le.data)}else{R&&ne&&i.texStorage2D(t.TEXTURE_2D,de,ge,Ie[0].width,Ie[0].height);for(let $=0,G=Ie.length;$<G;$++)le=Ie[$],s.format!==At?J!==null?R?Q&&i.compressedTexSubImage2D(t.TEXTURE_2D,$,0,0,le.width,le.height,J,le.data):i.compressedTexImage2D(t.TEXTURE_2D,$,ge,le.width,le.height,0,le.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?Q&&i.texSubImage2D(t.TEXTURE_2D,$,0,0,le.width,le.height,J,me,le.data):i.texImage2D(t.TEXTURE_2D,$,ge,le.width,le.height,0,J,me,le.data)}else if(s.isDataArrayTexture)if(R){if(ne&&i.texStorage3D(t.TEXTURE_2D_ARRAY,de,ge,Z.width,Z.height,Z.depth),Q)if(s.layerUpdates.size>0){const $=hr(Z.width,Z.height,s.format,s.type);for(const G of s.layerUpdates){const _e=Z.data.subarray(G*$/Z.data.BYTES_PER_ELEMENT,(G+1)*$/Z.data.BYTES_PER_ELEMENT);i.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,G,Z.width,Z.height,1,J,me,_e)}s.clearLayerUpdates()}else i.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,J,me,Z.data)}else i.texImage3D(t.TEXTURE_2D_ARRAY,0,ge,Z.width,Z.height,Z.depth,0,J,me,Z.data);else if(s.isData3DTexture)R?(ne&&i.texStorage3D(t.TEXTURE_3D,de,ge,Z.width,Z.height,Z.depth),Q&&i.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,J,me,Z.data)):i.texImage3D(t.TEXTURE_3D,0,ge,Z.width,Z.height,Z.depth,0,J,me,Z.data);else if(s.isFramebufferTexture){if(ne)if(R)i.texStorage2D(t.TEXTURE_2D,de,ge,Z.width,Z.height);else{let $=Z.width,G=Z.height;for(let _e=0;_e<de;_e++)i.texImage2D(t.TEXTURE_2D,_e,ge,$,G,0,J,me,null),$>>=1,G>>=1}}else if(Ie.length>0){if(R&&ne){const $=xe(Ie[0]);i.texStorage2D(t.TEXTURE_2D,de,ge,$.width,$.height)}for(let $=0,G=Ie.length;$<G;$++)le=Ie[$],R?Q&&i.texSubImage2D(t.TEXTURE_2D,$,0,0,J,me,le):i.texImage2D(t.TEXTURE_2D,$,ge,J,me,le);s.generateMipmaps=!1}else if(R){if(ne){const $=xe(Z);i.texStorage2D(t.TEXTURE_2D,de,ge,$.width,$.height)}Q&&i.texSubImage2D(t.TEXTURE_2D,0,0,0,J,me,Z)}else i.texImage2D(t.TEXTURE_2D,0,ge,J,me,Z);c(s)&&l(k),he.__version=H.version,s.onUpdate&&s.onUpdate(s)}h.__version=s.version}function te(h,s,C){if(s.image.length!==6)return;const k=Le(h,s),q=s.source;i.bindTexture(t.TEXTURE_CUBE_MAP,h.__webglTexture,t.TEXTURE0+C);const H=n.get(q);if(q.version!==H.__version||k===!0){i.activeTexture(t.TEXTURE0+C);const he=tt.getPrimaries(tt.workingColorSpace),ie=s.colorSpace===ti?null:tt.getPrimaries(s.colorSpace),Ae=s.colorSpace===ti||he===ie?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,s.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,s.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,s.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const Re=s.isCompressedTexture||s.image[0].isCompressedTexture,Z=s.image[0]&&s.image[0].isDataTexture,J=[];for(let G=0;G<6;G++)!Re&&!Z?J[G]=L(s.image[G],!0,a.maxCubemapSize):J[G]=Z?s.image[G].image:s.image[G],J[G]=qe(s,J[G]);const me=J[0],ge=r.convert(s.format,s.colorSpace),le=r.convert(s.type),Ie=A(s.internalFormat,ge,le,s.colorSpace),R=s.isVideoTexture!==!0,ne=H.__version===void 0||k===!0,Q=q.dataReady;let de=D(s,me);ce(t.TEXTURE_CUBE_MAP,s);let $;if(Re){R&&ne&&i.texStorage2D(t.TEXTURE_CUBE_MAP,de,Ie,me.width,me.height);for(let G=0;G<6;G++){$=J[G].mipmaps;for(let _e=0;_e<$.length;_e++){const we=$[_e];s.format!==At?ge!==null?R?Q&&i.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,_e,0,0,we.width,we.height,ge,we.data):i.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,_e,Ie,we.width,we.height,0,we.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?Q&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,_e,0,0,we.width,we.height,ge,le,we.data):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,_e,Ie,we.width,we.height,0,ge,le,we.data)}}}else{if($=s.mipmaps,R&&ne){$.length>0&&de++;const G=xe(J[0]);i.texStorage2D(t.TEXTURE_CUBE_MAP,de,Ie,G.width,G.height)}for(let G=0;G<6;G++)if(Z){R?Q&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,J[G].width,J[G].height,ge,le,J[G].data):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Ie,J[G].width,J[G].height,0,ge,le,J[G].data);for(let _e=0;_e<$.length;_e++){const Ke=$[_e].image[G].image;R?Q&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,_e+1,0,0,Ke.width,Ke.height,ge,le,Ke.data):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,_e+1,Ie,Ke.width,Ke.height,0,ge,le,Ke.data)}}else{R?Q&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,ge,le,J[G]):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Ie,ge,le,J[G]);for(let _e=0;_e<$.length;_e++){const we=$[_e];R?Q&&i.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,_e+1,0,0,ge,le,we.image[G]):i.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,_e+1,Ie,ge,le,we.image[G])}}}c(s)&&l(t.TEXTURE_CUBE_MAP),H.__version=q.version,s.onUpdate&&s.onUpdate(s)}h.__version=s.version}function ae(h,s,C,k,q,H){const he=r.convert(C.format,C.colorSpace),ie=r.convert(C.type),Ae=A(C.internalFormat,he,ie,C.colorSpace),Re=n.get(s),Z=n.get(C);if(Z.__renderTarget=s,!Re.__hasExternalTextures){const J=Math.max(1,s.width>>H),me=Math.max(1,s.height>>H);q===t.TEXTURE_3D||q===t.TEXTURE_2D_ARRAY?i.texImage3D(q,H,Ae,J,me,s.depth,0,he,ie,null):i.texImage2D(q,H,Ae,J,me,0,he,ie,null)}i.bindFramebuffer(t.FRAMEBUFFER,h),rt(s)?d.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,k,q,Z.__webglTexture,0,E(s)):(q===t.TEXTURE_2D||q>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,k,q,Z.__webglTexture,H),i.bindFramebuffer(t.FRAMEBUFFER,null)}function ye(h,s,C){if(t.bindRenderbuffer(t.RENDERBUFFER,h),s.depthBuffer){const k=s.depthTexture,q=k&&k.isDepthTexture?k.type:null,H=M(s.stencilBuffer,q),he=s.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;rt(s)?d.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,E(s),H,s.width,s.height):C?t.renderbufferStorageMultisample(t.RENDERBUFFER,E(s),H,s.width,s.height):t.renderbufferStorage(t.RENDERBUFFER,H,s.width,s.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,he,t.RENDERBUFFER,h)}else{const k=s.textures;for(let q=0;q<k.length;q++){const H=k[q],he=r.convert(H.format,H.colorSpace),ie=r.convert(H.type),Ae=A(H.internalFormat,he,ie,H.colorSpace);rt(s)?d.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,E(s),Ae,s.width,s.height):C?t.renderbufferStorageMultisample(t.RENDERBUFFER,E(s),Ae,s.width,s.height):t.renderbufferStorage(t.RENDERBUFFER,Ae,s.width,s.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function be(h,s,C){const k=s.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(t.FRAMEBUFFER,h),!(s.depthTexture&&s.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=n.get(s.depthTexture);if(q.__renderTarget=s,(!q.__webglTexture||s.depthTexture.image.width!==s.width||s.depthTexture.image.height!==s.height)&&(s.depthTexture.image.width=s.width,s.depthTexture.image.height=s.height,s.depthTexture.needsUpdate=!0),k){if(q.__webglInit===void 0&&(q.__webglInit=!0,s.depthTexture.addEventListener("dispose",w)),q.__webglTexture===void 0){q.__webglTexture=t.createTexture(),i.bindTexture(t.TEXTURE_CUBE_MAP,q.__webglTexture),ce(t.TEXTURE_CUBE_MAP,s.depthTexture);const Re=r.convert(s.depthTexture.format),Z=r.convert(s.depthTexture.type);let J;s.depthTexture.format===zt?J=t.DEPTH_COMPONENT24:s.depthTexture.format===ai&&(J=t.DEPTH24_STENCIL8);for(let me=0;me<6;me++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,J,s.width,s.height,0,Re,Z,null)}}else X(s.depthTexture,0);const H=q.__webglTexture,he=E(s),ie=k?t.TEXTURE_CUBE_MAP_POSITIVE_X+C:t.TEXTURE_2D,Ae=s.depthTexture.format===ai?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(s.depthTexture.format===zt)rt(s)?d.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Ae,ie,H,0,he):t.framebufferTexture2D(t.FRAMEBUFFER,Ae,ie,H,0);else if(s.depthTexture.format===ai)rt(s)?d.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Ae,ie,H,0,he):t.framebufferTexture2D(t.FRAMEBUFFER,Ae,ie,H,0);else throw new Error("Unknown depthTexture format")}function Ce(h){const s=n.get(h),C=h.isWebGLCubeRenderTarget===!0;if(s.__boundDepthTexture!==h.depthTexture){const k=h.depthTexture;if(s.__depthDisposeCallback&&s.__depthDisposeCallback(),k){const q=()=>{delete s.__boundDepthTexture,delete s.__depthDisposeCallback,k.removeEventListener("dispose",q)};k.addEventListener("dispose",q),s.__depthDisposeCallback=q}s.__boundDepthTexture=k}if(h.depthTexture&&!s.__autoAllocateDepthBuffer)if(C)for(let k=0;k<6;k++)be(s.__webglFramebuffer[k],h,k);else{const k=h.texture.mipmaps;k&&k.length>0?be(s.__webglFramebuffer[0],h,0):be(s.__webglFramebuffer,h,0)}else if(C){s.__webglDepthbuffer=[];for(let k=0;k<6;k++)if(i.bindFramebuffer(t.FRAMEBUFFER,s.__webglFramebuffer[k]),s.__webglDepthbuffer[k]===void 0)s.__webglDepthbuffer[k]=t.createRenderbuffer(),ye(s.__webglDepthbuffer[k],h,!1);else{const q=h.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,H=s.__webglDepthbuffer[k];t.bindRenderbuffer(t.RENDERBUFFER,H),t.framebufferRenderbuffer(t.FRAMEBUFFER,q,t.RENDERBUFFER,H)}}else{const k=h.texture.mipmaps;if(k&&k.length>0?i.bindFramebuffer(t.FRAMEBUFFER,s.__webglFramebuffer[0]):i.bindFramebuffer(t.FRAMEBUFFER,s.__webglFramebuffer),s.__webglDepthbuffer===void 0)s.__webglDepthbuffer=t.createRenderbuffer(),ye(s.__webglDepthbuffer,h,!1);else{const q=h.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,H=s.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,H),t.framebufferRenderbuffer(t.FRAMEBUFFER,q,t.RENDERBUFFER,H)}}i.bindFramebuffer(t.FRAMEBUFFER,null)}function ct(h,s,C){const k=n.get(h);s!==void 0&&ae(k.__webglFramebuffer,h,h.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),C!==void 0&&Ce(h)}function Oe(h){const s=h.texture,C=n.get(h),k=n.get(s);h.addEventListener("dispose",U);const q=h.textures,H=h.isWebGLCubeRenderTarget===!0,he=q.length>1;if(he||(k.__webglTexture===void 0&&(k.__webglTexture=t.createTexture()),k.__version=s.version,o.memory.textures++),H){C.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(s.mipmaps&&s.mipmaps.length>0){C.__webglFramebuffer[ie]=[];for(let Ae=0;Ae<s.mipmaps.length;Ae++)C.__webglFramebuffer[ie][Ae]=t.createFramebuffer()}else C.__webglFramebuffer[ie]=t.createFramebuffer()}else{if(s.mipmaps&&s.mipmaps.length>0){C.__webglFramebuffer=[];for(let ie=0;ie<s.mipmaps.length;ie++)C.__webglFramebuffer[ie]=t.createFramebuffer()}else C.__webglFramebuffer=t.createFramebuffer();if(he)for(let ie=0,Ae=q.length;ie<Ae;ie++){const Re=n.get(q[ie]);Re.__webglTexture===void 0&&(Re.__webglTexture=t.createTexture(),o.memory.textures++)}if(h.samples>0&&rt(h)===!1){C.__webglMultisampledFramebuffer=t.createFramebuffer(),C.__webglColorRenderbuffer=[],i.bindFramebuffer(t.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let ie=0;ie<q.length;ie++){const Ae=q[ie];C.__webglColorRenderbuffer[ie]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,C.__webglColorRenderbuffer[ie]);const Re=r.convert(Ae.format,Ae.colorSpace),Z=r.convert(Ae.type),J=A(Ae.internalFormat,Re,Z,Ae.colorSpace,h.isXRRenderTarget===!0),me=E(h);t.renderbufferStorageMultisample(t.RENDERBUFFER,me,J,h.width,h.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,C.__webglColorRenderbuffer[ie])}t.bindRenderbuffer(t.RENDERBUFFER,null),h.depthBuffer&&(C.__webglDepthRenderbuffer=t.createRenderbuffer(),ye(C.__webglDepthRenderbuffer,h,!0)),i.bindFramebuffer(t.FRAMEBUFFER,null)}}if(H){i.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture),ce(t.TEXTURE_CUBE_MAP,s);for(let ie=0;ie<6;ie++)if(s.mipmaps&&s.mipmaps.length>0)for(let Ae=0;Ae<s.mipmaps.length;Ae++)ae(C.__webglFramebuffer[ie][Ae],h,s,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ae);else ae(C.__webglFramebuffer[ie],h,s,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);c(s)&&l(t.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(he){for(let ie=0,Ae=q.length;ie<Ae;ie++){const Re=q[ie],Z=n.get(Re);let J=t.TEXTURE_2D;(h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(J=h.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),i.bindTexture(J,Z.__webglTexture),ce(J,Re),ae(C.__webglFramebuffer,h,Re,t.COLOR_ATTACHMENT0+ie,J,0),c(Re)&&l(J)}i.unbindTexture()}else{let ie=t.TEXTURE_2D;if((h.isWebGL3DRenderTarget||h.isWebGLArrayRenderTarget)&&(ie=h.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),i.bindTexture(ie,k.__webglTexture),ce(ie,s),s.mipmaps&&s.mipmaps.length>0)for(let Ae=0;Ae<s.mipmaps.length;Ae++)ae(C.__webglFramebuffer[Ae],h,s,t.COLOR_ATTACHMENT0,ie,Ae);else ae(C.__webglFramebuffer,h,s,t.COLOR_ATTACHMENT0,ie,0);c(s)&&l(ie),i.unbindTexture()}h.depthBuffer&&Ce(h)}function He(h){const s=h.textures;for(let C=0,k=s.length;C<k;C++){const q=s[C];if(c(q)){const H=x(h),he=n.get(q).__webglTexture;i.bindTexture(H,he),l(H),i.unbindTexture()}}}const Xe=[],Ue=[];function it(h){if(h.samples>0){if(rt(h)===!1){const s=h.textures,C=h.width,k=h.height;let q=t.COLOR_BUFFER_BIT;const H=h.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,he=n.get(h),ie=s.length>1;if(ie)for(let Re=0;Re<s.length;Re++)i.bindFramebuffer(t.FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Re,t.RENDERBUFFER,null),i.bindFramebuffer(t.FRAMEBUFFER,he.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Re,t.TEXTURE_2D,null,0);i.bindFramebuffer(t.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);const Ae=h.texture.mipmaps;Ae&&Ae.length>0?i.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):i.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let Re=0;Re<s.length;Re++){if(h.resolveDepthBuffer&&(h.depthBuffer&&(q|=t.DEPTH_BUFFER_BIT),h.stencilBuffer&&h.resolveStencilBuffer&&(q|=t.STENCIL_BUFFER_BIT)),ie){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,he.__webglColorRenderbuffer[Re]);const Z=n.get(s[Re]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Z,0)}t.blitFramebuffer(0,0,C,k,0,0,C,k,q,t.NEAREST),m===!0&&(Xe.length=0,Ue.length=0,Xe.push(t.COLOR_ATTACHMENT0+Re),h.depthBuffer&&h.resolveDepthBuffer===!1&&(Xe.push(H),Ue.push(H),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ue)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Xe))}if(i.bindFramebuffer(t.READ_FRAMEBUFFER,null),i.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ie)for(let Re=0;Re<s.length;Re++){i.bindFramebuffer(t.FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Re,t.RENDERBUFFER,he.__webglColorRenderbuffer[Re]);const Z=n.get(s[Re]).__webglTexture;i.bindFramebuffer(t.FRAMEBUFFER,he.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Re,t.TEXTURE_2D,Z,0)}i.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(h.depthBuffer&&h.resolveDepthBuffer===!1&&m){const s=h.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[s])}}}function E(h){return Math.min(a.maxSamples,h.samples)}function rt(h){const s=n.get(h);return h.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&s.__useRenderToTexture!==!1}function Ve(h){const s=o.render.frame;T.get(h)!==s&&(T.set(h,s),h.update())}function qe(h,s){const C=h.colorSpace,k=h.format,q=h.type;return h.isCompressedTexture===!0||h.isVideoTexture===!0||C!==en&&C!==ti&&(tt.getTransfer(C)===Ze?(k!==At||q!==xt)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):je("WebGLTextures: Unsupported texture color space:",C)),s}function xe(h){return typeof HTMLImageElement<"u"&&h instanceof HTMLImageElement?(_.width=h.naturalWidth||h.width,_.height=h.naturalHeight||h.height):typeof VideoFrame<"u"&&h instanceof VideoFrame?(_.width=h.displayWidth,_.height=h.displayHeight):(_.width=h.width,_.height=h.height),_}this.allocateTextureUnit=W,this.resetTextureUnits=V,this.setTexture2D=X,this.setTexture2DArray=B,this.setTexture3D=F,this.setTextureCube=ee,this.rebindTextures=ct,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=He,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ae,this.useMultisampledRTT=rt,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function au(t,e){function i(n,a=ti){let r;const o=tt.getTransfer(a);if(n===xt)return t.UNSIGNED_BYTE;if(n===Sa)return t.UNSIGNED_SHORT_4_4_4_4;if(n===xa)return t.UNSIGNED_SHORT_5_5_5_1;if(n===Dr)return t.UNSIGNED_INT_5_9_9_9_REV;if(n===Lr)return t.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ir)return t.BYTE;if(n===Ur)return t.SHORT;if(n===Ci)return t.UNSIGNED_SHORT;if(n===pa)return t.INT;if(n===yt)return t.UNSIGNED_INT;if(n===Bt)return t.FLOAT;if(n===Ht)return t.HALF_FLOAT;if(n===yr)return t.ALPHA;if(n===wr)return t.RGB;if(n===At)return t.RGBA;if(n===zt)return t.DEPTH_COMPONENT;if(n===ai)return t.DEPTH_STENCIL;if(n===Pr)return t.RED;if(n===va)return t.RED_INTEGER;if(n===vi)return t.RG;if(n===ga)return t.RG_INTEGER;if(n===_a)return t.RGBA_INTEGER;if(n===$i||n===Zi||n===Ki||n===qi)if(o===Ze)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===$i)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zi)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ki)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qi)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===$i)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zi)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ki)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qi)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===la||n===fa||n===sa||n===ca)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===la)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===sa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ca)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oa||n===ra||n===ia||n===aa||n===na||n===ta||n===ea)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===oa||n===ra)return o===Ze?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ia)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===aa)return r.COMPRESSED_R11_EAC;if(n===na)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ta)return r.COMPRESSED_RG11_EAC;if(n===ea)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Qn||n===Jn||n===jn||n===$n||n===Zn||n===Kn||n===qn||n===Yn||n===Xn||n===Wn||n===kn||n===zn||n===Hn||n===Vn)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Qn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Jn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===$n)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Kn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===qn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Yn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Wn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===kn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Hn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Vn)return o===Ze?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Gn||n===Bn||n===On)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Gn)return o===Ze?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bn)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===On)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fn||n===Nn||n===In||n===Un)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fn)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Nn)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===In)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Un)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===wi?t.UNSIGNED_INT_24_8:t[n]!==void 0?t[n]:null}return{convert:i}}class ru extends Et{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Wi extends Ta{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ou={type:"move"};class Pn{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Wi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Wi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new ue,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new ue),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Wi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new ue,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new ue),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const n of e.hand.values())this._getHandJoint(i,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,n){let a=null,r=null,o=null;const d=this._targetRay,m=this._grip,_=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(_&&e.hand){o=!0;for(const L of e.hand.values()){const c=i.getJointPose(L,n),l=this._getHandJoint(_,L);c!==null&&(l.matrix.fromArray(c.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,l.jointRadius=c.radius),l.visible=c!==null}const T=_.joints["index-finger-tip"],b=_.joints["thumb-tip"],p=T.position.distanceTo(b.position),v=.02,S=.005;_.inputState.pinching&&p>v+S?(_.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!_.inputState.pinching&&p<=v-S&&(_.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(r=i.getPose(e.gripSpace,n),r!==null&&(m.matrix.fromArray(r.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,r.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(r.linearVelocity)):m.hasLinearVelocity=!1,r.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(r.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(a=i.getPose(e.targetRaySpace,n),a===null&&r!==null&&(a=r),a!==null&&(d.matrix.fromArray(a.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,a.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(a.linearVelocity)):d.hasLinearVelocity=!1,a.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(a.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(ou)))}return d!==null&&(d.visible=a!==null),m!==null&&(m.visible=r!==null),_!==null&&(_.visible=o!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const n=new Wi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[i.jointName]=n,e.add(n)}return e.joints[i.jointName]}}class Kr extends _t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}const su=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,lu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class cu{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const n=new Kr(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,n=new Lt({vertexShader:su,fragmentShader:lu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new kt(new nn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fu extends Ma{constructor(e,i){super();const n=this;let a=null,r=1,o=null,d="local-floor",m=1,_=null,T=null,b=null,p=null,v=null,S=null;const L=typeof XRWebGLBinding<"u",c=new cu,l={},x=i.getContextAttributes();let A=null,M=null;const D=[],w=[],U=new ot;let u=null;const g=new Et;g.viewport=new at;const K=new Et;K.viewport=new at;const y=[g,K],V=new ru;let W=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let te=D[Y];return te===void 0&&(te=new Pn,D[Y]=te),te.getTargetRaySpace()},this.getControllerGrip=function(Y){let te=D[Y];return te===void 0&&(te=new Pn,D[Y]=te),te.getGripSpace()},this.getHand=function(Y){let te=D[Y];return te===void 0&&(te=new Pn,D[Y]=te),te.getHandSpace()};function X(Y){const te=w.indexOf(Y.inputSource);if(te===-1)return;const ae=D[te];ae!==void 0&&(ae.update(Y.inputSource,Y.frame,_||o),ae.dispatchEvent({type:Y.type,data:Y.inputSource}))}function B(){a.removeEventListener("select",X),a.removeEventListener("selectstart",X),a.removeEventListener("selectend",X),a.removeEventListener("squeeze",X),a.removeEventListener("squeezestart",X),a.removeEventListener("squeezeend",X),a.removeEventListener("end",B),a.removeEventListener("inputsourceschange",F);for(let Y=0;Y<D.length;Y++){const te=w[Y];te!==null&&(w[Y]=null,D[Y].disconnect(te))}W=null,z=null,c.reset();for(const Y in l)delete l[Y];e.setRenderTarget(A),v=null,p=null,b=null,a=null,M=null,$e.stop(),n.isPresenting=!1,e.setPixelRatio(u),e.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){d=Y,n.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return _||o},this.setReferenceSpace=function(Y){_=Y},this.getBaseLayer=function(){return p!==null?p:v},this.getBinding=function(){return b===null&&L&&(b=new XRWebGLBinding(a,i)),b},this.getFrame=function(){return S},this.getSession=function(){return a},this.setSession=async function(Y){if(a=Y,a!==null){if(A=e.getRenderTarget(),a.addEventListener("select",X),a.addEventListener("selectstart",X),a.addEventListener("selectend",X),a.addEventListener("squeeze",X),a.addEventListener("squeezestart",X),a.addEventListener("squeezeend",X),a.addEventListener("end",B),a.addEventListener("inputsourceschange",F),x.xrCompatible!==!0&&await i.makeXRCompatible(),u=e.getPixelRatio(),e.getSize(U),L&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,ye=null,be=null;x.depth&&(be=x.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,ae=x.stencil?ai:zt,ye=x.stencil?wi:yt);const Ce={colorFormat:i.RGBA8,depthFormat:be,scaleFactor:r};b=this.getBinding(),p=b.createProjectionLayer(Ce),a.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),M=new Pt(p.textureWidth,p.textureHeight,{format:At,type:xt,depthTexture:new Pi(p.textureWidth,p.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{const ae={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};v=new XRWebGLLayer(a,i,ae),a.updateRenderState({baseLayer:v}),e.setPixelRatio(1),e.setSize(v.framebufferWidth,v.framebufferHeight,!1),M=new Pt(v.framebufferWidth,v.framebufferHeight,{format:At,type:xt,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(m),_=null,o=await a.requestReferenceSpace(d),$e.setContext(a),$e.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return c.getDepthTexture()};function F(Y){for(let te=0;te<Y.removed.length;te++){const ae=Y.removed[te],ye=w.indexOf(ae);ye>=0&&(w[ye]=null,D[ye].disconnect(ae))}for(let te=0;te<Y.added.length;te++){const ae=Y.added[te];let ye=w.indexOf(ae);if(ye===-1){for(let Ce=0;Ce<D.length;Ce++)if(Ce>=w.length){w.push(ae),ye=Ce;break}else if(w[Ce]===null){w[Ce]=ae,ye=Ce;break}if(ye===-1)break}const be=D[ye];be&&be.connect(ae)}}const ee=new ue,j=new ue;function pe(Y,te,ae){ee.setFromMatrixPosition(te.matrixWorld),j.setFromMatrixPosition(ae.matrixWorld);const ye=ee.distanceTo(j),be=te.projectionMatrix.elements,Ce=ae.projectionMatrix.elements,ct=be[14]/(be[10]-1),Oe=be[14]/(be[10]+1),He=(be[9]+1)/be[5],Xe=(be[9]-1)/be[5],Ue=(be[8]-1)/be[0],it=(Ce[8]+1)/Ce[0],E=ct*Ue,rt=ct*it,Ve=ye/(-Ue+it),qe=Ve*-Ue;if(te.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(qe),Y.translateZ(Ve),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),be[10]===-1)Y.projectionMatrix.copy(te.projectionMatrix),Y.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const xe=ct+Ve,h=Oe+Ve,s=E-qe,C=rt+(ye-qe),k=He*Oe/h*xe,q=Xe*Oe/h*xe;Y.projectionMatrix.makePerspective(s,C,k,q,xe,h),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Me(Y,te){te===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(te.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(a===null)return;let te=Y.near,ae=Y.far;c.texture!==null&&(c.depthNear>0&&(te=c.depthNear),c.depthFar>0&&(ae=c.depthFar)),V.near=K.near=g.near=te,V.far=K.far=g.far=ae,(W!==V.near||z!==V.far)&&(a.updateRenderState({depthNear:V.near,depthFar:V.far}),W=V.near,z=V.far),V.layers.mask=Y.layers.mask|6,g.layers.mask=V.layers.mask&-5,K.layers.mask=V.layers.mask&-3;const ye=Y.parent,be=V.cameras;Me(V,ye);for(let Ce=0;Ce<be.length;Ce++)Me(be[Ce],ye);be.length===2?pe(V,g,K):V.projectionMatrix.copy(g.projectionMatrix),ce(Y,V,ye)};function ce(Y,te,ae){ae===null?Y.matrix.copy(te.matrixWorld):(Y.matrix.copy(ae.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(te.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(te.projectionMatrix),Y.projectionMatrixInverse.copy(te.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Yo*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(p===null&&v===null))return m},this.setFoveation=function(Y){m=Y,p!==null&&(p.fixedFoveation=Y),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=Y)},this.hasDepthSensing=function(){return c.texture!==null},this.getDepthSensingMesh=function(){return c.getMesh(V)},this.getCameraTexture=function(Y){return l[Y]};let Le=null;function Qe(Y,te){if(T=te.getViewerPose(_||o),S=te,T!==null){const ae=T.views;v!==null&&(e.setRenderTargetFramebuffer(M,v.framebuffer),e.setRenderTarget(M));let ye=!1;ae.length!==V.cameras.length&&(V.cameras.length=0,ye=!0);for(let Oe=0;Oe<ae.length;Oe++){const He=ae[Oe];let Xe=null;if(v!==null)Xe=v.getViewport(He);else{const it=b.getViewSubImage(p,He);Xe=it.viewport,Oe===0&&(e.setRenderTargetTextures(M,it.colorTexture,it.depthStencilTexture),e.setRenderTarget(M))}let Ue=y[Oe];Ue===void 0&&(Ue=new Et,Ue.layers.enable(Oe),Ue.viewport=new at,y[Oe]=Ue),Ue.matrix.fromArray(He.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(He.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(Xe.x,Xe.y,Xe.width,Xe.height),Oe===0&&(V.matrix.copy(Ue.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),ye===!0&&V.cameras.push(Ue)}const be=a.enabledFeatures;if(be&&be.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&L){b=n.getBinding();const Oe=b.getDepthInformation(ae[0]);Oe&&Oe.isValid&&Oe.texture&&c.init(Oe,a.renderState)}if(be&&be.includes("camera-access")&&L){e.state.unbindTexture(),b=n.getBinding();for(let Oe=0;Oe<ae.length;Oe++){const He=ae[Oe].camera;if(He){let Xe=l[He];Xe||(Xe=new Kr,l[He]=Xe);const Ue=b.getCameraImage(He);Xe.sourceTexture=Ue}}}}for(let ae=0;ae<D.length;ae++){const ye=w[ae],be=D[ae];ye!==null&&be!==void 0&&be.update(ye,te,_||o)}Le&&Le(Y,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),S=null}const $e=new Or;$e.setAnimationLoop(Qe),this.setAnimationLoop=function(Y){Le=Y},this.dispose=function(){}}}const Qt=new Ea,du=new oi;function uu(t,e){function i(c,l){c.matrixAutoUpdate===!0&&c.updateMatrix(),l.value.copy(c.matrix)}function n(c,l){l.color.getRGB(c.fogColor.value,Br(t)),l.isFog?(c.fogNear.value=l.near,c.fogFar.value=l.far):l.isFogExp2&&(c.fogDensity.value=l.density)}function a(c,l,x,A,M){l.isMeshBasicMaterial?r(c,l):l.isMeshLambertMaterial?(r(c,l),l.envMap&&(c.envMapIntensity.value=l.envMapIntensity)):l.isMeshToonMaterial?(r(c,l),b(c,l)):l.isMeshPhongMaterial?(r(c,l),T(c,l),l.envMap&&(c.envMapIntensity.value=l.envMapIntensity)):l.isMeshStandardMaterial?(r(c,l),p(c,l),l.isMeshPhysicalMaterial&&v(c,l,M)):l.isMeshMatcapMaterial?(r(c,l),S(c,l)):l.isMeshDepthMaterial?r(c,l):l.isMeshDistanceMaterial?(r(c,l),L(c,l)):l.isMeshNormalMaterial?r(c,l):l.isLineBasicMaterial?(o(c,l),l.isLineDashedMaterial&&d(c,l)):l.isPointsMaterial?m(c,l,x,A):l.isSpriteMaterial?_(c,l):l.isShadowMaterial?(c.color.value.copy(l.color),c.opacity.value=l.opacity):l.isShaderMaterial&&(l.uniformsNeedUpdate=!1)}function r(c,l){c.opacity.value=l.opacity,l.color&&c.diffuse.value.copy(l.color),l.emissive&&c.emissive.value.copy(l.emissive).multiplyScalar(l.emissiveIntensity),l.map&&(c.map.value=l.map,i(l.map,c.mapTransform)),l.alphaMap&&(c.alphaMap.value=l.alphaMap,i(l.alphaMap,c.alphaMapTransform)),l.bumpMap&&(c.bumpMap.value=l.bumpMap,i(l.bumpMap,c.bumpMapTransform),c.bumpScale.value=l.bumpScale,l.side===gt&&(c.bumpScale.value*=-1)),l.normalMap&&(c.normalMap.value=l.normalMap,i(l.normalMap,c.normalMapTransform),c.normalScale.value.copy(l.normalScale),l.side===gt&&c.normalScale.value.negate()),l.displacementMap&&(c.displacementMap.value=l.displacementMap,i(l.displacementMap,c.displacementMapTransform),c.displacementScale.value=l.displacementScale,c.displacementBias.value=l.displacementBias),l.emissiveMap&&(c.emissiveMap.value=l.emissiveMap,i(l.emissiveMap,c.emissiveMapTransform)),l.specularMap&&(c.specularMap.value=l.specularMap,i(l.specularMap,c.specularMapTransform)),l.alphaTest>0&&(c.alphaTest.value=l.alphaTest);const x=e.get(l),A=x.envMap,M=x.envMapRotation;A&&(c.envMap.value=A,Qt.copy(M),Qt.x*=-1,Qt.y*=-1,Qt.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Qt.y*=-1,Qt.z*=-1),c.envMapRotation.value.setFromMatrix4(du.makeRotationFromEuler(Qt)),c.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,c.reflectivity.value=l.reflectivity,c.ior.value=l.ior,c.refractionRatio.value=l.refractionRatio),l.lightMap&&(c.lightMap.value=l.lightMap,c.lightMapIntensity.value=l.lightMapIntensity,i(l.lightMap,c.lightMapTransform)),l.aoMap&&(c.aoMap.value=l.aoMap,c.aoMapIntensity.value=l.aoMapIntensity,i(l.aoMap,c.aoMapTransform))}function o(c,l){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,l.map&&(c.map.value=l.map,i(l.map,c.mapTransform))}function d(c,l){c.dashSize.value=l.dashSize,c.totalSize.value=l.dashSize+l.gapSize,c.scale.value=l.scale}function m(c,l,x,A){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,c.size.value=l.size*x,c.scale.value=A*.5,l.map&&(c.map.value=l.map,i(l.map,c.uvTransform)),l.alphaMap&&(c.alphaMap.value=l.alphaMap,i(l.alphaMap,c.alphaMapTransform)),l.alphaTest>0&&(c.alphaTest.value=l.alphaTest)}function _(c,l){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,c.rotation.value=l.rotation,l.map&&(c.map.value=l.map,i(l.map,c.mapTransform)),l.alphaMap&&(c.alphaMap.value=l.alphaMap,i(l.alphaMap,c.alphaMapTransform)),l.alphaTest>0&&(c.alphaTest.value=l.alphaTest)}function T(c,l){c.specular.value.copy(l.specular),c.shininess.value=Math.max(l.shininess,1e-4)}function b(c,l){l.gradientMap&&(c.gradientMap.value=l.gradientMap)}function p(c,l){c.metalness.value=l.metalness,l.metalnessMap&&(c.metalnessMap.value=l.metalnessMap,i(l.metalnessMap,c.metalnessMapTransform)),c.roughness.value=l.roughness,l.roughnessMap&&(c.roughnessMap.value=l.roughnessMap,i(l.roughnessMap,c.roughnessMapTransform)),l.envMap&&(c.envMapIntensity.value=l.envMapIntensity)}function v(c,l,x){c.ior.value=l.ior,l.sheen>0&&(c.sheenColor.value.copy(l.sheenColor).multiplyScalar(l.sheen),c.sheenRoughness.value=l.sheenRoughness,l.sheenColorMap&&(c.sheenColorMap.value=l.sheenColorMap,i(l.sheenColorMap,c.sheenColorMapTransform)),l.sheenRoughnessMap&&(c.sheenRoughnessMap.value=l.sheenRoughnessMap,i(l.sheenRoughnessMap,c.sheenRoughnessMapTransform))),l.clearcoat>0&&(c.clearcoat.value=l.clearcoat,c.clearcoatRoughness.value=l.clearcoatRoughness,l.clearcoatMap&&(c.clearcoatMap.value=l.clearcoatMap,i(l.clearcoatMap,c.clearcoatMapTransform)),l.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=l.clearcoatRoughnessMap,i(l.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),l.clearcoatNormalMap&&(c.clearcoatNormalMap.value=l.clearcoatNormalMap,i(l.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(l.clearcoatNormalScale),l.side===gt&&c.clearcoatNormalScale.value.negate())),l.dispersion>0&&(c.dispersion.value=l.dispersion),l.iridescence>0&&(c.iridescence.value=l.iridescence,c.iridescenceIOR.value=l.iridescenceIOR,c.iridescenceThicknessMinimum.value=l.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=l.iridescenceThicknessRange[1],l.iridescenceMap&&(c.iridescenceMap.value=l.iridescenceMap,i(l.iridescenceMap,c.iridescenceMapTransform)),l.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=l.iridescenceThicknessMap,i(l.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),l.transmission>0&&(c.transmission.value=l.transmission,c.transmissionSamplerMap.value=x.texture,c.transmissionSamplerSize.value.set(x.width,x.height),l.transmissionMap&&(c.transmissionMap.value=l.transmissionMap,i(l.transmissionMap,c.transmissionMapTransform)),c.thickness.value=l.thickness,l.thicknessMap&&(c.thicknessMap.value=l.thicknessMap,i(l.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=l.attenuationDistance,c.attenuationColor.value.copy(l.attenuationColor)),l.anisotropy>0&&(c.anisotropyVector.value.set(l.anisotropy*Math.cos(l.anisotropyRotation),l.anisotropy*Math.sin(l.anisotropyRotation)),l.anisotropyMap&&(c.anisotropyMap.value=l.anisotropyMap,i(l.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=l.specularIntensity,c.specularColor.value.copy(l.specularColor),l.specularColorMap&&(c.specularColorMap.value=l.specularColorMap,i(l.specularColorMap,c.specularColorMapTransform)),l.specularIntensityMap&&(c.specularIntensityMap.value=l.specularIntensityMap,i(l.specularIntensityMap,c.specularIntensityMapTransform))}function S(c,l){l.matcap&&(c.matcap.value=l.matcap)}function L(c,l){const x=e.get(l).light;c.referencePosition.value.setFromMatrixPosition(x.matrixWorld),c.nearDistance.value=x.shadow.camera.near,c.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:a}}function pu(t,e,i,n){let a={},r={},o=[];const d=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function m(x,A){const M=A.program;n.uniformBlockBinding(x,M)}function _(x,A){let M=a[x.id];M===void 0&&(S(x),M=T(x),a[x.id]=M,x.addEventListener("dispose",c));const D=A.program;n.updateUBOMapping(x,D);const w=e.render.frame;r[x.id]!==w&&(p(x),r[x.id]=w)}function T(x){const A=b();x.__bindingPointIndex=A;const M=t.createBuffer(),D=x.__size,w=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,D,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,A,M),M}function b(){for(let x=0;x<d;x++)if(o.indexOf(x)===-1)return o.push(x),x;return je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(x){const A=a[x.id],M=x.uniforms,D=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,A);for(let w=0,U=M.length;w<U;w++){const u=Array.isArray(M[w])?M[w]:[M[w]];for(let g=0,K=u.length;g<K;g++){const y=u[g];if(v(y,w,g,D)===!0){const V=y.__offset,W=Array.isArray(y.value)?y.value:[y.value];let z=0;for(let X=0;X<W.length;X++){const B=W[X],F=L(B);typeof B=="number"||typeof B=="boolean"?(y.__data[0]=B,t.bufferSubData(t.UNIFORM_BUFFER,V+z,y.__data)):B.isMatrix3?(y.__data[0]=B.elements[0],y.__data[1]=B.elements[1],y.__data[2]=B.elements[2],y.__data[3]=0,y.__data[4]=B.elements[3],y.__data[5]=B.elements[4],y.__data[6]=B.elements[5],y.__data[7]=0,y.__data[8]=B.elements[6],y.__data[9]=B.elements[7],y.__data[10]=B.elements[8],y.__data[11]=0):(B.toArray(y.__data,z),z+=F.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,V,y.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function v(x,A,M,D){const w=x.value,U=A+"_"+M;if(D[U]===void 0)return typeof w=="number"||typeof w=="boolean"?D[U]=w:D[U]=w.clone(),!0;{const u=D[U];if(typeof w=="number"||typeof w=="boolean"){if(u!==w)return D[U]=w,!0}else if(u.equals(w)===!1)return u.copy(w),!0}return!1}function S(x){const A=x.uniforms;let M=0;const D=16;for(let U=0,u=A.length;U<u;U++){const g=Array.isArray(A[U])?A[U]:[A[U]];for(let K=0,y=g.length;K<y;K++){const V=g[K],W=Array.isArray(V.value)?V.value:[V.value];for(let z=0,X=W.length;z<X;z++){const B=W[z],F=L(B),ee=M%D,j=ee%F.boundary,pe=ee+j;M+=j,pe!==0&&D-pe<F.storage&&(M+=D-pe),V.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=M,M+=F.storage}}}const w=M%D;return w>0&&(M+=D-w),x.__size=M,x.__cache={},this}function L(x){const A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=48,A.storage=48):x.isMatrix4?(A.boundary=64,A.storage=64):x.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ge("WebGLRenderer: Unsupported uniform value type.",x),A}function c(x){const A=x.target;A.removeEventListener("dispose",c);const M=o.indexOf(A.__bindingPointIndex);o.splice(M,1),t.deleteBuffer(a[A.id]),delete a[A.id],delete r[A.id]}function l(){for(const x in a)t.deleteBuffer(a[x]);o=[],a={},r={}}return{bind:m,update:_,dispose:l}}class hu extends _t{constructor(e=null,i=1,n=1,a,r,o,d,m,_=ut,T=ut,b,p){super(null,o,d,m,_,T,a,r,b,p),this.isDataTexture=!0,this.image={data:e,width:i,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const mu=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Rt=null;function _u(){return Rt===null&&(Rt=new hu(mu,16,16,vi,Ht),Rt.name="DFG_LUT",Rt.minFilter=ht,Rt.magFilter=ht,Rt.wrapS=Gt,Rt.wrapT=Gt,Rt.generateMipmaps=!1,Rt.needsUpdate=!0),Rt}class Cu{constructor(e={}){const{canvas:i=qo(),context:n=null,depth:a=!0,stencil:r=!1,alpha:o=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:_=!1,powerPreference:T="default",failIfMajorPerformanceCaveat:b=!1,reversedDepthBuffer:p=!1,outputBufferType:v=xt}=e;this.isWebGLRenderer=!0;let S;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=n.getContextAttributes().alpha}else S=o;const L=v,c=new Set([_a,ga,va]),l=new Set([xt,yt,Ci,wi,Sa,xa]),x=new Uint32Array(4),A=new Int32Array(4);let M=null,D=null;const w=[],U=[];let u=null;this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=wt,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const g=this;let K=!1;this._outputColorSpace=Ko;let y=0,V=0,W=null,z=-1,X=null;const B=new at,F=new at;let ee=null;const j=new Je(0);let pe=0,Me=i.width,ce=i.height,Le=1,Qe=null,$e=null;const Y=new at(0,0,Me,ce),te=new at(0,0,Me,ce);let ae=!1;const ye=new Fr;let be=!1,Ce=!1;const ct=new oi,Oe=new ue,He=new at,Xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ue=!1;function it(){return W===null?Le:1}let E=n;function rt(f,P){return i.getContext(f,P)}try{const f={alpha:!0,depth:a,stencil:r,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:_,powerPreference:T,failIfMajorPerformanceCaveat:b};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Zo}`),i.addEventListener("webglcontextlost",_e,!1),i.addEventListener("webglcontextrestored",we,!1),i.addEventListener("webglcontextcreationerror",Ke,!1),E===null){const P="webgl2";if(E=rt(P,f),E===null)throw rt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(f){throw je("WebGLRenderer: "+f.message),f}let Ve,qe,xe,h,s,C,k,q,H,he,ie,Ae,Re,Z,J,me,ge,le,Ie,R,ne,Q,de;function $(){Ve=new lf(E),Ve.init(),ne=new au(E,Ve),qe=new Kc(E,Ve,e,ne),xe=new tu(E,Ve),qe.reversedDepthBuffer&&p&&xe.buffers.depth.setReversed(!0),h=new df(E),s=new Bd,C=new nu(E,Ve,xe,s,qe,ne,h),k=new sf(g),q=new rs(E),Q=new Yc(E,q),H=new cf(E,q,h,Q),he=new pf(E,H,q,Q,h),le=new uf(E,qe,C),J=new Zc(s),ie=new Od(g,k,Ve,qe,Q,J),Ae=new uu(g,s),Re=new Vd,Z=new Yd(Ve),ge=new Xc(g,k,xe,he,S,m),me=new eu(g,he,qe),de=new pu(E,h,qe,xe),Ie=new qc(E,Ve,h),R=new ff(E,Ve,h),h.programs=ie.programs,g.capabilities=qe,g.extensions=Ve,g.properties=s,g.renderLists=Re,g.shadowMap=me,g.state=xe,g.info=h}$(),L!==xt&&(u=new _f(L,i.width,i.height,a,r));const G=new fu(g,E);this.xr=G,this.getContext=function(){return E},this.getContextAttributes=function(){return E.getContextAttributes()},this.forceContextLoss=function(){const f=Ve.get("WEBGL_lose_context");f&&f.loseContext()},this.forceContextRestore=function(){const f=Ve.get("WEBGL_lose_context");f&&f.restoreContext()},this.getPixelRatio=function(){return Le},this.setPixelRatio=function(f){f!==void 0&&(Le=f,this.setSize(Me,ce,!1))},this.getSize=function(f){return f.set(Me,ce)},this.setSize=function(f,P,O=!0){if(G.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}Me=f,ce=P,i.width=Math.floor(f*Le),i.height=Math.floor(P*Le),O===!0&&(i.style.width=f+"px",i.style.height=P+"px"),u!==null&&u.setSize(i.width,i.height),this.setViewport(0,0,f,P)},this.getDrawingBufferSize=function(f){return f.set(Me*Le,ce*Le).floor()},this.setDrawingBufferSize=function(f,P,O){Me=f,ce=P,Le=O,i.width=Math.floor(f*O),i.height=Math.floor(P*O),this.setViewport(0,0,f,P)},this.setEffects=function(f){if(L===xt){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(f){for(let P=0;P<f.length;P++)if(f[P].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}u.setEffects(f||[])},this.getCurrentViewport=function(f){return f.copy(B)},this.getViewport=function(f){return f.copy(Y)},this.setViewport=function(f,P,O,N){f.isVector4?Y.set(f.x,f.y,f.z,f.w):Y.set(f,P,O,N),xe.viewport(B.copy(Y).multiplyScalar(Le).round())},this.getScissor=function(f){return f.copy(te)},this.setScissor=function(f,P,O,N){f.isVector4?te.set(f.x,f.y,f.z,f.w):te.set(f,P,O,N),xe.scissor(F.copy(te).multiplyScalar(Le).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(f){xe.setScissorTest(ae=f)},this.setOpaqueSort=function(f){Qe=f},this.setTransparentSort=function(f){$e=f},this.getClearColor=function(f){return f.copy(ge.getClearColor())},this.setClearColor=function(){ge.setClearColor(...arguments)},this.getClearAlpha=function(){return ge.getClearAlpha()},this.setClearAlpha=function(){ge.setClearAlpha(...arguments)},this.clear=function(f=!0,P=!0,O=!0){let N=0;if(f){let I=!1;if(W!==null){const oe=W.texture.format;I=c.has(oe)}if(I){const oe=W.texture.type,fe=l.has(oe),se=ge.getClearColor(),ve=ge.getClearAlpha(),Ee=se.r,Pe=se.g,Ne=se.b;fe?(x[0]=Ee,x[1]=Pe,x[2]=Ne,x[3]=ve,E.clearBufferuiv(E.COLOR,0,x)):(A[0]=Ee,A[1]=Pe,A[2]=Ne,A[3]=ve,E.clearBufferiv(E.COLOR,0,A))}else N|=E.COLOR_BUFFER_BIT}P&&(N|=E.DEPTH_BUFFER_BIT),O&&(N|=E.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N!==0&&E.clear(N)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",_e,!1),i.removeEventListener("webglcontextrestored",we,!1),i.removeEventListener("webglcontextcreationerror",Ke,!1),ge.dispose(),Re.dispose(),Z.dispose(),s.dispose(),k.dispose(),he.dispose(),Q.dispose(),de.dispose(),ie.dispose(),G.dispose(),G.removeEventListener("sessionstart",Ra),G.removeEventListener("sessionend",Ca),Kt.stop()};function _e(f){f.preventDefault(),Va("WebGLRenderer: Context Lost."),K=!0}function we(){Va("WebGLRenderer: Context Restored."),K=!1;const f=h.autoReset,P=me.enabled,O=me.autoUpdate,N=me.needsUpdate,I=me.type;$(),h.autoReset=f,me.enabled=P,me.autoUpdate=O,me.needsUpdate=N,me.type=I}function Ke(f){je("WebGLRenderer: A WebGL context could not be created. Reason: ",f.statusMessage)}function ze(f){const P=f.target;P.removeEventListener("dispose",ze),Dt(P)}function Dt(f){Ut(f),s.remove(f)}function Ut(f){const P=s.get(f).programs;P!==void 0&&(P.forEach(function(O){ie.releaseProgram(O)}),f.isShaderMaterial&&ie.releaseShaderCache(f))}this.renderBufferDirect=function(f,P,O,N,I,oe){P===null&&(P=Xe);const fe=I.isMesh&&I.matrixWorld.determinant()<0,se=$r(f,P,O,N,I);xe.setMaterial(N,fe);let ve=O.index,Ee=1;if(N.wireframe===!0){if(ve=H.getWireframeAttribute(O),ve===void 0)return;Ee=2}const Pe=O.drawRange,Ne=O.attributes.position;let Te=Pe.start*Ee,ke=(Pe.start+Pe.count)*Ee;oe!==null&&(Te=Math.max(Te,oe.start*Ee),ke=Math.min(ke,(oe.start+oe.count)*Ee)),ve!==null?(Te=Math.max(Te,0),ke=Math.min(ke,ve.count)):Ne!=null&&(Te=Math.max(Te,0),ke=Math.min(ke,Ne.count));const nt=ke-Te;if(nt<0||nt===1/0)return;Q.setup(I,N,se,O,ve);let et,We=Ie;if(ve!==null&&(et=q.get(ve),We=R,We.setIndex(et)),I.isMesh)N.wireframe===!0?(xe.setLineWidth(N.wireframeLinewidth*it()),We.setMode(E.LINES)):We.setMode(E.TRIANGLES);else if(I.isLine){let pt=N.linewidth;pt===void 0&&(pt=1),xe.setLineWidth(pt*it()),I.isLineSegments?We.setMode(E.LINES):I.isLineLoop?We.setMode(E.LINE_LOOP):We.setMode(E.LINE_STRIP)}else I.isPoints?We.setMode(E.POINTS):I.isSprite&&We.setMode(E.TRIANGLES);if(I.isBatchedMesh)if(I._multiDrawInstances!==null)xr("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),We.renderMultiDrawInstances(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount,I._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))We.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else{const pt=I._multiDrawStarts,Se=I._multiDrawCounts,vt=I._multiDrawCount,Be=ve?q.get(ve).bytesPerElement:1,St=s.get(N).currentProgram.getUniforms();for(let bt=0;bt<vt;bt++)St.setValue(E,"_gl_DrawID",bt),We.render(pt[bt]/Be,Se[bt])}else if(I.isInstancedMesh)We.renderInstances(Te,nt,I.count);else if(O.isInstancedBufferGeometry){const pt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,Se=Math.min(O.instanceCount,pt);We.renderInstances(Te,nt,Se)}else We.render(Te,nt)};function ba(f,P,O){f.transparent===!0&&f.side===Ot&&f.forceSinglePass===!1?(f.side=gt,f.needsUpdate=!0,Di(f,P,O),f.side=_i,f.needsUpdate=!0,Di(f,P,O),f.side=Ot):Di(f,P,O)}this.compile=function(f,P,O=null){O===null&&(O=f),D=Z.get(O),D.init(P),U.push(D),O.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(D.pushLight(I),I.castShadow&&D.pushShadow(I))}),f!==O&&f.traverseVisible(function(I){I.isLight&&I.layers.test(P.layers)&&(D.pushLight(I),I.castShadow&&D.pushShadow(I))}),D.setupLights();const N=new Set;return f.traverse(function(I){if(!(I.isMesh||I.isPoints||I.isLine||I.isSprite))return;const oe=I.material;if(oe)if(Array.isArray(oe))for(let fe=0;fe<oe.length;fe++){const se=oe[fe];ba(se,O,I),N.add(se)}else ba(oe,O,I),N.add(oe)}),D=U.pop(),N},this.compileAsync=function(f,P,O=null){const N=this.compile(f,P,O);return new Promise(I=>{function oe(){if(N.forEach(function(fe){s.get(fe).currentProgram.isReady()&&N.delete(fe)}),N.size===0){I(f);return}setTimeout(oe,10)}Ve.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let on=null;function Zr(f){on&&on(f)}function Ra(){Kt.stop()}function Ca(){Kt.start()}const Kt=new Or;Kt.setAnimationLoop(Zr),typeof self<"u"&&Kt.setContext(self),this.setAnimationLoop=function(f){on=f,G.setAnimationLoop(f),f===null?Kt.stop():Kt.start()},G.addEventListener("sessionstart",Ra),G.addEventListener("sessionend",Ca),this.render=function(f,P){if(P!==void 0&&P.isCamera!==!0){je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(K===!0)return;const O=G.enabled===!0&&G.isPresenting===!0,N=u!==null&&(W===null||O)&&u.begin(g,W);if(f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(u===null||u.isCompositing()===!1)&&(G.cameraAutoUpdate===!0&&G.updateCamera(P),P=G.getCamera()),f.isScene===!0&&f.onBeforeRender(g,f,P,W),D=Z.get(f,U.length),D.init(P),U.push(D),ct.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),ye.setFromProjectionMatrix(ct,Ri,P.reversedDepth),Ce=this.localClippingEnabled,be=J.init(this.clippingPlanes,Ce),M=Re.get(f,w.length),M.init(),w.push(M),G.enabled===!0&&G.isPresenting===!0){const fe=g.xr.getDepthSensingMesh();fe!==null&&sn(fe,P,-1/0,g.sortObjects)}sn(f,P,0,g.sortObjects),M.finish(),g.sortObjects===!0&&M.sort(Qe,$e),Ue=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Ue&&ge.addToRenderList(M,f),this.info.render.frame++,be===!0&&J.beginShadows();const I=D.state.shadowsArray;if(me.render(I,f,P),be===!0&&J.endShadows(),this.info.autoReset===!0&&this.info.reset(),(N&&u.hasRenderPass())===!1){const fe=M.opaque,se=M.transmissive;if(D.setupLights(),P.isArrayCamera){const ve=P.cameras;if(se.length>0)for(let Ee=0,Pe=ve.length;Ee<Pe;Ee++){const Ne=ve[Ee];Pa(fe,se,f,Ne)}Ue&&ge.render(f);for(let Ee=0,Pe=ve.length;Ee<Pe;Ee++){const Ne=ve[Ee];wa(M,f,Ne,Ne.viewport)}}else se.length>0&&Pa(fe,se,f,P),Ue&&ge.render(f),wa(M,f,P)}W!==null&&V===0&&(C.updateMultisampleRenderTarget(W),C.updateRenderTargetMipmap(W)),N&&u.end(g),f.isScene===!0&&f.onAfterRender(g,f,P),Q.resetDefaultState(),z=-1,X=null,U.pop(),U.length>0?(D=U[U.length-1],be===!0&&J.setGlobalState(g.clippingPlanes,D.state.camera)):D=null,w.pop(),w.length>0?M=w[w.length-1]:M=null};function sn(f,P,O,N){if(f.visible===!1)return;if(f.layers.test(P.layers)){if(f.isGroup)O=f.renderOrder;else if(f.isLOD)f.autoUpdate===!0&&f.update(P);else if(f.isLight)D.pushLight(f),f.castShadow&&D.pushShadow(f);else if(f.isSprite){if(!f.frustumCulled||ye.intersectsSprite(f)){N&&He.setFromMatrixPosition(f.matrixWorld).applyMatrix4(ct);const fe=he.update(f),se=f.material;se.visible&&M.push(f,fe,se,O,He.z,null)}}else if((f.isMesh||f.isLine||f.isPoints)&&(!f.frustumCulled||ye.intersectsObject(f))){const fe=he.update(f),se=f.material;if(N&&(f.boundingSphere!==void 0?(f.boundingSphere===null&&f.computeBoundingSphere(),He.copy(f.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),He.copy(fe.boundingSphere.center)),He.applyMatrix4(f.matrixWorld).applyMatrix4(ct)),Array.isArray(se)){const ve=fe.groups;for(let Ee=0,Pe=ve.length;Ee<Pe;Ee++){const Ne=ve[Ee],Te=se[Ne.materialIndex];Te&&Te.visible&&M.push(f,fe,Te,O,He.z,Ne)}}else se.visible&&M.push(f,fe,se,O,He.z,null)}}const oe=f.children;for(let fe=0,se=oe.length;fe<se;fe++)sn(oe[fe],P,O,N)}function wa(f,P,O,N){const{opaque:I,transmissive:oe,transparent:fe}=f;D.setupLightsView(O),be===!0&&J.setGlobalState(g.clippingPlanes,O),N&&xe.viewport(B.copy(N)),I.length>0&&Li(I,P,O),oe.length>0&&Li(oe,P,O),fe.length>0&&Li(fe,P,O),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Pa(f,P,O,N){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[N.id]===void 0){const Te=Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float");D.state.transmissionRenderTarget[N.id]=new Pt(1,1,{generateMipmaps:!0,type:Te?Ht:xt,minFilter:ni,samples:Math.max(4,qe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace})}const oe=D.state.transmissionRenderTarget[N.id],fe=N.viewport||B;oe.setSize(fe.z*g.transmissionResolutionScale,fe.w*g.transmissionResolutionScale);const se=g.getRenderTarget(),ve=g.getActiveCubeFace(),Ee=g.getActiveMipmapLevel();g.setRenderTarget(oe),g.getClearColor(j),pe=g.getClearAlpha(),pe<1&&g.setClearColor(16777215,.5),g.clear(),Ue&&ge.render(O);const Pe=g.toneMapping;g.toneMapping=wt;const Ne=N.viewport;if(N.viewport!==void 0&&(N.viewport=void 0),D.setupLightsView(N),be===!0&&J.setGlobalState(g.clippingPlanes,N),Li(f,O,N),C.updateMultisampleRenderTarget(oe),C.updateRenderTargetMipmap(oe),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let ke=0,nt=P.length;ke<nt;ke++){const et=P[ke],{object:We,geometry:pt,material:Se,group:vt}=et;if(Se.side===Ot&&We.layers.test(N.layers)){const Be=Se.side;Se.side=gt,Se.needsUpdate=!0,ya(We,O,N,pt,Se,vt),Se.side=Be,Se.needsUpdate=!0,Te=!0}}Te===!0&&(C.updateMultisampleRenderTarget(oe),C.updateRenderTargetMipmap(oe))}g.setRenderTarget(se,ve,Ee),g.setClearColor(j,pe),Ne!==void 0&&(N.viewport=Ne),g.toneMapping=Pe}function Li(f,P,O){const N=P.isScene===!0?P.overrideMaterial:null;for(let I=0,oe=f.length;I<oe;I++){const fe=f[I],{object:se,geometry:ve,group:Ee}=fe;let Pe=fe.material;Pe.allowOverride===!0&&N!==null&&(Pe=N),se.layers.test(O.layers)&&ya(se,P,O,ve,Pe,Ee)}}function ya(f,P,O,N,I,oe){f.onBeforeRender(g,P,O,N,I,oe),f.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,f.matrixWorld),f.normalMatrix.getNormalMatrix(f.modelViewMatrix),I.onBeforeRender(g,P,O,N,f,oe),I.transparent===!0&&I.side===Ot&&I.forceSinglePass===!1?(I.side=gt,I.needsUpdate=!0,g.renderBufferDirect(O,P,N,I,f,oe),I.side=_i,I.needsUpdate=!0,g.renderBufferDirect(O,P,N,I,f,oe),I.side=Ot):g.renderBufferDirect(O,P,N,I,f,oe),f.onAfterRender(g,P,O,N,I,oe)}function Di(f,P,O){P.isScene!==!0&&(P=Xe);const N=s.get(f),I=D.state.lights,oe=D.state.shadowsArray,fe=I.state.version,se=ie.getParameters(f,I.state,oe,P,O),ve=ie.getProgramCacheKey(se);let Ee=N.programs;N.environment=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?P.environment:null,N.fog=P.fog;const Pe=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap;N.envMap=k.get(f.envMap||N.environment,Pe),N.envMapRotation=N.environment!==null&&f.envMap===null?P.environmentRotation:f.envMapRotation,Ee===void 0&&(f.addEventListener("dispose",ze),Ee=new Map,N.programs=Ee);let Ne=Ee.get(ve);if(Ne!==void 0){if(N.currentProgram===Ne&&N.lightsStateVersion===fe)return Da(f,se),Ne}else se.uniforms=ie.getUniforms(f),f.onBeforeCompile(se,g),Ne=ie.acquireProgram(se,ve),Ee.set(ve,Ne),N.uniforms=se.uniforms;const Te=N.uniforms;return(!f.isShaderMaterial&&!f.isRawShaderMaterial||f.clipping===!0)&&(Te.clippingPlanes=J.uniform),Da(f,se),N.needsLights=Jr(f),N.lightsStateVersion=fe,N.needsLights&&(Te.ambientLightColor.value=I.state.ambient,Te.lightProbe.value=I.state.probe,Te.directionalLights.value=I.state.directional,Te.directionalLightShadows.value=I.state.directionalShadow,Te.spotLights.value=I.state.spot,Te.spotLightShadows.value=I.state.spotShadow,Te.rectAreaLights.value=I.state.rectArea,Te.ltc_1.value=I.state.rectAreaLTC1,Te.ltc_2.value=I.state.rectAreaLTC2,Te.pointLights.value=I.state.point,Te.pointLightShadows.value=I.state.pointShadow,Te.hemisphereLights.value=I.state.hemi,Te.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Te.spotLightMatrix.value=I.state.spotLightMatrix,Te.spotLightMap.value=I.state.spotLightMap,Te.pointShadowMatrix.value=I.state.pointShadowMatrix),N.currentProgram=Ne,N.uniformsList=null,Ne}function La(f){if(f.uniformsList===null){const P=f.currentProgram.getUniforms();f.uniformsList=Ji.seqWithValue(P.seq,f.uniforms)}return f.uniformsList}function Da(f,P){const O=s.get(f);O.outputColorSpace=P.outputColorSpace,O.batching=P.batching,O.batchingColor=P.batchingColor,O.instancing=P.instancing,O.instancingColor=P.instancingColor,O.instancingMorph=P.instancingMorph,O.skinning=P.skinning,O.morphTargets=P.morphTargets,O.morphNormals=P.morphNormals,O.morphColors=P.morphColors,O.morphTargetsCount=P.morphTargetsCount,O.numClippingPlanes=P.numClippingPlanes,O.numIntersection=P.numClipIntersection,O.vertexAlphas=P.vertexAlphas,O.vertexTangents=P.vertexTangents,O.toneMapping=P.toneMapping}function $r(f,P,O,N,I){P.isScene!==!0&&(P=Xe),C.resetTextureUnits();const oe=P.fog,fe=N.isMeshStandardMaterial||N.isMeshLambertMaterial||N.isMeshPhongMaterial?P.environment:null,se=W===null?g.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:en,ve=N.isMeshStandardMaterial||N.isMeshLambertMaterial&&!N.envMap||N.isMeshPhongMaterial&&!N.envMap,Ee=k.get(N.envMap||fe,ve),Pe=N.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ne=!!O.attributes.tangent&&(!!N.normalMap||N.anisotropy>0),Te=!!O.morphAttributes.position,ke=!!O.morphAttributes.normal,nt=!!O.morphAttributes.color;let et=wt;N.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(et=g.toneMapping);const We=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,pt=We!==void 0?We.length:0,Se=s.get(N),vt=D.state.lights;if(be===!0&&(Ce===!0||f!==X)){const ft=f===X&&N.id===z;J.setState(N,f,ft)}let Be=!1;N.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==vt.state.version||Se.outputColorSpace!==se||I.isBatchedMesh&&Se.batching===!1||!I.isBatchedMesh&&Se.batching===!0||I.isBatchedMesh&&Se.batchingColor===!0&&I.colorTexture===null||I.isBatchedMesh&&Se.batchingColor===!1&&I.colorTexture!==null||I.isInstancedMesh&&Se.instancing===!1||!I.isInstancedMesh&&Se.instancing===!0||I.isSkinnedMesh&&Se.skinning===!1||!I.isSkinnedMesh&&Se.skinning===!0||I.isInstancedMesh&&Se.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&Se.instancingColor===!1&&I.instanceColor!==null||I.isInstancedMesh&&Se.instancingMorph===!0&&I.morphTexture===null||I.isInstancedMesh&&Se.instancingMorph===!1&&I.morphTexture!==null||Se.envMap!==Ee||N.fog===!0&&Se.fog!==oe||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==J.numPlanes||Se.numIntersection!==J.numIntersection)||Se.vertexAlphas!==Pe||Se.vertexTangents!==Ne||Se.morphTargets!==Te||Se.morphNormals!==ke||Se.morphColors!==nt||Se.toneMapping!==et||Se.morphTargetsCount!==pt)&&(Be=!0):(Be=!0,Se.__version=N.version);let St=Se.currentProgram;Be===!0&&(St=Di(N,P,I));let bt=!1,Zt=!1,li=!1;const Ye=St.getUniforms(),dt=Se.uniforms;if(xe.useProgram(St.program)&&(bt=!0,Zt=!0,li=!0),N.id!==z&&(z=N.id,Zt=!0),bt||X!==f){xe.buffers.depth.getReversed()&&f.reversedDepth!==!0&&(f._reversedDepth=!0,f.updateProjectionMatrix()),Ye.setValue(E,"projectionMatrix",f.projectionMatrix),Ye.setValue(E,"viewMatrix",f.matrixWorldInverse);const Xt=Ye.map.cameraPosition;Xt!==void 0&&Xt.setValue(E,Oe.setFromMatrixPosition(f.matrixWorld)),qe.logarithmicDepthBuffer&&Ye.setValue(E,"logDepthBufFC",2/(Math.log(f.far+1)/Math.LN2)),(N.isMeshPhongMaterial||N.isMeshToonMaterial||N.isMeshLambertMaterial||N.isMeshBasicMaterial||N.isMeshStandardMaterial||N.isShaderMaterial)&&Ye.setValue(E,"isOrthographic",f.isOrthographicCamera===!0),X!==f&&(X=f,Zt=!0,li=!0)}if(Se.needsLights&&(vt.state.directionalShadowMap.length>0&&Ye.setValue(E,"directionalShadowMap",vt.state.directionalShadowMap,C),vt.state.spotShadowMap.length>0&&Ye.setValue(E,"spotShadowMap",vt.state.spotShadowMap,C),vt.state.pointShadowMap.length>0&&Ye.setValue(E,"pointShadowMap",vt.state.pointShadowMap,C)),I.isSkinnedMesh){Ye.setOptional(E,I,"bindMatrix"),Ye.setOptional(E,I,"bindMatrixInverse");const ft=I.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),Ye.setValue(E,"boneTexture",ft.boneTexture,C))}I.isBatchedMesh&&(Ye.setOptional(E,I,"batchingTexture"),Ye.setValue(E,"batchingTexture",I._matricesTexture,C),Ye.setOptional(E,I,"batchingIdTexture"),Ye.setValue(E,"batchingIdTexture",I._indirectTexture,C),Ye.setOptional(E,I,"batchingColorTexture"),I._colorsTexture!==null&&Ye.setValue(E,"batchingColorTexture",I._colorsTexture,C));const Wt=O.morphAttributes;if((Wt.position!==void 0||Wt.normal!==void 0||Wt.color!==void 0)&&le.update(I,O,St),(Zt||Se.receiveShadow!==I.receiveShadow)&&(Se.receiveShadow=I.receiveShadow,Ye.setValue(E,"receiveShadow",I.receiveShadow)),(N.isMeshStandardMaterial||N.isMeshLambertMaterial||N.isMeshPhongMaterial)&&N.envMap===null&&P.environment!==null&&(dt.envMapIntensity.value=P.environmentIntensity),dt.dfgLUT!==void 0&&(dt.dfgLUT.value=_u()),Zt&&(Ye.setValue(E,"toneMappingExposure",g.toneMappingExposure),Se.needsLights&&jr(dt,li),oe&&N.fog===!0&&Ae.refreshFogUniforms(dt,oe),Ae.refreshMaterialUniforms(dt,N,Le,ce,D.state.transmissionRenderTarget[f.id]),Ji.upload(E,La(Se),dt,C)),N.isShaderMaterial&&N.uniformsNeedUpdate===!0&&(Ji.upload(E,La(Se),dt,C),N.uniformsNeedUpdate=!1),N.isSpriteMaterial&&Ye.setValue(E,"center",I.center),Ye.setValue(E,"modelViewMatrix",I.modelViewMatrix),Ye.setValue(E,"normalMatrix",I.normalMatrix),Ye.setValue(E,"modelMatrix",I.matrixWorld),N.isShaderMaterial||N.isRawShaderMaterial){const ft=N.uniformsGroups;for(let Xt=0,ci=ft.length;Xt<ci;Xt++){const Ua=ft[Xt];de.update(Ua,St),de.bind(Ua,St)}}return St}function jr(f,P){f.ambientLightColor.needsUpdate=P,f.lightProbe.needsUpdate=P,f.directionalLights.needsUpdate=P,f.directionalLightShadows.needsUpdate=P,f.pointLights.needsUpdate=P,f.pointLightShadows.needsUpdate=P,f.spotLights.needsUpdate=P,f.spotLightShadows.needsUpdate=P,f.rectAreaLights.needsUpdate=P,f.hemisphereLights.needsUpdate=P}function Jr(f){return f.isMeshLambertMaterial||f.isMeshToonMaterial||f.isMeshPhongMaterial||f.isMeshStandardMaterial||f.isShadowMaterial||f.isShaderMaterial&&f.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(f,P,O){const N=s.get(f);N.__autoAllocateDepthBuffer=f.resolveDepthBuffer===!1,N.__autoAllocateDepthBuffer===!1&&(N.__useRenderToTexture=!1),s.get(f.texture).__webglTexture=P,s.get(f.depthTexture).__webglTexture=N.__autoAllocateDepthBuffer?void 0:O,N.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(f,P){const O=s.get(f);O.__webglFramebuffer=P,O.__useDefaultFramebuffer=P===void 0};const Qr=E.createFramebuffer();this.setRenderTarget=function(f,P=0,O=0){W=f,y=P,V=O;let N=null,I=!1,oe=!1;if(f){const se=s.get(f);if(se.__useDefaultFramebuffer!==void 0){xe.bindFramebuffer(E.FRAMEBUFFER,se.__webglFramebuffer),B.copy(f.viewport),F.copy(f.scissor),ee=f.scissorTest,xe.viewport(B),xe.scissor(F),xe.setScissorTest(ee),z=-1;return}else if(se.__webglFramebuffer===void 0)C.setupRenderTarget(f);else if(se.__hasExternalTextures)C.rebindTextures(f,s.get(f.texture).__webglTexture,s.get(f.depthTexture).__webglTexture);else if(f.depthBuffer){const Pe=f.depthTexture;if(se.__boundDepthTexture!==Pe){if(Pe!==null&&s.has(Pe)&&(f.width!==Pe.image.width||f.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(f)}}const ve=f.texture;(ve.isData3DTexture||ve.isDataArrayTexture||ve.isCompressedArrayTexture)&&(oe=!0);const Ee=s.get(f).__webglFramebuffer;f.isWebGLCubeRenderTarget?(Array.isArray(Ee[P])?N=Ee[P][O]:N=Ee[P],I=!0):f.samples>0&&C.useMultisampledRTT(f)===!1?N=s.get(f).__webglMultisampledFramebuffer:Array.isArray(Ee)?N=Ee[O]:N=Ee,B.copy(f.viewport),F.copy(f.scissor),ee=f.scissorTest}else B.copy(Y).multiplyScalar(Le).floor(),F.copy(te).multiplyScalar(Le).floor(),ee=ae;if(O!==0&&(N=Qr),xe.bindFramebuffer(E.FRAMEBUFFER,N)&&xe.drawBuffers(f,N),xe.viewport(B),xe.scissor(F),xe.setScissorTest(ee),I){const se=s.get(f.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_CUBE_MAP_POSITIVE_X+P,se.__webglTexture,O)}else if(oe){const se=P;for(let ve=0;ve<f.textures.length;ve++){const Ee=s.get(f.textures[ve]);E.framebufferTextureLayer(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0+ve,Ee.__webglTexture,O,se)}}else if(f!==null&&O!==0){const se=s.get(f.texture);E.framebufferTexture2D(E.FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,se.__webglTexture,O)}z=-1},this.readRenderTargetPixels=function(f,P,O,N,I,oe,fe,se=0){if(!(f&&f.isWebGLRenderTarget)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=s.get(f).__webglFramebuffer;if(f.isWebGLCubeRenderTarget&&fe!==void 0&&(ve=ve[fe]),ve){xe.bindFramebuffer(E.FRAMEBUFFER,ve);try{const Ee=f.textures[se],Pe=Ee.format,Ne=Ee.type;if(f.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+se),!qe.textureFormatReadable(Pe)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qe.textureTypeReadable(Ne)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=f.width-N&&O>=0&&O<=f.height-I&&E.readPixels(P,O,N,I,ne.convert(Pe),ne.convert(Ne),oe)}finally{const Ee=W!==null?s.get(W).__webglFramebuffer:null;xe.bindFramebuffer(E.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(f,P,O,N,I,oe,fe,se=0){if(!(f&&f.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=s.get(f).__webglFramebuffer;if(f.isWebGLCubeRenderTarget&&fe!==void 0&&(ve=ve[fe]),ve)if(P>=0&&P<=f.width-N&&O>=0&&O<=f.height-I){xe.bindFramebuffer(E.FRAMEBUFFER,ve);const Ee=f.textures[se],Pe=Ee.format,Ne=Ee.type;if(f.textures.length>1&&E.readBuffer(E.COLOR_ATTACHMENT0+se),!qe.textureFormatReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qe.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Te=E.createBuffer();E.bindBuffer(E.PIXEL_PACK_BUFFER,Te),E.bufferData(E.PIXEL_PACK_BUFFER,oe.byteLength,E.STREAM_READ),E.readPixels(P,O,N,I,ne.convert(Pe),ne.convert(Ne),0);const ke=W!==null?s.get(W).__webglFramebuffer:null;xe.bindFramebuffer(E.FRAMEBUFFER,ke);const nt=E.fenceSync(E.SYNC_GPU_COMMANDS_COMPLETE,0);return E.flush(),await $o(E,nt,4),E.bindBuffer(E.PIXEL_PACK_BUFFER,Te),E.getBufferSubData(E.PIXEL_PACK_BUFFER,0,oe),E.deleteBuffer(Te),E.deleteSync(nt),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(f,P=null,O=0){const N=Math.pow(2,-O),I=Math.floor(f.image.width*N),oe=Math.floor(f.image.height*N),fe=P!==null?P.x:0,se=P!==null?P.y:0;C.setTexture2D(f,0),E.copyTexSubImage2D(E.TEXTURE_2D,O,0,0,fe,se,I,oe),xe.unbindTexture()};const eo=E.createFramebuffer(),to=E.createFramebuffer();this.copyTextureToTexture=function(f,P,O=null,N=null,I=0,oe=0){let fe,se,ve,Ee,Pe,Ne,Te,ke,nt;const et=f.isCompressedTexture?f.mipmaps[oe]:f.image;if(O!==null)fe=O.max.x-O.min.x,se=O.max.y-O.min.y,ve=O.isBox3?O.max.z-O.min.z:1,Ee=O.min.x,Pe=O.min.y,Ne=O.isBox3?O.min.z:0;else{const dt=Math.pow(2,-I);fe=Math.floor(et.width*dt),se=Math.floor(et.height*dt),f.isDataArrayTexture?ve=et.depth:f.isData3DTexture?ve=Math.floor(et.depth*dt):ve=1,Ee=0,Pe=0,Ne=0}N!==null?(Te=N.x,ke=N.y,nt=N.z):(Te=0,ke=0,nt=0);const We=ne.convert(P.format),pt=ne.convert(P.type);let Se;P.isData3DTexture?(C.setTexture3D(P,0),Se=E.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(C.setTexture2DArray(P,0),Se=E.TEXTURE_2D_ARRAY):(C.setTexture2D(P,0),Se=E.TEXTURE_2D),E.pixelStorei(E.UNPACK_FLIP_Y_WEBGL,P.flipY),E.pixelStorei(E.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),E.pixelStorei(E.UNPACK_ALIGNMENT,P.unpackAlignment);const vt=E.getParameter(E.UNPACK_ROW_LENGTH),Be=E.getParameter(E.UNPACK_IMAGE_HEIGHT),St=E.getParameter(E.UNPACK_SKIP_PIXELS),bt=E.getParameter(E.UNPACK_SKIP_ROWS),Zt=E.getParameter(E.UNPACK_SKIP_IMAGES);E.pixelStorei(E.UNPACK_ROW_LENGTH,et.width),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,et.height),E.pixelStorei(E.UNPACK_SKIP_PIXELS,Ee),E.pixelStorei(E.UNPACK_SKIP_ROWS,Pe),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Ne);const li=f.isDataArrayTexture||f.isData3DTexture,Ye=P.isDataArrayTexture||P.isData3DTexture;if(f.isDepthTexture){const dt=s.get(f),Wt=s.get(P),ft=s.get(dt.__renderTarget),Xt=s.get(Wt.__renderTarget);xe.bindFramebuffer(E.READ_FRAMEBUFFER,ft.__webglFramebuffer),xe.bindFramebuffer(E.DRAW_FRAMEBUFFER,Xt.__webglFramebuffer);for(let ci=0;ci<ve;ci++)li&&(E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,s.get(f).__webglTexture,I,Ne+ci),E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,s.get(P).__webglTexture,oe,nt+ci)),E.blitFramebuffer(Ee,Pe,fe,se,Te,ke,fe,se,E.DEPTH_BUFFER_BIT,E.NEAREST);xe.bindFramebuffer(E.READ_FRAMEBUFFER,null),xe.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else if(I!==0||f.isRenderTargetTexture||s.has(f)){const dt=s.get(f),Wt=s.get(P);xe.bindFramebuffer(E.READ_FRAMEBUFFER,eo),xe.bindFramebuffer(E.DRAW_FRAMEBUFFER,to);for(let ft=0;ft<ve;ft++)li?E.framebufferTextureLayer(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,dt.__webglTexture,I,Ne+ft):E.framebufferTexture2D(E.READ_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,dt.__webglTexture,I),Ye?E.framebufferTextureLayer(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,Wt.__webglTexture,oe,nt+ft):E.framebufferTexture2D(E.DRAW_FRAMEBUFFER,E.COLOR_ATTACHMENT0,E.TEXTURE_2D,Wt.__webglTexture,oe),I!==0?E.blitFramebuffer(Ee,Pe,fe,se,Te,ke,fe,se,E.COLOR_BUFFER_BIT,E.NEAREST):Ye?E.copyTexSubImage3D(Se,oe,Te,ke,nt+ft,Ee,Pe,fe,se):E.copyTexSubImage2D(Se,oe,Te,ke,Ee,Pe,fe,se);xe.bindFramebuffer(E.READ_FRAMEBUFFER,null),xe.bindFramebuffer(E.DRAW_FRAMEBUFFER,null)}else Ye?f.isDataTexture||f.isData3DTexture?E.texSubImage3D(Se,oe,Te,ke,nt,fe,se,ve,We,pt,et.data):P.isCompressedArrayTexture?E.compressedTexSubImage3D(Se,oe,Te,ke,nt,fe,se,ve,We,et.data):E.texSubImage3D(Se,oe,Te,ke,nt,fe,se,ve,We,pt,et):f.isDataTexture?E.texSubImage2D(E.TEXTURE_2D,oe,Te,ke,fe,se,We,pt,et.data):f.isCompressedTexture?E.compressedTexSubImage2D(E.TEXTURE_2D,oe,Te,ke,et.width,et.height,We,et.data):E.texSubImage2D(E.TEXTURE_2D,oe,Te,ke,fe,se,We,pt,et);E.pixelStorei(E.UNPACK_ROW_LENGTH,vt),E.pixelStorei(E.UNPACK_IMAGE_HEIGHT,Be),E.pixelStorei(E.UNPACK_SKIP_PIXELS,St),E.pixelStorei(E.UNPACK_SKIP_ROWS,bt),E.pixelStorei(E.UNPACK_SKIP_IMAGES,Zt),oe===0&&P.generateMipmaps&&E.generateMipmap(Se),xe.unbindTexture()},this.initRenderTarget=function(f){s.get(f).__webglFramebuffer===void 0&&C.setupRenderTarget(f)},this.initTexture=function(f){f.isCubeTexture?C.setTextureCube(f,0):f.isData3DTexture?C.setTexture3D(f,0):f.isDataArrayTexture||f.isCompressedArrayTexture?C.setTexture2DArray(f,0):C.setTexture2D(f,0),xe.unbindTexture()},this.resetState=function(){y=0,V=0,W=null,xe.reset(),Q.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),i.unpackColorSpace=tt._getUnpackColorSpace()}}export{Cu as WebGLRenderer};
