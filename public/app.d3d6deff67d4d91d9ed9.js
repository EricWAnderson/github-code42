webpackJsonp([3],{106:function(t,e){},109:function(t,e,n){function r(t){n(106)}var i=n(24)(n(67),n(111),r,null,null);t.exports=i.exports},110:function(t,e,n){var r=n(24)(null,n(112),null,null,null);t.exports=r.exports},111:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("v-navigation-drawer",{attrs:{permanent:"","mini-variant":t.miniVariant,clipped:!t.clipped,value:!1},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",t._l(t.items,function(e,r){return n("v-list-tile",{key:r,attrs:{ripple:"",to:e.to}},[n("v-list-tile-action",[n("v-avatar",[n("img",{attrs:{src:e.avatar,alt:"avatar"}})])],1),n("v-list-tile-content",[n("v-list-tile-title",{domProps:{textContent:t._s(e.name)}})],1)],1)}))],1),n("v-toolbar",{staticClass:"orange darken-4",attrs:{fixed:"",dark:""}},[n("v-btn",{attrs:{icon:"",light:""},nativeOn:{click:function(e){e.stopPropagation(),t.miniVariant=!t.miniVariant}}},[n("v-icon",{domProps:{innerHTML:t._s(t.miniVariant?"chevron_right":"chevron_left")}})],1),n("v-toolbar-title",{domProps:{textContent:t._s(t.title)}})],1),n("main",[n("v-container",{attrs:{fluid:""}},[n("v-slide-y-transition",{attrs:{mode:"out-in"}},[n("router-view")],1)],1)],1),n("v-footer",{attrs:{fixed:t.fixed}},[n("span",[t._v("© 2017")])])],1)},staticRenderFns:[]}},112:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("h1",[t._v("Vuetify")])},staticRenderFns:[]}},119:function(t,e,n){function r(t){var e=i[t];return e?n.e(e[1]).then(function(){return n(e[0])}):Promise.reject(new Error("Cannot find module '"+t+"'."))}var i={"./HomeView.vue":[121,1],"./UserView.vue":[122,0]};r.keys=function(){return Object.keys(i)},t.exports=r,r.id=119},42:function(t,e){t.exports={"/":{title:"Code42 on Github",description:"See what Code42 has been up to in public repositories",keywords:"programming, code"},"/*":{title:"Code42 member on Github",description:"See what Code42 has been up to in public repositories",keywords:"programming, code"}}},43:function(t,e,n){"use strict";function r(t){var e=n.i(m.a)(),r=n.i(p.a)();return n.i(v.sync)(e,r),{app:new s.a({router:r,store:e,ssrContext:t,render:function(t){return t(c.a)}}),router:r,store:e}}e.a=r;var i=n(70),o=n.n(i),a=n(8),s=n.n(a),u=n(109),c=n.n(u),l=n(115),d=n.n(l),f=n(65),m=n(69),p=n(68),v=n(116);n.n(v);s.a.use(d.a),o()(f.a).forEach(function(t){s.a.component(t,f.a[t])})},64:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(44),i=n.n(r),o=n(8),a=(n.n(o),n(45)),s=(n.n(a),n(43)),u=n.i(s.a)(),c=u.app,l=u.router,d=u.store;window.__INITIAL_STATE__&&d.replaceState(window.__INITIAL_STATE__),l.onReady(function(){l.beforeResolve(function(t,e,n){var r=l.getMatchedComponents(t),o=l.getMatchedComponents(e),a=!1,s=r.filter(function(t,e){return a||(a=o[e]!==t)});if(!s.length)return n();i.a.all(s.map(function(e){if(e.asyncData)return e.asyncData({store:d,route:t})})).then(function(){n()}).catch(n)}),c.$mount("#app")})},65:function(t,e,n){"use strict";var r=n(110),i=n.n(r);e.a={Vuetify:i.a}},66:function(t,e,n){"use strict";var r=n(42);e.a={watch:{$route:function(){this.setMeta()}},created:function(){return},mounted:function(){this.$vuetify.load(this.setMeta)},methods:{setMeta:function(){if("undefined"!=typeof document){var t=r[this.$route.path]||{};document.title=t.title,document.querySelector('meta[name="description"]').setAttribute("content",t.description),document.querySelector('meta[name="keywords"]').setAttribute("content",t.keywords)}}}}},67:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(66),i=n(46),o=n.n(i);e.default={mixins:[r.a],data:function(){return{clipped:!1,drawer:!1,fixed:!1,items:[],miniVariant:!1,right:!0,rightDrawer:!1,title:"Code42 on Github",loadingMembers:!1}},created:function(){this.getMembers()},methods:{getMembers:function(){var t=this;this.loadingMembers=!0,o()({method:"get",url:"https://api.github.com/orgs/code42/members"}).then(function(e){for(var n=[],r=0;r<e.data.length;r+=1)n.push({login:e.data[r].login,avatar:e.data[r].avatar_url,name:"",to:"/"+e.data[r].login});t.items=n,t.getNames()}).catch(function(t){console.log(t.message)})},getNames:function(){for(var t=this,e=0;e<this.items.length;e+=1)!function(e){o()({method:"get",url:"https://api.github.com/users/"+t.items[e].login}).then(function(n){t.items[e].name=n.data.name,t.loadingMembers=!1}).catch(function(t){console.log(t.message)})}(e)}}}},68:function(t,e,n){"use strict";(function(t){function r(t,e){return{path:t,meta:u[t],component:function(t){return n(119)("./"+e+"View.vue").then(t)}}}function i(){var e=new s.a({base:t,mode:"history",scrollBehavior:function(){return{y:0}},routes:[r("/","Home"),r("/:login","User"),{path:"*",redirect:"/"}]});return e.beforeEach(function(t,e,n){"undefined"!=typeof ga&&(ga("set","page",t.path),ga("send","pageview")),n()}),e}e.a=i;var o=n(8),a=n.n(o),s=n(113),u=n(42);a.a.use(s.a)}).call(e,"/")},69:function(t,e,n){"use strict";function r(){return new a.a.Store({state:{},actions:{},mutations:{},getters:{}})}e.a=r;var i=n(8),o=n.n(i),a=n(117);o.a.use(a.a)}},[64]);