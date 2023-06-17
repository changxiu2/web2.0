// 入口文件
import jQuery from "jquery";
import _ from "lodash";
import {a} from "@/script/app";
import "@/style/index.css";
import "@/index.css"


console.log(a);
console.log(a);
console.log(a);

jQuery(()=>{
    console.log(123);
})

jQuery.ajax({
    url:"http://127.0.0.1:3000/api/abc",
})
jQuery.ajax({
    url:"http://127.0.0.1:3000/api1/abc1",
})

console.log(_);

console.log("process.env.NODE_ENV:",process.env.NODE_ENV);