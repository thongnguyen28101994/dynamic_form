(this.webpackJsonpthanhtra=this.webpackJsonpthanhtra||[]).push([[0],{166:function(e,t,n){e.exports=n.p+"static/media/logo_so.7e31e704.png"},193:function(e,t,n){e.exports=n(392)},198:function(e,t,n){},392:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),c=n.n(o),u=(n(198),n(48)),i=n(396),l=(n(134),n(58)),s=(n(135),n(35)),m=(n(394),n(187)),p=(n(49),n(22)),f=(n(73),n(31)),h=n(17),g=n.n(h),d=n(27),y=(n(74),n(26)),D=n(32),v=(n(85),n(29)),E=n(72),T=n.n(E),b=T.a.create({baseURL:"https://wapi.hcm.edu.vn/ChuyenTruongMoRong",headers:{"content-type":"application/json"}});b.interceptors.request.use(function(){var e=Object(d.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.headers={Token:sessionStorage.getItem("token")},e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),b.interceptors.response.use((function(e){return e&&e.data?e.data:e}),(function(e){throw e})),T.a.create({baseURL:"https://wapi.hcm.edu.vn/ChuyenTruongMoRong",headers:{"content-type":"multipart/form-data"}}).interceptors.request.use(function(){var e=Object(d.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.headers={Token:sessionStorage.getItem("token")},e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());var w=T.a.create({baseURL:"https://apigateway.hcm.edu.vn",headers:{"content-type":"application/json"}});w.customRequest=function(){},w.customResponse=function(e){},w.interceptors.request.use(function(){var e=Object(d.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w.customRequest(),t.headers={Token:sessionStorage.getItem("token")},e.abrupt("return",t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),w.interceptors.response.use((function(e){return e&&e.data?(w.customResponse(e.data),e.data):e}),(function(e){throw setTimeout((function(){f.a.error("M\xe1y ch\u1ee7 \u0111ang b\u1eadn, Vui l\xf2ng quay l\u1ea1i sau!")}),300),w.customResponse(),e}));var I=T.a.create({baseURL:"https://wapi.hcm.edu.vn/ChuyenTruongMoRong",headers:{"content-type":"application/json"}});I.interceptors.request.use(function(){var e=Object(d.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.headers={Token:"%8hKj909*nm"},e.abrupt("return",t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),I.interceptors.response.use((function(e){return e&&e.data?e.data:e}),(function(e){throw e}));var O=T.a.create({baseURL:"https://apigateway.hcm.edu.vn/WAPINetCore",headers:{"content-type":"application/json"}});O.interceptors.request.use(function(){var e=Object(d.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.url.includes("http")&&(t.baseURL=""),t.headers={Token:sessionStorage.getItem("token")},e.abrupt("return",t);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),O.interceptors.response.use((function(e){return e&&e.data?e.data:e}),(function(e){throw b.customResponse(),e}));var k=b,j={getSession:function(){return k.get("/wapiquanly/getSessionData")},getDonViHanhChinh:function(){return k.get("/wapiquanly/getDonviHanhChinh")},getTonGiao:function(){return k.get("/wapiquanly/getTonGiao")},getDanToc:function(){return k.get("/wapiquanly/getDanToc")},getTinh:function(){return k.get("/wapiquanly/getTinh")},getHuyen:function(e){var t="/wapiquanly/getHuyen/".concat(e);return k.get(t)},getXa:function(e){var t="/wapiquanly/getXa/".concat(e);return k.get(t)},getLKTat:function(){return k.get("/wapiquanly/getDMLoaiKhuyetTat")},getDTCSach:function(){return k.get("/wapiquanly/getDMDoiTuongChinhSach")},getLopById:function(e){var t="/apiChuyenTruong/getLopbyID/".concat(e);return k.get(t)},getDotDiemByYear:function(e){var t="wapiquanly/getDMDotDiembyNamHoc/".concat(e);return k.get(t)},getDonVi:function(){return k.get("wapiquanly/getDonVi")},getPhongGiaoDuc:function(){return k.get("/wapiquanly/getPhongGiaoDuc")},loginsso:function(e){return k.post("wapiquanly/loginsso",e)},getKyThiByNamHocId:function(e){var t="apiKyThi/getKyThi/".concat(e);return k.get(t)},getMonThiByKyThiId:function(e){var t="apiKyThi/getMonThi/".concat(e);return k.get(t)},getThiSinhDuThiByKyThiId:function(e){var t="apiKyThi/getThiSinhDuThi/".concat(e);return k.get(t)},getThiSinhDuThiByKyThiIdAndMonThiId:function(e,t){var n="apiKyThi/getThiSinhDuThi/".concat(e,"/").concat(t);return k.get(n)},postDangKyThiSinhKyThi:function(e){return k.post("apiKyThi/postDangKyThiSinhKyThi",e)},postHuyDangKyThiSinhKyThi:function(e){return k.post("apiKyThi/postHuyDangKyThiSinhKyThi",e)},getDMLoaiBienDong:function(){return k.get("wapiquanly/getDMLoaiBienDong")},getDMChucVu:function(){return k.get("apiGiaoVien/getDMChucVu")},getDMCongViec:function(){return k.get("apiGiaoVien/getDMCongViec")},getDMLoaiHopDong:function(){return k.get("apiGiaoVien/getDMLoaiHopDong")},getDMTrinhDoChuyenMon:function(){return k.get("apiGiaoVien/getDMTrinhDoChuyenMon")},getDMXepLoaiDatChuan:function(){return k.get("apiGiaoVien/getDMXepLoaiDatChuan")},getDMQuocTich:function(){return k.get("apiGiaoVien/getDMQuocTich")},getDMMonHoc:function(e){var t="apiDiemSo/getDMMonHoc/".concat(e);return k.get(t)},getDSBienDong:function(e){var t="wapiquanly/getDSBienDong/".concat(e);return k.get(t)},postXoaBienDong:function(e){var t="wapiquanly/deleteBienDong/".concat(e);return k.get(t)}},C=n(166),N=n.n(C),S=v.a.Option,F=v.a.OptGroup,M=function(){var e=y.a.useForm(),t=Object(D.a)(e,1)[0],n=Object(a.useState)([]),o=Object(D.a)(n,2),c=o[0],u=o[1],i=Object(a.useState)([]),h=Object(D.a)(i,2),E=h[0],T=h[1],b=function(){var e=Object(d.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.getDonVi().then((function(e){return u(e.Result)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(d.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j.getPhongGiaoDuc().then((function(e){return T(e.Result)}));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){b(),w()}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.a,{style:{backgroundColor:"#9d9d9d",height:"100vh"}},r.a.createElement(s.a,{xs:{span:24},lg:{span:8,offset:8},style:{paddingTop:200}},r.a.createElement(m.a,{bordered:!1},r.a.createElement("span",{style:{width:"100%",textAlign:"center",display:"block",paddingBottom:10}},r.a.createElement("img",{src:N.a,alt:"logoso"})),r.a.createElement(y.a,{name:"control-hooks",onFinish:function(){t.validateFields().then(Object(d.a)(g.a.mark((function e(){var n,a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.getFieldValue("schoolID"),a={SysUserName:"QUANLY",SysPassword:"asdf1324!$@",Param1:n,Param2:"param2",Param3:"param3",Returnuri:"https://dulieu.hcm.edu.vn/loginsso",isHocSinh:"false"},e.next=4,j.loginsso(a).then((function(e){200===e.StatusCode?window.location.href=e.Result:f.a.error("C\xf3 l\u1ed7i x\u1ea3y ra!")}));case 4:case"end":return e.stop()}}),e)}))))},form:t},r.a.createElement(y.a.Item,{name:"schoolID",label:"Tr\u01b0\u1eddng",rules:[{required:!0,message:"Vui l\xf2ng ch\u1ecdn tr\u01b0\u1eddng!"}]},r.a.createElement(v.a,{placeholder:"Vui l\xf2ng ch\u1ecdn tr\u01b0\u1eddng",onChange:function(e){return t.setFieldsValue(console.log(e))},allowClear:!0,showSearch:!0,optionFilterProp:"children"},E.map((function(e){return r.a.createElement(F,{label:e.TenPGD,key:e.PGDID},c.filter((function(t){return t.PGDID===e.PGDID})).map((function(e){return r.a.createElement(S,{key:e.SchoolID,value:e.SchoolID},e.TenTruong)})))})))),r.a.createElement("p",{style:{textAlign:"center"}},r.a.createElement(p.a,{htmlType:"submit",type:"primary"},"TI\u1ebeP T\u1ee4C")))))))},x=function(){var e=Object(i.e)(),t=Object(i.d)();return sessionStorage.setItem("token",decodeURIComponent(e.search.substring(7))),Object(a.useEffect)((function(){j.getSession().then(function(){var e=Object(d.a)(g.a.mark((function e(n){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:200===n.StatusCode&&(sessionStorage.setItem("session",JSON.stringify(n.Result[0])),console.log(n),"Trg"===n.Result[0].AccountType&&t.push("/truong"));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}),[t]),r.a.createElement(r.a.Fragment,null)},V=(n(163),n(111)),K=n(113),q=n(397),R=(n(162),n(59)),L=(n(164),n(108)),B=(n(124),n(51)),P=function(e,t,n,a){var r=Number.parseInt(e.target.value),o=t.getFieldsValue();!Number(r)&&r.length>0&&(f.a.warning("Ch\u1ec9 nh\u1eadp s\u1ed1 trong c\u1ed9t n\xe0y"),o.users[n][a]="",t.setFieldsValue(o))},G=r.a.memo((function(e){var t=Object.assign({},e);return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a.Item,{label:t.columnName,key:t.columnID,name:[t.name,t.columnID+""],valuePropName:"checkbox"===t.inputType?"checked":"value",rules:[{required:!t.allowNull,message:"Missing ".concat(t.columnName)}]},function(e){var t=v.a.Option,n=Object(a.useState)([]),o=Object(D.a)(n,2);o[0],o[1];switch(e.inputType){case"select":var c=JSON.parse(e.inputValue);return r.a.createElement(v.a,{showSearch:!0,placeholder:"".concat(e.columnName)},c.map((function(e){return r.a.createElement(t,{key:e,value:e},e)})));case"checkbox":return r.a.createElement(B.a,null);case"date":return r.a.createElement(L.a,{format:"DD/MM/YYYY"});case"number":case"tel":return r.a.createElement(R.a,{placeholder:e.columnName,onChange:function(t){return P(t,e.formValue,e.fieldKey,e.columnID)}});default:return r.a.createElement(R.a,{placeholder:e.columnName})}}(t)))}));function H(){var e=y.a.useForm(),t=Object(D.a)(e,1)[0],n=(y.a.Column,Object(a.useState)([])),o=Object(D.a)(n,2),c=o[0],u=o[1];Object(a.useEffect)((function(){i()}),[]);var i=function(){u([{columnID:1,columnName:"Test1",name:"test1"},{columnID:2,columnName:"Test2",name:"test2"},{columnID:3,columnName:"Test3",name:"test3"},{columnID:4,columnName:"Test4",name:"test4"},{columnID:5,columnName:"Test5",name:"test5"}])};return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Default Form"),r.a.createElement(V.a,{className:"site-page-header-responsive",title:"Form B\xe1o C\xe1o D\u1ea1ng C\u01a1 B\u1ea3n"},r.a.createElement(y.a,{name:"dynamic_form_nest_item",autoComplete:"off",form:t},c.map((function(e){var n=e.columnID,a=e.columnName,o=Object(K.a)(e,["columnID","columnName"]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(G,Object.assign({formValue:t,columnID:n,columnName:a},o)))})),r.a.createElement(y.a.Item,null,r.a.createElement(p.a,{type:"primary",htmlType:"submit",style:{marginRight:"5%"},onClick:function(){f.a.success("\u0110\xe3 L\u01b0u")}},r.a.createElement(q.a,null)," L\u01b0u")))))}n(393);var U=n(186),Y=(n(92),n(55)),A=(n(395),n(188)),_=n(189),X=n(398),J=function(e,t,n,a){var r=Number.parseInt(e.target.value),o=t.getFieldsValue();!Number(r)&&r.length>0&&(f.a.warning("Ch\u1ec9 nh\u1eadp s\u1ed1 trong c\u1ed9t n\xe0y"),o.users[n][a]="",t.setFieldsValue(o))},W=r.a.memo((function(e){var t=Object.assign({},e);return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a.Item,{key:t.columnID+t.fieldKey,name:[t.name,t.columnID+""],valuePropName:"checkbox"===t.inputType?"checked":"value",fieldKey:[t.fieldKey,t.columnID],rules:[{required:!t.allowNull,message:"Missing ".concat(t.columnName)}]},function(e){var t=v.a.Option,n=Object(a.useState)([]),o=Object(D.a)(n,2),c=o[0],u=o[1],i=function(e){u(e)};Object(a.useEffect)((function(){var t=e.formValue.getFieldsValue().users[e.fieldKey][e.columnID];i(t)}),[]);var l={name:"file",action:"https://apigateway.hcm.edu.vn/WAPINetCore/DynamicForm/UploadFile/"+e.formValue.getFieldsValue().users[e.fieldKey].RowID+"/"+e.columnID,headers:{token:sessionStorage.getItem("token")},onChange:function(e){var t=Object(_.a)(e.fileList);t=(t=t.slice(-1)).map((function(e){return e.response&&(e.url=e.response.url),e})),i(t),e.file.status,"done"===e.file.status?f.a.success("".concat(e.file.name," file uploaded successfully")):"error"===e.file.status&&f.a.error("".concat(e.file.name," file upload failed."))}};switch(e.inputType){case"select":var s=JSON.parse(e.inputValue);return r.a.createElement(v.a,{showSearch:!0,placeholder:"".concat(e.columnName)},s.map((function(e){return r.a.createElement(t,{key:e,value:e},e)})));case"checkbox":return r.a.createElement(B.a,null);case"date":return r.a.createElement(L.a,{format:"DD/MM/YYYY"});case"number":return r.a.createElement(R.a,{placeholder:e.columnName,onChange:function(t){return J(t,e.formValue,e.fieldKey,e.columnID)}});case"file":return r.a.createElement(A.a,Object.assign({},l,{fileList:c,maxCount:1,beforeUpload:function(e){if(!("application/pdf"===e.type||"application/vnd.openxmlformats-officedocument.wordprocessingml.document"===e.type||"application/msword"===e.type))return f.a.error("You can only upload PDF or Word file!"),!1}}),r.a.createElement(p.a,{icon:r.a.createElement(X.a,null)},"Click to Upload"));case"tel":return r.a.createElement(R.a,{placeholder:e.columnName,onChange:function(t){return J(t,e.formValue,e.fieldKey,e.columnID)}});default:return r.a.createElement(R.a,{placeholder:e.columnName})}}(t)))})),Q=n(399);function $(){var e=y.a.useForm(),t=Object(D.a)(e,1)[0],n=y.a.Column,o=Object(a.useState)([]),c=Object(D.a)(o,2),u=c[0],i=c[1],l=function(){var e=Object(d.a)(g.a.mark((function e(t,n){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n();case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),s=function(){var e=Object(d.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function(){var e=Object(d.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=Object(d.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();Object(a.useEffect)((function(){h()}),[]);var h=function(){i([{columnID:1,columnName:"Test1"},{columnID:2,columnName:"Test2"},{columnID:3,columnName:"Test3"},{columnID:4,columnName:"Test4"},{columnID:5,columnName:"Test5"}])};return r.a.createElement(r.a.Fragment,null,r.a.createElement(V.a,{className:"site-page-header-responsive",title:"Form B\xe1o C\xe1o D\u1ea1ng B\u1ea3ng"},u.length>0?r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a,{name:"dynamic_form_nest_item",onFinish:f,autoComplete:"off",form:t},r.a.createElement(y.a.List,{name:"users"},(function(e,a){var o=a.add;a.remove;return r.a.createElement(r.a.Fragment,null,r.a.createElement(U.a,{dataSource:e,pagination:!1,bordered:!0,scroll:{x:1500,y:650},title:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.a.Item,null,r.a.createElement(p.a,{type:"dashed",onClick:function(){l(s,o)},block:!0,icon:r.a.createElement(Q.a,null)},"Th\xeam D\xf2ng")))}},u.map((function(e){var a=e.columnID,o=e.columnName,c=Object(K.a)(e,["columnID","columnName"]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(n,{dataIndex:a,title:r.a.createElement(Y.a,{title:c.colDescription},o),width:c.width,render:function(e,n,u){return r.a.createElement(W,Object.assign({name:u,formValue:t,fieldKey:u,columnID:a,columnName:o},c))}}))})),r.a.createElement(n,{dataIndex:"ThaoTac",title:"Thao T\xe1c",fixed:"right",width:200,render:function(e,t,n){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{type:"primary",htmlType:"submit",style:{marginRight:"5%"},onClick:function(){}},r.a.createElement(q.a,null)," L\u01b0u"),r.a.createElement(p.a,{danger:!0,onClick:function(){var e=u.filter((function(e){return"file"===e.inputType}));e.length>0&&e.forEach((function(e){})),m()}},r.a.createElement(q.a,null)," X\xf3a"))}})))})))):null))}function z(e){var t=e.id;return r.a.createElement(r.a.Fragment,null,2===t?r.a.createElement(H,null):r.a.createElement($,null))}function Z(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"DynamicForm"),r.a.createElement(z,{id:1}),r.a.createElement(z,{id:2}))}var ee=Object(u.a)(),te=function(){return r.a.createElement(i.b,{history:ee},r.a.createElement(i.c,null,r.a.createElement(i.a,{exact:!0,path:"/"},r.a.createElement(M,null)),r.a.createElement(i.a,{exact:!0,path:"/loginsso/"},r.a.createElement(x,null)),r.a.createElement(i.a,{path:"/truong"},r.a.createElement(Z,null))))};n(391),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(te,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[193,1,2]]]);
//# sourceMappingURL=main.5e5aaebc.chunk.js.map