"use strict";
(function() {

Error.stackTraceLimit=Infinity;var $global,$module;if(typeof window!=="undefined"){$global=window;}else if(typeof self!=="undefined"){$global=self;}else if(typeof global!=="undefined"){$global=global;$global.require=require;}else{$global=this;}if($global===undefined||$global.Array===undefined){throw new Error("no global object found");}if(typeof module!=="undefined"){$module=module;}var $packages={},$idCounter=0;var $keys=function(m){return m?Object.keys(m):[];};var $flushConsole=function(){};var $throwRuntimeError;var $throwNilPointerError=function(){$throwRuntimeError("invalid memory address or nil pointer dereference");};var $call=function(fn,rcvr,args){return fn.apply(rcvr,args);};var $makeFunc=function(fn){return function(){return $externalize(fn(this,new($sliceType($jsObjectPtr))($global.Array.prototype.slice.call(arguments,[]))),$emptyInterface);};};var $unused=function(v){};var $mapArray=function(array,f){var newArray=new array.constructor(array.length);for(var i=0;i<array.length;i++){newArray[i]=f(array[i]);}return newArray;};var $methodVal=function(recv,name){var vals=recv.$methodVals||{};recv.$methodVals=vals;var f=vals[name];if(f!==undefined){return f;}var method=recv[name];f=function(){$stackDepthOffset--;try{return method.apply(recv,arguments);}finally{$stackDepthOffset++;}};vals[name]=f;return f;};var $methodExpr=function(typ,name){var method=typ.prototype[name];if(method.$expr===undefined){method.$expr=function(){$stackDepthOffset--;try{if(typ.wrapped){arguments[0]=new typ(arguments[0]);}return Function.call.apply(method,arguments);}finally{$stackDepthOffset++;}};}return method.$expr;};var $ifaceMethodExprs={};var $ifaceMethodExpr=function(name){var expr=$ifaceMethodExprs["$"+name];if(expr===undefined){expr=$ifaceMethodExprs["$"+name]=function(){$stackDepthOffset--;try{return Function.call.apply(arguments[0][name],arguments);}finally{$stackDepthOffset++;}};}return expr;};var $subslice=function(slice,low,high,max){if(low<0||high<low||max<high||high>slice.$capacity||max>slice.$capacity){$throwRuntimeError("slice bounds out of range");}var s=new slice.constructor(slice.$array);s.$offset=slice.$offset+low;s.$length=slice.$length-low;s.$capacity=slice.$capacity-low;if(high!==undefined){s.$length=high-low;}if(max!==undefined){s.$capacity=max-low;}return s;};var $substring=function(str,low,high){if(low<0||high<low||high>str.length){$throwRuntimeError("slice bounds out of range");}return str.substring(low,high);};var $sliceToArray=function(slice){if(slice.$length===0){return[];}if(slice.$array.constructor!==Array){return slice.$array.subarray(slice.$offset,slice.$offset+slice.$length);}return slice.$array.slice(slice.$offset,slice.$offset+slice.$length);};var $decodeRune=function(str,pos){var c0=str.charCodeAt(pos);if(c0<0x80){return[c0,1];}if(c0!==c0||c0<0xC0){return[0xFFFD,1];}var c1=str.charCodeAt(pos+1);if(c1!==c1||c1<0x80||0xC0<=c1){return[0xFFFD,1];}if(c0<0xE0){var r=(c0&0x1F)<<6|(c1&0x3F);if(r<=0x7F){return[0xFFFD,1];}return[r,2];}var c2=str.charCodeAt(pos+2);if(c2!==c2||c2<0x80||0xC0<=c2){return[0xFFFD,1];}if(c0<0xF0){var r=(c0&0x0F)<<12|(c1&0x3F)<<6|(c2&0x3F);if(r<=0x7FF){return[0xFFFD,1];}if(0xD800<=r&&r<=0xDFFF){return[0xFFFD,1];}return[r,3];}var c3=str.charCodeAt(pos+3);if(c3!==c3||c3<0x80||0xC0<=c3){return[0xFFFD,1];}if(c0<0xF8){var r=(c0&0x07)<<18|(c1&0x3F)<<12|(c2&0x3F)<<6|(c3&0x3F);if(r<=0xFFFF||0x10FFFF<r){return[0xFFFD,1];}return[r,4];}return[0xFFFD,1];};var $encodeRune=function(r){if(r<0||r>0x10FFFF||(0xD800<=r&&r<=0xDFFF)){r=0xFFFD;}if(r<=0x7F){return String.fromCharCode(r);}if(r<=0x7FF){return String.fromCharCode(0xC0|r>>6,0x80|(r&0x3F));}if(r<=0xFFFF){return String.fromCharCode(0xE0|r>>12,0x80|(r>>6&0x3F),0x80|(r&0x3F));}return String.fromCharCode(0xF0|r>>18,0x80|(r>>12&0x3F),0x80|(r>>6&0x3F),0x80|(r&0x3F));};var $stringToBytes=function(str){var array=new Uint8Array(str.length);for(var i=0;i<str.length;i++){array[i]=str.charCodeAt(i);}return array;};var $bytesToString=function(slice){if(slice.$length===0){return"";}var str="";for(var i=0;i<slice.$length;i+=10000){str+=String.fromCharCode.apply(undefined,slice.$array.subarray(slice.$offset+i,slice.$offset+Math.min(slice.$length,i+10000)));}return str;};var $stringToRunes=function(str){var array=new Int32Array(str.length);var rune,j=0;for(var i=0;i<str.length;i+=rune[1],j++){rune=$decodeRune(str,i);array[j]=rune[0];}return array.subarray(0,j);};var $runesToString=function(slice){if(slice.$length===0){return"";}var str="";for(var i=0;i<slice.$length;i++){str+=$encodeRune(slice.$array[slice.$offset+i]);}return str;};var $copyString=function(dst,src){var n=Math.min(src.length,dst.$length);for(var i=0;i<n;i++){dst.$array[dst.$offset+i]=src.charCodeAt(i);}return n;};var $copySlice=function(dst,src){var n=Math.min(src.$length,dst.$length);$copyArray(dst.$array,src.$array,dst.$offset,src.$offset,n,dst.constructor.elem);return n;};var $copyArray=function(dst,src,dstOffset,srcOffset,n,elem){if(n===0||(dst===src&&dstOffset===srcOffset)){return;}if(src.subarray){dst.set(src.subarray(srcOffset,srcOffset+n),dstOffset);return;}switch(elem.kind){case $kindArray:case $kindStruct:if(dst===src&&dstOffset>srcOffset){for(var i=n-1;i>=0;i--){elem.copy(dst[dstOffset+i],src[srcOffset+i]);}return;}for(var i=0;i<n;i++){elem.copy(dst[dstOffset+i],src[srcOffset+i]);}return;}if(dst===src&&dstOffset>srcOffset){for(var i=n-1;i>=0;i--){dst[dstOffset+i]=src[srcOffset+i];}return;}for(var i=0;i<n;i++){dst[dstOffset+i]=src[srcOffset+i];}};var $clone=function(src,type){var clone=type.zero();type.copy(clone,src);return clone;};var $pointerOfStructConversion=function(obj,type){if(obj.$proxies===undefined){obj.$proxies={};obj.$proxies[obj.constructor.string]=obj;}var proxy=obj.$proxies[type.string];if(proxy===undefined){var properties={};for(var i=0;i<type.elem.fields.length;i++){(function(fieldProp){properties[fieldProp]={get:function(){return obj[fieldProp];},set:function(value){obj[fieldProp]=value;}};})(type.elem.fields[i].prop);}proxy=Object.create(type.prototype,properties);proxy.$val=proxy;obj.$proxies[type.string]=proxy;proxy.$proxies=obj.$proxies;}return proxy;};var $append=function(slice){return $internalAppend(slice,arguments,1,arguments.length-1);};var $appendSlice=function(slice,toAppend){if(toAppend.constructor===String){var bytes=$stringToBytes(toAppend);return $internalAppend(slice,bytes,0,bytes.length);}return $internalAppend(slice,toAppend.$array,toAppend.$offset,toAppend.$length);};var $internalAppend=function(slice,array,offset,length){if(length===0){return slice;}var newArray=slice.$array;var newOffset=slice.$offset;var newLength=slice.$length+length;var newCapacity=slice.$capacity;if(newLength>newCapacity){newOffset=0;newCapacity=Math.max(newLength,slice.$capacity<1024?slice.$capacity*2:Math.floor(slice.$capacity*5/4));if(slice.$array.constructor===Array){newArray=slice.$array.slice(slice.$offset,slice.$offset+slice.$length);newArray.length=newCapacity;var zero=slice.constructor.elem.zero;for(var i=slice.$length;i<newCapacity;i++){newArray[i]=zero();}}else{newArray=new slice.$array.constructor(newCapacity);newArray.set(slice.$array.subarray(slice.$offset,slice.$offset+slice.$length));}}$copyArray(newArray,array,newOffset+slice.$length,offset,length,slice.constructor.elem);var newSlice=new slice.constructor(newArray);newSlice.$offset=newOffset;newSlice.$length=newLength;newSlice.$capacity=newCapacity;return newSlice;};var $equal=function(a,b,type){if(type===$jsObjectPtr){return a===b;}switch(type.kind){case $kindComplex64:case $kindComplex128:return a.$real===b.$real&&a.$imag===b.$imag;case $kindInt64:case $kindUint64:return a.$high===b.$high&&a.$low===b.$low;case $kindArray:if(a.length!==b.length){return false;}for(var i=0;i<a.length;i++){if(!$equal(a[i],b[i],type.elem)){return false;}}return true;case $kindStruct:for(var i=0;i<type.fields.length;i++){var f=type.fields[i];if(!$equal(a[f.prop],b[f.prop],f.typ)){return false;}}return true;case $kindInterface:return $interfaceIsEqual(a,b);default:return a===b;}};var $interfaceIsEqual=function(a,b){if(a===$ifaceNil||b===$ifaceNil){return a===b;}if(a.constructor!==b.constructor){return false;}if(a.constructor===$jsObjectPtr){return a.object===b.object;}if(!a.constructor.comparable){$throwRuntimeError("comparing uncomparable type "+a.constructor.string);}return $equal(a.$val,b.$val,a.constructor);};var $min=Math.min;var $mod=function(x,y){return x%y;};var $parseInt=parseInt;var $parseFloat=function(f){if(f!==undefined&&f!==null&&f.constructor===Number){return f;}return parseFloat(f);};var $froundBuf=new Float32Array(1);var $fround=Math.fround||function(f){$froundBuf[0]=f;return $froundBuf[0];};var $imul=Math.imul||function(a,b){var ah=(a>>>16)&0xffff;var al=a&0xffff;var bh=(b>>>16)&0xffff;var bl=b&0xffff;return((al*bl)+(((ah*bl+al*bh)<<16)>>>0)>>0);};var $floatKey=function(f){if(f!==f){$idCounter++;return"NaN$"+$idCounter;}return String(f);};var $flatten64=function(x){return x.$high*4294967296+x.$low;};var $shiftLeft64=function(x,y){if(y===0){return x;}if(y<32){return new x.constructor(x.$high<<y|x.$low>>>(32-y),(x.$low<<y)>>>0);}if(y<64){return new x.constructor(x.$low<<(y-32),0);}return new x.constructor(0,0);};var $shiftRightInt64=function(x,y){if(y===0){return x;}if(y<32){return new x.constructor(x.$high>>y,(x.$low>>>y|x.$high<<(32-y))>>>0);}if(y<64){return new x.constructor(x.$high>>31,(x.$high>>(y-32))>>>0);}if(x.$high<0){return new x.constructor(-1,4294967295);}return new x.constructor(0,0);};var $shiftRightUint64=function(x,y){if(y===0){return x;}if(y<32){return new x.constructor(x.$high>>>y,(x.$low>>>y|x.$high<<(32-y))>>>0);}if(y<64){return new x.constructor(0,x.$high>>>(y-32));}return new x.constructor(0,0);};var $mul64=function(x,y){var high=0,low=0;if((y.$low&1)!==0){high=x.$high;low=x.$low;}for(var i=1;i<32;i++){if((y.$low&1<<i)!==0){high+=x.$high<<i|x.$low>>>(32-i);low+=(x.$low<<i)>>>0;}}for(var i=0;i<32;i++){if((y.$high&1<<i)!==0){high+=x.$low<<i;}}return new x.constructor(high,low);};var $div64=function(x,y,returnRemainder){if(y.$high===0&&y.$low===0){$throwRuntimeError("integer divide by zero");}var s=1;var rs=1;var xHigh=x.$high;var xLow=x.$low;if(xHigh<0){s=-1;rs=-1;xHigh=-xHigh;if(xLow!==0){xHigh--;xLow=4294967296-xLow;}}var yHigh=y.$high;var yLow=y.$low;if(y.$high<0){s*=-1;yHigh=-yHigh;if(yLow!==0){yHigh--;yLow=4294967296-yLow;}}var high=0,low=0,n=0;while(yHigh<2147483648&&((xHigh>yHigh)||(xHigh===yHigh&&xLow>yLow))){yHigh=(yHigh<<1|yLow>>>31)>>>0;yLow=(yLow<<1)>>>0;n++;}for(var i=0;i<=n;i++){high=high<<1|low>>>31;low=(low<<1)>>>0;if((xHigh>yHigh)||(xHigh===yHigh&&xLow>=yLow)){xHigh=xHigh-yHigh;xLow=xLow-yLow;if(xLow<0){xHigh--;xLow+=4294967296;}low++;if(low===4294967296){high++;low=0;}}yLow=(yLow>>>1|yHigh<<(32-1))>>>0;yHigh=yHigh>>>1;}if(returnRemainder){return new x.constructor(xHigh*rs,xLow*rs);}return new x.constructor(high*s,low*s);};var $divComplex=function(n,d){var ninf=n.$real===Infinity||n.$real===-Infinity||n.$imag===Infinity||n.$imag===-Infinity;var dinf=d.$real===Infinity||d.$real===-Infinity||d.$imag===Infinity||d.$imag===-Infinity;var nnan=!ninf&&(n.$real!==n.$real||n.$imag!==n.$imag);var dnan=!dinf&&(d.$real!==d.$real||d.$imag!==d.$imag);if(nnan||dnan){return new n.constructor(NaN,NaN);}if(ninf&&!dinf){return new n.constructor(Infinity,Infinity);}if(!ninf&&dinf){return new n.constructor(0,0);}if(d.$real===0&&d.$imag===0){if(n.$real===0&&n.$imag===0){return new n.constructor(NaN,NaN);}return new n.constructor(Infinity,Infinity);}var a=Math.abs(d.$real);var b=Math.abs(d.$imag);if(a<=b){var ratio=d.$real/d.$imag;var denom=d.$real*ratio+d.$imag;return new n.constructor((n.$real*ratio+n.$imag)/denom,(n.$imag*ratio-n.$real)/denom);}var ratio=d.$imag/d.$real;var denom=d.$imag*ratio+d.$real;return new n.constructor((n.$imag*ratio+n.$real)/denom,(n.$imag-n.$real*ratio)/denom);};var $kindBool=1;var $kindInt=2;var $kindInt8=3;var $kindInt16=4;var $kindInt32=5;var $kindInt64=6;var $kindUint=7;var $kindUint8=8;var $kindUint16=9;var $kindUint32=10;var $kindUint64=11;var $kindUintptr=12;var $kindFloat32=13;var $kindFloat64=14;var $kindComplex64=15;var $kindComplex128=16;var $kindArray=17;var $kindChan=18;var $kindFunc=19;var $kindInterface=20;var $kindMap=21;var $kindPtr=22;var $kindSlice=23;var $kindString=24;var $kindStruct=25;var $kindUnsafePointer=26;var $methodSynthesizers=[];var $addMethodSynthesizer=function(f){if($methodSynthesizers===null){f();return;}$methodSynthesizers.push(f);};var $synthesizeMethods=function(){$methodSynthesizers.forEach(function(f){f();});$methodSynthesizers=null;};var $ifaceKeyFor=function(x){if(x===$ifaceNil){return'nil';}var c=x.constructor;return c.string+'$'+c.keyFor(x.$val);};var $identity=function(x){return x;};var $typeIDCounter=0;var $idKey=function(x){if(x.$id===undefined){$idCounter++;x.$id=$idCounter;}return String(x.$id);};var $newType=function(size,kind,string,named,pkg,exported,constructor){var typ;switch(kind){case $kindBool:case $kindInt:case $kindInt8:case $kindInt16:case $kindInt32:case $kindUint:case $kindUint8:case $kindUint16:case $kindUint32:case $kindUintptr:case $kindUnsafePointer:typ=function(v){this.$val=v;};typ.wrapped=true;typ.keyFor=$identity;break;case $kindString:typ=function(v){this.$val=v;};typ.wrapped=true;typ.keyFor=function(x){return"$"+x;};break;case $kindFloat32:case $kindFloat64:typ=function(v){this.$val=v;};typ.wrapped=true;typ.keyFor=function(x){return $floatKey(x);};break;case $kindInt64:typ=function(high,low){this.$high=(high+Math.floor(Math.ceil(low)/4294967296))>>0;this.$low=low>>>0;this.$val=this;};typ.keyFor=function(x){return x.$high+"$"+x.$low;};break;case $kindUint64:typ=function(high,low){this.$high=(high+Math.floor(Math.ceil(low)/4294967296))>>>0;this.$low=low>>>0;this.$val=this;};typ.keyFor=function(x){return x.$high+"$"+x.$low;};break;case $kindComplex64:typ=function(real,imag){this.$real=$fround(real);this.$imag=$fround(imag);this.$val=this;};typ.keyFor=function(x){return x.$real+"$"+x.$imag;};break;case $kindComplex128:typ=function(real,imag){this.$real=real;this.$imag=imag;this.$val=this;};typ.keyFor=function(x){return x.$real+"$"+x.$imag;};break;case $kindArray:typ=function(v){this.$val=v;};typ.wrapped=true;typ.ptr=$newType(4,$kindPtr,"*"+string,false,"",false,function(array){this.$get=function(){return array;};this.$set=function(v){typ.copy(this,v);};this.$val=array;});typ.init=function(elem,len){typ.elem=elem;typ.len=len;typ.comparable=elem.comparable;typ.keyFor=function(x){return Array.prototype.join.call($mapArray(x,function(e){return String(elem.keyFor(e)).replace(/\\/g,"\\\\").replace(/\$/g,"\\$");}),"$");};typ.copy=function(dst,src){$copyArray(dst,src,0,0,src.length,elem);};typ.ptr.init(typ);Object.defineProperty(typ.ptr.nil,"nilCheck",{get:$throwNilPointerError});};break;case $kindChan:typ=function(v){this.$val=v;};typ.wrapped=true;typ.keyFor=$idKey;typ.init=function(elem,sendOnly,recvOnly){typ.elem=elem;typ.sendOnly=sendOnly;typ.recvOnly=recvOnly;};break;case $kindFunc:typ=function(v){this.$val=v;};typ.wrapped=true;typ.init=function(params,results,variadic){typ.params=params;typ.results=results;typ.variadic=variadic;typ.comparable=false;};break;case $kindInterface:typ={implementedBy:{},missingMethodFor:{}};typ.keyFor=$ifaceKeyFor;typ.init=function(methods){typ.methods=methods;methods.forEach(function(m){$ifaceNil[m.prop]=$throwNilPointerError;});};break;case $kindMap:typ=function(v){this.$val=v;};typ.wrapped=true;typ.init=function(key,elem){typ.key=key;typ.elem=elem;typ.comparable=false;};break;case $kindPtr:typ=constructor||function(getter,setter,target){this.$get=getter;this.$set=setter;this.$target=target;this.$val=this;};typ.keyFor=$idKey;typ.init=function(elem){typ.elem=elem;typ.wrapped=(elem.kind===$kindArray);typ.nil=new typ($throwNilPointerError,$throwNilPointerError);};break;case $kindSlice:typ=function(array){if(array.constructor!==typ.nativeArray){array=new typ.nativeArray(array);}this.$array=array;this.$offset=0;this.$length=array.length;this.$capacity=array.length;this.$val=this;};typ.init=function(elem){typ.elem=elem;typ.comparable=false;typ.nativeArray=$nativeArray(elem.kind);typ.nil=new typ([]);};break;case $kindStruct:typ=function(v){this.$val=v;};typ.wrapped=true;typ.ptr=$newType(4,$kindPtr,"*"+string,false,"",exported,constructor);typ.ptr.elem=typ;typ.ptr.prototype.$get=function(){return this;};typ.ptr.prototype.$set=function(v){typ.copy(this,v);};typ.init=function(pkgPath,fields){typ.pkgPath=pkgPath;typ.fields=fields;fields.forEach(function(f){if(!f.typ.comparable){typ.comparable=false;}});typ.keyFor=function(x){var val=x.$val;return $mapArray(fields,function(f){return String(f.typ.keyFor(val[f.prop])).replace(/\\/g,"\\\\").replace(/\$/g,"\\$");}).join("$");};typ.copy=function(dst,src){for(var i=0;i<fields.length;i++){var f=fields[i];switch(f.typ.kind){case $kindArray:case $kindStruct:f.typ.copy(dst[f.prop],src[f.prop]);continue;default:dst[f.prop]=src[f.prop];continue;}}};var properties={};fields.forEach(function(f){properties[f.prop]={get:$throwNilPointerError,set:$throwNilPointerError};});typ.ptr.nil=Object.create(constructor.prototype,properties);typ.ptr.nil.$val=typ.ptr.nil;$addMethodSynthesizer(function(){var synthesizeMethod=function(target,m,f){if(target.prototype[m.prop]!==undefined){return;}target.prototype[m.prop]=function(){var v=this.$val[f.prop];if(f.typ===$jsObjectPtr){v=new $jsObjectPtr(v);}if(v.$val===undefined){v=new f.typ(v);}return v[m.prop].apply(v,arguments);};};fields.forEach(function(f){if(f.name===""){$methodSet(f.typ).forEach(function(m){synthesizeMethod(typ,m,f);synthesizeMethod(typ.ptr,m,f);});$methodSet($ptrType(f.typ)).forEach(function(m){synthesizeMethod(typ.ptr,m,f);});}});});};break;default:$panic(new $String("invalid kind: "+kind));}switch(kind){case $kindBool:case $kindMap:typ.zero=function(){return false;};break;case $kindInt:case $kindInt8:case $kindInt16:case $kindInt32:case $kindUint:case $kindUint8:case $kindUint16:case $kindUint32:case $kindUintptr:case $kindUnsafePointer:case $kindFloat32:case $kindFloat64:typ.zero=function(){return 0;};break;case $kindString:typ.zero=function(){return"";};break;case $kindInt64:case $kindUint64:case $kindComplex64:case $kindComplex128:var zero=new typ(0,0);typ.zero=function(){return zero;};break;case $kindPtr:case $kindSlice:typ.zero=function(){return typ.nil;};break;case $kindChan:typ.zero=function(){return $chanNil;};break;case $kindFunc:typ.zero=function(){return $throwNilPointerError;};break;case $kindInterface:typ.zero=function(){return $ifaceNil;};break;case $kindArray:typ.zero=function(){var arrayClass=$nativeArray(typ.elem.kind);if(arrayClass!==Array){return new arrayClass(typ.len);}var array=new Array(typ.len);for(var i=0;i<typ.len;i++){array[i]=typ.elem.zero();}return array;};break;case $kindStruct:typ.zero=function(){return new typ.ptr();};break;default:$panic(new $String("invalid kind: "+kind));}typ.id=$typeIDCounter;$typeIDCounter++;typ.size=size;typ.kind=kind;typ.string=string;typ.named=named;typ.pkg=pkg;typ.exported=exported;typ.methods=[];typ.methodSetCache=null;typ.comparable=true;return typ;};var $methodSet=function(typ){if(typ.methodSetCache!==null){return typ.methodSetCache;}var base={};var isPtr=(typ.kind===$kindPtr);if(isPtr&&typ.elem.kind===$kindInterface){typ.methodSetCache=[];return[];}var current=[{typ:isPtr?typ.elem:typ,indirect:isPtr}];var seen={};while(current.length>0){var next=[];var mset=[];current.forEach(function(e){if(seen[e.typ.string]){return;}seen[e.typ.string]=true;if(e.typ.named){mset=mset.concat(e.typ.methods);if(e.indirect){mset=mset.concat($ptrType(e.typ).methods);}}switch(e.typ.kind){case $kindStruct:e.typ.fields.forEach(function(f){if(f.name===""){var fTyp=f.typ;var fIsPtr=(fTyp.kind===$kindPtr);next.push({typ:fIsPtr?fTyp.elem:fTyp,indirect:e.indirect||fIsPtr});}});break;case $kindInterface:mset=mset.concat(e.typ.methods);break;}});mset.forEach(function(m){if(base[m.name]===undefined){base[m.name]=m;}});current=next;}typ.methodSetCache=[];Object.keys(base).sort().forEach(function(name){typ.methodSetCache.push(base[name]);});return typ.methodSetCache;};var $Bool=$newType(1,$kindBool,"bool",true,"",false,null);var $Int=$newType(4,$kindInt,"int",true,"",false,null);var $Int8=$newType(1,$kindInt8,"int8",true,"",false,null);var $Int16=$newType(2,$kindInt16,"int16",true,"",false,null);var $Int32=$newType(4,$kindInt32,"int32",true,"",false,null);var $Int64=$newType(8,$kindInt64,"int64",true,"",false,null);var $Uint=$newType(4,$kindUint,"uint",true,"",false,null);var $Uint8=$newType(1,$kindUint8,"uint8",true,"",false,null);var $Uint16=$newType(2,$kindUint16,"uint16",true,"",false,null);var $Uint32=$newType(4,$kindUint32,"uint32",true,"",false,null);var $Uint64=$newType(8,$kindUint64,"uint64",true,"",false,null);var $Uintptr=$newType(4,$kindUintptr,"uintptr",true,"",false,null);var $Float32=$newType(4,$kindFloat32,"float32",true,"",false,null);var $Float64=$newType(8,$kindFloat64,"float64",true,"",false,null);var $Complex64=$newType(8,$kindComplex64,"complex64",true,"",false,null);var $Complex128=$newType(16,$kindComplex128,"complex128",true,"",false,null);var $String=$newType(8,$kindString,"string",true,"",false,null);var $UnsafePointer=$newType(4,$kindUnsafePointer,"unsafe.Pointer",true,"",false,null);var $nativeArray=function(elemKind){switch(elemKind){case $kindInt:return Int32Array;case $kindInt8:return Int8Array;case $kindInt16:return Int16Array;case $kindInt32:return Int32Array;case $kindUint:return Uint32Array;case $kindUint8:return Uint8Array;case $kindUint16:return Uint16Array;case $kindUint32:return Uint32Array;case $kindUintptr:return Uint32Array;case $kindFloat32:return Float32Array;case $kindFloat64:return Float64Array;default:return Array;}};var $toNativeArray=function(elemKind,array){var nativeArray=$nativeArray(elemKind);if(nativeArray===Array){return array;}return new nativeArray(array);};var $arrayTypes={};var $arrayType=function(elem,len){var typeKey=elem.id+"$"+len;var typ=$arrayTypes[typeKey];if(typ===undefined){typ=$newType(12,$kindArray,"["+len+"]"+elem.string,false,"",false,null);$arrayTypes[typeKey]=typ;typ.init(elem,len);}return typ;};var $chanType=function(elem,sendOnly,recvOnly){var string=(recvOnly?"<-":"")+"chan"+(sendOnly?"<- ":" ")+elem.string;var field=sendOnly?"SendChan":(recvOnly?"RecvChan":"Chan");var typ=elem[field];if(typ===undefined){typ=$newType(4,$kindChan,string,false,"",false,null);elem[field]=typ;typ.init(elem,sendOnly,recvOnly);}return typ;};var $Chan=function(elem,capacity){if(capacity<0||capacity>2147483647){$throwRuntimeError("makechan: size out of range");}this.$elem=elem;this.$capacity=capacity;this.$buffer=[];this.$sendQueue=[];this.$recvQueue=[];this.$closed=false;};var $chanNil=new $Chan(null,0);$chanNil.$sendQueue=$chanNil.$recvQueue={length:0,push:function(){},shift:function(){return undefined;},indexOf:function(){return-1;}};var $funcTypes={};var $funcType=function(params,results,variadic){var typeKey=$mapArray(params,function(p){return p.id;}).join(",")+"$"+$mapArray(results,function(r){return r.id;}).join(",")+"$"+variadic;var typ=$funcTypes[typeKey];if(typ===undefined){var paramTypes=$mapArray(params,function(p){return p.string;});if(variadic){paramTypes[paramTypes.length-1]="..."+paramTypes[paramTypes.length-1].substr(2);}var string="func("+paramTypes.join(", ")+")";if(results.length===1){string+=" "+results[0].string;}else if(results.length>1){string+=" ("+$mapArray(results,function(r){return r.string;}).join(", ")+")";}typ=$newType(4,$kindFunc,string,false,"",false,null);$funcTypes[typeKey]=typ;typ.init(params,results,variadic);}return typ;};var $interfaceTypes={};var $interfaceType=function(methods){var typeKey=$mapArray(methods,function(m){return m.pkg+","+m.name+","+m.typ.id;}).join("$");var typ=$interfaceTypes[typeKey];if(typ===undefined){var string="interface {}";if(methods.length!==0){string="interface { "+$mapArray(methods,function(m){return(m.pkg!==""?m.pkg+".":"")+m.name+m.typ.string.substr(4);}).join("; ")+" }";}typ=$newType(8,$kindInterface,string,false,"",false,null);$interfaceTypes[typeKey]=typ;typ.init(methods);}return typ;};var $emptyInterface=$interfaceType([]);var $ifaceNil={};var $error=$newType(8,$kindInterface,"error",true,"",false,null);$error.init([{prop:"Error",name:"Error",pkg:"",typ:$funcType([],[$String],false)}]);var $mapTypes={};var $mapType=function(key,elem){var typeKey=key.id+"$"+elem.id;var typ=$mapTypes[typeKey];if(typ===undefined){typ=$newType(4,$kindMap,"map["+key.string+"]"+elem.string,false,"",false,null);$mapTypes[typeKey]=typ;typ.init(key,elem);}return typ;};var $makeMap=function(keyForFunc,entries){var m={};for(var i=0;i<entries.length;i++){var e=entries[i];m[keyForFunc(e.k)]=e;}return m;};var $ptrType=function(elem){var typ=elem.ptr;if(typ===undefined){typ=$newType(4,$kindPtr,"*"+elem.string,false,"",elem.exported,null);elem.ptr=typ;typ.init(elem);}return typ;};var $newDataPointer=function(data,constructor){if(constructor.elem.kind===$kindStruct){return data;}return new constructor(function(){return data;},function(v){data=v;});};var $indexPtr=function(array,index,constructor){array.$ptr=array.$ptr||{};return array.$ptr[index]||(array.$ptr[index]=new constructor(function(){return array[index];},function(v){array[index]=v;}));};var $sliceType=function(elem){var typ=elem.slice;if(typ===undefined){typ=$newType(12,$kindSlice,"[]"+elem.string,false,"",false,null);elem.slice=typ;typ.init(elem);}return typ;};var $makeSlice=function(typ,length,capacity){capacity=capacity||length;if(length<0||length>2147483647){$throwRuntimeError("makeslice: len out of range");}if(capacity<0||capacity<length||capacity>2147483647){$throwRuntimeError("makeslice: cap out of range");}var array=new typ.nativeArray(capacity);if(typ.nativeArray===Array){for(var i=0;i<capacity;i++){array[i]=typ.elem.zero();}}var slice=new typ(array);slice.$length=length;return slice;};var $structTypes={};var $structType=function(pkgPath,fields){var typeKey=$mapArray(fields,function(f){return f.name+","+f.typ.id+","+f.tag;}).join("$");var typ=$structTypes[typeKey];if(typ===undefined){var string="struct { "+$mapArray(fields,function(f){return f.name+" "+f.typ.string+(f.tag!==""?(" \""+f.tag.replace(/\\/g,"\\\\").replace(/"/g, "\\\"")+"\""):"");}).join("; ")+" }";if(fields.length===0){string="struct {}";}typ=$newType(0,$kindStruct,string,false,"",false,function(){this.$val=this;for(var i=0;i<fields.length;i++){var f=fields[i];var arg=arguments[i];this[f.prop]=arg!==undefined?arg:f.typ.zero();}});$structTypes[typeKey]=typ;typ.init(pkgPath,fields);}return typ;};var $assertType=function(value,type,returnTuple){var isInterface=(type.kind===$kindInterface),ok,missingMethod="";if(value===$ifaceNil){ok=false;}else if(!isInterface){ok=value.constructor===type;}else{var valueTypeString=value.constructor.string;ok=type.implementedBy[valueTypeString];if(ok===undefined){ok=true;var valueMethodSet=$methodSet(value.constructor);var interfaceMethods=type.methods;for(var i=0;i<interfaceMethods.length;i++){var tm=interfaceMethods[i];var found=false;for(var j=0;j<valueMethodSet.length;j++){var vm=valueMethodSet[j];if(vm.name===tm.name&&vm.pkg===tm.pkg&&vm.typ===tm.typ){found=true;break;}}if(!found){ok=false;type.missingMethodFor[valueTypeString]=tm.name;break;}}type.implementedBy[valueTypeString]=ok;}if(!ok){missingMethod=type.missingMethodFor[valueTypeString];}}if(!ok){if(returnTuple){return[type.zero(),false];}$panic(new $packages["runtime"].TypeAssertionError.ptr("",(value===$ifaceNil?"":value.constructor.string),type.string,missingMethod));}if(!isInterface){value=value.$val;}if(type===$jsObjectPtr){value=value.object;}return returnTuple?[value,true]:value;};var $stackDepthOffset=0;var $getStackDepth=function(){var err=new Error();if(err.stack===undefined){return undefined;}return $stackDepthOffset+err.stack.split("\n").length;};var $panicStackDepth=null,$panicValue;var $callDeferred=function(deferred,jsErr,fromPanic){if(!fromPanic&&deferred!==null&&deferred.index>=$curGoroutine.deferStack.length){throw jsErr;}if(jsErr!==null){var newErr=null;try{$curGoroutine.deferStack.push(deferred);$panic(new $jsErrorPtr(jsErr));}catch(err){newErr=err;}$curGoroutine.deferStack.pop();$callDeferred(deferred,newErr);return;}if($curGoroutine.asleep){return;}$stackDepthOffset--;var outerPanicStackDepth=$panicStackDepth;var outerPanicValue=$panicValue;var localPanicValue=$curGoroutine.panicStack.pop();if(localPanicValue!==undefined){$panicStackDepth=$getStackDepth();$panicValue=localPanicValue;}try{while(true){if(deferred===null){deferred=$curGoroutine.deferStack[$curGoroutine.deferStack.length-1];if(deferred===undefined){$panicStackDepth=null;if(localPanicValue.Object instanceof Error){throw localPanicValue.Object;}var msg;if(localPanicValue.constructor===$String){msg=localPanicValue.$val;}else if(localPanicValue.Error!==undefined){msg=localPanicValue.Error();}else if(localPanicValue.String!==undefined){msg=localPanicValue.String();}else{msg=localPanicValue;}throw new Error(msg);}}var call=deferred.pop();if(call===undefined){$curGoroutine.deferStack.pop();if(localPanicValue!==undefined){deferred=null;continue;}return;}var r=call[0].apply(call[2],call[1]);if(r&&r.$blk!==undefined){deferred.push([r.$blk,[],r]);if(fromPanic){throw null;}return;}if(localPanicValue!==undefined&&$panicStackDepth===null){throw null;}}}finally{if(localPanicValue!==undefined){if($panicStackDepth!==null){$curGoroutine.panicStack.push(localPanicValue);}$panicStackDepth=outerPanicStackDepth;$panicValue=outerPanicValue;}$stackDepthOffset++;}};var $panic=function(value){$curGoroutine.panicStack.push(value);$callDeferred(null,null,true);};var $recover=function(){if($panicStackDepth===null||($panicStackDepth!==undefined&&$panicStackDepth!==$getStackDepth()-2)){return $ifaceNil;}$panicStackDepth=null;return $panicValue;};var $throw=function(err){throw err;};var $noGoroutine={asleep:false,exit:false,deferStack:[],panicStack:[]};var $curGoroutine=$noGoroutine,$totalGoroutines=0,$awakeGoroutines=0,$checkForDeadlock=true;var $mainFinished=false;var $go=function(fun,args,direct){$totalGoroutines++;$awakeGoroutines++;var $goroutine=function(){try{$curGoroutine=$goroutine;var r=fun.apply(undefined,args);if(r&&r.$blk!==undefined){fun=function(){return r.$blk();};args=[];return;}$goroutine.exit=true;}catch(err){if(!$goroutine.exit){throw err;}}finally{$curGoroutine=$noGoroutine;if($goroutine.exit){$totalGoroutines--;$goroutine.asleep=true;}if($goroutine.asleep){$awakeGoroutines--;if(!$mainFinished&&$awakeGoroutines===0&&$checkForDeadlock){console.error("fatal error: all goroutines are asleep - deadlock!");if($global.process!==undefined){$global.process.exit(2);}}}}};$goroutine.asleep=false;$goroutine.exit=false;$goroutine.deferStack=[];$goroutine.panicStack=[];$schedule($goroutine);};var $scheduled=[];var $runScheduled=function(){try{var r;while((r=$scheduled.shift())!==undefined){r();}}finally{if($scheduled.length>0){setTimeout($runScheduled,0);}}};var $schedule=function(goroutine){if(goroutine.asleep){goroutine.asleep=false;$awakeGoroutines++;}$scheduled.push(goroutine);if($curGoroutine===$noGoroutine){$runScheduled();}};var $setTimeout=function(f,t){$awakeGoroutines++;return setTimeout(function(){$awakeGoroutines--;f();},t);};var $block=function(){if($curGoroutine===$noGoroutine){$throwRuntimeError("cannot block in JavaScript callback, fix by wrapping code in goroutine");}$curGoroutine.asleep=true;};var $send=function(chan,value){if(chan.$closed){$throwRuntimeError("send on closed channel");}var queuedRecv=chan.$recvQueue.shift();if(queuedRecv!==undefined){queuedRecv([value,true]);return;}if(chan.$buffer.length<chan.$capacity){chan.$buffer.push(value);return;}var thisGoroutine=$curGoroutine;var closedDuringSend;chan.$sendQueue.push(function(closed){closedDuringSend=closed;$schedule(thisGoroutine);return value;});$block();return{$blk:function(){if(closedDuringSend){$throwRuntimeError("send on closed channel");}}};};var $recv=function(chan){var queuedSend=chan.$sendQueue.shift();if(queuedSend!==undefined){chan.$buffer.push(queuedSend(false));}var bufferedValue=chan.$buffer.shift();if(bufferedValue!==undefined){return[bufferedValue,true];}if(chan.$closed){return[chan.$elem.zero(),false];}var thisGoroutine=$curGoroutine;var f={$blk:function(){return this.value;}};var queueEntry=function(v){f.value=v;$schedule(thisGoroutine);};chan.$recvQueue.push(queueEntry);$block();return f;};var $close=function(chan){if(chan.$closed){$throwRuntimeError("close of closed channel");}chan.$closed=true;while(true){var queuedSend=chan.$sendQueue.shift();if(queuedSend===undefined){break;}queuedSend(true);}while(true){var queuedRecv=chan.$recvQueue.shift();if(queuedRecv===undefined){break;}queuedRecv([chan.$elem.zero(),false]);}};var $select=function(comms){var ready=[];var selection=-1;for(var i=0;i<comms.length;i++){var comm=comms[i];var chan=comm[0];switch(comm.length){case 0:selection=i;break;case 1:if(chan.$sendQueue.length!==0||chan.$buffer.length!==0||chan.$closed){ready.push(i);}break;case 2:if(chan.$closed){$throwRuntimeError("send on closed channel");}if(chan.$recvQueue.length!==0||chan.$buffer.length<chan.$capacity){ready.push(i);}break;}}if(ready.length!==0){selection=ready[Math.floor(Math.random()*ready.length)];}if(selection!==-1){var comm=comms[selection];switch(comm.length){case 0:return[selection];case 1:return[selection,$recv(comm[0])];case 2:$send(comm[0],comm[1]);return[selection];}}var entries=[];var thisGoroutine=$curGoroutine;var f={$blk:function(){return this.selection;}};var removeFromQueues=function(){for(var i=0;i<entries.length;i++){var entry=entries[i];var queue=entry[0];var index=queue.indexOf(entry[1]);if(index!==-1){queue.splice(index,1);}}};for(var i=0;i<comms.length;i++){(function(i){var comm=comms[i];switch(comm.length){case 1:var queueEntry=function(value){f.selection=[i,value];removeFromQueues();$schedule(thisGoroutine);};entries.push([comm[0].$recvQueue,queueEntry]);comm[0].$recvQueue.push(queueEntry);break;case 2:var queueEntry=function(){if(comm[0].$closed){$throwRuntimeError("send on closed channel");}f.selection=[i];removeFromQueues();$schedule(thisGoroutine);return comm[1];};entries.push([comm[0].$sendQueue,queueEntry]);comm[0].$sendQueue.push(queueEntry);break;}})(i);}$block();return f;};var $jsObjectPtr,$jsErrorPtr;var $needsExternalization=function(t){switch(t.kind){case $kindBool:case $kindInt:case $kindInt8:case $kindInt16:case $kindInt32:case $kindUint:case $kindUint8:case $kindUint16:case $kindUint32:case $kindUintptr:case $kindFloat32:case $kindFloat64:return false;default:return t!==$jsObjectPtr;}};var $externalize=function(v,t){if(t===$jsObjectPtr){return v;}switch(t.kind){case $kindBool:case $kindInt:case $kindInt8:case $kindInt16:case $kindInt32:case $kindUint:case $kindUint8:case $kindUint16:case $kindUint32:case $kindUintptr:case $kindFloat32:case $kindFloat64:return v;case $kindInt64:case $kindUint64:return $flatten64(v);case $kindArray:if($needsExternalization(t.elem)){return $mapArray(v,function(e){return $externalize(e,t.elem);});}return v;case $kindFunc:return $externalizeFunction(v,t,false);case $kindInterface:if(v===$ifaceNil){return null;}if(v.constructor===$jsObjectPtr){return v.$val.object;}return $externalize(v.$val,v.constructor);case $kindMap:var m={};var keys=$keys(v);for(var i=0;i<keys.length;i++){var entry=v[keys[i]];m[$externalize(entry.k,t.key)]=$externalize(entry.v,t.elem);}return m;case $kindPtr:if(v===t.nil){return null;}return $externalize(v.$get(),t.elem);case $kindSlice:if($needsExternalization(t.elem)){return $mapArray($sliceToArray(v),function(e){return $externalize(e,t.elem);});}return $sliceToArray(v);case $kindString:if(v.search(/^[\x00-\x7F]*$/)!==-1){return v;}var s="",r;for(var i=0;i<v.length;i+=r[1]){r=$decodeRune(v,i);var c=r[0];if(c>0xFFFF){var h=Math.floor((c-0x10000)/0x400)+0xD800;var l=(c-0x10000)%0x400+0xDC00;s+=String.fromCharCode(h,l);continue;}s+=String.fromCharCode(c);}return s;case $kindStruct:var timePkg=$packages["time"];if(timePkg!==undefined&&v.constructor===timePkg.Time.ptr){var milli=$div64(v.UnixNano(),new $Int64(0,1000000));return new Date($flatten64(milli));}var noJsObject={};var searchJsObject=function(v,t){if(t===$jsObjectPtr){return v;}switch(t.kind){case $kindPtr:if(v===t.nil){return noJsObject;}return searchJsObject(v.$get(),t.elem);case $kindStruct:var f=t.fields[0];return searchJsObject(v[f.prop],f.typ);case $kindInterface:return searchJsObject(v.$val,v.constructor);default:return noJsObject;}};var o=searchJsObject(v,t);if(o!==noJsObject){return o;}o={};for(var i=0;i<t.fields.length;i++){var f=t.fields[i];if(!f.exported){continue;}o[f.name]=$externalize(v[f.prop],f.typ);}return o;}$throwRuntimeError("cannot externalize "+t.string);};var $externalizeFunction=function(v,t,passThis){if(v===$throwNilPointerError){return null;}if(v.$externalizeWrapper===undefined){$checkForDeadlock=false;v.$externalizeWrapper=function(){var args=[];for(var i=0;i<t.params.length;i++){if(t.variadic&&i===t.params.length-1){var vt=t.params[i].elem,varargs=[];for(var j=i;j<arguments.length;j++){varargs.push($internalize(arguments[j],vt));}args.push(new(t.params[i])(varargs));break;}args.push($internalize(arguments[i],t.params[i]));}var canBlock=$curGoroutine.canBlock;$curGoroutine.canBlock=false;try{var result=v.apply(passThis?this:undefined,args);}finally{$curGoroutine.canBlock=canBlock;}switch(t.results.length){case 0:return;case 1:return $externalize(result,t.results[0]);default:for(var i=0;i<t.results.length;i++){result[i]=$externalize(result[i],t.results[i]);}return result;}};}return v.$externalizeWrapper;};var $internalize=function(v,t,recv){if(t===$jsObjectPtr){return v;}if(t===$jsObjectPtr.elem){$throwRuntimeError("cannot internalize js.Object, use *js.Object instead");}if(v&&v.__internal_object__!==undefined){return $assertType(v.__internal_object__,t,false);}var timePkg=$packages["time"];if(timePkg!==undefined&&t===timePkg.Time){if(!(v!==null&&v!==undefined&&v.constructor===Date)){$throwRuntimeError("cannot internalize time.Time from "+typeof v+", must be Date");}return timePkg.Unix(new $Int64(0,0),new $Int64(0,v.getTime()*1000000));}switch(t.kind){case $kindBool:return!!v;case $kindInt:return parseInt(v);case $kindInt8:return parseInt(v)<<24>>24;case $kindInt16:return parseInt(v)<<16>>16;case $kindInt32:return parseInt(v)>>0;case $kindUint:return parseInt(v);case $kindUint8:return parseInt(v)<<24>>>24;case $kindUint16:return parseInt(v)<<16>>>16;case $kindUint32:case $kindUintptr:return parseInt(v)>>>0;case $kindInt64:case $kindUint64:return new t(0,v);case $kindFloat32:case $kindFloat64:return parseFloat(v);case $kindArray:if(v.length!==t.len){$throwRuntimeError("got array with wrong size from JavaScript native");}return $mapArray(v,function(e){return $internalize(e,t.elem);});case $kindFunc:return function(){var args=[];for(var i=0;i<t.params.length;i++){if(t.variadic&&i===t.params.length-1){var vt=t.params[i].elem,varargs=arguments[i];for(var j=0;j<varargs.$length;j++){args.push($externalize(varargs.$array[varargs.$offset+j],vt));}break;}args.push($externalize(arguments[i],t.params[i]));}var result=v.apply(recv,args);switch(t.results.length){case 0:return;case 1:return $internalize(result,t.results[0]);default:for(var i=0;i<t.results.length;i++){result[i]=$internalize(result[i],t.results[i]);}return result;}};case $kindInterface:if(t.methods.length!==0){$throwRuntimeError("cannot internalize "+t.string);}if(v===null){return $ifaceNil;}if(v===undefined){return new $jsObjectPtr(undefined);}switch(v.constructor){case Int8Array:return new($sliceType($Int8))(v);case Int16Array:return new($sliceType($Int16))(v);case Int32Array:return new($sliceType($Int))(v);case Uint8Array:return new($sliceType($Uint8))(v);case Uint16Array:return new($sliceType($Uint16))(v);case Uint32Array:return new($sliceType($Uint))(v);case Float32Array:return new($sliceType($Float32))(v);case Float64Array:return new($sliceType($Float64))(v);case Array:return $internalize(v,$sliceType($emptyInterface));case Boolean:return new $Bool(!!v);case Date:if(timePkg===undefined){return new $jsObjectPtr(v);}return new timePkg.Time($internalize(v,timePkg.Time));case Function:var funcType=$funcType([$sliceType($emptyInterface)],[$jsObjectPtr],true);return new funcType($internalize(v,funcType));case Number:return new $Float64(parseFloat(v));case String:return new $String($internalize(v,$String));default:if($global.Node&&v instanceof $global.Node){return new $jsObjectPtr(v);}var mapType=$mapType($String,$emptyInterface);return new mapType($internalize(v,mapType));}case $kindMap:var m={};var keys=$keys(v);for(var i=0;i<keys.length;i++){var k=$internalize(keys[i],t.key);m[t.key.keyFor(k)]={k:k,v:$internalize(v[keys[i]],t.elem)};}return m;case $kindPtr:if(t.elem.kind===$kindStruct){return $internalize(v,t.elem);}case $kindSlice:return new t($mapArray(v,function(e){return $internalize(e,t.elem);}));case $kindString:v=String(v);if(v.search(/^[\x00-\x7F]*$/)!==-1){return v;}var s="";var i=0;while(i<v.length){var h=v.charCodeAt(i);if(0xD800<=h&&h<=0xDBFF){var l=v.charCodeAt(i+1);var c=(h-0xD800)*0x400+l-0xDC00+0x10000;s+=$encodeRune(c);i+=2;continue;}s+=$encodeRune(h);i++;}return s;case $kindStruct:var noJsObject={};var searchJsObject=function(t){if(t===$jsObjectPtr){return v;}if(t===$jsObjectPtr.elem){$throwRuntimeError("cannot internalize js.Object, use *js.Object instead");}switch(t.kind){case $kindPtr:return searchJsObject(t.elem);case $kindStruct:var f=t.fields[0];var o=searchJsObject(f.typ);if(o!==noJsObject){var n=new t.ptr();n[f.prop]=o;return n;}return noJsObject;default:return noJsObject;}};var o=searchJsObject(t);if(o!==noJsObject){return o;}}$throwRuntimeError("cannot internalize "+t.string);};
$packages["github.com/gopherjs/gopherjs/js"]=(function(){var $pkg={},$init,A,B,I,L,M,N,O,P,Q,E,F,G,K;A=$pkg.Object=$newType(0,$kindStruct,"js.Object",true,"github.com/gopherjs/gopherjs/js",true,function(object_){this.$val=this;if(arguments.length===0){this.object=null;return;}this.object=object_;});B=$pkg.Error=$newType(0,$kindStruct,"js.Error",true,"github.com/gopherjs/gopherjs/js",true,function(Object_){this.$val=this;if(arguments.length===0){this.Object=null;return;}this.Object=Object_;});I=$pkg.M=$newType(4,$kindMap,"js.M",true,"github.com/gopherjs/gopherjs/js",true,null);L=$sliceType($emptyInterface);M=$sliceType($String);N=$ptrType(A);O=$sliceType(N);P=$funcType([O],[N],true);Q=$ptrType(B);A.ptr.prototype.Get=function(a){var $ptr,a,b;b=this;return b.object[$externalize(a,$String)];};A.prototype.Get=function(a){return this.$val.Get(a);};A.ptr.prototype.Set=function(a,b){var $ptr,a,b,c;c=this;c.object[$externalize(a,$String)]=$externalize(b,$emptyInterface);};A.prototype.Set=function(a,b){return this.$val.Set(a,b);};A.ptr.prototype.Delete=function(a){var $ptr,a,b;b=this;delete b.object[$externalize(a,$String)];};A.prototype.Delete=function(a){return this.$val.Delete(a);};A.ptr.prototype.Length=function(){var $ptr,a;a=this;return $parseInt(a.object.length);};A.prototype.Length=function(){return this.$val.Length();};A.ptr.prototype.Index=function(a){var $ptr,a,b;b=this;return b.object[a];};A.prototype.Index=function(a){return this.$val.Index(a);};A.ptr.prototype.SetIndex=function(a,b){var $ptr,a,b,c;c=this;c.object[a]=$externalize(b,$emptyInterface);};A.prototype.SetIndex=function(a,b){return this.$val.SetIndex(a,b);};A.ptr.prototype.Call=function(a,b){var $ptr,a,b,c,d;c=this;return(d=c.object,d[$externalize(a,$String)].apply(d,$externalize(b,L)));};A.prototype.Call=function(a,b){return this.$val.Call(a,b);};A.ptr.prototype.Invoke=function(a){var $ptr,a,b;b=this;return b.object.apply(undefined,$externalize(a,L));};A.prototype.Invoke=function(a){return this.$val.Invoke(a);};A.ptr.prototype.New=function(a){var $ptr,a,b;b=this;return new($global.Function.prototype.bind.apply(b.object,[undefined].concat($externalize(a,L))));};A.prototype.New=function(a){return this.$val.New(a);};A.ptr.prototype.Bool=function(){var $ptr,a;a=this;return!!(a.object);};A.prototype.Bool=function(){return this.$val.Bool();};A.ptr.prototype.String=function(){var $ptr,a;a=this;return $internalize(a.object,$String);};A.prototype.String=function(){return this.$val.String();};A.ptr.prototype.Int=function(){var $ptr,a;a=this;return $parseInt(a.object)>>0;};A.prototype.Int=function(){return this.$val.Int();};A.ptr.prototype.Int64=function(){var $ptr,a;a=this;return $internalize(a.object,$Int64);};A.prototype.Int64=function(){return this.$val.Int64();};A.ptr.prototype.Uint64=function(){var $ptr,a;a=this;return $internalize(a.object,$Uint64);};A.prototype.Uint64=function(){return this.$val.Uint64();};A.ptr.prototype.Float=function(){var $ptr,a;a=this;return $parseFloat(a.object);};A.prototype.Float=function(){return this.$val.Float();};A.ptr.prototype.Interface=function(){var $ptr,a;a=this;return $internalize(a.object,$emptyInterface);};A.prototype.Interface=function(){return this.$val.Interface();};A.ptr.prototype.Unsafe=function(){var $ptr,a;a=this;return a.object;};A.prototype.Unsafe=function(){return this.$val.Unsafe();};B.ptr.prototype.Error=function(){var $ptr,a;a=this;return"JavaScript error: "+$internalize(a.Object.message,$String);};B.prototype.Error=function(){return this.$val.Error();};B.ptr.prototype.Stack=function(){var $ptr,a;a=this;return $internalize(a.Object.stack,$String);};B.prototype.Stack=function(){return this.$val.Stack();};E=function(a){var $ptr,a;return $makeFunc(a);};$pkg.MakeFunc=E;F=function(a){var $ptr,a,b,c,d;if(a===null||a===undefined){return M.nil;}b=$global.Object.keys(a);c=$makeSlice(M,$parseInt(b.length));d=0;while(true){if(!(d<$parseInt(b.length))){break;}((d<0||d>=c.$length)?($throwRuntimeError("index out of range"),undefined):c.$array[c.$offset+d]=$internalize(b[d],$String));d=d+(1)>>0;}return c;};$pkg.Keys=F;G=function(a){var $ptr,a,b,c,d,e,f;b=a;c=new($global.Object)();c.__internal_object__=b;d=b.constructor.methods;e=0;while(true){if(!(e<$parseInt(d.length))){break;}f=[f];f[0]=d[e];if(!($internalize(f[0].pkg,$String)==="")){e=e+(1)>>0;continue;}c[$externalize($internalize(f[0].name,$String),$String)]=$externalize((function(f){return function(g){var $ptr,g;return $externalizeFunction(b[$externalize($internalize(f[0].prop,$String),$String)],f[0].typ,$externalize(true,$Bool)).apply(b,$externalize(g,O));};})(f),P);e=e+(1)>>0;}return c;};$pkg.MakeWrapper=G;K=function(){var $ptr,a;a=new B.ptr(null);$unused(a);};N.methods=[{prop:"Get",name:"Get",pkg:"",typ:$funcType([$String],[N],false)},{prop:"Set",name:"Set",pkg:"",typ:$funcType([$String,$emptyInterface],[],false)},{prop:"Delete",name:"Delete",pkg:"",typ:$funcType([$String],[],false)},{prop:"Length",name:"Length",pkg:"",typ:$funcType([],[$Int],false)},{prop:"Index",name:"Index",pkg:"",typ:$funcType([$Int],[N],false)},{prop:"SetIndex",name:"SetIndex",pkg:"",typ:$funcType([$Int,$emptyInterface],[],false)},{prop:"Call",name:"Call",pkg:"",typ:$funcType([$String,L],[N],true)},{prop:"Invoke",name:"Invoke",pkg:"",typ:$funcType([L],[N],true)},{prop:"New",name:"New",pkg:"",typ:$funcType([L],[N],true)},{prop:"Bool",name:"Bool",pkg:"",typ:$funcType([],[$Bool],false)},{prop:"String",name:"String",pkg:"",typ:$funcType([],[$String],false)},{prop:"Int",name:"Int",pkg:"",typ:$funcType([],[$Int],false)},{prop:"Int64",name:"Int64",pkg:"",typ:$funcType([],[$Int64],false)},{prop:"Uint64",name:"Uint64",pkg:"",typ:$funcType([],[$Uint64],false)},{prop:"Float",name:"Float",pkg:"",typ:$funcType([],[$Float64],false)},{prop:"Interface",name:"Interface",pkg:"",typ:$funcType([],[$emptyInterface],false)},{prop:"Unsafe",name:"Unsafe",pkg:"",typ:$funcType([],[$Uintptr],false)}];Q.methods=[{prop:"Error",name:"Error",pkg:"",typ:$funcType([],[$String],false)},{prop:"Stack",name:"Stack",pkg:"",typ:$funcType([],[$String],false)}];A.init("github.com/gopherjs/gopherjs/js",[{prop:"object",name:"object",exported:false,typ:N,tag:""}]);B.init("",[{prop:"Object",name:"",exported:true,typ:N,tag:""}]);I.init($String,$emptyInterface);$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:K();}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["runtime/internal/sys"]=(function(){var $pkg={},$init;$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["runtime"]=(function(){var $pkg={},$init,B,A,AH,AI,AV,E;B=$packages["github.com/gopherjs/gopherjs/js"];A=$packages["runtime/internal/sys"];AH=$pkg.TypeAssertionError=$newType(0,$kindStruct,"runtime.TypeAssertionError",true,"runtime",true,function(interfaceString_,concreteString_,assertedString_,missingMethod_){this.$val=this;if(arguments.length===0){this.interfaceString="";this.concreteString="";this.assertedString="";this.missingMethod="";return;}this.interfaceString=interfaceString_;this.concreteString=concreteString_;this.assertedString=assertedString_;this.missingMethod=missingMethod_;});AI=$pkg.errorString=$newType(8,$kindString,"runtime.errorString",true,"runtime",false,null);AV=$ptrType(AH);E=function(){var $ptr,a,b;a=$packages[$externalize("github.com/gopherjs/gopherjs/js",$String)];$jsObjectPtr=a.Object.ptr;$jsErrorPtr=a.Error.ptr;$throwRuntimeError=(function(b){var $ptr,b;$panic(new AI(b));});b=$ifaceNil;b=new AH.ptr("","","","");$unused(b);};AH.ptr.prototype.RuntimeError=function(){var $ptr;};AH.prototype.RuntimeError=function(){return this.$val.RuntimeError();};AH.ptr.prototype.Error=function(){var $ptr,a,b;a=this;b=a.interfaceString;if(b===""){b="interface";}if(a.concreteString===""){return"interface conversion: "+b+" is nil, not "+a.assertedString;}if(a.missingMethod===""){return"interface conversion: "+b+" is "+a.concreteString+", not "+a.assertedString;}return"interface conversion: "+a.concreteString+" is not "+a.assertedString+": missing method "+a.missingMethod;};AH.prototype.Error=function(){return this.$val.Error();};AI.prototype.RuntimeError=function(){var $ptr,a;a=this.$val;};$ptrType(AI).prototype.RuntimeError=function(){return new AI(this.$get()).RuntimeError();};AI.prototype.Error=function(){var $ptr,a;a=this.$val;return"runtime error: "+a;};$ptrType(AI).prototype.Error=function(){return new AI(this.$get()).Error();};AV.methods=[{prop:"RuntimeError",name:"RuntimeError",pkg:"",typ:$funcType([],[],false)},{prop:"Error",name:"Error",pkg:"",typ:$funcType([],[$String],false)}];AI.methods=[{prop:"RuntimeError",name:"RuntimeError",pkg:"",typ:$funcType([],[],false)},{prop:"Error",name:"Error",pkg:"",typ:$funcType([],[$String],false)}];AH.init("runtime",[{prop:"interfaceString",name:"interfaceString",exported:false,typ:$String,tag:""},{prop:"concreteString",name:"concreteString",exported:false,typ:$String,tag:""},{prop:"assertedString",name:"assertedString",exported:false,typ:$String,tag:""},{prop:"missingMethod",name:"missingMethod",exported:false,typ:$String,tag:""}]);$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=B.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=A.$init();$s=2;case 2:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}E();}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["github.com/johanbrandhorst/gopherjs-grpc-websocket/client/helpers"]=(function(){var $pkg={},$init,A,D,C;A=$packages["github.com/gopherjs/gopherjs/js"];D=$ptrType(A.Error);C=function(a){var $ptr,a,b,c,d,e,$deferred;var $err=null;try{$deferred=[];$deferred.index=$curGoroutine.deferStack.length;$curGoroutine.deferStack.push($deferred);b=null;c=$ifaceNil;$deferred.push([(function(){var $ptr,d,e,f,g;d=$recover();if($interfaceIsEqual(d,$ifaceNil)){return;}e=$assertType(d,D,true);f=e[0];g=e[1];if(g){c=f;}else{$panic(f);}}),[]]);b=$global.JSON.parse($externalize(a,$String));d=b;e=c;b=d;c=e;return[b,c];}catch(err){$err=err;}finally{$callDeferred($deferred,$err);if(!$curGoroutine.asleep){return[b,c];}}};$pkg.UnmarshalJSON=C;$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=A.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["github.com/oskca/gopherjs-dom"]=(function(){var $pkg={},$init,A;A=$packages["github.com/gopherjs/gopherjs/js"];$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=A.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["github.com/oskca/gopherjs-json"]=(function(){var $pkg={},$init,A,B,C,D;A=$packages["github.com/gopherjs/gopherjs/js"];C=function(a){var $ptr,a;return $internalize(B.stringify($externalize(a,$emptyInterface)),$String);};$pkg.Stringify=C;D=function(a){var $ptr,a;return B.parse($externalize(a,$String));};$pkg.Parse=D;$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=A.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}B=$global.JSON;}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
	(function() {
/*!
 * Vue.js v2.1.10
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove$1 (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind$1 (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  } else {
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var warn = noop;
var formatComponentName;

{
  var hasConsole = typeof console !== 'undefined';

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm) {
    if (vm.$root === vm) {
      return 'root instance'
    }
    var name = vm._isVue
      ? vm.$options.name || vm.$options._componentTag
      : vm.name;
    return (
      (name ? ("component <" + name + ">") : "anonymous component") +
      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === 'anonymous component') {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove$1(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stablize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set$1 (obj, key, val) {
  if (Array.isArray(obj)) {
    obj.length = Math.max(obj.length, key);
    obj.splice(key, 1, val);
    return val
  }
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return
  }
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return
  }
  if (!ob) {
    obj[key] = val;
    return
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (obj, key) {
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set$1(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and param attributes are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$3) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    "development" !== 'production' && warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm[key] !== undefined) {
    return vm[key]
  }
  // call factory function for non-Function types
  return typeof def === 'function' && prop.type !== Function
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}



var util = Object.freeze({
	defineReactive: defineReactive$$1,
	_toString: _toString,
	toNumber: toNumber,
	makeMap: makeMap,
	isBuiltInTag: isBuiltInTag,
	remove: remove$1,
	hasOwn: hasOwn,
	isPrimitive: isPrimitive,
	cached: cached,
	camelize: camelize,
	capitalize: capitalize,
	hyphenate: hyphenate,
	bind: bind$1,
	toArray: toArray,
	extend: extend,
	isObject: isObject,
	isPlainObject: isPlainObject,
	toObject: toObject,
	noop: noop,
	no: no,
	identity: identity,
	genStaticKeys: genStaticKeys,
	looseEqual: looseEqual,
	looseIndexOf: looseIndexOf,
	isReserved: isReserved,
	def: def,
	parsePath: parsePath,
	hasProto: hasProto,
	inBrowser: inBrowser,
	UA: UA,
	isIE: isIE,
	isIE9: isIE9,
	isEdge: isEdge,
	isAndroid: isAndroid,
	isIOS: isIOS,
	isServerRendering: isServerRendering,
	devtools: devtools,
	nextTick: nextTick,
	get _Set () { return _Set; },
	mergeOptions: mergeOptions,
	resolveAsset: resolveAsset,
	get warn () { return warn; },
	get formatComponentName () { return formatComponentName; },
	validateProp: validateProp
});

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var res = new Array(vnodes.length);
  for (var i = 0; i < vnodes.length; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
var hooksToMerge = Object.keys(hooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // extract props
  var propsData = extractProps(data, Ctor);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    props: props,
    data: data,
    parent: context,
    children: children,
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function init (
  vnode,
  hydrating,
  parentElm,
  refElm
) {
  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
    var child = vnode.componentInstance = createComponentInstanceForVnode(
      vnode,
      activeInstance,
      parentElm,
      refElm
    );
    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
  } else if (vnode.data.keepAlive) {
    // kept-alive components, treat as a patch
    var mountedNode = vnode; // work around flow
    prepatch(mountedNode, mountedNode);
  }
}

function prepatch (
  oldVnode,
  vnode
) {
  var options = vnode.componentOptions;
  var child = vnode.componentInstance = oldVnode.componentInstance;
  child._updateFromParent(
    options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
  );
}

function insert (vnode) {
  if (!vnode.componentInstance._isMounted) {
    vnode.componentInstance._isMounted = true;
    callHook(vnode.componentInstance, 'mounted');
  }
  if (vnode.data.keepAlive) {
    vnode.componentInstance._inactive = false;
    callHook(vnode.componentInstance, 'activated');
  }
}

function destroy$1 (vnode) {
  if (!vnode.componentInstance._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.componentInstance.$destroy();
    } else {
      vnode.componentInstance._inactive = true;
      callHook(vnode.componentInstance, 'deactivated');
    }
  }
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = hooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook, key) {
  key = key + hookKey;
  var injectedHash = def.__injected || (def.__injected = {});
  if (!injectedHash[key]) {
    injectedHash[key] = true;
    var oldHook = def[hookKey];
    if (oldHook) {
      def[hookKey] = function () {
        oldHook.apply(this, arguments);
        hook.apply(this, arguments);
      };
    } else {
      def[hookKey] = hook;
    }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var once = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once,
    capture: capture
  }
});

function createEventHandle (fn) {
  var handle = {
    fn: fn,
    invoker: function () {
      var arguments$1 = arguments;

      var fn = handle.fn;
      if (Array.isArray(fn)) {
        for (var i = 0; i < fn.length; i++) {
          fn[i].apply(null, arguments$1);
        }
      } else {
        fn.apply(null, arguments);
      }
    }
  };
  return handle
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!cur) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      if (!cur.invoker) {
        cur = on[name] = createEventHandle(cur);
      }
      add(event.name, cur.invoker, event.once, event.capture);
    } else if (cur !== old) {
      old.fn = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name].invoker, event.capture);
    }
  }
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// nomralization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constrcuts that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (c == null || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (data && data.__ob__) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (vnode.children) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (child.tag && !child.ns) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = {};
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    if (_parentVnode && _parentVnode.data.scopedSlots) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots;
    }

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      /* istanbul ignore else */
      if (config.errorHandler) {
        config.errorHandler.call(null, e, vm);
      } else {
        {
          warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
        }
        throw e
      }
      // return previous vnode to prevent render error causing blank component
      vnode = vm._vnode;
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // toString for mustaches
  Vue.prototype._s = _toString;
  // convert text to vnode
  Vue.prototype._v = createTextVNode;
  // number conversion
  Vue.prototype._n = toNumber;
  // empty vnode
  Vue.prototype._e = createEmptyVNode;
  // loose equal
  Vue.prototype._q = looseEqual;
  // loose indexOf
  Vue.prototype._i = looseIndexOf;

  // render static tree by index
  Vue.prototype._m = function renderStatic (
    index,
    isInFor
  ) {
    var tree = this._staticTrees[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree by doing a shallow clone.
    if (tree && !isInFor) {
      return Array.isArray(tree)
        ? cloneVNodes(tree)
        : cloneVNode(tree)
    }
    // otherwise, render a fresh tree.
    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
    markStatic(tree, ("__static__" + index), false);
    return tree
  };

  // mark node as static (v-once)
  Vue.prototype._o = function markOnce (
    tree,
    index,
    key
  ) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
  };

  function markStatic (tree, key, isOnce) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], (key + "_" + i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  // filter resolution helper
  Vue.prototype._f = function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity
  };

  // render v-for
  Vue.prototype._l = function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
    return ret
  };

  // renderSlot
  Vue.prototype._t = function (
    name,
    fallback,
    props,
    bindObject
  ) {
    var scopedSlotFn = this.$scopedSlots[name];
    if (scopedSlotFn) { // scoped slot
      props = props || {};
      if (bindObject) {
        extend(props, bindObject);
      }
      return scopedSlotFn(props) || fallback
    } else {
      var slotNodes = this.$slots[name];
      // warn duplicate slot usage
      if (slotNodes && "development" !== 'production') {
        slotNodes._rendered && warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
        slotNodes._rendered = true;
      }
      return slotNodes || fallback
    }
  };

  // apply v-bind object
  Vue.prototype._b = function bindProps (
    data,
    tag,
    value,
    asProp
  ) {
    if (value) {
      if (!isObject(value)) {
        "development" !== 'production' && warn(
          'v-bind without argument expects an Object or Array value',
          this
        );
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        for (var key in value) {
          if (key === 'class' || key === 'style') {
            data[key] = value[key];
          } else {
            var type = data.attrs && data.attrs.type;
            var hash = asProp || config.mustUseProp(tag, type, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
            hash[key] = value[key];
          }
        }
      }
    }
    return data
  };

  // check v-on keyCodes
  Vue.prototype._k = function checkKeyCodes (
    eventKeyCode,
    key,
    builtInAlias
  ) {
    var keyCodes = config.keyCodes[key] || builtInAlias;
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  };
}

function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore single whitespace
  if (defaultSlot.length && !(
    defaultSlot.length === 1 &&
    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
  )) {
    slots.default = defaultSlot;
  }
  return slots
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add$1 (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$2 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add$1, remove$2, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
    // optimize hook:event cost by using a boolean flag marked at registration
    // instead of a hash lookup
    if (hookRE.test(event)) {
      vm._hasHookEvent = true;
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._mount = function (
    el,
    hydrating
  ) {
    var vm = this;
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      {
        /* istanbul ignore if */
        if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
          warn(
            'You are using the runtime-only build of Vue where the template ' +
            'option is not available. Either pre-compile the templates into ' +
            'render functions, or use the compiler-included build.',
            vm
          );
        } else {
          warn(
            'Failed to mount component: template or render function not defined.',
            vm
          );
        }
      }
    }
    callHook(vm, 'beforeMount');
    vm._watcher = new Watcher(vm, function updateComponent () {
      vm._update(vm._render(), hydrating);
    }, noop);
    hydrating = false;
    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  };

  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype._updateFromParent = function (
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {
    var vm = this;
    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
    if (vm._vnode) { // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;
    // update props
    if (propsData && vm.$options.props) {
      observerState.shouldConvert = false;
      {
        observerState.isSettingProps = true;
      }
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
      }
      observerState.shouldConvert = true;
      {
        observerState.isSettingProps = false;
      }
      vm.$options.propsData = propsData;
    }
    // update listeners
    if (listeners) {
      var oldListeners = vm.$options._parentListeners;
      vm.$options._parentListeners = listeners;
      updateComponentListeners(vm, listeners, oldListeners);
    }
    // resolve slots + force update if has children
    if (hasChildren) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$1(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      handlers[i].call(vm);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var queue = [];
var has$1 = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has$1 = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id, vm;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has$1[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has$1[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // call updated hooks
  index = queue.length;
  while (index--) {
    watcher = queue[index];
    vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }

  resetSchedulerState();
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has$1[id] == null) {
    has$1[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value = this.getter.call(this.vm, this.vm);
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          /* istanbul ignore else */
          if (config.errorHandler) {
            config.errorHandler.call(null, e, this.vm);
          } else {
            "development" !== 'production' && warn(
              ("Error in watcher \"" + (this.expression) + "\""),
              this.vm
            );
            throw e
          }
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove$1(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps (vm, props) {
  var propsData = vm.$options.propsData || {};
  var keys = vm.$options._propKeys = Object.keys(props);
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( i ) {
    var key = keys[i];
    /* istanbul ignore else */
    {
      if (isReservedProp[key]) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
  };

  for (var i = 0; i < keys.length; i++) loop( i );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "development" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else {
      proxy(vm, keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

var computedSharedDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function initComputed (vm, computed) {
  for (var key in computed) {
    /* istanbul ignore if */
    if ("development" !== 'production' && key in vm) {
      warn(
        "existing instance property \"" + key + "\" will be " +
        "overwritten by a computed property with the same name.",
        vm
      );
    }
    var userDef = computed[key];
    if (typeof userDef === 'function') {
      computedSharedDefinition.get = makeComputedGetter(userDef, vm);
      computedSharedDefinition.set = noop;
    } else {
      computedSharedDefinition.get = userDef.get
        ? userDef.cache !== false
          ? makeComputedGetter(userDef.get, vm)
          : bind$1(userDef.get, vm)
        : noop;
      computedSharedDefinition.set = userDef.set
        ? bind$1(userDef.set, vm)
        : noop;
    }
    Object.defineProperty(vm, key, computedSharedDefinition);
  }
}

function makeComputedGetter (getter, owner) {
  var watcher = new Watcher(owner, getter, noop, {
    lazy: true
  });
  return function computedGetter () {
    if (watcher.dirty) {
      watcher.evaluate();
    }
    if (Dep.target) {
      watcher.depend();
    }
    return watcher.value
  }
}

function initMethods (vm, methods) {
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
    if ("development" !== 'production' && methods[key] == null) {
      warn(
        "method \"" + key + "\" has an undefined value in the component definition. " +
        "Did you reference the function correctly?",
        vm
      );
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data
  };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);

  Vue.prototype.$set = set$1;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

function proxy (vm, key) {
  if (!isReserved(key)) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return vm._data[key]
      },
      set: function proxySetter (val) {
        vm._data[key] = val;
      }
    });
  }
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);
    callHook(vm, 'created');
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = Ctor.super.options;
    var cachedSuperOptions = Ctor.superOptions;
    var extendOptions = Ctor.extendOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed
      Ctor.superOptions = superOptions;
      extendOptions.render = options.render;
      extendOptions.staticRenderFns = options.staticRenderFns;
      extendOptions._scopeId = options._scopeId;
      options = Ctor.options = mergeOptions(superOptions, extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;
    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }
    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else {
    return pattern.test(name)
  }
}

function pruneCache (cache, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cachedNode);
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    if (!vnode.componentInstance._inactive) {
      callHook(vnode.componentInstance, 'deactivated');
    }
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);
  Vue.util = util;
  Vue.set = set$1;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Vue$3.version = '2.1.10';

/*  */

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.componentInstance) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,' +
  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selector = el;
    el = document.querySelector(el);
    if (!el) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + selector
      );
      return document.createElement('div')
    }
  }
  return el
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove$1(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef (s) {
  return s == null
}

function isDef (s) {
  return s != null
}

function sameVnode (vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (parent) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isReactivated) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (parent) {
      if (ref) {
        nodeOps.insertBefore(parent, elm, ref);
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (i.create) { i.create(emptyNode, vnode); }
      if (i.insert) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (rm || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic &&
        oldVnode.isStatic &&
        vnode.key === oldVnode.key &&
        (vnode.isCloned || vnode.isOnce)) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    var hasData = isDef(data);
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (vnode.tag) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (!vnode) {
      if (oldVnode) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (!oldVnode) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (vnode.parent) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (parentElm$1 !== null) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    }, 'dir-postpatch');
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var target$1;

function add$2 (
  event,
  handler,
  once,
  capture
) {
  if (once) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      remove$3(event, handler, capture, _target);
      arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
    };
  }
  target$1.addEventListener(event, handler, capture);
}

function remove$3 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  updateListeners(on, oldOn, add$2, remove$3, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(vnode, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (vnode, newVal) {
  var value = vnode.elm.value;
  var modifiers = vnode.elm._vModifiers; // injected by v-model runtime
  if ((modifiers && modifiers.number) || vnode.elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !cls.trim()) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !cls.trim()) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove$1(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear ? appearClass : enterClass;
  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
  var toClass = isAppear ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    enterHook &&
    // enterHook may be a bound method which exposes
    // the length of original fn as _length
    (enterHook._length || enterHook.length) > 1;

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    }, 'transition-insert');
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        whenTransitionEnds(el, type, cb);
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    leave &&
    // leave hook may be a bound method which exposes
    // the length of original fn as _length
    (leave._length || leave.length) > 1;

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          whenTransitionEnds(el, type, cb);
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    leaveClass: (name + "-leave"),
    appearClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    leaveToClass: (name + "-leave-to"),
    appearToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveActiveClass: (name + "-leave-active"),
    appearActiveClass: (name + "-enter-active")
  }
});

function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

function _enter (_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model = {
  inserted: function inserted (el, binding, vnode) {
    {
      if (!modelableTagRE.test(vnode.tag)) {
        warn(
          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
          'If you are working with contenteditable, it\'s recommended to ' +
          'wrap a library dedicated for that purpose inside a custom component.',
          vnode.context
        );
      }
    }
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1].fn;
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    var key = child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        }, key);
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave, key);
        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        }, key);
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final disired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts
            ? (opts.Ctor.options.name || opts.tag)
            : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var f = document.body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      addTransitionClass(el, moveClass);
      var info = getTransitionInfo(el);
      removeTransitionClass(el, moveClass);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.isUnknownElement = isUnknownElement;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.mustUseProp = mustUseProp;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch$1 : noop;

// wrap mount
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return this._mount(el, hydrating)
};

if ("development" !== 'production' &&
    inBrowser && typeof console !== 'undefined') {
  console[console.info ? 'info' : 'log'](
    "You are running Vue in development mode.\n" +
    "Make sure to turn on production mode when deploying for production.\n" +
    "See more tips at https://vuejs.org/guide/deployment.html"
  );
}

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (
      "development" !== 'production' &&
      inBrowser && !isEdge && /Chrome\/\d+/.test(window.navigator.userAgent)
    ) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
}, 0);

/*  */

// check whether current browser encodes a char inside attribute values
function shouldDecode (content, encoded) {
  var div = document.createElement('div');
  div.innerHTML = "<div a=\"" + content + "\">";
  return div.innerHTML.indexOf(encoded) > 0
}

// #3663
// IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

/*  */

var decoder;

function decode (html) {
  decoder = decoder || document.createElement('div');
  decoder.innerHTML = html;
  return decoder.textContent
}

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr',
  true
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
  true
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track',
  true
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);

// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isScriptOrStyle = makeMap('script,style', true);
var reCache = {};

var ltRE = /&lt;/g;
var gtRE = /&gt;/g;
var nlRE = /&#10;/g;
var ampRE = /&amp;/g;
var quoteRE = /&quot;/g;

function decodeAttr (value, shouldDecodeNewlines) {
  if (shouldDecodeNewlines) {
    value = value.replace(nlRE, '\n');
  }
  return value
    .replace(ltRE, '<')
    .replace(gtRE, '>')
    .replace(ampRE, '&')
    .replace(quoteRE, '"')
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a script or style element
    if (!lastTag || !isScriptOrStyle(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          continue
        }
      }

      var text = (void 0), rest$1 = (void 0), next = (void 0);
      if (textEnd > 0) {
        rest$1 = html.slice(textEnd);
        while (
          !endTag.test(rest$1) &&
          !startTagOpen.test(rest$1) &&
          !comment.test(rest$1) &&
          !conditionalComment.test(rest$1)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest$1.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest$1 = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var endTagLength = 0;
      var rest = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest.length;
      html = rest;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last && options.chars) {
      options.chars(html);
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      attrs[i] = {
        name: args[1],
        value: decodeAttr(
          value,
          options.shouldDecodeNewlines
        )
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
      unarySlash = '';
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !/[\w$]/.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue parser]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important
) {
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

function getAndRemoveAttr (el, name) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  return val
}

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;

/**
 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
 *
 * for loop possible cases:
 *
 * - test
 * - test[idx]
 * - test[test1[idx]]
 * - test["a"][idx]
 * - xxx.test[a[a].test1[idx]]
 * - test.xxx.a["asa"][test1[idx]]
 *
 */

function parseModel (val) {
  str = val;
  len = str.length;
  index$1 = expressionPos = expressionEndPos = 0;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    return {
      exp: val,
      idx: null
    }
  }

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.substring(0, expressionPos),
    idx: val.substring(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
var bindRE = /^:|^v-bind:/;
var onRE = /^@|^v-on:/;
var argRE = /:(.*)$/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(decode);

// configurable state
var warn$1;
var platformGetTagNamespace;
var platformMustUseProp;
var platformIsPreTag;
var preTransforms;
var transforms;
var postTransforms;
var delimiters;

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$1 = options.warn || baseWarn;
  platformGetTagNamespace = options.getTagNamespace || no;
  platformMustUseProp = options.mustUseProp || no;
  platformIsPreTag = options.isPreTag || no;
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  transforms = pluckModuleFunction(options.modules, 'transformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;
  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;
  parseHTML(template, {
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = {
        type: 1,
        tag: tag,
        attrsList: attrs,
        attrsMap: makeAttrsMap(attrs),
        parent: currentParent,
        children: []
      };
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$1(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        preTransforms[i](element, options);
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else {
        processFor(element);
        processIf(element);
        processOnce(element);
        processKey(element);

        // determine whether this is a plain element after
        // removing structural attributes
        element.plain = !element.key && !attrs.length;

        processRef(element);
        processSlot(element);
        processComponent(element);
        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
          transforms[i$1](element, options);
        }
        processAttrs(element);
      }

      function checkRootConstraints (el) {
        if ("development" !== 'production' && !warned) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warned = true;
            warn$1(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes:\n' + template
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warned = true;
            warn$1(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements:\n' + template
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if ("development" !== 'production' && !warned) {
          warned = true;
          warn$1(
            "Component template should contain exactly one root element:" +
            "\n\n" + template + "\n\n" +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || 'default';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      }
      // apply post-transforms
      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
        postTransforms[i$2](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      // check pre state
      if (element.pre) {
        inVPre = false;
      }
      if (platformIsPreTag(element.tag)) {
        inPre = false;
      }
    },

    chars: function chars (text) {
      if (!currentParent) {
        if ("development" !== 'production' && !warned && text === template) {
          warned = true;
          warn$1(
            'Component template requires a root element, rather than just text:\n\n' + template
          );
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
          currentParent.tag === 'textarea' &&
          currentParent.attrsMap.placeholder === text) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || children[children.length - 1].text !== ' ') {
          currentParent.children.push({
            type: 3,
            text: text
          });
        }
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$1("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$1(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$1(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$1(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once = getAndRemoveAttr(el, 'v-once');
  if (once != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$1(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    }
    if (el.tag === 'template') {
      el.slotScope = getAndRemoveAttr(el, 'scope');
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, arg, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
        }
        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        if (argMatch && (arg = argMatch[1])) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$1(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
      warn$1('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic(child);
      if (!child.static) {
        node.static = false;
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      walkThroughConditionsBlocks(node.ifConditions, isInFor);
    }
  }
}

function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
    markStaticRoots(conditionBlocks[i].block, isInFor);
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: 'if($event.target !== $event.currentTarget)return;',
  ctrl: 'if(!$event.ctrlKey)return;',
  shift: 'if(!$event.shiftKey)return;',
  alt: 'if(!$event.altKey)return;',
  meta: 'if(!$event.metaKey)return;'
};

function genHandlers (events, native) {
  var res = native ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  } else if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  } else if (!handler.modifiers) {
    return fnExpRE.test(handler.value) || simplePathRE.test(handler.value)
      ? handler.value
      : ("function($event){" + (handler.value) + "}")
  } else {
    var code = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        code += modifierCode[key];
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code = genKeyFilter(keys) + code;
    }
    var handlerCode = simplePathRE.test(handler.value)
      ? handler.value + '($event)'
      : handler.value;
    return 'function($event){' + code + handlerCode + '}'
  }
}

function genKeyFilter (keys) {
  return ("if(" + (keys.map(genFilterCode).join('&&')) + ")return;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var alias = keyCodes[key];
  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
}

/*  */

function bind$2 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  bind: bind$2,
  cloak: noop
};

/*  */

// configurable state
var warn$2;
var transforms$1;
var dataGenFns;
var platformDirectives$1;
var isPlatformReservedTag$1;
var staticRenderFns;
var onceCount;
var currentOptions;

function generate (
  ast,
  options
) {
  // save previous staticRenderFns so generate calls can be nested
  var prevStaticRenderFns = staticRenderFns;
  var currentStaticRenderFns = staticRenderFns = [];
  var prevOnceCount = onceCount;
  onceCount = 0;
  currentOptions = options;
  warn$2 = options.warn || baseWarn;
  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
  dataGenFns = pluckModuleFunction(options.modules, 'genData');
  platformDirectives$1 = options.directives || {};
  isPlatformReservedTag$1 = options.isReservedTag || no;
  var code = ast ? genElement(ast) : '_c("div")';
  staticRenderFns = prevStaticRenderFns;
  onceCount = prevOnceCount;
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: currentStaticRenderFns
  }
}

function genElement (el) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el)
  } else if (el.for && !el.forProcessed) {
    return genFor(el)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el);
    } else {
      var data = el.plain ? undefined : genData(el);

      var children = el.inlineTemplate ? null : genChildren(el, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < transforms$1.length; i++) {
      code = transforms$1[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el) {
  el.staticProcessed = true;
  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && warn$2(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el)
    }
    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
  } else {
    return genStatic(el)
  }
}

function genIf (el) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice())
}

function genIfConditions (conditions) {
  if (!conditions.length) {
    return '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return el.once ? genOnce(el) : genElement(el)
  }
}

function genFor (el) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genElement(el)) +
    '})'
}

function genData (el) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < dataGenFns.length; i++) {
    data += dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  if (el.slotTarget) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots)) + ",";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  return data
}

function genDirectives (el) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, warn$2);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length > 1 || ast.type !== 1
  )) {
    warn$2('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, currentOptions);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (slots) {
  return ("scopedSlots:{" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "}")
}

function genScopedSlot (key, el) {
  return key + ":function(" + (String(el.attrsMap.scope)) + "){" +
    "return " + (el.tag === 'template'
      ? genChildren(el) || 'void 0'
      : genElement(el)) + "}"
}

function genChildren (el, checkSkip) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
        el$1.for &&
        el$1.tag !== 'template' &&
        el$1.tag !== 'slot') {
      return genElement(el$1)
    }
    var normalizationType = getNormalizationType(children);
    return ("[" + (children.map(genNode).join(',')) + "]" + (checkSkip
        ? normalizationType ? ("," + normalizationType) : ''
        : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (children) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function maybeComponent (el) {
  return !isPlatformReservedTag$1(el.tag)
}

function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genSlot (el) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (componentName, el) {
  var children = el.inlineTemplate ? null : genChildren(el, true);
  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

/**
 * Compile a template.
 */
function compile$1 (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
}

/*  */

// operators like typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');
// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;
// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("- invalid " + type + " \"" + ident + "\" in expression: " + text));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "- avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\" in expression " + text
      );
    } else {
      errors.push(("- invalid expression: " + text));
    }
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$2 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
};

var modules$1 = [
  klass$1,
  style$1
];

/*  */

var warn$3;

function model$1 (
  el,
  dir,
  _warn
) {
  warn$3 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;
  {
    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (tag === 'input' && dynamicType) {
      warn$3(
        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
        "v-model does not support dynamic input types. Use v-if branches instead."
      );
    }
  }
  if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else {
    genDefaultModel(el, value, modifiers);
  }
  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  if ("development" !== 'production' &&
    el.attrsMap.checked != null) {
    warn$3(
      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
      "inline checked attributes will be ignored when using v-model. " +
      'Declare initial values in the component\'s data option instead.'
    );
  }
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, 'click',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + value + "=$$c}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  if ("development" !== 'production' &&
    el.attrsMap.checked != null) {
    warn$3(
      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
      "inline checked attributes will be ignored when using v-model. " +
      'Declare initial values in the component\'s data option instead.'
    );
  }
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'click', genAssignmentCode(value, valueBinding), null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  {
    if (el.tag === 'input' && el.attrsMap.value) {
      warn$3(
        "<" + (el.tag) + " v-model=\"" + value + "\" value=\"" + (el.attrsMap.value) + "\">:\n" +
        'inline value attributes will be ignored when using v-model. ' +
        'Declare initial values in the component\'s data option instead.'
      );
    }
    if (el.tag === 'textarea' && el.children.length) {
      warn$3(
        "<textarea v-model=\"" + value + "\">:\n" +
        'inline content inside <textarea> will be ignored when using v-model. ' +
        'Declare initial values in the component\'s data option instead.'
      );
    }
  }

  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var event = lazy || (isIE && type === 'range') ? 'change' : 'input';
  var needCompositionGuard = !lazy && type !== 'range';
  var isNative = el.tag === 'input' || el.tag === 'textarea';

  var valueExpression = isNative
    ? ("$event.target.value" + (trim ? '.trim()' : ''))
    : trim ? "(typeof $event === 'string' ? $event.trim() : $event)" : "$event";
  valueExpression = number || type === 'number'
    ? ("_n(" + valueExpression + ")")
    : valueExpression;

  var code = genAssignmentCode(value, valueExpression);
  if (isNative && needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  // inputs with type="file" are read only and setting the input's
  // value will throw an error.
  if ("development" !== 'production' &&
      type === 'file') {
    warn$3(
      "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
      "File inputs are read only. Use a v-on:change listener instead."
    );
  }

  addProp(el, 'value', isNative ? ("_s(" + value + ")") : ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number || type === 'number') {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

function genSelect (
    el,
    value,
    modifiers
) {
  {
    el.children.some(checkOptionWarning);
  }

  var number = modifiers && modifiers.number;
  var assignment = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})" +
    (el.attrsMap.multiple == null ? '[0]' : '');

  var code = genAssignmentCode(value, assignment);
  addHandler(el, 'change', code, null, true);
}

function checkOptionWarning (option) {
  if (option.type === 1 &&
    option.tag === 'option' &&
    option.attrsMap.selected != null) {
    warn$3(
      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
      'inline selected attributes on <option> will be ignored when using v-model. ' +
      'Declare initial values in the component\'s data option instead.'
    );
    return true
  }
  return false
}

function genAssignmentCode (value, assignment) {
  var modelRs = parseModel(value);
  if (modelRs.idx === null) {
    return (value + "=" + assignment)
  } else {
    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
      "if (!Array.isArray($$exp)){" +
        value + "=" + assignment + "}" +
      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
  }
}

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model$1,
  text: text,
  html: html
};

/*  */

var cache = Object.create(null);

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  staticKeys: genStaticKeys(modules$1),
  directives: directives$1,
  isReservedTag: isReservedTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  getTagNamespace: getTagNamespace,
  isPreTag: isPreTag
};

function compile$$1 (
  template,
  options
) {
  options = options
    ? extend(extend({}, baseOptions), options)
    : baseOptions;
  return compile$1(template, options)
}

function compileToFunctions (
  template,
  options,
  vm
) {
  var _warn = (options && options.warn) || warn;
  // detect possible CSP restriction
  /* istanbul ignore if */
  {
    try {
      new Function('return 1');
    } catch (e) {
      if (e.toString().match(/unsafe-eval|CSP/)) {
        _warn(
          'It seems you are using the standalone build of Vue.js in an ' +
          'environment with Content Security Policy that prohibits unsafe-eval. ' +
          'The template compiler cannot work in this environment. Consider ' +
          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
          'templates into render functions.'
        );
      }
    }
  }
  var key = options && options.delimiters
    ? String(options.delimiters) + template
    : template;
  if (cache[key]) {
    return cache[key]
  }
  var res = {};
  var compiled = compile$$1(template, options);
  res.render = makeFunction(compiled.render);
  var l = compiled.staticRenderFns.length;
  res.staticRenderFns = new Array(l);
  for (var i = 0; i < l; i++) {
    res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i]);
  }
  {
    if (res.render === noop || res.staticRenderFns.some(function (fn) { return fn === noop; })) {
      _warn(
        "failed to compile template:\n\n" + template + "\n\n" +
        detectErrors(compiled.ast).join('\n') +
        '\n\n',
        vm
      );
    }
  }
  return (cache[key] = res)
}

function makeFunction (code) {
  try {
    return new Function(code)
  } catch (e) {
    return noop
  }
}

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      var ref = compileToFunctions(template, {
        warn: warn,
        shouldDecodeNewlines: shouldDecodeNewlines,
        delimiters: options.delimiters
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

return Vue$3;

})));

	}).call($global);
$packages["github.com/oskca/gopherjs-vue/jscode/debug"]=(function(){var $pkg={},$init;$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["errors"]=(function(){var $pkg={},$init,B,C,A;B=$pkg.errorString=$newType(0,$kindStruct,"errors.errorString",true,"errors",false,function(s_){this.$val=this;if(arguments.length===0){this.s="";return;}this.s=s_;});C=$ptrType(B);A=function(a){var $ptr,a;return new B.ptr(a);};$pkg.New=A;B.ptr.prototype.Error=function(){var $ptr,a;a=this;return a.s;};B.prototype.Error=function(){return this.$val.Error();};C.methods=[{prop:"Error",name:"Error",pkg:"",typ:$funcType([],[$String],false)}];B.init("errors",[{prop:"s",name:"s",exported:false,typ:$String,tag:""}]);$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["internal/race"]=(function(){var $pkg={},$init,A,B;A=function(a){var $ptr,a;};$pkg.Acquire=A;B=function(a){var $ptr,a;};$pkg.Release=B;$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["sync/atomic"]=(function(){var $pkg={},$init,A,H,N;A=$packages["github.com/gopherjs/gopherjs/js"];H=function(ad,ae,af){var $ptr,ad,ae,af;if(ad.$get()===ae){ad.$set(af);return true;}return false;};$pkg.CompareAndSwapInt32=H;N=function(ad,ae){var $ptr,ad,ae,af;af=ad.$get()+ae>>0;ad.$set(af);return af;};$pkg.AddInt32=N;$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=A.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["sync"]=(function(){var $pkg={},$init,B,C,A,E,R,U,AF,AP,AQ,AR,AS,AT,AW,BB,BC,BG,BN,BQ,G,I,AA,F,H,J,K,L,Q,Y,AB,AC,AK,AL;B=$packages["internal/race"];C=$packages["runtime"];A=$packages["sync/atomic"];E=$pkg.Pool=$newType(0,$kindStruct,"sync.Pool",true,"sync",true,function(local_,localSize_,store_,New_){this.$val=this;if(arguments.length===0){this.local=0;this.localSize=0;this.store=BC.nil;this.New=$throwNilPointerError;return;}this.local=local_;this.localSize=localSize_;this.store=store_;this.New=New_;});R=$pkg.Mutex=$newType(0,$kindStruct,"sync.Mutex",true,"sync",true,function(state_,sema_){this.$val=this;if(arguments.length===0){this.state=0;this.sema=0;return;}this.state=state_;this.sema=sema_;});U=$pkg.poolLocal=$newType(0,$kindStruct,"sync.poolLocal",true,"sync",false,function(private$0_,shared_,Mutex_,pad_){this.$val=this;if(arguments.length===0){this.private$0=$ifaceNil;this.shared=BC.nil;this.Mutex=new R.ptr(0,0);this.pad=BQ.zero();return;}this.private$0=private$0_;this.shared=shared_;this.Mutex=Mutex_;this.pad=pad_;});AF=$pkg.notifyList=$newType(0,$kindStruct,"sync.notifyList",true,"sync",false,function(wait_,notify_,lock_,head_,tail_){this.$val=this;if(arguments.length===0){this.wait=0;this.notify=0;this.lock=0;this.head=0;this.tail=0;return;}this.wait=wait_;this.notify=notify_;this.lock=lock_;this.head=head_;this.tail=tail_;});AP=$ptrType(E);AQ=$sliceType(AP);AR=$ptrType($Uint32);AS=$chanType($Bool,false,false);AT=$sliceType(AS);AW=$ptrType($Int32);BB=$ptrType(U);BC=$sliceType($emptyInterface);BG=$funcType([],[$emptyInterface],false);BN=$ptrType(R);BQ=$arrayType($Uint8,128);E.ptr.prototype.Get=function(){var $ptr,j,k,l,m,n,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;j=$f.j;k=$f.k;l=$f.l;m=$f.m;n=$f.n;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:j=this;if(j.store.$length===0){$s=1;continue;}$s=2;continue;case 1:if(!(j.New===$throwNilPointerError)){$s=3;continue;}$s=4;continue;case 3:k=j.New();$s=5;case 5:if($c){$c=false;k=k.$blk();}if(k&&k.$blk!==undefined){break s;}$s=-1;return k;case 4:$s=-1;return $ifaceNil;case 2:n=(l=j.store,m=j.store.$length-1>>0,((m<0||m>=l.$length)?($throwRuntimeError("index out of range"),undefined):l.$array[l.$offset+m]));j.store=$subslice(j.store,0,(j.store.$length-1>>0));$s=-1;return n;}return;}if($f===undefined){$f={$blk:E.ptr.prototype.Get};}$f.$ptr=$ptr;$f.j=j;$f.k=k;$f.l=l;$f.m=m;$f.n=n;$f.$s=$s;$f.$r=$r;return $f;};E.prototype.Get=function(){return this.$val.Get();};E.ptr.prototype.Put=function(j){var $ptr,j,k;k=this;if($interfaceIsEqual(j,$ifaceNil)){return;}k.store=$append(k.store,j);};E.prototype.Put=function(j){return this.$val.Put(j);};F=function(j){var $ptr,j;};H=function(j){var $ptr,j,k,l,m,n,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;j=$f.j;k=$f.k;l=$f.l;m=$f.m;n=$f.n;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:if(j.$get()===0){$s=1;continue;}$s=2;continue;case 1:k=new $Chan($Bool,0);l=j;(G||$throwRuntimeError("assignment to entry in nil map"))[AR.keyFor(l)]={k:l,v:$append((m=G[AR.keyFor(j)],m!==undefined?m.v:AT.nil),k)};n=$recv(k);$s=3;case 3:if($c){$c=false;n=n.$blk();}if(n&&n.$blk!==undefined){break s;}n[0];case 2:j.$set(j.$get()-(1)>>>0);$s=-1;return;}return;}if($f===undefined){$f={$blk:H};}$f.$ptr=$ptr;$f.j=j;$f.k=k;$f.l=l;$f.m=m;$f.n=n;$f.$s=$s;$f.$r=$r;return $f;};J=function(j){var $ptr,j,k,l,m,n,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;j=$f.j;k=$f.k;l=$f.l;m=$f.m;n=$f.n;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:j.$set(j.$get()+(1)>>>0);l=(k=G[AR.keyFor(j)],k!==undefined?k.v:AT.nil);if(l.$length===0){$s=-1;return;}m=(0>=l.$length?($throwRuntimeError("index out of range"),undefined):l.$array[l.$offset+0]);l=$subslice(l,1);n=j;(G||$throwRuntimeError("assignment to entry in nil map"))[AR.keyFor(n)]={k:n,v:l};if(l.$length===0){delete G[AR.keyFor(j)];}$r=$send(m,true);$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$s=-1;return;}return;}if($f===undefined){$f={$blk:J};}$f.$ptr=$ptr;$f.j=j;$f.k=k;$f.l=l;$f.m=m;$f.n=n;$f.$s=$s;$f.$r=$r;return $f;};K=function(j){var $ptr,j;};L=function(j){var $ptr,j;return false;};Q=function(){$throwRuntimeError("native function not implemented: sync.throw");};R.ptr.prototype.Lock=function(){var $ptr,j,k,l,m,n,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;j=$f.j;k=$f.k;l=$f.l;m=$f.m;n=$f.n;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:j=this;if(A.CompareAndSwapInt32((j.$ptr_state||(j.$ptr_state=new AW(function(){return this.$target.state;},function($v){this.$target.state=$v;},j))),0,1)){if(false){B.Acquire(j);}$s=-1;return;}k=false;l=0;case 1:m=j.state;n=m|1;if(!(((m&1)===0))){$s=3;continue;}$s=4;continue;case 3:if(L(l)){if(!k&&((m&2)===0)&&!(((m>>2>>0)===0))&&A.CompareAndSwapInt32((j.$ptr_state||(j.$ptr_state=new AW(function(){return this.$target.state;},function($v){this.$target.state=$v;},j))),m,m|2)){k=true;}AL();l=l+(1)>>0;$s=1;continue;}n=m+4>>0;case 4:if(k){if((n&2)===0){Q("sync: inconsistent mutex state");}n=(n&~(2))>>0;}if(A.CompareAndSwapInt32((j.$ptr_state||(j.$ptr_state=new AW(function(){return this.$target.state;},function($v){this.$target.state=$v;},j))),m,n)){$s=5;continue;}$s=6;continue;case 5:if((m&1)===0){$s=2;continue;}$r=I((j.$ptr_sema||(j.$ptr_sema=new AR(function(){return this.$target.sema;},function($v){this.$target.sema=$v;},j))));$s=7;case 7:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}k=true;l=0;case 6:$s=1;continue;case 2:if(false){B.Acquire(j);}$s=-1;return;}return;}if($f===undefined){$f={$blk:R.ptr.prototype.Lock};}$f.$ptr=$ptr;$f.j=j;$f.k=k;$f.l=l;$f.m=m;$f.n=n;$f.$s=$s;$f.$r=$r;return $f;};R.prototype.Lock=function(){return this.$val.Lock();};R.ptr.prototype.Unlock=function(){var $ptr,j,k,l,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;j=$f.j;k=$f.k;l=$f.l;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:j=this;if(false){$unused(j.state);B.Release(j);}k=A.AddInt32((j.$ptr_state||(j.$ptr_state=new AW(function(){return this.$target.state;},function($v){this.$target.state=$v;},j))),-1);if((((k+1>>0))&1)===0){Q("sync: unlock of unlocked mutex");}l=k;case 1:if(((l>>2>>0)===0)||!(((l&3)===0))){$s=-1;return;}k=((l-4>>0))|2;if(A.CompareAndSwapInt32((j.$ptr_state||(j.$ptr_state=new AW(function(){return this.$target.state;},function($v){this.$target.state=$v;},j))),l,k)){$s=3;continue;}$s=4;continue;case 3:$r=J((j.$ptr_sema||(j.$ptr_sema=new AR(function(){return this.$target.sema;},function($v){this.$target.sema=$v;},j))));$s=5;case 5:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$s=-1;return;case 4:l=j.state;$s=1;continue;case 2:$s=-1;return;}return;}if($f===undefined){$f={$blk:R.ptr.prototype.Unlock};}$f.$ptr=$ptr;$f.j=j;$f.k=k;$f.l=l;$f.$s=$s;$f.$r=$r;return $f;};R.prototype.Unlock=function(){return this.$val.Unlock();};Y=function(){var $ptr,j,k,l,m,n,o,p,q,r,s;j=AA;k=0;while(true){if(!(k<j.$length)){break;}l=k;m=((k<0||k>=j.$length)?($throwRuntimeError("index out of range"),undefined):j.$array[j.$offset+k]);((l<0||l>=AA.$length)?($throwRuntimeError("index out of range"),undefined):AA.$array[AA.$offset+l]=AP.nil);n=0;while(true){if(!(n<(m.localSize>>0))){break;}o=AC(m.local,n);o.private$0=$ifaceNil;p=o.shared;q=0;while(true){if(!(q<p.$length)){break;}r=q;(s=o.shared,((r<0||r>=s.$length)?($throwRuntimeError("index out of range"),undefined):s.$array[s.$offset+r]=$ifaceNil));q++;}o.shared=BC.nil;n=n+(1)>>0;}m.local=0;m.localSize=0;k++;}AA=new AQ([]);};AB=function(){var $ptr;F(Y);};AC=function(j,k){var $ptr,j,k,l;return(l=j,(l.nilCheck,((k<0||k>=l.length)?($throwRuntimeError("index out of range"),undefined):l[k])));};AK=function(){var $ptr,j;j=new AF.ptr(0,0,0,0,0);K(20);};AL=function(){$throwRuntimeError("native function not implemented: sync.runtime_doSpin");};AP.methods=[{prop:"Get",name:"Get",pkg:"",typ:$funcType([],[$emptyInterface],false)},{prop:"Put",name:"Put",pkg:"",typ:$funcType([$emptyInterface],[],false)},{prop:"getSlow",name:"getSlow",pkg:"sync",typ:$funcType([],[$emptyInterface],false)},{prop:"pin",name:"pin",pkg:"sync",typ:$funcType([],[BB],false)},{prop:"pinSlow",name:"pinSlow",pkg:"sync",typ:$funcType([],[BB],false)}];BN.methods=[{prop:"Lock",name:"Lock",pkg:"",typ:$funcType([],[],false)},{prop:"Unlock",name:"Unlock",pkg:"",typ:$funcType([],[],false)}];E.init("sync",[{prop:"local",name:"local",exported:false,typ:$UnsafePointer,tag:""},{prop:"localSize",name:"localSize",exported:false,typ:$Uintptr,tag:""},{prop:"store",name:"store",exported:false,typ:BC,tag:""},{prop:"New",name:"New",exported:true,typ:BG,tag:""}]);R.init("sync",[{prop:"state",name:"state",exported:false,typ:$Int32,tag:""},{prop:"sema",name:"sema",exported:false,typ:$Uint32,tag:""}]);U.init("sync",[{prop:"private$0",name:"private",exported:false,typ:$emptyInterface,tag:""},{prop:"shared",name:"shared",exported:false,typ:BC,tag:""},{prop:"Mutex",name:"",exported:true,typ:R,tag:""},{prop:"pad",name:"pad",exported:false,typ:BQ,tag:""}]);AF.init("sync",[{prop:"wait",name:"wait",exported:false,typ:$Uint32,tag:""},{prop:"notify",name:"notify",exported:false,typ:$Uint32,tag:""},{prop:"lock",name:"lock",exported:false,typ:$Uintptr,tag:""},{prop:"head",name:"head",exported:false,typ:$UnsafePointer,tag:""},{prop:"tail",name:"tail",exported:false,typ:$UnsafePointer,tag:""}]);$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=B.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=C.$init();$s=2;case 2:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=A.$init();$s=3;case 3:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}AA=AQ.nil;G={};I=H;AB();AK();}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["io"]=(function(){var $pkg={},$init,A,B,AI,AJ;A=$packages["errors"];B=$packages["sync"];$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=A.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=B.$init();$s=2;case 2:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$pkg.ErrShortWrite=A.New("short write");$pkg.ErrShortBuffer=A.New("short buffer");$pkg.EOF=A.New("EOF");$pkg.ErrUnexpectedEOF=A.New("unexpected EOF");$pkg.ErrNoProgress=A.New("multiple Read calls return no data or error");AI=A.New("Seek: invalid whence");AJ=A.New("Seek: invalid offset");$pkg.ErrClosedPipe=A.New("io: read/write on closed pipe");}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["unicode"]=(function(){var $pkg={},$init;$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["unicode/utf8"]=(function(){var $pkg={},$init;$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["strings"]=(function(){var $pkg={},$init,C,B,D,E,A,AW;C=$packages["errors"];B=$packages["github.com/gopherjs/gopherjs/js"];D=$packages["io"];E=$packages["unicode"];A=$packages["unicode/utf8"];AW=function(e,f){var $ptr,e,f;return e.length>=f.length&&$substring(e,0,f.length)===f;};$pkg.HasPrefix=AW;$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=C.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=B.$init();$s=2;case 2:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=D.$init();$s=3;case 3:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=E.$init();$s=4;case 4:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=A.$init();$s=5;case 5:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["github.com/oskca/gopherjs-vue"]=(function(){var $pkg={},$init,A,B,E,C,D,G,H,P,Z,AA,AC,AD,AN,AR,AS,AT,AU,AV,AW,AX,AY,AZ,BA,BB,BC,BE,BI,BJ,BK,BL,BM,BN,BO,BP,BQ,BR,BS,BT,BU,BV,BW,BX,BY,F,AE,AF,I,AB,AO,AP;A=$packages["github.com/gopherjs/gopherjs/js"];B=$packages["github.com/oskca/gopherjs-dom"];E=$packages["github.com/oskca/gopherjs-json"];C=$packages["github.com/oskca/gopherjs-vue/jscode/debug"];D=$packages["strings"];G=$pkg.pool=$newType(0,$kindStruct,"vue.pool",true,"github.com/oskca/gopherjs-vue",false,function(creator_,structPtr_,counter_){this.$val=this;if(arguments.length===0){this.creator=$throwNilPointerError;this.structPtr=$ifaceNil;this.counter=0;return;}this.creator=creator_;this.structPtr=structPtr_;this.counter=counter_;});H=$pkg.Component=$newType(0,$kindStruct,"vue.Component",true,"github.com/oskca/gopherjs-vue",true,function(ViewModel_){this.$val=this;if(arguments.length===0){this.ViewModel=AU.nil;return;}this.ViewModel=ViewModel_;});P=$pkg.TConfig=$newType(0,$kindStruct,"vue.TConfig",true,"github.com/oskca/gopherjs-vue",true,function(Object_,Silent_,OptionMergeStrategies_,Devtools_,ErrorHandler_,IgnoredElements_,KeyCodes_){this.$val=this;if(arguments.length===0){this.Object=null;this.Silent=false;this.OptionMergeStrategies=$ifaceNil;this.Devtools=false;this.ErrorHandler=$throwNilPointerError;this.IgnoredElements=AT.nil;this.KeyCodes=false;return;}this.Object=Object_;this.Silent=Silent_;this.OptionMergeStrategies=OptionMergeStrategies_;this.Devtools=Devtools_;this.ErrorHandler=ErrorHandler_;this.IgnoredElements=IgnoredElements_;this.KeyCodes=KeyCodes_;});Z=$pkg.LifeCycleEvent=$newType(8,$kindString,"vue.LifeCycleEvent",true,"github.com/oskca/gopherjs-vue",true,null);AA=$pkg.Option=$newType(0,$kindStruct,"vue.Option",true,"github.com/oskca/gopherjs-vue",true,function(Object_,Name_,Data_,El_,Template_,Parent_,Delimiters_,Functional_,coms_,props_,mixins_){this.$val=this;if(arguments.length===0){this.Object=null;this.Name="";this.Data=$ifaceNil;this.El=$ifaceNil;this.Template="";this.Parent=null;this.Delimiters=AT.nil;this.Functional=AT.nil;this.coms=false;this.props=AT.nil;this.mixins=AY.nil;return;}this.Object=Object_;this.Name=Name_;this.Data=Data_;this.El=El_;this.Template=Template_;this.Parent=Parent_;this.Delimiters=Delimiters_;this.Functional=Functional_;this.coms=coms_;this.props=props_;this.mixins=mixins_;});AC=$pkg.CreateElement=$newType(4,$kindFunc,"vue.CreateElement",true,"github.com/oskca/gopherjs-vue",true,null);AD=$pkg.Render=$newType(4,$kindFunc,"vue.Render",true,"github.com/oskca/gopherjs-vue",true,null);AN=$pkg.ViewModel=$newType(0,$kindStruct,"vue.ViewModel",true,"github.com/oskca/gopherjs-vue",true,function(Object_,Data_,El_,Options_,Parent_,Root_,Children_,Slots_,Refs_,IsServer_,WatchEx_,Set_,Delete_,On_,Once_,Off_,Emit_,Mount_,ForceUpdate_,NextTick_,Destroy_){this.$val=this;if(arguments.length===0){this.Object=null;this.Data=null;this.El=null;this.Options=null;this.Parent=null;this.Root=null;this.Children=null;this.Slots=null;this.Refs=null;this.IsServer=false;this.WatchEx=$throwNilPointerError;this.Set=$throwNilPointerError;this.Delete=$throwNilPointerError;this.On=$throwNilPointerError;this.Once=$throwNilPointerError;this.Off=$throwNilPointerError;this.Emit=$throwNilPointerError;this.Mount=$throwNilPointerError;this.ForceUpdate=$throwNilPointerError;this.NextTick=$throwNilPointerError;this.Destroy=$throwNilPointerError;return;}this.Object=Object_;this.Data=Data_;this.El=El_;this.Options=Options_;this.Parent=Parent_;this.Root=Root_;this.Children=Children_;this.Slots=Slots_;this.Refs=Refs_;this.IsServer=IsServer_;this.WatchEx=WatchEx_;this.Set=Set_;this.Delete=Delete_;this.On=On_;this.Once=Once_;this.Off=Off_;this.Emit=Emit_;this.Mount=Mount_;this.ForceUpdate=ForceUpdate_;this.NextTick=NextTick_;this.Destroy=Destroy_;});AR=$ptrType(G);AS=$sliceType(AR);AT=$sliceType($String);AU=$ptrType(AN);AV=$ptrType(H);AW=$funcType([],[$emptyInterface],false);AX=$funcType([],[],false);AY=$sliceType(A.M);AZ=$mapType($String,AV);BA=$sliceType($emptyInterface);BB=$mapType($String,A.M);BC=$ptrType(A.Object);BE=$funcType([BC],[],false);BI=$funcType([BC,BC],[],false);BJ=$mapType($String,$Int);BK=$ptrType(AA);BL=$sliceType(BC);BM=$funcType([AU,BL],[],false);BN=$funcType([AU],[$emptyInterface],false);BO=$funcType([AU,BC],[],false);BP=$sliceType(BO);BQ=$funcType([AU],[],false);BR=$funcType([$String,BI,$Bool],[AX],false);BS=$funcType([$String,$emptyInterface],[],false);BT=$funcType([$String],[],false);BU=$funcType([AT],[],true);BV=$funcType([$String,BA],[],true);BW=$funcType([BA],[BC],true);BX=$funcType([AX],[],false);BY=$funcType([$Bool],[],false);H.ptr.prototype.New=function(){var $ptr,a;a=this;return AP(new(a.ViewModel.Object)());};H.prototype.New=function(){return this.$val.New();};I=function(a){var $ptr,a;return new H.ptr(AP(a));};H.ptr.prototype.Register=function(a){var $ptr,a,b;b=this;AE.component($externalize(a,$String),$externalize(b,AV));return b;};H.prototype.Register=function(a){return this.$val.Register(a);};AN.ptr.prototype.FromJS=function(a){var $ptr,a,b,c,d,e;b=this;c=A.Keys(a);d=0;while(true){if(!(d<c.$length)){break;}e=((d<0||d>=c.$length)?($throwRuntimeError("index out of range"),undefined):c.$array[c.$offset+d]);if(D.HasPrefix(e,"$")||D.HasPrefix(e,"_")){d++;continue;}b.Object[$externalize(e,$String)]=a[$externalize(e,$String)];d++;}return b;};AN.prototype.FromJS=function(a){return this.$val.FromJS(a);};AN.ptr.prototype.FromJSON=function(a){var $ptr,a,b;b=this;return b.FromJS(E.Parse(a));};AN.prototype.FromJSON=function(a){return this.$val.FromJSON(a);};AN.ptr.prototype.ToJS=function(){var $ptr,a,b,c,d,e;a=this;b=new($global.Object)();c=A.Keys(a.Object);d=0;while(true){if(!(d<c.$length)){break;}e=((d<0||d>=c.$length)?($throwRuntimeError("index out of range"),undefined):c.$array[c.$offset+d]);if(D.HasPrefix(e,"$")||D.HasPrefix(e,"_")){d++;continue;}b[$externalize(e,$String)]=a.Object[$externalize(e,$String)];d++;}return b;};AN.prototype.ToJS=function(){return this.$val.ToJS();};AN.ptr.prototype.ToJSON=function(){var $ptr,a;a=this;return E.Stringify(new $String(a.ToJSON()));};AN.prototype.ToJSON=function(){return this.$val.ToJSON();};AB=function(){var $ptr,a;a=new AA.ptr(new($global.Object)(),"",$ifaceNil,$ifaceNil,"",null,AT.nil,AT.nil,false,AT.nil,AY.nil);a.coms={};a.props=new AT([]);a.mixins=new AY([]);return a;};$pkg.NewOption=AB;AA.ptr.prototype.NewViewModel=function(){var $ptr,a;a=this;return AP(new(AE)(a.prepare()));};AA.prototype.NewViewModel=function(){return this.$val.NewViewModel();};AA.ptr.prototype.NewComponent=function(){var $ptr,a,b,c;a=this;b=$assertType($internalize(a.Object.el,$emptyInterface),$String,true);c=b[1];if(c){$panic(new $String("Option.El in component must be a function"));}return I(AE.extend(a.prepare()));};AA.prototype.NewComponent=function(){return this.$val.NewComponent();};AA.ptr.prototype.prepare=function(){var $ptr,a,b;a=null;b=this;if($keys(b.coms).length>0){b.Object.components=$externalize(b.coms,AZ);}if(b.props.$length>0){b.Object.props=$externalize(b.props,AT);}if(b.mixins.$length>0){b.Object.mixins=$externalize(b.mixins,AY);}a=b.Object;return a;};AA.prototype.prepare=function(){return this.$val.prepare();};AA.ptr.prototype.SetDataWithMethods=function(a){var $ptr,a,b;b=this;if($interfaceIsEqual(a,$ifaceNil)){return b;}b.Object.data=$externalize(a,$emptyInterface);b.Object.methods=A.MakeWrapper(a);return b;};AA.prototype.SetDataWithMethods=function(a){return this.$val.SetDataWithMethods(a);};AA.ptr.prototype.AddMethod=function(a,b){var $ptr,a,b,c;c=this;return c.addMixin("methods",new A.M($makeMap($String.keyFor,[{k:a,v:new $jsObjectPtr(A.MakeFunc((function $b(d,e){var $ptr,d,e,f,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;d=$f.d;e=$f.e;f=$f.f;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:f=AP(d);$r=b(f,e);$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$s=-1;return $ifaceNil;}return;}if($f===undefined){$f={$blk:$b};}$f.$ptr=$ptr;$f.d=d;$f.e=e;$f.f=f;$f.$s=$s;$f.$r=$r;return $f;})))}])));};AA.prototype.AddMethod=function(a,b){return this.$val.AddMethod(a,b);};AA.ptr.prototype.SetRender=function(a){var $ptr,a,b,c;b=this;c=A.MakeFunc((function $b(c,d){var $ptr,c,d,e,f,g,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;c=$f.c;d=$f.d;e=$f.e;f=$f.f;g=$f.g;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:e=[e];f=AP(c);e[0]=(0>=d.$length?($throwRuntimeError("index out of range"),undefined):d.$array[d.$offset+0]);g=(function(e){return function(g,h,i){var $ptr,g,h,i,j;j=null;j=e[0][$externalize(g,$String)]($externalize(h,$emptyInterface),$externalize(i,BA));return j;};})(e);$r=a(f,g);$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$s=-1;return $ifaceNil;}return;}if($f===undefined){$f={$blk:$b};}$f.$ptr=$ptr;$f.c=c;$f.d=d;$f.e=e;$f.f=f;$f.g=g;$f.$s=$s;$f.$r=$r;return $f;}));b.Object.render=c;};AA.prototype.SetRender=function(a){return this.$val.SetRender(a);};AA.ptr.prototype.AddComputed=function(a,b,c){var $ptr,a,b,c,d,e,f,g,h,i,j,k,l;d=this;e={};f=a;(e||$throwRuntimeError("assignment to entry in nil map"))[$String.keyFor(f)]={k:f,v:{}};g=A.MakeFunc((function $b(g,h){var $ptr,g,h,i,j,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;g=$f.g;h=$f.h;i=$f.i;j=$f.j;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:i=AP(g);j=b(i);$s=1;case 1:if($c){$c=false;j=j.$blk();}if(j&&j.$blk!==undefined){break s;}$s=-1;return j;}return;}if($f===undefined){$f={$blk:$b};}$f.$ptr=$ptr;$f.g=g;$f.h=h;$f.i=i;$f.j=j;$f.$s=$s;$f.$r=$r;return $f;}));h="get";((i=e[$String.keyFor(a)],i!==undefined?i.v:false)||$throwRuntimeError("assignment to entry in nil map"))[$String.keyFor(h)]={k:h,v:new $jsObjectPtr(g)};if(c.$length>0){j=A.MakeFunc((function $b(j,k){var $ptr,j,k,l,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;j=$f.j;k=$f.k;l=$f.l;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:l=AP(j);$r=(0>=c.$length?($throwRuntimeError("index out of range"),undefined):c.$array[c.$offset+0])(l,(0>=k.$length?($throwRuntimeError("index out of range"),undefined):k.$array[k.$offset+0]));$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$s=-1;return $ifaceNil;}return;}if($f===undefined){$f={$blk:$b};}$f.$ptr=$ptr;$f.j=j;$f.k=k;$f.l=l;$f.$s=$s;$f.$r=$r;return $f;}));k="set";((l=e[$String.keyFor(a)],l!==undefined?l.v:false)||$throwRuntimeError("assignment to entry in nil map"))[$String.keyFor(k)]={k:k,v:new $jsObjectPtr(j)};}d.addMixin("computed",new BB(e));};AA.prototype.AddComputed=function(a,b,c){return this.$val.AddComputed(a,b,c);};AA.ptr.prototype.OnLifeCycleEvent=function(a,b){var $ptr,a,b,c;c=this;return c.addMixin(a,new $jsObjectPtr(A.MakeFunc((function $b(d,e){var $ptr,d,e,f,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;d=$f.d;e=$f.e;f=$f.f;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:f=AP(d);$r=b(f);$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$s=-1;return $ifaceNil;}return;}if($f===undefined){$f={$blk:$b};}$f.$ptr=$ptr;$f.d=d;$f.e=e;$f.f=f;$f.$s=$s;$f.$r=$r;return $f;}))));};AA.prototype.OnLifeCycleEvent=function(a,b){return this.$val.OnLifeCycleEvent(a,b);};AA.ptr.prototype.Mixin=function(a){var $ptr,a,b;b=this;b.mixins=$append(b.mixins,a);return b;};AA.prototype.Mixin=function(a){return this.$val.Mixin(a);};AA.ptr.prototype.addMixin=function(a,b){var $ptr,a,b,c;c=this;return c.Mixin($makeMap($String.keyFor,[{k:a,v:b}]));};AA.prototype.addMixin=function(a,b){return this.$val.addMixin(a,b);};AA.ptr.prototype.AddSubComponent=function(a,b){var $ptr,a,b,c,d;c=this;d=a;(c.coms||$throwRuntimeError("assignment to entry in nil map"))[$String.keyFor(d)]={k:d,v:b};return c;};AA.prototype.AddSubComponent=function(a,b){return this.$val.AddSubComponent(a,b);};AA.ptr.prototype.AddProp=function(a){var $ptr,a,b;b=this;b.props=$appendSlice(b.props,a);return b;};AA.prototype.AddProp=function(a){return this.$val.AddProp(a);};AO=function(a,b){var $ptr,a,b,c,d,e;c=AB();c.Object.el=$externalize(a,$emptyInterface);c.SetDataWithMethods(b);d=c.NewViewModel();e=b;(AF||$throwRuntimeError("assignment to entry in nil map"))[$emptyInterface.keyFor(e)]={k:e,v:d};return d;};$pkg.New=AO;AP=function(a){var $ptr,a;return new AN.ptr(a,null,null,null,null,null,null,null,null,false,$throwNilPointerError,$throwNilPointerError,$throwNilPointerError,$throwNilPointerError,$throwNilPointerError,$throwNilPointerError,$throwNilPointerError,$throwNilPointerError,$throwNilPointerError,$throwNilPointerError,$throwNilPointerError);};AN.ptr.prototype.Watch=function(a,b){var $ptr,a,b,c,d,e;c=$throwNilPointerError;d=this;e=d.Object.$watch($externalize(a,$String),$externalize(b,BE));c=(function(){var $ptr;e();});return c;};AN.prototype.Watch=function(a,b){return this.$val.Watch(a,b);};AV.methods=[{prop:"New",name:"New",pkg:"",typ:$funcType([],[AU],false)},{prop:"Register",name:"Register",pkg:"",typ:$funcType([$String],[AV],false)}];BK.methods=[{prop:"NewViewModel",name:"NewViewModel",pkg:"",typ:$funcType([],[AU],false)},{prop:"NewComponent",name:"NewComponent",pkg:"",typ:$funcType([],[AV],false)},{prop:"prepare",name:"prepare",pkg:"github.com/oskca/gopherjs-vue",typ:$funcType([],[BC],false)},{prop:"SetDataWithMethods",name:"SetDataWithMethods",pkg:"",typ:$funcType([$emptyInterface],[BK],false)},{prop:"AddMethod",name:"AddMethod",pkg:"",typ:$funcType([$String,BM],[BK],false)},{prop:"SetRender",name:"SetRender",pkg:"",typ:$funcType([AD],[],false)},{prop:"AddComputed",name:"AddComputed",pkg:"",typ:$funcType([$String,BN,BP],[],true)},{prop:"OnLifeCycleEvent",name:"OnLifeCycleEvent",pkg:"",typ:$funcType([Z,BQ],[BK],false)},{prop:"Mixin",name:"Mixin",pkg:"",typ:$funcType([A.M],[BK],false)},{prop:"addMixin",name:"addMixin",pkg:"github.com/oskca/gopherjs-vue",typ:$funcType([$String,$emptyInterface],[BK],false)},{prop:"AddSubComponent",name:"AddSubComponent",pkg:"",typ:$funcType([$String,AV],[BK],false)},{prop:"AddProp",name:"AddProp",pkg:"",typ:$funcType([AT],[BK],true)}];AU.methods=[{prop:"FromJS",name:"FromJS",pkg:"",typ:$funcType([BC],[AU],false)},{prop:"FromJSON",name:"FromJSON",pkg:"",typ:$funcType([$String],[AU],false)},{prop:"ToJS",name:"ToJS",pkg:"",typ:$funcType([],[BC],false)},{prop:"ToJSON",name:"ToJSON",pkg:"",typ:$funcType([],[$String],false)},{prop:"Watch",name:"Watch",pkg:"",typ:$funcType([$String,BE],[AX],false)}];G.init("github.com/oskca/gopherjs-vue",[{prop:"creator",name:"creator",exported:false,typ:AW,tag:""},{prop:"structPtr",name:"structPtr",exported:false,typ:$emptyInterface,tag:""},{prop:"counter",name:"counter",exported:false,typ:$Int,tag:""}]);H.init("",[{prop:"ViewModel",name:"",exported:true,typ:AU,tag:""}]);P.init("",[{prop:"Object",name:"",exported:true,typ:BC,tag:""},{prop:"Silent",name:"Silent",exported:true,typ:$Bool,tag:"js:\"silent\""},{prop:"OptionMergeStrategies",name:"OptionMergeStrategies",exported:true,typ:$emptyInterface,tag:"js:\"optionMergeStrategies\""},{prop:"Devtools",name:"Devtools",exported:true,typ:$Bool,tag:"js:\"devtools\""},{prop:"ErrorHandler",name:"ErrorHandler",exported:true,typ:BI,tag:"js:\"errorHandler\""},{prop:"IgnoredElements",name:"IgnoredElements",exported:true,typ:AT,tag:"js:\"ignoredElements\""},{prop:"KeyCodes",name:"KeyCodes",exported:true,typ:BJ,tag:"js:\"keyCodes\""}]);AA.init("github.com/oskca/gopherjs-vue",[{prop:"Object",name:"",exported:true,typ:BC,tag:""},{prop:"Name",name:"Name",exported:true,typ:$String,tag:"js:\"name\""},{prop:"Data",name:"Data",exported:true,typ:$emptyInterface,tag:"js:\"data\""},{prop:"El",name:"El",exported:true,typ:$emptyInterface,tag:"js:\"el\""},{prop:"Template",name:"Template",exported:true,typ:$String,tag:"js:\"template\""},{prop:"Parent",name:"Parent",exported:true,typ:BC,tag:"js:\"parent\""},{prop:"Delimiters",name:"Delimiters",exported:true,typ:AT,tag:"js:\"delimiters\""},{prop:"Functional",name:"Functional",exported:true,typ:AT,tag:"js:\"functional\""},{prop:"coms",name:"coms",exported:false,typ:AZ,tag:""},{prop:"props",name:"props",exported:false,typ:AT,tag:""},{prop:"mixins",name:"mixins",exported:false,typ:AY,tag:""}]);AC.init([$String,$emptyInterface,BA],[BC],false);AD.init([AU,AC],[],false);AN.init("",[{prop:"Object",name:"",exported:true,typ:BC,tag:""},{prop:"Data",name:"Data",exported:true,typ:BC,tag:"js:\"$data\""},{prop:"El",name:"El",exported:true,typ:BC,tag:"js:\"$el\""},{prop:"Options",name:"Options",exported:true,typ:BC,tag:"js:\"$options\""},{prop:"Parent",name:"Parent",exported:true,typ:BC,tag:"js:\"$parent\""},{prop:"Root",name:"Root",exported:true,typ:BC,tag:"js:\"$root\""},{prop:"Children",name:"Children",exported:true,typ:BC,tag:"js:\"$children\""},{prop:"Slots",name:"Slots",exported:true,typ:BC,tag:"js:\"$slots\""},{prop:"Refs",name:"Refs",exported:true,typ:BC,tag:"js:\"$refs\""},{prop:"IsServer",name:"IsServer",exported:true,typ:$Bool,tag:"js:\"$isServer\""},{prop:"WatchEx",name:"WatchEx",exported:true,typ:BR,tag:"js:\"$watch\""},{prop:"Set",name:"Set",exported:true,typ:BS,tag:"js:\"$set\""},{prop:"Delete",name:"Delete",exported:true,typ:BT,tag:"js:\"$delete\""},{prop:"On",name:"On",exported:true,typ:BS,tag:"js:\"$on\""},{prop:"Once",name:"Once",exported:true,typ:BS,tag:"js:\"$once\""},{prop:"Off",name:"Off",exported:true,typ:BU,tag:"js:\"$off\""},{prop:"Emit",name:"Emit",exported:true,typ:BV,tag:"js:\"$emit\""},{prop:"Mount",name:"Mount",exported:true,typ:BW,tag:"js:\"$mount\""},{prop:"ForceUpdate",name:"ForceUpdate",exported:true,typ:AX,tag:"js:\"$forceUpdate\""},{prop:"NextTick",name:"NextTick",exported:true,typ:BX,tag:"js:\"$nextTick\""},{prop:"Destroy",name:"Destroy",exported:true,typ:BY,tag:"js:\"$destroy\""}]);$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=A.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=B.$init();$s=2;case 2:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=E.$init();$s=3;case 3:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=C.$init();$s=4;case 4:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=D.$init();$s=5;case 5:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}F=$makeSlice(AS,0);$pkg.Config=new P.ptr(new($global.Object)(),false,$ifaceNil,false,$throwNilPointerError,AT.nil,false);AE=$global.Vue;AF={};}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["honnef.co/go/js/util"]=(function(){var $pkg={},$init,A,G,L,M;A=$packages["github.com/gopherjs/gopherjs/js"];G=$pkg.EventTarget=$newType(0,$kindStruct,"util.EventTarget",true,"honnef.co/go/js/util",true,function(Object_){this.$val=this;if(arguments.length===0){this.Object=null;return;}this.Object=Object_;});L=$ptrType(A.Object);M=$funcType([L],[],false);G.ptr.prototype.AddEventListener=function(a,b,c){var $ptr,a,b,c,d;d=this;d.Object.addEventListener($externalize(a,$String),$externalize(c,M),$externalize(b,$Bool));};G.prototype.AddEventListener=function(a,b,c){return this.$val.AddEventListener(a,b,c);};G.ptr.prototype.RemoveEventListener=function(a,b,c){var $ptr,a,b,c,d;d=this;d.Object.removeEventListener($externalize(a,$String),$externalize(c,M),$externalize(b,$Bool));};G.prototype.RemoveEventListener=function(a,b,c){return this.$val.RemoveEventListener(a,b,c);};G.methods=[{prop:"AddEventListener",name:"AddEventListener",pkg:"",typ:$funcType([$String,$Bool,M],[],false)},{prop:"RemoveEventListener",name:"RemoveEventListener",pkg:"",typ:$funcType([$String,$Bool,M],[],false)}];G.init("",[{prop:"Object",name:"",exported:true,typ:L,tag:""}]);$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=A.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["honnef.co/go/js/xhr"]=(function(){var $pkg={},$init,A,B,C,D,E,I,J,K,L,F;A=$packages["errors"];B=$packages["github.com/gopherjs/gopherjs/js"];C=$packages["honnef.co/go/js/util"];D=$pkg.Request=$newType(0,$kindStruct,"xhr.Request",true,"honnef.co/go/js/xhr",true,function(Object_,EventTarget_,ReadyState_,Response_,ResponseText_,ResponseType_,ResponseXML_,Status_,StatusText_,Timeout_,WithCredentials_,ch_){this.$val=this;if(arguments.length===0){this.Object=null;this.EventTarget=new C.EventTarget.ptr(null);this.ReadyState=0;this.Response=null;this.ResponseText="";this.ResponseType="";this.ResponseXML=null;this.Status=0;this.StatusText="";this.Timeout=0;this.WithCredentials=false;this.ch=$chanNil;return;}this.Object=Object_;this.EventTarget=EventTarget_;this.ReadyState=ReadyState_;this.Response=Response_;this.ResponseText=ResponseText_;this.ResponseType=ResponseType_;this.ResponseXML=ResponseXML_;this.Status=Status_;this.StatusText=StatusText_;this.Timeout=Timeout_;this.WithCredentials=WithCredentials_;this.ch=ch_;});E=$pkg.Upload=$newType(0,$kindStruct,"xhr.Upload",true,"honnef.co/go/js/xhr",true,function(Object_,EventTarget_){this.$val=this;if(arguments.length===0){this.Object=null;this.EventTarget=new C.EventTarget.ptr(null);return;}this.Object=Object_;this.EventTarget=EventTarget_;});I=$ptrType(E);J=$ptrType(D);K=$ptrType(B.Object);L=$chanType($error,false,false);D.ptr.prototype.Upload=function(){var $ptr,a,b;a=this;b=a.Object.upload;return new E.ptr(b,new C.EventTarget.ptr(b));};D.prototype.Upload=function(){return this.$val.Upload();};F=function(a,b){var $ptr,a,b,c,d;c=new($global.XMLHttpRequest)();d=new D.ptr(c,new C.EventTarget.ptr(c),0,null,"","",null,0,"",0,false,$chanNil);d.Object.open($externalize(a,$String),$externalize(b,$String),$externalize(true,$Bool));return d;};$pkg.NewRequest=F;D.ptr.prototype.ResponseHeaders=function(){var $ptr,a;a=this;return $internalize(a.Object.getAllResponseHeaders(),$String);};D.prototype.ResponseHeaders=function(){return this.$val.ResponseHeaders();};D.ptr.prototype.ResponseHeader=function(a){var $ptr,a,b,c;b=this;c=b.Object.getResponseHeader($externalize(a,$String));if(c===null){return"";}return $internalize(c,$String);};D.prototype.ResponseHeader=function(a){return this.$val.ResponseHeader(a);};D.ptr.prototype.Abort=function(){var $ptr,a,b,$r;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;a=$f.a;b=$f.b;$r=$f.$r;}a=this;if(a.ch===$chanNil){return;}a.Object.abort();b=$select([[a.ch,$pkg.ErrAborted],[]]);if(b[0]===0){}else if(b[0]===1){}if($f===undefined){$f={$blk:D.ptr.prototype.Abort};}$f.$ptr=$ptr;$f.a=a;$f.b=b;$f.$r=$r;return $f;};D.prototype.Abort=function(){return this.$val.Abort();};D.ptr.prototype.OverrideMimeType=function(a){var $ptr,a,b;b=this;b.Object.overrideMimeType($externalize(a,$String));};D.prototype.OverrideMimeType=function(a){return this.$val.OverrideMimeType(a);};D.ptr.prototype.Send=function(a){var $ptr,a,b,c,d,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;a=$f.a;b=$f.b;c=$f.c;d=$f.d;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:b=[b];b[0]=this;if(!(b[0].ch===$chanNil)){$panic(new $String("must not use a Request for multiple requests"));}b[0].ch=new $Chan($error,1);$clone(b[0].EventTarget,C.EventTarget).AddEventListener("load",false,(function(b){return function(c){var $ptr,c;$go((function(b){return function $b(){var $ptr,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=$send(b[0].ch,$ifaceNil);$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$s=-1;return;}return;}if($f===undefined){$f={$blk:$b};}$f.$ptr=$ptr;$f.$s=$s;$f.$r=$r;return $f;};})(b),[]);};})(b));$clone(b[0].EventTarget,C.EventTarget).AddEventListener("error",false,(function(b){return function(c){var $ptr,c;$go((function(b){return function $b(){var $ptr,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=$send(b[0].ch,$pkg.ErrFailure);$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$s=-1;return;}return;}if($f===undefined){$f={$blk:$b};}$f.$ptr=$ptr;$f.$s=$s;$f.$r=$r;return $f;};})(b),[]);};})(b));$clone(b[0].EventTarget,C.EventTarget).AddEventListener("timeout",false,(function(b){return function(c){var $ptr,c;$go((function(b){return function $b(){var $ptr,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=$send(b[0].ch,$pkg.ErrTimeout);$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$s=-1;return;}return;}if($f===undefined){$f={$blk:$b};}$f.$ptr=$ptr;$f.$s=$s;$f.$r=$r;return $f;};})(b),[]);};})(b));b[0].Object.send($externalize(a,$emptyInterface));c=$recv(b[0].ch);$s=1;case 1:if($c){$c=false;c=c.$blk();}if(c&&c.$blk!==undefined){break s;}d=c[0];$s=-1;return d;}return;}if($f===undefined){$f={$blk:D.ptr.prototype.Send};}$f.$ptr=$ptr;$f.a=a;$f.b=b;$f.c=c;$f.d=d;$f.$s=$s;$f.$r=$r;return $f;};D.prototype.Send=function(a){return this.$val.Send(a);};D.ptr.prototype.SetRequestHeader=function(a,b){var $ptr,a,b,c;c=this;c.Object.setRequestHeader($externalize(a,$String),$externalize(b,$String));};D.prototype.SetRequestHeader=function(a,b){return this.$val.SetRequestHeader(a,b);};J.methods=[{prop:"Upload",name:"Upload",pkg:"",typ:$funcType([],[I],false)},{prop:"ResponseHeaders",name:"ResponseHeaders",pkg:"",typ:$funcType([],[$String],false)},{prop:"ResponseHeader",name:"ResponseHeader",pkg:"",typ:$funcType([$String],[$String],false)},{prop:"Abort",name:"Abort",pkg:"",typ:$funcType([],[],false)},{prop:"OverrideMimeType",name:"OverrideMimeType",pkg:"",typ:$funcType([$String],[],false)},{prop:"Send",name:"Send",pkg:"",typ:$funcType([$emptyInterface],[$error],false)},{prop:"SetRequestHeader",name:"SetRequestHeader",pkg:"",typ:$funcType([$String,$String],[],false)}];D.init("honnef.co/go/js/xhr",[{prop:"Object",name:"",exported:true,typ:K,tag:""},{prop:"EventTarget",name:"",exported:true,typ:C.EventTarget,tag:""},{prop:"ReadyState",name:"ReadyState",exported:true,typ:$Int,tag:"js:\"readyState\""},{prop:"Response",name:"Response",exported:true,typ:K,tag:"js:\"response\""},{prop:"ResponseText",name:"ResponseText",exported:true,typ:$String,tag:"js:\"responseText\""},{prop:"ResponseType",name:"ResponseType",exported:true,typ:$String,tag:"js:\"responseType\""},{prop:"ResponseXML",name:"ResponseXML",exported:true,typ:K,tag:"js:\"responseXML\""},{prop:"Status",name:"Status",exported:true,typ:$Int,tag:"js:\"status\""},{prop:"StatusText",name:"StatusText",exported:true,typ:$String,tag:"js:\"statusText\""},{prop:"Timeout",name:"Timeout",exported:true,typ:$Int,tag:"js:\"timeout\""},{prop:"WithCredentials",name:"WithCredentials",exported:true,typ:$Bool,tag:"js:\"withCredentials\""},{prop:"ch",name:"ch",exported:false,typ:L,tag:""}]);E.init("",[{prop:"Object",name:"",exported:true,typ:K,tag:""},{prop:"EventTarget",name:"",exported:true,typ:C.EventTarget,tag:""}]);$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=A.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=B.$init();$s=2;case 2:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=C.$init();$s=3;case 3:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$pkg.ErrAborted=A.New("request aborted");$pkg.ErrTimeout=A.New("request timed out");$pkg.ErrFailure=A.New("send failed");}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$packages["main"]=(function(){var $pkg={},$init,A,D,B,C,E,F,H,I,J,K,L,G;A=$packages["github.com/gopherjs/gopherjs/js"];D=$packages["github.com/johanbrandhorst/gopherjs-grpc-websocket/client/helpers"];B=$packages["github.com/oskca/gopherjs-vue"];C=$packages["honnef.co/go/js/xhr"];E=$pkg.Model=$newType(0,$kindStruct,"main.Model",true,"main",true,function(Object_,Error_,SimpleMessage_,UnaryMessages_){this.$val=this;if(arguments.length===0){this.Object=null;this.Error="";this.SimpleMessage=H.nil;this.UnaryMessages=K.nil;return;}this.Object=Object_;this.Error=Error_;this.SimpleMessage=SimpleMessage_;this.UnaryMessages=UnaryMessages_;});F=$pkg.MyMessage=$newType(0,$kindStruct,"main.MyMessage",true,"main",true,function(Object_,Msg_,Num_){this.$val=this;if(arguments.length===0){this.Object=null;this.Msg="";this.Num=0;return;}this.Object=Object_;this.Msg=Msg_;this.Num=Num_;});H=$ptrType(F);I=$ptrType(A.Object);J=$structType("main",[{prop:"Object",name:"",exported:true,typ:I,tag:""},{prop:"msg",name:"msg",exported:false,typ:H,tag:"js:\"result\""}]);K=$sliceType(H);L=$ptrType(E);E.ptr.prototype.Simple=function(){var $ptr,a,b;a=this;b=C.NewRequest("GET","/api/v1/simple");b.SetRequestHeader("Content-Type","application/json");$go((function $b(){var $ptr,c,d,e,f,g,h,i,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;c=$f.c;d=$f.d;e=$f.e;f=$f.f;g=$f.g;h=$f.h;i=$f.i;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:c=b.Send($ifaceNil);$s=1;case 1:if($c){$c=false;c=c.$blk();}if(c&&c.$blk!==undefined){break s;}d=c;if(!($interfaceIsEqual(d,$ifaceNil))){$s=2;continue;}$s=3;continue;case 2:e=d.Error();$s=4;case 4:if($c){$c=false;e=e.$blk();}if(e&&e.$blk!==undefined){break s;}a.Object.error=$externalize(e,$String);$s=-1;return;case 3:if(!((($parseInt(b.Object.status)>>0)===200))){a.Object.error=$externalize($internalize(b.Object.responseText,$String),$String);$s=-1;return;}f=D.UnmarshalJSON($internalize(b.Object.responseText,$String));g=f[0];d=f[1];if(!($interfaceIsEqual(d,$ifaceNil))){$s=5;continue;}$s=6;continue;case 5:h=d.Error();$s=7;case 7:if($c){$c=false;h=h.$blk();}if(h&&h.$blk!==undefined){break s;}a.Object.error=$externalize(h,$String);$s=-1;return;case 6:i=new F.ptr(g,"",0);a.Object.simple_message=$externalize(i,H);$s=-1;return;}return;}if($f===undefined){$f={$blk:$b};}$f.$ptr=$ptr;$f.c=c;$f.d=d;$f.e=e;$f.f=f;$f.g=g;$f.h=h;$f.i=i;$f.$s=$s;$f.$r=$r;return $f;}),[]);};E.prototype.Simple=function(){return this.$val.Simple();};E.ptr.prototype.Unary=function(){var $ptr,a,b,c;a=this;b=C.NewRequest("GET","/api/v1/unary");b.SetRequestHeader("cache-control","no-cache");b.SetRequestHeader("Content-Type","application/json");c=0;$clone(b.EventTarget,$packages["honnef.co/go/js/util"].EventTarget).AddEventListener("readystatechange",false,(function $b(d){var $ptr,d,e,f,g,h,i,j,k,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;d=$f.d;e=$f.e;f=$f.f;g=$f.g;h=$f.h;i=$f.i;j=$f.j;k=$f.k;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:e=$parseInt(b.Object.readyState)>>0;if(e===(3)){$s=2;continue;}$s=3;continue;case 2:f=$substring($internalize(b.Object.responseText,$String),c);c=c+(f.length)>>0;g=D.UnmarshalJSON(f);h=g[0];i=g[1];if(!($interfaceIsEqual(i,$ifaceNil))){$s=4;continue;}$s=5;continue;case 4:j=i.Error();$s=6;case 6:if($c){$c=false;j=j.$blk();}if(j&&j.$blk!==undefined){break s;}a.Object.error=$externalize(j,$String);$s=-1;return;case 5:k=new J.ptr(h,H.nil);a.Object.unary_messages=$externalize($append($internalize(a.Object.unary_messages,K),$internalize(k.Object.result,H)),K);case 3:case 1:$s=-1;return;}return;}if($f===undefined){$f={$blk:$b};}$f.$ptr=$ptr;$f.d=d;$f.e=e;$f.f=f;$f.g=g;$f.h=h;$f.i=i;$f.j=j;$f.k=k;$f.$s=$s;$f.$r=$r;return $f;}));$go((function $b(){var $ptr,d,e,f,$s,$r;$s=0;var $f,$c=false;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$ptr=$f.$ptr;d=$f.d;e=$f.e;f=$f.f;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:d=b.Send($ifaceNil);$s=1;case 1:if($c){$c=false;d=d.$blk();}if(d&&d.$blk!==undefined){break s;}e=d;if(!($interfaceIsEqual(e,$ifaceNil))){$s=2;continue;}$s=3;continue;case 2:f=e.Error();$s=4;case 4:if($c){$c=false;f=f.$blk();}if(f&&f.$blk!==undefined){break s;}a.Object.error=$externalize(f,$String);$s=-1;return;case 3:if(!((($parseInt(b.Object.status)>>0)===200))){a.Object.error=$externalize($internalize(b.Object.responseText,$String),$String);$s=-1;return;}$s=-1;return;}return;}if($f===undefined){$f={$blk:$b};}$f.$ptr=$ptr;$f.d=d;$f.e=e;$f.f=f;$f.$s=$s;$f.$r=$r;return $f;}),[]);};E.prototype.Unary=function(){return this.$val.Unary();};G=function(){var $ptr,a;a=new E.ptr(new($global.Object)(),"",H.nil,K.nil);a.Object.error=$externalize("",$String);a.Object.simple_message=$externalize(new F.ptr(null,"",0),H);a.Object.unary_messages=$externalize(new K([]),K);B.New(new $String("#app"),a);};L.methods=[{prop:"Simple",name:"Simple",pkg:"",typ:$funcType([],[],false)},{prop:"Unary",name:"Unary",pkg:"",typ:$funcType([],[],false)}];E.init("",[{prop:"Object",name:"",exported:true,typ:I,tag:""},{prop:"Error",name:"Error",exported:true,typ:$String,tag:"js:\"error\""},{prop:"SimpleMessage",name:"SimpleMessage",exported:true,typ:H,tag:"js:\"simple_message\""},{prop:"UnaryMessages",name:"UnaryMessages",exported:true,typ:K,tag:"js:\"unary_messages\""}]);F.init("",[{prop:"Object",name:"",exported:true,typ:I,tag:""},{prop:"Msg",name:"Msg",exported:true,typ:$String,tag:"js:\"msg\""},{prop:"Num",name:"Num",exported:true,typ:$Int,tag:"js:\"num\""}]);$init=function(){$pkg.$init=function(){};var $f,$c=false,$s=0,$r;if(this!==undefined&&this.$blk!==undefined){$f=this;$c=true;$s=$f.$s;$r=$f.$r;}s:while(true){switch($s){case 0:$r=A.$init();$s=1;case 1:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=D.$init();$s=2;case 2:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=B.$init();$s=3;case 3:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}$r=C.$init();$s=4;case 4:if($c){$c=false;$r=$r.$blk();}if($r&&$r.$blk!==undefined){break s;}if($pkg===$mainPkg){G();$mainFinished=true;}}return;}if($f===undefined){$f={$blk:$init};}$f.$s=$s;$f.$r=$r;return $f;};$pkg.$init=$init;return $pkg;})();
$synthesizeMethods();
var $mainPkg = $packages["main"];
$packages["runtime"].$init();
$go($mainPkg.$init, []);
$flushConsole();

}).call(this);
//# sourceMappingURL=index.js.map
