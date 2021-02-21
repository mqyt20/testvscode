/* ====Q&A시작(qalist)===*/
$(function(){
    //qalist 출력  
    var $sdate=window.location.search.split('s_date=')[1];
    var $jsonfile;
    if($sdate==undefined){
        $jsonfile='./qalist.json';
    }else{
        $jsonfile='./qalist_search.json';
    }
   $.ajax({
        url: $jsonfile,
        cache:false,
        type:'get',
        dataType:'json',
        success:function($data){
            $.fn.qaJsonList($data);
        },error:function(){
            console.log('데이터 접근 오류!');
        }
    });

    $.fn.qaJsonList=function($d){
        var $list;
        var $total=$d.q_list[0].length;
        var $pageEA=7;
        var $pageNum=Math.ceil($total/$pageEA);
        var $page=location.search.split('page=')[1];
        var $peroidNo=location.search.split('&lion=')[1];
  
        if($peroidNo != undefined){   //조회기간 선택 항목 클래스 적용
            $peroidNo=$peroidNo.substr(0,1);
            $('#qa_period_ul>li').removeClass('lion');
            $('#qa_period_ul>li').eq($peroidNo).addClass('lion');
        }
        if(location.search.split('s_date=')[1] !=undefined){   //조회 기간 표시
            var $sdate=location.search.split('s_date=')[1].substr(0,10);
            var $edate=location.search.split('e_date=')[1].substr(0,10);

            $('#boardDate1').val($sdate);
            $('#boardDate2').val($edate)
        }
        
       if($page==undefined){
           $page=1;
       }
  
       if($dateNth>0){
        $('#qa_period_ul').find('li').removeClass('lion');
        $('#qa_period_ul').find('li').eq($dateNth).addClass('lion');
       }
        if($d.q_list[0]==""){
            $list='<ul class="qalist_ul">\
            <li style="width:100%;">등록된 게시물이 없습니다.</li></ul>'
            $('#qalist_area').append($list);
        }
        $($d.q_list[0]).each(function(i,ele){
          if(i<$page*$pageEA && i>=($page-1)*$pageEA){
            if(ele['qa_check']=="Y"){
                ele['qa_subject']='<img src="./images/icon_secret.png" class="lock_img">'+ele['qa_subject'];
            }
            ele['qa_aws']=="N"?(ele['qa_aws']="답변대기"):(ele['qa_aws']="답변완료");
               $list="<ul class='qalist_ul'  idx="+ele['qidx']+">\
                   <li>"+ele['qa_indate'].substr(0,10)+"</li>\
                   <li>"+ele['qa_part']+"</li>\
                   <li>"+ele['qa_subject']+"</li>\
                   <li>"+ele['qa_writer']+"</li>\
                   <li>"+ele['qa_aws']+"</li></ul>";
   
           $('#qalist_area').append($list);
          }
        });
       //페이지 번호  
        for(let i=0; i<$pageNum; i++){
            $('#qa_pagenum_ul').append("<li>"+(i+1)+"</li> ");
        }
        $('#qa_pagenum_ul').on('click', 'li', function(){
            if(location.search.split('s_date=')[1]==undefined){
                location.href="./qa.html?page="+$(this).text();
            }else{
                var $pageSearch=location.search.split('&page=')[0];
                location.href="./qa.html"+$pageSearch
                             +"&page="+$(this).text();
            }
        });

        $('#qa_pagenum_ul').find('li').css({'background-color':'#ccc','color':'black'});
        $('#qa_pagenum_ul').find('li').eq($page-1).css({'background-color':'#65676e','color':'white'});
        
    }
    $('#boardDate1').datepicker();
    $('#boardDate2').datepicker();

    $.fn.setInputDate=function($period){
      var $today=new Date();
      var $msec=$today.getTime();
      var $theDay=new Date($msec-(24*60*60*1000*$period));
      var $theYear=$theDay.getFullYear();
      var $theMonth=$theDay.getMonth()+1;
      var $theDate=$theDay.getDate();
      if($theMonth<10){
          $theMonth="0" + $theMonth;
      }
      if($theDate<10){
          $theDate="0"+ $theDate;
      }
      var $finalDay= $theYear+"-"+$theMonth+"-"+$theDate;
      return $finalDay;
    }
   // 오늘 날짜 출력
    $('#boardDate1').val($.fn.setInputDate(0));
    $('#boardDate2').val($.fn.setInputDate(0));
    
    //기간 선택 
    let $dateNth;
    $('#qa_period_ul>li').click(function(){
        $(this).addClass('lion');
        $('#qa_period_ul>li').not(this).removeClass('lion');
        
        //날짜 검토 조건
        $dateNth=$(this).index();
        var $endDate= $.fn.setInputDate(0);
        $('#boardDate2').val($.fn.setInputDate(0));
        if($dateNth<6){
          if($dateNth==0){
              $('#boardDate1').val($.fn.setInputDate(0));
          }else{
             var $days=$('#qa_period_ul>li').eq($dateNth).attr('data');
             $('#boardDate1').val($.fn.setInputDate($days));
          } 
        }else{
          $('#boardDate1').val("");
          $('#boardDate2').val("");
        }

    });

  //다른 날짜를 선택한 경우 선택안함 처리
  $('#boardDate1, #boardDate2').change(function(){
      var $index=$('.lion').index();
      var $days=$('#qa_period_ul>li').eq($index).attr('data');
      if($('#boardDate1').val()!=$.fn.setInputDate($days)){
          $('#qa_period_ul>li').removeClass('lion');
          $('#qa_period_ul>li').eq(6).addClass('lion');
      }else if( $('#boardDate2').val()!=$.fn.setInputDate(0)){
          $('#qa_period_ul>li').removeClass('lion');
          $('#qa_period_ul>li').eq(6).addClass('lion');
      }
    });

   
   
    $('#qaDateSearch').click(function(){
      var $startDate= $('#boardDate1').val().replace(/-/g,"");
      var $endDate= $('#boardDate2').val().replace(/-/g,"");
         if( $startDate=="" || $endDate==""){
             alert('조회 기간을 선택해 주시기 바랍니다.');
          }else if($endDate<$startDate){
            alert('종료일이 시작일보다 빠릅니다.');
            return false;
        }else{
            if($dateNth==undefined){
                $dateNth=0;
            }
            var $s_date=$('#boardDate1').val();
            var $e_date=$('#boardDate2').val();
            location.href="./qa.html?s_date="+$s_date+"&e_date="+$e_date+"&lion="+$dateNth;
        }
    });
   //1:1문의하기 페이지로 이동
    $('#qaWriteBtn').click(function(){
      location.href="./qawrite.html";
    });

    //문의 내용 제목 클릭 시 상세 페이지로 이동qaview.html
    $('#qalist_area').on('click','.qalist_ul>li:nth-of-type(3)',function(){
        location.href="./qaview.html?idx="+$(this).parent('.qalist_ul').attr('idx');
    });  

  });
/* =========Q&A종료=======*/

/*=====1:1문의하기(write)====*/
function autoCode(){
    document.getElementById('codeImg')
    .setAttribute('src',"code.php?waste="+Math.random());
 }
 function qaUpload(){
     var editor= CKEDITOR.instances['qatext'];
     if(qa.qa_subject.value==""){
         alert('제목을 입력하세요.');
         qa.qa_subject.focus();
         return false;
     }else if(qa.qa_product.value==""){
         alert('상품 선택을 해주세요.');
         qa.qa_product.focus();
         return false;
     }else if(qa.qa_part.value==""){
         alert('질문 카테고리를 선택해주세요');
         qa.qa_part.focus();
         return false;
     }else if(qa.qa_writer.value==""){
         alert('작성자를 입력하세요.');
         qa.qa_writer.focus();
         return false;
     }else if(qa.qa_passwd.value==""){
         alert('비밀번호를 입력하세요.');
         qa.qa_passwd.focus();
         return false;
     }else if(editor.getData()==""){
         alert('본문에 문의하실 내용을 입력하세요.');
         editor.focus();
         return false;
     }else if(qa.qa_code.value=="" || qa.qa_code.value.length!=6){
         alert('자동 등록 방지 확인을 해주세요.');
         qa.qa_code.focus();
         return false;
     }else{
         qa. method="post";
         qa.action="qawriteok.php";
         qa.submit();
     }
 }
 $(function(){
     var $ftime;
     $.fn.setFile=function(){
         $ftime = setInterval(function(){
            $('#qa_wf1').text($('#qa_file1').val());
            $('#qa_wf2').text($('#qa_file2').val());
          },500);
     }

     //파일 추가 업로드 
     $('#fileAddBtn').one('click',function(){
         $('#file_add_title_li').css('height','100px');
         $('#add_file_li').css('display','block');
     });

     //블랙 스크린
     $('#qa_product_btn').click(function(){
         $('#qa_shadow').css('display','block');
         $('#product_list').css('display','block');
     });

     $('#product_XBtn').click(function(){
         $('#qa_shadow').css('display','none');
         $('#product_list').css('display','none');
     });
  
     $.fn.setFile();


     /*=========1:1문의 하기 상품 검색 팝업창=========*/
      $.ajax({
        url:'./product/best_pd.json',
        cache:false,
        type:'get',
        dataType:'json',
        success:function(data){
            $.fn.loadProduct(data);
        },error:function(){
            console.log('데이터 접근 오류!');
        }
    });//상품리스트 출력
    $.fn.loadProduct=function(list){

       $(list.best_product).each(function(i, ele){
           $('#list_view').append("<ol class='list_viewol2'><li>\
               <input type='radio' name='pno' id='pno"+i+"' value="+i+"></li></ol>");
           $(Object.keys(ele)).each(function(k,item){
               if(k<=1){
                   if(k==0){
                       $('#list_view>ol').eq(i+1).attr('pdata',ele[item]);
                       ele[item]="<li><label for='pno"+i+"'>\
                           <img class='pimgs' src='"+ele['product_img']+"'>"+ele[item]+"</label></li>";
                   }else if(k==1){
                       ele[item]="<li>"+Number(ele[item]).toLocaleString()+"원</li>";
                   }
                   $('.list_viewol2').eq(i).append(ele[item]);
               }
           }); 
       }); 
      //팝업 상품 코드 및 상품명 검색 버튼
       $('#p_btn').click(function(){

       });
    }
    //블랙 스크린 및 팝업창 닫기
    $('#list_view').on('click','.list_viewol2',function(e){
        $('#qa_product').val($(this).attr('pdata'));
        $('#qa_shadow').css('display','none');
        $('#product_list').css('display','none');
      });
 });