function t(t,e,n,s){Object.defineProperty(t,e,{get:n,set:s,enumerable:!0,configurable:!0})}var e=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire55a5;e.register("1dThA",(function(n,s){t(n.exports,"Sync",(function(){return u}));var r=e("2Xs1f"),o=e("5Owdb"),i=e("2O3kG");Object.defineProperty(Array.prototype,"flat",{value:function(t=1){return this.reduce((function(e,n){return e.concat(Array.isArray(n)&&t>1?n.flat(t-1):n)}),[])}});class u extends o.Sync{destroy(){this.gunServer=[],delete this.gun,super.destroy()}uniqueID(){const t=super.uniqueID();return t?btoa(t+(this.persistent?"p":"")):null}async connect(t){var e,n;super.connect(t),this.gunServer=(null===(e=t.config)||void 0===e?void 0:e.urls)||[],this.persistent=(null===(n=t.config)||void 0===n?void 0:n.persistent)||!1,window.Gun?this.init(!0):this.load(["https://cdn.jsdelivr.net/npm/gun/gun.js",i.Crypto.url],this)}init(t,e){if(0==this.gunServer.length)return this.sendDisconnectError("You have to provide at least one relay server.");const n=this.uniqueID();if(t&&window.Gun&&n){this.gun=window.Gun({peers:this.gunServer}),this.store=n,i.Crypto.init(this.password);let t=this;this.persistent&&this.gun.get(this.store).once((e=>{if(e&&e.msg)try{const[n,s]=i.Crypto.decode(e.msg);setTimeout((function(){var e;null===(e=t.gun)||void 0===e||e.get(t.store).put({msg:i.Crypto.encode(["",s])})}),1e3)}catch(t){console.warn("GunDB:",t.message)}})),this.gun.get(this.store).on((function(e,n){try{const[n,s]=i.Crypto.decode(e.msg);n!=t.token&&null!=s&&t.applyUpdate(o.base64_to_unit8(s))}catch(t){console.warn("GunDB",t.message)}})),this.gun.get(this.store+"pubsub").on((function(e,n){try{const[n,s]=i.Crypto.decode(e.msg);n!=t.token&&null!=s&&t.pubsubReceive(o.base64_to_unit8(s))}catch(t){console.warn("GunDB",t.message)}})),this.persistent||(this.broadcast(!0,null),this.broadcast(!1,null)),this.sendConnect()}else{let t="GunDB unknown error";e?t="Could not load resource: "+e:window.Gun||(t="Could not load GunDB interface"),this.sendDisconnectError(t)}}broadcast(t,e){if(this.gun){const n=null==e?null:o.uint8_to_base64(e);this.gun.get(this.store+(t?"":"pubsub")).put({msg:i.Crypto.encode(["",n])})}}constructor(...t){super(...t),(0,r.default)(this,"store",""),(0,r.default)(this,"gunServer",[]),(0,r.default)(this,"persistent",!1)}}})),e.register("2O3kG",(function(e,n){t(e.exports,"Crypto",(function(){return s}));const s={url:"https://cdn.jsdelivr.net/npm/simple-crypto-js@2.5.0/dist/SimpleCrypto.min.js",crypt:null,check:function(){return!!window.SimpleCrypto},init:function(t){try{"string"==typeof t&&t.length>0?this.crypt=new SimpleCrypto(t):this.crypt=null}catch(t){console.warn("Crypto: ",t),this.crypt=null}},encode:function(t){return this.crypt?this.crypt.encrypt(btoa(encodeURIComponent(JSON.stringify(t)))):JSON.stringify(t)},decode:function(t){return this.crypt?JSON.parse(decodeURIComponent(atob(this.crypt.decrypt(t)))):JSON.parse(t)}}}));