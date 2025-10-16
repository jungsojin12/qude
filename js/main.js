window.onload = function(){ /*브라우저에서 문서가 모두 로드된 후 이 안의 코드를 실행하라는 의미입니다.
이미지, CSS 등 모든 요소가 로딩된 후 실행되므로, 요소가 아직 없는 상태에서 JS를 실행하는 문제를 방지할 수 있어요*/
    //01. gnb 애니메이션

    const menuOpen = document.querySelector('.gnb .menuOpen'); /*변하지 않는값.. const, 변하는 값은 let선언 */
    const menuBox = document.querySelector('.gnb .menuBox');

    menuOpen.addEventListener('click',()=> {
        menuBox.classList.toggle('on');
        /*
        classList.toggle('클래스명')는 해당 클래스가 없으면 추가,이미 있으면 제거

여기서는 .on을 추가/제거하면서 CSS에서 정의한 메뉴 애니메이션과 위치 변경이 발생합니다.

예:

초기 상태: top: -1000% → 메뉴 화면 밖

.on 클래스 추가: top: 10px → 메뉴 내려옴

.on 클래스 제거: 다시 top: -1000% → 메뉴 사라짐
        */
    })


   gsap.registerPlugin(ScrollTrigger); // gsap라이브러리의 스크롤 트리거를 등록
    
    //01.visual
    
   gsap.timeline({
    scrollTrigger:{
        trigger:'.visual',
        start:'100% 100%', 
        end:'100% 0%',
        scrub:1, //스크롤을 할때만 애니메이션 작동..(true는 애니메이션이 딱딱하게 진행 바로 진행되기때문. 숫자는 클수록 부드럽게됨.)
        //scrub은 scrilltrigger의 이벤트가 스크롤이 사용될때만 재생되도록 만들어주는 속성(안적으면 트리거시점 나오면 스크롤안해도 계속 애니 진행됨)
        //scrub은 true나 숫자로 값을 써줄 수 있는데, true같은 경우는 스크롤하면 애니 바로 진행되고, 바로 멈추고, 숫자는 그 시점을 따라잡는데 n초가 걸려서 애니가 더 부드러움(1~3)
       // markers:true
    }
   })
   .to('.logoWrap #j', {x:-150, y:250, rotate:20, ease:'none', duration:5},0) //to애니메이션.. 0은 바로 진행될수있도록..
   .to('.logoWrap #y', {x:-30, y:150, rotate:-10, ease:'none', duration:5},0) 
   .to('.logoWrap #o', {x:0, y:400, rotate:-10, ease:'none', duration:5},0) 
   .to('.logoWrap #u', {x:50, y:300, rotate:10, ease:'none', duration:5},0) 
   .to('.logoWrap #n', {x:100, y:100, rotate:-10, ease:'none', duration:5},0) 
   .to('.logoWrap #g', {x:50, y:450, rotate:20, ease:'none', duration:5},0) 



   //02. 공통적 .mainTextBox .title i
   gsap.utils.toArray('.mainTextBox .title i').forEach((selector) => {
    gsap.timeline({
        scrollTrigger: {
            trigger:selector,
            start:'100% 100%',
            end:'100% 100%',
            scrub:1,
        
        }
    })
       .fromTo(selector, {overflow:'hidden', y:150}, {y:0, ease:'none', duration:5}, 0)
   })


   //03. 공통적 .subText p animation
   gsap.utils.toArray('.subText p').forEach((selector) => {
    gsap.timeline({
        scrollTrigger: {
            trigger: selector,
            start:'100% 100%',
            end:'100% 100%',
            scrub:1,
            markers:true, 
        }
    })
    .fromTo(selector, {opacity:0, y:100}, {opacity:1, y:0, ease:'none', duration:5}, 0)
   })

   //04.. con1 textAni 텍스트체인지 gsap애니메이션
   let textAniList = document.querySelectorAll('.con1 .textAni li')
      let textAni = gsap.timeline({repeat:-1 });

      for(let i=0; i<textAniList.length; i++){
        textAni.to(textAniList[i], 0.8, {opacity:1, repeat:1, delay:0, x:0, yoyo:true, ease:"power4.out"})
      }
        textAni.play();


        //05. con4 listBox의 스크롤트리거애니메이션
        gsap.utils.toArray('.con4 .listBox .box').forEach((selector) => {
            gsap.timeline({
                scrollTrigger:{
                trigger:selector,
                start:'0% 20%',
                end:'0% 0%',
                scrub:1,
    
                }
            })
            .to (selector, {transform:'rotateX(-10deg) scale(0.9)', transformOrigin:'top', filter:'brightness(0.3)'},0)
        })

        //06. con3 listBox 카드애니메이션
        gsap.utils.toArray('.con3 .listBox li').forEach((selector, t) => {
            ScrollTrigger.create({
                trigger:selector,
                start:'30% 50%',
                onEnter: ()=> {
                    gsap.set(selector, {
                        rotationX:'-65deg',
                        z:'-500px',
                        opacity:0,
                    }),
                    gsap.to(selector, {
                        rotationX:0,
                        z:0,
                        opacity:1,
                        delay: t % 3 * .05 // % 3으로 나눈 나머지 값
                    })
                },
                markers:true
            })
        })

        //07. con5 listBox li호버시 이미지보이는 애니메이션
        let listBox = document.querySelectorAll('.con5 .listBox li');
        let imgBox = document.querySelector('.con5 .imgBox');
        let img = document.querySelector('.con5 .imgBox img');

        for(let i =0; i < listBox.length; i++) {
            listBox[i].addEventListener('mouseover',()=>{
                img.src= `images/img${i}.jpg`; //벡틱사용
                gsap.set(imgBox, {scale:0, opacity:0, duration:.3}),
                gsap.to(imgBox, {scale:1, opacity:1, duration:.3})
            })
            listBox[i].addEventListener('mousemove', (e) => {
                let imgBoxX = e.pageX + 20;
                let imgBoxY = e.pageY - 20;
                imgBox.style.left= imgBoxX + 'px';
                imgBox.style.top = imgBoxY +'px';
            })
            listBox[i].addEventListener('mouseout', () => {
                gsap.to(imgBox, {scale:0, opacity:0, duration:.3})
            })
        }

        gsap.timeline({
            scrollTrigger: {
                trigger : '.con5',
                start:'0% 100%',
                end:'100% 0%',
                toggleClass:{targets:'.wrap', className:'on'}
            }
        })

        //08. footer영역
        gsap.timeline({
            scrollTrigger: {
                trigger:'footer',
                start:'0% 100%',
                end:'100% 0%',
                scrub:1,
                markers:true
            }
        })
         .to('.logoWrap', {top:'20%', ease:'none', duration:5}, 0)
}