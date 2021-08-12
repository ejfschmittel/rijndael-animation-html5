import { CSSPlugin } from 'gsap/CSSPlugin'
import {MotionPathPlugin} from 'gsap/MotionPathPlugin'
import {gsap} from "gsap"

import RijndaelAnimation from "./RijndaelAnimation";
import "./styles/main.scss"

window.addEventListener("load",function(){
    document.body.style.visibility='visible';
    gsap.registerPlugin(CSSPlugin)
    gsap.registerPlugin(MotionPathPlugin)
    new RijndaelAnimation();
},false);

