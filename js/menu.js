let $menus = [
    
    {"main_menu":"LIVING","menu_list":[
         "러그매트",
         "수납",
         "행거",
         "목욕용품",
         "청소용품",
         "욕실용품"
        ]
    },
    {"main_menu":"KITCHEN","menu_list":[
         "식기",
         "조리",
         "수저세트"
        ]
    },
    {"main_menu":"DIGITAL","menu_list":[
        "핸드폰케이스",
         "태블릿케이스",
         "필름",
         "생활가전"
        ]
    },
    {"main_menu":"KIDS","menu_list":[
        ""
        ]
    },
    {"main_menu":"STUDY","menu_list":[
        ""
        ]
    },
    
    {"main_menu":"OFFICE","menu_list":[
        "달력",
        "용지"
        ]
    },
    {"main_menu":"BATH","menu_list":[
        "테이블",
        "선반"
        ]
    },
    {"main_menu":"FABRIC","menu_list":[
        "침구",
        "커튼",
        "쿠션",
        "방석"
        ]
    }
];
$(function(){
    //메뉴 출력 파트
    for(let i in $menus){
        $('#main_mnlist').append("<li>"+$menus[i]['main_menu']+"</li>");
        if($menus[i]['menu_list'].length>1){
          $('#main_mnlist>li').eq(i).append("<ul class='smenu_list'></ul>");
          $($menus[i]['menu_list']).each(function(k, ele){
              $('#main_mnlist>li').eq(i).children('ul').append("<li>"+ele+"</li>");
          });
        }
      }
      //슬라이딩 메뉴
      $('#main_mnlist>li').on({
        'mouseenter':function(){
          $(this).children('.smenu_list').stop().fadeIn();
          $('#main_mnlist>li').not(this).children('.smenu_list').stop().fadeOut();
        },'mouseleave':function(){
            $(this).children('.smenu_list').stop().fadeOut();
        }
      });

      //메인 로고
      $('#logo_span').click(function(){
         location.href="http://intern20.dothome.co.kr/portfolio/shop/";   
      });

      //로그인~마이페이지
      $('#left_top>li').click(function(){
        let $menu_no=$(this).attr('link');
        let $url_pages;
        switch($menu_no){
            case "0":   //로그인
            $url_pages="./login.html";
            break;
         
            case "1" : //회원가입
            $url_pages="./agree.html";
            break;

            case "2" : //로그아웃
            $url_pages="./logout.html";
            break;

            case "3" : //장바구니
            $url_pages="./cart.html";
            break;

            case "4" : //주문조회
           $url_pages="./order.html";
            break;

            case "5" : //마이페이지
            $url_pages="./mypage.html";
            break;
        }
         location.href=$url_pages;
      });
});
